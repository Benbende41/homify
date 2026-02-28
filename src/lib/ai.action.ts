import puter from '@heyputer/puter.js'

import { HOMIFY_RENDER_PROMPT } from './constants'

export const fetchDataAsUrl = async (url: string): Promise<string> => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`获取图片失败: ${response.statusText}`)
    }

    const blob = await response.blob()

    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

// eslint-disable-next-line no-undef
export const generate3DView = async ({ sourceImage }: Generate3DViewParams) => {
    const dataUrl = sourceImage.startsWith('data') ? sourceImage : await fetchDataAsUrl(sourceImage)

    const base64Data = dataUrl.split(',')[1]
    const mineType = dataUrl.split(';')[0]?.split(':')[1]

    if (!base64Data || !mineType) throw new Error('非法的sourceImage')

    const response = await puter.ai.txt2img(HOMIFY_RENDER_PROMPT, {
        provider: 'gemini',
        model: 'gemini-2.5-flash-image-preview',
        input_image: base64Data,
        input_image_mime_type: mineType,
        ratio: {
            w: 1024,
            h: 1024
        }
    })

    const rawImageUrl = (response as HTMLImageElement).src ?? null
    if (!rawImageUrl) return { renderedImage: undefined, renderedPath: null }
    const renderedImage = rawImageUrl.startsWith('data:')
        ? rawImageUrl
        : await fetchDataAsUrl(rawImageUrl)

    return { renderedImage, renderedPath: null }
}

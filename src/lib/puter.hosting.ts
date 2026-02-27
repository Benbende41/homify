/* eslint-disable no-undef */
import puter from '@heyputer/puter.js'

import {
    createHostingSlug,
    fetchBlobFromUrl,
    getHostedUrl,
    getImageExtension,
    HOSTING_CONFIG_KEY,
    imageUrlToPngBlob,
    isHostedUrl
} from './utils'

// 获取或创建 puter hosting 配置
export const getOrCreateHostingConfig = async (): Promise<HostingConfig | null> => {
    const existing = (await puter.kv.get(HOSTING_CONFIG_KEY)) as HostingConfig | null
    if (existing) return { subdomain: existing.subdomain }

    const subdomain = createHostingSlug()

    try {
        const created = await puter.hosting.create({
            subdomain
        })

        await puter.kv.set(HOSTING_CONFIG_KEY, { subdomain: created.subdomain })

        const record = { subdomain: created.subdomain }

        return record
    } catch (error) {
        console.error('Failed to create hosting config:', error)
        return null
    }
}

// 将图片upload 到 puter hosting
export const uploadImageToHosting = async ({
    hosting,
    url,
    projectId,
    label
}: StoreHostedImageParams): Promise<HostedAsset | null> => {
    if (!hosting || !url) return null
    if (isHostedUrl(url)) return { url }

    try {
        const resolve =
            label === 'rendered'
                ? await imageUrlToPngBlob(url).then((blob) =>
                      blob ? { blob, contentType: 'image/png' } : null
                  )
                : await fetchBlobFromUrl(url)

        if (!resolve) return null
        const contentType = resolve.contentType || resolve.blob.type || ''
        const ext = getImageExtension(contentType, url)
        const dir = `projects/${projectId}`
        const filePath = `${dir}/${label}.${ext}`

        const uploadFile = new File([resolve.blob], `${label}.${ext}`, {
            type: contentType
        })

        await puter.fs.mkdir(dir, { createMissingParents: true })
        await puter.fs.write(filePath, uploadFile)

        const hostedUrl = getHostedUrl({ subdomain: hosting.subdomain }, filePath)

        return hostedUrl ? { url: hostedUrl } : null
    } catch (e) {
        console.warn(`could not found image url ${e}`)
        return null
    }
}

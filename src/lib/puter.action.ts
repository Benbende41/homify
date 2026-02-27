/* eslint-disable no-unused-vars */
import puter from '@heyputer/puter.js'

import { getOrCreateHostingConfig, uploadImageToHosting } from './puter.hosting'
import { isHostedUrl } from './utils'

export const signIn = async () => await puter.auth.signIn()

export const signOut = async () => puter.auth.signOut()

export const getCurrentUser = async () => {
    try {
        const user = await puter.auth.getUser()
        return user
    } catch {
        return null
    }
}

export const createProject = async ({
    item
// eslint-disable-next-line no-undef
}: CreateProjectParams): Promise<DesignItem | null | undefined> => {
    const projectId = item.id

    const hosting = await getOrCreateHostingConfig()

    const hostedSource = projectId
        ? await uploadImageToHosting({ hosting, url: item.sourceImage, projectId, label: 'source' })
        : null

    const hostedRender =
        projectId && item.renderedImage
            ? await uploadImageToHosting({
                  hosting,
                  url: item.renderedImage,
                  projectId,
                  label: 'rendered'
              })
            : null
    const resolvedSource =
        hostedSource?.url || isHostedUrl(item.sourceImage) ? item.sourceImage : ''

    if (!resolvedSource) {
        console.warn('托管源图片失败，跳过保存')
        return null
    }

    const resolvedRender = hostedRender?.url
        ? hostedRender?.url
        : item.renderedImage && isHostedUrl(item.renderedImage)
          ? item.renderedImage
          : undefined

    const {
        sourcePath: _sourcePath,
        renderedPath: _renderedPath,
        publicPath: _publicPath,
        ...rest
    } = item

    const payload = {
        ...rest,
        sourceImage: resolvedSource,
        renderedImage: resolvedRender
    }

    try {
        // 调用 puter worker 去存储 project in kv

        return payload
    } catch (error) {
        console.warn('保存project失败', error)
    }
}

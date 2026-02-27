<template>
    <div>
        <AppNavigator />
        <section class="hero">
            <h3 class="title">Welcome To Homify!</h3>
            <p class="description">
                Homify 是一个可以将2d平面建筑图渲染成3D
                视图的工具，在这里你可以上传任何2d户型图，并生成
                一个可交互的3D模型，帮助你更好地理解空间布局和设计。无论你是房主、设计师还是建筑师，Homify
                都能为你提供一个直观的方式来探索和展示你的建筑项目。
            </p>
            <div class="actions">
                <Button variant="primary" full-width
                    >开始构建 <ArrowRight class="ml-2" :size="16"
                /></Button>
                <Button variant="ghost" full-width>Check Demo </Button>
            </div>
            <div class="upload-shell">
                <div class="grid-overlay"></div>
                <div class="upload-card">
                    <div class="upload-icon">
                        <Layers :size="32" class="icon" />
                    </div>
                    <Upload @on-complete="handleUploadComplete" />
                </div>
            </div>
        </section>
        <section class="projects">
            <div class="section-inner">
                <div class="section-head">
                    <div class="copy">
                        <h2>Projects</h2>
                        <p>你最新的工程和社区分享都在这里！</p>
                    </div>
                </div>
                <div class="projects-grid">
                    <template v-for="value in projects" :key="value.id">
                        <div class="project-card group">
                            <div class="preview">
                                <img
                                    :src="value.renderedImage || value.sourceImage"
                                    alt="Project"
                                />
                            </div>
                            <div class="badge">
                                <span>Community</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div>
                                <h3>{{ value.name }}</h3>
                                <div class="meta">
                                    <Clock :size="12" />
                                    <span>{{
                                        new Date(value.timestamp).toLocaleDateString()
                                    }}</span>
                                    <span>{{ value.sharedBy }}</span>
                                </div>
                                <div class="arrow">
                                    <ArrowUpRight :size="18" />
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight, ArrowUpRight, Clock, Layers } from 'lucide-vue-next'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import AppNavigator from '../components/AppNavigator.vue'
import Upload from '../components/Upload.vue'
import { createProject } from '../lib/puter.action'
import Button from '../ui/Button.vue'

const router = useRouter()

let projects = reactive<DesignItem[]>([])

const handleUploadComplete = async (base64Image: string) => {
    const newId = Date.now().toString()
    const name = `Residence ${newId}`

    const newItem = {
        id: newId,
        name,
        sourceImage: base64Image,
        renderedImage: undefined,
        timestamp: Date.now()
    }

    const saved = await createProject({ item: newItem, visibility: 'private' })

    if (!saved) {
        console.error('创建项目失败')
        return false
    }

    projects.push(newItem)

    router.push({
        name: 'renderDetail',
        params: { id: newId },
        query: {
            initialImage: saved.sourceImage,
            initialRendered: saved.renderedImage || null,
            name
        }
    })
}
</script>

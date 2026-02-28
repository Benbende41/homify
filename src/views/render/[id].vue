<template>
    <div class="visualizer">
        <nav class="topbar">
            <div class="brand">
                <Box class="logo" />

                <span class="name">Homify</span>
            </div>
            <Button variant="ghost" size="sm" @click="handleBack" class="exit">
                <X class="icon" />Exit Editor
            </Button>
        </nav>
        <section class="content">
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-meta">
                        <p>Project</p>
                        <h2>{{ 'Untitled Project' }}</h2>
                        <p class="note">Create By you</p>
                    </div>
                    <div class="panel-actions">
                        <Button
                            :disabled="!currentImage"
                            size="sm"
                            @click="() => {}"
                            class="export"
                        >
                            <Download class="w-4 h-4 mr-2" /> Export
                        </Button>
                        <Button size="sm" @click="() => {}" class="share">
                            <Share2 class="w-4 h-4 mr-2" /> Share
                        </Button>
                    </div>
                </div>
                <div class="render-area" :class="isProcessing ? 'is-processing' : ''">
                    <img
                        v-if="currentImage"
                        :src="currentImage"
                        alt="AI Render"
                        class="render-img"
                    />
                    <div v-else class="render-placeholder">
                        <img :src="base64" alt="Original" class="render-fallback" />
                    </div>
                    <div v-if="isProcessing" class="render-overlay">
                        <div class="rendering-card">
                            <RefreshCcw class="spinner" />
                            <span class="title">Rendering...</span>
                            <span class="subtitle">生成3D效果图</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { Box, Download, RefreshCcw, Share2, X } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { generate3DView } from '../../lib/ai.action'
import Button from '../../ui/Button.vue'

const route = useRoute()
const router = useRouter()

const base64 = ref<string>('')

base64.value = route.query.initialImage as string

const hasInitialGenerated = ref(false)
const isProcessing = ref<boolean>(false)
const currentImage = ref<string | null>(route.query.initialImage as string)
const handleBack = () =>
    router.push({
        name: 'dashboard'
    })
const runGeneration = async () => {
    if (!route.query.initialImage) return
    try {
        isProcessing.value = true
        const result = await generate3DView({ sourceImage: base64.value })
        if (result.renderedImage) {
            currentImage.value = result.renderedImage
            //更新project 中的内容为renderedImage
        }
    } catch (error) {
        console.warn(error)
    } finally {
        isProcessing.value = false
    }
}

watchEffect(() => {
    if (!route.query.initialImage || hasInitialGenerated.value) return

    if (route.query.initialRender) {
        currentImage.value = route.query.initialRender as string
        hasInitialGenerated.value = true
        return
    }
    hasInitialGenerated.value = true
    runGeneration()
})
</script>
<style scoped></style>

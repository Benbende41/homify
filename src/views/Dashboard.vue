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
                    <Upload/>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight, Layers } from 'lucide-vue-next'

import AppNavigator from '../components/AppNavigator.vue'
import Upload from '../components/Upload.vue';
import Button from '../ui/Button.vue'
</script>

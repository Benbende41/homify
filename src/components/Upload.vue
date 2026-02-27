<template>
    <div class="upload-component">
        <!-- Dropzone -->
        <div
            ref="dropZoneRef"
            @click="triggerFileInput"
            :class="[
                'dropzone relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer',
                isOverDropZone
                    ? 'border-indigo-500 bg-indigo-50 scale-[1.02]'
                    : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50/50',
                !isSignedIn && 'opacity-50 cursor-not-allowed',
                isProcessing && 'pointer-events-none'
            ]"
            style="min-height: 280px"
        >
            <!-- Upload Icon & Text -->
            <div v-if="!isProcessing" class="text-center px-6 py-8">
                <div
                    :class="[
                        'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300',
                        isOverDropZone
                            ? 'bg-indigo-100 scale-110'
                            : 'bg-white border-2 border-gray-200'
                    ]"
                >
                    <Upload
                        :size="32"
                        :class="[
                            'transition-colors duration-300',
                            isOverDropZone ? 'text-indigo-600' : 'text-gray-400'
                        ]"
                    />
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-1">
                    {{ isOverDropZone ? '释放以上传' : '上传楼层平面图' }}
                </h3>
                <p class="text-sm text-gray-600 mb-4">拖放文件到此处，或点击选择</p>

                <div class="flex items-center justify-center gap-3 text-xs text-gray-500">
                    <div class="flex items-center gap-1">
                        <FileImage :size="14" />
                        <span>PNG, JPG</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <Maximize :size="14" />
                        <span>最大 10MB</span>
                    </div>
                </div>

                <!-- Sign In Prompt -->
                <div
                    v-if="!isSignedIn"
                    class="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200"
                >
                    <p class="text-xs text-amber-800 font-medium">请先登录以上传文件</p>
                </div>
            </div>

            <!-- Processing State -->
            <div v-else class="text-center px-6 py-8 w-full max-w-sm">
                <div
                    class="mb-4 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-indigo-100"
                >
                    <Loader2 :size="32" class="text-indigo-600 animate-spin" />
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-1">处理中...</h3>
                <p class="text-sm text-gray-600 mb-4">正在准备您的文件</p>

                <!-- Progress Bar -->
                <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                        class="progress-bar h-full rounded-full transition-all duration-300 ease-out"
                        :style="{ width: `${progress}%` }"
                    ></div>
                </div>
                <p class="mt-2 text-xs font-medium text-gray-700">{{ progress }}%</p>
            </div>

            <!-- Hidden File Input -->
            <input
                ref="fileInputRef"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                @change="handleFileChange"
                class="hidden"
                :disabled="!isSignedIn || isProcessing"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { FileImage, Loader2, Maximize, Upload } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { PROGRESS_INTERVAL_MS, PROGRESS_STEP, REDIRECT_DELAY_MS } from '../lib/constants'
import { useUserStore } from '../store'

const router = useRouter()

const userStore = useUserStore()
const { isSignedIn } = storeToRefs(userStore)

const fileInputRef = ref<HTMLInputElement | null>(null)
const dropZoneRef = ref<HTMLDivElement | null>(null)
const isProcessing = ref(false)
const progress = ref(0)

// Setup drop zone with VueUse
const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop: (files) => {
        if (!isSignedIn.value || isProcessing.value) return
        if (files && files.length > 0) {
            processFile(files[0]!)
        }
    },
    dataTypes: ['image/png', 'image/jpeg', 'image/jpg']
})

// Trigger file input click
const triggerFileInput = () => {
    if (!isSignedIn.value || isProcessing.value) return
    fileInputRef.value?.click()
}

// Handle file input change
const handleFileChange = (e: Event) => {
    if (!isSignedIn.value || isProcessing.value) return

    const target = e.target as HTMLInputElement
    const files = target.files
    if (files && files.length > 0) {
        processFile(files[0]!)
    }
}

// Process file
const processFile = (file: File) => {
    if (!isSignedIn.value) return

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!validTypes.includes(file.type)) {
        alert('请上传 PNG 或 JPG 格式的图片')
        return
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
        alert('文件大小不能超过 10MB')
        return
    }

    isProcessing.value = true
    progress.value = 0

    // Read file as Base64
    const reader = new FileReader()

    reader.onload = (e) => {
        const base64Data = e.target?.result as string

        // Simulate progress with interval
        const progressInterval = setInterval(() => {
            progress.value += PROGRESS_STEP

            if (progress.value >= 100) {
                clearInterval(progressInterval)
                progress.value = 100

                // Call onComplete after delay
                setTimeout(() => {
                    onComplete(base64Data)
                }, REDIRECT_DELAY_MS)
            }
        }, PROGRESS_INTERVAL_MS)
    }

    reader.onerror = () => {
        alert('文件读取失败，请重试')
        isProcessing.value = false
        progress.value = 0
    }

    reader.readAsDataURL(file)
}

// On complete callback
const onComplete = (base64Data: string) => {
    const newId = crypto.randomUUID()

    router.push({
        name: 'renderDetail',
        params: { id: newId },
        query: { data: base64Data }
    })

    // Reset state
    isProcessing.value = false
    progress.value = 0
}
</script>

<style scoped>
.upload-component {
    width: 100%;
}

.dropzone {
    transition: all 0.3s ease;
}

.dropzone:hover:not(.pointer-events-none) {
    transform: translateY(-2px);
}

.progress-bar {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 0 8px rgba(102, 126, 234, 0.4);
}
</style>

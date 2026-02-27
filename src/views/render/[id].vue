<template>
    <div>
        <span class="text-4xl font-bold underline-black">{{ id }}</span>

        <img :src="base64" alt="projectBase64" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id as string

const base64 = ref<string>('')

base64.value = route.query.initialImage as string
</script>
<style scoped></style>

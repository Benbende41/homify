<script setup lang="ts">
import AppNavigator from './components/AppNavigator.vue'
</script>

<template>
    <div class="h-screen">
        <AppNavigator />
        <RouterView />
    </div>
</template>

<template>
    <header class="nav-header sticky top-0 z-50">
        <nav class="mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
            <!-- Logo & Brand -->
            <div class="flex items-center gap-8 lg:gap-12">
                <RouterLink to="/" class="flex items-center gap-2.5 group">
                    <div class="logo-container flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                        <Box :size="20" :stroke-width="2.5" />
                    </div>
                    <span class="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">Homify</span>
                </RouterLink>

                <!-- Desktop Navigation -->
                <div class="hidden lg:block">
                    <ul class="flex list-none gap-1 p-0 m-0">
                        <li v-for="link in navLinks" :key="link.to">
                            <RouterLink
                                :to="link.to"
                                class="nav-link relative block px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                            >
                                {{ link.label }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex shrink-0 items-center gap-3">
                <template v-if="!isSignedIn">
                    <Button
                        variant="ghost"
                        size="md"
                        @click.prevent="userStore.signIn"
                        class="hidden sm:inline-flex"
                    >
                        登录
                    </Button>
                    <RouterLink
                        to="/upload"
                        class="cta-button inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                    >
                        开始使用
                    </RouterLink>
                </template>
                <template v-else>
                    <div class="hidden md:flex items-center gap-3">
                        <div class="user-badge flex items-center gap-2 px-3 py-1.5 rounded-lg">
                            <div class="status-dot h-2 w-2 rounded-full bg-green-400"></div>
                            <span class="text-sm font-medium text-gray-700">
                                {{ userName || '用户' }}
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="md"
                        @click="userStore.signOut"
                        class="text-gray-600 hover:text-gray-900"
                    >
                        退出
                    </Button>
                </template>

                <!-- Mobile Menu Button -->
                <button
                    @click="toggleMobileMenu"
                    class="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <Menu v-if="!isMobileMenuOpen" :size="24" />
                    <X v-else :size="24" />
                </button>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
        >
            <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-gray-200 bg-white">
                <div class="mx-auto px-4 py-4 space-y-1">
                    <RouterLink
                        v-for="link in navLinks"
                        :key="link.to"
                        :to="link.to"
                        @click="closeMobileMenu"
                        class="mobile-nav-link block px-4 py-2.5 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                    >
                        {{ link.label }}
                    </RouterLink>

                    <div v-if="!isSignedIn" class="pt-4 border-t border-gray-200 space-y-2">
                        <button
                            @click="handleMobileSignIn"
                            class="w-full px-4 py-2.5 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 text-left cursor-pointer"
                        >
                            登录
                        </button>
                    </div>

                    <div v-else class="pt-4 border-t border-gray-200">
                        <div class="flex items-center gap-2 px-4 py-2 mb-2">
                            <div class="h-2 w-2 rounded-full bg-green-500"></div>
                            <span class="text-sm font-medium text-gray-700">
                                {{ userName || '用户' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </header>
</template>

<script setup lang="ts">
import { Box, Menu, X } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useUserStore } from '../store'
import Button from '../ui/Button.vue'

const userStore = useUserStore()
const { userName, isSignedIn } = storeToRefs(userStore)

const isMobileMenuOpen = ref(false)

const navLinks = [
    { to: '/', label: '产品' },
    { to: '/pricing', label: '价格' },
    { to: '/community', label: '社区' },
    { to: '/enterprise', label: 'Enterprise' }
]

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}

const handleMobileSignIn = () => {
    closeMobileMenu()
    userStore.signIn()
}
</script>
<style scoped>
/* Glassmorphism Header */
.nav-header {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.05),
        0 0 0 1px rgba(255, 255, 255, 0.1) inset,
        0 20px 25px -5px rgba(0, 0, 0, 0.02);
}

/* Logo with gradient and glow */
.logo-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
}

.logo-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    transform: rotate(45deg);
    transition: all 0.6s ease;
}

.logo-container:hover::before {
    left: 100%;
}

/* CTA Button with glassmorphism */
.cta-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
    box-shadow:
        0 4px 15px rgba(102, 126, 234, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

.cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    transition: left 0.5s ease;
}

.cta-button:hover::before {
    left: 100%;
}

.cta-button:hover {
    box-shadow:
        0 6px 20px rgba(102, 126, 234, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.3) inset;
    transform: translateY(-1px);
}

/* User badge with glassmorphism */
.user-badge {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.status-dot {
    box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
    animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
    0%, 100% {
        opacity: 1;
        box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
    }
    50% {
        opacity: 0.8;
        box-shadow: 0 0 12px rgba(74, 222, 128, 0.8);
    }
}

/* Navigation links */
.nav-link {
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(102, 126, 234, 0.5);
}

.nav-link:hover::after {
    width: 60%;
}

.nav-link.router-link-active {
    color: #667eea;
    background: rgba(102, 126, 234, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font-weight: 600;
    border: 1px solid rgba(102, 126, 234, 0.1);
}

.nav-link.router-link-active::after {
    width: 80%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    box-shadow: 0 0 12px rgba(102, 126, 234, 0.6);
}

.mobile-nav-link.router-link-active {
    color: #667eea;
    background: rgba(102, 126, 234, 0.08);
    font-weight: 600;
    border-left: 3px solid #667eea;
    padding-left: calc(1rem - 3px);
    box-shadow: 0 0 15px rgba(102, 126, 234, 0.15);
}

/* Focus visible styles for accessibility */
.nav-link:focus-visible,
.mobile-nav-link:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}
</style>


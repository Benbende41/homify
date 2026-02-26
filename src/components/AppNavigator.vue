<template>
    <header class="navbar">
        <nav class="inner">
            <div class="left">
                <div class="brand">
                    <Box :size="32" />
                </div>
                <div class="links">
                    <ul>
                        <RouterLink to="/">产品</RouterLink>
                        <RouterLink to="/">价格</RouterLink>
                        <RouterLink to="/">社区</RouterLink>
                        <RouterLink to="/">Enterprise</RouterLink>
                    </ul>
                </div>
            </div>
            <div class="actions">
                <template v-if="!isSignedIn">
                    <Button variant="ghost" size="md" @click.prevent="userStore.signIn"
                        >登录</Button
                    >
                    <RouterLink to="/upload"> 开始 </RouterLink>
                </template>
                <template v-else>
                    <span class="greeting"> {{ userName ? `Hi ${userName}` : 'Signed in' }}</span>
                    <Button variant="danger" size="md" @click="userStore.signOut">退出</Button>
                </template>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { Box } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { useUserStore } from '../store'
import Button from '../ui/Button.vue'

const userStore = useUserStore()
const { userName, isSignedIn } = storeToRefs(userStore)
</script>
<style scoped>
.navbar {
    background-color: #fff;
    border-bottom: 1px solid #eaeaea;
    padding: 0.75rem 1rem;
    position: sticky;
    top: 0;
    z-index: 50;
}

.inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}

.left {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.brand {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 0.5rem;
    background-color: #f3f4f6;
    color: #2563eb;
    flex-shrink: 0;
}

.links {
    display: flex;
    align-items: center;
}

.links ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1.5rem;
}

.links :deep(a) {
    color: #374151;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.2s ease;
    position: relative;

    &:hover {
        color: #2563eb;
    }

    &.router-link-active {
        color: #2563eb;

        &::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #2563eb;
            border-radius: 1px;
        }
    }
}

.actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
}

.actions :deep(a) {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #eff6ff;
    }
}

.greeting {
    color: #6b7280;
    font-size: 0.95rem;
    font-weight: 500;
}

@media (max-width: 768px) {
    .inner {
        gap: 1rem;
    }

    .left {
        gap: 1rem;
    }

    .links ul {
        gap: 1rem;
    }

    .links :deep(a) {
        font-size: 0.875rem;
    }

    .actions {
        gap: 0.5rem;
    }
}
</style>

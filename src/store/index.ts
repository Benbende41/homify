import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getCurrentUser, signIn as puterSignIn, signOut as puterSignOut } from '../lib/puter.action'

const useUserStore = defineStore('user', () => {
    const userName = ref('')
    const userId = ref('')
    const isSignedIn = ref(false)

    // 初始化用户状态
    const initUser = async () => {
        const user = await getCurrentUser()
        if (user) {
            userName.value = user.username || ''
            userId.value = user.uuid || ''
            isSignedIn.value = true
        } else {
            resetUser()
        }
    }

    // 登录
    const signIn = async () => {
        try {
            await puterSignIn()
            await initUser()
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error('Sign in failed:', error)
            throw error
        }
    }

    // 登出
    const signOut = async () => {
        try {
            await puterSignOut()
            resetUser()
        } catch (error) {
            // eslint-disable-next-line no-undef
            console.error('Sign out failed:', error)
            throw error
        }
    }

    // 重置用户状态
    const resetUser = () => {
        userName.value = ''
        userId.value = ''
        isSignedIn.value = false
    }

    return {
        userName,
        userId,
        isSignedIn,
        initUser,
        signIn,
        signOut
    }
})

export { useUserStore }

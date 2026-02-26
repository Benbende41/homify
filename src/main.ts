import './style.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router'
import { useUserStore } from './store'

const pinia = createPinia()
const app = createApp(App)

app.use(router).use(pinia)

// 初始化用户状态
const userStore = useUserStore()
userStore.initUser().then(() => {
    app.mount('#app')
})


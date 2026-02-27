import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path:"/render",
        name:"render",
        component:()=>import('../views/render/index.vue'),
        children:[
            {
                path:':id',
                name:'renderDetail',
                component:()=>import('../views/render/[id].vue')
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

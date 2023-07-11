import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/notification',
            name: 'notification',
            component: () => import('../views/user/notifications/NotificationView.vue'),
        }
    ],
})

export default router

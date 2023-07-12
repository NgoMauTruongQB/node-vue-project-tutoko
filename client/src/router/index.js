import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/personal',
            name: 'personalPageView',
            component: () => import('../views/user/me/PersonalPageView.vue')
        },
        {
            path: '/notification',
            name: 'notification',
            component: () => import('../views/user/notifications/NotificationView.vue'),
        },
        {
            path: '/flash-cards',
            name: 'flashCards',
            component: () => import('../views/user/flashCards/ListFlashCardsView.vue')
        },
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
    ],
})

export default router

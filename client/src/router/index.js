import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonalPageView from '../views/user/me/PersonalPageView.vue'
import NotificationView from '../views/user/notifications/NotificationView.vue'
import SetCardsView from '../views/user/flashCards/SetCardsView.vue'
import ErrorView from '../views/ErrorView.vue'
import FlashCardsView from '../views/user/flashCards/FlashCardsView.vue'
import LoginPage from '../views/LoginView.vue'
import FlashCardHomeView from '../views/user/flashCards/FlashCardHomeView.vue'

const routes =  [
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/personal', component: PersonalPageView },
    { path: '/notification', component: NotificationView },
    { path: '/set-cards', component:  SetCardsView },
    { path: '/flash-cards/:cardsId/home', name: 'FlashCards', component:  FlashCardHomeView},
    { path: '/', component: HomeView },
    { path: '/:catchAll(.*)', component: ErrorView }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router

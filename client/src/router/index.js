import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonalPageView from '../views/user/me/PersonalPageView.vue'
import NotificationView from '../views/user/notifications/NotificationView.vue'
import SetCardsView from '../views/user/flashCards/SetCardsView.vue'
import ErrorView from '../views/ErrorView.vue'
import FlashCardsView from '../views/user/flashCards/FlashCardsView.vue'
import LoginView from '../views/authentication/LoginView.vue'
import FlashCardHomeView from '../views/user/flashCards/FlashCardHomeView.vue'
import RegisterView from '../views/authentication/RegisterView.vue'
import ForgotPasswordView from "../views/authentication/ForgotPasswordView.vue"
import ResetPasswordView from '../views/authentication/ResetPasswordView.vue'
import NewPostView from '../views/user/blog/NewPostView.vue'
import BlogView from '../views/user/blog/BlogView.vue'
import AddListFlashCards from '../views/user/flashCards/AddListFlashCardsView.vue'

import DashboardView from '../views/admin/DashboardView.vue'

const routes =  [
    { path: '/personal', component: PersonalPageView },
    { path: '/notification', component: NotificationView },
    { path: '/set-cards', component:  SetCardsView },
    { path: '/flash-cards/:cardsId/home', name: 'FlashCards', component:  FlashCardHomeView },
    { path: '/create-set/:cardsId', component: AddListFlashCards},
    { path: '/new-post', component: NewPostView },
    { path: '/', component: HomeView },
    { path: '/blog', name: 'blog', component: BlogView},
    { path: '/manager', name: 'manager', redirect: { name: 'dashboard'},
        children: [
            { path: 'dashboard', name: 'dashboard', component: DashboardView, meta: { layout: 'ManagerLayout' } },
        ]
    },
    { path: '/login', name: 'login', component: LoginView, meta: { layout: 'AuthLayout' } },
    { path: '/register', name: 'register', component: RegisterView, meta: { layout: 'AuthLayout' } },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPasswordView, meta: { layout: 'AuthLayout' } },
    { path: '/reset-password', name: 'reset-password', component: ResetPasswordView, meta: { layout: 'AuthLayout' } },
    { path: '/404', name: 'notfound', component: ErrorView, meta: { layout: 'NotFoundLayout'} },
    { path: '/:pathMatch(.*)*', redirect: { name: 'notfound'} },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router

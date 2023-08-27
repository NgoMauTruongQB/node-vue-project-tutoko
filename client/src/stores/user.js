import { defineStore } from 'pinia'
import authApi from '../api/authApi'
import handleErrorAndLogout from '../utils/handleErrorAndLogout'
import router from '../router'

export const useUserStore = defineStore('userState', {
    state: () => ({
        user: localStorage.getItem('site-analytic'),
        login: localStorage.getItem('isLogin') || false,
    }),
    getters: {
        isLogin: (state) => state.login
    },
    actions: {
        async onLogin(login) {
            this.login = login
            localStorage.setItem('isLogin', true)
            await authApi.getCurrentUser()
                .then (data => {
                    const updatedUser = {
                        username: data.user.username,
                        firstname: data.usersInformation.firstname,
                        lastname: data.usersInformation.lastname,
                        phone: data.user.phone,
                        email: data.user.email,
                        avatar: data.usersInformation.avatar,
                    }
                    localStorage.setItem('site-analytic', JSON.stringify(updatedUser))
                })
                .catch( error => {
                    handleErrorAndLogout()
                })
        },
        onLogout() {
            document.cookie = `${'accessToken'}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('isLogin')
            localStorage.removeItem('site-analytic')
            router.push({ path: '/login'})
        }
    }
})


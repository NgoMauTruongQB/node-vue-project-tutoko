import { defineStore } from 'pinia'

export const useToastStore = defineStore('toastState', {
    state: () => ({
        toasts: [],
    }),
    getters: {
        totalToast: (state) => state.toasts.length,
    },
    actions: {
        addToast(message, status, title) {
            const toast = {
                id: Math.floor(Math.random() * 10000),
                message,
                status,
                title,
            }
            this.toasts = [toast, ...this.toasts]
        }
    }
})


<template>
    <div class="container">
        <NotificationItem 
            v-for="notification in notifications" 
            :key="notification.id" 
            :notificationProps="notification"
        />
    </div>
</template>

<script>

import { ref } from 'vue'
import NotificationItem from './NotificationItem.vue'
import axios from 'axios'

export default {
    name: 'Notifications',
    components: { NotificationItem },
    setup(props, context) {
        // Get all notification from API
        const notifications = ref([])

        const getAllNotifications = async () => {
            try {
                const res = axios.get('http://localhost:3000/notifications')
                notifications.value = (await res).data
            } catch (error) {
                console.log(error)
            }
        }
        getAllNotifications()

        // Count unread notifications
        const unreadNotificationCount = ref(0)
        const handleUnReadNotificationCount = async () => {
            const res = axios.get('http://localhost:3000/notifications')
            notifications.value = (await res).data
            // console.log(typeof notifications.value)
            notifications.value.forEach(element => {
                if (element.isRead == false) {
                    unreadNotificationCount.value ++
                }
            })
            context.emit('unread-notification-count', unreadNotificationCount.value)
        }
        handleUnReadNotificationCount()

        return {
            notifications,
            unreadNotificationCount,
        }
    }
}
</script>

<style>
    
</style>
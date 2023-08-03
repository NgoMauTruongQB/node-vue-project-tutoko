<template>
    <div class="container">
        <div class="header p-4 pb-0">
            <p class="title">Notifications</p>
            <p class="check" @click="readAllNotifications">Mark all as read</p>
        </div>
        <div class="px-4">
            <button :class="['mb-2', { 'active': filter === 'all' }]" @click="filterNotifications('all')">
                All
            </button>
            <button :class="['mb-2', { 'active': filter === 'unread' }]" @click="filterNotifications('unread')">
                Unread
            </button>
        </div>
        <NotificationItem
            v-for="notification in notifications"
            :key="notification.id"
            :notificationProps="notification"
            @item-read="notificationRead"
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

        // Handle notification read
        const notificationRead = async (notification) => {
            try {
                const res = await axios.patch(`http://localhost:3000/notifications/${notification.id}`, { isRead: true })
                if (res.status >= 200 && res.status < 300) {
                    notifications.value = notifications.value.map(existingNotification => {
                        if (existingNotification.id === notification.id) {
                            return { ...existingNotification, isRead: true }
                        }
                        return existingNotification
                    })
                } else {
                    console.log(`Error: Notification read failed.`)
                }
            } catch (error) {
                console.log(error)
            }
        }

        // Handle read all notification
        const readAllNotifications = async () => {
            try {
                const res = await axios.patch('http://localhost:3000/notifications', { isRead: true })
                if (res.status >= 200 && res.status < 300) {
                    notifications.value = notifications.value.map(existingNotification => {
                        if (existingNotification.id) {
                            return { ...existingNotification, isRead: true }
                        }
                        return existingNotification
                    })
                } else {
                    console.log(`Error: All Notification read failed.`)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const filter = ref('all')
        const filterNotifications = (filterType) => {
            filter.value = filterType
            try {
                if (filter.value === 'unread') {
                    notifications.value = notifications.value.filter(item => item.isRead === false)
                } else {
                    getAllNotifications()
                }
            } catch (error) {
                console.log(error)
            }
        }

        return {
            notifications,
            unreadNotificationCount,
            notificationRead,
            readAllNotifications,
            filterNotifications,
            filter
        }
    }
}
</script>

<style scoped>

p {
    margin-bottom: 0.6rem;
}
.header {
    display: flex;
    justify-content: space-between;
}

.header .title {
    font-weight: 600;
    font-size: 1.4rem;
    color: #000001;
}

.header .check {
    color: var(--color-brand);
    cursor: pointer;
}

button:hover {
    background-color: var(--color-gray-light);
}

button {
    border-radius: 10rem;
    font-weight: 600;
    background-color: var(--color-white);
    border: none;
    padding: 0.2rem 1rem;
}

.active {
    border:none;
    color: var(--color-brand);
    background-color: var(--color-gray-light);
}

</style>
<template>
   <div class="notification-page pb-2">
        <div class="main">
            <div class="header p-4">
                <p class="title">Thông báo</p>
                <p class="check">Đánh dấu đã đọc</p>
            </div>
            <Notifications />
        </div>
   </div>
</template>

<script>
import Notifications from '../components/notification/Notifications.vue'

export default {
    name: 'NotificationView',
    components: { Notifications },
    setup() {

    }
}
</script>

<style scoped>

.notification-page {
    min-height: 86vh;
    display: flex;
    justify-content: center;
}

.main {
    width: 60%;
    border: 1px solid rgba(0,0,0,.08);
    border-radius: 0.5rem;
}

.main .header {
    display: flex;
    justify-content: space-between;
}

.header .title {
    font-weight: 600;
    font-size: 1.2rem;
}

.header .check {
    color: var(--color-blue);
    cursor: pointer;
}

@media (min-width: 740px) and (max-width: 1024px) {
    .main {
        width: 70%;
        border: 1px solid rgba(0,0,0,.08);
    }
}

@media screen and (max-width: 740px) {
    .main {
        width: 100%;
        border: none;
    }
}
</style>
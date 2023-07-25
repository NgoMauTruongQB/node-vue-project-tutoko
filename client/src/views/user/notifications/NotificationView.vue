<template>
   <div class="notification-page pb-2">
        <div class="main">
            <Notifications />
        </div>
   </div>
</template>

<script>
import Notifications from '../../../components/notification/Notifications.vue'

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
    margin-top: 100px;
}

.main {
    width: 60%;
    border: 1px solid rgba(0,0,0,.08);
    border-radius: 0.5rem;
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
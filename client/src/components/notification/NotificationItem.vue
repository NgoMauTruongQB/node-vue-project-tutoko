<template>
    <div 
        class="container d-flex justify-content-center"
        @click="readNotificationItem"
    >
        <div class="card mb-2 py-2">
            <div class="media d-inline-flex row">
                <div class="col-md-2 col-2 text-center">
                    <img src="../../assets/img/logo/wazen2.png">
                </div>
                <div class="media-body col-md-9 col-8">
                    <h6 class="mt-2 mb-1">{{ notificationProps.name }}</h6>
                    <p class="text mb-0">{{ notificationProps.message }}</p>
                    <small class="text date">{{ notificationProps.created_at }}</small>
                </div>
                <div class="col-md-1 col-1 d-flex align-items-center justify-content-center">
                    <span 
                        v-if="notificationProps.isRead === false"
                        class="badge rounded-pill p-1"
                    >
                        <span class="hideen"></span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotificationItem',
    props: ['notificationProps'],
    setup(props, context) {

        const readNotificationItem = () => {
            context.emit('item-read', props.notificationProps)
        }

        return {
            readNotificationItem
        }
    }
}
</script>

<style scoped>

body {
	background-color: var(--color-white);
}

.card:hover {
    background-color: var(--color-gray-light);
    cursor: pointer;
}

.card {
    width: 100%;
	border: none;
	border-radius: 0.6rem;
	background-color: var(--color-white);
}

.card img {
    width: 64px;
}

.card .date {
    color: var(--color-brand);
    font-weight: 600;
}

.text {
	color: var(--color-black);
}

.rounded-pill {
    background-color: var(--color-brand);
}

@media screen and (max-width: 390px){
    .card img {
        width: 54px;
    }
}
</style>
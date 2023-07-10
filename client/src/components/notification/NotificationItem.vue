<template>
    <div class="container d-flex justify-content-center">
        <div class="card mb-2">
            <div class="media row">
                <div class="col-2">
                    <img src="public/img/logo/logo.png" width="64">
                </div>
                <div class="media-body col-9">
                    <h6 class="mt-2 mb-1">{{ notificationProps.name }}</h6>
                    <p class="text mb-0">{{ notificationProps.message }}</p>
                    <small class="text date">{{ notificationProps.created_at }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotificationItem',
    props: ['notificationProps']
}
</script>

<style scoped>

body {
	background-color: var(--color-white);
}

.card:hover {
    background-color: var(--color-blue-light);
    cursor: pointer;
}

.card {
    width: 100%;
	border: none;
	border-radius: 0.6rem;
	background-color: var(--color-white);
}

.card .date {
    color: var(--color-blue);
    font-weight: 600;
}

.text {
	color: var(--color-black);
}
</style>
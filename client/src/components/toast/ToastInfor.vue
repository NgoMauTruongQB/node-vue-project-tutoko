<template>
    <div>
        <div class="position-fixed top-0 end-0 p-3">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                <img src="../../../public/img/logo/logo.png" class="rounded me-2">
                <strong class="me-auto">Information</strong>
                <small>11 mins ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                Hello, world! This is a toast message.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToastInfor'

}
</script>

<style scoped>
img {
    height: 1.8rem;
}
</style>
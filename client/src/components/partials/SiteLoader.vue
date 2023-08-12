<template>
    <div class="loading-spinner"></div>
</template>

<script>
export default {

}
</script>

<style scoped>

.loading-spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid var(--color-brand);
    animation: spin 1s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>
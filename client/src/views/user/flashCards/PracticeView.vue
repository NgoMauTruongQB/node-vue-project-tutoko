<template>
<div style="background-color: var(--color-gray-bg); margin-top: 90px; ">
    <h1>This is practice view</h1>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
    setup() {
        const route = useRoute()
        const cardsId = route.params.cardsId

        return {
            cardsId,
        }
    }
}
</script>

<style>

</style>
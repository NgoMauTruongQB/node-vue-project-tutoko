<template>
    <div style="background-color: var(--color-gray-bg); margin-top: 70px; ">
        <div class="container">
            <div class="main d-flex justify-content-center align-items-center">
                <FlashCardStudy :cardIdProps="cardsId" />
            </div>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'
import FlashCardStudy from '../../../components/card/FlashCardsStudy.vue'
import { useRoute } from 'vue-router'

export default {
    name: 'FlashCardsView',
    components: { FlashCardStudy },
    setup() {
        const route = useRoute()
        const cardsId = route.params.cardsId

        return {
            cardsId,
        }
    }
}
</script>

<style scoped>
.container {
    background-color: var(--color-gray-bg);
    min-height: 100vh;
}
</style>
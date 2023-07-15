<template>
    <div style="background-color: var(--color-gray-bg)">
        <div class="container">
            <h1 class="p-2">言葉</h1>
            <div class="d-flex justify-content-center align-items-center">
                <button class="btn-study btn bg-primary mx-2" @click="handleMode('study')">Study</button>
                <button class="btn-practice btn bg-primary mx-2" @click="handleMode('practice')">Practice</button>
            </div>
            <div class="main d-flex justify-content-center align-items-center">
                <FlashCardStudy v-if="mode === 'study'"/>
                <FlashCardsPractice v-else/>
            </div>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'
import axios from 'axios'
import FlashCardsPractice from '../../../components/card/FlashCardsPractice.vue'
import FlashCardStudy from '../../../components/card/FlashCardsStudy.vue'

export default {
    name: 'FlashCardsView',
    components: { FlashCardsPractice, FlashCardStudy },
    setup() {
        // Get all flash cards from API by id
        const listFlashCard = ref([])

        const getListFlashCard = async () => {
            try {
                const res = axios.get('http://localhost:3000/list-cards/')
                listFlashCard.value = (await res).data
            } catch (error) {
                console.log(error)
            }
        }
        getListFlashCard()

        // Handle study or practice mode
        const mode = ref('study')
        const handleMode = (modSelect) => {
            mode.value = modSelect
        }

        return {
            listFlashCard,
            handleMode,
            mode
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
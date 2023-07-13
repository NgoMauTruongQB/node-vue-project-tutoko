<template>
   <h1>
        <div
            v-for="flashCard in listFlashCard"
            :key="flashCard.id"
        >
            <div v-if="flashCard.id === 101 " >
                {{ flashCard.id }}
                <div 
                    v-for="card in flashCard.cards"
                    :key="card.id"
                >
                    {{ card.id }},
                    {{ card.faceSide}},
                    {{card.reverseSide}},
                    {{card.isRead}},
                    {{card.isRemembered}},
                </div>
            </div>
        </div>
   </h1>
</template>

<script>

import { ref } from 'vue'
import axios from 'axios'

export default {
    name: 'FlashCardsView',

    setup() {
        // Get all flash cards from API by id
        const listFlashCard = ref([])

        const getListFlashCard = async () => {
            try {
                const res = axios.get('http://localhost:3000/list-cards')
                listFlashCard.value = (await res).data
            } catch (error) {
                console.log(error)
            }
        }
        getListFlashCard()

        return {
            listFlashCard
        }
    }
}
</script>

<style>

</style>
<template>
   <div>
    
   </div>
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
                const res = axios.get('http://localhost:3000/list-cards/')
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
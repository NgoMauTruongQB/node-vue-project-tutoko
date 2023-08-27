<template>
    <div class="container" style="margin-top: 110px; ">
        <div class="header d-flex pt-4" style="margin: 0 12px;">
            <div class=" d-flex justify-content-start">
                <h3 class="title">FlashCards</h3>
                <i class="icon d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                    <path d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z"/></svg>
                </i>
            </div>
            <div class="add-list d-flex justify-content-center" >
                <AddListCard />
            </div>
        </div>
        <div class="grid-container">
            <SetCard
                v-for="setCard in listSetCard"
                :key="setCard.id"
                :setCardProps="setCard"
                @cards-id="handleCallPath"
            />
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'
import axios from 'axios'
import SetCard  from '../../../components/card/SetCard.vue'
import router from '../../../router'
import AddListCard from '../../../components/modal/AddListCard.vue'
import cardApi from '../../../api/cardApi'
import { useToastStore } from '../../../stores/toast'

export default {
    name: 'SetCardsView',
    components: { SetCard, AddListCard },
    setup() {
        const listSetCard = ref([])
        const storeToast = useToastStore()

        const getListSetCard = async () => {
            await cardApi.getListSetCards()
            .then(response => {
                listSetCard.value = response.listsFlashcards
            })
            .catch(err => {
                storeToast.addToast('Oops! Something went wrong!','danger', 'Error')
            })
        }
        getListSetCard()

        // Hanle call path by id
        const handleCallPath = (setCard) => {
            router.push({ path: `/flash-cards/${setCard}/home`})
        }

        return {
            listSetCard,
            handleCallPath
        }
    }
}
</script>

<style>

.header {
    color: var(--color-blue-darkest);
    justify-content: space-between;
}

.header .icon {
    position: relative;
    background-color: var(--color-brand);
    margin-left: 1rem;
    height: 2.6rem;
    width: 2.6rem;
    border-radius: 0.6rem;
}

.header .icon svg {
    position: absolute;
    fill: var(--color-white)
}

hr {
    border-top: 1px solid #ccc;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 16px;
    overflow-x: auto;
}

.grid-item {
    margin-bottom: 16px;
}

@media screen and (max-width: 500px) {
    .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}

</style>
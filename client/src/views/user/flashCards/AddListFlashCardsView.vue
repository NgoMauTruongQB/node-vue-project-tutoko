<template>
    <div style="background-color: var(--color-gray-bg)">
        <div class="container">
            <div class="header">
                <h2 class="mx-2 py-4 text-center">{{ topic }}</h2>
            </div>
            <div class="body">
                <div class="mx-2">
                    <h5>Terminology in this course ({{ storeCard.totalCard }})</h5>
                </div>
                <div v-for="(card, index) in storeCard.cards" :key="card.id">
                    <CardEditable 
                        :index="index+1"
                        :cardProps="card"
                        @item-deleted="deleteItem"
                        @item-update="updateItem"
                    />
                </div>
                <div class="add-card-area mt-2 mb-5">
                    <div class="add-card mx-2 my-4">
                        <div class="header row d-flex justify-content-between mx-1 py-2">
                            <button class="col-auto btn">
                                <strong>{{ storeCard.indexCardNext }}</strong>
                            </button>
                            <hr />
                        </div>
                        <div class="row">
                            <div class="col-md-6 py-5 d-flex justify-content-center align-items-center">
                                <div
                                    ref="reverse_side"
                                    class="input col-11 d-block"
                                    @keyup.enter="handleEnterKey"
                                    contenteditable
                                    @input="handleInput"
                                ></div>
                            </div>
                            <div class="col-md-6 py-5 d-flex align-items-center justify-content-center">
                                <div
                                    ref="face_side"
                                    class="input col-11 d-block"
                                    @keyup.enter="handleEnterKey"
                                    contenteditable
                                    @input="handleInput"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div class="add-card mx-2 my-4">
                        <div class="row py-5 d-flex justify-content-center align-items-center">
                            <div class="btn-add d-flex justify-content-center align-items-center">
                                <strong @click="onAddCard"> + Add card</strong>
                            </div>
                        </div>
                    </div>
                    <div class="mx-2 my-4 d-flex justify-content-end align-items-center">
                        <SiteButton @click="addList" type="submit" title="Create" />
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import cardApi from '../../../api/cardApi'
import router from '../../../router'
import { useRoute } from 'vue-router'
import SiteButton from '../../../components/partials/SiteButton.vue'
import { useCardStore } from '../../../stores/card'
import CardEditable from '../../../components/card/CardEditable.vue'
import { useToastStore } from '../../../stores/toast'

export default {
    components: { SiteButton, CardEditable },
    setup() {
        const storeToast = useToastStore()
        const storeCard = useCardStore()
        const route = useRoute()
        const cardsId = route.params.cardsId
        const topic = route.query.topic
        const type = route.query.type
        const reverse_side = ref(null)
        const face_side = ref(null)
        const input1 = ref('')

        // Handle enter keyup
        const handleEnterKey = () => {
            input1.value += '\n'
        }

        // Add card to localStorage
        const onAddCard = () => {
            if (reverse_side.value && face_side.value) {
                const value1 = reverse_side.value.innerText
                const value2 = face_side.value.innerText
                if (value1 !== '' && value2 !== '') {
                    storeCard.addCard(value1, value2)
                    reverse_side.value.innerText = ''
                    face_side.value.innerText = ''
                }
            }
        }

        // Handle delete card item
        const deleteItem = (id) => {
            storeCard.deleteCard(id)
        }

        // Handle update card item
        const updateItem = (data) => {
            storeCard.updateCard(data)
        }

        // Call API add set cards
        const addList = async () => {
            const data = {
                listCardsId: cardsId,
                setCards: storeCard.cards
            }
            await cardApi.addSetCards(data)
                .then (response => {
                    storeToast.addToast(response.message, 'success', 'Success')
                    localStorage.removeItem('Tmp-list-cards')
                    router.push({ path: `/flash-cards/${cardsId}/home`})
                })
                .catch(error => {
                    storeToast.addToast(error.message, 'danger', 'Error')
                })
        }

        return {
            cardsId,
            topic,
            type,
            handleEnterKey,
            onAddCard,
            reverse_side,
            face_side,
            storeCard,
            addList,
            deleteItem,
            updateItem
        }
    },
}
</script>

<style scoped>

.container {
    margin-top: 90px;
}

.add-card {
    background-color: var(--color-white);
    border: none;
    box-shadow: 0 0.25rem 1rem 0 var(--color-gray-light);
    border-radius: 0.6rem;
}

.header .btn-delete:hover svg {
    fill: var(--color-danger);
}

.add-card .btn-add:hover strong {
    color: var(--color-yellow);
    cursor: pointer;
}

.add-card .btn-add strong {
    border-bottom: 3px solid var(--color-yellow);
}

.btn-save-all {
    background-color: var(--color-brand);
    color: var(--color-white);
}

.add-card .cell {
    border-right: 2px solid var(--color-gray-light);
}

.add-card .input {
    border: none;
    border-bottom: 2px solid var(--color-blue-darkest);
    background-color: transparent;
    box-sizing: border-box;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.add-card .input:focus {
    outline: none;
    border-bottom: 2px solid var(--color-yellow);
    transition: ease-in-out 0.3s;
}
</style>

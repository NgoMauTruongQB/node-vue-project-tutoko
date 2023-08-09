<template>
    <div style="background-color: var(--color-gray-bg); margin-top: 90px; ">
        <section class="container list-flashcard-home">
            <div class="header">
                <h2 class="mx-2 py-4 text-center">{{ topic }}</h2>
            </div>
            <div class="body pb-5">
                <div class="row mx-2 infor">
                    <div class="col-11 row">
                        <div class="col">
                            <strong class="m-0">Author</strong>
                            <p class="m-0">{{ name }}</p>
                        </div>
                    </div>
                    <div class="col">
                        <button class="btn d-flex justify-content-center align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                        </button>
                    </div>
                </div>
                <div class="selection row mx-2 my-5">
                    <div @click="handleStudy" class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn icon d-flex justify-content-start align-items-center">
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                            <path d="M128 0C92.7 0 64 28.7 64 64V288H19.2C8.6 288 0 296.6 0 307.2C0 349.6 34.4 384 76.8 384H320V288H128V64H448V96h64V64c0-35.3-28.7-64-64-64H128zM512 128H400c-26.5 0-48 21.5-48 48V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V256H544c-17.7 0-32-14.3-32-32V128zm32 0v96h96l-96-96z"/></svg>
                        </div>
                        Study
                    </div>
                    <div class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn icon d-flex justify-content-start align-items-center">
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"/></svg>
                        </div>
                        Practice
                    </div>
                    <div class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn d-flex justify-content-start align-items-center">
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                            <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>
                        </div> 
                        Games
                    </div>
                    <div 
                        class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn icon d-flex justify-content-start align-items-center"
                        @click="addCard"
                    >
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z"/></svg>
                        </div>
                        Add flash cards
                    </div>
                    <div @click="handleDeleteSetCard" class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn icon d-flex justify-content-start align-items-center">
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                        </div>
                        Delete course
                    </div>
                </div>
                <div class="add-card-area my-5" :class="isAddCard ? 'show' : ''">
                    <div class="add-card mx-2 my-4">
                        <div class="header row d-flex justify-content-between mx-1 py-2">
                            <button class="col-auto btn">
                                <strong>{{ setCards.length + 1}}</strong>
                            </button>
                            <button class="btn-delete col-auto btn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                            </button>
                            <hr>
                        </div>
                        <div class="row py-5">
                            <div class="col-md-6 d-flex justify-content-center align-items-center">
                                <div 
                                    class="input col-11 d-block"
                                    @keyup.enter="handleEnterKey"
                                    contenteditable="true"
                                    @input="handleInput"
                                    ref="reverse_side"
                                > </div>
                            </div>
                            <div class="col-md-6 d-flex align-items-center justify-content-center">
                                <div
                                    class="input col-11 d-block"
                                    @keyup.enter="handleEnterKey"
                                    contenteditable="true"
                                    @input="handleInput"
                                    ref="face_side"
                                > 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="add-card mx-2 my-4">
                        <div class="row py-5 d-flex justify-content-center align-items-center">
                            <div class="btn-add d-flex justify-content-center align-items-center">
                                <strong @click="handleAddCard"> + Add card</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mx-2">
                    <h5>Terminology in this course ({{ setCards.length }})</h5>
                </div>
                <div v-for="card in setCards" :key="card._id">
                    <CardPreview 
                        :cardProps="card" 
                        @item-update="handleUpdate"
                        @item-delete="handleDeleteItem"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import CardPreview from '../../../components/card/CardPreview.vue'
import { ref } from 'vue'
import cardApi from '../../../api/cardApi'
import { useRoute } from 'vue-router'
import { useToastStore } from '../../../stores/toast'
import router from '../../../router'


export default {
    components: { CardPreview },
    setup() {
        const storeToast = useToastStore()
        const input1 = ref('')
        const isAddCard = ref(false)
        const route = useRoute()
        const cardsId = route.params.cardsId
        const name = ref('')
        const topic = ref('')
        const setCards = ref([])
        const reverse_side = ref(null)
        const face_side = ref(null)

        const handleEnterKey = () => {
            input1.value += '\n'
        }

        const handleStudy = () => {
            router.push({ path: `/study/${cardsId}`})
        }

        const addCard = () => {
            isAddCard.value = !isAddCard.value
        }

        const handleAddCard = async () => {
            if (reverse_side.value && face_side.value) {
                const value1 = reverse_side.value.innerText
                const value2 = face_side.value.innerText
                if (value1 !== '' && value2 !== '') {
                    const data = {
                        id_list_flashcards: cardsId,
                        reverse_side: value1,
                        face_side: value2
                    }
                    await cardApi.addFlashCard(data)
                    .then(response => {
                        reverse_side.value.innerText = ''
                        face_side.value.innerText = ''
                        getData()
                    })
                    .catch(err => {
                        if(err.response.status === 403) {
                            storeToast.addToast(err.response.data.message ,'danger', 'Error' )
                        } else {
                            storeToast.addToast('Oops! Something went wrong!','danger', 'Error')
                        }
                    })
                    
                }
            }
        }

        const handleUpdate = async (data) => {
            await cardApi.updateFlashCard(data)
            .then(response => {
                getData()
            })
            .catch(err => {
                if(err.response.status === 403) {
                    storeToast.addToast(err.response.data.message ,'danger', 'Error' )
                } else {
                    storeToast.addToast('Oops! Something went wrong!','danger', 'Error' )
                }
            })
        }

        const handleDeleteItem = async (data) => {
            await cardApi.deleteItemFlashCard(data._id)
            .then(response => {
                getData()
            })
            .catch(err => {
                if(err.response.status === 403) {
                    storeToast.addToast(err.response.data.message ,'danger', 'Error' )
                } else {
                    storeToast.addToast('Oops! Something went wrong!','danger', 'Error' )
                }
            })
        }

        const handleDeleteSetCard = async () => {
            await cardApi.deleteSetFlashCard(cardsId)
            .then(response => {
                storeToast.addToast(response.message ,'danger', 'Error' )
                getData()
            })
            .catch(err => {
                if(err.response.status === 403) {
                    storeToast.addToast(err.response.data.message ,'danger', 'Error' )
                } else {
                    storeToast.addToast('Oops! Something went wrong!','danger', 'Error' )
                }
            })
        }

        const getData = async () => {
            await cardApi.getSetCards(cardsId)
            .then(response => {
                name.value = response.name 
                topic.value = response.topic
                setCards.value = response.setCards
            })
            .catch(error => {
                if(error.response) {
                    storeToast.addToast(error.response.data.message, 'danger', 'Error')
                } else {
                    storeToast.addToast(error.message, 'danger', 'Error')
                }
            })
        }
        getData()

        return { 
            handleStudy,
            handleEnterKey,
            input1,
            isAddCard,
            addCard,
            name,
            topic,
            setCards,
            reverse_side,
            face_side,
            handleAddCard,
            handleUpdate,
            handleDeleteItem,
            handleDeleteSetCard
        }
    }
}
</script>

<style scoped>
.container {
    background-color: var(--color-gray-bg);
    min-height: 100vh;
}

.header {
    color: var(--color-blue-darkest);
}

.infor {
    position: relative;
}

.infor button:active {
    border: 1px solid var(--color-blue-darkest);
}

.infor button:hover {
    scale: 1.4;
}

.infor button {
    border: none;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.6rem;
    background-color: var(--color-white);
    position: absolute;
    right: 0;
}

.infor button svg {
    fill: var(--color-blue-darkest);
}

.selection .btn {
    border: none;
    background-color: var(--color-white);
    box-shadow: 0 0.25rem 1rem 0 var(--color-gray-light);
    border-radius: 0.4rem;
    justify-content: left;
    border-left: 3px solid var(--color-gray-light);
    border-bottom: 3px solid var(--color-gray-light);
}

.selection {
    display: flex;
    justify-content: space-between;
}

.selection .btn:hover {
    border-left: 3px solid var(--color-brand);
    border-bottom: 3px solid var(--color-brand);
}

.selection svg {
    fill: var(--color-brand)
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
    border-bottom: 3px solid var(--color-yellow)
}

.btn-save-all {
    background-color: var(--color-brand);
    color: var(--color-white);
}

.add-card .cell {
    border-right: 2px solid var(--color-gray-light);}

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

.add-card-area {
    display: none;
}

.show {
    display: block;
}

@media screen and (max-width: 991px) {
    .selection .btn {
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    .add-card .input {
        padding-top: 2rem;
    }
}
</style>
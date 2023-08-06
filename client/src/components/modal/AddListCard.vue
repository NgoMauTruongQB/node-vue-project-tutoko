<template>
<div>
    <button type="button" class="add-list" @click="openModal">
        <i class="icon-add d-flex justify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
            </svg>
        </i>
    </button>
    <div @click="closeModalOutside" :class="['modal ', isOpen ? 'show' : '']" >
        <div :class="['modal-dialog', isOpen ? 'slide-bottom' : '']">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="title modal-title fs-5" id="addListModalLabel">Create a new course</h1>
                    <button @click="closeModal" type="button" class="btn-close" aria-label="Close"></button>
                </div>
                <form @submit.prevent="onSubmit">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="topic" class="form-label">Topic</label>
                            <input type="text" v-model="formData.topic" @blur="v$.topic.$touch" class="form-control" id="topic">
                            <span v-for="error in v$.topic.$errors" :key="error.$uid">
                                {{ error.$message }}.
                            </span>
                        </div>
                        <div class="mb-3">
                            <label for="type" class="form-label">Type</label>
                            <select class="form-select" id="type" v-model="formData.type" @blur="v$.type.$touch">
                                <option value="vocabulary">Vocabulary</option>
                                <option value="kanji">Kanji</option>
                                <option value="grammar">Grammar</option>
                            </select>
                            <span v-for="error in v$.type.$errors" :key="error.$uid">
                                {{ error.$message }}.
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <SiteButton type="submit" title="Create" style="width: 100%; padding: 0.3rem 0.6rem;"/>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import SiteButton from '../partials/SiteButton.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref, computed, reactive } from 'vue'
import cardApi from '../../api/cardApi'
import { useToastStore } from '../../stores/toast'
import router from '../../router/index'

export default {
    components: { SiteButton },
    setup() {
        const storeToast = useToastStore()
        const isOpen = ref(false)

        const openModal = () => {
            isOpen.value = true
        }

        const closeModal = () => {
            isOpen.value = false
        }

        const closeModalOutside = (event) => {
            if (!event.target.closest('.modal-dialog')) {
                closeModal()
            }
        }

        const formData = reactive({
            topic: '',
            type: '',
        })

        const rules = computed(() => ({
            topic: { required },
            type: { required }
        }))
        
        const v$ = useVuelidate(rules, formData)

        // Check error and call API 
        const onSubmit = async () => {
            const result = await v$.value.$validate()
            if (result) {
                await cardApi.addListFlashCards(formData)
                .then(response => {
                    storeToast.addToast(response.message, 'success', 'Success')
                    var cardId = response.result._id
                    router.push({ path: `/create-set/${cardId}`, 
                        query: {
                            topic: formData.topic,
                            type: formData.type,
                        }
                    })
                })
                .catch(error => {
                    storeToast.addToast(error.message, 'danger', 'Error')
                })
            }
        }

        return { 
            formData, 
            rules, 
            v$, 
            onSubmit,
            openModal,
            isOpen,
            closeModal,
            closeModalOutside
        }
    }
}
</script>

<style scoped>

.show {
    display: flex;
}

.modal {
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    width: 300vh;
}

.modal-content {
    border: none;
}

.modal-header, .modal-footer {
    border: none;
}

button.add-list {
    background-color: var(--color-brand);
    border: none;
    border-radius: 0.6rem;
    width: 2.6rem;
    height: 2.6rem;
}

.icon-add {
    fill: var(--color-white);
}

.add-list:hover .icon-add {
    scale: 1.2;
}

.add-list:hover svg {
    transform: rotate(90deg);
    transition: all 0.4s ease-in-out;
}

span {
    color: var(--color-brand);
    font-size: 0.8rem;
}

.title {
    font-size: 28px;
    color: var(--color-brand);
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
}

.title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: var(--color-brand);
}

.title::before {
    width: 18px;
    height: 18px;
    background-color: var(--color-brand);
}

.title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
}

@keyframes pulse {
    from {
        transform: scale(0.9);
        opacity: 1;
    }

    to {
        transform: scale(1.8);
        opacity: 0;
    }
}

.slide-bottom {
    animation: slide-bottom 0.5s both;
}

.slide-bottom-out {
    transform: translateY(0);
    opacity: 1;
    transition: transform 0.5s, opacity 0.5s;
    transform: translateY(100%);
    opacity: 0;
}

</style>
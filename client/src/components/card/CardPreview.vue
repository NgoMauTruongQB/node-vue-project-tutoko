<template>
    <div class="card-preview p-2">
        <div class="card py-4 px-3">
            <div class="row">
                <div v-if="isUpdate" class="col-md-5 d-flex justify-content-center align-items-center">
                    <div 
                        class="col-11 input"
                        type="text"
                        autofocus
                        contenteditable
                        @keyup.enter="handleEnterKey"
                        ref="reverse_side"
                    >
                        {{ cardProps.reverse_side }} 
                    </div>
                </div>
                <div v-else class="col-md-5 cell d-flex align-items-center">
                    {{ cardProps.reverse_side }}
                </div>
                <div v-if="isUpdate" class="col-md-5 d-flex align-items-center justify-content-center">
                    <div 
                        class="col-11 input"
                        type="text"
                        contenteditable
                        @keyup.enter="handleEnterKey"
                        ref="face_side"
                    > 
                        {{ cardProps.face_side }} 
                    </div>
                </div>
                <div v-else class="col-md-5 d-flex align-items-center">
                    {{ cardProps.face_side }}
                </div>
                <div class="col-md-2 d-flex align-items-center justify-content-center">
                    <button class="btn-note mx-1 d-flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M96 352V96c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V293.5c0 17-6.7 33.3-18.7 45.3l-58.5 58.5c-12 12-28.3 18.7-45.3 18.7H160c-35.3 0-64-28.7-64-64zM272 128c-8.8 0-16 7.2-16 16v48H208c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V256h48c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H320V144c0-8.8-7.2-16-16-16H272zm24 336c13.3 0 24 10.7 24 24s-10.7 24-24 24H136C60.9 512 0 451.1 0 376V152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 224c0 48.6 39.4 88 88 88H296z"/></svg>
                    </button>

                    <button 
                        class="btn-save mx-1 d-flex align-items-center justify-content-center"
                        v-if="isUpdate"
                        @click="saveData"
                    >
                        <svg class="update" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>
                    </button>

                    <button 
                        class="btn-update mx-1 d-flex align-items-center justify-content-center"
                        v-else
                        @click="updateCard"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                    </button>

                    <button 
                        class="btn-delete mx-1 d-flex align-items-center justify-content-center"
                        @click="deleteCard"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'

export default {
    name: 'CardPreview',
    props: {
        cardProps: Object
    },
    setup(props, context) {

        const isUpdate = ref(false)
        const input = ref('')
        const reverse_side = ref(null)
        const face_side = ref(null)

        const handleEnterKey = () => {
            input.value += '\n'
        }

        const updateCard = () => {
            isUpdate.value = true
        }

        const deleteCard = () => {
            context.emit('item-delete', props.cardProps)
        }

        const saveData = () => {
            if (reverse_side.value && face_side.value) {
                const value1 = reverse_side.value.innerText
                const value2 = face_side.value.innerText
                if (value1 !== '' && value2 !== '') {
                    context.emit('item-update', {
                        id: props.cardProps._id,
                        reverse_side: value1,
                        face_side: value2
                    })
                }
            }
            isUpdate.value = false
        }

        return {
            isUpdate,
            updateCard,
            saveData,
            handleEnterKey,
            reverse_side,
            face_side,
            deleteCard
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.card-preview .card {
    background-color: var(--color-white);
    border: none;
    box-shadow: 0 0.25rem 1rem 0 var(--color-gray-light);
}

.card .cell {
    border-right: 2px solid var(--color-gray-light);
}

.card button {
    border-radius: 10rem;
    border: none;
    width: 2rem;
    height: 2rem;
    background-color: var(--color-white);
}

.card button svg {
    fill: var(--color-blue-darkest);
}

.card .btn:active {
    border: none;
}

.card .btn-note:hover svg {
    fill: var(--color-yellow);
    scale: 1.2;
}

.card .btn-update:hover svg {
    fill: var(--color-blue);
    scale: 1.2;
}

.card .btn-save:hover svg {
    fill: var(--color-success);
    scale: 1.2;
}

.card .btn-delete:hover svg {
    fill: var(--color-danger);
    scale: 1.2;
}

.card svg.update {
    fill: var(--color-yellow);
}

.card .input {
    border: none;
    border-bottom: 2px solid var(--color-blue-darkest);
    background-color: transparent;
    box-sizing: border-box;
    font-weight: 600;
}

.card .input:focus {
    outline: none;
    border-bottom: 2px solid var(--color-yellow);
    transition: ease-in-out 0.3s;
    color: var(--color-yellow);
}

@media screen and (max-width: 768px) {
    .card .input {
        padding-top: 2rem;
    }
    .card button {
        padding-top: 2rem;
    }
}

</style>
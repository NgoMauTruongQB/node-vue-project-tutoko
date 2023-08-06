<template>
<div class="add-card-area">
    <div class="add-card mx-2 my-4">
        <div class="header row d-flex justify-content-between mx-1 py-2">
            <button class="col-auto btn">
                <strong>{{ index }}</strong>
            </button>
            <button @click="handleDeleteItem" class="btn-delete col-auto btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
            </button>
            <hr>
        </div>
        <div class="row">
            <div class="col-md-6 py-5 d-flex justify-content-center align-items-center">
                <div
                    ref="reverse_side"
                    class="input col-11 d-block"
                    contenteditable
                    @blur="handleUpdateItem"
                    @keyup.enter="handleEnterKey"
                >
                {{ cardProps.reverse_side }}
                </div>
            </div>
            <div class="col-md-6 py-5 d-flex align-items-center justify-content-center">
                <div
                    ref="face_side"
                    class="input col-11 d-block"
                    contenteditable
                    @blur="handleUpdateItem"
                    @keyup.enter="handleEnterKey"
                > 
                {{ cardProps.face_side }}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'CardEditable',
    props: {
        cardProps: Object,
        index: Number,
    },
    setup(props, context) {
        const input = ref('')
        const reverse_side = ref(null)
        const face_side = ref(null)

        const handleDeleteItem = () => {
            context.emit('item-deleted', props.cardProps.id)
        }

        const handleEnterKey = () => {
            input.value += '\n'
        }

        const handleUpdateItem = () => {
            if (reverse_side.value && face_side.value) {
                const value1 = reverse_side.value.innerText
                const value2 = face_side.value.innerText
                if (value1 !== '' && value2 !== '') {
                    context.emit('item-update', {
                        id: props.cardProps.id,
                        reverse_side: value1,
                        face_side: value2
                    })
                }
            }
        }

        return {
            reverse_side,
            face_side,
            handleDeleteItem,
            handleUpdateItem,
            handleEnterKey
        }
    }
}
</script>

<style scoped>
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
</style>
<template>
    <div class="container py-2 d-flex justify-content-center">
        <div class="tabs my-3">
            <input type="radio" id="radio-1" name="tabs" @click="handleTabAction(1)" checked="">
            <label class="tab" for="radio-1">Desc</label>

            <input type="radio" id="radio-2" name="tabs" @click="handleTabAction(2)">
            <label class="tab" for="radio-2">Content</label>

            <input type="radio" id="radio-3" name="tabs" @click="handleTabAction(3)">
            <label class="tab" for="radio-3">Riview</label>

            <span class="glider"></span>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'

export default {
    name: 'Tab',
    setup(props, context) {

        const handleTabAction = (value) => {
            context.emit('tab-action', value)
        }

        return {
            handleTabAction
        }
    }
}
</script>

<style scoped>

.tabs {
    display: flex;
    position: relative;
    background-color: var(--color-white);
    box-shadow: 0 0 1px 0 #ededed, 0 6px 12px 0 #ededed;
    padding: 0.75rem;
    border-radius: 99px;
}

.tabs * {
    z-index: 2;
}

.container input[type="radio"] {
    display: none;
}

.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 70px;
    font-size: .8rem;
    color: black;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
}

.container input[type="radio"]:checked + label {
    color: #185ee0;
}

.container input[type="radio"]:checked + label > .notification {
    background-color: #185ee0;
    color: #fff;
    margin: 0px;
}

.container input[id="radio-1"]:checked ~ .glider {
    transform: translateX(0);
}

.container input[id="radio-2"]:checked ~ .glider {
    transform: translateX(100%);
}

.container input[id="radio-3"]:checked ~ .glider {
    transform: translateX(200%);
}

.glider {
    position: absolute;
    display: flex;
    height: 30px;
    width: 70px;
    background-color: #e6eef9;
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
}

@media (max-width: 700px) {
    .tabs {
        transform: scale(0.6);
    }
}


</style>
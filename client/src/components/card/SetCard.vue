<template>
    <div 
        class="container mt-4"
        @click="getAllFlashCards"
    >
        <div class="card p-3 mb-2 ">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <div class="icon" v-if="setCardProps.scope === 'public'">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/></svg>
                    </div>

                    <div class="icon" v-else-if="setCardProps.scope === 'private'"> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
                    </div>

                    <div class="icon" v-else> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                    </div>
                    <div class="ms-2 c-details">
                        <h6 class="mb-0">{{setCardProps.type}}</h6> <span>{{setCardProps.countDay}} day ago</span>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <h4 class="heading">{{ setCardProps.nameCard}}<br>{{ setCardProps.author}}</h4>
                <div class="mt-4">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{ width: setCardProps.percent + '%'}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="mt-3"> <span class="text1">{{setCardProps.readNumber}} cards <span class="text2">in {{setCardProps.allNumber}} cards in all.</span></span> </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'SetCard',
    props: ['setCardProps'],
    setup(props, context) {
        
        const getAllFlashCards = () => {
            context.emit('cards-id', props.setCardProps)
        }

        return {
            getAllFlashCards
        }
        
    }
}
</script>

<style scoped>

.card {
    border: 1px solid #e4e4e4;
    border-radius: 10px
}

.c-details span {
    font-weight: 300;
    font-size: 13px
}

.icon {
    width: 50px;
    height: 50px;
    background-color: var(--color-gray-light);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    fill: var(--color-blue-darkest);
}

.badge span {
    width: 60px;
    height: 25px;
    padding-bottom: 3px;
    border-radius: 5px;
    display: flex;
    color: var(--color-white);
    justify-content: center;
    align-items: center
}

.progress {
    height: 6px;
    border-radius: 10px;
}

.progress div {
    background-color: var(--color-brand);
}

.text1 {
    font-size: 14px;
    font-weight: 600;
}

.text2 {
    color: var(--color-gray-dark);
}
</style>
<template>
<div class="flip-card">
    <div 
        :class="['flip-card-inner', isFlip ? 'flip' : '']"
        @click="flipFlashCard"
    >
        <div class="flip-card-front">
            <div class="content  overflow-y-auto">
                {{ flashCardProps.reverse_side }}
            </div>
        </div>
        <div class="flip-card-back">
            <div class="content overflow-y-auto">
                {{ flashCardProps.face_side }}
            </div>
        </div>
    </div>
</div>
</template>

<script>

import { ref } from 'vue'

export default {
    props: ['flashCardProps'],
    setup() {
        // Handle transform when click
        const isFlip = ref(false)
        const flipFlashCard = () => {
            isFlip.value = !isFlip.value
        }

        return {
            flipFlashCard,
            isFlip
        }
    }
}

</script>

<style scoped>

* {
    box-sizing: border-box;
}

.flip-card {
    width: 100%;
    height: 28rem;
    perspective: 1000px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
}

.flip-card-front, 
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: var(--color-white);
    cursor: pointer;
}

.flip-card-back {
    transform: rotateX(180deg);
}

.content {
    width: 100%;
    height: 100%;
    font-size: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.flip {
    transform: rotateX(-180deg);
}

@media screen and (max-width: 991px) {
    .flip-card {
        height: 20rem;
    }

}

@media screen and (max-width: 600px) {
    .box {
        width: 100%;
        padding: 0.1rem;
    }

    .content {
        font-size: 3.6vw;
    }
}

</style>

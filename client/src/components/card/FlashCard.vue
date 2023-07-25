<template>
<div class="flip-card">
    <div 
        :class="['flip-card-inner', isFlip ? 'flip' : '']"
        @click="flipFlashCard"
    >
        <div class="flip-card-front">
            <div class="content  overflow-y-auto">
                {{ flashCardProps.faceSide }}
            </div>
        </div>
        <div class="flip-card-back">
            <div class="content overflow-y-auto">
                {{ flashCardProps.reverseSide }}
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

 
 
 <!-- <template>
    <div 
        :class="['flash-card m-2', isColor === 1 ? 'red': 'blue']"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
       @touchend="onTouchEnd" 
    >
        <div class="box" :style="{ left: boxLeft + 'px', top: boxTop + 'px' }"></div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const startX = ref(0)
        const startY = ref(0)
        const boxLeft = ref(0)
        const boxTop = ref(0)

        const isColor = ref(0)

        const listCard = ref([])

        const onTouchStart = (event) => {
            startX.value = event.touches[0].clientX
            startY.value = event.touches[0].clientY
        }

        const onTouchMove = (event) => {
            const deltaX = event.touches[0].clientX - startX.value
            const deltaY = event.touches[0].clientY - startY.value

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    console.log("SWIPER RIGHT")
                    isColor.value = 1
                    console.log(isColor.value)
                } else {
                    console.log("SWIPER LEFT")
                    isColor.value = 2
                    console.log(isColor.value)
                }
            }
        }

        return {
            onTouchStart,
            onTouchMove,
            startX,
            startY,
            boxLeft,
            boxTop,
            isColor
        }
    }
}
</script>

<style scoped>
.flash-card {
    width: 40rem;
    height: 20rem;
    background-color: var(--color-white);
    box-shadow: 0 0.25rem 1rem 0 #2e385614;
    border: 1px solid #e8ebed;
    border-radius: 0.8rem;
    cursor: pointer;
}

.red {
    background-color: red;
}

.blue {
    background-color: blue;
}
</style> -->

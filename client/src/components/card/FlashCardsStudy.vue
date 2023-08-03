<template>
    <div class="box my-2 overflow-hidden">
        <div v-if="isCompleted">
            <div class="congratulation">
                <div class="header">
                </div>
                <div class="body text-center py-5">
                    <FireWork />
                    <img src="../../assets/img/icon/applause.png" alt="">
                    <h4 class="mt-2 py-5">Congratulations! You learned all the cards.</h4>
                </div>
                <div class="footer">
                    <div class="directional">
                        <div class="back-to-card mx-3 d-flex justify-content-start"> 
                            <IconArrow class=" rotate-180" />
                            <p class="study my-1 mx-2">Learn again </p>
                        </div>
                        <div class="mx-3 d-flex justify-content-end"> 
                            <p class="practice my-1 mx-2"> Practice </p>
                            <IconArrow/>
                        </div>
                    </div>
                    <div class="progress mx-3">
                        <div class="progress-bar" role="progressbar" :style="{ width: progressWidth}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-center m-1">{{currentSlide}}/{{totalSlides}}</div>
            <Swiper
                :effect="'cards'"
                :grabCursor="true"
                :modules="modules"
                :cardsEffect="{ perSlideOffset: 1, perSlideRotate: 1, rotate: true, slideShadows: false }" 
                :shortSwipes="false"
                :touchMoveStopPropagation="true"
                @swiper="onSwiperInit"
                @reachEnd="showCongratulations"
                @slideChange="onSlideChange"
            >
                <SwiperSlide class="slide" v-for="flashCard in dataFlashCard" :key="flashCard.id">
                    <FlashCard :flashCardProps="flashCard" />
                </SwiperSlide>
            </Swiper>
            <div class="btn-footer d-flex justify-content-center">
                <button class="prev my-4" @click="prevSlide">
                    <IconArrow class=" rotate-180" />
                </button>
                <button class="next my-4" @click="nextSlide">
                    <IconArrow />
                </button>
            </div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{ width: progressWidth}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    </div>
</template>

<script>
import FlashCard from './FlashCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCards} from 'swiper'
import IconArrow from '../icon/IconArrow.vue'
import FireWork from '../icon/FireWork.vue'
import { ref } from 'vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'


export default {
    name: 'FlashCardStudy',
    components: {
        FlashCard,
        Swiper,
        SwiperSlide,
        IconArrow,
        FireWork
    },
    setup() {
        const dataFlashCard = ref([ 
            { id:1, faceSide: "犬", reverseSide: "con chó" },
            { id:2, faceSide: "猫", reverseSide: "con mèo" },
            { id:3, faceSide: "魚", reverseSide: "con cá" },
            { id:4, faceSide: "鳥", reverseSide: "con gà" },
            { id:5, faceSide: "豚", reverseSide: "con heo" },
            { id:6, faceSide: "牛", reverseSide: "con bò" },
            { id:7, faceSide: "猿", reverseSide: "con khỉ" },
            { id:8, faceSide: "鴨", reverseSide: "con vịt" },
        
        ])

        const modules = [ EffectCards ]
        const progressWidth = ref('0%')
        const totalSlides = ref(0)
        const currentSlide = ref(1)
        const isCompleted = ref(false)

        let swiperInstance = null

        const onSwiperInit = (swiper) => {
            swiperInstance = swiper
            totalSlides.value = swiperInstance.slides.length
        }

        const prevSlide = () => {
            swiperInstance.slidePrev()
        }

        const nextSlide = () => {
            swiperInstance.slideNext()
        }

        const showCongratulations = () => {
            isCompleted.value = true
        }

        const onSlideChange = () => {
            currentSlide.value = swiperInstance.activeIndex + 1
            const progress = ((currentSlide.value) / totalSlides.value) * 100
            progressWidth.value = `${progress}%`
        }

        return {
            modules,
            onSwiperInit,
            prevSlide,
            nextSlide,
            dataFlashCard,
            onSlideChange,
            progressWidth,
            showCongratulations,
            totalSlides,
            currentSlide,
            isCompleted
        }
    }

    
}
</script>

<style scoped>

.box {
    width: 70%;
    padding: 2rem;
}

.slide {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    box-shadow: 0 0.25rem 1rem 0 var(--color-gray-light);
    border-radius: 0.6rem;
}

.prev:hover,
.next:hover {
    transform: scale(1.4);
    border-radius: 2rem;
}

.prev, .next {
    background-color: var(--color-white);
    border: none;
    padding: 0.6rem 2rem;
}

.prev {
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
}

.next {
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
}

.rotate-180 {
    transform: rotate(180deg);
}

.progress {
    height: 4px;
    border-radius: 10px;
}

.progress div {
    background-color: var(--color-brand);
}

.congratulation {
    width: 100%;
    height: 28rem;
    perspective: 1000px;
    background-color: var(--color-white);
    position: relative;
    border-radius: 0.6rem;
    box-shadow: 0 0.25rem 1rem 0 var(--color-gray-light);
}

.congratulation .footer {
    position: absolute;
    width: 100%;
    bottom: 3rem;
}

.congratulation .directional {
    display: flex;
    justify-content: space-between;
}

.congratulation .directional .study,
.congratulation .directional .practice {
    font-weight: 600;
    cursor: pointer;
}

.congratulation .directional .study:hover,
.congratulation .directional .practice:hover {
    color: var(--color-blue-dark);
    scale: 1.1;
}

.congratulation .body img {
    width: 10rem;
}

.congratulation .progress {
    height: 2px;
}

@media screen and (max-width: 1024px) {
    .box {
        width: 80%;
    }
}

@media screen and (max-width: 991px) {
    .box {
        width: 100%;
        padding: 1rem;
    }

    .congratulation {
        height: 20rem;
    }

    .congratulation .body img {
        width: 6rem;
    }
}

@media screen and (max-width: 600px) {
    .box {
        width: 100%;
        padding: 0.1rem;
    }

    .congratulation .body img {
        width: 6rem;
    }
}
</style> 
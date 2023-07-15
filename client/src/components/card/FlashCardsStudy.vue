<template>
    <div class="box my-2 overflow-hidden">
        <Swiper
            :effect="'cards'"
            :grabCursor="true"
            :modules="modules"
            :cardsEffect="{ perSlideOffset: 1, perSlideRotate: 1, rotate: true, slideShadows: false }" 
            :noSwiping="true"
            :noClick="true"
            @swiper="onSwiperInit"
            @slideChange="onSlideChange"
        >
            <SwiperSlide class="slide" v-for="flashCard in dataFlashCard" :key="flashCard.id">
                <FlashCard 
                    :flashCardProps="flashCard"
                />
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
        <div class="progress-bar">
            <div class="progress" :style="{ width: progressWidth }"></div>
        </div>
    </div>
</template>

<script>
import FlashCard from './FlashCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCards} from 'swiper'
import IconArrow from '../icon/IconArrow.vue'
import { ref, onMounted } from 'vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'


export default {
    name: 'FlashCardStudy',
    components: {
        FlashCard,
        Swiper,
        SwiperSlide,
        IconArrow
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

        let swiperInstance = null

        const progressWidth = ref('0%')

        const onSwiperInit = (swiper) => {
            swiperInstance = swiper
        }

        const prevSlide = () => {
            swiperInstance.slidePrev()
        }

        const nextSlide = () => {
            swiperInstance.slideNext()
        }

        const onSlideChange = () => {
            const currentSlide = swiperInstance.currentSlide
            console.log(currentSlide)
            const totalSlides = swiperInstance.slides.length
            const progress = ((currentSlide + 1) / totalSlides) * 100
            console.log(progress)
            progressWidth.value = `${progress}%`
        }

        return {
            modules,
            onSwiperInit,
            prevSlide,
            nextSlide,
            dataFlashCard,
            onSlideChange,
            progressWidth
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
}

@media screen and (max-width: 600px) {
    .box {
        width: 100%;
        padding: 0.1rem;
    }
}
</style> 
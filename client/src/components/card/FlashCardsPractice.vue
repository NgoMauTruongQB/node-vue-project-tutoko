<template>
    <div class="box my-2">
        <Swiper
            :effect="'creative'"
            :creativeEffect="{
                prev: {
                    shadow: true,
                    translate: ['-120%', 0, -400],
                },
                next: {
                    shadow: true,
                    translate: ['120%', 0, -400],
                }
            }"
            :modules="modules"
            :grabCursor="true"
            :allowSlideNext="false"
            :allowSlidePrev="false"
        >
            <SwiperSlide class="slide" v-for="index in 5" :key="index">
                <div>
                    <FlashCard />
                </div>
            </SwiperSlide>
        </Swiper>
        <div class="btn-footer d-flex justify-content-center">
            <button class="remembered my-4">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            </button>
            <button class="re-learn my-4">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </button>
        </div>
    </div>
</template>

<script>
import FlashCard from './FlashCard.vue'
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCreative, Pagination} from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/pagination';

export default {
    name: 'FlashCardPractice',
    components: {
        FlashCard,
        Swiper,
        SwiperSlide,
    },
    setup() {
        const modules = [ EffectCreative, Pagination ]

        return {
            modules
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

.remembered:hover,
.re-learn:hover {
    transform: scale(1.4);
    border-radius: 2rem;
}

.remembered, .re-learn {
    background-color: var(--color-white);
    border: none;
    padding: 0.6rem 2rem;
}

.remembered {
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
}

.re-learn {
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
}

.remembered svg {
    fill: var(--color-success);
}

.re-learn svg {
    fill: var(--color-warning)
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
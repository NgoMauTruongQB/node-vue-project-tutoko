<template>
    <div class="home-card py-2 pb-5">
        <div class="circle-gray" data-aos="zoom-in-down" data-aos-duration="3000"></div>
        <h1 class="text-center py-3 mt-3 py-lg-5 my-lg-5" data-aos="zoom-in-down">FlashCards</h1>
        <div class="slide-area mx-3">
            <Swiper
                class="swiper my-5 mx-2"
                :modules="modules"
                :slidesPerView="1"
                :spaceBetween="10"
                :loop="true"
                :breakpoints="{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 5,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    '@1.25': {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }"
                @swiper="onSwiperInit"
            >
                <SwiperSlide class="slide" v-for="setCard in listSetCard" :key="setCard._id">
                    <div class="card">
                        <div class="read">
                            <button class="px-4 py-2 scale-up-center" @click="handlePlayCard(setCard._id)">Discover</button>
                        </div>
                        <div class="circle"></div>
                        <strong class="title px-4 pt-4">
                            {{ setCard.type }}
                        </strong>
                        <p class="px-4">{{ setCard.topic }}</p>
                        <div class="icon" v-if="setCard.type === 'vocabulary'">
                            <img src="../../assets/img/icon/vocabulary.png" width="30" alt="">
                        </div>
                        <div class="icon" v-else-if="setCard.type === 'kanji'"> 
                            <img src="../../assets/img/icon/kanji.png" width="30" alt="">
                        </div>

                        <div class="icon" v-else> 
                            <img src="../../assets/img/icon/grammar.png" width="30" alt="">
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <button @click="prevSlide" class="directional prev">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </button>
                <button @click="nextSlide" class="directional next">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                </button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import { ref, onMounted } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'
import cardApi from '../../api/cardApi'
import router from '../../router'
import AOS from 'aos'


export default defineComponent({
    name: 'HomeCard',
    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        const modules = [Pagination]
        let swiperInstance = null
        const listSetCard = ref('')
        const totalSlides = ref(0)

        onMounted(() => {
            AOS.init()
        })

        const getData = async () => {
            await cardApi.getListSetCards()
            .then(response => {
                listSetCard.value = response.listsFlashcards
            })
            .catch(error => {
                console.error(error)
            })
        }
        getData()

        const onSwiperInit = (swiper) => {
            swiperInstance = swiper
            totalSlides.value = swiperInstance.slides.length
        }

        const nextSlide = () => {
            swiperInstance.slideNext()
        }

        const prevSlide = () => {
            swiperInstance.slidePrev()
        }

        setTimeout(() => {
            nextSlide()
        }, 3000)

        const handlePlayCard = (cardsId) => {
            router.push({ path: `/study/${cardsId}`})
        }

        return {
            modules,
            listSetCard,
            onSwiperInit,
            nextSlide,
            prevSlide,
            handlePlayCard,
            swiperInstance,
        }
    }
})
</script>

<style scoped>
.home-card {
    min-height: 100px;
    position: relative;
}

.home-card .circle-gray {
    position: absolute;
    width: 600px;
    height: 600px;
    background-color: var(--vt-c-text-dark-2);
    z-index: -2;
    border-radius: 50%;
    top: -150px;
    left: -150px;
}

.home-card h1 {
    font-weight: 800;
    text-transform: uppercase;
    position: relative;
}

.slide-area {
    position: relative;
}

.card {
    min-height: 180px;
    border: 1px solid #e8e8e8e8;
    position: relative;
    border-top: 3px solid var(--color-brand);
}

.card .read {
    display: none;
    width: 100%;
    height: 100%;
    background-color: #cccccc99;
    position: absolute;
    z-index: 3;
}

.card .read button {
    background-color: var(--color-brand);
    color: var(--color-white);
    border: none;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 2rem;
}

.card:hover .read{
    display: flex;
    justify-content: center;
    align-items: center;
}

.card .read button:hover {
    opacity: 0.9;
}

.card .circle {
    position: absolute;
    width: 42px;
    height: 42px;
    background-color: var(--color-brand);
    opacity: 0.2;
    border-radius: 50%;
    top: 16px;
    left: 16px;
}

.card strong {
    text-transform: capitalize;
    font-size: 20px;
    color: #2a2a2a;
}

.card p {
    color: var(--color-gray-dark);
    font-size: 15px;
}

.card .day {
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.slide .icon {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: var(--vt-c-text-dark-2);
    padding: 10px;
    border-radius: 8px;
}

.directional {
    background-color: var(--color-brand);
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    position: absolute;
    z-index: 2;
}

.directional svg {
    fill: var(--color-white);
}

.directional.prev {
    left: -8px;
    top: calc(50% - 15px);
}

.directional.next {
    right: -8px;
    top: calc(50% - 15px);
}

.directional:hover {
    scale: 1.2;
}

@media screen and (max-width: 700px) {
    .home-card .circle-gray {
        width: 460px;
        height: 460px;
    }
}

.scale-up-center {
	-webkit-animation: scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes scale-up-center {
    0% {
        -webkit-transform: scale(0.5);
                transform: scale(0.5);
    }
    100% {
        -webkit-transform: scale(1);
                transform: scale(1);
    }
}
@keyframes scale-up-center {
    0% {
        -webkit-transform: scale(0.5);
                transform: scale(0.5);
    }
    100% {
        -webkit-transform: scale(1);
                transform: scale(1);
    }
}

</style>
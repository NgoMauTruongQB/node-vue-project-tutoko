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
                            <p @click="learnAgain" class="study my-1 mx-2">Learn again </p>
                        </div>
                        <div class="mx-3 d-flex justify-content-end"> 
                            <p @click="practiceMode" class="practice my-1 mx-2"> Practice </p>
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
                v-if="isDataLoaded"
                :effect="'cards'"
                :grabCursor="true"
                :modules="modules"
                :cardsEffect="{ perSlideOffset: 1, perSlideRotate: 1, rotate: false, slideShadows: false }" 
                :shortSwipes="false"
                :touchMoveStopPropagation="true"
                @swiper="onSwiperInit"
                @reachEnd="showCongratulations"
                @slideChange="onSlideChange"
            >
                <SwiperSlide class="slide" v-for="flashCard in listFlashCard" :key="flashCard._id">
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
        <div class="mt-5 d-flex justify-content-between">
            <h5>{{ topic }}</h5>
            <button @click="showHidePopup" class="btn-share popup">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg>
                <span :class="classShow" class="popuptext" id="myPopup">Copied</span>
            </button>
        </div>
    </div>
</template>

<script>
import FlashCard from './FlashCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCards} from 'swiper'
import IconArrow from '../icon/IconArrow.vue'
import FireWork from '../icon/FireWork.vue'
import { ref, computed } from 'vue'
import cardApi from '../../api/cardApi'
import { useToastStore } from '../../stores/toast'
import router from '../../router'

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
    props: ['cardIdProps'],
    setup(props, context) {
        const storeToast = useToastStore()
        const modules = [ EffectCards ]
        const progressWidth = ref('0%')
        const totalSlides = ref(0)
        const currentSlide = ref(1)
        const isCompleted = ref(false)
        const listFlashCard = ref([])
        const topic = ref('')
        const type = ref('')
        let swiperInstance = null
        const isDataLoaded = ref(false)
        const classShow = ref(null)
        const link = computed(() => window.location.href)
        const getData = async () => {
            await cardApi.studySetCards(props.cardIdProps)
            .then(response => {
                topic.value = response.topic 
                type.value = response.type
                listFlashCard.value = response.setCards
                isDataLoaded.value = true
                context.emit('infor-setcard', { topic: topic.value, type: type.value })
            })
            .catch(error => {
                if(error.response) {
                    storeToast.addToast(error.response.data.message, 'danger', 'Error')
                } else {
                    storeToast.addToast(error.message, 'danger', 'Error')
                }
            })
        }
        getData()

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

        const showHidePopup = async () => {
            classShow.value = 'show'
            try {
                await navigator.clipboard.writeText(link.value)
            } catch (error) {
                console.error('Copy error:', error)
            }
            setTimeout(() => {
                classShow.value = null
            }, 2000) 
        }

        const learnAgain = () => {
            swiperInstance.slideTo(0, 0)
            progressWidth.value = '0%'
            isCompleted.value = false
        }

        const practiceMode = () => {
            router.push({ path: `/practice/${props.cardIdProps}`})
        }

        return {
            modules,
            onSwiperInit,
            prevSlide,
            nextSlide,
            onSlideChange,
            progressWidth,
            showCongratulations,
            totalSlides,
            currentSlide,
            isCompleted,
            listFlashCard,
            getData,
            isDataLoaded,
            type,
            topic,
            showHidePopup,
            classShow,
            learnAgain,
            practiceMode
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

.btn-share {
    background-color: var(--color-white);
    border: none;
    border-radius: 0.8rem;
    width: 4.6rem;
    height: 2.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-share:hover svg {
    scale: 1.2;
    fill: var(--color-brand);
}

.popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.popup .popuptext {
    visibility: hidden;
    width: 110%;
    background-color: var(--color-gray-dark);
    color: var(--color-white);
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60%;
}

.popup .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--color-gray-dark) transparent transparent transparent;
}

.popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s
}

@-webkit-keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
}

@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
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
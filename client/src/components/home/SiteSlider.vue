<template>
    <Swiper
        class="swiper"
        :modules="modules"
        :loop="true"
        :loop-fill-group-with-blank="true"
        :pagination="{ clickable: true}"
        :autoplay="{ delay: 5000 }"
    >
        <SwiperSlide class="slide" v-for="index in 3" :key="index">
            <img :src="`img/slide/Slide${index}.png`" />
        </SwiperSlide>
    </Swiper>
</template>

<script>
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay} from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/swiper-bundle.css'

export default defineComponent({
    name: 'SiteSilder',
    components: {
        Swiper,
        SwiperSlide
    },
    setup() {
        const modules = [Pagination, Navigation, Autoplay]

        return {
            modules
        }
    }
})
</script>

<style scoped>
.swiper {
    display: flex;
}

.slide {
    flex-shrink: 0;
    width: 100%;
}

.slide img {
    display: block;
    width: 100%;
    border-radius: 1rem;
}
</style>

<style >
.swiper-pagination-bullet-active {
    background-color: var(--color-brand);
}

.swiper-pagination-bullet {
    border-radius: 0;
    width: 2.4rem;
    height: 0.3rem;
}

@media screen and (max-width: 512px) {
    .swiper-pagination-bullet {
        display: none;
    }
}
</style>
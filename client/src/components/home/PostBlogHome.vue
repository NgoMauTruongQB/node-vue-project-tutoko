<template>
    <div class="home-post-blog" :style="{ backgroundImage: 'url(' + cover_url + ')' }">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.6; background-color: black;"></div>
        <div class="navigate"> 
            <button @click="nextSlide" class="btn-next">Next</button> 
            <div class="line"></div>
        </div>
        <div class="content" v-if="listBlog.length > 0">
            <transition name="showcontent" mode="out-in">
                <p :key="currentTitle" v-if="currentTitle">{{ currentAuthor }} - {{ currentPostedDay }}</p>
            </transition>
            <transition name="showcontent" mode="out-in">
                <h2 class="title" :key="currentTitle" v-if="currentTitle">{{ currentTitle }}</h2>
            </transition>
            <transition name="showcontent" mode="out-in">
                <button @click="handleDetailPost(currentId)" class="btn-read" :key="currentTitle" v-if="currentTitle">Discover now</button>
            </transition>
        </div>
        <div class="slide-area ">
            <Swiper
                class="swiper my-2 mx-2"
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
                }"
                @swiper="onSwiperInit"
            >
                <SwiperSlide class="slide" v-for="(post, index) in listBlog" :key="post._id">
                    <img @click="displaySlide(index)" :src="post.post.cover_url" class="zoom-effect" />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import { ref } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { parseISO, format } from 'date-fns'
import blogApi from '../../api/blogApi'
import IconArrow from '../icon/IconArrow.vue'
import router from '../../router'

export default defineComponent({
    name: 'SiteSilder',
    components: {
        Swiper,
        SwiperSlide,
        IconArrow
    },

    setup() {
        const modules = [Pagination]
        const listBlog = ref([])
        const cover_url = ref('')
        const currentTitle = ref('')
        const currentAuthor = ref('')
        const currentPostedDay = ref('')
        const currentId = ref('')
        let swiperInstance = null
        const totalSlides = ref(0)
        const index = ref(0)

        const getData = async () => {
            await blogApi.getListBlog()
            .then(response => {
                listBlog.value = response.listPost
                cover_url.value = listBlog.value[index.value].post.cover_url
                currentTitle.value = listBlog.value[index.value].post.title
                currentAuthor.value = listBlog.value[index.value].author
                currentPostedDay.value = format(parseISO(listBlog.value[index.value].post.createdAt), 'dd-MM-yyyy')
                currentId.value = listBlog.value[index.value].post._id

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
            index.value++
            if(index.value >= listBlog.value.length) {
                index.value = 0
            }
            cover_url.value = listBlog.value[index.value].post.cover_url
            currentTitle.value = listBlog.value[index.value].post.title
            currentAuthor.value = listBlog.value[index.value].author
            currentPostedDay.value = format(parseISO(listBlog.value[index.value].post.createdAt), 'dd-MM-yyyy')
            currentId.value = listBlog.value[index.value].post._id
        }

        const displaySlide = (index) => {
            cover_url.value = listBlog.value[index].post.cover_url
            currentTitle.value = listBlog.value[index].post.title
            currentAuthor.value = listBlog.value[index].author
            currentPostedDay.value = format(parseISO(listBlog.value[index].post.createdAt), 'dd-MM-yyyy')
            currentId.value = listBlog.value[index].post._id
        }

        const handleDetailPost = (currentId) => {
            router.push({ path: `/blog/${currentId}`})
            window.scrollTo(0, 0)
        }

        return {
            modules,
            listBlog,
            cover_url,
            currentTitle,
            currentAuthor,
            currentPostedDay,
            nextSlide,
            onSwiperInit,
            totalSlides,
            displaySlide,
            handleDetailPost,
            currentId
        }
    }
})
</script>

<style scoped>
.home-post-blog {
    width: 100%;
    min-height: 650px;
    /* height: 100vh; */
    background-size: cover;
    position: relative;
    scroll-behavior: smooth;
}

.swiper {
    display: flex;
}

.slide {
    flex-shrink: 0;
    width: 100%;    
}

.slide img {
    width: 100%;
    border-radius: 8px;
    height: 300px;
    object-fit: cover;
    border: 1px solid #ffffff22;
}

.rotate-180 {
    transform: rotate(180deg);
}

.slide-area {
    position: absolute;
    width: 50%;
    bottom: 100px;
    right: 0;
}

.navigate {
    position: absolute;
    bottom: 20px;
    left: calc(50% + 10px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-next {
    background-color: #ffffff44;
    border: 1px solid var(--color-white);
    border-radius: 2rem;
    padding: 10px 50px;
    color: var(--color-white);
    text-transform: uppercase;
}

.line {
    height: 2px;
    width: 1000px;
    background-color: var(--color-white);
}

.content {
    position: absolute;
    top: 100px;
    width: 50%;
    left: 50px;
}

.content p {
    color: var(--color-white);
    
}

.title {
    color: var(--color-white);
    text-transform: uppercase;
    font-weight: 600;
}

.btn-read {
    background-color: #ffffff00;
    border: none;
    color: var(--color-white);
    text-transform: uppercase;
    border: 1px solid var(--color-white);
    border-radius: 2rem;
    padding: 0.6rem 1.6rem;
    margin-top: 1rem;
}

@keyframes showcontent {
    from {
        opacity: 0;
        transform: translate(0, 100px);
        filter: blur(33px);
    }
    to {
        opacity: 1;
        transform: translate(0, 0);
        filter: blur(0);
    }
}

.showcontent-enter-active,
.showcontent-leave-active,
.zoom-effect {
    transition: all 0.4s ease-in-out;
}
.showcontent-enter, .showcontent-leave-to {
    opacity: 0;
    transform: translate(0, 100px);
    filter: blur(33px);
}
.slide .zoom-effect:hover {
    transform: scale(1.1);
}

@media screen and (max-width: 600px) {
    .slide-area {
        width: 80%;
    }
    .content {
        top: 50px;
        width: 90%;
        left: 20px;
    }

    .content h2 {
        font-size: 22px;
    }
}

</style>
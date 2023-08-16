<template>
    <div class="home">
        <div data-aos="zoom-in" data-aos-duration="1000" class="mx-2" >
            <SiteSlider />
        </div>
        <div class="" >
            <Introduction/>
        </div>
        <div class="parallax" :style="{ backgroundImage: 'url(' + cover_url + ')' }">
            <div class="text"><p>Japanese & Culture</p></div>
        </div>
        <div>
            <HomeCard />
        </div>
        <div>
            <PostBlogHome />
        </div>
    </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ref, onMounted } from 'vue'
import SiteSlider from '../components/home/SiteSlider.vue'
import Introduction from '../components/home/Introduction.vue'
import HomeCard from '../components/home/HomeCard.vue'
import PostBlogHome from '../components/home/PostBlogHome.vue'

export default {
    name: 'HomeView',
    components: {
        SiteSlider,
        Introduction,
        HomeCard,
        PostBlogHome
    },
    setup() {
        const cover_url = ref('../../../../public/img/cover/4.png')

        onMounted(() => {
            AOS.init()
        })

        return {
            cover_url
        }
    }
}
</script>

<style scoped>

.home {
    margin-top: 90px;
    overflow-x: hidden;
}

.parallax {
    min-height: 560px;
    background-attachment: fixed;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

}

.parallax .text {
    position: absolute;
    display: flex;
    justify-content: center;
    line-height: 560px;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right,#B62F3533, #00000033);

}

.parallax .text p {
    color: var(--color-white);
    font-weight: 800;
    font-size: 6rem;
}

@media screen and (max-width: 900px) {
    .parallax .text p {
        font-size: 5rem;
    }
}

@media screen and (max-width: 750px) {
    .parallax .text p {
        font-size: 2.6rem;
    }
}

@media screen and (max-width: 520px) {
    .parallax .text p {
        font-size: 2rem;
    }
}

</style>


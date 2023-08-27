<template>
    <section class="detail-post container my-4">
        <div class="header d-flex justify-content-between">
            <div>
                <img :src="postProps.avatar || '../../../public/img/user/avatar_default.png'" 
                height="52" width="52" alt="avatar" class="rounded-circle">
                <p class="username d-inline mx-2 text-black">{{ postProps.author }}</p>
            </div>
            <div class="more d-flex justify-content-center align-items-center">
                <span class="mx-3">{{ daysAgo }}d</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>
            </div>
        </div>
        <div class="content my-2 mx-1 ">
            <div class="script m-52 justify-content-between">
                <p class="demo-script">{{ postProps.firstParagraph }}</p>
                <img class="cover-img" :src="postProps.post.cover_url" alt="">
            </div>
        </div>
        <div class="footer d-flex justify-content-between m-52">
            <div class="d-flex">
                <label class="tym mx-1 d-flex">
                    <input type="checkbox" v-model="isChecked" @change="onCheckChange">
                    <div :class="['checkmark', isChecked ? '' : 'hide']">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                    </div>
                    <div :class="['checkmark', isChecked ? 'hide' : '']">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                    </div>
                    <label v-if="likesCount >= 2" class="likes-count"> <strong>{{ likesCount }} likes</strong> </label>
                    <label v-if="likesCount === 1" class="likes-count"> <strong>{{ likesCount }} like</strong> </label>

                </label>
            </div>
            <div>
                <label class="read d-flex justify-content-center align-items-center mt-1" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>
                    <span class="tooltip" @click="handleReadPost(postProps.post._id)"> Read all </span>
                </label>
            </div>
        </div>
        <hr class="line">
    </section>
</template>

<script>

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '../../router'
import { parseISO, differenceInDays } from 'date-fns'
import blogApi from '../../api/blogApi'

export default {
    name: 'PostArchive',
    props: ['postProps'],
    setup(props) {
        
        const isChecked = ref(false)
        const createdAt = ref(props.postProps.post.createdAt)
        const currentDate = computed(() => new Date())
        const postId = ref(props.postProps.post._id)
        const likesCount = ref(props.postProps.likeCount)

        const onCheckChange = () => {
            blogApi.likedBlogPost({ 
                postId: postId.value,
                isLiked: isChecked.value
            }).then(() => {
                getInforLiked()
                likesCount.value = isChecked.value ? likesCount.value + 1 : likesCount.value - 1;
            }).catch(error => {
                console.error(error)
            });
        }

        const getInforLiked = () => {
            blogApi.getLikedBlogPost(postId.value)
            .then(response => {
                if(response.result !== null) {
                    isChecked.value = true
                } else {
                    isChecked.value = false
                }
            })
            .catch(error => {
                isChecked.value = false
            })
        }
        getInforLiked()

        const handleReadPost = (postId) => {
            router.push({ path: `/blog/${postId}`})
            window.scrollTo(0, 0)
        }

        const daysAgo = computed(() => {
            const createdDate = parseISO(createdAt.value)
            return differenceInDays(currentDate.value, createdDate)
        })

        return {
            isChecked,
            onCheckChange,
            handleReadPost,
            daysAgo,
            likesCount,
        }
    }
}
</script>

<style scoped>

.username {
    font-weight: 600;
    font-size: 15px;
}

.username, .more {
    cursor: pointer;
}

.rounded-circle {
    object-fit: cover;
}

.more span {
    color: #999999;
}

.tym input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.tym, .comment, .save, .read{
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
    transition: 100ms;
}

.likes-count {
    font-size: 18px;
    margin-top: 4px;
}

.checkmark {
    top: 0;
    left: 0;
    height: 1.4em;
    width: 1.4em;
    transition: 100ms;
    animation: dislike_effect 400ms ease;
}

.tym input:checked ~ .checkmark path {
    fill: #FF5353;
    stroke-width: 0;
}

.tym input:checked ~ .checkmark {
    animation: like_effect 400ms ease;
}

.hide {
    display: none;
}

.read {
    position: relative;
}

.tooltip {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 0);
    background-color: var(--color-gray-light);
    border-radius: 10px;
    padding: 6px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.3s;
    width: 60px;
    color: #999999;
}

.read:hover .tooltip {
    opacity: 1;
}

.m-52 {
    margin-left: 52px;
}

.demo-script {
    display: flex;
    text-align:justify;
}

.cover-img {
    width: 100%;
}

@media screen and (max-width: 512px) {
    .m-52 {
        margin-left: 0px;
    }
}

@keyframes like_effect {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes dislike_effect {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}


</style>
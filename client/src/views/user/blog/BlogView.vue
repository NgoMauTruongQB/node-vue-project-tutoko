<template>
    <div class="blog">
        <div class="header d-flex justify-content-center">
            <div class="date">

            </div>
            <h1 class="title text-center">{{ title }}</h1>
        </div>
        <div class="parallax" :style="{ backgroundImage: 'url(' + cover_url + ')' }"></div>
        <div class="header d-flex justify-content-center">
            <div class="col-lg-6 mt-5 d-flex justify-content-center align-items-center">
                <label class="tym d-flex justify-content-center align-items-center">
                    <input type="checkbox" v-model="isChecked" @change="onCheckChange">
                    <div :class="['checkmark', isChecked ? '' : 'hide']">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 512 512">
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                    </div>
                    <div :class="['checkmark', isChecked ? 'hide' : '']" >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 512 512">
                        <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                    </div>
                </label>
                <span class="author mt-2 mx-3">written by <a class="link">@{{ username }}</a>  &ensp;|&ensp; {{ date }}</span>
            </div>
            <div class="box-like">
                <div class="d-flex justify-content-between m-52">
                    <div class="d-flex">
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="content d-flex justify-content-center mx-2 mx-lg-0">
            <div class="rendered-html col-lg-6" v-html="renderHTML" />
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'
import pako from 'pako'
import blogApi from '../../../api/blogApi.js'
import router from '../../../router'
import { useRoute } from 'vue-router'
import { useToastStore } from '../../../stores/toast.js'
import { parseISO, format } from 'date-fns'
import { vi } from 'date-fns/locale'

export default {
    setup() {
        const route = useRoute()
        const postId = route.params.postId
        const storeToast = useToastStore()
        const renderHTML = ref('')
        const cover_url = ref('')
        const username = ref('')
        const title = ref('')
        const createdAt = ref('')
        const avatar = ref('')
        const date = ref('')

        const isChecked = ref(false)

        const onCheckChange = () => {
            blogApi.likedBlogPost({ 
                postId: postId,
                isLiked: isChecked.value
            })
        }

        const decompress = (text) => {
            const decompressedText = pako.inflate(text, { to: 'string' })
            return decompressedText
        }

        const cssProps = () => {
            backgroundImage: `url(${cover_url})`
        }

        const getData = () => {
            blogApi.getDetailBlogPost(postId)
            .then(response => {
                renderHTML.value = decompress(response.content)
                cover_url.value = response.cover_url
                username.value = response.username
                title.value = response.title
                createdAt.value = response.createdAt
                avatar.value = response.avatar || '../../../../public/img/user/avatar_default.png'
                date.value = format(parseISO(createdAt.value), 'dd MMMM yyyy')
            })
            .catch( error => {
                console.log(error)
                storeToast.addToast('Oops! Something went wrong!','danger', 'Error')
            })
        }
        getData()

        const getInforLiked = () => {
            blogApi.getLikedBlogPost(postId)
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

        return {
            decompress,
            renderHTML,
            cover_url,
            username,
            title,
            createdAt,
            cssProps,
            avatar,
            date,
            onCheckChange,
            isChecked
        }

    }
}
</script>

<style scoped>

.blog {
    margin-top: 80px;
    position: relative;
}

.parallax {
    min-height: 500px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.header {
    width: 100%;
    position: relative;
}

.title { 
    position: absolute;
    top: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    min-height: 500px;
    color: var(--color-white);
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
}

.content {
    position: relative;
    
}

.rendered-html {
    margin-top: 60px;
    background-color: var(--color-white);
}

.link {
    color: var(--color-brand);
    cursor: pointer;
}

.tym input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.tym {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
    transition: 100ms;
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

<style >

.ql-container.ql-snow {
    min-height: 100vh;
}

.ql-toolbar.ql-snow {
    border: none;
}

.ql-container.ql-snow {
    border: none;
}

.ql-image {
    display: block;
    width: 100%;
}

.ql-align-right {
    text-align: end;
}

.ql-align-center {
    text-align: center;
}

.ql-align-justify {
    text-align: justify;
}
</style>

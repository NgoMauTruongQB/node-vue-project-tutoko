<template>
    <div class="blog">
        <div class="header"><h1 class="title text-center">{{ title }}</h1></div>
        <div class="parallax" :style="{ backgroundImage: 'url(' + cover_url + ')' }"></div>
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
                console.log(renderHTML.value)
            })
            .catch( error => {
                console.log(error)
                storeToast.addToast('Oops! Something went wrong!','danger', 'Error')
            })
        }
        getData()


        return {
            decompress,
            renderHTML,
            cover_url,
            username,
            title,
            createdAt,
            cssProps
        }

    }
}
</script>

<style scoped>

.blog {
    margin-top: 97px;
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

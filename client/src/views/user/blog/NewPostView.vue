<template>
    <div class="post-create">   
        <div class="cover-image">
            <SiteLoader v-if="isLoading" />
            <div class="custom-file">
                <input type="file" id="fileInput" class="custom-file-input" @change="handleFileChange">
                <label for="fileInput" class="custom-file-label">Change cover
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/></svg>
                </label>
            </div>
            <img onerror="this.src='../../../../public/img/cover/1.jpg'" :src="imageSrc" alt="Uploaded Image" style="width: 100%">
            <div v-if="!imageSrc" class="image-overlay">
                <span v-if="!isLoading"> No Image </span>
            </div>
        </div>
        <div class="header py-4 px-4 row d-flex justify-content-center">
            <input v-model="postTitle" type="text" class="title col-lg-7" placeholder="Enter the post title..." autofocus>
            <span class="validation col-lg-7">{{ titleValidation }}</span>
        </div>
        <div class="body">
            <Editor @save-blog="Save"/>
        </div>
    </div>
</template>

<script>

import Editor from '../../../components/blog/Editor.vue'
import Tab from '../../../components/blog/Tab.vue'
import { ref, onMounted, computed } from 'vue'
import blogApi from '../../../api/blogApi.js'
import { useToastStore } from '../../../stores/toast'
import pako from 'pako'
import SiteLoader from '../../../components/partials/SiteLoader.vue'
import router from '../../../router'

export default {
    components: { Editor, Tab, SiteLoader },
    setup() {

        const storeToast = useToastStore()
        const imageSrc = ref('')
        const selectedFile = ref(null)
        const postTitle = ref('')
        const titleValidation = ref('')
        const isLoading = ref(false)

        const handleFileChange = async (event) => {
            try {
                isLoading.value = true
                selectedFile.value = event.target.files[0]
                const formData = new FormData()
                formData.append('file', selectedFile.value)

                const response = await blogApi.uploadImage(formData)
                imageSrc.value = response.fileUrl
                isLoading.value = false
            } catch (error) {
                isLoading.value = false
                console.error('Error uploading image:', error)
            }
        }

        const Save = async (html) => {
            if(html === '') {
                storeToast.addToast('Please enter some text for your post.!', 'danger', 'Erorr' )
                return
            }
            if(postTitle.value === '') {
                titleValidation.value = 'Please enter title.'
                return
            }
            if(imageSrc.value ===  '') {
                storeToast.addToast('Please select a cover photo!', 'danger', 'Erorr' )
                return
            }

            const compressedText = pako.deflate(html, { to: 'string' })

            await blogApi.addBlogPost({
                title: postTitle.value,
                imageSrc: imageSrc.value,
                content: compressedText
            })
            .then(response => {
                storeToast.addToast(response.message, 'success', 'Success' )
                const postId = response.id
                console.log(postId)
                router.push({ path: `/blog/${postId}`})
            })
            .catch(error => {
                storeToast.addToast('Oops! Something went wrong!', 'danger', 'Erorr' )
            })
        }

        return {
            imageSrc,
            selectedFile,
            handleFileChange,
            Save,
            postTitle,
            titleValidation,
            isLoading
        }
    }
}
</script>

<style scoped>

.post-create {
    margin-top: 100px;
    min-height: 100vh;
}

.post-create .cover-image img {
    height: 36vh;
    width: 100%;
    object-fit:cover;
}

.cover-image {
    position: relative;
}

.cover-image .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: white;
    pointer-events: none;
    font-style: italic;
}

.post-create .header .title {
    border: none;
    outline: none;
    font-size: 1.8rem;
    font-weight: 600;
}

.post-create .header .title::placeholder {
    font-size: 1.6rem;
    color: #cecece;
    font-weight: 600;
}

.custom-file {
    position: absolute;
    z-index: 1;
    bottom: 6px;
    right: 10px
}

.custom-file-input {
    display: none;
}

.custom-file-label {
    padding: 4px 12px;
    border: none;
    border-radius: 0.4rem;
    background-color: var(--color-white);
    cursor: pointer;
    font-size: 12px;
}

.custom-file-input:checked + .custom-file-label::after {
    content: attr(data-selected)
}

span.validation {
    color: var(--color-brand);
}
</style>
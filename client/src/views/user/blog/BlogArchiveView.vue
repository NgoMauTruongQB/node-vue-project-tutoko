<template>
    <div class="blog-archive">
        <div v-for="(post, index) in listBlog" :key="index">
            <PostArchive class="col-lg-6" :postProps="post"/>
        </div>
    </div>
</template>

<script>

import blogApi from '../../../api/blogApi'
import PostArchive from '../../../components/blog/PostArchive.vue'
import { ref } from 'vue'

export default {
    components: { PostArchive },
    setup() {
        const listBlog = ref([])

        const getData = async () => {
            await blogApi.getPostArchive()
            .then(response => {
                listBlog.value = response.listPost
            })
            .catch(error => {
                console.error(error)
            })
        }
        getData()

        return {
            listBlog
        }
    }
}
</script>

<style scoped>

.blog-archive {
    margin-top: 90px;
}

</style>
<template>
    <section class="profile" style="margin-top: 120px">
        <div class="container py-3">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-lg-8 col-md-10">
                    <div class="header mx-2">
                        <div class="row">
                            <div class="col-7 col-md-8 text-black">
                                <h4 class="row">Mậu Trường</h4>
                                <div class="account mb-2">
                                    <div class="row d-flex justify-content-center align-items-center">
                                        @03.nmt
                                    </div>
                                    <div class="mx-3 follow d-flex justify-content-center align-items-center px-3">Follow</div>
                                </div>
                                <div class="row">
                                    <hr class="my-2">
                                </div>
                                <div class="row my-2 status">
                                    Mậu Trường quyết tâm thi đỗ N3 😜
                                </div>
                                <div class="row" style="color: #999999;">
                                    120 followers
                                </div>
                            </div>
                            <div class="col-5 col-md-4 avatar rounded-circle d-flex justify-content-end">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                alt="Avatar" class="rounded-circle" />
                            </div> 
                        </div>
                    </div>
                    <div class="body">
                        <div class="sub-nav my-5">
                            <div class="row">
                                <div 
                                    class="blog col text-center py-2"
                                    @click="blogActive"
                                    :class="[ isBlog ? 'active' : '']"
                                >
                                    Blog
                                </div>
                                <div 
                                    class="card-shared col text-center py-2"
                                    @click="cardSharedActive"
                                    :class="[ isBlog ? '' : 'active']"
                                >
                                    Card
                                </div>
                            </div>
                            <div>
                                <PostBlog />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue'
import PostBlog from '../../../components/blog/PostBlog.vue'

export default {
    components: { PostBlog },
    setup() {
        const isBlog = ref(true)

        const blogActive = () => {
            isBlog.value = true
        }

        const cardSharedActive = () => {
            isBlog.value = false
        }

        return {
            isBlog,
            blogActive,
            cardSharedActive
        }
    }
}
</script>

<style scoped>
.container {
    min-height: 100vh;
}

.account {
    display: flex;
}

.account .follow {
    background-color: var(--color-gray-light);
    border-radius: 2rem;
    color: #999999;
    font-size: 12px;
    cursor: pointer;
}

.avatar img {
    width: 180px;
}

.blog, .card-shared {
    font-weight: 600;
    color: #999999;
    cursor: pointer;
    border-bottom: 1px solid #eeeeee;
}

.active {
    border-bottom: 1px solid #000;
    color: #000;
    transition: ease-in-out 0.3s;
}

@media screen and (max-width: 992px) {
    .avatar img {
        width: 140px;
        height: 140px;
    }
}

@media screen and (max-width: 576px) {
    .profile {
        font-size: 13px;
    }

    .avatar img {
        width: 120px;
        height: 120px;
    }
}
</style>
<template>
    <section class="profile" style="margin-top: 120px">
        <div class="container py-3">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-lg-8 col-md-10">
                    <div class="header mx-2">
                        <div class="row">
                            <div class="col-7 col-md-8 text-black">
                                <h4 class="row">{{ user.firstname + ' ' + user.lastname }}</h4>
                                <div class="account mb-2">
                                    <div class="row d-flex justify-content-center align-items-center">
                                        {{ user.username }}
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
                                <img :src="user.avatar || '../../../../public/img/user/avatar_default.png'"
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
                            <div v-if="isBlog">
                                <div v-for="(post, index) in listBlog" :key="index">
                                    <PostBlog :postProps="post"/>
                                </div>
                            </div>
                            <div v-else>
                                <div class="grid-container">
                                    <SetCard
                                        v-for="setCard in listSetCard"
                                        :key="setCard.id"
                                        :setCardProps="setCard"
                                        @cards-id="handleCallPath"
                                    />
                                </div>
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
import { useUserStore } from '../../../stores/user'
import blogApi from '../../../api/blogApi'
import cardApi from '../../../api/cardApi'
import SetCard from '../../../components/card/SetCard.vue'
import router from '../../../router'

export default {
    components: { PostBlog, SetCard },
    setup() {
        const storeUser = useUserStore()
        let user = ref({})
        const listBlog = ref([])
        const isBlog = ref(true)
        const listSetCard = ref([])

        try {
            user.value = JSON.parse(storeUser.user) || {}
        } catch (error) {
            console.error('Error parsing user data:', error)
        }

        const blogActive = () => {
            isBlog.value = true
        }

        const cardSharedActive = () => {
            isBlog.value = false
        }


        const getData = async () => {
            await blogApi.getPostPersonal()
            .then(response => {
                listBlog.value = response.listPost
                console.log(listBlog.value)
            })
            .catch(error => {
                console.error(error)
            })
        }
        getData()

        const getListSetCard = async () => {
            await cardApi.getListSetCards()
            .then(response => {
                listSetCard.value = response.listsFlashcards
            })
            .catch(err => {
                console.log('Oops! Something went wrong!','danger', 'Error')
            })
        }
        getListSetCard()

        const handleCallPath = (setCard) => {
            router.push({ path: `/flash-cards/${setCard}/home`})
        }

        return {
            isBlog,
            blogActive,
            cardSharedActive,
            user,
            listBlog,
            listSetCard,
            handleCallPath
        }
    }
}
</script>

<style scoped>

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
    height: 180px;
    object-fit: cover;
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

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 16px;
}

@media screen and (max-width: 500px) {
    .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
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
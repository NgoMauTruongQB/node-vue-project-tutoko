<template>
    <div class="settings container">
        <div class="main row mx-1">
            <div class="col-lg-3 box-menu my-5">
                <ul class="list-group">
                    <h4 class="title p-3">Account settings</h4>
                    <li :class="showBox === 1 ? 'active' : ''" @click="showBox = 1">General</li>
                    <li :class="showBox === 2 ? 'active' : ''" @click="showBox = 2">Change password</li>
                </ul>
            </div>
            <div v-if="showBox === 1" class="information col-lg-8 box-content my-5 mx-2">
                <h4 class="title p-3">Information</h4>
                <div class="content">
                    <form @submit.prevent="onSubmitForm1" class="row">
                        <div class="col-md-7">
                            <div class="m-3">
                                <div class="form-group my-2">
                                    <label for="username">Username</label>
                                    <input v-model="formData1.username" type="text" class="form-control" id="username">
                                </div>
                                <div class="form-group my-2">
                                    <label for="firstName">First name</label>
                                    <input v-model="formData1.firstName" type="text" class="form-control" id="firstName">
                                </div>
                                <div class="form-group my-2">
                                    <label for="lastName">Last name</label>
                                    <input v-model="formData1.lastName" type="text" class="form-control" id="lastName">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5 avatar">
                            <img :src="avatarImageUrl" alt="avatar_default" class="rounded-circle">
                            <div class="custom-file">
                                <input type="file" id="fileInput" class="custom-file-input" @change="handleFileChange">
                                <label for="fileInput" class="custom-file-label" :data-selected="selectedImage ? selectedImage.name : 'Change cover'"> Change avatar
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/></svg>
                                </label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="m-3">
                                <SiteButton class="my-2 btn-submit" title="Save changes" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="showBox === 2" class="password col-lg-8 box-content my-5 mx-2">
                <h4 class="title p-3">Password</h4>
                <div class="content row">
                    <form @submit.prevent="onSubmitForm2">
                        <div class="col-12">
                            <div class="m-3">
                                <div class="form-group my-2">
                                    <label for="currentpassword">Current password</label>
                                    <input v-model="formData2.currentpassword" @blur="v2$.currentpassword.$touch" type="password" class="form-control" id="currentpassword">
                                    <span class="error" v-for="error in v2$.currentpassword.$errors" :key="error.$uid">
                                        {{ error.$message }}.
                                    </span>
                                </div>
                                <div class="form-group my-2">
                                    <label for="newpassword">New password</label>
                                    <input v-model="formData2.newpassword" @blur="v2$.newpassword.$touch" type="password" class="form-control" id="newpassword">
                                    <span class="error" v-for="error in v2$.newpassword.$errors" :key="error.$uid">
                                        {{ error.$message }}.
                                    </span>
                                </div>
                                <div class="form-group my-2">
                                    <label for="verifypassword">Verify password</label>
                                    <input v-model="formData2.verifypassword" @blur="v2$.verifypassword.$touch" type="password" class="form-control" id="verifypassword">
                                    <span class="error" v-for="error in v2$.verifypassword.$errors" :key="error.$uid">
                                        {{ error.$message }}.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="m-3">
                                <SiteButton class="my-2 btn-submit" title="Save changes" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { ref, reactive, computed } from 'vue'
import SiteButton from '../../../components/partials/SiteButton.vue'
import useVuelidate from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'
import { useUserStore } from '../../../stores/user'
import userApi from '../../../api/userApi.js'
import { useToastStore } from '../../../stores/toast'
import authApi from '../../../api/authApi'
import router from '../../../router'


export default {
    components: { SiteButton },
    setup() {
        const storeUser = useUserStore()
        const avatarImageUrl = ref('')
        const selectedImage = ref(null)
        const storeToast = useToastStore()
        const showBox = ref(1)
        const imageSrc = ref('')
        const selectedFile = ref(null)
        let user = ref({})
        try {
            user.value = JSON.parse(storeUser.user) || {}
        } catch (error) {
            console.error('Error parsing user data:', error)
        }

        const handleFileChange = (event) => {
            const file = event.target.files[0]
            selectedFile.value = file
            if (file) {
                selectedImage.value = file

                const reader = new FileReader()
                reader.onload = (e) => {
                    const img = new Image()
                    img.src = e.target.result

                    img.onload = () => {
                        const canvas = document.createElement('canvas')
                        const ctx = canvas.getContext('2d')

                        const minSide = Math.min(img.width, img.height)
                        canvas.width = minSide
                        canvas.height = minSide

                        ctx.drawImage(img, (img.width - minSide) / 2, (img.height - minSide) / 2, minSide, minSide, 0, 0, minSide, minSide)

                        avatarImageUrl.value = canvas.toDataURL(file.type)
                    }
                }
                reader.readAsDataURL(file)
            }
        }

        const formData1 = reactive({
            username: user.value.username || '',
            firstName: user.value.firstname || '',
            lastName: user.value.lastname || ''
        })

        avatarImageUrl.value = user.value.avatar || '../../../../public/img/user/avatar_default.png'

        const onSubmitForm1 = async () => {
            const formData = new FormData()
            formData.append('username', formData1.username)
            formData.append('firstName', formData1.firstName)
            formData.append('lastName', formData1.lastName)
            formData.append('file', selectedFile.value)
            await userApi.changeInformation(formData)
            .then(response => {
                console.log(response)
                storeToast.addToast(response.message, 'success', 'Success')

                router.push({ path: '/login'})
                authApi.signOut()
                storeUser.onLogout()
                storeToast.addToast('Successfully, Please re-login to continue.', 'success', 'Success')
                
            })
            .catch(error => {
                if (error.response ) {
                    storeToast.addToast(error.response.data.message, 'warning', 'Warning')
                } else {
                    storeToast.addToast(error.message, 'danger', 'Error')
                }
            })
        }

        const formData2 = reactive({
            currentpassword: '',
            newpassword: '',
            verifypassword: ''
        })

        const rules2 = computed(() => ({
            currentpassword: { 
                required
            },
            newpassword: {
                required
            },
            verifypassword: { 
                required,
                sameAs: helpers.withMessage('The confirmation password is incorrect', sameAs(formData2.newpassword))
            },
        }))

        const v2$ = useVuelidate(rules2, formData2)


        const onSubmitForm2 = async () => {
            const result2 = await v2$.value.$validate()
            if (result2) {
                const data = {
                    ...formData2,
                    ...user.value
                }
                await userApi.changePassword(data)
                .then(response => {
                    router.push({ path: '/login'})
                    authApi.signOut()
                    storeUser.onLogout()
                    storeToast.addToast(response.message, 'success', 'Success')
                })
                .catch(error => {
                    if (error.response ) {
                        storeToast.addToast(error.response.data.message, 'warning', 'Warning')
                    } else {
                        storeToast.addToast(error.message, 'danger', 'Error')
                    }
                })
            }
        }

        return {
            avatarImageUrl,
            handleFileChange,
            selectedImage,
            showBox,
            formData2,
            onSubmitForm2,
            rules2,
            v2$,
            onSubmitForm1,
            formData1
        }
    }
}
</script>

<style scoped>

li {
    list-style: none;
}

.settings {
    margin-top: 90px;
}

.settings .main {
    display: flex;
    justify-content: space-around;
}

.box-menu {
    border: 1px solid #d7dadc;
    padding: 0;
    height: 100%;
    overflow-y: auto;
}

.list-group .title {
    width: 100%;
    color: var(--color-blue-darkest);
    border-bottom: 1px solid #d7dadc;
    margin: 0;
}

.list-group li {
    padding: 8px;
    cursor: pointer;
}

.list-group li.active {
    background-color: var(--color-gray-light);
    color: var(--color-brand);
    font-weight: 600;
}

.box-content {
    border: 1px solid #d7dadc;
    padding: 0;
}

.box-content .title {
    width: 100%;
    color: var(--color-blue-darkest);
    border-bottom: 1px solid #d7dadc;
    margin: 0;
}

.box-content .avatar {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    position: relative;
    min-height: 250px;
}

.box-content .avatar img {
    position: absolute;
    bottom: 60px;
    width: 176px;
    height: 176px;
    object-fit: cover;
    border-radius: 50%;
}

.custom-file {
    position: absolute;
    bottom: 20px;
}

.custom-file-input {
    display: none;
}

.custom-file-label {
    padding: 4px 12px;
    border: none;
    border-radius: 0.4rem;
    background-color: var(--color-blue-darkest);
    cursor: pointer;
    font-size: 12px;
    color: var(--color-white);
}

.custom-file-label svg {
    fill: var(--color-white);
}

.custom-file-input:checked + .custom-file-label::after {
    content: attr(data-selected)
}

.btn-submit {
    width: 100%;
}

span.error {
    color: var(--color-brand);
}


</style>
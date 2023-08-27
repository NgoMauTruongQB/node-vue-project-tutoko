<template>
<div class="global-container">
    <div class="card login-form">
        <div class="card-body">
            
            <h3 class="card-title text-center my-5">
                Log in to Wazen
                <img src="../../assets/img/logo/wazen2.png" width="50" alt="WAZEN">
            </h3>
            <div class="card-text">           
                <form @submit.prevent="login">
                    <div class="form-group my-3">
                        <label for="username">Username</label>
                        <input type="text" v-model="username" id="username" class="form-control form-control-sm">
                    </div>
                    <div class="form-group my-3">
                        <label for="password">Password</label>
                        <router-link to='/forgot-password' style="float:right; font-size:12px; color: var(--color-brand);">Forgot password?</router-link>
                        <input type="password" v-model="password" id="password" class="form-control form-control-sm">
                    </div>
                    <button type="submit" class="btn my-3">Sign in</button>
                    
                    <div class="sign-up my-3 text-center">
                        Don't have an account? <router-link to="/register" style="color: var(--color-brand)">Create One</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { ref, reactive, watch } from 'vue'
import authApi from '../../api/authApi.js'
import router from '../../router'

import { useToastStore } from '../../stores/toast'
import { useUserStore } from '../../stores/user'

export default {
    setup() {
        const username = ref('')
        const password = ref('')

        const storeToast = useToastStore()
        const storeUser = useUserStore()

        const login = async () => {
            await authApi.signIn({
                username: username.value,
                password: password.value
            })
            .then(response => {
                const accessToken = {
                    name: 'accessToken',
                    value: response.accessToken,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), 
                }
                document.cookie = `${accessToken.name}=${accessToken.value}; expires=${accessToken.expires.toUTCString()}`
                localStorage.setItem('refreshToken', response.refreshToken)

                storeToast.addToast(response.message, 'success', 'Success')
                router.push({ path: '/'})
                storeUser.onLogin(true)
            })
            .catch(error => {
                if (error.response ) {
                    storeToast.addToast(error.response.data.message, 'warning', 'Warning')
                } else {
                    storeToast.addToast(error.message, 'danger', 'Error')
                }
            })
        }
        
        return {
            login,
            username,
            password,
            storeToast,
        }
    }
}
</script>

<style scoped>

a {
    text-decoration: none;
}

.global-container{
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--color-white);
}

form{
	font-size: 14px;
}

.card-title{ 
    font-weight: 400; 
}

.btn{
	font-size: 14px;
    width: 100%;
}


.login-form{ 
	width:330px;
}

button{
    background-color: var(--color-brand);
    color: var(--color-white);
    font-weight: 600;
}

button:hover {
    color: var(--color-white);
    background-color: var(--color-blue-darkest);
}


.alert{
	font-size: 13px;
}

</style>
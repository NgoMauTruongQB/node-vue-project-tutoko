<template>
<div class="global-container">
    <ToastInfor/>
    <div class="card login-form">
        <div class="card-body">
            <h3 class="card-title text-center mb-5">Log in to Tutoko</h3>
            <div class="card-text">           
                <div class="alert alert-danger alert-dismissible fade show my-3" role="alert">Incorrect username or password.</div>
                <form @submit.prevent="login">
                    <div class="form-group my-3">
                        <label for="username">Username</label>
                        <input type="text" v-model="username" id="username" class="form-control form-control-sm" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group my-3">
                        <label for="password">Password</label>
                        <router-link to='/forgot-password' style="float:right;font-size:12px;">Forgot password?</router-link>
                        <input type="password" v-model="password" id="password" class="form-control form-control-sm">
                    </div>
                    <button type="submit" class="btn btn-primary my-3">Sign in</button>
                    
                    <div class="sign-up my-3 text-center">
                        Don't have an account? <a href="#">Create One</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { ref } from 'vue'
import authApi from '../../api/authApi.js'
import ToastInfor from '../../components/toast/ToastInfor.vue'
export default {
    components: { ToastInfor },
    setup() {
        const username = ref('')
        const password = ref('')
    
        const login = async () => {
            authApi.signIn({
                username: username.value,
                password: password.value
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.log(error.response.data.message)
                } else if(error.response && error.response.status === 404) {
                    console.log(error.response.data.message)
                } else {
                    console.log("Đã xảy ra lỗi:", error.message)
                }
            })
        }
        return {
            login,
            username,
            password
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


.alert{
	font-size: 13px;
}

</style>
<template>
<div class="global-container">
    <div class="card login-form">
        <div class="card-body">
            
            <h3 class="card-title text-center my-5">
                Register account
                <img src="../../assets/img/logo/wazen2.png" width="50" alt="WAZEN">
            </h3>
            <div class="card-text">
                <form @submit.prevent="register">
                    <div class="form-group row my-3">
                        <div class="col-md-6 my-md-0 my-3">
                            <label for="firstname">Firstname</label>
                            <input type="text" v-model="formData.firstname" @blur="v$.firstname.$touch" id="firstname" class="form-control form-control-sm">
                            <span v-for="error in v$.firstname.$errors" :key="error.$uid">
                                {{ error.$message }}.
                            </span>
                        </div>
                        <div class="col-md-6">
                            <label for="lastname">Lastname</label>
                            <input type="text" v-model="formData.lastname" @blur="v$.lastname.$touch" id="lastname" class="form-control form-control-sm">
                            <span v-for="error in v$.lastname.$errors" :key="error.$uid">
                                {{ error.$message }}. 
                            </span>
                        </div>
                    </div>
                    <div class="form-group my-3">
                        <label for="email">Email</label>
                        <input type="email" v-model="formData.email" @blur="v$.email.$touch" id="email" class="form-control form-control-sm" aria-describedby="emailHelp">
                        <span v-for="error in v$.email.$errors" :key="error.$uid">
                            {{ error.$message }}.
                        </span>
                    </div>
                    <div class="form-group my-3">
                        <label for="phone">Phone</label>
                        <input type="text" v-model="formData.phone" @blur="v$.phone.$touch" id="phone" class="form-control form-control-sm">
                        <span v-for="error in v$.phone.$errors" :key="error.$uid">
                            {{ error.$message }}.
                        </span>
                    </div>
                    <div class="form-group my-3">
                        <label for="username">Username</label>
                        <input type="text" v-model="formData.username" @blur="v$.username.$touch" id="username" class="form-control form-control-sm">
                        <span v-for="error in v$.username.$errors" :key="error.$uid">
                            {{ error.$message }}.
                        </span>
                    </div>
                    <div class="form-group row my-3">
                        <div class="col-md-6 my-md-0 my-3">
                            <label for="password">Password</label>
                            <input type="password" v-model="formData.password" @blur="v$.password.$touch" id="password" class="form-control form-control-sm">
                            <span v-for="error in v$.password.$errors" :key="error.$uid">
                                {{ error.$message }}.
                            </span>
                        </div>
                        <div class="col-md-6">
                            <label for="passwordConfirm">Confirm password</label>
                            <input type="password" v-model="formData.passwordConfirm" @blur="v$.passwordConfirm.$touch" id="passwordConfirm" class="form-control form-control-sm">
                            <span v-for="error in v$.passwordConfirm.$errors" :key="error.$uid">
                                {{ error.$message }}.
                            </span>
                        </div>
                    </div>
                    <button type="submit" class="btn my-3">Sign in</button>
                    
                    <div class="sign-up my-3 text-center">
                        Already have an account? <router-link to="/login" style="color: var(--color-brand)">Signin</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { ref, computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { maxLength, minLength, required, sameAs, email, helpers } from '@vuelidate/validators'
import { useToastStore } from '../../stores/toast.js'
import authApi from '../../api/authApi.js'
import router from '../../router'

export default {
    setup () {
        const storeToast = useToastStore()

        // Get data from register form
        const formData = reactive({
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirm: '',
        })

        // Validation form register
        const phoneNumber = helpers.regex(/^[0-9]\d{9}$/)

        const rules = computed(() => ({
            username: { 
                required,
                maxLength: maxLength(16),
                minLength: minLength(4)
            },
            firstname: { required },
            lastname: { required },
            email: { 
                required,
                email,
            },
            phone: { 
                required,
                phoneNumber: helpers.withMessage('Must be a phone number', phoneNumber)
            },
            password: { 
                required,
                minLength: minLength(6),
            },
            passwordConfirm: { 
                required,
                sameAs: helpers.withMessage('The confirmation password is incorrect', sameAs(formData.password))
            },
        }))
        
        const v$ = useVuelidate(rules, formData)

        // Check error and call API 
        const register = async () => {
            const result = await v$.value.$validate()
            if (result) {
                var data = {
                    ...formData,
                    status: 1,
                    role: 1,
                }
                await authApi.signUp(data) 
                .then(response => {
                    storeToast.addToast(response.message, 'success', 'Success')
                    router.push({ path: '/login'})
                })
                .catch(error => {
                    if (error.response) {
                        storeToast.addToast(error.response.data.message, 'warning', 'Warning')
                    } else {
                        storeToast.addToast(error.message, 'danger', 'Error')
                    }
                })
            }
        }


        return { 
            formData, 
            rules, 
            v$, 
            register,
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
	width: 420px;
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

span {
    font-size: 0.7rem;
    color: var(--color-brand);
}
</style>



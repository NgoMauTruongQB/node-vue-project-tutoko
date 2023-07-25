<template>
    <div class="container-fluid">
        <div class="row">
            <div class="left col-xl-8 col-md-6 d-flex justify-content-center"></div>
            <div class="right col-xl-4 col-md-6 mt-5">
                <ul class="nav nav-pills nav-justified mb-5" id="ex1" role="tablist">
                    <li class="nav-item mx-2">
                        <router-link to="/login" class="nav-link" id="tab-login" >Login</router-link>
                    </li>
                    <li class="nav-item mx-2">
                        <a class="nav-link active" id="tab-register">Reset</a>
                    </li>
                </ul>

                <div class="tab-content mx-2">
                    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <form>
                            <!-- Password input -->
                            <div class="form-outline mb-1">
                                <label class="form-label" for="registerPassword">Password</label>
                                <input type="password" id="registerPassword" class="form-control"/>
                                <label class="error"></label>
                            </div>

                            <!-- Repeat Password input -->
                            <div class="form-outline mb-1">
                                <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                                <input type="password" id="registerRepeatPassword" class="form-control"/>
                                <label class="error"></label>
                            </div>

                            <!-- Submit button -->
                            <div class="row">
                                <button type="submit" class="col btn btn-primary btn-block mb-4 mx-2 py-3">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

svg {
    fill: var(--color-blue);
}

.left {
    height: 100vh;
    background-image: url("../../assets/img/login/forgot-password.png");
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
}

.right .nav {
    margin-top: 2rem;
}

.right .nav-item .nav-link {
    border-radius: 0.6rem;
    padding: 1rem;
    border: 1px solid #0D6EFD;
}

.right .error {
    color: var(--color-danger);
}

.right input {
    padding: 0.7rem 0.6rem;
}

.right input::placeholder {
    color: #ccc;
}

@media screen and (max-width: 768px) {
    .left {
        height: 40vh;
    }

    .left h1 {
        display: none;
    }
}
</style>
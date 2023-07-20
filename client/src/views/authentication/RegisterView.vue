<template>
    <div class="container-fluid">
        <div class="row">
            <div class="left col-xl-8 col-md-6 d-flex justify-content-center">
                <h1 class="mt-5 pt-4">Hi! Welcome</h1>
            </div>
            <div class="right col-xl-4 col-md-6 mt-3">
                <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li class="nav-item mx-2">
                        <router-link to="/login" class="nav-link" id="tab-login">Login</router-link>
                    </li>
                    <li class="nav-item mx-2">
                        <a class="nav-link active" id="tab-register">Register</a>
                    </li>
                </ul>

                <div class="tab-content mx-2">
                    <div class="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                        <form>
                        <div class="text-center mb-3">
                            <p>Sign up with:</p>
                            <button type="button" class="btn btn-link btn-floating mx-1">
                                <a class="btn btn-floating text-white" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512">
                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                                </a>
                            </button>

                            <button type="button" class="btn btn-link btn-floating mx-1">
                                <a class="btn btn-floating" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 496 512">
                                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                                </a>
                            </button>

                            <button type="button" class="btn btn-link btn-floating mx-1">
                                <a class="btn btn-floating" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 488 512">
                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                                </a>
                            </button>
                        </div>

                        <p class="text-center">or:</p>

                        <!-- Name input -->
                        <div class="form-outline mb-1">
                            <label class="form-label" for="registerName">Name</label>
                            <input type="text" id="registerName" class="form-control" />
                            <label class="error"></label>
                        </div>

                        <!-- Username input -->
                        <div class="form-outline mb-1">
                            <label class="form-label" for="registerUsername">Username</label>
                            <input type="text" id="registerUsername" class="form-control" />
                            <label class="error"></label>
                        </div>

                        <!-- Email input -->
                        <div class="form-outline mb-1">
                            <label class="form-label" for="registerEmail">Email</label>
                            <input type="email" id="registerEmail" class="form-control" />
                            <label class="error"></label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-1">
                            <label class="form-label" for="registerPassword">Password</label>
                            <input type="password" id="registerPassword" class="form-control" />
                            <label class="error"></label>
                        </div>

                        <!-- Repeat Password input -->
                        <div class="form-outline mb-1">
                            <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                            <input type="password" id="registerRepeatPassword" class="form-control" />
                            <label class="error"></label>
                        </div>

                        <!-- Checkbox -->
                        <div class="form-check d-flex justify-content-start algin-items-center mb-3">
                            <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                            aria-describedby="registerCheckHelpText" />
                            <label class="form-check-label mt-1" for="registerCheck">
                            I have read and agree to the terms
                            </label>
                        </div>

                        <!-- Submit button -->
                        <div class="row">
                            <button type="submit" class="col btn btn-primary btn-block mb-4 mx-2 py-3">Sign in</button>
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
    height: 110vh;
    background-image: url("../../assets/img/login/login-register.png");
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
}

.left h1 {
    color: var(--color-white);
    font-size: 3rem;
    font-weight: 700;
    text-transform: uppercase;
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

@media screen and (max-width: 768px) {
    .left {
        height: 40vh;
        background-position: center bottom;
    }

    .left h1 {
        display: none;
    }
}
</style>
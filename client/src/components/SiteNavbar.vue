<template>
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid" >
                <a class="navbar-brand d-flex" href="#">
                    <img src="public/img/logo/logo.png" alt="Logo" width="64" class="d-inline-block align-text-top">
                    <h3 class="brand p-0 mb-0">Tutoko</h3>
                </a>
            <button 
                class="menu-toggle"
                @click="handleShowHide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </button>
            <div class="topnav" >
                <div :class="[isNavCollapse ? 'nav-collapse ' : 'collapse navbar-collapse']">
                    <a 
                        class="nav-link close-navbar" 
                        href="#" role="button" 
                        aria-expanded="false"
                        @click="handleShowHide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </a>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link nav-title active"> Trang chủ </router-link>
                        </li>
                        <li class="nav-item ">
                            <router-link to="/" class="nav-link nav-title"> Blog </router-link>
                        </li>

                        <!-- Notification -->
                        <li class="nav-item dropdown notification">
                            <a class="nav-link nav-title" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="icon-notification">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" class="bell" viewBox="0 0 448 512">
                                    <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
                                </i>
                                <span class="badge rounded-pill badge-notification bg-danger">1</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-lg-end slide-bottom">
                                <li><a class="dropdown-item" href="#">
                                    <div class="header">
                                        <p class="title">Thông báo</p>
                                        <p class="check">Đánh dấu đã đọc</p>
                                    </div>
                                </a></li>
                                <li><hr class="dropdown-divider m-2"></li>

                                <li><a class="dropdown-item" href="#">
                                    <div class="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                    </div>
                                    Thẻ ghi nhớ</a></li>
                            </ul>
                        </li>

                       <!-- Persional -->
                        <li class="nav-item dropdown">
                            <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="public/img/avatar/avatar_default.png" class="col p-0 logo" height="50" alt="Tutoko Logo" loading="lazy" />
                            </a>
                            <ul class="dropdown-menu dropdown-menu-lg-end slide-bottom">
                                <li><a class="dropdown-item" href="#" >
                                    <div class="row user-infor text-center justify-content-center" style="min-width: 300px;">
                                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="img-fluid rounded-circle mb-3" style="width: 100px;" alt="Avatar" />
                                        <h5 class="mb-2"><strong>Ngo Mau Truong</strong></h5>
                                        <p class="text-muted">Web designer <span class="badge bg-primary">PRO</span></p>
                                    </div>
                                </a></li>

                                <li><hr class="dropdown-divider m-2"></li>
                                <li><a class="dropdown-item item-selection" href="#">
                                    <router-link to="/about" class="nav-link"> 
                                        <div class="arrow">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                        </div>
                                        Trang cá nhân 
                                    </router-link>
                                </a></li>
                                <li><hr class="dropdown-divider m-2"></li>

                                <li><a class="dropdown-item item-selection" href="#">
                                    <div class="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                    </div>
                                    Thẻ ghi nhớ</a></li>
                                <li><a class="dropdown-item item-selection" href="#">
                                    <div class="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                    </div>
                                    Ghi chú của tôi</a></li>
                                <li><a class="dropdown-item item-selection" href="#">
                                    <div class="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                    </div>
                                    Bài viết đã lưu</a></li>
                                    
                                <li><hr class="dropdown-divider m-2"></li>
                                <li><a class="dropdown-item item-selection" href="#">
                                    <div class="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                    </div>
                                    Cài đặt</a></li>
                                <li><a class="dropdown-item item-selection" href="#">
                                    <div class="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                    </div>
                                    Đăng xuất</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        let isNavCollapse = ref(false)
        const handleShowHide = () => {
            isNavCollapse.value = !isNavCollapse.value
            console.log(isNavCollapse.value)
        }

        return {
            isNavCollapse,
            handleShowHide
        }
    },
}
</script>


<style scoped>

.navbar {
    background-color: #fff;
    border-bottom: 1px solid #e8ebed;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 3;
}

.navbar .brand {
    line-height: 64px;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--color-blue-dark)
}

.navbar .nav-title  {
    line-height: 50px;
}

.navbar .active {
    font-weight: 600;
    color: var(--color-blue-dark);
}

.navbar .notification ul {
    width: 26rem;
    max-height: 70vh;
}

.navbar .notification .header {
    display: flex;
    justify-content: space-between;
}

.notification .header p {
    margin: 0;
    color: var(--color-blue-dark);
}

.notification .header .title {
    font-weight: 600;
}

.notification .header .check {
    padding: 0 1rem;
}

.notification .header .check:hover {
    background-color: var(--color-white);
    border-radius: 1rem;
}

.navbar .bell:hover  {
    fill: var(--color-blue-dark);
}

.navbar .bell {
    fill: var(--color-gray-dark);
    padding: 0 1rem;
}

.navbar .icon-notification .bell {
    position: relative;
}

.navbar .badge-notification {
    position: absolute;
    left: 2.5rem
}

.menu-toggle {
    display: none;
    position: absolute;
    right: 2rem;
    border: none;
    background: none;
}

.menu-toggle svg {
    fill: var(--color-blue-dark)
}

.nav-link:focus-visible {
    outline: 0;
    box-shadow: none;
}

.navbar .dropdown-menu {
    box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.2);
    border: none;
}

.navbar .dropdown-item {
    background-color: var(--color-white-light);
}

.navbar .item-selection:hover {
    color: var(--color-blue);
}

.navbar .dropdown-item {
    color: var(--color-gray-dark);
}

.navbar .item-selection:hover .arrow {
    display: inline;
}

.navbar .arrow {
    display: none;
}

.navbar .arrow svg {
    fill: var(--color-blue);
}

.dropdown-divider {
    border: none;
    border-top: 1px solid rgba(0,0,0,.05);
    margin: 8px 0;
}

.close-navbar {
    display: none;
}

.close-navbar svg:hover {
    opacity: 0.5;
}

.close-navbar svg {
    fill: var(--color-blue-dark)
}

.slide-bottom {
	-webkit-animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/*
 * ----------------------------------------
 * animation slide-bottom
 * ----------------------------------------
 */
@-webkit-keyframes slide-bottom {
     0% {
        -webkit-transform: translateY(-10px);
                transform: translateY(-10px);
    }
    100% {
        -webkit-transform: translateY(5px);
                transform: translateY(5px);
    }
}
@keyframes slide-bottom {
    0% {
        -webkit-transform: translateY(-10px);
                transform: translateY(-10px);
    }
    100% {
        -webkit-transform: translateY(5px);
                transform: translateY(5px);
    }
}



/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media screen and (max-width: 991px) {
    .menu-toggle {
        display: block;
    }

    .navbar .nav-collapse {
        background-color: var(--color-white);
        position: fixed;
        z-index: 10;
        width: 40%;
        right: 0;
        top: 0;
        bottom: 0;
        
    }

    .close-navbar {
        padding: 2rem;
        display: flex;
        justify-content: end;
        cursor: pointer;
    }

    .navbar-nav {
        display: flex;
        flex-direction: column-reverse;
    }
    
    .topnav a.icon {
        float: right;
        display: block;
    }
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 991px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid" >

            <!-- logo & brand name -->
            <router-link to="/" class="navbar-brand d-flex" :class="{ active: isActive('/') }"> 
                <img src="../../../public/img/logo/logo.png" alt="Logo" width="64" class="d-inline-block align-text-top">
                <h3 class="brand p-0 mb-0">Tutoko</h3>
            </router-link>

            <!-- SideNav -->
            <div :class="isNavCollapse ? 'overlay' : '' " @click="handleShowHide"></div>
            <button class="menu-toggle" @click="handleShowHide">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </button>
            <div class="topnav">
                <div :class="['',isNavCollapse ? 'nav-collapse slide-in-left overflow-y-auto' : 'collapse navbar-collapse']">
                    <a 
                        class="nav-link close-navbar" 
                        href="#" role="button" 
                        aria-expanded="false"
                        @click="handleShowHide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </a>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item nav-right" @click="handleHide">
                            <router-link to="/" class="nav-link nav-title" :class="{ active: isActive('/') }"> 
                                Trang chủ 
                            </router-link>
                        </li>
                        <hr class="dropdown-divider mx-2">

                        <li class="nav-item nav-right" @click="handleHide">
                            <router-link to="/" class="nav-link nav-title" :class="{ active: isActive('/blog') }"> Blog </router-link>
                        </li>
                        <hr class="dropdown-divider mx-2">

                        <!-- Notification -->
                        <li class="nav-item nav-right dropdown notification" @click="handleHide">
                            <a v-if="isNavCollapse" class="nav-link">
                                <router-link to="/notification" class="nav-link " :class="{ active: isActive('/notification') }"> 
                                    Thông báo 
                                </router-link>
                            </a>
                            <a v-else class="nav-link nav-title" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="icon-notification" :class="{ active: isActive('/notification') }">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" class="bell" viewBox="0 0 448 512">
                                    <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
                                </i>
                                <span class="badge rounded-pill badge-notification bg-danger">
                                    {{ unreadCount }}
                                </span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-lg-end slide-bottom" :class="{ hide: isActive('/notification')}">
                                <div @click.stop class="overflow-y-auto" style="max-height: 60vh;">
                                    <Notifications
                                        @unread-notification-count="unreadNotificationCount"
                                    />
                                </div>
                                <li>
                                    <div class="text-center">
                                        <li><hr class="dropdown-divider m-2"></li>
                                        <router-link to="/notification" class="dropdown-item item-selection py-2"> 
                                            Xem tất cả thông báo 
                                        </router-link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <hr class="dropdown-divider mx-2">

                       <!-- Persional -->
                        <li class="nav-item dropdown">
                            <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown">
                                <img 
                                    src="../../../public/img/user/avatar_default.png" 
                                    height="50" 
                                    alt="Tutoko Logo"
                                    :class="['col p-0 logo', isNavCollapse ? 'hide' : '']" 
                                />
                            </a>
                            <ul :class="[isNavCollapse ? 'px-0' : 'dropdown-menu dropdown-menu-lg-end slide-bottom']" style="positon: abslute">
                                <li><a class="dropdown-item" href="#" >
                                    <div class="row user-infor text-center justify-content-center" style="min-width: 300px;">
                                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="img-fluid rounded-circle mb-3" style="width: 100px;" alt="Avatar" />
                                        <h5 class="mb-2"><strong>Ngo Mau Truong</strong></h5>
                                        <p class="text-muted">Web Fullstack Developer <span class="badge bg-primary">PRO</span></p>
                                    </div>
                                </a></li>
                                <li><hr class="dropdown-divider m-2"></li>

                                <li @click="handleHide">
                                    <router-link to="/personal" class="dropdown-item item-selection py-2" :class="{ active: isActive('/personal') }"> 
                                        <IconArrow />
                                        Trang cá nhân 
                                    </router-link>
                                </li>
                                <li><hr class="dropdown-divider m-2"></li>

                                <li @click="handleHide">
                                    <router-link to="/set-cards" class="dropdown-item item-selection py-2" :class="{ active: isActive('/flash-cards') }"> 
                                        <IconArrow />
                                        Thẻ ghi nhớ
                                    </router-link>
                                </li>
                                <li @click="handleHide">
                                    <router-link to="/" class="dropdown-item item-selection py-2" :class="{ active: isActive('') }"> 
                                        <IconArrow />
                                        Ghi chú của tôi
                                    </router-link>
                                </li>
                                <li @click="handleHide">
                                    <router-link to="/" class="dropdown-item item-selection py-2" :class="{ active: isActive('') }"> 
                                        <IconArrow />
                                        Bài viết đã lưu
                                    </router-link>
                                </li> 
                                <li><hr class="dropdown-divider m-2"></li>

                                <li @click="handleHide">
                                    <router-link to="/" class="dropdown-item item-selection py-2" :class="{ active: isActive('') }"> 
                                        <IconArrow />
                                        Cài đặt
                                    </router-link>
                                </li>
                                <li @click="handleHide">
                                    <router-link to="/" class="dropdown-item item-selection py-2" :class="{ active: isActive('') }"> 
                                        <IconArrow />
                                        Đăng xuất
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import IconArrow from '../icon/IconArrow.vue'
import Notifications from '../notification/Notifications.vue'
import { useRoute } from 'vue-router'

export default {
    name: 'SiteNavbar',
    components: { 
        IconArrow,
        Notifications
    },
    setup() {
        // Handle active navbar
        const route = useRoute()
        const isActive = (routePath) => {
            return route.path === routePath
        }

        // Handle reponsive navbar
        let isNavCollapse = ref(false)
        const handleShowHide = () => {
            isNavCollapse.value = !isNavCollapse.value
        }

        const handleHide = () => {
            isNavCollapse.value = false
        }

        const handleResize = () => {
            if (window.innerWidth > 991) 
                isNavCollapse.value = false
        }

        onMounted(() => {
            window.addEventListener('resize', handleResize)
        })

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
        })

        // Handle Unread Notification Count
        const unreadCount = ref(0)
        const unreadNotificationCount = (CountNumber) => {
            unreadCount.value = CountNumber
        }

        return {
            isNavCollapse,
            handleShowHide,
            handleResize,
            unreadCount,
            unreadNotificationCount,
            isActive,
            handleHide
        }
    },
}
</script>


<style scoped>

li {
    list-style: none;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 6;
}

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

.active .dropdown-item {
    font-weight: 600;
}

.navbar .notification ul {
    width: 30rem;
}

.navbar .active .bell  {
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

.navbar .dropdown-item {
    color: var(--color-gray-dark);
}

.navbar .item-selection:hover .arrow {
    display: inline;
}

.navbar .arrow {
    display: none;
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

.navbar .hide {
    display: none;
}

@media screen and (max-width: 991px) {

    .menu-toggle {
        display: block;
    }

    .navbar .nav-collapse {
        background-color: var(--color-white);
        position: fixed;
        z-index: 10;
        width: 70vw;
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
        width: 100%;
        flex-direction: column-reverse;
        
    }

    .navbar .nav-title {
        line-height: 24px;
    }

    .nav-right {
        padding-left: 2rem;
    }

    .navbar .item-selection:hover .arrow {
        display: none;
    }
    
    .dropdown-item.item-selection {
        padding-left: 32px;
    }
}

@media screen and (max-width: 600px) {
    .navbar .nav-collapse {
        width: 100vw;
    }
}


.slide-bottom {
	-webkit-animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-in-left {
	-webkit-animation: slide-in-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-in-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-out-left {
	-webkit-animation: slide-out-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-out-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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

/*
 * ----------------------------------------
 * animation slide-left
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-left {
    0% {
        -webkit-transform: translateX(50px);
                transform: translateX(50px);
    }
    100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
    }
}
@keyframes slide-in-left {
    0% {
        -webkit-transform: translateX(50px);
                transform: translateX(50px);
    }
    100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
    }
}

@-webkit-keyframes slide-out-left {
    0% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
    }
    100% {
        -webkit-transform: translateX(50px);
                transform: translateX(50px );
    }
}
@keyframes slide-out-left {
    0% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
    }
    100% {
        -webkit-transform: translateX(50px);
                transform: translateX(50px );
    }
}

</style>
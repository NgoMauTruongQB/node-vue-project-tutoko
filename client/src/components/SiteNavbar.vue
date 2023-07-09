<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-scroll">
        <div class="container-fluid" >
            <div class="row">
                <img src="public/img/logo/logo.png" class="col p-0 logo" height="64" alt="Tutoko Logo" loading="lazy" />
                <h3 class="brand col p-0 mb-0">Tutoko</h3>
            </div>
            <button 
                class="menu-toggle"
                @click="showRightnav"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </button>
            <div :class="['topnav', isShowRightnav ? 'responsive' : '']" >
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <li class="nav-item active">
                            <router-link to="/" class="nav-link active"> Trang chủ </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link"> Thông báo </router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="public/img/avatar/avatar_default.png" class="col p-0 logo" height="50" alt="Tutoko Logo" loading="lazy" />
                            </a>
                            <ul class="dropdown-menu dropdown-menu-lg-end">
                                <li><a class="dropdown-item " href="#" >
                                    <div class="row user-infor text-center justify-content-center" style="min-width: 300px;">
                                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="img-fluid rounded-circle mb-3" style="width: 100px;" alt="Avatar" />
                                        <h5 class="mb-2"><strong>Ngo Mau Truong</strong></h5>
                                        <p class="text-muted">Web designer <span class="badge bg-primary">PRO</span></p>
                                    </div>
                                </a></li>

                                <li><hr class="dropdown-divider m-2"></li>
                                <li><a class="dropdown-item" href="#">Trang cá nhân</a></li>
                                <li><a class="dropdown-item" href="#">Bài viết của tôi</a></li>
                                <li><a class="dropdown-item" href="#">Thẻ ghi nhớ</a></li>
                                <li><a class="dropdown-item" href="#">Ghi chú của tôi</a></li>

                                <li><hr class="dropdown-divider m-2"></li>
                                <li><a class="dropdown-item" href="#">Bài viết đã lưu</a></li>
                                <li><a class="dropdown-item" href="#">Bài kiểm tra</a></li>
                                <li><a class="dropdown-item" href="#">Bài tập của tôi</a></li>
                                

                                <li><hr class="dropdown-divider m-2"></li>
                                <li><a class="dropdown-item" href="#">Cài đặt</a></li>
                                <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
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
        let isShowRightnav = ref(false)
        const showRightnav = () => {
            isShowRightnav.value = !isShowRightnav.value
            console.log(isShowRightnav.value)
        }

        return {
            isShowRightnav,
            showRightnav
        }
    },
}
</script>


<style scoped>

.navbar {
    background-color: #fff;
    border-bottom: 1px solid #e8ebed;
    display: flex;
    justify-content: space-between;
    position: relative;
}

.navbar .brand {
    line-height: 64px;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--color-blue-dark)
}

.navbar .nav-link  {
    line-height: 50px;
}

.menu-toggle {
    display: none;
}

/* Color of the links BEFORE scroll
.navbar-scroll .nav-link,
.navbar-scroll .fa-bars,
.navbar-scroll .navar-brand {
    color: #4f4f4f;
}

.navbar-scroll .nav-link:hover {
    color: #1266f1;
}
.navbar-scrolled .nav-link,
.navbar-scrolled .fa-bars,
.navbar-scrolled .navar-brand {
    color: #4f4f4f;
}

.navbar-scroll,
.navbar-scrolled {
    background-color: #fff;
}

.navbar.navbar-scroll.navbar-scrolled {
    padding-top: 5px;
    padding-bottom: 5px;
}

body {
    background-color: #eee;
} */


/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media screen and (max-width: 600px) {
  /* .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  } */
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 600px) {
  /* .topnav.responsive {position: relative;}
  .topnav.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  } */
}
</style>

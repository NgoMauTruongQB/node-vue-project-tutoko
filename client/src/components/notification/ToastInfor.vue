<template>
    <div :class="['toast', status, visibility ? 'show' : 'hide']" aria-live="assertive" aria-atomic="true">
        <div class="toast-header" >
            <strong class="me-auto">{{ title }}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            {{ message }}
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'ToastInfor',
    props: ['message', 'status', 'title'],
    setup(props) {
        const visibility = ref(false)
        if(props) {
            visibility.value = true
        }
    
        const handleClose = () => {
            visibility.value = false
        }

        setTimeout(() => {
            handleClose()
        }, 5000)

        return {
            visibility,
            handleClose
        }
    }
}
</script>

<style scoped>
.toast {
    border: none;
    background-color: var(--color-white);
}

.show {
    animation: show_toast 0.8s ease forwards;
}

.toast::before {
    position: absolute;
    content: "";
    height: 3px;
    width: 100%;
    bottom: 0px;
    left: 0px;
    animation: progress 5s linear forwards;
    border-radius: 4px;
}


@keyframes progress {
    100% {
        width: 0%;
    }
}

.toast-header {
    border-bottom: none;
    color: var(--color-white);
}

.toast.infor::before,
.infor .toast-header {
    background-color: var(--color-blue);
}

.toast.success::before,
.success .toast-header {
    background-color: var(--color-blue);
}

.toast.danger::before,
.danger .toast-header {
    background-color: var(--color-danger);
}

.toast.warning::before,
.warning .toast-header {
    background-color: var(--color-yellow);
}

@keyframes show_toast {
    0% {
        transform: translateX(100%);
    }
    40% {
        transform: translateX(-5%);
    }
    80% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-10px);
    }
}

@keyframes hide_toast {
    0% {
        transform: translateX(-10px);
    }
    40% {
        transform: translateX(0%);
    }
    80% {
        transform: translateX(-5%);
    }
    100% {
        transform: translateX(calc(100% + 20px));
    }
}

</style>
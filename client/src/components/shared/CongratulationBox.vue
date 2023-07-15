<template>
    <div :class="[ isHidden ? 'hidden': '' ]" class="congratulation-model position-fixed d-flex justify-content-center align-items-center">
        <div class="main">
            <div 
                class="header d-flex justify-content-end p-2 mt-2 mx-2"
                @click="hiddenModel"
            >
                <IconClose />
            </div>
            <div class="body text-center py-5">
                <img src="../../assets/img/icon/congratulation.png" alt="">
            </div>
            <div class="footer d-flex justify-content-center align-items-center ">
                <button class="d-flex justify-content-center align-items-center p-3">
                    Practice
                </button>

            </div>
        </div>
    </div>
</template>

<script>
import IconClose from '../icon/IconClose.vue'
import { ref } from 'vue'

export default {
    components: { IconClose },
    setup() {
        const isHidden = ref(false)
        const hiddenModel = () => {
            isHidden.value = true
        }

        return {
            hiddenModel,
            isHidden
        }
    }
}
</script>

<style scoped>

.congratulation-model {
    z-index: 100;
    background-color: rgba(235, 235, 235, 0.64);
    width: 100vw;
    height: 100%;
    margin-top: -8rem;
}

.congratulation-model .main {
    background-color: var(--color-white);
    min-width: 36rem;
    border-radius: 1rem;
}

.body img {
    width: 10rem;

}

.footer {
    width: 100%;
}

.footer button {
    width: 100%;
    border: none;
    background-color: var(--color-blue);
    color: var(--color-white);
    text-transform: uppercase;
    font-weight: 600;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
}

.footer button:hover {
    opacity: 0.8;
}

.hidden {
    display: none !important;
}

</style>
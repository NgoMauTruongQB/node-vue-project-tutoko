<template>
<div>
    <div class="global-container">
        <div class="toast-container position-fixed bottom-0 end-0 p-3" >
            <ToastInfor v-for="toast in storeToast.toasts" :key="toast.id" :message="toast.message" :status="toast.status" :title="toast.title" />
        </div>
    </div>
    <component :is="layout" >
        <router-view />
    </component>
</div>

</template>

<script>
import { useRoute } from 'vue-router'
import { computed, markRaw, watch, ref } from 'vue'
import { useToastStore } from './stores/toast'
import ToastInfor from './components/notification/ToastInfor.vue'


export default {
    components: { ToastInfor },
    setup() {
        const defaultLayout = 'DefaultLayout'
        const route = useRoute()
        const layout = ref() 
        const storeToast = useToastStore()

        watch(
            () => route.meta?.layout,
            async (metaLayout) => {
                try {
                    let component = await import(`./layouts/${defaultLayout}.vue`)

                    if(metaLayout) {
                        component = await import(`./layouts/${metaLayout}.vue`)
                    }
                    layout.value = markRaw(component?.default)
                } catch (error) {
                    layout.value = markRaw(defaultLayout)
                    layout.value = markRaw(component)
                }
            },
            { immediate: true}
        )

        return {
            layout,
            storeToast
        }
    }
}
</script>
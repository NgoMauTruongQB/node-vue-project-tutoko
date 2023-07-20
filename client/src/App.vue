<template>
    <div>
        <SiteNavBar v-if="!isHide"/>
        <main>
            <RouterView />
        </main>
        <SiteFooter v-if="!isHide"/>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import SiteNavBar from './components/partials/SiteNavbar.vue'
import SiteFooter from './components/partials/SiteFooter.vue'

export default {
    name: 'App',
    components: {
        SiteNavBar,
        SiteFooter
    },
    setup() {
        const isHide = ref(false)
        const route = useRoute()
        watch(
            () => route.path,
            (newPath) => {
                isHide.value = newPath === '/login' || newPath === '/register' || newPath === '/forgot-password' || newPath === '/reset-password'
            }
        )

        return {
            isHide
        }
    }
}
</script>
<style scoped>
</style>

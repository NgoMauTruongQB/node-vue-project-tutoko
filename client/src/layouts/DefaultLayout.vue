<template>
    <div :style="backgroundStyle">
        <SiteNavBar />
        <main>
            <RouterView />
        </main>
        <SiteFooter />
    </div>
</template>

<script>
import SiteNavBar from '../components/partials/SiteNavbar.vue'
import SiteFooter from '../components/partials/SiteFooter.vue'

export default {
    components: {
        SiteNavBar,
        SiteFooter
    },
    computed: {
        backgroundStyle() {
            const isCreateSetPage = this.$route.path.includes('/create-set/')
            return isCreateSetPage ? { backgroundColor: 'var(--color-gray-bg)' } : {}
        }
    }
}
</script>
<style scoped>
</style>
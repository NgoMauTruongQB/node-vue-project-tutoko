<template>
    <div>
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
    }
}
</script>
<style scoped>
</style>
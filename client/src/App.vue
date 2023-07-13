<template>
    <div>
        <SiteNavBar/>
        <main style="margin-top: 100px">
            <RouterView />
        </main>
        <SiteFooter/>
    </div>
</template>

<script>
import SiteNavBar from './components/partials/SiteNavbar.vue'
import SiteFooter from './components/partials/SiteFooter.vue'

export default {
    name: 'App',
    components: {
        SiteNavBar,
        SiteFooter
    }
}
</script>
<style scoped>
</style>

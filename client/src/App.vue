<template>
    <div class="flex flex-col h-screen">
        <SiteNavBar/>
        <main>
            <RouterView />
        </main>
        <SiteFooter/>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import SiteNavBar from './components/SiteNavbar.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
    name: 'App',
    components: {
        SiteNavBar,
        SiteFooter
    }
}
</script>

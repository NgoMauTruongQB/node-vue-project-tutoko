<template>
    <div class="home">
        <SiteSlider />
    </div>
</template>

<script>
import SiteSlider from '../components/home/SiteSlider.vue'

export default {
    name: 'HomeView',
    components: {
        SiteSlider
    }
}
</script>

<style scoped>
.home {
    margin: 1%;
}
</style>


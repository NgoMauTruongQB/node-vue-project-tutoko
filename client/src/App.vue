<script setup>
import { useRoute } from 'vue-router'
import { computed, markRaw, watch, ref } from 'vue'

const defaultLayout = 'DefaultLayout'
const route = useRoute()
const layout = ref() 

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


</script>

<template>
    <component :is="layout">
        <router-view />
    </component>
</template>
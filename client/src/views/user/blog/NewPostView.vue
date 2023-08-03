<template>
    <div class="new-post">
        <header class="inverted" style="margin-top: 100px;">
            <div class="d-flex justify-content-end algin-items-center m-3">
                <button class="btn mx-2">Clear</button>
                <button class="btn">Create</button>
            </div>
        </header>
        <div>
            <CKEditorCutomer />
        </div>
    </div>
</template>

<script>
    import CKEditorCutomer from '../../../components/blog/CKEditorCutomer.vue'

    export default {
        name: 'NewPostView',
        components: { CKEditorCutomer },
        setup() {

        }
        
    }
</script>

<style scoped>
.new-post button {
    background-color: var(--color-brand);
    color: var(--color-white);
}
</style>
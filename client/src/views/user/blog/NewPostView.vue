<template>
    <div class="new-post">
        <header class="inverted" style="margin-top: 100px;">
            <div class="d-flex justify-content-end algin-items-center m-3">
                <button class="btn">Create a post</button>
            </div>
        </header>
        <div id="new-post-view" style="min-height: 100vh">
            <ckeditor 
                :editor="editor" 
                v-model="editorData" 
                @ready="onReady" 
                @input="onChange" 
                :config="editorConfig"
            >
            </ckeditor>
        </div>
    </div>
</template>
<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    import CKEditor from '@ckeditor/ckeditor5-vue'
    
    import { ref } from 'vue'

    export default {
        name: 'NewPostView',
        components: {
            ckeditor: CKEditor.component
        },
        setup() {
            const editor = ref(ClassicEditor)
            const editorData = ref('<p>"Enter the content here.."</p>')
            const onReady = ( editor ) => {
                console.log( 'CKEditor5 Vue Component is ready to use!', editor )
            }
            const onChange = ( data ) => {
                console.log( data )
            }
            return {
                editor,
                editorData,
                onChange,
                onReady
            }
        }
    }
</script>

<style scoped>
.new-post button {
    background-color: var(--color-blue);
    color: var(--color-white);
}
</style>

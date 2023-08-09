<template>
    <ckeditor 
        :editor="editor" 
        v-model="editorData" 
        :config="editorConfig"
        @ready="onReady" 
        @input="onChange" 
        @blur="onEditorBlur"
    ></ckeditor>
</template>


<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { defineComponent, ref } from 'vue';
import uploadImage from '../../utils/functions.js'

export default defineComponent({
    setup() {
        const editor = ref(ClassicEditor)
        const editorData = ref('<p>Content of the editor.</p>')

        function uploader(editor) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                return  uploadImage(loader)
            }
        }

        const onReady = ( editor ) => {
                console.log( 'CKEditor5 Vue Component is ready to use!', editor )
            }

        const onChange = ( data ) => {
            console.log( data )
        }

        const onEditorBlur = () => {
            console.log( editorData.value )
        }
    
        return {
            editor,
            editorData,
            onReady,
            onChange,
            onEditorBlur,
            editorConfig: {
                extraPlugins: [uploader]
            }
        };
    }
})
</script>

<style>

</style> 
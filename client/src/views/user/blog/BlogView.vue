<template>
    <div class="blog">
        <div class="rendered-html" v-html="renderHTML" />
    </div>
</template>

<script>

import pako from 'pako'
import blogApi from '../../../api/blogApi.js'

export default {
    setup() {

        const decompress = (text) => {
            const decompressedText = pako.inflate(text, { to: 'string' })
            return decompressedText
        }

        return {
            decompress
        }

    }
}
</script>

<style scoped>
.blog {
    margin-top: 100px;
}
</style>

<style >

.ql-container.ql-snow {
    min-height: 100vh;
}

.ql-toolbar.ql-snow {
    border: none;
}

.ql-container.ql-snow {
    border: none;
}

.ql-image {
    max-width: 900px !important;
}

.ql-align-right {
    text-align: end;
}

.ql-align-center {
    text-align: center;
}

.ql-align-justify {
    text-align: justify;
}
</style>

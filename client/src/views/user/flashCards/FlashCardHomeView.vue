<template>
    <div style="background-color: var(--color-gray-bg);">
        <section class="container list-flashcard-home">
            <div class="header">
                <h2 class="mx-2 py-4 text-center">言葉 - 趣味</h2>
            </div>
            <div class="body">
                <div class="row mx-2 infor">
                    <div class="col-11 row">
                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="col-1 img-fluid rounded-circle mb-3" style="width: 80px;" alt="Avatar" />
                        <div class="col-3">
                            <p class="m-0">Tác giả</p>
                            <h6 class="mb-2">Ngo Mau Truong</h6>
                        </div>
                    </div>
                    <div class="col">
                        <button class="btn d-flex justify-content-center align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                        </button>
                    </div>
                </div>
                <div class="selection row mx-2 my-5">
                    <div @click="handleStudy" class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn icon d-flex justify-content-start align-items-center">
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                            <path d="M128 0C92.7 0 64 28.7 64 64V288H19.2C8.6 288 0 296.6 0 307.2C0 349.6 34.4 384 76.8 384H320V288H128V64H448V96h64V64c0-35.3-28.7-64-64-64H128zM512 128H400c-26.5 0-48 21.5-48 48V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V256H544c-17.7 0-32-14.3-32-32V128zm32 0v96h96l-96-96z"/></svg>
                        </div>
                        Học
                    </div>
                    <div class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn icon d-flex justify-content-start align-items-center">
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"/></svg>
                        </div>
                        Luyện tập
                    </div>
                    <div class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn d-flex justify-content-start align-items-center">
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                            <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>
                        </div> 
                        Trò chơi
                    </div>
                    <div class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn icon d-flex justify-content-start align-items-center">
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z"/></svg>
                        </div>
                        Thêm thuật ngữ
                    </div>
                    <div class="py-3 m-1 col-lg-2 col-sm-6 col-12 btn icon d-flex justify-content-start align-items-center">
                        <div class="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                        </div>
                        Xoá học phần
                    </div>
                </div>
                <div class="mx-2">
                    <h5>Thuật ngữ trong học phần này (123)</h5>
                </div>
                <div>
                    <CardPreview />
                    <CardPreview />
                    <CardPreview />
                    <CardPreview />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import CardPreview from '../../../components/card/CardPreview.vue'

export default {
    components: { CardPreview },
    setup() {
        const handleStudy = () => {

        }

        return { handleStudy }
    }
}
</script>

<style scoped>
.container {
    background-color: var(--color-gray-bg);
    min-height: 100vh;
}

.header {
    color: var(--color-blue-darker);
}

.infor {
    position: relative;
}

.infor button:active {
    border: 1px solid var(--color-blue-darkest);
}

.infor button:hover {
    scale: 1.4;
}

.infor button {
    border: none;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 10rem;
    background-color: var(--color-white);
    position: absolute;
    right: 0;
}

.infor button svg {
    fill: var(--color-blue-darkest);
}

.selection .btn {
    border: none;
    background-color: var(--color-white);
    box-shadow: 0 0.25rem 1rem 0 var(--color-gray-light);
    border-radius: 0.4rem;
    justify-content: left;
    border-left: 3px solid var(--color-gray-light);
    border-bottom: 3px solid var(--color-gray-light);
}

.selection {
    display: flex;
    justify-content: space-between;
}

.selection .btn:hover {
    border-left: 3px solid var(--color-blue);
    border-bottom: 3px solid var(--color-blue);
}

.selection svg {
    fill: var(--color-blue)
}

@media screen and (max-width: 991px) {
    .selection .btn {
        width: 100%;
    }
}
</style>
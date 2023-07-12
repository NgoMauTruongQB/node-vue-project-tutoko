<template>
    <section class="demo-flash-card my-3">
        <div class="rectangle-top"></div>
        <div class="arrow-down"></div>
        <div class="rectangle">
            <p></p>
        </div>
        <div class="body">

        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.demo-flash-card {
    width: 18rem;
    position: relative;
    margin: auto;
    border-radius: 1.4rem;
    height: 14rem;
    background-color: var(--color-white);
}

.rectangle {
    background-color: var(--color-blue-light);
    position: absolute;
    height: 12.4rem;
    width: 18rem;
    bottom: 0;
    border-radius: 1.4rem;
    border-top-left-radius: 0;
}

.rectangle-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 11rem;
    height: 3rem;
    background-color: var(--color-blue-light);
    border-top-left-radius: 1.4rem;
}

.arrow-down {
    width: 0; 
    height: 0; 
    border-left: 3em solid transparent;
    border-top: 3rem solid #fff;
    position: absolute;
    left: 8.5rem; 
} 

.demo-flash-card:hover .rectangle,
.demo-flash-card:hover .rectangle-top {
    background-color: var(--color-blue-dark);
    cursor: pointer;
}

</style>
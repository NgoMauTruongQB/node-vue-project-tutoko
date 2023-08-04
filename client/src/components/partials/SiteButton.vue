<template>
    <button >
        <span >{{ title }}</span>
    </button>
</template>

<script>
export default {
    name: 'SiteButton',
    props: {
        title: String
    }

}
</script>

<style scoped>

button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.4rem;
    background: var(--color-brand);
    overflow: hidden;
    border: none;
}

button:after {
    content: " ";
    width: 0%;
    height: 100%;
    position: absolute;
    transition: all 0.4s ease-in-out;
    background: var(--color-blue-darkest);
    right: 0;
}

button:hover::after {
    right: auto;
    left: 0;
    width: 100%;
}

button span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 0.4rem 0.6rem;
    color: var(--color-white);
    font-weight: 700;
    z-index: 1;
    transition: all 0.3s ease-in-out;
}

button:hover span {
    color: var(--color-white);
    animation: scaleUp 0.3s ease-in-out;
}

@keyframes scaleUp {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.95);
    }

    100% {
        transform: scale(1);
    }
}

</style>
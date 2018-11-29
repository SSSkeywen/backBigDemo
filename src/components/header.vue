<template>
    <div>
        <header class="header" v-text="headerContent"></header>
    </div>
</template>

<script>
    export default {
        props:['headerContent']
    }
</script>

<style scoped>
.header{
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #006CB7;
    color: #fff;
    text-align: center;
    font-size: 0.36rem;
}
</style>
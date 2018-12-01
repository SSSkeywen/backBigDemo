<template>
    <div>
        <div class="tips-img">
            <img :src="tipsIconSrc" alt="">
        </div>
        <p class="tips-font">{{tipsContent}}</p>
    </div>
</template>

<script>
    export default {
        props:['tipsContent'],
        data() {
            return {
                tipsIconSrc: require('@/assets/mgImg/confim.png')
            }
        },
    }
</script>

<style lang="scss" scoped>
.tips-img{
    width: 2rem;
    margin: 0.3rem auto 0.1rem;
    img{
        width: 100%;
    }
}
.tips-font{
    padding: 0.2rem;
    text-align: justify;
}
</style>
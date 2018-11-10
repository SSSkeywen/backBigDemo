<template>
    <div>
        <ul class="nav-list">
            <li v-for="(item,index) in navLists" :key="index" @click="jumpChildPage(item.navPath)">
                <div>
                    <img :src="item.navIcon" alt="">
                </div>
                <p>{{item.navTitle}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:['navLists'],
        mounted(){
        },
        methods: {
            jumpChildPage(pathAddress) {
                this.$router.push({ path: pathAddress });
            }
        },
    }
</script>

<style lang="scss" scoped>
.nav-list{
    display: flex;
    flex-wrap: wrap;
    li{
        width: 25%;
        padding: 0.27rem 0.1rem 0.19rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div{
            width: 0.54rem;
            img{
                width: 100%;
            }
        }
        p{
            font-size:0.26rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(57,57,60,1);
            line-height:0.28rem;
            margin-top: 0.23rem;
        }
    }
}
</style>
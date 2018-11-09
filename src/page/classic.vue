<template>
    <div>
        <header>
            <clientMessage></clientMessage>
        </header>
        <classicNav :navListsOne="navListsOne"></classicNav>
        <ul>
            <li>
                <p @click="myGuaranteeSlip">信息查询</p>
            </li>
        </ul>
    </div>
</template>

<script>
import clientMessage from '../components/classicComponent/clientMessage'
import classicNav from '../components/classicComponent/classicNav'
    export default {
        data() {
            return {
                data() {
                    return {
                        navListsOne:'111',
                        navLists: [
                            {
                                navIcon:require('@/assets/classicImg/icon01.png'),
                                navTitle: '我的保单',
                                navPath:'',
                            }
                        ]
                    }
                },
            }
        },
        components:{
            clientMessage,
            classicNav
        },
        methods: {
            myGuaranteeSlip() {
                this.$router.push({ path: "/messageInquire" });
            }
        },
    }
</script>

<style scoped lang="scss">
    div{
        font-size: 16px;
        img{
            display: block;
        }
    }
</style>
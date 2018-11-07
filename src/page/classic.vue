<template>
    <div>
        <header>
            <clientMessage></clientMessage>
        </header>
        <ul>
            <li>
                <p @click="myGuaranteeSlip">信息查询</p>
            </li>
        </ul>
    </div>
</template>

<script>
import clientMessage from '../components/clientMessage'
    export default {
        data() {
            return {
            }
        },
        components:{
            clientMessage
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
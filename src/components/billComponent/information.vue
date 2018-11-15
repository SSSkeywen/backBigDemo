<template>
    <div class="im-box">
        <hgroup class="im-hgroup">
            <span>保单号：003158178991008</span>
        </hgroup>
        <ul class="im-ul">
            <li>
                <p>生效日期：</p>
                <p>2011-03-23</p>
            </li>
            <li>
                <p>主险名称：</p>
                <p>太平爱爸妈骨折综合意外伤害保险</p>
            </li>
            <li>
                <p>投保人：</p>
                <p>黄澄澄</p>
            </li>
            <li>
                <p>被保险人：</p>
                <p>张亚芳</p>
            </li>
            <li>
                <p>费用发生日期：</p>
                <p>2011-03-23</p>
            </li>
        </ul>
        <div class="im-btn">
            <button @click="viewElectronicInvoices">查询电子发票</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            viewElectronicInvoices() {
                let index = 0
                this.$emit('viewElectronicInvoices',index)
            }
        },
    }
</script>

<style lang="scss" scoped>
.im-box{
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    margin-bottom: 0.24rem;
    margin-top: 0.2rem;
    border: 1px solid #00ae4d;
    border-radius: 5px;
    overflow: hidden;
    .im-hgroup{
        background-color: #00ae4d;
        color: #FFFFFF;
        display: flex;
        line-height: 0.72rem;
        padding: 0 2.5%;
    }
    .im-ul{
        padding: 0.1rem 2.5%;
        li{
            border-bottom: 1px solid #a7a6a6;
            line-height: 0.52rem;
            display: flex;
            justify-content: space-between;
        }
    }
    .im-btn{
        padding-bottom: 0.1rem;
        button{
            width: 50%;
            height: 0.7rem;
            background-color: #00ae4d;
            color: #FFFFFF;
            margin: 10px auto 5px;
            border-radius: 5px;
            border: none;
            display: block;
        }
    }
}
</style>
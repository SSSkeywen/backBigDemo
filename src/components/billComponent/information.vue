<template>
    <div class="im-box">
        <hgroup class="im-hgroup">
            <span>保单号：{{contentData.policyCode}}</span>
        </hgroup>
        <ul class="im-ul">
            <li>
                <p>生效日期：</p>
                <p>{{contentData.validateDate}}</p>
            </li>
            <li>
                <p>主险名称：</p>
                <p>{{contentData.productName}}</p>
            </li>
            <li>
                <p>投保人：</p>
                <p>{{contentData.applicantName}}</p>
            </li>
            <li>
                <p>被保险人：</p>
                <p>{{contentData.insuredName}}</p>
            </li>
            <li>
                <p>费用发生日期：</p>
                <p>{{contentData.finishTime}}</p>
            </li>
        </ul>
        <div class="im-btn">
            <button @click="viewElectronicInvoices(contentData.policyCode,contentData.butonFlag)">{{contentData.butonFlag}}</button>
        </div>
    </div>
</template>

<script>
    export default {
        props:['contentData'],
        methods: {
            viewElectronicInvoices() {
                let index = 0
                this.$emit('viewElectronicInvoices',(policyCode,butonFlag))
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
<template>
    <div>
        <hgroup class="mg-hgroup">
            <p>保单号：<span v-text="contentListData.policyCode"></span></p>
            <div>
                <img :src="imgSrc" alt="">
            </div>
        </hgroup>
        <ul class="mg-ul">
            <li>
                <p>{{contentListData.productName}}</p>
            </li>
            <li>
                <p>投保人：{{contentListData.applicantName}}</p>
                <p>被保人：{{contentListData.insuredName}}</p>
            </li>
            <li>
                <p>生效日期：{{contentListData.validateDate}}</p>
                <p :class="contentListData.statusName=='有效'?'green':''">状态：{{contentListData.statusName}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgSrc: require('@/assets/mgImg/icon_xin.png')
            }
        },
        props:['contentListData']
    }
</script>

<style lang="scss" scoped>
.mg-hgroup{
    display: flex;
    background-color: #00ae4d;
    color: #FFFFFF;
    width: 100%;
    padding: 0 6%;
    margin: 0 auto;
    line-height: 0.52rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    div{
        width: 7%;
        img{
            width: 100%;
        }
    }
}
.mg-ul{
    width: 88%;
    margin: 0 auto;
    li{
        display: flex;
        justify-content: space-between;
        line-height: 0.6rem;
    }
}
.green{
    color: #00ae4d;
}
</style>
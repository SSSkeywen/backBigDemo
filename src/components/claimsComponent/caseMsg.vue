<template>
    <div class="cm-box">
        <ul>
            <li>
                <p>案件状态：</p>
                <p>{{caseMstList.caseStatus | caseMsgFn}}</p>
            </li>
            <li>
                <p>操作机构：</p>
                <p>{{caseMstList.organName | organNameTestFn}}</p>
            </li>
            <li v-if="caseMstList.finishTime">
                <p>结案时间：</p>
                <p>{{caseMstList.finishTime | finishTimeTestFn}}</p>
            </li>
            <li>
                <p>保单号：</p>
                <p>{{caseMstList.policyCode}}</p>
            </li>
            <li v-if="caseMstList.caseStatus=='已结案提交付款'">
                <p> </p>
                <p><span class="green" @click="clickLookOver(caseMstList.caseNo)"> 点击查看案件详情</span></p>
            </li>
        </ul>
    </div>
</template>

<script>
import {caseMsg,organNameTest,finishTimeTest} from '@/filter/caseData.js'
    export default {
        props:['caseMstList'],
        filters: {
            caseMsgFn(date){
                return caseMsg(date)
            },
            organNameTestFn(date){
                return organNameTest(date)
            },
            finishTimeTestFn(date){
                return finishTimeTest(date)
            }
        },
        methods: {
            clickLookOver(caseNo) {
                this.$router.push({ path: "/toCasemxMsg",query: {caseNo: caseNo} });
            }
        },
    }
</script>

<style lang="scss" scoped>
.cm-box{
    width: 95%;
    background-color: #fff;
    margin: 0.2rem auto;
    border-radius: 10px;
    ul{
        width: 90%;
        margin: 0 auto;
        padding:0.1rem 0;
        li{
            display: flex;
            justify-content: space-between;
            line-height: 0.52rem;
            border-bottom: 1px solid #d1d2d2;
        }
        li:last-child{
            border: none;
        }
    }
}
.green{
    color: #00ae4d;
}
</style>
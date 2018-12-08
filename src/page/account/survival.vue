<template>
<div class="survival-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="content_one" v-for="(item,index) in survivalData" :key="index" @click="nextFloor(item.policyCode)">
        <div class="content_one_top clearfix">
            <div class="content_one_topL">
                <span>保单号：{{item.policyCode}}</span>
                <div class="bd_r"></div>  
            </div>
        </div>
        <div class="content_one_xia">
            <ul>
                <li style="display: -webkit-flex;display: flex;">
                    <span style="width: 22%;">被保人：</span>
                    <span style="width: 78%;">{{item.insuredName}}</span>
                </li>
                <li style="display: -webkit-flex;display: flex;">
                    <span style="width: 22%;">投保人：</span>
                    <span style="width: 78%;">{{item.holderName}}</span>
                </li>
                <li class="mc">
                    <span style="width: 30%;">保单主险：</span>
                    <span>{{item.productName}}</span>
                </li>
                <li style="display: -webkit-flex;display: flex;">
                    <div style="width: 60%;">
                        <span>生效日期：</span>
                        <span>{{item.validateDate | dateFilter2}}</span>
                    </div>
                    <div style="width: 40%;">
                        <span>责任状态：</span>
                        <span>{{item.liabilityStateName}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div v-if="survivalData == null">未查找到符合条件的数据！</div>
    <alertContent :alertCount="alertCount"></alertContent>
</div>    
</template>

<script>
import headerT from '../../components/header.vue';
import { mapActions } from "vuex";
import alertContent from "../../components/alertContent";
import {dateStyle2} from '@/filter/dateStyle.js'
export default {
    filters: {
        dateFilter2(date){
            return dateStyle2(date)
        }
    },
    components: {
        headerT,
        alertContent,
    },
    data() {
        return {
            imgSrc: require('@/assets/mgImg/icon_xin.png'),
            headerContent: '生存金账户',
            survivalData:[],
            alertCount:{
                isShowAlert:false,
                alertData:'请输入',
            },
        }
    },
    created(){
        this.getSurvivalList({
            successCallback: (res) => {
                this.survivalData = res
            },
            failCallback:(res) => {
                if(res.code == 2002){
                    this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
                }else{
                    this.alertCount.isShowAlert = true;
                    this.alertCount.alertData = res.msg;
                }
            }
        })
    },
    
    methods: {
        ...mapActions({
            getSurvivalList: "getSurvivalList"
        }),
        nextFloor(policyCode) {
            this.$router.push({ path: '/survivalInfo', query : {policyCode : policyCode}});
        }
    }   
}
</script>

<style lang="scss" scoped>
.survival-box{
    overflow-x: hidden;
    line-height: 1.5;
    font-family: 'Microsoft Yahei';
    width: 100%;
    min-height:100vh;
    background-color: #ebebeb;
}
.content_one {
    width: 95%;
    margin: 10px auto;
    border: 1px solid #DCDCDC;
    background-color: #fff;
    border-radius: 7px;
}
.content_one_top {
    width: 100%;
    background-color: #00AE4F;
    line-height: 26px;
    border-radius: 7px 7px 0 0;
    position: relative;
}
.content_one_topL {
    width: 92%;
    margin: 0 auto;
    color: #FFFFFF;
}
.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: "";
    clear: both;
    height: 0;
}
.bd_r{
    margin-top: 4px;
    width: 16px;
    height: 16px;
    float: right;
    background: url('../../../src/assets/mgImg/icon_xin.png');
    background-size: 100% 100%;
}
.content_one_xia ul {
    margin-top: 5px;
    margin-bottom: 10px;
}
.content_one_xia ul li {
    width: 92%;
    line-height: 26px;
    margin: 0 auto;
}
</style>


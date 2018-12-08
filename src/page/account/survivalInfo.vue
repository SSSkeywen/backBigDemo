<template>
<div class="survival-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="content_one" v-for="(item,index) in survivalData" :key="index">
        <div class="content_one_top clearfix">
            <div class="content_one_topL mc">
                <span>险种名称：</span>
                <span>{{item.productName}}</span>
            </div>
        </div>
        <div class="content_one_xia">
            <ul>
                <li>
                    <div>
                        <span style="width: 30%;">生存金类型：</span>
                        <span>{{item.liabName}}</span>
                    </div>
                </li>
                <li class="mc">
                    <span>授权给付方式：</span>
                    <span>{{item.authName}}</span>
                </li>
                <li style="display: -webkit-flex;display: flex;">
                    <div>
                        <span>生存金金额：</span>
                        <span>{{item.feeAmount}}&nbsp;元</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span>分配日期：</span>
                        <span>{{item.distributeDate | dateFilter2}}</span>
                    </div>
                </li>
                <li style="display: -webkit-flex;display: flex;">
                    <div>
                        <span>是否已领取：</span>
                        <span>{{item.isDraw}}</span>
                    </div>
                </li>
                <li style="display: -webkit-flex;display: flex;">
                    <div v-if="item.drawDate == null">
                        <span>领取日期：</span>
                        <span>-</span>
                    </div>
                    <div v-if="item.drawDate != null">
                        <span>领取日期：</span>
                        <span>{{item.drawDate | dateFilter2}}</span>
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
import headerT from '../../components/header.vue'
import { mapActions } from "vuex";
import alertContent from "../../components/alertContent";
import {dateStyle2} from '@/filter/dateStyle.js'
export default {
    components: {
        headerT,
        alertContent,
    },
    filters: {
        dateFilter2(date){
            return dateStyle2(date)
        }
    },
    data() {
        return {
            headerContent: '生存金账户',
            survivalData:[],
            alertCount:{
                isShowAlert:false,
                alertData:'请输入',
            },
        }
    },
    created(){
        let policyCode = this.$route.query.policyCode;
        this.getSurvivalListInfo({
            policyCode,
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
            getSurvivalListInfo: "getSurvivalListInfo"
        })
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
.mc{display: flex;}
@media only screen and(min-width:321px){
   .mc{display: block;} 
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


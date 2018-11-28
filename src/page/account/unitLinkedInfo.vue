<template>
    <div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <!-- <section class="xx_lb"> -->
        <div class="mg-content-list">
            <ul>
                <li  v-for="(item,index) in unitLinkedData" :key="index">
                    <hgroup class="mg-hgroup">
                        <p>万能账户信息</p>
                    </hgroup>
                    <ul class="mg-ul">
                        <li class="mp-list-li line-down">
                            <p>保单账号：</p><p>{{item.applicantName}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>保单生效日：</p><p>{{item.effectiveDate | dateFilter}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>责任状态：</p><p>{{item.statusName}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>投保人：</p><p>{{item.applicantName}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>被保人：</p><p>{{item.insuredName}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>保单主险：</p><p>{{item.productName}}</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    <!-- </section> -->
    <a href="javascript: history.back();" class="btn_back">返回</a>
    </div>
</template>

<script>
import headerT from '../../components/header.vue';
import { mapActions } from "vuex";
import {dateStyle} from '@/filter/dateStyle.js';
export default {
    filters: {
        dateFilter(date){
            return dateStyle(date)
        }
    },
    components: {
        headerT
    },
    data() {
        return {
            headerContent: '连投账户',
            unitLinkedData:[{
                policyCode:'001',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰2',
                validateDate:null,
                statusName:'有效',
                effectiveDate:'2001-01-01',
                dividendNum:'1000元'
             },{
                policyCode:'002',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰2',
                validateDate:null,
                statusName:'有效',
                effectiveDate:'2001-01-01',
                dividendNum:'1000元'
             }]
            
        }
    },
    created(){
        let policyCodeData = new FormData();
            policyCodeData.append("policyCode", this.$route.query.policyCode);
            policyCodeData.append("agentCode", this.$route.query.agentCode);
            policyCodeData.append("productCate", this.$route.query.productCate);
            
        this.postUnitLinked({
            policyCodeData,
            successCallback: (res) => {
                console.log('_______________________');
                console.log(res.result);
                this.unitLinkedData = res.result
            },
            fCallback:(res) => {
            }
        })
    },
    
    methods: {
        ...mapActions({
            postUnitLinked: "postUnitLinked"
        })
    }   
}
</script>

<style lang="scss" scoped>
.xx_lb {
    width: 95%;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
}
.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;  
}
.mg-content-list{
    width: 90%;
    margin: 0.2rem auto 0;
    &>ul{
        margin-top: 10px;
        margin-bottom: 10px;
        &>li{
            // border-radius: 10px;
            background-color: #fff;
            padding-bottom: 1%;
            overflow: hidden;
            margin-top: 10px;
        margin-bottom: 10px;
        }
    }
}
.mg-hgroup{
    display: flex;
    color: #000;
    width: 100%;
    padding: 0 6%;
    margin: 0 auto;
    line-height: 0.52rem;
    line-height: 40px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
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
        line-height: 26px;
    }
}
.green{
    color: #00ae4d;
}
.red{
   color: #898b8b; 
}
.btn_back{
    width: 50%;
    height: 35px;
    line-height: 35px;
    background-color: #00AE4D;
    color: #fff;
    margin: 10px auto;
    margin-top: 10px;
    margin-right: auto;
    margin-bottom: 10px;
    margin-left: auto;
    border-radius: 5px;
    display: block;
    cursor: pointer;
    text-align: center;
}
</style>


<template>
    <div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <section class="mg-content-list" v-for="(item,index) in survivalData" :key="index">
                <!-- <survivalInfoList :survivalData="item"></survivalInfoList> -->
        <hgroup class="mg-hgroup">
            <p>险种名称：<span v-text="item.productName"></span></p>
        </hgroup>
        <ul class="mg-ul">
            <li>
                <p>生存金类型：{{item.liabName}}</p>
            </li>
            <li>
                <p>授权给付方式：{{item.authName}}</p>
            </li>
            <li>
                <p>生存金金额：{{item.feeAmount}}</p>
            </li>
            <li>
                <p>分配日期：{{item.distributeDate | dateFilter}}</p>
            </li>
            <li>
                <p>是否已领取：{{item.isDraw}}</p>
            </li>
            <li>
                <p v-if="drawDate == ''">领取日期：-</p>
                <p v-if="drawDate != ''">领取日期：{{item.drawDate | dateFilter}}</p>
            </li>
        </ul>
    </section>
    <section class="mg-content-list" v-if="errorMsg == ''">
        {{errorMsg}}
    </section>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import { mapActions } from "vuex";
import {dateStyle} from '@/filter/dateStyle.js'
export default {
    components: {
        headerT
    },
    filters: {
        dateFilter(date){
            return dateStyle(date)
        }
    },
    data() {
        return {
            headerContent: '生存金账户',
            survivalData:[{
                productName:'太平爱宝贝综合意外伤害保险',
                liabName:'301-生存金',
                authName:'1-个人授权现金',
                feeAmount:0,
                distributeDate:'2001-01-01',
                isDraw:'否',
                drawDate:'-'
             }],
            errorMsg
        }
    },
    created(){
        this.getSurvivalListInfo({
            successCallback: (res) => {
                this.survivalData = res.result
            },
            failCallback:(res) => {
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
.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;
}
.mg-content-list{
    width: 90%;
    margin: 0.2rem auto 0;
    background-color: #fff;
    border-radius:10px;
    overflow: hidden;
}
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
    margin: 5px auto 10px;
    li{
        display: flex;
        justify-content: space-between;
        line-height: 0.6rem;
    }
}
.green{
    color: #00ae4d;
}
.red{
   color: #898b8b; 
}
</style>


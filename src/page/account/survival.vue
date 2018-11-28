<template>
    <div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <section class="mg-content-list">
        <ul>
            <li v-for="(item,index) in survivalData" :key="index" @click="nextFloor(item.policyCode)">
                <hgroup class="mg-hgroup">
                    <p>保单号：<span v-text="item.policyCode"></span></p>
                    <div>
                        <img :src="imgSrc" alt="">
                    </div>
                </hgroup>
                <ul class="mg-ul">
                    <li>
                        <p>被保人：{{item.insuredName}}</p>
                    </li>
                    <li>
                        <p>投保人：{{item.holderName}}</p>
                    </li>
                    <li>
                        <p>保单主险：{{item.productName}}</p>
                    </li>
                    <li>
                        <p>生效日期：{{item.validateDate | dateFilter}}</p>
                        <p>责任状态：{{item.liabilityStateName}}</p>
                    </li>
                </ul>
            </li>
            <li v-if="errorMsg == ''">
                {{ errorMsg }}
            </li>
        </ul>
    </section>
    </div>
</template>

<script>
import headerT from '../../components/header.vue';
import { mapActions } from "vuex";
import {dateStyle} from '@/filter/dateStyle.js'
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
            imgSrc: require('@/assets/mgImg/icon_xin.png'),
            headerContent: '生存金账户',
            survivalData:[{
                policyCode:'001',
                productName:'太平爱宝贝综合意外伤害保险',
                insuredName:'范聪杰1',
                holderName:'范聪杰2',
                validateDate:null,
                liabilityStateName:'有效'
             }],
             errorMsg:''
        }
    },
    created(){
        this.getSurvivalList({
            successCallback: (res) => {
                this.survivalData = res.result
            },
            failCallback:(res) => {
                this.errorMsg = res.msg;
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
.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;  
}
.mg-select{
    width: 90%;
    margin: 10px auto;
    border-radius: 7px;
    background-color: #fbfbfb;
    height: 30px;
    select{
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 7px;
        background-color: #fff;
    }
}
.mg-content-list{
    width: 90%;
    margin: 0.2rem auto 0;
    &>ul{
        &>li{
            border-radius: 10px;
            background-color: #fff;
            margin-bottom: 0.24rem;
            overflow: hidden;
        }
    }
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
.red{
   color: #898b8b; 
}
</style>


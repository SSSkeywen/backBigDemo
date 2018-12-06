<template>
    <div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <!-- <section class="xx_lb"> -->
        <div class="mg-content-list">
            <ul>
                <li>
                    <hgroup class="mg-hgroup">
                        <p>个人账户</p>
                    </hgroup>
                    <ul class="mg-ul">
                        <li class="mp-list-li line-down">
                            <p>保单账号：</p><p>{{unitLinkedInfo.policyCode}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>保单生效日：</p><p>{{unitLinkedInfo.validateDate | dateFilter}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>责任状态：</p><p>{{unitLinkedInfo.liabilityState}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>投保人：</p><p>{{unitLinkedInfo.applicantName}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>被保人：</p><p>{{unitLinkedInfo.insurantName}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>保单主险：</p><p>{{unitLinkedInfo.productAbbr}}</p>
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
// import { mapActions } from "vuex";
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
            headerContent: '投连账户',
            infoIndex:'',
            unitLinkedInfo:''
        }
    },
    created(){
        // 接受上一页面 参数
        this.infoIndex= this.$route.query.index;
        // 接受上一页面 ajax存储在localstore 的数据
        let localData = JSON.parse(window.localStorage.getItem('unitLinkedlist'));
        console.log(localData);
        console.log(typeof(localData.data[this.infoIndex].validateDate));
        this.unitLinkedInfo=localData.data[this.infoIndex];
        // this.unitLinkedInfo = JSON.parse(window.localStorage.getItem('localData'))[this.infoIndex];;
        // this.postUnitLinked({
        //     policyCodeData,
        //     successCallback: (res) => {
        //         console.log('_______________________');
        //         console.log(res.result);
        //         this.unitLinkedData = res.result
        //     },
        //     fCallback:(res) => {
        //     }
        // })
    },
    
    // methods: {
    //     ...mapActions({
    //         postUnitLinked: "postUnitLinked"
    //     })
    // }   
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


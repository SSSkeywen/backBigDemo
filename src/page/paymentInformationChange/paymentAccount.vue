<template>
<div class="normal-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="pay-box" v-if="dataList && dataList.length>0">
        <div class="list-box" v-for="(item,index) in dataList" :key="index">
            <div class="sq_xz">
                <span>保单号：</span>
                <i>{{item.POLICY_CODE}}</i>
                <i class="_select" @click="checkOne(index)">
                    <input type="checkbox" name="checkbox" :checked="item.selectTrue">
                </i>
            </div>
            <ul class="list-con">
                <li>
                    <div class="sq_mc1"><span>收费方式</span></div>
                    <div class="sq_nr"><span>{{item.MODE_NAME}}</span></div>
                </li>
                <li>
                    <div class="sq_mc1"><span>账号所属银行</span></div>
                    <div class="sq_nr"><span>{{item.BANK_NAME}}</span></div>
                </li>
                <li>
                    <div class="sq_mc1"><span>收费账号</span></div>
                    <div class="sq_nr"><span>{{item.BANK_ACCOUNT}}</span></div>
                </li>
                <li>
                    <div class="sq_mc1"><span>账户所有人</span></div>
                    <div class="sq_nr"><span>{{item.ACCO_OWNER_NAME}}</span></div>
                </li>
            </ul> 
        </div>
        <section class="yy_cx">
            <button @click="confirms">确认选择</button>
        </section>
    </div>
    <div v-else>您没有可做缴费账号变更的保单！</div>
    <alertContent :alertCount="alertCount"></alertContent>
</div>
</template>

<script>
import headerT from '@/components/header.vue'
import alertContent from '@/components/alertContent.vue'
import { mapActions } from "vuex";
    export default {
        data() {
            return {
                headerContent: '收费账号变更',
                alertCount:{
                  isShowAlert:false,
                  alertData:'请输入',
                },
                // 选择的保单号集合
                selectCode:[],
                dataList:[
                    // {
                    //     POLICY_CODE	,	//保单号
                    //     MODE_NAME	,	//收费方式
                    //     BANK_NAME	,	//账号所属银行
                    //     BANK_CODE	,	//银行code
                    //     BANK_ACCOUNT	,	//收费账号
                    //     ACCO_OWNER_NAME	,	//账户所有人
                    //     ORGAN_ID	,	//机构代码
                    //     ZIP_LINK	,	//收费邮编
                    // }
                ]
            }
        },
        components:{
            headerT,
            alertContent
        },
        created(){
            this.paymentAccountList({
                successCallback: (res) => {
                    console.log('res', res)
                    this.dataList = res.data;
                     this.dataList.forEach((it) => {
                        it.selectTrue = false;
                    }) 
                },
                failCallback:(res) => {
                }
            })
        },
        methods:{
            ...mapActions({
                paymentAccountList:'paymentAccountList'
            }),
            checkOne(index){
                let data = this.dataList[index]
                data.selectTrue = !this.dataList[index].selectTrue
                this.$set(this.dataList, index, data)
            },
            confirms(){
                let res = this.dataList.filter(it => it.selectTrue)
                if (res.length > 0) {
                     this.$router.push({ 
                        path: '/paymentAccountInfo',
                        query:{
                            needParams: JSON.stringify(res)
                        }
                    });
                }else{
                    this.alertCount.isShowAlert=true;   
                    this.alertCount.alertData='请选择你要变更的保单！';   
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.normal-box{
    min-height:100vh;
    background-color: #EFEFF4;
}
.list-box{
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: 2.5%;
    padding-right: 2.5%;
    .sq_xz{  
        width: 88%;
        padding-left: 6%;
        padding-right: 6%;
        background: #00ae4d;
        border-radius: 10px 10px 0 0;
        color: #fff;
        line-height: 26px;
        ._select{
            float: right;
            input{
                appearance: checkbox;
                outline: 0;
                border: 0;
                width: 20px;
                height: 20px;
                margin-top: 4px;
                color: #000;
            }
        }
    }
    .list-con{
        width: 88%;
        padding-left: 6%;
        padding-right: 6%;
        padding-bottom: 5px;
        background-color: #fff; 
        li{
            display: flex;
            width: 100%;
            border-bottom: 1px solid #d1d2d2;
            line-height: 26px;
            .sq_mc1 {width: 40%;}
            .sq_nr {
                width: 60%;
                font-size: 14px;
                text-align: right;
            }
            &:last-child{border: 0;}
        }
    }
}
.yy_cx{
    margin: 1.17647059em 15px 0.3em;
    button{
        width: 100%;
        height: 46px;
        background-color: #00ae4d;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
    }
}
</style>
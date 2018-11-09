<template>
    <div class="mg-box">
        <headerT :headerContent="headerContent"></headerT>
        <hgroup class="mp-hgroup">保单号：{{InformationMap.policyCode}}</hgroup>
        <section class="mp-box-one">
            <div class="mp-min-title">
                <div class="mp-min-left">
                    <div class="mp-min-left-img">
                        <img :src="imgSrcTitle" alt="">
                    </div>
                    <p>基本信息</p>
                </div>
                <div @click="showMpList(0)" class="mp-min-right"><img class="ani-down" :class="isShowInformation?'add-ani-style':''" :src="imgSrcThree" alt=""></div>
            </div>
            <ul class="mp-list" v-if="isShowInformation">
                <li class="mp-list-li line-down">
                    <p>保单状态：</p>
                    <p v-text="InformationMap.statusName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>保单生效日：</p>
                    <p>{{InformationMap.validateDate | dateFilter}}</p>
                </li>
                <li class="mp-list-li line-down">
                    <p>保单责任终止日：</p>
                    <p>{{InformationMap.endDate | dateFilter}}</p>
                </li>
                <li class="mp-list-li line-down">
                    <p>投保人：</p>
                    <p v-text="InformationMap.applicantName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>被保人：</p>
                    <p v-text="InformationMap.insuredName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>生存受益人：</p>
                    <p v-text="InformationMap.bene1Name"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>身故受益人：</p>
                    <p v-text="InformationMap.bene2Name"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>下期保费：</p>
                    <p>{{InformationMap.nextDiscountPrem | dateFilter}}</p>
                </li>
                <li class="mp-list-li line-down">
                    <p>下期交费日：</p>
                    <p>{{InformationMap.payToDate | dateFilter}}</p>
                </li>
                <li class="mp-list-li line-down">
                    <p>下期交费方式：</p>
                    <p v-text="InformationMap.renewalType"></p>
                </li>
            </ul>
        </section>
        <section class="mp-box-one" v-for="(item,index) in ProductList" :key="index">
            <div class="mp-min-title">
                <div class="mp-min-left">
                    <div class="mp-min-left-img">
                        <img :src="imgSrcTitleTwo" alt="">
                    </div>
                    <p>险种信息</p>
                </div>
                <div @click="showMpListPolicyMessage(index)" class="mp-min-right"><img class="ani-down" :class="item.isShowInformation?'add-ani-style':''" :src="imgSrcThree" alt=""></div>
            </div>
            <ul class="mp-list" v-if="item.isShowInformation">
                <li class="mp-list-li line-down">
                    <p>险种名称：</p>
                    <p v-text="item.productName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>险种当前责任状态：</p>
                    <p v-text="item.statusName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>保额：</p>
                    <p v-text="item.amount"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>险种生效日：</p>
                    <p>{{item.validateDate | dateFilter}}</p>
                </li>
                <li class="mp-list-li line-down">
                    <p>被保人：</p>
                    <p v-text="item.insuredName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>当期保费：</p>
                    <p v-text="item.periodPrem"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>下期交费日：</p>
                    <p>{{item.payToDate | dateFilter}}</p>
                </li>
            </ul>
        </section>
        <section class="mp-box-one">
            <div class="mp-min-title">
                <div class="mp-min-left">
                    <div class="mp-min-left-img">
                        <img :src="imgSrcTitleThree" alt="">
                    </div>
                    <p>投保人</p>
                </div>
                <div @click="showMpList(2)" class="mp-min-right"><img class="ani-down" :class="isShowInformationThree?'add-ani-style':''" :src="imgSrcThree" alt=""></div>
            </div>
            <ul class="mp-list" v-if="isShowInformationThree">
                <li class="mp-list-li line-down">
                    <p>姓名：</p>
                    <p v-text="CustomerByPolicyCode.applicantName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>生日：</p>
                    <p>{{CustomerByPolicyCode.applicantBirthday | dateFilter}}</p>
                </li>
                <li class="mp-list-li line-down">
                    <p>性别：</p>
                    <p v-text="CustomerByPolicyCode.applicantGender"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>证件号码：</p>
                    <p v-text="CustomerByPolicyCode.applicantCertiCode"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>手机：</p>
                    <p v-text="CustomerByPolicyCode.applicantCeller"></p>
                </li>
                <li v-if="CustomerByPolicyCode.applicantTel1" class="mp-list-li line-down">
                    <p>家庭电话：</p>
                    <p v-text="CustomerByPolicyCode.applicantTel1"></p>
                </li>
            </ul>
        </section>
        <section class="mp-box-one">
            <div class="mp-min-title">
                <div class="mp-min-left">
                    <div class="mp-min-left-img">
                        <img :src="imgSrcTitleFour" alt="">
                    </div>
                    <p>被保险人</p>
                </div>
                <div @click="showMpList(3)" class="mp-min-right"><img class="ani-down" :class="isShowInformationFour?'add-ani-style':''" :src="imgSrcThree" alt=""></div>
            </div>
            <ul class="mp-list" v-if="isShowInformationFour">
                <li class="mp-list-li line-down">
                    <p>姓名：</p>
                    <p v-text="CustomerByPolicyCode.insuredName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>生日：</p>
                    <p>{{CustomerByPolicyCode.insuredBirthday| dateFilter}}</p>
                </li>
                <li class="mp-list-li line-down">
                    <p>性别：</p>
                    <p v-text="CustomerByPolicyCode.insuredGender"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>证件号码：</p>
                    <p v-text="CustomerByPolicyCode.insuredCertiCode"></p>
                </li>
            </ul>
        </section>
        <section class="mp-box-one">
            <div class="mp-min-title">
                <div class="mp-min-left">
                    <div class="mp-min-left-img">
                        <img :src="imgSrcTitleFive" alt="">
                    </div>
                    <p>受益人</p>
                </div>
                <div @click="showMpList(4)" class="mp-min-right"><img class="ani-down" :class="isShowInformationFive?'add-ani-style':''" :src="imgSrcThree" alt=""></div>
            </div>
            <ul class="mp-list" v-if="isShowInformationFive">
                <li class="mp-list-li line-down">
                    <p>生存受益人：</p>
                    <p v-text="InformationMap.bene1Name"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>身故受益人：</p>
                    <p v-text="InformationMap.bene2Name"></p>
                </li>
            </ul>
        </section>
        <section class="mp-box-one" v-for="(item,index) in ProductList" :key="index+'0'">
            <div class="mp-min-title">
                <div class="mp-min-left">
                    <div class="mp-min-left-img">
                        <img :src="imgSrcTitleSix" alt="">
                    </div>
                    <p>信件发送方式</p>
                </div>
                <div @click="showSendEmilStyle(index)" class="mp-min-right"><img class="ani-down" :class="item.isShowSendEmilStyle?'add-ani-style':''" :src="imgSrcThree" alt=""></div>
            </div>
            <ul class="mp-list" v-if="item.isShowSendEmilStyle">
                <li class="mp-list-li line-down">
                    <p>失效通知书：</p>
                    <p v-text="item.productName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>缴费提醒：</p>
                    <p v-text="item.statusName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>永久失效通知书：</p>
                    <p v-text="item.amount"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>保单年度报告：</p>
                    <p>{{item.validateDate| dateFilter}}</p>
                </li>
                <li class="mp-list-li line-down">
                    <p>转账成功通知书：</p>
                    <p v-text="item.insuredName"></p>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import {dateStyle} from '@/filter/dateStyle.js'
import { mapActions } from "vuex";
    export default {
        data() {
            return {
                headerContent: '保单基本信息',
                imgSrcTitle: require('@/assets/mgImg/xq_icon_xx.png'),
                imgSrcTitleTwo: require('@/assets/mgImg/xq_icon_xz.png'),
                imgSrcTitleThree: require('@/assets/mgImg/xq_icon_tbr.png'),
                imgSrcTitleFour: require('@/assets/mgImg/xq_icon_bxr.png'),
                imgSrcTitleFive: require('@/assets/mgImg/xq_icon_syr.png'),   //收益人icon
                imgSrcTitleSix: require('@/assets/mgImg/xq_icon_xxfs.png'),   //收益人icon
                imgSrcThree: require('@/assets/mgImg/xq_icon_xia.png'),
                isShowInformation: true,
                isShowInformationTwo: false,
                isShowInformationThree: false,
                isShowInformationFour: false,
                isShowInformationFive: false,
                isShowInformationSix: false,
                InformationMap:{
                    policyCode:'',
                    statusName:'',
                    validateDate:'',
                    endDate:'',
                    applicantName:'',
                    insuredName:'',
                    bene1Name:'',
                    bene2Name:'',
                    nextDiscountPrem:'',
                    payToDate:'',
                    renewalType:'',
                    bankAccount:'',

                    //受益人
                    bene1Name:'',
                    bene2Name:''
                },
                ProductList:[{
                    productName:'',
                    statusName:'',
                    amount:'',
                    validateDate:'',
                    insuredName:'',
                    periodPrem:'',
                    payToDate:''
                }],
                CustomerByPolicyCode:{
                    applicantName:'',
                    applicantBirthday:'',
                    applicantGender:'',
                    applicantCertiCode:'',
                    applicantCeller:'',
                    applicantTel1:'',
                    applicantEmail:'',

                    insuredName:'',
                    insuredBirthday:'',
                    insuredGender:'',
                    insuredCertiCode:'',
                    insuredCeller:'',
                    insuredTel1:'',
                    insuredEmail:''
                }
            }
        },
        filters: {
            dateFilter(date){
                return dateStyle(date)
            }
        },
        created(){
            // let policyCodeData = {
            //     policyCode:this.$route.query.policyCode
            // }
            let policyCodeData = new FormData();
                policyCodeData.append("policyCode", this.$route.query.policyCode);
            this.getPolicyInfo({
                policyCodeData,
                successCallback: (res) => {
                    console.log(res.result)
                    this.InformationMap = res.result.InformationMap
                    for(let item of res.result.ProductList){
                        item.isShowInformation = false
                        item.isShowSendEmilStyle= false
                    }
                    this.ProductList = res.result.ProductList

                    this.CustomerByPolicyCode = res.result.CustomerByPolicyCode
                },
                fCallback:(res) => {
                }
            })
        },
        components:{
            headerT,
        },
        methods: {
            ...mapActions({
                getPolicyInfo: "getPolicyInfo"
            }),
            showMpList(index) {
                if(index==0){
                    this.isShowInformation = !this.isShowInformation
                }
                if(index==1){
                    this.isShowInformationTwo = !this.isShowInformationTwo
                }
                if(index==2){
                    this.isShowInformationThree = !this.isShowInformationThree
                }
                if(index==3){
                    this.isShowInformationFour = !this.isShowInformationFour
                }
                if(index==4){
                    this.isShowInformationFive = !this.isShowInformationFive
                }
                if(index==5){
                    this.isShowInformationSix = !this.isShowInformationSix
                }
            },

            //险种信息的显示
            showMpListPolicyMessage(index){
                this.ProductList[index].isShowInformation = !this.ProductList[index].isShowInformation
            },

            //信件发送方式的显示
            showSendEmilStyle(index){
                this.ProductList[index].isShowSendEmilStyle = !this.ProductList[index].isShowSendEmilStyle
            }
        },
        
    }
</script>

<style lang="scss" scoped>
.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;
}
.mp-hgroup{
    width: 95%;
    line-height: 0.8rem;
    color: #fff;
    background: url('../../assets/mgImg/xq_header_bg.png') no-repeat;
    margin: 0 auto;
    margin-top: 2%;
    background-size: 100% 100%;
    padding: 0 0 0 0.3rem;
    box-sizing: border-box;
}
.mp-box-one{
    width: 95%;
    background-color: #fff;
    margin: 10px auto;
    padding: 0 0.3rem;
    box-sizing: border-box;
    .mp-min-title{
        display: flex;
        justify-content: space-between;
        line-height: 0.8rem;
        .mp-min-left{
            display: flex;
            font-weight: 600;
            .mp-min-left-img{
                width: 0.3rem;
                padding-top: 0.17rem;
                margin-right: 0.2rem;
                img{
                    width: 100%;
                    display: block;
                }
            }
        }
        .mp-min-right{
            width: 0.44rem;
            padding-top: 0.22rem;
            img{
                width: 100%;
            }
        }
    }
    .mp-list{
        .mp-list-li{
            display: flex;
            justify-content: space-between;
            line-height: 0.52rem;
        }
        .mp-list-li:last-child{
            padding-bottom: 0.1rem;
        }
    }
}

/* 动画效果css */
.ani-down{
    transition: all .2s;
}
.add-ani-style{
    transform: rotateZ(180deg);
}
</style>
<template>
<div class="normal-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="survival-info-box">
        <div class="list-box">
            <ul class="bg_content">
                <li class="bg_nr">
                    <div class="bg_nrtop">授权方式：</div>
                    <div class="bg_nrbottom">
                        <select name="authorizeType" v-model="authorizeType" @change="changVal">
                            <option v-for="(option,index) in authorizeTypeList" :value="option.value" :key="index">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                </li>
                <li class="bg_nr">
                    <div class="bg_nrtop">使用生存金抵缴贷款：</div>
                    <div class="bg_nrbottom">
                        <select name="payLoanPermit" v-model="payLoanPermit">
                            <option v-for="(option,index) in payLoanPermitList" :value="option.value" :key="index">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                </li>
                <li class="bg_nr">
                    <div class="bg_nrtop">授权银行：</div>
                    <div class="bg_nrbottom">
                        <input  class="selgray" :class="{'noclick':toColor}" name="bank_name" v-model="accountMessShow.bankName" disabled />
                    </div>
                </li>
                <li class="bg_nr">
                    <div class="bg_nrtop">账户类型：</div>
                    <div class="bg_nrbottom">
                        <select name="userType" disabled>
                            <option >
                                <!-- {{ accTypeList[changeIndex].text }} -->
                                {{ accountMessShow.accTypeName }}
                            </option> 
                        </select>
                    </div>
                </li>
                <!-- <li class="bg_nr">
                    <div class="bg_nrtop">账户类型：</div>
                    <div class="bg_nrbottom">
                        <select name="userType" disabled>
                            <option >
                                {{ accountMessShow.accTypeName }}
                            </option> 
                            
                        </select>
                    </div>
                </li> -->
                <li class="bg_nr">
                    <div class="bg_nrtop">账户所属机构：</div>
                    <div class="bg_nrbottom">
                        <input class="selgray" :class="{'noclick':toColor}" name="userOrgan" v-model="accountMessShow.organName" disabled>
                    </div>
                </li>
                <li class="bg_nr">
                    <div class="bg_nrtop">授权帐号：</div>
                    <div class="bg_nrbottom">
                        <input class="selgray" :class="{'noclick':toColor}" name="userNumber" v-model="accountMessShow.accCode" disabled>
                    </div>
                </li>
                <li class="bg_nr">
                    <div class="bg_nrtop">帐号所有人：</div>
                    <div class="bg_nrbottom">
                        <!-- <input class="selgray" :class="{'noclick':toColor}" type="text" name="userHolder" v-model="accNameList[changeIndex].text" disabled> -->
                        <input class="selgray" :class="{'noclick':toColor}" type="text" name="userHolder" v-model="accountMessShow.accName" disabled>
                    </div>
                </li>
                <!-- <li class="bg_nr">
                    <div class="bg_nrtop">授权帐号：</div>
                    <div class="bg_nrbottom">
                        <select class="selgray" :class="{'noclick':toColor}" name="userNumber" v-model="userNumber" disabled>
                            <option v-for="(option,index) in cardNums" :value="option.value" :key="index">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                </li>
                <li class="bg_nr">
                    <div class="bg_nrtop">帐号所有人：</div>
                    <div class="bg_nrbottom">
                        <input class="selgray" :class="{'noclick':toColor}" type="text" name="userHolder" v-model="userHolder" disabled>
                    </div>
                </li> -->
            </ul>
        </div>
        <div class="survival-tishi">
            <p>温馨提示：</p>
            <h6>给付账户为您的保险服务密码绑定账号。</h6>
        </div>
        <section class="yy_cx">
            <button @click="confirms">确认变更</button>
        </section>
        
    </div>
    <alertContent :alertCount="alertCount"></alertContent>
</div>
</template>

<script>
import headerT from '@/components/header.vue'
import alertContent from '@/components/alertContent.vue'
import { mapActions } from "vuex";
import {Toast } from 'vant';
export default {
    data() {
        return {
            headerContent: '生存金领取方式变更',
            toColor:false,
            imgSrc2: require("@/assets/bsImg/huang.jpg"),
            imgSrc3: require("@/assets/bsImg/success1.jpg"),
            authorizeType:'0',
            payLoanPermit:'Y',
            alertCount:{
              isShowAlert:false,
              alertData:'请输入',
            },
            // 选择的集合
            authorizeTypeList:[
                {text: '暂不变更',value: 0},
                {text: '授权转账',value: 2},
                {text: '授权现金',value: 1}
            ],
            payLoanPermitList:[
                {text: '是',value: 'Y'},
                {text: '否',value: 'N'},
            ],
            isAccInfoModified: true,
            accountMessShow:{},
            accountMessShowCash:{
                accBank: '',//银行所属代码
                bankName: '请选择账号所属银行',//银行
                accType: '7',//账户类型
                accTypeName: '请选择账户类型',//账户类型
                accCode:'请填写收费帐号',//银行账号
                accName:'请填写所有人真实姓名',//账户所有人
                organId:'',//账户所属机构
                organName:'请输入账户所属机构',//账户所属机构代码
            },
            accountMessShowTrans:{},
            checkedList:[]
        }
    },
    components:{
        headerT,
        alertContent,
        // sendAlrtContent
    },
    created(){
        this.accountMessShow = this.accountMessShowCash;    
        let policyCodeStr = this.$route.query.policyCodeStr;
        this.getSurvivalGetWayChangePolicyCodes({
            // policyCodeStr,
            successCallback: (res) => {
                this.checkedList = res.data;
                console.log('-----保单集合------')
                console.log(this.checkedList)
            },
            failCallback:(res) => {
                if(res.code == 2002){
                    this.$router.push({ path: '/userInfo',query: {pathAddress: '/survivalGetWayChangeInfo'} });
                }else{
                    this.alertCount.isShowAlert = true;
                    this.alertCount.alertData = res.msg;
                }
            }
        })
        this.getSurvivalGetWayAccount({
            successCallback: (res) => {
                this.account = res.data;
                let organId = this.account.organId;
                this.getSurvivalGetWayChangeOrganId({
                    organId,
                    successCallback: (res) => {
                        //赋值
                        this.accountMessShowTrans = {
                            accBank: this.account.accBank,//银行所属代码
                            bankName: this.account.bankName,//银行
                            accType: '7',//账户类型
                            accTypeName: '普通卡',
                            accCode: this.account.accCode,//银行账号
                            accName: this.account.accName,//账户所有人
                            organId: this.account.organId,//账户所属机构
                            organName: res.data,//账户所属机构代码
                        };
                    },
                    failCallback:(res) => {
                        this.alertCount.isShowAlert = true;
                        this.alertCount.alertData = res.msg;
                    }
                })
            
            },
            failCallback:(res) => {
                this.alertCount.isShowAlert = true;
                this.alertCount.alertData = res.msg;
            }
        })
    },
    methods: {
        ...mapActions({
            getSurvivalGetWayChangePolicyCodes:'getSurvivalGetWayChangePolicyCodes',
            getSurvivalGetWayChangeOrganId:'getSurvivalGetWayChangeOrganId',
            getSurvivalGetWayAccount:'getSurvivalGetWayAccount',
            getSurvivalGetWayChangeApply:'getSurvivalGetWayChangeApply',
            getSurvivalGetWayChangeResult:'getSurvivalGetWayChangeResult'
        }),
        changVal(){
            this.isAccInfoModified =true;
            // 如果选择现金方式 灰色
            if(this.authorizeType==2){
                this.toColor=true;
                this.accountMessShow = this.accountMessShowTrans;
            }else{
                this.toColor=false;
                this.accountMessShow = this.accountMessShowCash;
            }
        },
        confirms(){
            // 比较全部值 
            if(this.authorizeType==2){
                for(let item of this.checkedList){
                    // console.log('-----保单集合------')
                    // console.log(this.checkedList)
                    // console.log(this.authorizeType+'现生存金授权方式 authorizeType authCode')
                    // console.log(item.authCode+'>>>authCode')
                    // console.log('-------------')
                    // console.log(this.accountMessShow.accBank+'银行代码 accBank bankCode')
                    // console.log(item.bankCode+'>>>bankCode')
                    // console.log('-------------')
                    // console.log(this.accountMessShow.accCode+'授权账号 accCode bankAccount')
                    // console.log(item.bankAccount+'....bankAccount')
                    // console.log('-------------')
                    // console.log(this.accountMessShow.accName+'账户所有人accName assigneeName')
                    // console.log(item.assigneeName+'...assigneeName')
                    // console.log('-------------')
                    // console.log(this.accountMessShow.organId+'账户所有人accName organId')
                    // console.log(item.organId+'...organId')
                    // console.log('-------------')
                    if(item.payloanpermit==this.payLoanPermit&&item.authCode==this.authorizeType&&item.bankAccount==this.accountMessShow.accCode&&item.bankName==this.accountMessShow.accBank&&item.accoName==this.accountMessShow.accName){
                        this.alertCount.isShowAlert = true;
                        this.alertCount.alertData = "所选保单中存在保单在系统中的生存金领取信息与您当前页面生存金领取信息一致，无需变更！";
                        this.isAccInfoModified =false;
                    }		
                }
            }else{
                console.log(this.authorizeType)
                console.log( this.alertCount.isShowAlert+' this.alertCount.isShowAlert')
                for(let item of this.checkedList){
                    if(this.authorizeType==1){
                        console.log('------01-------')
                        if(item.authCode==this.authorizeType&&item.payloanpermit==this.payLoanPermit){
                            this.alertCount.isShowAlert = true;
                            this.alertCount.alertData = "所选保单中存在保单在系统中的生存金领取信息与您当前页面生存金领取信息一致，无需变更！";
                            this.isAccInfoModified =false;
                        }else{
                            this.isAccInfoModified =true;
                        }
                    }
                    if(this.authorizeType==0){
                        if(item.payloanpermit==this.payLoanPermit){
                            console.log('------00-------')
                            console.log(item.payloanpermit==this.payLoanPermit)
                            this.alertCount.isShowAlert = true;
                            this.alertCount.alertData = "所选保单中存在保单在系统中的生存金领取信息与您当前页面生存金领取信息一致，无需变更！";
                            this.isAccInfoModified =false;
                        }else{
                            this.isAccInfoModified =true;
                        }
                    }
                }
            }
            let parmas = {};
            if(this.authorizeType==1){
                parmas ={
                    authorizeType: this.authorizeType,
                    accBank: '',
                    accBank: '',
                    accName: '',
                    accType: '',
                    organId: ''
                };
            }else{
                parmas ={
                    authorizeType: this.authorizeType,
                    accBank: this.accountMessShow.accBank,
                    accCode: this.accountMessShow.accCode,
                    accName: this.accountMessShow.accName,
                    accType: this.accountMessShow.accType,
                    organId: this.accountMessShow.organId,
                };
            };
            console.log('end');
            console.log(this.isAccInfoModified)
            if(this.isAccInfoModified!=false){
                console.log(parmas);
                const toast1 = Toast.loading({
                    mask: true,
                    message: "数据努力提交中，请一定不要返回或者退出微信~~",
                    duration: 0
                });

                this.getSurvivalGetWayChangeApply({
                    parmas,
                    successCallback: (res) => {
                        toast1.clear();
                          window.localStorage.setItem('survivalGetWayChangeApproval',JSON.stringify(res.data));
                          this.$router.push({ path: '/survivalGetWayChangeEnd', query:{ }});
                        // if(res.code == '0'){
                           
                        //     this.getSurvivalGetWayChangeResult({
                        //         successCallback: (res) => {
                        //             console.log(res)
                        //             window.localStorage.setItem('survivalGetWayChangeApproval',JSON.stringify(res));
                        //             console.log( window.localStorage.setItem('survivalGetWayChangeApproval',JSON.stringify(res)))
                        //             this.$router.push({ path: '/survivalGetWayChangeEnd', query:{ }});
                        //             // toast1.clear();
                        //         },
                        //         failCallback:(res) => {
                        //             // toast1.clear();
                        //             this.alertCount.isShowAlert = true;
                        //             this.alertCount.alertData = res.msg;
                        //         }
                        //     })
                        // }

                    },
                    failCallback:(res) => {
                        toast1.clear();
                        this.alertCount.isShowAlert = true;
                        this.alertCount.alertData = res.msg;
                    }
                })
            }
        } 
    }
}
</script>

<style lang="scss" scoped>
.normal-box{
    min-height:100vh;
    background-color: #EFEFF4;
    .survival-tishi{
        box-sizing: border-box;
        width: 100%;
        margin: 0 auto;
        color: #f00;
        background: #fff;
        border-radius: 6px;
        font-size: 12px;
        padding: 8px;
        margin-top:10px;
        p,h6{font-size: 14px;}
    }
    .survival-info-box{
        position: relative;
        padding: 10px;
        .list-box{
            .bg_content{
                padding: 13px 13px 10px 13px;
                border: 1px solid #DCDCDC;
                background: #FFF;
                border-radius: 6px;
                width: 91%;
                margin: 0 auto;
                li{
                    .bg_nrtop {
                        width: 100%;
                        line-height: 26px;
                        font-size: 14px;
                    }
                    .bg_nrbottom{
                        font-size: 14px;
                        select {
                            appearance: menulist;
                            box-sizing: border-box;
                            padding: 0 3px;
                            height: 25px;
                            width: 100%;
                            background-color: #fff;
                            line-height: 38px;
                            border-radius: 5px;
                            border: 1px solid #ddd;
                            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.2);
                            color:#000;
                            &.selgray:disabled{
                                appearance: none;
                                line-height: 1;
                                background-color: rgb(235, 235, 228);
                                border: 1px solid rgba(0, 0, 0, 0.3);
                                color:#aaa;
                                &.noclick{color:#000;}
                            }
                        }
                        input{
                            padding: 3px;
                            width: 97%;
                            border: 1px solid rgba(0, 0, 0,0.3);
                            border-radius: 5px;
                            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.2);
                            color:#000;
                            &:disabled{
                                background-color: rgb(235, 235, 228);
                                border: 1px solid rgba(0, 0, 0, 0.3);
                                color:#aaa;
                                &.noclick{color:#000;}
                            }
                        }
                    }
                    &:last-child{border: 0;}
                }
            }
        }
        .yy_cx{
            margin: 5px auto;
            text-align: center;
            height: 35px;
            line-height: 35px;
            padding: 10px 0px;
            button{
                height: 35px;
                line-height: 35px;
                width: 50%;
                border: none;
                background: #00AE4F;
                border-radius: 7px;
                color: #fff;
                font-size: 14px;
            }
        }
    }  
}

</style>
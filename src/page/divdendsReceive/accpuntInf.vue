<template>
<div class="box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="bg">
        <div class="bg_content">
            <div class="bg_nr">
                <div class="bg_nrtop">账号所属银行</div>
                <div class="bg_nrbottom">
                    <input type="text" id="bank_code" placeholder="请输入银行" disabled>
                </div>
            </div>
            <div class="bg_nr">
                <div class="bg_nrtop">账户类型</div>
                <div class="bg_nrbottom">
                    <input type="text" id="bank_type" placeholder="普通卡" disabled>
                </div>
            </div>
            <div class="bg_nr">
                <div class="bg_nrtop">账号所属机构</div>
                <div class="bg_nrbottom">   
                    <input type="text" id="bank_org" placeholder="请选择所属机构" disabled>

                </div>
            </div>
            <div class="bg_nr">
                <div class="bg_nrtop">付费账号</div>
                <div class="bg_nrbottom">
                    <input type="text" id="bank_acount" placeholder="请输入账号">
                </div>
            </div>
            <div class="bg_nr">
                <div class="bg_nrtop">账号所有人</div>
                <div class="bg_nrbottom">
                    <input type="text" id="bank_person" placeholder="演示">
                </div>
            </div>
        </div>
        <div class="tishi">
            <p>温馨提示:</p>
            <p>给付账户为您的保险服务密码绑定账号</p>
        </div>
        <section class="yy_cx btn" >
            <button @click="confirms">确认变更</button>
        </section>
    </div>
    <alertContent :alertCount="alertCount"></alertContent>
    <!-- <sendAlrtContent :panelShow.sync="panelShow" ref="sendAlrtContent"></sendAlrtContent> -->
    <sendAlrtContent ref="senAlertContent" :pnoneBack="phoneNo" v-if="sendCode" @clolseAlert="clolseAlert" @sendCodeFnTwo="sendCodeFnTwo" @sendCodeFn="sendCodeFn"></sendAlrtContent>
</div>
</template>

<script>
import { mapActions } from "vuex";
import headerT from '@/components/header.vue'
import sendAlrtContent from '@/components/sendAlrtContent.vue'
import alertContent from "@/components/alertContent";
import { Toast } from "vant";
import { toolsTwo } from "@/js/toolsTwo.js";
// import sendAlrtContent from './sendAlrtContent.vue'
 export default {
        data() {
            return {
                //银行
                bankbk:[
                    {keyText:"中国工商银行"},
                    {keyText:"中国建设银行"},
                    {keyText:"中国银行"},
                    {keyText:"中国农业银行"},
                    {keyText:"招商银行"},
                    {keyText:"光大银行"},
                    {keyText:"广东发展银行"},
                    {keyText:"浦发发展银行"},
                    {keyText:"中国邮储"},
                ],
                headerContent: '红利领取付费账号信息',
                panelShow:false,
                phoneNo: "",
                phoneNoTwo:"",
                sendCode: false,
                pathAddress:"",
                getAmount:"",
                alertCount: {
                    isShowAlert: false,
                    alertData: "请输入"
                },
                //银行卡
                bankCard:[],
                //银行卡类型
                bankCardType:[],
                //账号所属机构
                organization:[],
                //付费账号
                account:[],
                //付费账号
                accountOwner:[],
                orangeId:[]
            }
        },
        components:{
            headerT,
            sendAlrtContent,
            alertContent
        },
        created(){
            this.pathAddress=this.$route.query.selectCode
            // console.log("x:"+this.pathAddress)
        },
        mounted() {
            console.log("------------");
            let account=this.$route.query.account;
            let orangeId=account.organId;
             console.log(orangeId);
            document.querySelector('#bank_code').value=account.bankName;
            //付费账号
            document.querySelector('#bank_acount').value=account.accCode;
            //账号所有人
            document.querySelector('#bank_person').value=account.accName;
            this.getNameOrg({
                orangeId,
                successCallback: result => {
                    console.log("getNameOrg.result")
                    console.log(this.result)
                    document.querySelector('#bank_org').value=result.data;
                    
                },
                failCallback: res => {
                console.log("getNameOrg.失败")
                    console.log(res)
                }
            });
       
        },
        methods:{
            ...mapActions({
                checklogin: "checklogin",
                getaccpuntInf: "getaccpuntInf",
                getvalidation: "getvalidation",
                getNameOrg: "getNameOrg",
            }),
            confirms(){
                
                this.bank_acount =document.querySelector('#bank_acount');

                this.bank_person =document.querySelector('#bank_person');
                //付费账号
                let bank_acountText=this.bank_acount.value;
                //账号所有人
                let bank_personText=this.bank_person.value;

                if(this.$toolsTwo.payCardFn(bank_acountText) == false){
                     Toast('付费账号输入有误，请重新输入');
                     return ;
                }
                if(bank_personText == ""){
                     Toast('账号所有人输入有误，请重新输入');
                     return ;
                }

                //this.panelShow = true;
                this.sendCode = true;
            },
            clolseAlert(){
                this.sendCode = false
            },
            //发送验证码
            sendCodeFn() {
                // this.$refs.senAlertContent.inputCode(111)
                let phoneNoData = {
                    userHandphone: this.phoneNoTwo
                };
                this.getaccpuntInf({
                    phoneNoData,
                    successCallback: result => {
                    console.log("result:"+result)
                    console.log("result:"+result.msg)
                   
                    switch (result.code) {
                        case 0:
                        // this.$router.push({
                        //     path: "/changeSuccess",
                        //     query: { 
                        //         pathAddress: this.$route.query.selectCode,
                        //     }
                        // });
                        this.$refs.senAlertContent.inputCode(result.msg)
                        break;
                        case 1:
                        let tipsData = `今日认证次数已达上限，请明天再来！`;
                        this.$router.push({
                            path: "/receiveList",
                            query: { 
                                pathAddress: this.$route.query.selectCode,
                                getAmount:this.$route.query.getAmount,
                                tipsData: tipsData
                            }
                        });
                        break;
                        default:
                            this.alertCount.alertData = result.msg;
                            this.alertCount.isShowAlert = true;
                        break;
                    }
                },
                failCallback: res => {
                    // this.alertCount.alertData = res.msg;
                    // this.alertCount.isShowAlert = true;
                    console.log("failCallback:"+res)
                    }
                });
            },
            //进行验证
            sendCodeFnTwo(codeData) {
                if(codeData==''){
                    this.alertCount.alertData = '请输入验证码！';
                        this.alertCount.isShowAlert = true;
                        return false
                }
                //银行卡
                this.bankCard =document.querySelector('#bank_code');
                 //银行卡类型
                this.bank_type =document.querySelector('#bank_type');
                //账号所属机构
                this.blank_name =document.querySelector('#bank_org');
                //付费账号
                this.bank_acount =document.querySelector('#bank_acount');
                //账号所有人
                this.bank_person =document.querySelector('#bank_person');

                let bankCardIndex = this.bankCard.selectedIndex; 

                let bank_typeIndex =this.bank_type.selectedIndex;

                let blank_nameIndex =this.blank_name.selectedIndex;

                //银行卡
                let bankCardText=this.bankCard.value;
                //银行卡类型
                let bank_typeText=this.bank_type.value;
                //账号所属机构
                let blank_nameText=this.blank_name.value;
                //付费账号
                let bank_acountText=this.bank_acount.value;
                //账号所有人
                let bank_personText=this.bank_person.value;

                console.log("银行卡:"+bankCardText)
                console.log("银行卡类型:"+bank_typeText)
                console.log("账号所属机构:"+blank_nameText)
                console.log("付费账号:"+bank_acountText)
                console.log("账号所有人:"+bank_personText)

                let phoneCodeNoData = {
                    verificationCode: codeData
                };
                let CodeNoData=phoneCodeNoData.verificationCode
                console.log("phoneCodeNoData:"+phoneCodeNoData.verificationCode)
                this.getvalidation({
                    CodeNoData,
                    successCallback: result => {
                        console.log(result)
                        switch (result.code) {
                            case 0:
                            window.localStorage.setItem('isBinding', '1')
                            // let tipsData = `认证成功`;
                            this.$router.push({
                                path: "/changeSuccess",
                                query: { 
                                    pathAddress: this.$route.query.selectCode,
                                    nextPath: this.$route.query.nextPath,
                                    bankCard:bankCardText,
                                    bankCardType:bank_typeText,
                                    organization:blank_nameText,
                                    account:bank_acountText,
                                    accountOwner:bank_personText,
                                    getAmount:this.$route.query.getAmount,
                                }
                            });
                            break;
                            case 1:
                            this.alertCount.alertData = result.msg;
                            this.alertCount.isShowAlert = true;
                            break;
                            case 2:
                            this.alertCount.alertData = result.msg;
                            this.alertCount.isShowAlert = true;
                            break;
                            case 3:
                            this.alertCount.alertData = result.msg;
                            this.alertCount.isShowAlert = true;
                            break;
                            case 9:
                            tipsData = result.msg;
                            this.$router.push({
                                path: "/userFailPage",
                                query: { tipsData: tipsData }
                            });
                            break;
                            default:
                            this.$refs.senAlertContent.isCodeWrongFn()
                            break;
                        }
                    },
                    failCallback: res => {
                        // this.$router.push({
                        //         path: "/changeSuccess",
                        //         query: { 
                        //             pathAddress: this.$route.query.selectCode,
                        //             nextPath: this.$route.query.nextPath
                        //         }
                        //     });
                        // this.alertCount.alertData = res.msg;
                        // this.alertCount.isShowAlert = true;
                        console.log("resresresresres");
                        console.log(res)
                    }
                });
            },
    }
}
</script>

<style lang="scss" scoped>
    .tishi{
        width: 95%;
        margin: 0 auto;
        color: red;
        background: #fff;
        border-radius: 6px;
        font-size: 16px;
        padding: 8px;
        margin-top: 10px;
        line-height: 24px;
    }
    .box{
        min-height: 100vh;
        background-color: #EFEFF4;
    }
    .bg {
    padding: 10px 10px 10px;
    width: 93.5%;
}

.bg .bg_content {
    padding: 13px;
    border: 1px solid #DCDCDC;
    background: #FFF;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    width: 91%;
    margin: 0 auto;
}

.bg_nrtop {
    width: 100%;
    line-height: 30px;
    font-size: 14px;
}

.bg_nrbottom select {
    font-size: 14px;
    font-family: "微软雅黑";
    height: 30px;
    /*float: right;*/
    width: 100%;
    line-height: 38px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*firefox*/;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*webkit*/;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    background: transparent;
}

.bg_nrbottom input {
    width: 97%;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*firefox*/;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*webkit*/;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}

.bdh {
    width: 95%;
    line-height: 40px;
    color: #fff;
    /* background: url(../img/xq_header_bg.png) no-repeat; */
    margin: 0 auto;
    margin-top: 10px;
    background-size: 100% 100%;
    position: relative;
}

.bdh .bdh_nn {
    position: absolute;
    right: 10px;
    top: 3px;
}

.bdh .bdh_nn input {
    width: 20px;
    height: 20px;
}
/* 提示框*/
.tishi {
    width: 90%;
    margin: 0 auto;
    color: red;
    background-color: #fff;
    border-radius: 6px;
    font-size: 16px;
    padding: 8px;
    margin-top: 10px;
}

.btn {
    margin: 5px auto;
    text-align: center;
    height: 35px;
    line-height: 35px;
    padding: 10px 0px;
}

.btn button {
    height: 35px;
    line-height: 35px;
    width: 50%;
    border: none;
    background: #00AE4F;
    border-radius: 7px;
    color: #fff;
    font-size: 14px;
}
select {
  border-radius: 0px;
  border: 1px solid rgb(169, 169, 169);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  background: url() no-repeat scroll 98% center transparent !important;
  background-size: 8px 8px !important;
  padding-left:5px;
}
select[disable],input[disabled],select:disabled,input:disabled{
  color: black!important;
  -webkit-text-fill-color:black!important;
  -webkit-opacity:1!important;
  opacity: 1!important;
  background: transparent!important;
}



</style>
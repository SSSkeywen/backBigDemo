<template>
<div class="normal-box">
    <headerT :headerContent="headerContent"></headerT>
    <div>
        <div class="sq_bt">账户所在地即您所使用收费账号开卡地</div>
        <div class="change-box">
            <ul class="change-box-list">
                <li>
                    <span>账号所属银行</span>
                    <div class="sq_nr">
                        <select name="userBank" class="select_lei" v-model="userBank" @change="toColor" :class="{changeStatuscolor: isAccInfoModified}">
                            <option v-for="(option,index) in bankList" :value="option.bankCode" :key="index">
                                {{ option.bankName }}
                            </option>
                        </select>
                        <i class="iconArrows">
                            <img :src="imgSrc1" >
                        </i>
                    </div>
                </li>
                <li>
                    <span>收费账号</span>
                    <input type="text" name="userNumber" v-model="BANKACCOUNT" @change="toColor" :class="{changeStatuscolor: isAccInfoModified}">
                </li>
                <li>
                    <span>账户类型</span>
                    <div class="sq_nr">
                        <select name="userType" class="select_lei" v-model="userType" @change="toColor" :class="{changeStatuscolor: isAccInfoModified}">
                            <option value="7">
                                普通卡
                            </option>
                        </select>
                        <i class="iconArrows">
                            <img :src="imgSrc1">
                        </i>
                    </div>
                </li>
                <li>
                    <span>账户所有人</span>
                    <input type="text" name="userHolder" v-model="ACCOOWNERNAME" @change="toColor" :class="{changeStatuscolor: isAccInfoModified}">
                </li>
                <li>
                    <span>账户所在地</span>
                    <div class="sq_nr">
                        <select name="userOrgan" class="select_lei" v-model="userOrgan" @change="toColor" :class="{changeStatuscolor: isAccInfoModified}">
                            <option v-for="(option,index) in organList" :value="option.value" :key="index">
                                {{ option.text }}
                            </option>
                        </select>

                        <i class="iconArrows">
                            <img :src="imgSrc1" >
                        </i>
                    </div>
                </li>
            </ul>
        </div>
        <section class="yy_cx">
            <button @click="confirms" :class="{chanegConfirms:chanegConfirm}" :disabled="chanegConfirm">确认变更</button>
        </section>
    </div>
    <div v-if="btnClick">
        <h6>温馨提示：您将授权太平人寿通过您以下银行卡收取保单相关费用。请确认您在银行预留的身份信息及联系方式。</h6>
        <div class="change-box">
            <ul class="change-box-list">
                <li>
                    <span>账户所有人</span>
                    <p name="accountName" disabled="disabled">{{ACCOOWNERNAME}}</p>
                </li>
                <li>
                    <span>开户证件类型</span>
                    <div class="sq_nr">
                        <select id="khzjlx" name="khzjlx" style="color: #000;" disabled v-model="certiType" >
                          <option :value="certiType">
                                {{ certiName }}
                            </option>
                        </select>
                        <i class="iconArrows">
                            <img :src="imgSrc1" >
                        </i>
                    </div>
                </li>
                <li>
                    <span>开户证件号码</span>
                    <p name="khzjhm" disabled="disabled">{{certiCode}}</p>
                </li>
                <li>
                    <span>收费帐户</span>
                    <p  disabled="disabled">{{BANKACCOUNT}}</p>
                </li>
                <li>
                    <span>银行预留手机号码</span>
                    <input type="text" name="ylsjh" v-model="ylsjh">
                </li>
                <li class="phoneCode">
                    <div>验证码：</div>
                    <div style="width: 45%;">
                        <input type="text" class="yzm" placeholder="请输入验证码" v-model="verificationCode"> 
                    </div>
                    <div style="width: 33%;" @click="sendCode">
                        <input class="hqyzm" type="button" :value="sendCodeFont" :disabled="sendCodeFontdisabled" :class="{changesendCode: sendCodeFontdisabled}">  
                    </div>
                </li>
            </ul>
        </div>
        <section class="yy_cx">
            <button @click="confirms2" :class={confirmstwoChangecolor:confirmstwoChange} :disabled="confirmstwoChange">确认变更</button>
        </section>
    </div>
    <div class="box_loading" v-if="showLoading">
        <div class="main">
            <div class="loadEffect">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <p class="text_loading">加载中<i class="loading">···</i></p>
    </div>
    <div v-if="openSuc" class="tk_pw tk_pw_css" style="overflow-y:auto;">
        <nav class="nav_top">
            <img :src="imgSrc3">
        </nav>
        <nav class="nav_content2">
            <span>{{resultfont}}
            </span>
        </nav>
        <section class="yy_cx">
            <button @click="toQuestion">问卷调查</button>
        </section>
        <section class="yy_cx">
            <button style="background-color: #949494;" @click="closeFn">关闭</button>
        </section>
    </div>
    <div v-if="openError" class="error_pw tk_pw_css" style="/* display:none; */overflow-y:auto;">
        <nav class="nav_top">
            <img :src="imgSrc2">
        </nav>
        <nav class="nav_content2">
            <p id="erro_msg" style="center">
               {{resultfont}}
            </p>
        </nav>
        <section class="yy_cx">
            <button id="err_pw_close" @click="closeFn">知道了</button>
        </section>
    </div>
    <alertContent :alertCount="alertCount"></alertContent>
</div>
</template>

<script>
import headerT from '@/components/header.vue'
import alertContent from "@/components/alertContent";
import { mapActions } from "vuex";
import { Toast } from "vant";
import validate from "@/js/toolsTwo.js";
    export default {
        data() {
            return {
                resultfont: "",
                timer: null,
                confirmstwoChange: false,
                chanegConfirm: false,
                verificationCode: '',
                toast1: null,
                sendCodeFontdisabled: false,
                sendCodeFont: '获取验证码',
                countDown: 60,
                certiType: '',
                certiCode: '',
                certiName: '',
                isAccInfoModified: false,
                BANKACCOUNT: '',
                ACCOOWNERNAME: '',
                headerContent: '收费账号变更',
                imgSrc1: require("@/assets/mgImg/icon-arrow-right.png"),
                imgSrc2: require("@/assets/bsImg/huang.jpg"),
                imgSrc3: require("@/assets/bsImg/success1.jpg"),
                btnClick:false,
                showLoading:false,
                openSuc:false,
                openError:false,
                alertCount:{
                  isShowAlert:false,
                  alertData:'请输入',
                },
                userBank:'0',
                userNumber:'',
                userType:'7',
                userHolder:'',
                userOrgan:'1',
                ylsjh:'18721863465',
                dataLists:[],
                bankList:[
                ],
                cardList:[
                    {text: '普通卡',value: 0},
                    {text: '普通卡1',value: 1},
                    {text: '普通卡2',value: 2},
                    {text: '普通卡3',value: 3}
                ],
                organList:[
                    {text: '所在地区',value: 0},
                    {text: '地区1',value: 1},
                    {text: '地区2',value: 2},
                    {text: '地区3',value: 3}
                ]
            }
        },
        components:{
            headerT,
            alertContent
        },
        mounted(){
            clearInterval(this.timer)
            let needParams = JSON.parse(this.$route.query.needParams)
            this.BANKACCOUNT = needParams[0].BANK_ACCOUNT
            this.ACCOOWNERNAME = needParams[0].ACCO_OWNER_NAME
            this.userBank = needParams[0].BANK_CODE
            this.userOrgan = needParams[0].ORGAN_ID
            // userBank
            this.getbankandorganlist({
                successCallback: (res) => {
                    if(res.code == 0) {
                        this.bankList = res.data.bank.RESULT_LIST
                        this.organList = res.data.organ.RESULT_LIST.map((item) => {
                            let obj = {}
                            obj.text = (item.companyName.replace("太平人寿保险有限公司","")).replace("分公司","")
                            obj.value = item.organId
                            return obj
                        })
                         
                    }
                },
                failCallback:(res) => {
                    Toast({
                        message: res.msg,
                        duration: 3000
                    });
                }
            })
        },
        methods:{
            ...mapActions({
                getbankandorganlist: 'getbankandorganlist',
                authquerysfzh: 'authquerysfzh',
                sendauthvcodesfzh: 'sendauthvcodesfzh',
                authenticationsfzh: 'authenticationsfzh',
                postupdatepolicylist: 'postupdatepolicylist'
            }),
            setTime(){
                this.timer = setInterval(() => {
                     if (this.countDown <= 0) {   
                        this.sendCodeFontdisabled = false
                        this.sendCodeFont="获取验证码";   
                        this.countDown = 60;  
                        clearInterval(this.timer)
                        this.timer = null
                      
                    } else {
                        this.sendCodeFontdisabled = true
                        this.sendCodeFont="重新发送(" + this.countDown + ")";
                        this.countDown = this.countDown -1;  
                        // 999898
                    }
                },1000);
   
            },
            sendCode(){
                if(!this.ylsjh){
                    Toast({
                        message: '银行预留手机号码为必录入项',
                        duration: 3000
                    });
                } else {
                    if(/^1\d{10}$/.test(this.ylsjh)){
                        let editdata = {
                            "accountNumber":this.BANKACCOUNT,
                            "accountName":this.ACCOOWNERNAME,
                            "bankCode":this.userBank,
                            "phoneNumber":this.ylsjh}
                        this.sendauthvcodesfzh({
                            editdata,
                            successCallback: (res) => {
                                Toast({
                                    message: res.msg,
                                    duration: 3000
                                });
                                this.setTime();
                            },
                            failCallback:(res) => {
                                Toast({
                                    message: res.msg,
                                    duration: 3000
                                });
                            }
                        })
                    } else {
                        Toast({
                            message: '银行预留手机号码格式不对',
                            duration: 3000
                        });
                    }
                }
            },
            toColor(v){
                this.isAccInfoModified = true
                // sleect和input  change后改变颜色
                // event.target.style.color='#000';
            },
            checkData(param){
                let falg = true
                for(var i=0;i< param.length;i++){
                    if(param[i].required && !param[i].value){
                        this.alertCount.isShowAlert=true;   
                        this.alertCount.alertData=param[i].lable+"不能为空"; 
                        falg =  false
                        break
                    }
                    if(param.name == "userBank"){
                      // 潘多拉无规则校验
                    } 

                    if(param.name == 'userType'){
                        // 潘多拉无校验
                    }
                    if(param.name == 'accountName'){
                        // 潘多拉无校验
                    }
                    if(param.name == 'userOrgan'){
                        // 潘多拉无校验
                    }
                }
                return falg
            },
            confirms(){
                // 待整理
                // let flag = !this.userBank||!this.BANKACCOUNT||!this.userType||!this.ACCOOWNERNAME||!this.userOrgan
                // 校验填写的信息
                if (!this.isAccInfoModified) {
                    this.alertCount.isShowAlert=true;   
                    this.alertCount.alertData='请填写需要变更的信息';   
                }else{
                    // 打开下方确认页面 按钮灰色  //  校验提示
                    let checkConfirms = [{
                         "required": true,
                         "name":"userBank",
                         "value": this.userBank,
                         "lable":"所属银行"
                    }, {
                        "required": true,
                         "name":"bankaccount",
                         "value": this.BANKACCOUNT,
                         "lable":"收费账号"
                    },{
                        "required": true,
                         "name":"userType",
                         "value": this.userType,
                         "lable":"账户类型"
                    },{
                        "required": true,
                         "name":"accountName",
                         "value": this.ACCOOWNERNAME,
                         "lable":"账户所有人"
                    },{
                        "required": true,
                        "name":"userOrgan",
                         "value": this.userOrgan,
                         "lable":"账户所在地"
                    }
                    ]
                    if(!this.checkData(checkConfirms)){
                        return
                    }
                    let editdata = {"accountNumber":this.BANKACCOUNT,"accountName": this.ACCOOWNERNAME,"bankCode": this.userBank}
                    this.authquerysfzh({
                        editdata,
                        successCallback: (res) => {
                            if(res.code == 0) {

                               if(res.data.returnStauts == 'N') {
                                let hiddenParameters = res.data.hiddenParameters
                                this.ylsjh = hiddenParameters.phoneNumber
                                this.certiType = hiddenParameters.certiType
                                this.certiCode = hiddenParameters.certiCode
                                this.certiName = hiddenParameters.certiName
                                this.btnClick=true;
                                this.chanegConfirm = true
                                // event.target.disabled=true;
                                //event.target.style.backgroundColor='rgb(165, 165, 165)';
                                
                               }
                               else if(res.code == 'Y'){
                                   //  校验提示
                                   // LODAING
                                    this.toast1 = Toast.loading({
                                        mask: true,
                                        message: "加载中...",
                                        duration: 1000
                                    });
                                    this.getpostupdatepolicylist()
                               } 
                               else {
                                  
                               }
                            }
                        },
                        failCallback:(res) => {
                        }
                    })
                }
            },
            getpostupdatepolicylist(){
                let editdata = {"accountType":this.userType,"organName": this.userOrgan,"bankCode":this.userBank,"nothing":"nothing"}
                this.postupdatepolicylist({
                        editdata,
                        successCallback: (res) => {
                             this.confirmstwoChange = true
    
                            if(res.data.code == 0) {
                                // needParams = res.data.data
                                this.resultfont = res.data.msg
                                this.openSuc=true;
                               // this.$router.push({path: '/statusPage',  query: {btnTexts: "知道了", nextPath: '/businessHanding', needParams: JSON.stringify(needParams)}})
                            } else if(res.data.code == 1){
                                this.openError=true;
                                this.resultfont = res.data.msg
                            } 
                            Toast({
                                message: res.data.msg

                            }) 
                            
                            
                            
                        },
                        failCallback:(res) => {
                            Toast({
                                message: data.msg,
                                duration: 3000
                            });  
                        }
                    })

            },
            confirms2(){
                // 校验填写的信息
                let param = [{
                         "required": true,
                         "name":"certiType",
                         "value": this.certiType,
                         "lable":"开户证件类型"
                    }, {
                        "required": true,
                         "name":"certiCode",
                         "value": this.certiCode,
                         "lable":"收费账号"
                    },{
                        "required": true,
                         "name":"phoneNumber",
                         "value": this.ylsjh,
                         "lable":"银行预留手机号码"
                    },{
                        "required": true,
                         "name":"accountName",
                         "value": this.ACCOOWNERNAME,
                         "lable":"账户所有人"
                    },{
                        "required": true,
                        "name":"verificationCode",
                         "value": this.verificationCode,
                         "lable":"请输入验证码"
                    }]           
                if (!this.checkData(param)) {
                    this.alertCount.isShowAlert=true;   
                    this.alertCount.alertData='请填写需要变更的信息';   
                }else{
                    let editdata = {
                        "accountNumber":this.BANKACCOUNT,
                        "accountName": this.ACCOOWNERNAME,
                        "bankCode": this.userBank,
                        "verificationCode": this.verificationCode,
                        "phoneNumber": this.ylsjh 
                    } 
                    this.authenticationsfzh({
                        editdata,
                        successCallback: (res) => {
                            if(res.data.code == 0) {
                                this.getpostupdatepolicylist()
                            } 
                             Toast({
                                message: res.data.msg,
                            });
                            
                        },
                        failCallback:(res) => {
                             Toast({
                                message: res.msg,
                                duration: 3000
                            });
                        }
                    })
                    
                    
                    
                }
            },
            toQuestion(){
               this.$router.push({ path: '/'}); 
            },
            closeFn(){
                // 关闭或跳转
                this.openSuc = false
                this.openError = false 
            }
        }
    }
</script>

<style lang="scss" scoped>
.normal-box{
    min-height:100vh;
    background-color: #EFEFF4;
    h6{
        text-align: justify;
        font-size: 12px;
        color: #de181e;
        padding-left: 8px;
        padding-right: 1.6px;
    }
}
// 结果页面
.tk_pw_css {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #fff;
    top: 0;
    .nav_top{
        padding-top: 10%;
        width: 100%;
        text-align: center;
        img{
            display: inline-block;
            width: 75px;
            height: 75px;
        }
    }
    .nav_content2{
        width: 90%;
        margin: 0 auto;
        text-indent: 2em;
        span{
            text-align: justify;
            text-indent: 2em;
            color: #000;
        }
    }
}
.sq_bt {
    width: 94%;
    margin: 0px auto 0;
    line-height: 40px;
    color: #888888;
    font-size: 14px;
}
.change-box{
    width: 100%;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    zoom: 1;
    .change-box-list{
        width: 97%;
        float: right;
        line-height: 44px;
        .phoneCode{
            display: flex;
            justify-content: space-between;
            margin-right: 5%;
            div{
                input.yzm{
                    width: 98%;
                    text-align: center;
                    height: 63%;
                    border: 1px solid #eaeaea;
                    border-radius: 5px;
                }
                input.hqyzm{
                    display: inline-block;
                    width: 100px;
                    border: none;
                    margin-top: 6%;
                    text-align: center;
                    height: 69%;
                    line-height: 1;
                    background-color: #00ae4d;
                    color: #fff;
                }
            }
        }
        li{
            border-bottom: 1px solid #EFEFF4;
            display: flex;
            span {width: 36%;}
            &>input{
                flex: auto;
                color: #777777;
                &.blur{color:#000;}
            }
            p{
                color: #a5a3a3;
                width: 75%;
                position: relative;
            }
            
            .sq_nr{
                flex: auto;
                position: relative;
                color: #b2b2b2;
                select{
                    width: 100%;
                    height: 40px;
                    border: none;
                    appearance: none;
                    color: rgb(119, 119, 119);
                    font-size: 16px;
                    line-height: 18px;
                    background-color: transparent;
                    outline: none;
                    &.blur{color:#000;}
                }
                .iconArrows{
                    font-size: 18px;
                    position: absolute;
                    right: 2%;
                    top: 0;
                    img{
                        display: inline-block;
                        vertical-align: middle;
                        width: 50%;
                    }
                }

            }
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
// loading动画
// 

.box_loading{width: 100%;height: 100%;background: rgba(0,0,0,.6);position: fixed; top:0;}
.main{width: 100%;height: auto;padding-top: 100px;}
.loadEffect{width: 100px;height: 100px;position: relative;margin: 0 auto;margin-top:20%;}
.loadEffect span{display: inline-block;width: 16px;height: 16px;border-radius: 50%;background: lightgreen;position: absolute;animation: load 1.04s ease infinite;}
@keyframes load{0%{opacity: 1;}100%{opacity: 0.2;}}
.loadEffect span:nth-child(1){left: 0;top: 50%;margin-top:-8px;animation-delay:0.13s;}
.loadEffect span:nth-child(2){left: 14px;top: 14px;animation-delay:0.26s;}
.loadEffect span:nth-child(3){left: 50%;top: 0;margin-left: -8px;animation-delay:0.39s;}
.loadEffect span:nth-child(4){top: 14px;right:14px;animation-delay:0.52s;}
.loadEffect span:nth-child(5){right: 0;top: 50%;margin-top:-8px;animation-delay:0.65s;}
.loadEffect span:nth-child(6){right: 14px;bottom:14px;animation-delay:0.78s;}
.loadEffect span:nth-child(7){bottom: 0;left: 50%;margin-left: -8px;animation-delay:0.91s;}
.loadEffect span:nth-child(8){bottom: 14px;left: 14px;animation-delay:1.04s;}
.box_loading{width: 100%;height: 100%;background: rgba(0,0,0,.6);}
.text_loading{width: 100%;font-size: 16px;text-align: center;color: #fff;margin-top: 10%;}
.codrops-demos {font-size: 0.8em;text-align:center;position:absolute;z-index:99;width:96%;}
.codrops-demos a {display: inline-block;margin: 0.35em 0.1em;padding: 0.5em 1.2em;outline: none;text-decoration: none;text-transform: uppercase;letter-spacing: 1px;font-weight: 700;border-radius: 2px;font-size: 110%;border: 2px solid transparent;color:#3366cc;}
.codrops-demos a:hover,.codrops-demos a.current-demo {border-color: #3366cc;}
.changeStatuscolor{
    color: #000 !important;
}
.changesendCode{
    background:#999898 !important;
}
.chanegConfirms{
    background:rgb(165, 165, 165)!important;
}
.confirmstwoChangecolor{
    background: #898989 !important;
}
</style>
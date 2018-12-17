<template>
<div class="normal-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="change-info-box" >
        <div class="list-box">
            <ul class="bg_content">
                <li class="bg_nr">
                    <div class="bg_nrtop">支付方式：</div>
                    <div class="bg_nrbottom">
                        <select name="authorizeType" v-model="authorizeType" @change="changVal">
                            <option v-for="(option,index) in authorizeTypeList" :value="option.value" :key="index">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                </li>
                <li class="bg_nr">
                    <div class="bg_nrtop">授权银行：</div>
                    <div class="bg_nrbottom">
                        <!-- <input  class="selgray" :class="{'noclick':toColor}" name="bank_name" v-model="bankNameList[changeIndex].text" disabled /> -->
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
                <li class="bg_nr">
                    <div class="bg_nrtop">授权帐号：</div>
                    <div class="bg_nrbottom">
                        <!-- <input class="selgray" :class="{'noclick':toColor}" name="userNumber" v-model="accCodeList[changeIndex].text" disabled> -->
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
                <li class="bg_nr">
                    <div class="bg_nrtop">账户所属机构：</div>
                    <div class="bg_nrbottom">
                        <!-- <input class="selgray" :class="{'noclick':toColor}" name="userOrgan" v-model="organNameList[changeIndex].text" disabled> -->
                        <input class="selgray" :class="{'noclick':toColor}" name="userOrgan" v-model="accountMessShow.organName" disabled>
                    </div>
                </li>
            </ul>
        </div>
        <section class="yy_cx">
            <button @click="confirms">确认</button>
        </section>
    </div>

    <div v-if="openSuc" class="tk_pw tk_pw_css" style="overflow-y:auto;">
        <nav class="nav_top">
            <img :src="imgSrc3">
        </nav>
        <nav class="nav_content2">
           <p style="center">
                变更
                <!-- 提示文字 -->
               
            </p>
             <!-- <span></span> -->
        </nav>
        <nav class="nav_btn">
            <a href="#">
                <button>关闭</button>
            </a>
        </nav>
    </div>
    <div v-if="openError" class="error_pw tk_pw_css" style="/* display:none; */overflow-y:auto;">
        <nav class="nav_top">
            <img :src="imgSrc2">
        </nav>
        <nav class="nav_content2">
            <p style="center">保单号：000366661689008 变更失败</p>
                <!-- 提示文字 -->
            <span>批文信息：保全申请失败！</span>
            
        </nav>
        <nav class="nav_btn">
            <a href="https://tpwxtestcloud.life.cntaiping.com:443/wxqhb/95589/ywbl.jsp">
                <button>关闭</button>
            </a>
        </nav>
    </div>
    <alertContent :alertCount="alertCount"></alertContent>
    <!-- <sendAlrtContent v-if="showMsg" ref="senAlertContent" :codeData="codeData"  @clolseAlert="clolseAlert" @sendCodeFnTwo="sendCodeFnTwo" @sendCodeFn="sendCodeFn"></sendAlrtContent> -->
</div>
</template>

<script>
import headerT from '@/components/header.vue'
import alertContent from '@/components/alertContent.vue'
import sendAlrtContent from '@/components/sendAlrtContent.vue'
import { mapActions } from "vuex";
import { DatetimePicker,Toast } from 'vant';
export default {
    data() {
        return {
            headerContent: '红利领取方式变更',
            toColor:false,
            openSuc:false,
            openError:false,
            imgSrc2: require("@/assets/bsImg/huang.jpg"),
            imgSrc3: require("@/assets/bsImg/success1.jpg"),
            authorizeType:'0',
            showMsg:false,
            alertCount:{
              isShowAlert:false,
              alertData:'请输入',
            },
            authorizeTypeList:[
                {text: '请选择支付方式',value: 0},
                {text: '授权现金',value: 1},
                {text: '授权转账',value: 2}
            ],
            // changeIndex: 0,
            // accBankList:[//银行所属代码
            //     {text: '',value: 0},
            // ],
            // bankNameList:[//银行
            //     {text: '请选择账号所属银行',value: 0},
            // ],
            // accTypeList:[//银行卡类型
            //     {text: '请选择账户类型',value: 0,type: 0},
            //     // {text: '普通卡',value: 1,type: 7},
            // ],
            // accCodeList:[
            //     {text: '请填写收费帐号',value: 0},
            // ],
            // accNameList:[
            //     {text: '请填写所有人真实姓名',value: 0},
            // ],
            // organIdList:[
            //     {text: '',value: 0},
            // ],
            // organNameList:[
            //     {text: '请输入账户所属机构',value: 0},
            // ],
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
        }
    },
    components:{
        headerT,
        alertContent,
        sendAlrtContent
    },
    created(){       
        let policyCodeStr = this.$route.query.policyCodeStr;
        this.getBonusGetWayChangechecked({
            policyCodeStr,
            successCallback: (res) => {
                this.checkedList = res.atli;
                this.account = res.account;

                let organId = this.account.organId;
                this.getOrgenName({
                    organId,
                    successCallback: (res) => {
                        //赋值
                        // this.accBankList.push({text: this.account.accBank,value: 1});
                        // this.accCodeList.push({text: this.account.accCode,value: 1});
                        // this.accTypeList.push({text: '普通卡',value: 1, type:this.account.accType});
                        // this.accNameList.push({text: this.account.accName,value: 1});
                        // this.organIdList.push({text: this.account.organId,value: 1});
                        // this.organNameList.push({text: res,value: 1});
                        // this.bankNameList.push({text: this.account.bankName,value: 1}); 
                        this.accountMessShowTrans = {
                            accBank: this.account.accBank,//银行所属代码
                            bankName: this.account.bankName,//银行
                            accType: '7',//账户类型
                            accTypeName: '普通卡',
                            accCode: this.account.accCode,//银行账号
                            accName: this.account.accName,//账户所有人
                            organId: this.account.organId,//账户所属机构
                            organName: res,//账户所属机构代码
                        };
                    },
                    failCallback:(res) => {
                        this.alertCount.isShowAlert = true;
                        this.alertCount.alertData = res.msg;
                    }
                })
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
            getBonusGetWayChangechecked:'getBonusGetWayChangechecked',
            getOrgenName:'getOrgenName',
            updateBonusGetWay:'updateBonusGetWay',
        }),
        changVal(){
            this.isAccInfoModified =true;
            // 如果选择现金方式 灰色
            if(this.authorizeType!=1){
                this.toColor=true;
            }else{
                this.toColor=false;
            }
            if(this.authorizeType==1){
                // this.changeIndex = 0;
                this.accountMessShow = this.accountMessShowCash;
            }else{
                // this.changeIndex = 1;
                this.accountMessShow = this.accountMessShowTrans;
            }
        },
        confirms(){
            const toast1 = Toast.loading({
                mask: true,
                message: "数据努力提交中，请一定不要返回或者退出微信~~",
                duration: 3000
            });
            // 格式校验  待更改
            if(this.authorizeType==0){
                this.alertCount.isShowAlert = true;
                this.alertCount.alertData = "授权方式不能为空！";
                this.isAccInfoModified =false;
                toast1.clear();
            }
            //待更改

            if(this.authorizeType!=1){
                for(let item of this.checkedList){
                    if(item.authDraw==this.authorizeType&&item.authAccount==this.accountMessShow.accCode&&item.bankName==this.accountMessShow.accBank&&item.accoName==this.accountMessShow.accName){
                        this.alertCount.isShowAlert = true;
                        this.alertCount.alertData = "信息未进行任何变更，不允许后续操作";
                        this.isAccInfoModified =false;
                        toast1.clear();
                    }		
                }
            }else{
                for(let item of this.checkedList){
                    if(this.authorizeType==1){
                        if(item.authDraw==this.authorizeType){
                            this.alertCount.isShowAlert = true;
                            this.alertCount.alertData = "信息未进行任何变更，不允许后续操作";
                            this.isAccInfoModified =false;
                            toast1.clear();
                        }
                    }
                }
            }
            let param = {};
            if(this.authorizeType==1){
                param ={
                    authorizeType: this.authorizeType,
                    userBank: '',
                    bankName: '',
                    userNumber: '',
                    userHolder: '',
                    userType: '',
                    userOrgan: '',
                };
            }else{
                param ={
                    authorizeType: this.authorizeType,
                    userBank: this.accountMessShow.accBank,
                    bankName: this.accountMessShow.bankName,
                    userNumber: this.accountMessShow.accCode,
                    userHolder: this.accountMessShow.accName,
                    userType: this.accountMessShow.accType,
                    userOrgan: this.accountMessShow.organId,
                };
            };
            if(this.isAccInfoModified!=false){
                this.updateBonusGetWay({
                    param,
                    successCallback: (res) => {
                        window.localStorage.setItem('bonusGetWayChangeApproval',JSON.stringify(res));
                        this.$router.push({ path: '/bonusGetWayChangeApproval', query:{ }});
                        toast1.clear();
                    },
                    failCallback:(res) => {
                        toast1.clear();
                        this.alertCount.isShowAlert = true;
                        this.alertCount.alertData = res.msg;
                    }
                })
            }
        },
        clolseAlert(){
        // 子组件调用  返回上一页
        history.back();
        },
        sendCodeFn(){
        // 子组件调用 发送验证码 
        },
        sendCodeFnTwo(){
        // 子组件调用 跳转
            if(true){
                // 变更成功打开 添加提示文字
                this.openSuc=true;
            }else{
                // 变更失败打开  添加提示文字
                this.openError=true;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.normal-box{
    min-height:100vh;
    background-color: #EFEFF4;
    .change-info-box{
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
                            -webkit-appearance: menulist;
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
        p {
            width: 100%;
            line-height: 50px;
            text-align: center;
            display: inline-block;
            font-size: 18px;
            color: #000;
        }
        span{
            width: 88%;
            line-height: 30px;
            text-align: center;
            display: inline-block;
            margin: 0 6%;
            min-height: 50px;
            color: #666;
        }
    }
    .nav_btn {
        width: 100%;
        height: 36px;
        line-height: 36px;
        a{
            button {
                width: 90%;
                height: 36px;
                border: 0px;
                margin: 0 5%;
                background: #04be01;
                color: #fff;
                border-radius: 5px;
                font-size: 16px;
            }
        }
    }
}
</style>
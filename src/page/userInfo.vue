<template>
  <div class="user-box" @click="closeSelect">
    <div class="user-container">
      <div class="user-logo">
        <img :src="logoImgSrc" alt>
      </div>
      <div class="user-form">
        <input class="user-text" max-length="20" v-model="commName" type="text" placeholder="姓名">
        <div class="main_sty">
          <input
            type="text"
            name="select"
            lx="0"
            class="user-text"
            @click.stop="isOpenSelect=!isOpenSelect"
            v-model="cardNameType"
            style="border:1px solid #dedede;text-align:center;"
            readonly
            placeholder="请选择您的证件类型"
          >
          <transition name="fade">
            <div class="main_select" v-show="isOpenSelect">
              <ul>
                <li
                  :value="item.cardValue"
                  v-for="(item,index) in cardList"
                  :key="index"
                  @click="selectCard(index)"
                >{{item.cardName}}</li>
                <!-- <li value = "2">军人证</li>
                <li value = "3">护照</li>-->
                <!--      <li value = "4">出生证</li> -->
                <!-- <li value = "5">异常身份证</li>
                            <li value = "6">港澳台通行证</li>
                            <li value = "7">士兵证</li>
                            <li value = "8">警官证</li>
                            <li value = "61">外国人永久居留身份证</li>
                <li value = "9">其他</li>-->
              </ul>
            </div>
          </transition>
        </div>
        <input
          class="user-text"
          max-length="20"
          v-model="usercertcode"
          type="text"
          placeholder="证件号码"
        >
        <button class="style-click" type="submit" @click="validation" name="check_btn">验证</button>
      </div>
    </div>
    <bgComponent></bgComponent>
    <alertContent :alertCount="alertCount"></alertContent>
    <sendAlrtContent ref="senAlertContent" :pnoneBack="phoneNo" v-if="sendCode" @clolseAlert="clolseAlert" @sendCodeFnTwo="sendCodeFnTwo" @sendCodeFn="sendCodeFn"></sendAlrtContent>
  </div>
</template>

<script>
import bgComponent from "../components/bgComponent";
import alertContent from "../components/alertContent";
import sendAlrtContent from "../components/sendAlrtContent";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      cardNameType: "请选择您的证件类型",
      usercertcode: "",
      commName: "",
      certtype: "",
      phoneNo: "",
      phoneNoTwo:"",
      sendCode: false,
      codeData: "",
      logoImgSrc: require("@/assets/publicImg/1_03.png"),
      isOpenSelect: false,
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },
      cardList: [
        {
          cardName: "身份证",
          cardValue: "1"
        },
        {
          cardName: "军人证",
          cardValue: "2"
        },
        {
          cardName: "护照",
          cardValue: "3"
        },
        {
          cardName: "异常身份证",
          cardValue: "5"
        },
        {
          cardName: "港澳台通行证",
          cardValue: "6"
        },
        {
          cardName: "士兵证",
          cardValue: "7"
        },
        {
          cardName: "警官证",
          cardValue: "8"
        },
        {
          cardName: "外国人永久居留身份证",
          cardValue: "61"
        },
        {
          cardName: "其他",
          cardValue: "9"
        }
      ]
    };
  },
  components: {
    bgComponent,
    alertContent,
    sendAlrtContent
  },
  created() {
    // console.log(this.$route.query.pathAddress)
    // history.go(-1).href='http://localhost.cntaiping.com:8080/#/'
  },
   mounted() {
    let that = this;
    // 添加返回事件监听
    // window.addEventListener("popstate", function(e) {
    //   alert(11)
    //   // history.go(-1).href='http://localhost.cntaiping.com:8080/#/'
    //   // window.history.go(-2)
    // }, false);
  },
  methods: {
    ...mapActions({
      checklogin: "checklogin",
      loginverificationcode: "loginverificationcode",
      phonewsercode: "phonewsercode"
    }),


    selectCard(index) {
      console.log(index);
      this.cardNameType = this.cardList[index].cardName;
      this.certtype = this.cardList[index].cardValue;
      this.isOpenSelect = false;
    },

    clolseAlert(){
      this.sendCode = false
    },


    validation() {
      if (this.commName == "") {
        this.alertCount.alertData = "请输入您的姓名";
        this.alertCount.isShowAlert = true;
        return false;
      }
      if (!this.$toolsTwo.clientName(this.commName)) {
          this.alertCount.alertData = "姓名格式有误！";
          this.alertCount.isShowAlert = true;
          return false;
        }
      if (this.certtype == "") {
        this.alertCount.alertData = "请选择您的证件类型";
        this.alertCount.isShowAlert = true;
        return false;
      }
      if (this.usercertcode == "") {
        this.alertCount.alertData = "请输入您的证件号码";
        this.alertCount.isShowAlert = true;
        return false;
      }
      if (this.certtype == "1") {
        if (!this.$toolsTwo.codeCrad(this.usercertcode)) {
          this.alertCount.alertData = "身份证号码格式不正确";
          this.alertCount.isShowAlert = true;
          return false;
        }
      }
      if (this.certtype == "61") {
        if (!this.$toolsTwo.foreignCard(this.usercertcode)) {
          this.alertCount.alertData = "证件号输入有误，请核实！";
          this.alertCount.isShowAlert = true;
          return false;
        }
        if (!this.$toolsTwo.foreignName(this.commName)) {
          this.alertCount.alertData =
            "外国人永久居留身份证标准的证件格式为：姓+,+名 ，姓与名中间用逗号（半角），前后无空格，如：【ZHENJIAN,YANGBEN】，请检查！";
          this.alertCount.isShowAlert = true;
          return false;
        }
      } else {
        if (!this.$toolsTwo.clientName(this.commName)) {
          this.alertCount.alertData = "姓名格式有误！";
          this.alertCount.isShowAlert = true;
          return false;
        }
      }
      // return false
      let testData = {
        name: this.commName,
        certtype: this.certtype,
        certcode: this.usercertcode
      };
      console.log(testData);
      const toast1 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 1000
      });
      this.checklogin({
        testData,
        successCallback: result => {
          // if (result.responsecode == 0) {
          // } else {
          // }
          console.log(result);
          var tipsData;
          switch (result.responsecode) {
            case "0":
              this.phoneNoTwo = result.celler
              this.phoneNo = result.celler.substring(7, 11)
              
              this.sendCode = true;
              break;
            case "1":
              tipsData = `<p>无法认证</p><span>原因：您在我司系统中留存的个人信息不完整。</span>`;
              this.$router.push({
                path: "/userFailPage",
                query: { tipsData: tipsData }
              });
              break;
            case "2":
              tipsData = `<p>无法认证</p><span>原因：您在我司系统中留存的个人信息不完整。</span>`;
              this.$router.push({
                path: "/userFailPage",
                query: { tipsData: tipsData }
              });
              break;
            case "3":
              tipsData = `<p>无法认证</p><span>原因：保全（账户通）-未检索到手机号,无法发送短信验证码。</span>`;
              this.$router.push({
                path: "/userFailPage",
                query: { tipsData: tipsData }
              });
              break;
            case "4":
              this.alertCount.alertData = result.responsemsg;
              this.alertCount.isShowAlert = true;
              break;
            case "5":
              tipsData = `请绑定本人信息，谢谢！`;
              this.$router.push({
                path: "/userFailPage",
                query: { tipsData: tipsData }
              });
              break;
            case "6":
              tipsData = `<p>无法认证</p><span>原因：客户信息已经绑定微信，无法再次绑定！</span>`;
              this.$router.push({
                path: "/userFailPage",
                query: { tipsData: tipsData }
              });
              break;
            default:
            this.alertCount.alertData = result.responsemsg;
              this.alertCount.isShowAlert = true;
              // $("#zfqr_jiaz").css("display", "none");
              // $("div.con_tk2")
              //   .find("p[name='msg']")
              //   .html(data.msg);
              // $("div.bg_tk2").show();
              // $("div.con_tk2").show();
              break;
          }
          toast1.clear();
        },
        failCallback: res => {
          toast1.clear();
          this.alertCount.alertData = res;
              this.alertCount.isShowAlert = true;
        }
      });
      // this.$router.push({ path: this.$route.query.pathAddress });
    },

    //发送验证码
    sendCodeFn() {
      // this.$refs.senAlertContent.inputCode(111)
      let phoneNoData = {
        userHandphone: this.phoneNoTwo
      };
      this.loginverificationcode({
        phoneNoData,
        successCallback: result => {
          console.log(result)
          switch (result.responsecode) {
            case "0":
              // $("input[name='input_yzm']").val(data.result);
              // this.codeData = result.agentCode;
              // this.$set(this.codeData,result.agentCode)
              this.$refs.senAlertContent.inputCode(result.agentCode)
              break;
            case "1":
              let tipsData = `今日认证次数已达上限，请明天再来！`;
              this.$router.push({
                path: "/userFailPage",
                query: { tipsData: tipsData }
              });
              break;
            default:
              this.alertCount.alertData = result.responsemsg;
              this.alertCount.isShowAlert = true;
              break;
          }
        },
        failCallback: res => {
          this.alertCount.alertData = res;
              this.alertCount.isShowAlert = true;
          // toast1.clear();
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
      let phoneCodeNoData = {
        verificationCode: codeData
      };
      console.log(phoneCodeNoData)
      this.phonewsercode({
        phoneCodeNoData,
        successCallback: result => {
          console.log(result)
          switch (result.responsecode) {
            case "0":
            window.localStorage.setItem('isBinding', '1')
              // let tipsData = `认证成功`;
              this.$router.push({
                path: "/successPage",
                query: { pathAddress: this.$route.query.pathAddress,nextPath: this.$route.query.nextPath }
              });
              break;
            case "1":
              this.alertCount.alertData = result.responsemsg;
              this.alertCount.isShowAlert = true;
              break;
            case "2":
              this.alertCount.alertData = result.responsemsg;
              this.alertCount.isShowAlert = true;
              break;
            case "3":
              this.alertCount.alertData = result.responsemsg;
              this.alertCount.isShowAlert = true;
              break;
            case "9":
              tipsData = result.responsemsg;
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
          this.alertCount.alertData = res;
              this.alertCount.isShowAlert = true;
        }
      });
    },


    //关闭下拉框
    closeSelect() {
      this.isOpenSelect = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-box {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #3ad298 0%, #051fd8 100%);
}

.user-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 10% 0;
  text-align: center;
  .user-logo {
    img {
      width: 50%;
      margin: 0 auto;
    }
  }
  .user-form {
    padding: 10px 0;
    position: relative;
    z-index: 2;
    .user-text {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: 0;
      border: 1px solid rgba(255, 255, 255, 0.4);
      background-color: rgba(255, 255, 255, 0.2);
      width: 250px;
      border-radius: 36px;
      padding: 10px 15px;
      margin: 0 auto 10px auto;
      display: block;
      /* text-align: center; */
      font-size: 18px;
      color: white;
      -webkit-transition-duration: 0.25s;
      transition-duration: 0.25s;
      font-weight: 300;
      text-align: center;
      margin-bottom: 15px;
      box-sizing: border-box;
    }
    .user-text:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
    .user-text:focus {
      background-color: white;
      width: 300px;
      color: #333;
    }
    button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: 0;
      background-color: #56b3f5;
      border: 0;
      padding: 10px 15px;
      color: #fff;
      border-radius: 37px;
      width: 250px;
      cursor: pointer;
      font-size: 18px;
      -webkit-transition-duration: 0.25s;
      transition-duration: 0.25s;
    }
  }
}
.main_select {
  position: relative;
  top: -26px;
  height: 160px;
  overflow: hidden;
  ul {
    max-height: 160px;
    overflow-y: scroll;
    li {
      line-height: 36px;
      border: 1px solid #dedede;
      border-bottom: none;
      cursor: pointer;
      width: 270px;
      display: inline-block;
      color: #333;
      background: #fff;
    }
  }
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: white !important;
  font-weight: 300;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: white !important;
  opacity: 1;
  font-weight: 300;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: white !important;
  opacity: 1;
  font-weight: 300;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: white !important;
  font-weight: 300;
}

.fade-enter-active,
.fade-leave-active {
  transition: height 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  height: 0px;
}
</style>
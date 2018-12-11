<template>
  <div class="user-box">
    <div class="user-container">
      <div class="user-logo">
        <img :src="logoImgSrc" alt>
      </div>
    </div>
    <sendAlrtContent
      ref="senAlertContent"
      :pnoneBack="pnoneBack"
      @clolseAlert="clolseAlert"
      @sendCodeFnTwo="sendCodeFnTwo"
      @sendCodeFn="sendCodeFn"
    ></sendAlrtContent>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import sendAlrtContent from "../../components/sendAlrtContent";
import { mapActions } from "vuex";
import { Toast } from "vant";
import alertContent from "@/components/alertContent.vue";
export default {
  data() {
    return {
      logoImgSrc: require("@/assets/publicImg/1_03.png"),
      pnoneBack: "",
      alertCount: {
        alertData: "",
        isShowAlert: false
      }
    };
  },
  components: {
    sendAlrtContent,
    alertContent
  },
  created() {
    console.log(this.$route.query.pathAddress);
    this.getusermobiletailnumber({
      successCallback: res => {
        console.log(res);
        this.pnoneBack = res.data.mobile;
      },
      failCallback: res => {
        if (res.code == 2002) {
          this.$route.push({
            path: "/userInfo",
            query: { pathAddress: "/unbindSelf" }
          });
        } else {
          this.alertCount.alertData = res.msg;
          this.alertCount.isShowAlert = true;
        }
      }
    });
  },
  methods: {
    ...mapActions({
      pureinsuredunbind: "pureinsuredunbind",
      getusermobiletailnumber: "getusermobiletailnumber",
      getverifycationcode: "getverifycationcode",
      comparisonverifycode: "comparisonverifycode",
      querybusoperaionlist: "querybusoperaionlist",
      launchuntie: "launchuntie",
      untieimmediately: "untieimmediately"
    }),

    clolseAlert() {
      // 子组件调用  返回上一页
      history.back();
    },

    sendCodeFn() {
      // 发送验证码
      this.getverifycationcode({
        successCallback: res => {
          //this.verifyCode = res.data.verifyCode;
          this.$refs.senAlertContent.inputCode(res.data.verifyCode)
          console.log(res.data);
        },
        failCallback: res => {
          if (res.code == 2002) {
            this.$route.push({
              path: "/userInfo",
              query: { pathAddress: "/unbindSelf" }
            });
          }else if (res.code == 2100) {
            let choose = `<div style="padding-top: 12%;" >
            <img src="../../assets/bsImg/lan.jpg"> 
          </div>
          <div class="tetx-content">
             今日认证次数已达上限，请明天再来！
          </div>`;
            this.$router.push({
              path: "/unbindSuc",
              query: { pathAddress: choose }
            });
          } else {
            this.alertCount.alertData = res.msg;
            this.alertCount.isShowAlert = true;
          }
        }
      });
    },
    sendCodeFnTwo(code) {
      if (code == null || code == "") {
        this.alertCount.alertData = "验证码不能为空";
        this.alertCount.isShowAlert = true;
        return false;
      }
      let verifyCode = {
        verifyCode: code
      };
      console.log(verifyCode);
      //校验验证码
      this.comparisonverifycode({
        verifyCode,
        successCallback: res => {
          console.log(res.data);
          if (res.data.flag == 0) {
            this.launchuntie();
          } else if (res.data.flag == 1) {
            this.alertCount.alertData = res.msg;
            this.alertCount.isShowAlert = true;
          }
        },
        failCallback: res => {
          if (res.code == 2002) {
            this.$route.push({
              path: "/userInfo",
              query: { pathAddress: "/unbindSelf" }
            });
          } else {
            this.alertCount.alertData = res.msg;
            this.alertCount.isShowAlert = true;
          }
        }
      });
    },
    launchuntie() {
      //发起解绑
      this.launchuntie({
        successCallback: res => {
          console.log(res.data);
          let choose
          if (res.data.flag == 1) {
            //解绑成功
            choose = `<div style="padding-top: 12%;" >
            <img src="../../assets/bsImg/success1.jpg"> 
          </div>
          <div class="tetx-content">解绑成功
            <p style="margin-top: 0.2rem;">请退出微信后重新登陆，解绑立马生效。</p>
          </div>`
            this.$router.push({
              path: "/unbindSuc",
              query: { pathAddress: choose }
            });
          } else if (res.data.flag == 2) {
            //提交人工审核成功
            choose = `<div style="padding-top: 12%;" >
            <img src="../../assets/bsImg/success1.jpg"> 
          </div>
          <div class="tetx-content" style=";font-size: 0.32rem; margin-top: 4%;line-height: 0.5rem;">
             解绑申请已提交，公司专员会尽快为您处理，1-2个工作日后会将处理结果以短信形式通知到您，请等待。
          </div>`;
            this.$router.push({
              path: "/unbindSuc",
              query: { pathAddress: choose }
            });
          } else if (res.data.flag == 3) {
            //解绑失败
            this.alertCount.alertData = res.msg;
            this.alertCount.isShowAlert = true;
          } else if (res.data.flag == 4) {
            //跳转业务清单
            this.$router.push({
              path: "/unbindHistory"
            });
          }
        },
        failCallback: res => {
          if (res.code == 2002) {
            this.$route.push({
              path: "/userInfo",
              query: { pathAddress: "/unbindSelf" }
            });
          } else {
            this.alertCount.alertData = res.msg;
            this.alertCount.isShowAlert = true;
          }
        }
      });
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
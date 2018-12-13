<template>
  <div class="casemx-box">
    <p class="bi-title">该发票已通过国税局验真</p>
    <div class="bi-img">
      <img :src="billImgSrc" width="100%">
    </div>
    <div class="invoice_content">
      <div class="invoice_pdf">
        <span>如需保存发票，可长按图片保存至手机</span>
        <br>
        <span>如需打印发票，可邮件转发PDF原件</span>
      </div>
      <div class="invoice_Two">
        <div id="invoice_Emil" @click="sendInvoice" class="invoice_Emil">
          <span>邮件转发PDF</span>
        </div>
      </div>
    </div>
    <div id="invoice_alter" class="invoice_alter" v-if="isShowAlert">
      <ul>
        <li class="One_row">
          <span>请输入接收发票的邮箱地址</span>
        </li>
        <li class="Two_row">
          <input type="text" id="mailPath" v-model="mailAddress">
        </li>
        <li class="Send_error" style="padding-top: 1%; color: red;" v-if="testMail">{{tipsDataTwo}}</li>
        <li class="Three_row" style=" padding-bottom: 7%;padding-top: 3%;">
          <button id="invoice_Cancel" @click="cancelSend">取消</button>
          <button name="btn_down" @click="sendClick">发送</button>
        </li>
      </ul>
    </div>
    <newAlert @clsoeTips="clsoeTips" v-if="sendSuccess"></newAlert>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import newAlert from "../../components/billComponent/newAlert.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    newAlert
  },
  data() {
    return {
      // billImgSrc: require("@/assets/billImg/1544256576263.png"),
      billImgSrc: '',
      isShowAlert: false,
      mailAddress: "",
      testMail: false,
      sendSuccess: false,
      tipsDataTwo:''
    };
  },
  created() {
      this.billImgSrc=this.$route.query.tipsData
    // this.billImgSrc = this.$route.query.tipsData;
  },
  methods: {
    ...mapActions({
      sendEmail: "sendEmail"
    }),
    sendInvoice() {
      this.isShowAlert = true;
    },
    cancelSend() {
      this.isShowAlert = false;
    },
    sendClick() {
      if (this.mailAddress == "") {
        this.tipsDataTwo = '邮箱地址不能为空！'
        this.testMail = true;
        return false;
      }
      if(!this.$toolsTwo.emailFn(this.mailAddress)){
        this.tipsDataTwo = '邮箱格式输入错误！'
        this.testMail = true;
        return false
      }
        let emailAddress = {
            email:this.mailAddress
        }
      this.sendEmail({
        emailAddress,
        successCallback: res => {
          console.log(res)
          this.sendSuccess = true
          // window.location.href = res
          // this.contentListData = res.result.list;
        },
        fCallback: res => {}
      });
    },
    clsoeTips() {
      this.sendSuccess = false;
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.casemx-box {
  min-height: 100vh;
  background: #ebebeb;
  .bi-title {
    padding-top: 6%;
    color: red;
    text-align: center;
  }
  .bi-img {
    margin-top: 5%;
  }
  .invoice_content {
    width: 90%;
    margin: 5% auto 0;
    text-align: center;
    height: 20%;
  }
  .invoice_pdf span {
    font-weight: bold;
  }
  .invoice_Two {
    margin-top: 5%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 40%;
  }
  .invoice_Emil,
  .invoice_Dwonlond {
    width: 48%;
    height: 1rem;
    background: url(../../assets/billImg/btn_One.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    span {
      position: absolute;
      width: 75%;
      right: 0%;
      top: 25%;
      color: #fff;
      font-size: 0.28rem;
    }
  }
}
.invoice_alter {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
}
.invoice_alter > ul {
  width: 90%;
  background: #ffffff;
  margin: 30% auto 0;
}
.invoice_alter > ul li {
  width: 90%;
  padding-top: 7%;
  margin: 0 auto;
}
.invoice_alter > ul li.One_row {
  font-size: 0.4rem;
  font-weight: bold;
}
.invoice_alter > ul li.Two_row input {
  width: 95%;
  line-height: 30px;
  border-radius: 5px;
  padding: 3px;
  border: 1px solid #e0e0e1;
}
.invoice_alter > ul li.Three_row {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  width: 100%;
}
.invoice_alter > ul li.Three_row button {
  width: 40%;
  border: none;
  line-height: 35px;
}
.invoice_alter > ul li.Three_row button:first-child {
  border: 1px solid #009edf;
  background: #fff;
  color: #009edf;
}
.invoice_alter > ul li.Three_row button:last-child {
  background: #009edf;
  border: 1px solid #009edf;
  color: #fff;
}
</style>
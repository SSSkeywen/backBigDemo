<template>
  <div class="change-bg">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="true">
      <ul class="cp-ul">
        <li>
          <p>手机号码</p>
          <div>
            <input v-model="telNo" @keyup="inputTel" type="tel">
          </div>
        </li>
      </ul>
      <div class="yy_cx">
		<button :disabled = "isClickBtn" :class="isClickBtn?'disabled-style':''" class="style-click" @click="changCountNew">{{btnCount}}</button>
    </div>
      <!-- <btnComponent :isClickBtn="isClickBtn" @changCount="changCountNew" :btnCount="btnCount"></btnComponent> -->
    </div>
    <div v-else>
      <notToOpenComponent :tipsContent="tipsContent"></notToOpenComponent>
      <btnComponent  :btnCount="'知道了'" @IKnow="IKnow"></btnComponent>
    </div>
    <alertContent :alertCount="alertCount"></alertContent>
    <yesAndNoAlert :tipsData="'手机号码'" :alertCountTwo="alertCountTwo" :telNo="telNo" @changCount="changCount"></yesAndNoAlert>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import btnComponent from "../../components/btnComponent.vue";
import alertContent from "../../components/alertContent";
import yesAndNoAlert from "../../components/yesAndNoAlert";
import notToOpenComponent from "../../components/notToOpenComponent.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      headerContent: "联系手机变更",
      btnCount: "确认变更",
      telNo: "",
      oldPhoneNo:'',
      isClickBtn:false,
      tipsContent:
        "为保障服务安全，系统已优化升级，请至公司柜面或微信首页开设保险服务密码",
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },
      alertCountTwo:{
        isShowyesOrNo:false,
      }
    };
  },
  components: {
    headerT,
    btnComponent,
    notToOpenComponent,
    alertContent,
    yesAndNoAlert
  },
  created(){
    this.getClientInfometion({
        successCallback: result => {
          console.log(result)
          this.oldPhoneNo = result.celler
        },
        fCallback: res => {
        }
      });
  },
  methods: {
    ...mapActions({
      changePhone: "changePhone",
      getClientInfometion:"getClientInfometion"
    }),

    inputTel(){
      console.log(this.telNo)
      if(this.oldPhoneNo==this.telNo){
        this.isClickBtn = true
      }else{
        this.isClickBtn = false
      }
    },

    IKnow() {
      this.$router.go(-1);
    },

    changCountNew(){
      if(this.telNo == ''){
        this.alertCount.alertData = "请输入您的手机号码";
        this.alertCount.isShowAlert = true;
        return false
      }
      if(!this.$toolsTwo.phoneFn(this.telNo)){
        this.alertCount.alertData = "手机号码格式不正确";
        this.alertCount.isShowAlert = true;
        return false
      }
      this.alertCountTwo.isShowyesOrNo = true
    },

    changCount() {
      

      const toast1 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      let phoneData = {
        celler: this.telNo
      };
      this.changePhone({
        phoneData,
        successCallback: result => {
          console.log(result)
          if(result.code=='0'){
            let tipsData = result.msg;
              this.$router.push({
                path: "/successPageChange",
                query: { tipsData:tipsData }
              });

          }else{
            // this.alertCount.alertData = result.msg;
            // this.alertCount.isShowAlert = true;
            let tipsData = `<p>${result.msg}</p>`;
              this.$router.push({
                path: "/userFailPage",
                query: { tipsData: tipsData }
              });
          }
          // if()
          toast1.clear();
        },
        fCallback: res => {
          console.log(res)
          toast1.clear();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cp-ul {
  padding-left: 0.2rem;
  background-color: #fff;
  margin-top: 0.4rem;
  li {
    display: flex;
    line-height: 0.9rem;
    font-size: 0.32rem;
    p {
      flex: 0.3;
    }
    div {
      flex: 0.7;
      padding: 0.1rem 0;
      box-sizing: border-box;
      height: 0.9rem;
      input {
        width: 100%;
        line-height: 0.7rem;
        display: block;
      }
    }
  }
}

.yy_cx {
    margin: 1.17647059em 15px 0.3em;
}
.yy_cx button {
    width: 100%;
    height: 46px;
    background-color: #00ae4d;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    border: none;
}
.yy_cx button.disabled-style{
  background-color: #828684;
}
</style>
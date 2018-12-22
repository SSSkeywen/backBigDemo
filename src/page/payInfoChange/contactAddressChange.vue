<template>
  <div class="change-bg">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="true">
    <ul class="cp-ul">
      <li>
        <p>详细地址</p>
        <div>
          <input v-model="address1" type="text">
        </div>
      </li>
      <li class="line-new">
        <p>邮政编码</p>
        <div>
          <input v-model="zip1" type="text">
        </div>
      </li>
    </ul>
    <btnComponent @changCount="changCount" :btnCount="btnCount"></btnComponent>
    </div>
    <div v-else>
      <notToOpenComponent :tipsContent="tipsContent"></notToOpenComponent>
      <btnComponent :btnCount="'知道了'" @IKnow="IKnow"></btnComponent>
    </div>
    <alertContent :alertCount="alertCount"></alertContent>
    <yesAndNoAlert :alertCountTwo="alertCountTwo" :telNo="email" @changCount="changCount"></yesAndNoAlert>
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
      headerContent: "家庭信息变更",
      btnCount: "确认变更",
      email: "",
      tipsContent:
        "为保障服务安全，系统已优化升级，请至公司柜面或微信首页开设保险服务密码",
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },
      alertCountTwo:{
        isShowyesOrNo:false,
      },
      address1:this.$route.query.changeData.addressFee,
      zip1:this.$route.query.changeData.zipLink,
      tel1:'',
    };
  },
  components: {
    headerT,
    btnComponent,
    alertContent,
    yesAndNoAlert,
    notToOpenComponent
  },
  methods: {
    ...mapActions({
      changeInformation: "changeInformation",
      changeAddress: "changeAddress",
    }),

    IKnow() {
      this.$router.go(-1);
    },

    // changCountNew() {
    // //   if (this.address1 == "") {
    // //     this.alertCount.alertData = "请输入您的家庭地址";
    // //     this.alertCount.isShowAlert = true;
    // //     return false;
    // //   }
    // //   if (this.zip1 == "") {
    // //     this.alertCount.alertData = "请输入您的邮政编码";
    // //     this.alertCount.isShowAlert = true;
    // //     return false;
    // //   }
    // //   if(!this.$toolsTwo.zipFn(this.zip1)){
    // //     this.alertCount.alertData = "邮政编码格式不正确";
    // //     this.alertCount.isShowAlert = true;
    // //     return false
    // //   }
    // //   if (this.tel1 == "") {
    // //     this.alertCount.alertData = "请输入您的家庭电话";
    // //     this.alertCount.isShowAlert = true;
    // //     return false;
    // //   }
    // //   if(!this.$toolsTwo.zipFn(this.tel1)){
    // //     this.alertCount.alertData = "家庭电话格式不正确";
    // //     this.alertCount.isShowAlert = true;
    // //     return false
    // //   }
      
      
    // //   if (!this.$toolsTwo.emailFn(this.email)) {
    // //     this.alertCount.alertData = "电子邮箱格式不正确";
    // //     this.alertCount.isShowAlert = true;
    // //     return false;
    // //   }
    //   this.alertCountTwo.isShowyesOrNo = true;
    // },

    changCount() {
      const toast1 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 60000
      });
      let phoneData = {
          policyCode:this.$route.query.changeData.policyCode,
          addressFee: this.address1,
          zipLink: this.zip1,
      };
      this.changeAddress({
        phoneData,
        successCallback: result => {
          console.log(result);
          toast1.clear();
          if (result.data == "0") {
              let tipsData = result.msg;
              this.$router.push({
                path: "/successPage",
                query: { tipsData:tipsData }
              });
          } else {
            // this.alertCount.alertData = result.msg;
            // this.alertCount.isShowAlert = true;
            let tipsData = `<p style="padding:0 0.2rem;">${result.msg}</p>`;
            this.$router.push({
              path: "/userFailPage",
              query: { tipsData: tipsData ,tipsDataTwo:'1'}
            });
          }
          // if()
          
        },
        fCallback: res => {
          console.log(res);
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
</style>
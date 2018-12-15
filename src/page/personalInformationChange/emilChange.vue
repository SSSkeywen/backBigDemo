<template>
  <div class="change-bg">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="true">
      <ul class="cp-ul">
        <li>
          <p>电子邮箱</p>
          <div>
            <input v-model="email" type="text">
          </div>
        </li>
      </ul>
      <btnComponent @changCount="changCountNew" :btnCount="btnCount"></btnComponent>
    </div>
    <div v-else>
      <notToOpenComponent :tipsContent="tipsContent"></notToOpenComponent>
      <btnComponent :btnCount="'知道了'" @IKnow="IKnow"></btnComponent>
    </div>
    <alertContent :alertCount="alertCount"></alertContent>
    <yesAndNoAlert :tipsData="'电子邮箱'" :alertCountTwo="alertCountTwo" :telNo="email" @changCount="changCount"></yesAndNoAlert>
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
      email: "",
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
  methods: {
    ...mapActions({
      changeInformation: "changeInformation"
    }),

    IKnow() {
      this.$router.go(-1);
    },

    changCountNew(){
      if(this.email == ''){
        this.alertCount.alertData = "请输入您的电子邮箱";
        this.alertCount.isShowAlert = true;
        return false
      }
      if(!this.$toolsTwo.emailFn(this.email)){
        this.alertCount.alertData = "电子邮箱格式不正确";
        this.alertCount.isShowAlert = true;
        return false
      }
      this.alertCountTwo.isShowyesOrNo = true
    },

    changCount() {
      

      const toast1 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 1000
      });
      let phoneData = {
          address:'3',
          data:{
              email: this.email
          }
      };
      this.changeInformation({
        phoneData,
        successCallback: result => {
          console.log(result)
          if(result.code=='0'){
              let tipsData = result.msg;
              this.$router.push({
                path: "/successPage",
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
</style>
<template>
  <div class="casemx-box">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="isShowSqData">
      <div v-for="(item,index) in contentListData" :key="index">
        <information :contentData="item" @viewElectronicInvoices="viewElectronicInvoices"></information>
      </div>
    </div>

    <p v-else>未查询到信息！</p>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import alertContent from "../../components/alertContent";
import information from "../../components/billChangeComponent/information.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    information,
    alertContent
  },
  data() {
    return {
      headerContent: "转账成功通知书发送方式变更",
      contentListData: [],
      isShowSqData: false,
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      }
    };
  },
  created() {
    const toast1 = Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 2000
    });
    let postId = "3";
    this.billChangeFn({
      postId,
      successCallback: result => {
        console.log(result);
        this.contentListData = result.list;
        if (this.contentListData.length != 0) {
          this.isShowSqData = true;
        }
        toast1.clear();
      },
      fCallback: res => {
        toast1.clear();
      }
    });
  },
  methods: {
    ...mapActions({
      billChangeFn: "billChangeFn",
      billChangeInformation: "billChangeInformation"
    }),
    viewElectronicInvoices(num, policyCode,noticeType) {
      console.log(policyCode + "+" + num);
      
      let tellTheWay;
      if(num == 1){
        tellTheWay='短信告知'
      }else if(num == 2){
        tellTheWay='电子邮箱'
      }else if(num == 3){
        tellTheWay='自助查询'
      }
      let typeData = {
        policyCode: policyCode,
        noticeWay: tellTheWay,
        noticeType: noticeType
      };
      console.log(typeData)
        this.billChangeInformation({
          typeData,
          successCallback: result => {
            // if (result.RETURN_FLAG == "0") {
            //   this.alertCount.alertData = result.RETURN_MESSAGE;
            //   this.alertCount.isShowAlert = true;
            // } else if (result.RETURN_FLAG == "1") {
            //   let tipsData = JSON.stringify(result.INVOICE_DETAILS);
            //   console.log(tipsData);
            //   this.$router.push({
            //     path: "/sqzdList",
            //     query: { tipsData: tipsData }
            //   });
            // } else if (result.RETURN_FLAG == "2") {
            //   let tipsData = {
            //     pathAddress: "/sqzdList",
            //     titleName: "首期账单查询"
            //   };
            //   console.log(tipsData);
            //   this.$router.push({
            //     path: "/successMessage",
            //     query: { tipsData: tipsData }
            //   });
            // }
          },
          fCallback: res => {}
        });
      }
  }
};
</script>

<style lang="scss" scoped>
.casemx-box {
  min-height: 100vh;
  background: #dcdcdc;
  padding-bottom: 0.1rem;
  box-sizing: border-box;
}
</style>
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
import information from "../../components/billComponent/information.vue";
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
      headerContent: "首期账单查询",
      contentListData: [],
      isShowSqData: false,
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },
    };
  },
  created() {
    console.log();
    let typeData = "sqbdlist";
    this.getBillList({
      typeData,
      successCallback: result => {
        console.log(result);
        this.contentListData = result;
        if(this.contentListData.length != 0){
          this.isShowSqData = true
        }
      },
      fCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      getBillList: "getBillList",
      applyInvoice: "applyInvoice"
    }),
    viewElectronicInvoices(policyCode, butonFlag) {
      console.log(policyCode + "+" + butonFlag);
      let typeData={
        prem:butonFlag,
        flg:'1'
      }
      // if (butonFlag == "申请电子发票") {
        this.applyInvoice({
          typeData,
          successCallback: result => {
            console.log(result);
            // this.$router.push({ path: "/toNewIndexView" });
            if(result.RETURN_FLAG=='0'){
              this.alertCount.alertData = result.RETURN_MESSAGE;
              this.alertCount.isShowAlert = true;
            }else if(result.RETURN_FLAG=='1'){
              // let billmessage = {

              // }
              let tipsData = JSON.stringify(result.INVOICE_DETAILS)
              console.log(tipsData)
              this.$router.push({
                path: "/sqzdList",
                query: { tipsData: tipsData }
              });
            }else if(result.RETURN_FLAG=='2'){
              // let billmessage = {

              // }
              let tipsData = JSON.stringify(result.INVOICE_DETAILS)
              console.log(tipsData)
              this.$router.push({
                path: "/successMessage",
                query: { tipsData: tipsData }
              });
            }
          },
          fCallback: res => {}
        });
      // } else {
      //   this.applyInvoice({
      //     typeData,
      //     successCallback: result => {
      //       console.log(result);
      //       // this.$router.push({ path: "/toNewIndexView" });
      //       if(result.RETURN_FLAG=='1'){
      //         let tipsData = result.RETURN_MESSAGE;
      //         this.$router.push({
      //           path: "/userFailPage",
      //           query: { tipsData: tipsData }
      //         });
      //       }
      //     },
      //     fCallback: res => {}
      //   });
      //   // this.$router.push({ path: "/sqzdList" });
      // }
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
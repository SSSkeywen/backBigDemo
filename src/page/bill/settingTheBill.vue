<template>
  <div class="casemx-box">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="isShowSaveData">
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
import information from "../../components/billComponent/informationTwo.vue";
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
      headerContent: "理赔账单查询",
      contentListData: [],
      isShowSaveData: false,
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
    let typeData = "lpbdlist";
    this.getBillList({
      typeData,
      successCallback: result => {
        // console.log(res.result);
        this.contentListData = result;
        if (this.contentListData.length != 0) {
          this.isShowSaveData = true;
        }

        toast1.clear();
      },
      fCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      getBillList: "getBillList",
      applyInvoice: "applyInvoice"
    }),
    // viewElectronicInvoices(policyCode, butonFlag) {
    //   console.log(policyCode + "-" + butonFlag);
    //   this.$router.push({ path: "/settingTheBillList" });
    // }
    viewElectronicInvoices(policyCode, feeId, butonFlag) {
      console.log(policyCode + "+" + butonFlag);
      let typeData = {
        prem: feeId,
        flg: "3"
      };
      if (butonFlag == "申请电子发票") {
        let tipsData = {
          pathAddress: "/settingTheBillList",
          titleName: "理赔账单查询",
          prem: feeId,
          flg: "3"
        };
        console.log(tipsData);
        this.$router.push({
          path: "/successMessage",
          query: { tipsData: tipsData }
        });
      } else {
      this.applyInvoice({
        typeData,
        successCallback: result => {
          console.log(result);
          // this.$router.push({ path: "/toNewIndexView" });
          if (result.RETURN_FLAG == "0") {
            this.alertCount.alertData = result.RETURN_MESSAGE;
            this.alertCount.isShowAlert = true;
          } else if (result.RETURN_FLAG == "1") {
            // let billmessage = {

            // }
            let tipsData = JSON.stringify(result.INVOICE_DETAILS);
            console.log(tipsData);
            this.$router.push({
              path: "/settingTheBillList",
              query: { tipsData: tipsData }
            });
          } else if (result.RETURN_FLAG == "2") {
            let tipsData = {
              pathAddress: "/settingTheBillList",
              titleName: "理赔账单查询"
            };
            console.log(tipsData);
            this.$router.push({
              path: "/successMessage",
              query: { tipsData: tipsData }
            });
          }
        },
        fCallback: res => {}
      });
    }
    }
  }
};
</script>

<style lang="scss" scoped>
.casemx-box {
  min-height: 100vh;
  background: #dcdcdc;
}
</style>
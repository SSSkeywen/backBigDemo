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
    <yesAndNoAlert
      :tipsData="tipsData"
      @changCount="viewElectronicInvoicesTwo"
      :alertCountTwo="alertCountTwo"
    ></yesAndNoAlert>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import alertContent from "../../components/alertContent";
import yesAndNoAlert from "../../components/yesAndNoAlertTwo";
import information from "../../components/billChangeComponent/information.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    information,
    alertContent,
    yesAndNoAlert
  },
  data() {
    return {
      headerContent: "失效通知书发送方式变更",
      contentListData: [],
      isShowSqData: false,
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },
      alertCountTwo: {
        isShowyesOrNo: false
      },
      tipsData: "",
      typeData: ""
    };
  },
  created() {
    const toast1 = Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 2000
    });
    let postId = "4";
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
    viewElectronicInvoices(tellTheWay, policyCode, noticeType) {
      // let tellTheWay;
      // if (num == 1) {
      //   tellTheWay = "短信告知";
      // } else if (num == 2) {
      //   tellTheWay = "电子邮箱";
      // } else if (num == 3) {
      //   tellTheWay = "自助查询";
      // }
      this.alertCountTwo.isShowyesOrNo = true;
      this.tipsData = tellTheWay;
      this.typeData = {
        policyCode: policyCode,
        noticeWay: tellTheWay,
        noticeType: noticeType
      };
    },

    viewElectronicInvoicesTwo() {
      let typeData = this.typeData;
      let policyCode = this.typeData.policyCode;
      this.billChangeInformation({
        typeData,
        successCallback: result => {
          this.$router.push({
            path: "/infoChangeResult",
            query: { tipsData: JSON.stringify(result), policyCode: policyCode }
          });
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
    
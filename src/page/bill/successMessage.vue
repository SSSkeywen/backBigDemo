<template>
  <div class="casemx-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="sm-box">
      <div class="sm-hgroup">
        <!-- <div class="sm-img">
          <img :src="toDownIcon" width="100%">
        </div>-->
        <div style="    width: 20%;
    margin: 0rem auto;
    padding: 0.5rem 0 0.3rem;">
          <img :src="toDownIcon" width="100%">
        </div>
        <br>
        <br>
        <p>发票申请已提交成功</p>
      </div>

      <p class="sm-p">电子发票将会尽快完成开具，如有延迟请耐心等待</p>
      <p class="sm-p">开具成功后您将收到消息通知。</p>
      <p class="sm-p">您可以随时在“中国太平95589”微信服务号中点击“信息查询-首期账单查询”查看您的发票</p>
    </div>
    <section class="cm-btn" v-if="isLookStatus">
      <button class="style-click" @click="jump">查看发票状态</button>
    </section>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import alertContent from "../../components/alertContent";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    alertContent
  },
  data() {
    return {
      headerContent: "",
      toDownIcon: require("@/assets/publicImg/icon_2.jpg"),
      sqzdList: "",
      tipsDataTwo:"",
      isLookStatus:false,
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      }
    };
  },
  created() {
    this.sqzdList = this.$route.query.tipsData;
    this.headerContent = this.sqzdList.titleName;
    let typeData = {
        prem: this.sqzdList.feeId,
        flg: this.sqzdList.flg
      };
    this.applyInvoice({
          typeData,
          successCallback: result => {
            if (result.RETURN_FLAG == "0") {
              this.alertCount.alertData = '电子发票未开具完成，请耐心等待！';
              this.alertCount.isShowAlert = true;
            } else if (result.RETURN_FLAG == "1") {
              this.tipsDataTwo = JSON.stringify(result.INVOICE_DETAILS);
              this.isLookStatus = true
            } else if (result.RETURN_FLAG == "2") {
              this.alertCount.alertData = result.RETURN_MESSAGE;
              this.alertCount.isShowAlert = true;
            }
          },
          fCallback: res => {}
        });
  },
  methods: {
    ...mapActions({
      applyInvoice: "applyInvoice"
    }),
    jump() {
      this.$router.push({
        path: this.sqzdList.pathAddress,query: { tipsData: this.tipsDataTwo }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.casemx-box {
  min-height: 100vh;
  background: #dcdcdc;
}
.sm-box {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 2%;
  margin-top: 10px;
  /* background: url(img/billBg.png) no-repeat; */
  background: #fff;
  background-size: 100% 100%;
  border-radius: 0;
  .sm-hgroup {
    width: 80%;
    margin: 0px auto;
    line-height: 24px;
    font-size: 18px;
    text-align: center;
    padding-top: 10px;
    .sm-img {
      width: 20%;
      margin: 0 auto;
    }
  }
  .sm-p {
    display: block;
    width: 90%;
    margin: 5% auto;
    color: #666;
  }
}
.cm-btn {
  width: auto;
  margin: 1.17647059em 15px 0.3em;
  button {
    width: 100%;
    height: 46px;
    background-color: #00ae4d;
    border-radius: 5px;
    color: #fff;
    font-size: 0.36rem;
    border: none;
  }
}
</style>
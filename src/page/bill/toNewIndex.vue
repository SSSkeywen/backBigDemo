<template>
  <div class="casemx-box">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="isShowSqData">
      <ul class="casemx-ul">
        <li
          v-for="(item,index) in contentListData"
          :key="index"
          @click="viewElectronicInvoices(item.POLICY_CODE)"
        >
          <toNewComponent :contentListData="item"></toNewComponent>
        </li>
      </ul>
      <p style="font-size:0.28rem;color:red;padding:0rem 0.2rem 0.2rem;">注：以上保单为客户作为投保人且有续期交费记录的保单。</p>
    </div>

    <div v-else>
      <p>未查询到信息！</p>
      <section v-if="isPay=='Y'" class="cm-btn">
        <button class="style-click" @click="goPayPage">有需交费保单，立刻交费</button>
      </section>
    </div>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import alertContent from "../../components/alertContent";
import toNewComponent from "../../components/billComponent/toNewComponent.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    toNewComponent,
    alertContent
  },
  data() {
    return {
      headerContent: "续期账单查询",
      contentListData: [],
      isShowSqData: false,
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },
      isPay:'N'
    };
  },
  created() {
    const toast1 = Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 2000
    });
    let typeData = "xqlist";
    this.getBillList({
      typeData,
      successCallback: res => {
        console.log(res);
        // this.contentListData = res.result.list
        this.isPay = res.isPay
        this.contentListData = res.list;
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
      getBillList: "getBillList",
      applyInvoice: "applyInvoice"
    }),
    viewElectronicInvoices(policyCode) {
      console.log(policyCode);
      this.$router.push({
        path: "/toNewIndexMessage",
        query: { policyCode: policyCode }
      });
    },
    goPayPage(){
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.casemx-box {
  min-height: 100vh;
  background: #dcdcdc;
  .casemx-ul {
    li {
      width: 98%;
      margin: 10px auto 12px;
      border-radius: 10px;
      background-color: #fff;
      overflow: hidden;
    }
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
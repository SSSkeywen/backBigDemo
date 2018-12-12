<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <ul  v-if="isShowSqData" class="casemx-ul">
            <li v-for="(item,index) in contentListData" :key="index" @click="viewElectronicInvoices(item.POLICY_CODE)">
                <toNewComponent :contentListData="item" ></toNewComponent>
            </li>
        </ul>
        <p v-else>未查询到信息！</p>
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
      contentListData: [
      ],
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
    let typeData = "xqlist";
    this.getBillList({
      typeData,
      successCallback: res => {
        console.log(res);
        // this.contentListData = res.result.list

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
      console.log(policyCode)
      this.$router.push({
              path: "/toNewIndexMessage",
              query: { policyCode: policyCode }
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
</style>
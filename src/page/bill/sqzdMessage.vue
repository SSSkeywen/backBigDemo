<template>
  <div class="casemx-box">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="contentListData.length!=0" v-for="(item,index) in contentListData" :key="index">
      <information :contentData="item" @viewElectronicInvoices="viewElectronicInvoices"></information>
    </div>
    <p v-else>未查询到信息！</p>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import information from "../../components/billComponent/information.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    information
  },
  data() {
    return {
      headerContent: "首期账单查询",
      contentListData: []
    };
  },
  created() {
    console.log(111);
    let typeData = "sqbdlist";
    this.getBillList({
      typeData,
      successCallback: result => {
        console.log(result);
        this.contentListData = result;
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
      if (butonFlag == "申请电子发票") {
        this.applyInvoice({
          typeData,
          successCallback: result => {
            console.log(result);
            this.$router.push({ path: "/toNewIndexView" });
          },
          fCallback: res => {}
        });
      } else {
        this.$router.push({ path: "/sqzdList" });
      }
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
<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <div v-for="(item,index) in contentListData" :key="index">
          <information :contentData="item"  @viewElectronicInvoices="viewElectronicInvoices"></information>
        </div>
        
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
      headerContent: "理赔账单查询",
      contentListData:[]
    };
  },
  created() {
    let typeData = 'lplist';
    this.getBillList({
      typeData,
      successCallback: result => {
        // console.log(res.result);
        this.contentListData = result;
      },
      fCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      getBillList: "getBillList"
    }),
    viewElectronicInvoices(policyCode,butonFlag) {
      console.log(policyCode+'-'+butonFlag);
      this.$router.push({ path: "/settingTheBillList" });
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
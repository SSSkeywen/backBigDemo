<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <information @viewElectronicInvoices="viewElectronicInvoices"></information>
        
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
      headerContent: "理赔账单查询"
    };
  },
  created() {
    let typeData = 3;
    this.getBillList({
      typeData,
      successCallback: res => {
        console.log(res.result);
        // this.contentListData = res.result.list;
      },
      fCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      getBillList: "getBillList"
    }),
    viewElectronicInvoices(index) {
      console.log(index);
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
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
      headerContent: "首期账单查询",
      contentListData:[]
    };
  },
  created() {
    console.log(111);
    let typeData = 'sqbdlist';
    this.getBillList({
      typeData,
      successCallback: result => {
        this.contentListData = result;
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
      this.$router.push({ path: "/sqzdList" });
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
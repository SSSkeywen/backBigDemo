<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <div>
            <div>
                <img :src="toDownIcon" alt="">
            </div>
            <p>发票申请已提交成功</p>
            <p>电子发票将会尽快完成开具，如有延迟请耐心等待</p>
            <p></p>
        </div>
        <div>
            <button>查看发票状态</button>
        </div>
    </div>
</template>

<script>
import headerT from "../../components/header.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
  },
  data() {
    return {
      headerContent: "续期账单查询",
      toDownIcon: require("@/assets/billImg/xq_icon_xia.png")
    };
  }
};
</script>

<style scoped>
.casemx-box {
  min-height: 100vh;
  background: #dcdcdc;
}
</style>
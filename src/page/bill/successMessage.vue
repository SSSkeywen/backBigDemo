<template>
  <div class="casemx-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="sm-box">
      <div class="sm-hgroup">
        <div class="sm-img">
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
    headerT
  },
  data() {
    return {
      headerContent: "续期账单查询",
      toDownIcon: require("@/assets/billImg/xq_icon_xia.png")
    };
  },
  created() {}
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
</style>
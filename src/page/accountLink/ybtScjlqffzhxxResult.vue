<template>
  <div>
    <nav class="nav_top" style="padding-top:10%;width:100%; text-align:center;">
      <img :src=" tupian" style=" margin: 0 auto; width=75px;
      height=75px; ">
    </nav>

    <nav class="nav_content2" v-for="(item,index) in baodanLIst" :key="index">
      <p>保单号：{{item.POLICY_CODE}}</p>
      <span v-text="item.RETURN_MESSAGE"></span>
      温馨提示：
      <br>付费类保全项目变更成功后，款项一般在3 个工作日到账；如您在3 个工作日未收到款项，可致电95589查询！
    </nav>
    <nav class="nav_btn">
      <button @click="guanbi()">关闭</button>
    </nav>
  </div>
</template>

<script>
import headerT from "@/components/header.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      baodanLIst: [],
      // return data{
      tupian: require("@/assets/images/icon_03.png")
    };
  },
  created() {
    var policyList = this.$route.query.policyList;
    this.resultzp({
      successCallback: res => {
        this.baodanLIst = res.data;
      },
      fCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      resultzp: "resultzp"
    }),
    guanbi() {
      this.$router.push({
        path: "/businessHanding"
      });
    }
  }
};
</script>

<style scoped>
/*批文*/
.nav_btn {
  width: 100%;
  height: 36px;
  line-height: 36px;
}
.nav_btn button {
  width: 90%;
  height: 36px;
  border: 0px;
  margin: 0 5%;
  background: #04be01;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
}
.nav_content2 p {
  width: 100%;
  line-height: 50px;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  color: #000;
}
.nav_content2 span {
  width: 88%;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  margin: 0 6%;
  min-height: 50px;
  color: #666;
}
.nav_content2 {
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding: 10px 0px;
}
</style>

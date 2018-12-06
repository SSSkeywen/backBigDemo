<template>
  <div>
    <div class="tips-img">
      <img :src="tipsIconSrc" alt>
    </div>
    <div class="tips-font" v-html="tipsContent">
    </div>
    <nav class="nav_btn">
      <button @click="IKnowClose" name="image">知道了</button>
    </nav>
  </div>
</template>

<script>
export default {
  // props:['tipsContent'],
  data() {
    return {
      tipsIconSrc: require("@/assets/mgImg/confim.png"),
      tipsContent: ""
    };
  },
  mounted() {
    this.tipsContent = this.$route.query.tipsData;
  },
  methods: {
    IKnowClose() {
      WeixinJSBridge.call("closeWindow");
    }
  }
};
</script>

<style lang="scss" scoped>
.tips-img {
  width: 1.5rem;
  margin: 0rem auto 0.1rem;
  padding-top: 1rem;
  img {
    width: 100%;
  }
}
.tips-font {
  width: 100%;
  text-align: center;
  font-size: 0.32rem;
  padding: 10px 0px;
}
.tips-font p {
  width: 100%;
  line-height: 50px;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  color: #000;
}
.tips-font span {
  width: 88%;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  margin: 0 6%;
  min-height: 50px;
  color: #666;
}
.nav_btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.nav_btn button {
  width: 90%;
  height: 40px;
  border: 0px;
  margin: 0 5%;
  background: #04be01;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
}
</style>
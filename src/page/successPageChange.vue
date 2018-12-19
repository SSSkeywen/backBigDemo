<template>
  <div>
    <div class="tips-img">
      <img :src="tipsIconSrc" alt>
    </div>
    <div class="tips-font" v-html="tipsData"></div>
    <nav class="nav_btn">
      <button @click="IKnowCloseOne" name="image">问卷调查</button>
    </nav>
    <nav class="nav_btn" style="margin-top:0.2rem;">
      <button @click="IKnowClose" name="image" style="background-color:#8b8e8b;">关闭</button>
    </nav>
  </div>
</template>

<script>
import {config} from '@/config/config.js'
export default {
  // props:['tipsContent'],
  data() {
    return {
      tipsIconSrc: require("@/assets/publicImg/icon_2.jpg"),
      tipsContent: "" ,
      tipsData:this.$route.query.tipsData
    };
  },
  mounted() {
    // this.tipsContent = this.$route.query.pathAddress;
  },
  methods: {
    IKnowCloseOne(){
      // this.$router.push({ path: '/businessHanding' });
      console.log(config.api_address_url)
      window.location.href=config.api_address_url+'wxqhb/jsp/index.html'
    },
    IKnowClose() {
      // WeixinJSBridge.call("closeWindow");
      console.log()
      this.$router.push({ path: this.$route.query.pathAddress||'/businessHanding' });
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
    text-align: justify;
    font-size: .32rem;
    padding: 10px 15px;
    box-sizing: border-box;
    text-indent: 2em;
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
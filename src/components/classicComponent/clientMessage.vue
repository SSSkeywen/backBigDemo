<template>
  <div>
    <header class="cm-header">
      <img :src="bannerImgSrc" width="100%">
      <div class="scan-style" @click="scanFnOne">
        <img :src="scanImgSrc" width="100%">
      </div>
      <div @click="enterVipPage" class="cm-jump-page">
        <div class="cm-jump-content">
          <p>VIP服务</p>
          <div class="cm-jump-ing">
            <img :src="jumpIconImgSrc" width="100%">
          </div>
        </div>
      </div>
      <div class="cm-client-photo">
        <img :src="clientMsg.authorizationMap.headimgurl" >
      </div>
      <div class="cm-client-name">
        <div v-if="clientMsg.isBinding!='0'">
          <p class="cm-client-font">{{clientMsg.customer.name}}</p>
          <div class="cm-client-img" @click="jumpPage">
            <img :src="vipBgImgSrc" width="100%">
            <p>{{vipFont}}</p>
          </div>
        </div>
        <div v-else>
          <p class="cm-client-font-two" @click="startTest">点击认证</p>
        </div>
      </div>
      <div class="cm-water">
        <img :src="waterImgSrc" width="100%">
      </div>
    </header>
    <!-- <div><van-button type="warning">警告按钮</van-button></div> -->
  </div>
</template>

<script>
import {config} from '@/config/config.js'
export default {
  data() {
    return {
      bannerImgSrc: require("@/assets/classicImg/banner@gif.gif"),
      scanImgSrc: require("@/assets/classicImg/scan@img.png"),
      // jumpBgImgSrc: require('@/assets/classicImg/jump@bg.png'),
      jumpIconImgSrc: require("@/assets/classicImg/jump@icon.png"),
      waterImgSrc: require("@/assets/classicImg/water@red.png"),
      vipBgImgSrc: require("@/assets/classicImg/vipbg@mass.png"),
      vipFont:'大众级',

      // vipBgImgSrc: require("@/assets/classicImg/vipbg@gold.png"),
      // vipBgImgSrc: require("@/assets/classicImg/vipbg@platinum.png"),
      // vipBgImgSrc: require("@/assets/classicImg/vipbg@diamond.png"),
      // vipBgImgSrc: require("@/assets/classicImg/vipbg@.png"),
    };
  },
  props: ["clientMsg"],
  created() {
    // console.log(this.clientMsg)
  },
  mounted(){
    let custPoints = this.clientMsg.customer.custPoints
    if(custPoints>=0&&custPoints<50000){
				// linewid=0+20*(custPoints/50000);
				// gap=50000-custPoints;
			}else if(custPoints>=50000&&custPoints<100000){
        this.vipFont = '黄金级'
        this.vipBgImgSrc = require("@/assets/classicImg/vipbg@gold.png")
			}else if(custPoints>=100000&&custPoints<400000){
				this.vipFont = '铂金级'
        this.vipBgImgSrc = require("@/assets/classicImg/vipbg@platinum.png")
			}else if(custPoints>=400000&&custPoints<100000000){
				this.vipFont = '钻石级'
        this.vipBgImgSrc = require("@/assets/classicImg/vipbg@diamond.png")
			}else if(custPoints>=100000000){
				this.vipFont = '黑钻级'
        this.vipBgImgSrc = require("@/assets/classicImg/vipbg@blackDiamonds.png")
      }
      
      // 
  },
  computed: {
    // headimgurl() {
    //   return this.clientMsg.authorizationMap.headimgurl;
    // }
  },
  methods: {
      startTest() {
          this.$router.push({ path: "/userInfo" });
      },
      enterVipPage(){
        window.location.href = config.api_address_url+'wxqhb/pagemenu.html?pagemenuType=2'
      },

      scanFnOne(){
        this.$emit('scanFn')
      },

      jumpPage(){
        window.location.href = config.api_address_url+'wxqhb/95589/vip_shouye/grade/public.html'
      }
  },
};
</script>

<style lang="scss" scoped>
.cm-header {
  width: 100%;
  height: 3.64rem;
  overflow: hidden;
  position: relative;
  .scan-style {
    position: absolute;
    width: 0.67rem;
    top: 0.33rem;
    left: 0.47rem;
  }
  .cm-jump-page {
    position: absolute;
    top: 0.32rem;
    right: 0;
    width: 1.46rem;
    height: 0.48rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.48rem 0 0 0.48rem;
    padding: 0.11rem 0.12rem 0.11rem 0.14rem;
    .cm-jump-content {
      display: flex;
      p {
        font-size: 0.26rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(192, 165, 79, 1);
        line-height: 0.26rem;
      }
      .cm-jump-ing {
        width: 0.22rem;
        position: relative;
        top: 0.03rem;
        left: 0.05rem;
      }
    }
  }
  .cm-client-photo {
    position: absolute;
    top: 0.76rem;
    left: 3.08rem;
    width: 1.34rem;
    height: 1.34rem;
    border-radius: 1.34rem;
    background: rgba(216, 216, 216, 1);
    box-shadow: 0px 9px 17px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .cm-water {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .cm-client-name {
    position: absolute;
    top: 2.34rem;
    left: 0;
    width: 100%;
    justify-content: center;
    display: flex;
    > div {
      position: relative;
    }
    .cm-client-font {
      font-size: 0.36rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 0.56rem;
      text-align: center;
    }
    .cm-client-font-two {
      font-size: 0.32rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.45rem;
      text-align: center;
    }
    .cm-client-img {
      width: 1.2rem;
      position: absolute;
      top: 0.1rem;
      right: -1.38rem;
      p {
        font-size: 0.2rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.2rem;
        text-shadow:0px 0px 0px rgba(189,149,100,1);
        position: absolute;
        top: 0.09rem;
        left: 0.38rem;
      }
    }
  }
}
</style>
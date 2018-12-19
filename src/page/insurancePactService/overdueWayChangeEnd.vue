<template>
  <div>
    <div id="successPage">
      <div class="success-header">
        <img :src="successBgImg" width="100%" alt srcset>
      </div>
      <section class="success-list">
        <ul v-for="(item,index) in successData" :key="index">
          <li class="line-down-two" :class="item.resul.RETURN_FLAG == '1'?'fail-style':''">
            <p class="title-p">{{item.resul.RETURN_FLAG == '1'?'变更失败':'变更成功'}}</p>
          </li>
          <li class="success-li-content">
            <div class="success-li-number" >
              <p>保单号：{{item.policyCode}}</p>
              <div
                class="toup-icon"
                :class="item.isHsow? '':'to-down-icon'"
                v-show="item.resul.RETURN_FLAG != '1'"
                @click="isShowPwFn(index)"
              >
                <img :src="toUpImg" width="100%" alt style="margin-top: 0.34rem;">
              </div>
            </div>

            <p v-if="item.isHsow" class="success-pw-countent" v-text="item.resul.RETURN_MESSAGE"></p>
          </li>
        </ul>
      </section>
      <section class="success-btn" v-show="isShowSure">
        <button class="style-click" @click="clickSure()">关闭</button>
      </section>
      <section class="error-style" v-show="isShowError">
        <div class="error-content">
          <img :src="xitongyichangImg" width="100%">
          <p name="error" class="error-font">系统异常，请刷新重试</p>
          <div class="error-btn">
            <button class="style-click" @click="clickKnow()">知道了</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { List } from "vant";
export default {
  data() {
    return {
      checkedImg: require("@/assets/safeInforChangeImg/checked.png"),
      noHasBdImg: require("@/assets/safeInforChangeImg/noHasBd.png"),
      xitongyichangImg: require("@/assets/safeInforChangeImg/xitongyichang.png"),
      selectIconOneImg: require("@/assets/safeInforChangeImg/selectIconOne.svg"),
      toUpImg: require("@/assets/safeInforChangeImg/toUp.png"),
      successBgImg: require("@/assets/safeInforChangeImg/successBg.png"),
      isShowSure: true,
      isShowError: false,
      successData: [
        
      ]
    };
  },
  created() {
    
    for(let item of this.$route.query.data){
      item.isHsow = false
    }
    this.successData = this.$route.query.data
    console.log(this.successData)

  },
  methods: {
    isShowPwFn(index) {
      this.successData[index].isHsow = !this.successData[index].isHsow;
    },
    clickSure() {
      this.$router.push({
        path: "/businessHanding"
      });
    }
  }
};
</script>

<style scoped>
@import url("./../../../static/css/baoquan.css");
</style>

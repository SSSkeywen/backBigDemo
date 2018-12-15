<template>
  <div>
    <div id="successPage">
      <div class="success-header">
        <img :src="successBgImg" width="100%" alt srcset>
      </div>
      <section class="success-list">
        <ul>
          <li class="line-down-two" :class="tipsDataContent.RETURN_FLAG!='0'?'fail-style':''">
            <p class="title-p">{{tipsDataContent.RETURN_FLAG!='0'?'变更失败':'变更成功'}}</p>
          </li>
          <li class="success-li-content">
            <div class="success-li-number"  @click="isShowPwFn()">
              <p>保单号：{{policyCode}}</p>
              <div
                 v-if="tipsDataContent.RETURN_FLAG=='0'"
                class="toup-icon"
                :class="isShowPwContent? '':'to-down-icon'"
              >
                <img :src="toUpImg" width="100%" alt style="margin-top: 0.34rem;">
              </div>
            </div>

            <p v-if="tipsDataContent.RETURN_FLAG=='0'&&isShowPwContent" class="success-pw-countent" v-text="tipsDataContent.RETURN_MESSAGE"></p>
          </li>
        </ul>
      </section>
      <section class="success-btn" v-show="isShowSure">
        <button class="style-click" @click="clickSure()">确认</button>
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
      policyCode:'',
      isShowPwContent:true,
      tipsDataContent:'',
    };
  },
  created() {
    this.tipsDataContent = JSON.parse(this.$route.query.tipsData);
    this.policyCode = this.$route.query.policyCode;
  },
  methods: {
    ...mapActions({
      toterminatecancelapply: "toterminatecancelapply"
    }),
    isShowPwFn(index) {
      this.isShowPwContent = !this.isShowPwContent
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

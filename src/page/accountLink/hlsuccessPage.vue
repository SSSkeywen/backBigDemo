<template>
  <div>
    <div id="successPage">
      <div class="success-header">
        <img :src="successBgImg" width="100%" alt srcset>
      </div>
      <section class="success-list">
        <ul v-for="(item,index) in successData" :key="index">
          <li class="line-down-two success-style" v-if="item.result.RETURN_FLAG==0">
            <p class="title-p">变更成功</p>
          </li>
          <li class="line-down-two fail-style" else>
            <p class="title-p">变更失败</p>
          </li>

          <li class="success-li-content">
            <div class="success-li-number" @click="isShowPwFn(index)">
              <p>保单号：{{item.policyCo}}</p>
              <div
                class="toup-icon"
                :class="item.isShowPwContent? '':'to-down-icon'"
                v-show="item.result.RETURN_FLAG==0"
              >
                <img :src="toUpImg" width="100%" alt style="margin-top: 0.34rem;">
              </div>
            </div>

            <p
              v-if="item.result.RETURN_FLAG==0"
              class="success-pw-countent"
              v-text="item.result.RETURN_MESSAGE"
            ></p>
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
      resultCod: "",
      successData: [
        {
          bdNo: "保单号",
          bdNoCount: "006762144694003",
          successTips: "变更成功",
          successStyle: "success-style",
          hxCountLeft: "核心批文内容",
          isShowPwContent: true,
          xiaoshi: true,
          hxCountright:
            "此处是核心批文内容此处是核心批文 次数是核心批文内容此处是核心批文内容"
        },
        {
          bdNo: "保单号",
          isShowPwContent: false,
          bdNoCount: "006762144694003",
          successTips: "变更成功",
          successStyle: "fail-style",
          hxCountLeft: "核心批文内容",
          xiaoshi: true,
          hxCountright: ""
        }
      ]
    };
  },
  created() {
    var param = this.$route.query.param;
    // console.log(param);
    // console.log(param.data);
    this.successData = param.data;
    this.resultCod = param.code;
    for (let item of param.data) {
      // console.log(item.result.RETURN_FLAG);
    }
  },
  methods: {
    // ...mapActions({
    //   checkoverdueapproach: "checkoverdueapproach"
    // }),
    isShowPwFn(index) {
      this.successData[index].isShowPwContent = !this.successData[index]
        .isShowPwContent;
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

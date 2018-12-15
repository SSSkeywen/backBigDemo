<template>
  <div style="background: whitesmoke;    min-height: 100vh;">
    <div id="bqContent" style>
      <header class="bq-title">您名下支持预约终止的保单列表</header>
      <div v-if="contentList">
        <section class="bq-box-style hl-box-style">
          <ul>
            <li class="line" v-for="(item, index) in contentList" :key="index">
              <div class="bq-img" @click="selectFn(index)">
                <img :src="checkedImg" v-if="item.selectTrue">
                <img :src="selectIconOneImg" v-else>
              </div>
              <div class="bq-content">
                <p class="bq-content-one line-down">
                  保单号：
                  <span v-text="item.POLICY_CODE"></span>
                </p>
                <p class="bq-content-two">
                  主险名称：
                  <span v-text="item.PRODUCT_NAME"></span>
                </p>
                <p class="bq-content-two">
                  下期缴费日：
                  <span v-text="item.PAY_DUE_DATE"></span>
                </p>
              </div>
            </li>
          </ul>
        </section>
        <section class="bq-submit">
          <div class="bq-submit-content">
            <div class="bq-submit-left" @click="allSelect">
              <div>
                <img :src="checkedImg" v-if="selectAll">
                <img :src="selectIconOneImg" v-else>
              </div>
              <p>全选</p>
            </div>
            <div class="bq-submit-right style-click" @click="submitFn">
              <p>选择变更</p>
            </div>
          </div>
        </section>

        <transition name="fade">
          <div class="tips-style" v-if="isShowTips">
            <p v-text="tipsContent"></p>
          </div>
        </transition>

        <section class="error-style" v-show="isShowError">
          <div class="error-content">
            <img :src="xitongyichangImg" width="100%">
            <p name="error" class="error-font">系统异常，请刷新重试</p>
            <div class="error-btn">
              <button class="style-click" @click="clickKnow()">知道了</button>
            </div>
          </div>
        </section>

        <section class="error-style" v-show="isShowTips1" style="display: none;" name="fade">
          <div class="error-content">
            <img :src="xitongyichangImg" width="100%">
            <p class="error-font" v-text="tipsContent"></p>
            <div class="error-btn">
              <button class="style-click" @click="ShuaXin()">确定</button>
            </div>
          </div>
        </section>

        <div id="noContent" style="display: none;">
          <header class="bq-title">您名下支持预约终止的保单列表</header>
          <section>
            <div class="nh-img">
              <img :src="noHasBdImg" width="100%">
            </div>
            <p class="nh-font">您没有可做预约终止保全的保单</p>
          </section>
        </div>
        <form id="form" method="get" style="display:none">
          <input type="text" name="policyList" value>
          <input type="submit" value="提交">
        </form>
      </div>
      <div v-else>
        <div style="position: absolute;top:1.53rem;left:2.37rem;    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;">
          <div style="width:2.52rem;">
            <img :src="failImg" width="100%" >
          </div>
          <p style="margin-top:0.45rem;">您没有可预约终止的保单</p>
        </div>
      </div>
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
      failImg: require("@/assets/img/failImg.png"),
      xitongyichangImg: require("@/assets/safeInforChangeImg/xitongyichang.png"),
      selectIconOneImg: require("@/assets/safeInforChangeImg/selectIconOne.svg"),
      selectAll: false,
      isShowTips: false,
      isShowTips1: false,
      isShowError: false,
      contentList: null,
      tipsContent: "对不起，请选择保单做预约终止"
    };
  },
  created() {
    this.terminaTecancel({
      successCallback: res => {
        console.log(res.data);

        // this.InformationMap = res.data.InformationMap
        for (let item of res.data.resulList) {
          item.selectTrue = false;
        }
        this.contentList = res.data.resulList;
        // this.policyCode = res.data.POLICY_CODE
        // this.productName = res.data.PRODUCT_NAME
        // this.payDueDate = res.data.PAY_DUE_DATE
      },
      fCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      terminaTecancel: "terminaTecancel"
    }),
    selectFn(index) {
      this.contentList[index].selectTrue = !this.contentList[index].selectTrue;
      for (let item of this.contentList) {
        if (!item.selectTrue) {
          this.selectAll = false;
          break;
        } else {
          this.selectAll = true;
        }
      }
    },
    allSelect() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        for (let item of this.contentList) {
          item.selectTrue = true;
        }
      } else {
        for (let item of this.contentList) {
          item.selectTrue = false;
        }
      }
    },
    showTipsFn() {
      this.isShowTips = true;
      setTimeout(() => {
        this.isShowTips = false;
      }, 3000);
    },
    submitFn() {
      var contentPlocly = [];
      var v = false;
      for (let item of this.contentList) {
        console.log(item.selectTrue);
        if (item.selectTrue == true) {
          contentPlocly.push(item.POLICY_CODE);

          v = true;
          // break;
        }
      }
      if (v == false) {
        this.tipsContent = "对不起，请选择保单做预约终止";
        this.showTipsFn();
        return false;
      }
      console.log(contentPlocly);
      this.$router.push({
        path: "/terminateCancelInfo",
        query: { contentPlocly: contentPlocly }
      });
    },
    clickKnow() {
      this.isShowError = false;
    }
  }
};
</script>

<style scoped>
@import url("./../../../static/css/baoquan.css");
</style>

<template>
  <div style="background: whitesmoke;    min-height: 100vh;">
    <div id="bqContent" style>
      <header class="bq-title">您名下支持预约终止的保单列表</header>
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
                <span v-text="item.policyCode"></span>
              </p>
              <p class="bq-content-two">
                主险名称：
                <span v-text="item.productName"></span>
              </p>
              <p class="bq-content-two">
                下期缴费日：
                <span v-text="item.payDueDate"></span>
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
    </div>
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
      selectAll: false,
      isShowTips: false,
      isShowTips1: false,
      isShowError: false,
      contentList: [
        {
          selectTrue: false,
          policyCode: "006762144694003",
          productName: "太平福禄康瑞终身重大疾病保险",
          payDueDate: "2018-04-29"
        },
        {
          selectTrue: false,
          policyCode: "006762144694003",
          productName: "太平福禄康瑞终身重大疾病保险",
          payDueDate: "2018-04-29"
        }
      ],
      tipsContent: "对不起，请选择保单做预约终止"
    };
  },
  created() {
    this.terminaTecancel({
      //  console.log(tsrno);
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
      var v = false;
      for (let item of this.contentList) {
        console.log(item.selectTrue);
        if (item.selectTrue == true) {
          this.$router.push({ path: "/terminateCancelInfo" });
          v = true;
          break;
        }
      }
      if (v == false) {
        this.tipsContent = "对不起，请选择保单做预约终止";
        this.showTipsFn();
      }
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

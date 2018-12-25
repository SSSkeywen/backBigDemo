<template>
  <div style="background: whitesmoke; min-height: 100vh;">
    <div id="bqContent">
      <header class="bq-title">红利处置方式变更保单列表</header>
      <!-- 没有单号 -->
      <div v-if="isShown">
        <section v-if="isShown1">
          <div class="nh-img">
            <img :src="noHasBdImg" width="100%">
          </div>
          <p class="nh-font">您没有可做红利领取的保单</p>
        </section>
      </div>
      <!-- 有单号 -->
      <div v-else>
        <section class="bq-box-style hl-box-style">
          <ul>
            <li class="line" v-for="(item, index) in contentList" :key="index">
              <div class="bq-img" @click="selectFn(index)">
                <img :src="selectIconOneImg" v-if="item.selectTrue">
                <img :src="checkedImg" v-else>
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
                <p class="bq-content-two">红利选择方式：
                  <!-- <span v-text="item.bdContentTwo"></span> -->
                  <span v-text="item.MODE_NAME"></span>
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section class="bq-submit" v-show="isShowSelect">
          <div class="bq-submit-content">
            <div class="bq-submit-left" @click="allSelect">
              <div>
                <img :src="selectIconOneImg" v-if="selectAll">
                <img :src="checkedImg" v-else>
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
            <p class="error-font" v-text="tipsContent"></p>
            <div class="error-btn">
              <button class="style-click" @click="selectClickHere">知道了</button>
            </div>
          </div>
        </section>
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
      xitongyichangImg: require("@/assets/safeInforChangeImg/xitongyichang.png"),
      selectIconOneImg: require("@/assets/safeInforChangeImg/selectIconOne.svg"),
      selectAll: true,
      isShowTips: false,
      isShowSelect: true,
      isShowError: false,
      isShown: true,
      isShown1: false,
      contentList: [
        {
          selectTrue: true,
          bdNo: "006762144694003",
          bdContent: "太平福禄康瑞终身重大疾病保险",
          bdContentTwo: "现金领取"
        },
        {
          selectTrue: true,
          bdNo: "006762144694003",
          bdContent: "太平福禄康瑞终身重大疾病保险",
          bdContentTwo: "现金领取"
        }
      ],
      tipsContent: "请选择保单，进行后续操作"
    };
  },
  created() {
    this.gethLchangebylist({
      successCallback: res => {
        this.isShown = false;
        console.log(res.data);
        for (let item of res.data) {
          item.selectTrue = true;
        }
        this.contentList = res.data;
        // this.ITEM_ID = this.contentLists[0].ITEM_ID;
      },
      failCallback: res => {
        this.isShown = true;
      }
    });
  },
  methods: {
    ...mapActions({
      gethLchangebylist: "gethLchangebylist"
    }),
    selectFn(index) {
      this.contentList[index].selectTrue = !this.contentList[index].selectTrue;
      //全选后 取消一个 取消全选
      if (
        this.selectAll == false &&
        this.contentList[index].selectTrue == true
      ) {
        this.selectAll = true;
      }
      for (let item of this.contentList) {
        if (item.selectTrue == true) {
          return;
        }
      }
      this.selectAll = false;
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
    selectClickHere() {
      this.isShowError = false;
    },
    submitFn() {
      // 传保单号
      var policyCode = [];
      var num = 0;

      var flag = false;
      for (let item of this.contentList) {
        if (!item.selectTrue) {
          var policy = item.POLICY_CODE;

          if (num == 0) {
            // arrry += policy;
            policyCode.push(policy);
          } else {
            policyCode.push(policy);
            // arrry += "," + policy;
          }
          num++;

          flag = true;
        }
      }
      if (!flag) {
        this.showTipsFn();
        return;
      }
      this.$router.push({
        path: "/hlbgPageTwo",
        query: { policyCode: policyCode }
      });
    }
  }
};
</script>

<style scoped>
@import url("./../../../static/css/baoquan.css");
</style>

<template>
  <div id="bqContent">
    <header class="bq-title">您名下支持申请结束保险费假期的保单列表</header>
    <section class="bq-box-style end-box">
      <ul v-for="(item, index) in contentList" :key="index">
        <li class="line">
          <p>客户类型</p>
          <p v-text="item.bdNo"></p>
        </li>
        <li class="line">
          <p>姓名</p>
          <p v-text="item.bdContent"></p>
        </li>
        <li class="line">
          <p>证件类型</p>
          <p v-text="item.cardStyle"></p>
        </li>
        <li class="line">
          <p>证件号码</p>
          <p v-text="item.cardNo"></p>
        </li>
        <li class="line">
          <p>证件有效期</p>
          <p v-text="item.enterTime"></p>
        </li>
        <li class="line">
          <p>&nbsp;</p>
          <p @click="bgFn(index)">
            <button :class="item.btnStyle" class="style-click">选择变更</button>
          </p>
        </li>
      </ul>
    </section>
    <!-- <section class="bq-submit">
            <div class="bq-submit-content">
                <div class="bq-submit-left" @click="allSelect">
                    <div>
                        <img src="./img/selectIconOne.svg" v-if="selectAll">
                        <img src="./img/checked.png" v-else>
                    </div>
                    <p>全选</p>
                </div>
                <div class="bq-submit-right style-click" @click="submitFn">
                    <p>选择变更</p>
                </div>
            </div>
    </section>-->
    <transition name="fade">
      <div class="tips-style" v-if="isShowTips">
        <p v-text="tipsContent"></p>
      </div>
    </transition>
    <!-- <section class="error-style" v-show="isShowError" style="display: none;">
            <div class="error-content">
                <img src="./img/xitongyichang.png" width="100%">
                <p class="error-font">系统异常，请刷新重试</p>
                <div class="error-btn">
                    <button class="style-click">刷新</button>
                </div>
            </div>
    </section>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectAll: true,
      isShowTips: false,
      isShowError: true,
      contentList: [
        {
          selectTrue: true,
          bdNo: "投保人（即被保人）",
          bdContent: "张三",
          cardStyle: "身份证",
          cardNo: "340826********6207",
          enterTime: "至2029-01-01"
        },
        {
          selectTrue: true,
          bdNo: "投保人（即被保人）",
          bdContent: "张三",
          cardStyle: "身份证",
          cardNo: "340826********6207",
          enterTime: "至2029-01-01"
        },
        {
          selectTrue: true,
          bdNo: "投保人（即被保人）",
          bdContent: "张三",
          cardStyle: "身份证",
          cardNo: "340826********6207",
          enterTime: "至2029-01-01",
          btnStyle: "btnStyle"
        }
      ],
      tipsContent: "对不起，请选择保单做变更投资分配比例"
    };
  },
  methods: {
    bgFn(index) {
      console.log(this.contentList[index]);
      window.location.href = "./endbxPageTwo.html";
    },
    showTipsFn() {
      this.isShowTips = true;
      setTimeout(() => { 
        this.isShowTips = false;
      }, 3000); 
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(./css/style.css);
</style>
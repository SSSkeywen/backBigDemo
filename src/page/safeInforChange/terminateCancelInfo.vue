<template>
  <div>
    <div id="bqContent">
      <section class="bq-list-box" v-for="(item, index) in contentLists" :key="index">
        <header class="bq-title">
          <div class="bq-title-img" @click="selectBd(index)">
            <img :src="checkedImg" v-if="item.isSelect">
            <img :src="selectIconOneImg" v-else>
          </div>
          <article class="bq-title-font">
            <p>
              保单号：
              <span v-text="item.POLICY_CODE"></span>
            </p>
          </article>
        </header>
        <ul class="bq-content-list">
          <li>
            <p>险种序号</p>
            <p v-text="item.INTERNAL_ID"></p>
          </li>
          <li>
            <p>险种名称</p>
            <p v-text="item.PRODUCT_NAME"></p>
          </li>
          <li>
            <p>险种状态</p>
            <p v-text="item.LIA_STATE_NAME"></p>
          </li>
          <li>
            <p>下期缴费日</p>
            <p v-text="item.PAY_DUE_DATE"></p>
          </li>
          <li>
            <p>预约终止前责任终止日期</p>
            <p v-text="item.END_DATE_BEFORE"></p>
          </li>
          <li>
            <p>预约终止后责任终止日期</p>
            <p v-text="item.END_DATE_AFTER"></p>
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
            <p>确认变更</p>
          </div>
        </div>
      </section>
      <transition name="fade">
        <div class="tips-style" v-if="isShowTips">
          <p v-text="tipsContent"></p>
        </div>
      </transition>
      <section class="tips-two" v-if="isShowtipsThree">
        <div class="tips-phone">
          <header class="line-down">短信验证</header>
          <div class="tips-number line-down">
            <div class="tips-phone-top">
              <div>
                <input v-model="sendCodeCount" type="text" placeholder="请输入验证码">
              </div>
              <div>
                <button
                  class="style-click"
                  :class="isDisabledSend? 'disable-style' : ''"
                  @click="sendCode"
                  :disabled="isDisabledSend"
                >{{ sendCodeData }}</button>
              </div>
            </div>
            <p class="tips-phone-down">请在300秒内输入您收到的短信验证码，若未收到短信，请点击“重新发送验证码”。</p>
          </div>
          <div class="tips-btn">
            <div class="line-right">
              <button class="style-click" @click="closeTipsFn">取消</button>
            </div>
            <div>
              <button id="sendCode_btn" class="style-click" @click="submitContent">确认</button>
            </div>
          </div>
        </div>
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
      <section class="error-style" v-show="isShowTips1" style="display: none;" name="fade">
        <div class="error-content">
          <img :src="xitongyichangImg" width="100%">
          <p class="error-font" v-text="tipsContent1"></p>
          <div class="error-btn">
            <button class="style-click" @click="ShuaXin()">确定</button>
          </div>
        </div>
      </section>
    </div>
    <form id="form" method="get" style="display:none">
      <input type="text" name="policyList" value>
      <input type="submit" value="提交">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedImg: require("@/assets/safeInforChangeImg/checked.png"),
      noHasBdImg: require("@/assets/safeInforChangeImg/noHasBd.png"),
      xitongyichangImg: require("@/assets/safeInforChangeImg/xitongyichang.png"),
      selectIconOneImg: require("@/assets/safeInforChangeImg/selectIconOne.svg"),
      isShowTips: false,
      isShowError: false,
      isShowTips1: false,
      tipsContent1: "",
      sendCodeCount: "", //验证码
      sendCodeData: "获取短信验证码",
      isDisabledSend: false,
      selectAll: false,
      tipsContent: "",
      isShowyesOrNo: false, //提交显示
      newAddZhList: false, //新增账户是否显示
      isShowtipsThree: false,
      numOne: "",
      numTwo: "",
      selectListData: [
        {
          zhName: "累积生息",
          isSelectCh: false
        },
        {
          zhName: "抵交保费",
          isSelectCh: false
        },
        {
          zhName: "现金领取",
          isSelectCh: false
        }
      ],
      contentLists: [
        {
          isSelect: false,
          POLICY_CODE: "006762144694003",
          INTERNAL_ID: "7289",
          PRODUCT_NAME: "太平福禄康瑞终身重大疾病保险",
          LIA_STATE_NAME: "有效",
          PAY_DUE_DATE: "2017-09-10",
          END_DATE_BEFORE: "2018-09-10",
          END_DATE_AFTER: "2019-09-10"
        },
        {
          isSelect: false,
          POLICY_CODE: "006762144694003",
          INTERNAL_ID: "7289",
          PRODUCT_NAME: "太平福禄康瑞终身重大疾病保险",
          LIA_STATE_NAME: "有效",
          PAY_DUE_DATE: "2017-09-10",
          END_DATE_BEFORE: "2018-09-10",
          END_DATE_AFTER: "2019-09-10"
        },
        {
          isSelect: false,
          POLICY_CODE: "006762144694003",
          INTERNAL_ID: "7289",
          PRODUCT_NAME: "太平福禄康瑞终身重大疾病保险",
          LIA_STATE_NAME: "有效",
          PAY_DUE_DATE: "2017-09-10",
          END_DATE_BEFORE: "2018-09-10",
          END_DATE_AFTER: "2019-09-10"
        }
      ]
    };
  },
  methods: {
    //Toast方法
    showTipsFn() {
      this.isShowTips = true;
      setTimeout(() => {
        this.isShowTips = false;
      }, 1000);
    },
    //发送验证码
    sendCode() {
      this.isDisabledSend = true;
      this.sendCodeData = "300秒后重新发送";
      this.miuFnOne(300);

      setTimeout(() => {
        this.sendCodeData = "重新发送";
        this.isDisabledSend = false;
      }, 300000);
    },
    //验证码倒计时函数
    miuFnOne(miu) {
      let miuFn = setTimeout(() => {
        miu--;
        this.sendCodeData = miu + "秒后重新发送";
        if (miu == 1) {
          return false;
        }
        this.miuFnOne(miu);
      }, 1000);
    },
    //提交方法
    submitContent() {
      console.log(this.sendCodeCount);
      if (this.sendCodeCount == "") {
        this.tipsContent = "验证码不能为空！！！";
        this.showTipsFn();
        return false;
      }
      this.$router.push({ path: "/terminateCancelResult" });
    },
    submitFn() {
      var v = false;
      for (let item of this.contentLists) {
        if (item.isSelect == true) {
          this.isShowtipsThree = true;
          v = true;
          break;
        }
      }
      if (v == false) {
        this.tipsContent = "对不起，请选择保单做预约终止";
        this.showTipsFn();
      }
    },
    closeTipsFn() {
      this.isShowyesOrNo = false;
    },
    //选择保单号
    selectBd(index) {
      this.contentLists[index].isSelect = !this.contentLists[index].isSelect;
      for (let item of this.contentLists) {
        if (!item.isSelect) {
          this.selectAll = false;
          break;
        } else {
          this.selectAll = true;
        }
      }
    },
    //关闭新增账户
    closeZh() {
      this.newAddZhList = false;
    },
    allSelect() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        for (let item of this.contentLists) {
          item.isSelect = true;
        }
      } else {
        for (let item of this.contentLists) {
          item.isSelect = false;
        }
      }
    },
    clickKnow() {
      this.isShowError = false;
    },
    showTipsFn1() {
      this.isShowTips1 = true;
    }
  }
};
</script>


<style scoped>
@import url("./../../../static/css/baoquan.css");
</style>

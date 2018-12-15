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
      <!-- <bgComponent></bgComponent> -->
      <alertContent :alertCount="alertCount"></alertContent>
      <sendAlrtContent
        ref="senAlertContent"
        :pnoneBack="phoneNo"
        v-if="sendCode"
        @clolseAlert="clolseAlert"
        @sendCodeFnTwo="sendCodeFnTwo"
        @sendCodeFn="sendCodeFn"
      ></sendAlrtContent>

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
import alertContent from "../../components/alertContent";
import sendAlrtContent from "../../components/sendAlrtContent";
import { mapActions } from "vuex";
import { Toast } from "vant";
// import { mapActions } from "vuex";
import { List } from "vant";
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
      phoneNo: "",
      codeData: "",
      sendCode: false,
      tipsContent1: "",
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },

      selectAll: false,
      tipsContent: "",
      isShowyesOrNo: false, //提交显示
      newAddZhList: false, //新增账户是否显示
      // isShowtipsThree: false,
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
          POLICY_CODE: "",
          INTERNAL_ID: "",
          ITEM_ID: "",
          PRODUCT_NAME: "",
          LIA_STATE_NAME: "",
          PAY_DUE_DATE: "",
          END_DATE_BEFORE: "",
          END_DATE_AFTER: ""
        }
      ]
    };
  },
  components: {
    // bgComponent,
    alertContent,
    sendAlrtContent
  },
  created() {
    var contentPlocly = this.$route.query.contentPlocly;
    console.log(contentPlocly);
    this.terminaTecancelInfo({
      contentPlocly,
      successCallback: res => {
        // console.log("panpan" + res.data);
        // console.log(res.data.resultList);
        // this.InformationMap = res.data.InformationMap
        for (let item of res.data.resultList) {
          item.selectTrue = false;
        }
        this.contentLists = res.data.resultList;
        // console.log(this.ITEM_ID);
        this.ITEM_ID = this.contentLists[0].ITEM_ID;
        console.log(this.ITEM_ID);
        // 赵盼
        // switch (this.contentLists) {
        //   case 0:
        //     this.$refs.senAlertContent.inputCode(result.data);
        //     break;
        //   case 1:
        //     let tipsData = `今日认证次数已达上限，请明天再来！`;
        //     this.$router.push({
        //       path: "/userFailPage",
        //       query: { tipsData: tipsData }
        //     });
        //     break;
        //   default:
        //     this.alertCount.alertData = result.msg;
        //     this.alertCount.isShowAlert = true;
        //     break;
        // }
      },
      fCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      terminaTecancelInfo: "terminaTecancelInfo",
      terminatecancelsendcode: "terminatecancelsendcode",
      terminatecancelvalidatecode: "terminatecancelvalidatecode"
    }),
    //Toast方法
    showTipsFn() {
      this.isShowTips = true;
      setTimeout(() => {
        this.isShowTips = false;
      }, 1000);
    },
    clolseAlert() {
      this.sendCode = false;
    },

    //发送验证码
    sendCodeFn() {
      // this.$refs.senAlertContent.inputCode(111)
      let phoneNoData = {
        userHandphone: this.phoneNoTwo
      };

      this.terminatecancelsendcode({
        // code,
        // phoneNoData,
        successCallback: result => {
          switch (result.code) {
            case 0:
              this.$refs.senAlertContent.inputCode(result.data);
              break;
            case 1:
              let tipsData = `今日认证次数已达上限，请明天再来！`;
              this.$router.push({
                path: "/userFailPage",
                query: { tipsData: tipsData }
              });
              break;
            default:
              this.alertCount.alertData = result.msg;
              this.alertCount.isShowAlert = true;
              break;
          }
        },
        failCallback: res => {
          this.alertCount.alertData = res.msg;
          this.alertCount.isShowAlert = true;
          // toast1.clear();
        }
      });
    },

    //进行验证
    sendCodeFnTwo(codeData) {
      this.sendCode = false;
      if (codeData == "") {
        this.alertCount.alertData = "请输入验证码！";
        this.alertCount.isShowAlert = true;
        return false;
      }

      var policyList = [];
      var zp;

      var v = false;
      for (let item of this.contentLists) {
        console.log(item.isSelect);
        if (item.isSelect == true) {
          zp = {};
          zp.policyCode = item.POLICY_CODE;
          zp.itemId = this.ITEM_ID;
          policyList.push(zp);

          // console.log(policyList);
          // console.log(9999999);
          v = true;
          // break;
        }
      }
      var code = codeData;

      this.terminatecancelvalidatecode({
        code,
        // phoneCodeNoData,
        successCallback: result => {
          console.log(result.code);
          switch (result.code) {
            case 0:
              window.localStorage.setItem("isBinding", "1");
              // var policyList = [];
              policyList = JSON.stringify(policyList);
              // return false;
              this.$router.push({
                path: "/terminateCancelResult",
                query: {
                  policyList: policyList
                }
              });
              break;
            case "1":
              this.alertCount.alertData = result.msg;
              this.alertCount.isShowAlert = true;
              break;
            case "2":
              this.alertCount.alertData = result.msg;
              this.alertCount.isShowAlert = true;
              break;
            case "3":
              this.alertCount.alertData = result.msg;
              this.alertCount.isShowAlert = true;
              break;
            case "9":
              tipsData = result.msg;
              this.$router.push({
                path: "/userFailPage",
                query: { tipsData: tipsData }
              });
              break;
            default:
              this.$refs.senAlertContent.isCodeWrongFn();
              break;
          }
        },
        failCallback: res => {
          this.alertCount.alertData = res.msg;
          this.alertCount.isShowAlert = true;
        }
      });
    },

    submitFn() {
      var v = false;
      for (let item of this.contentLists) {
        if (item.isSelect == true) {
          this.sendCode = true;
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

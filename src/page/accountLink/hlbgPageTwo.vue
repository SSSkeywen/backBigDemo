<template>
  <div>
    <div id="bqContent">
      <section class="bq-list-box" v-for="(item, index) in contentLists" :key="index">
        <header class="bq-title">
          <div class="bq-title-img" @click="selectBd(index)">
            <img :src="selectIconOneImg" v-if="item.isSelect">
            <img :src="checkedImg" v-else>
          </div>
          <article class="bq-title-font">
            <p>
              保单号：
              <span v-text="item.hlbg_pCode"></span>
            </p>
          </article>
        </header>
        <ul class="bq-content-list" v-for="(itemTwo,indexTwo) in item.listDatas" :key="indexTwo">
          <li>
            <p>险种名称</p>
            <p v-text="itemTwo.PRODUCT_NAME"></p>
          </li>
          <li>
            <p>是否分红</p>
            <p v-text="itemTwo.IS_BONUS"></p>
          </li>
          <li>
            <p>现红利选择方式</p>
            <p v-text="itemTwo.MODE_NAME"></p>
          </li>
          <li class="line-down">
            <p>变更后红利选择方式</p>
            <div class="bq-select" @click="selectXh(index,indexTwo)">
              <p style="color: rgba(0, 108, 183, 1);">{{itemTwo.selectCount}}</p>
              <div class="select-style">
                <img :src="toRightIconImg">
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section class="success-btn" @click="submitFn">
        <button class="style-click click_yes" :disabled="zpdisabled">确认变更</button>
      </section>
      <transition name="fade">
        <div class="tips-style" v-if="isShowTips">
          <p v-text="tipsContent"></p>
        </div>
      </transition>
      <section class="select-list" v-if="newAddZhList" @click="closeZh">
        <div class="select-list-box" @click.stop>
          <hgroup class="select-list-title">
            <div class="select-list-img" @click="closeZh">
              <img :src="houtuiImg" alt srcset>
            </div>
            <p>变更后红利选择方式</p>
            <p>&nbsp;</p>
          </hgroup>
          <ul class="select-list-content">
            <li
              class="line-down style-click"
              @click="selectNewAddZh(index)"
              v-for="(item,index) in selectListData"
              :key="index"
            >
              <p v-text="item.zhName"></p>
              <div>
                <img :src="selectIconImg" v-if="item.isSelectCh">
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section class="tips-two" v-if="isShowyesOrNo">
        <div class="tips-content">
          <div class="tips-font line-down">
            <p class="p-one" v-text="tipsPolicyCode" style="word-wrap: break-word;"></p>
            <p class="p-two">红利选择方式未变更，是否继续操作？</p>
          </div>
          <div class="tips-btn">
            <div class="line-right">
              <button class="style-click" @click="closeTipsFn">否</button>
            </div>
            <div>
              <button class="style-click click_yes" @click="submitFnTwo">是</button>
            </div>
          </div>
        </div>
      </section>
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
    <!-- 加载中弹出框 -->
    <div id="accepting" class="zfqr_jiaz" style=" font-size:14px;" v-if="tcshown">
      <div class="zfqr_nr">
        <img :src="waitingImg" width="44" height="44" style="    margin: 0 auto;">
        <br>
        <br>数据努力提交中，请一定不要返回或者退出微信~~
      </div>
    </div>
  </div>
</template>

<script>
// import { $ } from "@/js/jquery-1.7.1.min.js";
import { mapActions } from "vuex";
import { List } from "vant";
export default {
  data() {
    return {
      checkedImg: require("@/assets/safeInforChangeImg/checked.png"),
      noHasBdImg: require("@/assets/safeInforChangeImg/noHasBd.png"),
      xitongyichangImg: require("@/assets/safeInforChangeImg/xitongyichang.png"),
      selectIconOneImg: require("@/assets/safeInforChangeImg/selectIconOne.svg"),
      toRightIconImg: require("@/assets/safeInforChangeImg/toRightIcon.png"),
      waitingImg: require("@/assets/safeInforChangeImg/waiting.gif"),
      houtuiImg: require("@/assets/safeInforChangeImg/houtui.png"),
      isShowTips: false,
      isShowError: false,
      zpdisabled: false,
      tcshown: false,
      selectAll: true,
      tipsContent: "",
      tipsPolicyCode: "",
      isShowyesOrNo: false, //提交显示
      newAddZhList: false, //新增账户是否显示
      numOne: "",
      numTwo: "",
      zpresultList: "",
      selectListData: [
        {
          zhName: "累积生息",
          isSelectCh: false
        },
        {
          zhName: "抵缴保费",
          isSelectCh: false
        },
        {
          zhName: "现金领取",
          isSelectCh: false
        }
      ],
      contentLists: [],
      resultLists: []
    };
  },
  created() {
    var policyCode = this.$route.query.policyCode;
    this.gethLchangebyinfo({
      policyCode,
      successCallback: res => {
        // console.log(res);
        policyCode = JSON.stringify(policyCode);
        for (let item of res.data) {
          item.isSelect = true;
          // item.selectTrue = false;
        }
        this.contentLists = res.data;
        // console.log(this.contentLists);
      },
      fCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      gethLchangebyinfo: "gethLchangebyinfo",
      getbonusinfo: "getbonusinfo"
    }),
    //Toast方法
    showTipsFn() {
      this.isShowError = true;
    },
    submitFn() {
      var flag = false;
      var dataFlag = false;
      var dataOneFlag = true;
      var dataPolicyList = "";
      var num = 0;
      var resultLists = new Array();
      // console.log(this.contentLists);
      for (let item of this.contentLists) {
        var ss = 0;
        // console.log(item.isSelect);
        // item.isSelect = false
        if (!item.isSelect) {
          flag = true;
          console.log(item.listDatas);
          var resultInfos = new Array();
          var flag_info = 0;
          for (let items of item.listDatas) {
            // console.log(items.selectCount);
            // console.log(items.MODE_NAME);
            // console.log(items.selectCount == items.MODE_NAME);
            if (items.selectCount == items.MODE_NAME) {
              this.tipsContent = "保单红利选择方式未变更，请确认";
              this.showTipsFn();
              return;
            } else if (items.selectCount != "请选择") {
              flag = true;
              // dataFlag = false;
              ss++;

              var parm = {
                selectCount: items.selectCount,
                IS_BONUS: items.IS_BONUS,
                PRODUCT_ID: items.PRODUCT_ID
              };
              resultInfos.push(parm);
              // console.log(this.resultInfos);
              flag_info++;
            } else {
              // // 		                        		dataFlag= true;
            }
          }
          // console.log(flag_info);
          if (flag_info > 0) {
            flag = true;
          } else {
            flag = false;
          }
          var parms = { hlbg_pCode: item.hlbg_pCode, listDatas: resultInfos };
          resultLists.push(parms);
          // console.log(resultLists);
        } else {
          dataFlag = true;
        }

        if (ss > 0) {
          dataFlag = false;
        } else {
          dataFlag = true;
        }

        if (dataFlag == true) {
          if (num == 0) {
            // alert(2);
            dataPolicyList += item.hlbg_pCode;
          } else {
            dataPolicyList += "，" + item.hlbg_pCode;
          }
          num++;
        }
        // console.log(num);
        this.resultLists = resultLists;
        // console.log(this.resultLists);
      }
      if (!flag) {
        this.tipsContent = "保单红利选择方式未变更，请确认";
        this.showTipsFn();
        return;
      }
      if (num > 0) {
        this.isShowyesOrNo = true;
        this.tipsPolicyCode = dataPolicyList + "保单";
        return;
        //                         	this.tipsPolicyCode='保单：'+dataPolicyList;
      }
      this.checkByResult();
    },
    submitFnTwo() {
      // console.log(this.contentLists);
      for (let item of this.contentLists) {
        // console.log(item);
        for (let items of item.listDatas) {
          if (items.MODE_NAME == items.selectCount) {
            this.tipsContent = "保单红利选择方式未变更，请确认";
            this.showTipsFn();
            return;
          }
        }
      }
      this.checkByResult();
    },
    checkByResult() {
      // $(".click_yes").attr("disabled", "disabled");
      this.zpdisabled = true;
      this.tcshown = true;
      // $("#accepting").show();
      var param = this.resultLists;
      this.getbonusinfo({
        param,
        successCallback: res => {
          // console.log(res);
          $("#accepting").hide();
          this.zpresultList = res;
          this.$router.push({
            path: "/hlsuccessPage",
            query: { param: this.zpresultList }
          });

          for (let item of res.data) {
            item.isSelect = true;
            // item.selectTrue = false;
          }
          this.contentLists = res.data;
          // console.log(this.contentLists);
        },
        fCallback: res => {}
      });
    },
    closeTipsFn() {
      this.isShowyesOrNo = false;
    },
    //选择保单号
    selectBd(index) {
      //console.log(index);
      //console.log(this.contentLists[index]);
      this.contentLists[index].isSelect = !this.contentLists[index].isSelect;
      if (this.contentLists[index].selectTrue == true) {
        for (let item of this.selectListData) {
          item.zhName = false;
        }
      }
    },
    //新增账户
    selectXh(index, indexTwo) {
      //console.log(index, indexTwo);
      this.numOne = index;
      this.numTwo = indexTwo;
      for (let item of this.selectListData) {
        item.isSelectCh = false;
      }
      this.contentLists[this.numOne].listDatas[this.numTwo].selectCount =
        "请选择";

      this.newAddZhList = true;
    },
    //关闭新增账户
    closeZh() {
      this.newAddZhList = false;
    },
    //新增账户的方法
    selectNewAddZh(index) {
      //console.log();
      //console.log(this.selectListData[index].zhName);
      for (let item of this.selectListData) {
        item.isSelectCh = false;
      }
      this.selectListData[index].isSelectCh = true;
      this.contentLists[this.numOne].listDatas[
        this.numTwo
      ].selectCount = this.selectListData[index].zhName;
      this.newAddZhList = false;
    },
    selectClickHere() {
      this.isShowError = false;
    }
  }
};
</script>

<style scoped>
@import url("./../../../static/css/baoquan.css");
.zfqr_nr {
  text-align: center;
  padding-top: 200px;
  color: #fff;
}
.zfqr_jiaz {
  z-index: 9999;
  min-height: 200px;
  height: 100%;
  top: 0%;
  width: 100%;
  margin: 0 0%;
  position: fixed;
  background: #000;
  filter: alpha(opacity=80);
  -moz-opacity: 0.8;
  -khtml-opacity: 0.8;
  opacity: 0.8;
}
</style>

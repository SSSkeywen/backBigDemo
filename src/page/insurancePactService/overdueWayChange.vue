<template>
  <div class="normal-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="data-box" v-if="ajaxData!=''&&ajaxData!=null">
      <section class="bq-box-style">
        <ul class="line" v-for="(item,index) in ajaxData" :key="index">
          <li @click="checkOne(item.policyCode)">
            <div class="bq-img" :class="{'selALL':selectCode.indexOf(item.policyCode)>=0}"></div>
            <div class="bq-content">
              <p class="bq-content-one">
                保单号：
                <span>{{item.policyCode}}</span>
              </p>
            </div>
          </li>
          <li class="new-bf-style line">
            <p>保费逾期未付处理方式</p>
            <p>{{item.typeName}}</p>
          </li>
          <li class="new-bf-style">
            <p>变更后处理方式</p>
            <div class="bq-select" @click="chooseWay(item.policyCode)">
              <p>{{item.bqSelect}}</p>
              <div class="select-style">
                <img :src="imgToR">
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section class="tips-list-style">
        <h5>温馨提示：</h5>
        <ul>
          <li>
            <p>1.</p>
            <p>停效：如选择停效，则当保单保费逾期未交时，保单自动停效；</p>
          </li>
          <li>
            <p>2.</p>
            <p>自动垫缴：如选择自动垫缴，则当保单保费逾期未交时，保单用保单现价进行垫缴保费，当不够垫缴时，则保单停效。选择自垫后如想正常缴纳保费，需至保险公司办理结束自动垫缴。</p>
          </li>
        </ul>
      </section>
      <section class="bq-submit">
        <div class="bq-submit-left" @click="checkAll">
          <div :class="{'selALL':isCheckAll}">
            <!-- <img :src="checkedImg"> -->
          </div>
          <p>全选</p>
        </div>
        <div class="bq-submit-right style-click click_yes" @click="toEnd">
          <p>选择变更</p>
        </div>
      </section>
    </div>
    <div v-else>0000</div>
    <section class="select-list" v-if="chooseModel">
      <div class="select-list-box">
        <hgroup class="select-list-title">
          <div class="select-list-img">
            <img src="../../assets/pactImg/houtui.png">
          </div>
          <p>变更后处理方式</p>
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
              <img src="../../assets/pactImg/selectIcon.png" v-if="item.isSelectCh">
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="error-style" v-if="errorTips.isShow">
      <div class="error-content">
        <img :src="imgError" width="100%">
        <p class="error-font">{{errorTips.tips}}</p>
        <div class="error-btn">
          <button @click="closeTips">知道了</button>
        </div>
      </div>
    </section>
    <div class="zfqr_jiaz" v-if="showLoading">
      <div class="zfqr_nr">
        <img :src="imgLoading" width="44" height="44">
        <br>
        <br>数据努力提交中，请一定不要返回或者退出微信~~
      </div>
    </div>
  </div>
</template>

<script>
import headerT from "@/components/header.vue";
// import noResult from '../../components/letterComponent/noResult.vue'
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT
    // noResult
  },
  data() {
    return {
      headerContent: "保费逾期未付处理方式变更的保单列表",
      imgToR: require("@/assets/pactImg/toRightIcon.png"),
      imgChoose: require("@/assets/pactImg/toRightIcon.png"),
      imgError: require("@/assets/pactImg/xitongyichang.png"),
      imgLoading: require("@/assets/bsImg/waiting.gif"),
      isCheckAll: false,
      chooseModel: false,
      errorTips: {
        isShow: false,
        tip: ""
      },
      showLoading: false,
      // 选择的保单号集合
      selectCode: [],
      // 正在更改的保单号
      clickCode: "",
      selectListData: [
        {
          zhName: "停效",
          isSelectCh: false
        },
        {
          zhName: "自动垫缴",
          isSelectCh: false
        }
      ],
      ajaxData: []
    };
  },
  created() {
    const toast1 = Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 1000
    });

    this.overDueQuery({
      successCallback: res => {
        console.log(res);
        this.ajaxData = res.data;
      },
      failCallback: res => {
        if (res.code == 2002) {
          this.$route.push({
            path: "/userInfo",
            query: { pathAddress: "/unbindSelf" }
          });
        } else {
          console.log("失败");
          this.errorTips.isShow = true;
          this.errorTips.tips = res.msg;
        }
      }
    });
  },

  methods: {
    ...mapActions({
      overDueQuery: "overDueQuery",
      overDueUpdate: "overDueUpdate"
    }),
    checkAll() {
      let that = this;
      that.isCheckAll = !that.isCheckAll;
      if (that.isCheckAll) {
        that.selectCode = [];
        that.ajaxData.forEach(function(item) {
          that.selectCode.push(item.policyCode);
        });
      } else {
        that.selectCode = [];
      }
    },
    checkOne(code) {
      var codeIndex = this.selectCode.indexOf(code);
      if (codeIndex >= 0) {
        //如果包含了该code，则删除（单选按钮由选中变为非选中状态）
        this.selectCode.splice(codeIndex, 1);
      } else {
        //选中该按钮
        this.selectCode.push(code);
      }
      // 影响 全选  如果selectCode的长度等于数据的长度
      if (this.selectCode.length == this.ajaxData.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },
    chooseWay(code) {
      var codeIndex = this.selectCode.indexOf(code);
      if (codeIndex >= 0) {
        //如果包含了该code
        console.log("可以选择");
        this.chooseModel = true;
        return (this.clickCode = code);
      } else {
        //选中该按钮
        console.log("不可以选择");
        this.errorTips.isShow = true;
        this.errorTips.tips = "请选择保单处理方式";
      }
    },
    //选中值
    selectNewAddZh(index) {
      console.log(this.clickCode);
      for (let item of this.selectListData) {
        item.isSelectCh = false;
      }
      this.selectListData[index].isSelectCh = !this.selectListData[index]
        .isSelectCh;

      setTimeout(() => {
        this.chooseModel = false;
        for (let item of this.ajaxData) {
          if (item.policyCode == this.clickCode) {
            item.bqSelect = this.selectListData[index].zhName;
          }
        }
      }, 200);
    },
    closeTips() {
      // 关闭错误提示
      this.errorTips.isShow = false;
    },
    toEnd() {
      // 处理数据
      let policyList = [];
      var policyValue = "";
      var num = 0;
      var num_policy = 0;
      var clickFlagRes = false;
      for (let item of this.ajaxData) {
        if (this.selectCode.indexOf(item.policyCode)>=0) {
          var policy = item.policyCode;
          console.log(policy);
          var selectgzhName = item.bqSelect;
          console.log(selectgzhName);
          if (selectgzhName == item.typeName) {

            for (let item1 of this.ajaxData) {
        
              if (this.selectCode.indexOf(item.policyCode)>=0) {
                if (item1.bqSelect == item1.typeName) {
                  if (num_policy == 0) {
                    policyValue += item1.policyCode;
                  } else {
                    policyValue += "，" + item1.policyCode;
                  }
                  num_policy++;
                }
              }
            }
            this.errorTips.tips =
              "保单：" + policyValue + "保单处理方式未变更，请确认";
            this.errorTips.isShow = true;
            return;
          } else if (selectgzhName == ""||selectgzhName == undefined) {
            this.errorTips.tips = "未有保单进行逾期未付处理方式变更,请确认";
            this.errorTips.isShow = true;
            return;
          } else {
            console.log("di" + num);
            let policyMap = {
              policyCode: policy,
              overdueManage: item.overdueManage
            };
            console.log("policyMap:=" + policyMap);
            policyList.push(policyMap);
            clickFlagRes = true;
            num++;
          }
        }
      }
      console.log(policyList);
      if(policyList.length == 0){
        this.errorTips.tips = "请选择要变更的保单！";
        this.errorTips.isShow = true;
      }
      if (clickFlagRes == true) {
        this.submitFn(policyList);
      }
    },
    //提交
    submitFn(policyListOne) {
      this.showLoading = true;
        let  policyList = {
            policyList:policyListOne
        }
        console.log(policyList);
      this.overDueUpdate({
        policyList,
        successCallback: res => {
          console.log(res);
          this.showLoading = false;
          this.$router.push({
            path: "/overdueWayChangeEnd",
            query: {
              data: res.data
            }
          });
        },
        failCallback: res => {
          this.showLoading = false;
          if (res.code == 2002) {
            this.$router.push({
              path: "/userInfo",
              query: { pathAddress: "/unbindSelf" }
            });
          } else {
            console.log("失败");
            this.errorTips.isShow = true;
            this.errorTips.tips = res.msg;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #dddddd;
    color: #dddddd;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    z-index: 2;
  }
}
.normal-box {
  min-height: 100vh;
  background-color: whitesmoke;
  .data-box {
    .bq-box-style {
      ul {
        margin-bottom: 0.21rem;
        background: #fff;
        li {
          display: flex;
          padding: 0.3rem;
          .bq-img {
            width: 0.42rem;
            height: 0.42rem;
            background: url("./../../assets/pactImg/selectIconOne.svg") 0 0
              no-repeat;
            background-size: 100%;
            &.selALL {
              background-image: url("./../../assets/pactImg/checked.png");
            }
          }
          .bq-content {
            margin-left: 0.3rem;
            .bq-content-one {
              font-size: 0.34rem;
              color: #3d3d3d;
            }
          }
        }
        .new-bf-style {
          font-size: 0.3rem;
          padding: 0.23rem 0.3rem 0.23rem 0;
          margin-left: 0.3rem;
          font-family: PingFangSC-Regular;
          color: #999999;
          line-height: 0.42rem;
          justify-content: space-between;
          .bq-select {
            display: flex;
            display: -webkit-flex;
            color: #006cb7;
            .select-style {
              width: 0.3rem;
              padding: 0.06rem 0;
              margin-left: 0.1rem;
              img {
                height: 0.3rem;
                display: block;
              }
            }
          }
        }
      }
    }
    .tips-list-style {
      padding: 0.1rem 0.3rem 0.92rem 0.3rem;
      h5 {
        font-size: 0.26rem;
        color: #006cb7;
        line-height: 0.37rem;
        margin-bottom: 0.1rem;
      }
      ul {
        li {
          display: flex;
          font-size: 0.24rem;
          color: #f00;
          line-height: 0.33rem;
          text-align: justify;
          margin-bottom: 0.06rem;
          p:first-child {
            width: 0.24rem;
            margin-right: 0.05rem;
          }
        }
      }
    }
    .bq-submit {
      width: 100%;
      height: 0.92rem;
      display: flex;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #fff;
      z-index: 9;
      .bq-submit-left {
        padding: 0.25rem 0.3rem;
        display: flex;
        display: -webkit-flex;
        width: 2.5rem;
        div {
          width: 0.42rem;
          height: 0.42rem;
          background: url("./../../assets/pactImg/selectIconOne.svg") 0 0
            no-repeat;
          background-size: 100%;
          &.selALL {
            background-image: url("./../../assets/pactImg/checked.png");
          }
          img {
            width: 0.42rem;
            display: block;
            border: none;
          }
        }
        p {
          line-height: 0.45rem;
          color: #666666;
          font-size: 0.32rem;
          margin-left: 0.26rem;
        }
      }
      .bq-submit-right {
        position: relative;
        padding: 0.23rem 0;
        text-align: center;
        font-size: 0.34rem;
        font-family: PingFangSC-Regular;
        color: white;
        background: #00ae4d;
        flex: 1;
      }
    }
  }
  .select-list {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3972);
    z-index: 9;
    .select-list-box {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #fff;
    }
  }
}
.error-style {
  background-color: rgba(0, 0, 0, 0.3972);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  .error-content {
    position: fixed;
    left: 1.21rem;
    top: 2.55rem;
    background-color: #fff;
    width: 5.08rem;
    border-radius: 7px;
    img {
      border: none;
      vertical-align: middle;
    }
    .error-font {
      word-wrap: break-word;
      padding: 0px 0.2rem;
      font-size: 0.3rem;
      font-family: PingFangSC-Medium;
      color: #39393c;
      line-height: 0.46rem;
      text-align: center;
      margin-top: 0.48rem;
    }
    .error-btn {
      padding: 0.32rem 0.44rem 0.45rem;
      button {
        position: relative;
        width: 4.2rem;
        height: 0.8rem;
        background: #00ae4d;
        border-radius: 0.4rem;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular;
        color: white;
        display: block;
      }
    }
  }
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
  opacity: 0.8;
  font-size: 14px;
  .zfqr_nr {
    text-align: center;
    padding-top: 200px;
    color: #fff;
    img {
      border: none;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.select-list {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3972);
  z-index: 9;
}
.select-list .select-list-box {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
}
.select-list .select-list-box .select-list-title {
  height: 0.96rem;
  padding: 0.25rem 0.3rem;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
.select-list .select-list-box .select-list-title .select-list-img {
  height: 0.32rem;
  padding: 0.065rem;
}
.select-list .select-list-box .select-list-title .select-list-img img {
  height: 0.32rem;
  display: block;
}
.select-list .select-list-box .select-list-title p {
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  color: #3d3d3d;
  line-height: 0.45rem;
}
.select-list .select-list-box .select-list-title p:last-child {
  font-family: PingFangSC-Regular;
  color: #006cb7;
}
.select-list .select-list-box .select-list-content {
  padding: 0 0.3rem;
  max-height: 4.4rem;
  overflow-y: auto;
}
.select-list .select-list-box .select-list-content li {
  padding: 0.2rem 0;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
.select-list .select-list-box .select-list-content li p {
  font-size: 0.32rem;
  color: #666666;
  line-height: 0.45rem;
}
.select-list .select-list-box .select-list-content li div {
  width: 0.4rem;
  height: 0.28rem;
  padding: 0.085rem 0;
  box-sizing: border-box;
}
.select-list .select-list-box .select-list-content li div img {
  width: 0.4rem;
  display: block;
}
/*#btn_quan{display: block;}*/
</style>


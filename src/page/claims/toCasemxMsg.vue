<template>
  <div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <hgroup class="mp-hgroup">合计金额：{{totalAmount}}</hgroup>
    <section class="mp-box-one" v-for="(item,index) in policyCodes" :key="index">
      <div class="mp-min-title">
        <div class="mp-min-left">
          <div class="mp-min-left-img">
            <img :src="imgSrcTitle" alt>
          </div>
          <p>
            保单号:
            <span>{{item}}</span>
          </p>
        </div>
        <div @click="showMpListPolicyMessage(index)" class="mp-min-right">
          <img class="ani-down" :class="idShowCodeData?'add-ani-style':''" :src="imgSrcThree" alt>
        </div>
      </div>
      <div></div>
      <div v-for="(itemTwo,indexTwo) in productMap" :key="indexTwo" v-if="idShowCodeData">
        <ul class="mp-list" v-show="itemTwo.policyCode != item.policyCode">
          <li class="mp-list-li line-down">
            <p>险种名称：</p>
            <p v-text="itemTwo.productName"></p>
          </li>
          <li class="mp-list-li line-down">
            <p>险种责任：</p>
            <p>{{itemTwo.liabName}}</p>
          </li>
          <li class="mp-list-li line-down">
            <p>理赔结论：</p>
            <p>{{itemTwo.auditConclusion}}</p>
          </li>
          <li class="mp-list-li line-down">
            <p>理赔金额：</p>
            <p>{{itemTwo.payAmount}} 元</p>
          </li>
          <li class="mp-list-li line-down">
            <p>退费金额：</p>
            <p v-text="itemTwo.returnAmount"></p>
          </li>
          <li class="mp-list-li line-down">
            <p>生存受益人：</p>
            <p v-text="itemTwo.auditAccording"></p>
          </li>
        </ul>
      </div>
    </section>
    <section class="mp-box-one" v-for="(item,index) in policyMap" :key="index+'0'">
      <div class="mp-min-title">
        <div class="mp-min-left">
          <div class="mp-min-left-img">
            <img :src="imgSrcTitleTwo" alt>
          </div>
          <p>保单费用信息</p>
        </div>
        <div @click="showMpListPolicyMessageTwo(index)" class="mp-min-right">
          <img
            class="ani-down"
            :class="item.isShowInformation?'add-ani-style':''"
            :src="imgSrcThree"
            alt
          >
        </div>
      </div>
      <ul class="mp-list" v-if="item.isShowInformation">
        <li class="mp-list-li line-down">
          <p>欠交保费：</p>
          <p v-text="item.underdeliveryPremium"></p>
        </li>
        <li class="mp-list-li line-down">
          <p>溢交保费：</p>
          <p v-text="item.excessivepayPremium"></p>
        </li>
        <li class="mp-list-li line-down">
          <p>红利：</p>
          <p v-text="item.dividendAmount"></p>
        </li>
        <li class="mp-list-li line-down">
          <p>保单贷款：</p>
          <p>{{item.loanAmount}}</p>
        </li>
        <li class="mp-list-li line-down">
          <p>自动垫缴：</p>
          <p v-text="item.automaticPremium"></p>
        </li>
      </ul>
    </section>
    <section class="mp-box-one" v-for="(item,index) in casePremMap" :key="index+' '">
      <div class="mp-min-title">
        <div class="mp-min-left">
          <div class="mp-min-left-img">
            <img :src="imgSrcTitleThree" alt>
          </div>
          <p>案件费用信息</p>
        </div>
        <div @click="showMpListPolicyMessageThree(index)" class="mp-min-right">
          <img
            class="ani-down"
            :class="item.isShowInformation?'add-ani-style':''"
            :src="imgSrcThree"
            alt
          >
        </div>
      </div>
      <ul class="mp-list" v-if="item.isShowInformation">
        <li class="mp-list-li line-down">
          <p>住院发票金额：</p>
          <p v-text="item.inpatientExpense403"></p>
        </li>
        <li class="mp-list-li line-down">
          <p>统筹支付：</p>
          <p>{{item.inpatientExpense404}}</p>
        </li>
        <li class="mp-list-li line-down">
          <p>其他扣除：</p>
          <p v-text="item.inpatientExpense405"></p>
        </li>
        <li class="mp-list-li line-down">
          <p>自费费用：</p>
          <p v-text="item.inpatientExpense406"></p>
        </li>
        <li class="mp-list-li line-down">
          <p>门诊发票金额：</p>
          <p v-text="item.clinicExpense403"></p>
        </li>
        <li class="mp-list-li line-down">
          <p>统筹支付：</p>
          <p v-text="item.clinicExpense404"></p>
        </li>
        <li class="mp-list-li line-down">
          <p>其他扣除：</p>
          <p v-text="item.clinicExpense405"></p>
        </li>
        <li class="mp-list-li line-down">
          <p>自费费用：</p>
          <p v-text="item.clinicExpense406"></p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import { dateStyle } from "@/filter/dateStyle.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      headerContent: "案件信息",
      imgSrcTitle: require("@/assets/mgImg/xq_icon_xx.png"),
      imgSrcTitleTwo: require("@/assets/mgImg/xq_icon_xz.png"),
      imgSrcTitleThree: require("@/assets/mgImg/xq_icon_tbr.png"),
      imgSrcTitleFour: require("@/assets/mgImg/xq_icon_bxr.png"),
      imgSrcTitleFive: require("@/assets/mgImg/xq_icon_syr.png"), //收益人icon
      imgSrcTitleSix: require("@/assets/mgImg/xq_icon_xxfs.png"), //收益人icon
      imgSrcThree: require("@/assets/mgImg/xq_icon_xia.png"),
      // isShowInformation: true,
      // isShowInformationTwo: false,
      // isShowInformationThree: false,
      // isShowInformationFour: false,
      // isShowInformationFive: false,
      // isShowInformationSix: false,000699645811903 000736903287903 000439450423903
      idShowCodeData: false,
      codeData: "",
      totalAmount: "",
      productMap: [],
      policyCodes: [],
      policyMap: [],
      casePremMap: []
    };
  },
  filters: {
    dateFilter(date) {
      return dateStyle(date);
    }
  },
  created() {
    let caseListmessageData = {
      caseid: this.$route.query.caseNo
    };
    console.log(this.$route.query.caseNo);
    this.caseListmessage({
      caseListmessageData,
      successCallback: res => {
        console.log(res.data);
        this.policyCodes = res.data.policyCodes;
        let munMon = 0;
        for (let item of res.data.productMap) {
          munMon += parseFloat(item.payAmount);
        }
        this.totalAmount = munMon;

        // for (let item of res.data.productMap) {
        //   item.isShowInformation = false;
        // }
        this.productMap = res.data.productMap;

        for (let item of res.data.policyMap) {
          item.isShowInformation = false;
        }
        this.policyMap = res.data.policyMap;

        for (let item of res.data.casePremMap) {
          item.isShowInformation = false;
        }
        this.casePremMap = res.data.casePremMap;
      },
      fCallback: res => {}
    });
  },
  components: {
    headerT
  },
  methods: {
    ...mapActions({
      caseListmessage: "caseListmessage"
    }),

    //险种信息的显示
    showMpListPolicyMessage(index) {
      // this.productMap[index].isShowInformation = !this.productMap[index]
      //   .isShowInformation;
      // this.codeData = this.policyCodes[index];
      this.idShowCodeData = !this.idShowCodeData
    },

    showMpListPolicyMessageTwo(index) {
      this.policyMap[index].isShowInformation = !this.policyMap[index]
        .isShowInformation;
    },

    showMpListPolicyMessageThree(index) {
      this.casePremMap[index].isShowInformation = !this.casePremMap[index]
        .isShowInformation;
    }
  }
};
</script>

<style lang="scss" scoped>
.mg-box {
  min-height: 100vh;
  background-color: #dcdcdc;
  padding-bottom: 0.2rem;
}
.mp-hgroup {
  width: 95%;
  line-height: 0.8rem;
  color: #fff;
  background: url("../../assets/mgImg/xq_header_bg.png") no-repeat;
  margin: 0 auto;
  margin-top: 2%;
  background-size: 100% 100%;
  padding: 0 0 0 0.3rem;
  box-sizing: border-box;
}
.mp-box-one {
  width: 95%;
  background-color: #fff;
  margin: 10px auto;
  padding: 0 0.3rem;
  box-sizing: border-box;
  .mp-min-title {
    display: flex;
    justify-content: space-between;
    line-height: 0.8rem;
    .mp-min-left {
      display: flex;
      font-weight: 600;
      .mp-min-left-img {
        width: 0.3rem;
        padding-top: 0.17rem;
        margin-right: 0.2rem;
        img {
          width: 100%;
          display: block;
        }
      }
    }
    .mp-min-right {
      width: 0.44rem;
      padding-top: 0.22rem;
      img {
        width: 100%;
      }
    }
  }
  .mp-list {
    .mp-list-li {
      display: flex;
      justify-content: space-between;
      line-height: 0.52rem;
    }
    .mp-list-li:last-child {
      padding-bottom: 0.1rem;
    }
  }
}

/* 动画效果css */
.ani-down {
  transition: all 0.2s;
}
.add-ani-style {
  transform: rotateZ(180deg);
}
</style>
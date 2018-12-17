<template>
  <div class="normal-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="bonus-change-box" v-if="dataList.length>0&&dataList!=null&&dataList!=''">
      <div
        class="list-box"
        v-for="(item,index) in dataList"
        :key="index"
        v-if="item.POLICY_CODE !=undefined"
      >
        <div class="sq_xz">
          <span>保单号：</span>
          <i>{{item.POLICY_CODE}}</i>
          <i class="_select" @click="checkOne(item.POLICY_CODE)">
            <input
              type="checkbox"
              name="checkbox"
              :checked="policyCodes.indexOf(item.POLICY_CODE)>=0"
            >
          </i>
        </div>
        <ul class="list-con">
          <li>
            <span>可领取生存金本息金额（元）：</span>
            <span v-text="item.SURVIVAL_INTEREST"></span>
          </li>
          <li>
            <span>可领取满期本息金额（元）：</span>
            <span v-text="item.END_INTEREST"></span>
          </li>
          <li>
            <span>可领取年金本息金额（元）：</span>
            <span v-text="item.ANNUITY_INTEREST"></span>
          </li>
          <li>
            <span>可领取终了红利金额（元）：</span>
            <span v-text="item.TERMINAL_BONUS"></span>
          </li>
          <li>
            <span>该保单本次可领取金额合计（元）：</span>
            <span style="color:#f9c606" v-text="item.PAYING_FEE">202.02</span>
          </li>
          <!-- <li>
            <span>
              <input
                type="text"
                id
                readonly="true"
                value
                v-model="item.PAYING_FEE"
                disabled
                style="width: 80%; border-radius: 7px;padding: 3px;
    border: 1px solid #e0e0e1;    background: #fff;"
              >
            </span>
          </li>-->
        </ul>
      </div>
      <div id="tishi" class="tishi">
        <p style="font-size: 14px;">温馨提示：</p>
        <h6 style="font-size: 14px;">微信生存金领取仅支持投、被保人为同一人、投被保人非同一人且被保人是投保人未成年人子女的保单生存金领取方式变更。</h6>
      </div>
      <section class="yy_cx">
        <button @click="confirms">确认领取</button>
      </section>
    </div>
    <div v-else>您没有可做生存金领取的保单</div>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { List } from "vant";
import headerT from "@/components/header.vue";
import alertContent from "@/components/alertContent.vue";
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      headerContent: "您名下支持生存金领取的保单列表",
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },
      // 选择的保单号集合
      policyCodes: [],
      dataList: [
        {
          policyCode: "001"
        },
        {
          policyCode: "002"
        }
      ]
    };
  },
  components: {
    headerT,
    alertContent
  },
  created() {
    this.survivalpaymentList({
      successCallback: res => {
        console.log(res.data);

        this.dataList = res.data;

        console.log(this.dataList[1]);
      },
      fCallback: res => {}
    });
  },

  methods: {
    ...mapActions({
      survivalpaymentList: "survivalpaymentList"
    }),
    checkOne(code) {
      var codeIndex = this.policyCodes.indexOf(code);

      if (codeIndex >= 0) {
        //如果包含了该code，则删除（单选按钮由选中变为非选中状态）
        this.policyCodese.splice(codeIndex, 1);
      } else {
        //选中该按钮
        this.policyCodes.push(code);
        console.log(this.policyCodes);
      }
    },
    confirms() {
      console.log(this.policyCodes);
      if (this.policyCodes.length > 0) {
        this.$router.push({
          path: "/ybtScjlqffzhxx",
          query: {
            policyCodes: this.policyCodes
          }
        });
      } else {
        this.alertCount.isShowAlert = true;
        this.alertCount.alertData = "请选择你要变更的保单！";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.normal-box {
  min-height: 100vh;
  background-color: #efeff4;
  border-radius: 7px 7px 0 0;
  -webkit-border-radius: 7px 7px 0 0;
  .bonus-change-box {
    box-sizing: border-box;
    padding-left: 2.5%;
    padding-right: 2.5%;
    .list-box {
      margin-top: 10px;
      margin-bottom: 10px;
      border: 1px solid #dcdcdc;
      .sq_xz {
        position: relative;
        width: 95%;
        padding-left: 2%;
        padding-right: 3%;
        background: #00ae4d;
        border-radius: 7px 7px 0 0;
        -webkit-border-radius: 7px 7px 0 0;
        color: #fff;
        line-height: 26px;
        ._select {
          position: absolute;
          top: 4px;
          right: 3%;
          input {
            appearance: checkbox;
            outline: 0;
            border: 0;
            width: 20px;
            height: 20px;
            color: #000;
          }
        }
      }
      .list-con {
        width: 94%;
        padding-left: 3%;
        padding-right: 3%;
        padding-top: 5px;
        padding-bottom: 10px;
        background-color: #fff;
        li {
          // display: flex;
          width: 100%;
          line-height: 20px;
          margin-bottom: 5px;
          // .sq_mc1 {width: 40%;}
          .sq_nr {
            // width: 60%;
            font-size: 14px;
            text-align: right;
          }
          &:last-child {
            border: 0;
          }
        }
      }
    }
    .yy_cx {
      margin: 5px auto;
      text-align: center;
      height: 35px;
      line-height: 35px;
      padding: 10px 0px;
      button {
        height: 35px;
        line-height: 35px;
        width: 50%;
        border: none;
        background: #00ae4f;
        border-radius: 7px;
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
.tishi {
  // width: 90%;
  margin: 0 auto;
  color: red;
  background-color: #fff;
  border-radius: 6px;
  font-size: 16px;
  padding: 8px;
  margin-top: 10px;
}
</style>

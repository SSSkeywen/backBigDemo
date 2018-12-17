<template>
  <!-- <div v-if="isShown">
    <headerT :headerContent="headerContent"></headerT>
    <p style="padding:10px;">您没有可做生存金领取的保单！</p>
  </div>-->
  <div>
    <div class="normal-box">
      <headerT :headerContent="headerContent"></headerT>
      <div class="change-info-box">
        <div class="list-box">
          <ul class="bg_content">
            <li class="bg_nr">
              <div class="bg_nrtop">账号所属银行：</div>
              <div class="bg_nrbottom">
                <input
                  class="selgray"
                  type="text"
                  name="bankAccount"
                  v-model="bankAccount"
                  disabled
                >
              </div>
            </li>
            <li class="bg_nr">
              <div class="bg_nrtop">账户类型：</div>
              <div class="bg_nrbottom">
                <input class="selgray" type="text" name="bank_name" v-model="bank_name" disabled>
              </div>
            </li>
            <li class="bg_nr">
              <div class="bg_nrtop">账户所属机构：</div>
              <div class="bg_nrbottom">
                <input class="selgray" type="text" name="userType" v-model="userType" disabled>
              </div>
            </li>
            <li class="bg_nr">
              <div class="bg_nrtop">应付费帐号：</div>
              <div class="bg_nrbottom">
                <div class="bg_nrbottom">
                  <input
                    class="selgray"
                    type="text"
                    name="userHolder"
                    v-model="userNumber"
                    disabled
                  >
                </div>
              </div>
            </li>
            <li class="bg_nr">
              <div class="bg_nrtop">帐号所有人：</div>
              <div class="bg_nrbottom">
                <input
                  class="selgray"
                  :class="{'noclick':toColor}"
                  type="text"
                  name="userHolder"
                  v-model="userHolder"
                  disabled
                >
              </div>
            </li>
          </ul>
        </div>
        <div id="tishi" class="tishi" style="width: 95%;">
          <p>温馨提示：</p>
          <h6>给付账户为您的保险服务密码绑定的账号</h6>
          <!-- <h6>2、帐号所属机构为授权帐号开卡地对应的太平人寿分公司。</h6> -->
          <input type="hidden" name="ZHSYR" value>
          <input type="hidden" name="time" value="2">
        </div>
        <section class="yy_cx">
          <button @click="confirms">确认领取</button>
        </section>
      </div>

      <alertContent :alertCount="alertCount"></alertContent>
      <sendAlrtContent
        v-if="showMsg"
        ref="senAlertContent"
        :codeData="codeData"
        @clolseAlert="clolseAlert"
        @sendCodeFnTwo="sendCodeFnTwo"
        @sendCodeFn="sendCodeFn"
      ></sendAlrtContent>
    </div>
  </div>
</template>

<script>
import headerT from "@/components/header.vue";
import alertContent from "@/components/alertContent.vue";
import sendAlrtContent from "@/components/sendAlrtContent.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      headerContent: "生存金付费账号信息",
      toColor: false,
      openSuc: false,
      isShown: false,
      openError: false,
      organId1: "",
      bankAccount: "",
      bank_name: "",
      codeData: "",
      userType: "",
      userNumber: "",
      userHolder: "请填写所有人真实姓名",
      userOrgan: "",
      accBank: "",
      showMsg: false,
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },

      dataList: [{}, {}]
    };
  },
  components: {
    headerT,
    alertContent,
    sendAlrtContent
  },
  created() {
    var policyCodes = this.$route.query.policyCodes;
    this.getaccount({
      // policyCodes,
      successCallback: res => {
        // console.log(res.data);
        this.bankAccount = res.data.bankName;
        this.bank_name = res.data.accType;
        this.userNumber = res.data.accCode;
        this.userHolder = res.data.accName;
        this.organId1 = res.data.organId;
        this.accBank = res.data.accBank;
        var organId = this.organId1;
        this.getorganname({
          organId,
          successCallback: res => {
            this.userType = res.data;
          },
          fCallback: res => {}
        });
      },
      fCallback: res => {}
    });

    this.existchange({
      policyCodes,
      successCallback: res => {},
      fCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      existchange: "existchange",
      getorganname: "getorganname",
      getaccount: "getaccount",
      apply: "apply"
    }),

    confirms() {
      var policyList = {};
      // zp = {};
      policyList.accBank = this.accBank;
      policyList.accType = this.bank_name;
      policyList.organId = this.organId1;
      policyList.accCode = this.userNumber;
      policyList.accName = this.userHolder;

      this.apply({
        policyList,
        successCallback: res => {
          policyList = JSON.stringify(policyList);
          // console.log(policyList);
          this.$router.push({
            path: "/ybtScjlqffzhxxResult",

            query: {
              policyList: policyList
            }
          });
        },
        fCallback: res => {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.normal-box {
  min-height: 100vh;
  background-color: #efeff4;
  .change-info-box {
    position: relative;
    padding: 10px;
    .list-box {
      .bg_content {
        padding: 13px 13px 10px 13px;
        border: 1px solid #dcdcdc;
        background: #fff;
        border-radius: 6px;
        width: 91%;
        margin: 0 auto;
        li {
          .bg_nrtop {
            width: 100%;
            line-height: 26px;
            font-size: 14px;
          }
          .bg_nrbottom {
            font-size: 14px;

            input {
              background-color: #fff;
              padding: 3px;
              width: 96%;
              border: 1px solid rgba(0, 0, 0, 0.3);
              border-radius: 5px;
              box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
              color: #000;
              &:disabled {
                background-color: #fff;
                border: 1px solid rgba(0, 0, 0, 0.3);
                color: #aaa;
                &.noclick {
                  color: #000;
                }
              }
            }
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

// 结果页面
.tk_pw_css {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #fff;
  top: 0;
  .nav_top {
    padding-top: 10%;
    width: 100%;
    text-align: center;
    img {
      display: inline-block;
      width: 75px;
      height: 75px;
    }
  }
  .nav_content2 {
    width: 90%;
    margin: 0 auto;
    p {
      width: 100%;
      line-height: 50px;
      text-align: center;
      display: inline-block;
      font-size: 18px;
      color: #000;
    }
    span {
      width: 88%;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      margin: 0 6%;
      min-height: 50px;
      color: #666;
    }
  }
  .nav_btn {
    width: 100%;
    height: 36px;
    line-height: 36px;
    a {
      button {
        width: 90%;
        height: 36px;
        border: 0px;
        margin: 0 5%;
        background: #04be01;
        color: #fff;
        border-radius: 5px;
        font-size: 16px;
      }
    }
  }
}
.tishi {
  width: 90%;
  margin: 0 auto;
  color: red;
  background-color: #fff;
  border-radius: 6px;
  font-size: 16px;
  padding: 8px;
  margin-top: 10px;
}
</style>

<template>
  <div class="me-box">
    <div class="me-title">
      <img :src="titleimgOne" alt>
    </div>
    <div v-for="(item,index) in contentListsOne" :key="index">
      <div class="me-min-title" v-if="item.titleName">
        <div :class="item.titleLineStyle"></div>
        <p v-html="item.titleName"></p>
      </div>
      <div class="me-content-list">
        <ul>
          <li
            :class="itemTwo.selectLineStyle"
            v-for="(itemTwo,indexTwo) in item.selectLists"
            :key="indexTwo"
            @click="jumpPage(itemTwo.selectPath,itemTwo.isPassword)"
          >
            <div class="me-content-list-img">
              <img :src="itemTwo.selectIcon" alt>
            </div>
            <p v-html="itemTwo.selectName"></p>
          </li>
        </ul>
      </div>
    </div>
    <div class="me-title">
      <img :src="titleimgTwo" alt>
    </div>
    <div v-for="(item,index) in contentLists" :key="index+'0'">
      <div class="me-min-title" :class="item.paddingTop" v-if="item.titleName">
        <div :class="item.titleLineStyle"></div>
        <p v-html="item.titleName"></p>
      </div>
      <div class="me-content-list">
        <ul>
          <li
            :class="itemTwo.selectLineStyle"
            v-for="(itemTwo,indexTwo) in item.selectLists"
            :key="indexTwo"
            @click="jumpPage(itemTwo.selectPath,itemTwo.isPassword)"
          >
            <div class="me-content-list-img">
              <img :src="itemTwo.selectIcon" alt>
            </div>
            <p v-html="itemTwo.selectName"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { config } from "@/config/config.js";
export default {
  data() {
    return {
      newUrl: "",
      titleimgOne: require("@/assets/img/icon_ywbl_02.png"),
      contentListsOne: [
        {
          titleName: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/huizhi.png"),
              selectName: "电子回执/回访",
              selectPath: "/reminded",
              isPassword: "0",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/xuqi.png"),
              selectName: "续期缴费",
              selectPath: "",
              isPassword: "0",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/lipei.png"),
              selectName: "理赔报案",
              selectPath: "/claimReport",
              isPassword: "0",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/suixinyue.png"),
              selectName: "随心约",
              selectPath: "/appointmentIndex",
              isPassword: "0",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/jiebang.png"),
              selectName: "自助解绑",
              isPassword: "0",
              selectPath: "/unbindSelf"
            }
          ]
        }
      ],
      titleimgTwo: require("@/assets/img/icon_ywbl_zp.png"),
      contentLists: [
        {
          titleName: "保险服务密码",
          paddingTop: "padding-top-0",
          selectLists: [
            {
              selectIcon: require("@/assets/img/kaitong.png"),

              selectName: "开通",

              selectPath: "/insure",
              isPassword: "0",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/xiugai.png"),
              selectName: "修改与重设",
              selectPath: "/modifyRest",
              isPassword: "0",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/bangding.png"),
              selectName: "绑定账号变更",
              isPassword: "1",
              selectPath: "binding"
            }
          ]
        },
        {
          titleName: "实时贷",
          titleLineStyle: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/ssd.png"),
              selectName: "实时贷",
              selectPath: "",
              isPassword: "1",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "个人信息变更",
          titleLineStyle: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/shouji.png"),
              selectName: "手机号码",
              selectPath: "/phoneChange",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/mail.png"),
              selectName: "电子邮箱",
              selectPath: "/emilChange",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/jiating.png"),
              selectName: "家庭信息",
              selectPath: "/homeAdressChange",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/danwei.png"),
              selectName: "单位信息",
              selectPath: "/companyAdressChange",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/zjyxqbg.png"),
              selectName: "客户身份证有效期<br>变更",
              selectPath: "/clientCardEntTiemChange",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "交费信息变更",
          titleLineStyle: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/jifei.png"),
              selectName: "缴费账号",
              selectPath: "/paymentAccount",
              isPassword: "1",
              selectLineStyle: ""
            },
            {
              selectIcon: require("@/assets/img/dizhi.png"),
              selectName: "联系地址",
              selectPath: "/contactAddress",
              isPassword: "1",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "保障信息变更",
          titleLineStyle: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/yuyuez.png"),
              selectName: "预约终止",
              selectPath: "/terminateCancelList",
              isPassword: "1",
              selectLineStyle: ""
            },
            {
              selectIcon: require("@/assets/img/jiane.png"),
              selectName: "减额交清",
              selectPath: "/reduceAmountList",
              isPassword: "1",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "保单权益领取",
          titleLineStyle: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/nianjinb.png"),
              selectName: "年金领取频率<br>及年限变更",
              selectPath: "/annuityCollectList",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/hongli.png"),
              selectName: "红利领取",
              selectPath: "/receiveList",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/honglib.png"),
              selectName: "红利领取方式<br>变更",
              selectPath: "/bonusGetWayChange",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/shengcun.png"),
              selectName: "生存金领取",
              selectPath: "/ybtScjlqffzhxxOne",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/shengcunb.png"),
              selectName: "生存金领取方式<br>变更",
              selectPath: "/survivalGetWayChange",
              isPassword: "1",
              selectLineStyle: ""
            },
            {
              selectIcon: require("@/assets/img/honglic.png"),
              selectName: "红利处置方式<br>变更",
              selectPath: "/hlbgPage",
              isPassword: "1",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "保险合同服务",
          titleLineStyle: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/yuqi.png"),
              selectName: "保费逾期未付处<br>理方式变更",
              selectPath: "/overdueWayChange",
              isPassword: "1",
              selectLineStyle: ""
            },
            {
              selectIcon: require("@/assets/img/autopp.png"),
              selectName: "结束自动垫缴",
              selectPath: "/",
              isPassword: "1",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "通知书发送方式变更",
          titleLineStyle: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/xuqiz.png"),
              selectName: "续期缴费成功<br>通知书",
              selectPath: "/billChangeSuccess",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/shixiao.png"),
              selectName: "失效通知书",
              selectPath: "/billLoseEfficacy",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/baodan.png"),
              selectName: "保单年度报告",
              selectPath: "/billYearReport",
              isPassword: "1",
              selectLineStyle: ""
            },
            {
              selectIcon: require("@/assets/img/yomgjiu.png"),
              selectName: "永久失效通知书",
              selectPath: "/billLoseEfficacyEver",
              isPassword: "1",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "万能险专区",
          titleLineStyle: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/wnzhzj.png"),
              selectName: "万能账户追加<br>投资",
              selectPath: "/",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/xzwnzh.png"),
              selectName: "新增万能账户",
              selectPath: "/",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/toUniversal.png"),
              selectName: "万能账户部分<br>领取",
              selectPath: "/",
              isPassword: "1",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "投资连结险专区",
          titleLineStyle: "",
          selectLists: [
            {
              selectIcon: require("@/assets/img/touzi.png"),
              selectName: "投资账户单位<br>转换",
              selectPath: "/invesmentAccountIndex",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/billi.png"),
              selectName: "账户资金比例<br>调整",
              selectPath: "",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/jieshu.png"),
              selectName: "结束保险费假期",
              selectPath: "",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/tlzhzjtz.png"),
              selectName: "投连账户追加<br>投资",
              selectPath: "",
              isPassword: "1",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/img/invest.png"),
              selectName: "投连账户部分<br>领取",
              selectPath: "",
              isPassword: "1",
              selectLineStyle: ""
            }
          ]
        }
      ]
    };
  },
  created() {},
  methods: {
    ...mapActions({
      toBindUserUpdate: "toBindUserUpdate",
      getJumpAddress: "getJumpAddress"
    }),
    jumpPage(pathAddress, isPassword) {
      if (pathAddress == "binding") {
        this.toBindUserUpdateFn();
        return false;
      }
      window.localStorage.setItem('pathAddress',pathAddress)
      let isBinding = JSON.parse(window.localStorage.getItem("isBinding"));
      if (isBinding == "1") {
        if (isPassword == "1") {
          let newAddress ="transitionPage"
          this.getJumpAddress({
            newAddress,
            successCallback: res => {
              window.localStorage.setItem('goBack','1')
              window.location.href = res;
            },
            failCallback: res => {}
          });
        } else {
          this.$router.push({ path: pathAddress });
        }
      } else {
        this.$router.push({
          path: "/userInfo",
          query: { pathAddress: pathAddress,isPassword:isPassword }
        });
      }
    },
    toBindUserUpdateFn() {
      // 绑定账号变更跳转
      this.toBindUserUpdate({
        successCallback: res => {
          console.log(res.data);
          var link = res.data;
          window.location.href = link;
        },
        failCallback: res => {
          if (res.code == 2002) {
            this.$router.push({
              path: "/userInfo",
              query: { pathAddress: "/unbindSelf" }
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.me-box {
  background-color: #fafafa;
  padding-bottom: 0.5rem;
}
.me-title {
  padding: 0.36rem 0;
  img {
    height: 0.98rem;
  }
}
.me-min-title {
  display: flex;
  padding: 0.29rem 0.15rem 0.1rem;
  div {
    width: 0.1rem;
    height: 0.33rem;
    background: rgba(42, 187, 24, 1);
    margin-right: 0.11rem;
  }
  p {
    font-size: 0.3rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(57, 57, 60, 1);
    line-height: 0.33rem;
  }
}
.me-content-list {
  background-color: #fff;
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      display: flex;
      color: rgba(102, 102, 102, 1);
      font-size: 0.26rem;
      padding: 0.38rem 0.3rem 0.35rem;
      height: 1.14rem;
      box-sizing: border-box;
      align-items: center;
      position: relative;
      .me-content-list-img {
        width: 0.48rem;
        height: 0.48rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        max-width: 2.2rem;
        line-height: 0.3rem;
        margin-left: 0.28rem;
      }
    }
    li:nth-of-type(2n + 1)::before {
      content: " ";
      position: absolute;
      top: 0;
      right: -1px;
      width: 1px;
      border-right: 1px solid #dedede;
      color: #dedede;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleX(0.5);
      transform: scaleX(0.5);
      z-index: 2;
      height: 100%;
    }
  }
}

//@at-roo
.line-down-me {
  position: relative;
}
.line-down-me::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: -2px;
  right: 0;
  height: 1px;
  border-top: 1px solid #dedede;
  color: #dedede;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.me-min-title {
  .red-bg {
    background: #f15d5d;
  }
  .blue-bg {
    background: #2ab2ff;
  }
}
.padding-top-0 {
  padding-top: 0;
}
</style>
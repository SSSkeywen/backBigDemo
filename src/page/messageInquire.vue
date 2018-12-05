<template>
    <div class="me-box">
        <div class="me-title">
            <img :src="titleimg" alt="">
        </div>
        <div v-for="(item,index) in contentLists" :key="index">
            <div class="me-min-title" v-if="item.titleName">
                <div :class="item.titleLineStyle"></div>
                <p v-html="item.titleName"></p>
            </div>
            <div class="me-content-list">
                <!-- <table border="0" cellspacing="0" cellpadding="0"> -->
                    <ul>
                        <li :class="itemTwo.selectLineStyle" v-for="(itemTwo,indexTwo) in item.selectLists" :key="indexTwo" @click="jumpPage(itemTwo.selectPath)">
                            <div class="me-content-list-img">
                                <img :src="itemTwo.selectIcon" alt="">
                            </div>
                            <p v-html="itemTwo.selectName"></p>
                        </li>
                    </ul>
                <!-- </table> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      titleimg: require("@/assets/images/cioncx_02.png"),
      clientMsg:{},
      contentLists: [
        {
          titleName: "",
          selectLists: [
            {
              selectIcon: require("@/assets/images/icon_03.png"),
              selectName: "保单基本信息",
              selectPath: "/myGuaranteeSlip",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/cioncx_09.png"),
              selectName: "保全变更记录",
              selectPath: "/changeList",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/icon_tb.png"),
              selectName: "投保进程查询",
              selectPath: "/insureProgress"
            }
          ]
        },
        {
          titleName: "账户",
          titleLineStyle:"red-bg",
          selectLists: [
            {
              selectIcon: require("@/assets/images/cioncx_17.png"),
              selectName: "万能账户",
              selectPath: "/universal",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/cioncx_14.png"),
              selectName: "分红账户",
              selectPath: "/dividend",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/cioncx_25.png"),
              selectName: "贷款账户",
              selectPath: "/loans",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/cioncx_22.png"),
              selectName: "投连账户",
              selectPath: "/unitLinked",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/sc.png"),
              selectName: "生存金账户",
              selectPath: "/survival",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "理赔",
          titleLineStyle:"",
          selectLists: [
            {
              selectIcon: require("@/assets/images/cioncx_32.png"),
              selectName: "理赔流程",
              selectPath: "/toLiucheng",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/cioncx_30.png"),
              selectName: "索赔材料",
              selectPath: "/toZliao",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/cioncx_38.png"),
              selectName: "理赔问答",
              selectPath: "/toWenda",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/cioncx_36.png"),
              selectName: "案件进度",
              selectPath: "/toCasemx",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/cioncx_41.png"),
              selectName: "医院信息",
              selectPath: "/toyiyuancx",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "账单/发票",
          titleLineStyle:"blue-bg",
          selectLists: [
            {
              selectIcon: require("@/assets/images/icon_new.png"),
              selectName: "首期账单查询",
              selectPath: "/sqzdMessage",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/icon_xz.png"),
              selectName: "续期账单查询",
              selectPath: "/toNewIndex",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/icon_mail.png"),
              selectName: "保全账单查询",
              selectPath: "/saveTheBill",
              selectLineStyle: ""
            },
            {
              selectIcon: require("@/assets/images/icon_lp.png"),
              selectName: "理赔账单查询",
              selectPath: "/settingTheBill",
              selectLineStyle: ""
            }
          ]
        },
        {
          titleName: "信件",
          titleLineStyle:"red-bg",
          selectLists: [
            {
              selectIcon: require("@/assets/images/icon_baodan.png"),
              selectName: "保单年度报告<br>查询",
              selectPath: "/yearReport",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/icon_shixiao.png"),
              selectName: "失效通知书<br>查询",
              selectPath: "/lostNotice",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/icon_yongjiu.png"),
              selectName: "永久失效通知书<br>查询",
              selectPath: "/lostForever",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/icon_zhuanzhang.png"),
              selectName: "转账成功通知书<br>查询",
              selectPath: "/transferSuc",
              selectLineStyle: "line-down-me"
            },
            {
              selectIcon: require("@/assets/images/icon_jifei.png"),
              selectName: "缴费提醒查询",
              selectPath: "/payFees",
              selectLineStyle: ""
            },
            {
              selectIcon: require("@/assets/images/icon_tuixin.png"),
              selectName: "退信查询",
              selectPath: "/bounce",
              selectLineStyle: ""
            }
          ]
        }
      ]
    };
  },
  created(){
    this.clientMsg = JSON.parse(window.localStorage.getItem("clientMsg"));
  },
  methods: {
    jumpPage(pathAddress) {
      console.log(pathAddress);
      // if(this.clientMsg.isBinding!=0){
      //   this.$router.push({ path: '/userInfo',query: {pathAddress: pathAddress} });
      // }else{
        this.$router.push({ path: pathAddress });
      // }
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
      color:rgba(102,102,102,1);
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
  .blue-bg{
    background: #2ab2ff;
  }
}
</style>
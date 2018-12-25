<template>
  <div class="box">
    <header v-if="clientMsg">
      <clientMessage :clientMsg="clientMsg" @scanFn="scanFn"></clientMessage>
    </header>
    <classicNav :navLists="navLists"></classicNav>
    <classicSwiper
      v-if="clientMsg.advertisingResult"
      :swiperImgSrcLists="clientMsg.advertisingResult"
    ></classicSwiper>
    <classicPageList class="message-list" :pageListData="pageListData"></classicPageList>
    <classicPageList class="message-list" :pageListData="pageListDataTwo"></classicPageList>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import clientMessage from "../components/classicComponent/clientMessage";
import classicNav from "../components/classicComponent/classicNav";
import classicSwiper from "../components/classicComponent/classicSwiper";
import classicPageList from "../components/classicComponent/classicPageList";
import alertContent from "../components/alertContent";
import { mapActions } from "vuex";
import { Toast } from "vant";
import { config } from "@/config/config.js";
// import './return_visit.js';
export default {
  data() {
    return {
      clientMsg: {
        authorizationMap: {
          headimgurl: ""
        },
        customer: {
          name: ""
        }
      },
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      },
      authorizationMap: {},
      navLists: [
        {
          navIcon: require("@/assets/classicImg/icon01.png"),
          navTitle: "我的保单",
          navPath: "/myGuaranteeSlip"
        },
        {
          navIcon: require("@/assets/classicImg/icon02.png"),
          navTitle: "热卖万能",
          navPath: "/universal"
        },
        {
          navIcon: require("@/assets/classicImg/icon03@huizhi.png"),
          navTitle: "回执回访",
          navPath: "/reminded"
        },
        {
          navIcon: require("@/assets/classicImg/icon04@xuqi.png"),
          navTitle: "续期交费",
          navPath: ""
        },
        {
          navIcon: require("@/assets/classicImg/icon05@lipei.png"),
          navTitle: "理赔报案",
          navPath: "/claimReport"
        },
        {
          navIcon: require("@/assets/classicImg/icon06@shishi.png"),
          navTitle: "实时贷",
          navPath: ""
        },
        {
          navIcon: require("@/assets/classicImg/icon07@guimian.png"),
          navTitle: "柜面预约",
          navPath: ""
        },
        {
          navIcon: require("@/assets/classicImg/icon08@dianzi.png"),
          navTitle: "电子保单",
          navPath: ""
        }
      ],
      swiperImgSrcLists: [
        {
          swiperImgSrc: require("@/assets/classicImg/swiperImg.png")
        },
        {
          swiperImgSrc: require("@/assets/classicImg/swiperImg.png")
        },
        {
          swiperImgSrc: require("@/assets/classicImg/swiperImg.png")
        }
      ],
      pageListData: {
        pageTitle: "信息查询",
        allPagePath: "/messageInquire",
        pageLists: [
          {
            pageBg: require("@/assets/classicImg/bg01@yuding.png"),
            pageName: "预订单查询",
            pageIcon: require("@/assets/classicImg/listIcon01@yuding.png"),
            pagePath: ""
          },
          {
            pageBg: require("@/assets/classicImg/bg02@tubao.png"),
            pageName: "投保进程",
            pageIcon: require("@/assets/classicImg/listIcon02@tubao.png"),
            pagePath: "/insureProgress"
          },
          {
            pageBg: require("@/assets/classicImg/bg03@daikuan.png"),
            pageName: "贷款账户",
            pageIcon: require("@/assets/classicImg/listIcon03@daikuan.png"),
            pagePath: "/loanHistory"
          },
          {
            pageBg: require("@/assets/classicImg/bg04@lipei.png"),
            pageName: "理赔流程",
            pageIcon: require("@/assets/classicImg/listIcon04@lipei.png"),
            pagePath: "/toLiucheng"
          }
        ]
      },
      pageListDataTwo: {
        pageTitle: "业务办理",
        allPagePath: "/businessHanding",
        pageLists: [
          {
            pageBg: require("@/assets/classicImg/bg05@zuzhu.png"),
            pageName: "自助解绑",
            pageIcon: require("@/assets/classicImg/listIcon05@zizhu.png"),
            pagePath: "/unbindSelf"
          },
          {
            pageBg: require("@/assets/classicImg/bg06@kaitong.png"),
            pageName: "开通保险<br>服务密码",
            pageIcon: require("@/assets/classicImg/listIcon06@kaitong.png"),
            pagePath: "/insure"
          },
          {
            pageBg: require("@/assets/classicImg/bg07@yuyue.png"),
            pageName: "预约终止",
            pageIcon: require("@/assets/classicImg/listIcon07@yuyue.png"),
            pagePath: "/terminateCancelList",
            isPassword: "1"
          },
          {
            pageBg: require("@/assets/classicImg/bg08@hongli.png"),
            pageName: "红利领取",
            pageIcon: require("@/assets/classicImg/listIcon08@hongli.png"),
            pagePath: "",
            isPassword: "1"
          }
        ]
      },
      wxInformation: ""
    };
  },
  components: {
    clientMessage,
    classicNav,
    classicSwiper,
    classicPageList,
    alertContent
  },
  created() {
    const toast1 = Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 1000
    });
    this.getClientMessage({
      successCallback: result => {
        // console.log(res)
        this.$set(
          this.clientMsg.authorizationMap,
          "headimgurl",
          result.authorizationMap.headimgurl
        );
        this.clientMsg = result;
        // console.log(this.clientMsg)
        // this.authorizationMap = res.data.authorizationMap
        toast1.clear();
      },
      fCallback: res => {
        toast1.clear();
      }
    });

    this.wxConifg({
      successCallback: res => {
        this.wxInformation = res;
        console.log(this.wxInformation);
        wx.config({
          debug: false,
          appId: this.wxInformation.appid,
          timestamp: this.wxInformation.timestamp,
          nonceStr: this.wxInformation.nonce_Str,
          signature: this.wxInformation.signature,
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "chooseImage",
            "uploadImage",
            "scanQRCode"
          ]
        });
        toast1.clear();
      },
      failCallback: res => {
        toast1.clear();
        // if (res.code == 2002) {
        //   this.$router.push({
        //     path: "/userInfo",
        //     query: { pathAddress: "/myGuaranteeSlip" }
        //   });
        // } else {
        //   this.alertCount.isShowAlert = true;
        //   this.alertCount.alertData = res.msg;
        // }
      }
    });
  },
  methods: {
    ...mapActions({
      getClientMessage: "getClientMessage",
      wxConifg: "wxConifg",
      txmscanresultcode: "txmscanresultcode"
    }),

    scanFn() {
      var browser = {
        versions: (function() {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          return {
            //移动终端浏览器版本信息
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
            iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf("iPad") > -1, //是否iPad
            webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
          };
        })(),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase()
      };
      //获得浏览器版本
      var version = "weixinandroid";
      if (browser.versions.android) {
        version = "weixinandroid";
      } else if (browser.versions.iPhone) {
        version = "weixinapple";
      } else if (browser.versions.iPad) {
        version = "weixiniPad";
      }
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          // alert(res);
          var result1 = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          var flag = "Y";
          // alert(result1);
          if (result1.indexOf("http://weixin.qq.com/") != -1) {
            window.location.href =
              "http://mp.weixin.qq.com/s?__biz=MjM5MjgzODAxMQ==&mid=201031424&idx=1&sn=c33099cfb8de6a0442df32c7b351fa77&scene=1&key=d0c8853efb3f9df5a4dd1b4e61c3435ff852824d80cfd8365ccdac514aacc47b5845af42958740651a405140452ab38e&ascene=0&uin=NTI2MTEyMjU%3D&pass_ticket=NsQOHeGIvUv9NAQz3xwdkbQS3%2FwM0IFZedW1Y3Adbis%3D";
          } else {
            //  var data = $TOOLS.ajaxComm("scanQRCode.html",{param:JSON.stringify({str:result1})},"POST", "JSON");
            // param:JSON.stringify({str:result1}),flag:flag,version:version
            let insertrvslData = {
              param: { str: result1 },
              flag: flag,
              version: version
            };
            // let insertrvslData = {param:{str:'2BCdRFoNdJmYBs0bIwekbIskblbHFrirQkmU8XfgMy3Ah3EBhOQ3fbeo2SpTVXtLJpytoM5vOYaXF5CcqGzSxQ=='}, flag:'Y', version:'weixinapple'}
            var tipsData;
            // alert("开始掉后台！");
            this.txmscanresultcode({
              insertrvslData,
              successCallback: res => {
                console.log(res)
                let resultTwo = res.data
                switch (resultTwo.responseCode) {
                  case "0":
                    WeixinJSBridge.call("closeWindow");
                    break;
                  case "1":
                    this.alertCount.isShowAlert = true;
                    this.alertCount.alertData = resultTwo.responseMsg;
                    break;
                  case "3":
                    // window.location.href = "toLogin.html";
                    this.$router.push({
                      path: "/userInfo"
                    });
                    break;
                  //start add by lingjy RS201806575-老康瑞升级客户回访配套支持功能开发（微信95589）
                  //add by lingjy
                  case "9":
                    // window.location.href =config.api_address_url+ "2018/tpRuik/smerror.jsp";
                    tipsData = `<p>二维码识别失败，请重新扫码。</p>
                                <span></span>`;
                    this.$router.push({
                      path: "/userFailPage",
                      query: { tipsData: tipsData }
                    });
                    break;
                  case "11":
                    //alert("客户签收成功，跳转到转介绍客户录入页面");
                    //alert(data);
                    var policyCode = resultTwo.result.policyCode;
                    var agentCode = resultTwo.result.agentCode;
                    window.location.href =
                      config.api_address_url +
                      "oldcus/tointro.html?policyCode=" +
                      policyCode +
                      "&agentCode=" +
                      agentCode; //跳转到签收成功页面
                    break;
                  case "111":
                    //alert("客户签收成功，跳转到转介绍客户录入页面");
                    //alert(data);
                    var policyCode = resultTwo.result.policyCode;
                    var agentCode = resultTwo.result.agentCode;
                    window.location.href =
                      config.api_address_url +
                      "oldcus/tointroyb.html?policyCode=" +
                      policyCode +
                      "&agentCode=" +
                      agentCode; //跳转到签收成功页面
                    break;
                  case "12":
                    //	window.location.href="oldcus/tointro.html?policyCode="+policyCode+"&agentCode="+agentCode;//跳转到签收成功页面

                    // window.location.href =config.api_address_url+ "2018/tpRuik/scanerror.jsp";
                    tipsData = `<p>二维码失败失败</p>
                                <span>二维码失败失败，请重新扫码。</span>`;
                    this.$router.push({
                      path: "/userFailPage",
                      query: { tipsData: tipsData }
                    });

                    break;
                  case "13":
                    // window.location.href = "toLogin.html"; //跳转到登陆页面
                    this.$router.push({
                      path: "/userInfo"
                    });
                    break;
                  case "14": //签收失败
                    // window.location.href =config.api_address_url+ "2018/tpRuik/qserror.jsp";
                    tipsData = `<p>签收失败</p>
        <span>签收失败，请重新操作。</span>`;
                    this.$router.push({
                      path: "/userFailPage",
                      query: { tipsData: tipsData }
                    });
                    break;
                  case "15": //签收失败
                    // window.location.href =config.api_address_url+ "2018/tpRuik/hderror.jsp";
                    tipsData = `保单还未升级，请您先申请升级！`;
                    this.$router.push({
                      path: "/userFailPage",
                      query: { tipsData: tipsData }
                    });
                    break;
                  //end add by lingjy RS201806575-老康瑞升级客户回访配套支持功能开发（微信95589）
                  default:
                    // $(".tsxx").html(resp.msg);
                    // $("#dialog").show();
                    // $(".bg_tk").css("display", "block");
                    // $(".con_tk").css("display", "block");
                    this.alertCount.isShowAlert = true;
                    this.alertCount.alertData = resultTwo.responseMsg;
                    break;
                }
              },
              failCallback: res => {}
            });
          }
        },
        fail: function(res) {}
      });
    },

    myGuaranteeSlip() {
      // this.$router.push({ path: "/messageInquire" });
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  padding-bottom: 0.5rem;
}
.message-list {
  margin-top: 0.55rem;
}
</style>
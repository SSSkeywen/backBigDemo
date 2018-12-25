<template>
  <div>
    <div class="content">
      <div class="bd_tt">功能简介</div>
      <div class="neirong">
        <div class="yzxxlr">
          <div class="yzxxlr_nr">
            <div class="question_radio">
              <p style="width:100%;height:auto;font-size:0.4rem;line-height:0.5rem">
                <em style="font-weight:bold">欢迎您使用回执、回访功能！</em>
                <br>
                <em style="font-size:0.3rem;">
                  <span style="display:block;padding-top:20px;">
                    <em style="font-weight:bold">操作提示：</em>
                  </span>
                  扫描保单上的
                  <i style="font-weight:bold">“保单二维码”</i>开始回执/回访操作
                  <br>
                  <i style="color:red">▲</i>
                  <i style="color:red;font-weight:bold">未绑定</i>的客户，后续将自动进入绑定页面
                  <br>
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="qrbg_btn">
        <div class="reset_div">
          <input
            type="button"
            id="scanQRCode"
            @click="scanQRCode"
            name="scanQRCode"
            class="reget_btn"
            value="下一步"
          >
        </div>
        <div style="clear:both"></div>
      </div>
    </div>
  </div>
</template>

<script>
import clientMessage from "@/components/classicComponent/clientMessage";
import classicNav from "@/components/classicComponent/classicNav";
import classicSwiper from "@/components/classicComponent/classicSwiper";
import classicPageList from "@/components/classicComponent/classicPageList";
import alertContent from "@/components/alertContent";
import { mapActions } from "vuex";
import { Toast } from "vant";
import { config } from "@/config/config.js";
export default {
  components: {
    clientMessage,
    classicNav,
    classicSwiper,
    classicPageList
  },
  data() {
    return {
      key: value
    };
  },
  created() {
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
      },
      failCallback: res => {}
    });
  },
  methods: {
    ...mapActions({
      scanqrcode: "scanqrcode",
      wxConifg: "wxConifg",
      insertrvsl: "insertrvsl"
    }),
    scanQRCode() {
      //判断浏览器的类型及版本
      // var browser={
      //     versions:function(){
      //             var u = navigator.userAgent, app = navigator.appVersion;
      //             return {
      //                 //移动终端浏览器版本信息
      //                 trident: u.indexOf('Trident') > -1, //IE内核
      //                 presto: u.indexOf('Presto') > -1, //opera内核
      //                 webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      //                 gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      //                 mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      //                 ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      //                 android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      //                 iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
      //                 iPad: u.indexOf('iPad') > -1, //是否iPad
      //                 webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      //             };
      //          }(),
      //          language:(navigator.browserLanguage || navigator.language).toLowerCase()
      // }
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          var result1 = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          if (result1 == null || result1 == undefined || this.needResult == 0) {
            var systemInfo = navigator.userAgent;
            // $TOOLS.ajaxComm("rvsl/insertRVSL.html", {systemInfo:systemInfo,wflag:'1',returnMsg:JSON.stringify(res)}, "POST", "JSON");
            let insertrvslData = {
              systemInfo: systemInfo,
              wflag: "1",
              returnMsg: res
            };
            this.insertrvsl({
              insertrvslData,
              successCallback: res => {}
            });
            //alert("扫码成功@@@@"+result1+"||||"+this.needResult);
            return;
          }
          if (result1.indexOf("http://weixin.qq.com/") != -1) {
            window.location.href =
              "http://mp.weixin.qq.com/s?__biz=MjM5MjgzODAxMQ==&mid=201031424&idx=1&sn=c33099cfb8de6a0442df32c7b351fa77&scene=1&key=d0c8853efb3f9df5a4dd1b4e61c3435ff852824d80cfd8365ccdac514aacc47b5845af42958740651a405140452ab38e&ascene=0&uin=NTI2MTEyMjU%3D&pass_ticket=NsQOHeGIvUv9NAQz3xwdkbQS3%2FwM0IFZedW1Y3Adbis%3D";
          } else {
            // var data = $TOOLS.ajaxComm(
            //   "scanQRCode.html",
            //   { param: JSON.stringify({ str: result1 }) },
            //   "POST",
            //   "JSON"
            // );
            var tipsData;
            let scanqrcodeData = { param: { str: result1 } }
            this.scanqrcode({
              scanqrcodeData,
              successCallback: res => {
                let data = res.data
            switch (data.responseCode) {
              case "0":
                WeixinJSBridge.call("closeWindow");
                //alert(result);
                break;
              //add by lingjy
              case "9":
                // window.location.href = "2018/tpRuik/smerror.jsp";
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
                var policyCode = data.result.policyCode;
                var agentCode = data.result.agentCode;
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
                var policyCode = data.result.policyCode;
                var agentCode = data.result.agentCode;
                window.location.href =
                config.api_address_url +
                  "oldcus/tointroyb.html?policyCode=" +
                  policyCode +
                  "&agentCode=" +
                  agentCode; //跳转到签收成功页面

                break;
              case "12":
                // window.location.href = "2018/tpRuik/scanerror.jsp";

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
                // window.location.href = "2018/tpRuik/qserror.jsp";
                tipsData = `<p>签收失败</p>
        <span>签收失败，请重新操作。</span>`;
                    this.$router.push({
                      path: "/userFailPage",
                      query: { tipsData: tipsData }
                    });
                break;

              case "15": //签收失败
                // window.location.href = "2018/tpRuik/hderror.jsp";
                tipsData = `保单还未升级，请您先申请升级！`;
                    this.$router.push({
                      path: "/userFailPage",
                      query: { tipsData: tipsData }
                    });
                break;
              //end add by lingjy RS201806575-老康瑞升级客户回访配套支持功能开发（微信95589）
              default:
                // $("div.con_tk2")
                //   .find("p[name='msg']")
                //   .html(data.msg);
                // $("div.bg_tk2").show();
                // $("div.con_tk2").show();
                this.alertCount.isShowAlert = true;
                    this.alertCount.alertData = resultTwo.responseMsg;
                break;
            }
            }
            });
          }
        },
        fail: function(res) {
          var systemInfo = navigator.userAgent;
          // $TOOLS.ajaxComm(
          //   "rvsl/insertRVSL.html",
          //   {
          //     systemInfo: systemInfo,
          //     wflag: "2",
          //     returnMsg: JSON.stringify(res)
          //   },
          //   "POST",
          //   "JSON"
          // );
           var systemInfo = navigator.userAgent;
            // $TOOLS.ajaxComm("rvsl/insertRVSL.html", {systemInfo:systemInfo,wflag:'1',returnMsg:JSON.stringify(res)}, "POST", "JSON");
            let insertrvslData = {
              systemInfo: systemInfo,
              wflag: "2",
              returnMsg: JSON.stringify(res)
            };
            this.insertrvsl({
              insertrvslData,
              successCallback: res => {}
            });
          //alert("扫码失败@@@@"+result1+"||||"+this.needResult);
        }
      });
    }
  }
};
</script>

<style scoped>
.content {
  padding: 20px 10px 30px;
}
.bd_tt {
  text-align: center;
  font-size: 22px;
  padding: 0 0 20px;
}
.neirong {
  padding: 10px 8px 0;
  border: 1px solid #cdcbcb;
  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3) /*firefox*/;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3) /*webkit*/;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
}
.yzxxlr {
  padding-top: 10px;
  overflow: hidden;
}
.yzxxlr_nr {
  padding-bottom: 20px;
  overflow: hidden;
}
.question_radio {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 15px;
  font-size: 18px;
}
.question_radio p {
  height: 36px;
  line-height: 36px;
  padding: 8px 0;
}

.qrbg_btn {
  margin-top: 30px;
}
.reset_div {
  margin-bottom: 20px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3) /*firefox*/;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3) /*webkit*/;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
}
.reget_btn {
  font-family: "微软雅黑";
  font-size: 22px;
  color: #fff;
  width: 100%;
  height: 35px;
  line-height: 35px;
  cursor: pointer;
  background: #00ac0c;
  border: 1px solid #8f8f8f;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -moz-box-shadow: inset 0px 0px 10px 0px rgba(255, 255, 255, 0.8) /*firefox*/;
  -webkit-box-shadow: inset 0px 0px 10px 0px rgba(255, 255, 255, 0.8) /*webkit*/;
  box-shadow: inset 0px 0px 10px 0px rgba(255, 255, 255, 0.8);
}
</style>
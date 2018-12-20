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
  </div>
</template>

<script>
import clientMessage from "../components/classicComponent/clientMessage";
import classicNav from "../components/classicComponent/classicNav";
import classicSwiper from "../components/classicComponent/classicSwiper";
import classicPageList from "../components/classicComponent/classicPageList";
import { mapActions } from "vuex";
import { Toast } from "vant";
import { config } from "@/config/config.js";
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
          navPath: ""
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
            isPassword:'1'
          },
          {
            pageBg: require("@/assets/classicImg/bg08@hongli.png"),
            pageName: "红利领取",
            pageIcon: require("@/assets/classicImg/listIcon08@hongli.png"),
            pagePath: "",
            isPassword:'1'
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
    classicPageList
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
          jsApiList: ["chooseImage", "uploadImage"]
        });
        toast1.clear();
      },
      failCallback: res => {
        if (res.code == 2002) {
          this.$router.push({
            path: "/userInfo",
            query: { pathAddress: "/myGuaranteeSlip" }
          });
        } else {
          this.alertCount.isShowAlert = true;
          this.alertCount.alertData = res.msg;
        }
        toast1.clear();
      }
    });
  },
  methods: {
    ...mapActions({
      getClientMessage: "getClientMessage",
      wxConifg: "wxConifg"
    }),

    scanFn(){
        alert(111)
        wx.scanQRCode({
            debug:true,
	    	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	    	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	    	    success: (res) => {
                var result1 = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                

                return false

	    	    if(result1==null||result1==undefined||this.needResult==0){
	    	    	var systemInfo=navigator.userAgent;
	        	    $TOOLS.ajaxComm("rvsl/insertRVSL.html", {systemInfo:systemInfo,wflag:'1',returnMsg:JSON.stringify(res)}, "POST", "JSON");
				//alert("扫码成功@@@@"+result1+"||||"+this.needResult);
				return;
				}
				if(result1.indexOf("http://weixin.qq.com/")!=-1){
					window.location.href="http://mp.weixin.qq.com/s?__biz=MjM5MjgzODAxMQ==&mid=201031424&idx=1&sn=c33099cfb8de6a0442df32c7b351fa77&scene=1&key=d0c8853efb3f9df5a4dd1b4e61c3435ff852824d80cfd8365ccdac514aacc47b5845af42958740651a405140452ab38e&ascene=0&uin=NTI2MTEyMjU%3D&pass_ticket=NsQOHeGIvUv9NAQz3xwdkbQS3%2FwM0IFZedW1Y3Adbis%3D";
					}else{
						//  var data = $TOOLS.ajaxComm("scanQRCode.html",{param:JSON.stringify({str:result1})},"POST", "JSON");
						  
						 switch (data.responseCode) {
						   	  case "0":
						   	  	// WeixinJSBridge.call('closeWindow');
						   	  	//alert(result);
						   		break;
						   	//add by lingjy
						   	  	case "9":
						   	  	// window.location.href="2018/tpRuik/smerror.jsp";
						   		  break;
							  	case "11":
							   		//alert("客户签收成功，跳转到转介绍客户录入页面");
							   		//alert(data);
							   		// var policyCode = data.result.policyCode;
							   		// var agentCode = data.result.agentCode;
							   		// window.location.href="oldcus/tointro.html?policyCode="+policyCode+"&agentCode="+agentCode;//跳转到签收成功页面
							   	  	
							   	 break;
							  	case "111":
							   		//alert("客户签收成功，跳转到转介绍客户录入页面");
							   		//alert(data);
							   		// var policyCode = data.result.policyCode;
							   		// var agentCode = data.result.agentCode;
							   		// window.location.href="oldcus/tointroyb.html?policyCode="+policyCode+"&agentCode="+agentCode;//跳转到签收成功页面
							   	  	
							   	 break;
							   	case "12":
							   	//	window.location.href="oldcus/tointro.html?policyCode="+policyCode+"&agentCode="+agentCode;//跳转到签收成功页面
							   	  	
							   		// window.location.href="2018/tpRuik/scanerror.jsp";
// 							   		$("div#dialog").find("div[name='msg']").text(data.msg);
// 							   		$("div#dialog").show();
							   	  //	WeixinJSBridge.call('closeWindow');
							   	  //	alert("签收客户与保单客户不匹配");
							   	 break;
							   	case "13":
							   		// window.location.href="toLogin.html";//跳转到登陆页面
							   		break;
							 	case "14"://签收失败
								// window.location.href="2018/tpRuik/qserror.jsp";
							   		break;
							   		
							 	case "15"://签收失败
									// window.location.href="2018/tpRuik/hderror.jsp";
								   	// 	break;
							   		//end add by lingjy RS201806575-老康瑞升级客户回访配套支持功能开发（微信95589）
						   	  default:
						   		// $("div.con_tk2").find("p[name='msg']").html(data.msg);
					        	// $("div.bg_tk2").show();
					        	// $("div.con_tk2").show();
						   		break;
						   	}
						}
	    	},
			fail: function(res){
	    		// var systemInfo=navigator.userAgent;
        	    // $TOOLS.ajaxComm("rvsl/insertRVSL.html", {systemInfo:systemInfo,wflag:'2',returnMsg:JSON.stringify(res)}, "POST", "JSON");
	  		}
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
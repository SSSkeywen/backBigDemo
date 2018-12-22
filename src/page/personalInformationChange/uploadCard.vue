<template>
  <div id="bqContent">
    <section class="uc-box">
      <div class="uc-img" @click="clickChooseImage(1)">
        <img :src="cardOne" width="100%" class="uploadImg" id="uploadImg1">
      </div>
      <div class="uc-img" @click="clickChooseImage(2)">
        <img :src="cardTwo" width="100%" class="uploadImg" id="uploadImg2">
      </div>
      <p class="uc-font">上传证件照片要求</p>
      <div class="uc-img-list">
        <img :src="cardList" width="100%">
      </div>
      <p class="uc-tips">
        证件识别结果
        <span>（注：请确认证件识别结果准确后，再点击【确认变 更】按钮，变更身份证有效期）</span>
      </p>
    </section>
    <section class="bq-box-style end-box">
      <ul v-for="(item, index) in contentList" :key="index">
        <li>
          <p>姓名</p>
          <p v-text="item.bdContent"></p>
        </li>
        <li>
          <p>证件号码</p>
          <p v-text="item.cardNo"></p>
        </li>
        <li>
          <p>证件有效期</p>
          <p v-text="item.enterTime"></p>
        </li>
        <li class="line">
          <p>&nbsp;</p>
          <div class="uc-btn-list">
            <p @click="bgFn1()">
              <button :disabled="isStar" id="starBtn" class="style-click">开始识别</button>
            </p>
            <p @click="bgFn2()">
              <button
                :class="item.btnStyle"
                class="style-click"
                :disabled="item.isdisabled"
                id="choosebtn"
              >选择变更</button>
            </p>
          </div>
        </li>
      </ul>
    </section>
    <transition name="fade">
      <div class="tips-style" v-if="isShowTips">
        <p v-text="tipsContent"></p>
      </div>
    </transition>
    <section class="tips-two" id="yes_no" v-show="isYesOrNo" style="display: none;">
      <div class="tips-content">
        <div class="tips-font line-down">
          <p class="p-one" style="word-wrap: break-word;"></p>
          <p class="p-two">请确认证件信息识别结果准确后再进行变更！</p>
        </div>
        <div class="tips-btn">
          <div class="line-right" @click="bgFn3()">
            <button class="style-click" id="no">暂不变更</button>
          </div>
          <div @click="bgFn4()">
            <button class="style-click click_yes" id="yes">现在变更</button>
          </div>
        </div>
      </div>
    </section>
    <section class="error-style" v-show="isShowError" style="display: none;" id="tips">
      <div class="error-content">
        <img :src="xitongyichang" width="100%">
        <p class="error-font" id="ermsg">{{tipsData}}</p>
        <div class="error-btn">
          <button class="style-click" @click="IKnow">知道了</button>
        </div>
      </div>
    </section>
    <!--加载弹出框内容-->
    <div id="zfqr_jiaz" class="zfqr_jiaz" style="display:none">
      <div class="zfqr_nr">
        <img :src="Minimal" width="44" height="44">
        <br>正在加载...
      </div>
    </div>
  </div>
</template>

<script>
// import headerT from "../../components/header.vue";
// import btnComponent from "../../components/btnComponent.vue";
// import alertContent from "../../components/alertContent";
// import yesAndNoAlert from "../../components/yesAndNoAlert";
// import notToOpenComponent from "../../components/notToOpenComponent.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      cardOne: require("@/assets/upLoadImg/cardOne.png"),
      cardTwo: require("@/assets/upLoadImg/cardTwo.png"),
      cardList: require("@/assets/upLoadImg/cardList.png"),
      xitongyichang: require("@/assets/upLoadImg/xitongyichang.png"),
      Minimal: require("@/assets/upLoadImg/Minimal.png"),
      selectAll: true,
      isShowTips: false,
      isShowError: false,
      isYesOrNo: false,
      isStar: false,
      serverId1: "",
      serverId2: "",
      tipsData: "",
      contentList: [
        {
          selectTrue: true,
          bdContent: "",
          cardNo: "",
          enterTime: "",
          btnStyle: "btnStyle"
        }
      ],
      tipsContent: "对不起，请选择保单做变更投资分配比例",
      wxInformation: ""
    };
  },
  created() {
    const toast1 = Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 0
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
      wxConifg: "wxConifg",
      getEndTime: "getEndTime",
      changeClientMessage: "changeClientMessage",
    }),
    bgFn(index) {
      console.log(this.contentList[index]);
      // window.location.href = './endbxPageTwo.html'
    },

    IKnow() {
      this.tipsData = "";
      this.isShowError = false;
    },

    clickChooseImage(index) {
      console.log("拍照");

      wx.ready(() => {
        wx.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: res => {
            if (index == 1) {
              this.cardOne = res.localIds;
              this.upload(1, res.localIds);
            } else {
              this.cardTwo = res.localIds;
              this.upload(2, res.localIds);
            }
            // this.images.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            // this.imgCameraSrc = res.localIds;
          },
          fail: res => {
            // Toast("拍摄照片失败，请重新再试！");
            this.tipsContent = "尊敬的用户，数据请求失败，请刷新后重试!";
            this.showTipsFn();
          }
        });
      });
    },
    upload(i, localId) {
      wx.uploadImage({
        localId: localId.toString(),
        isShowProgressTips: 1,
        success: res => {
          if (i == 1) {
            this.serverId1 = res.serverId;
          } else if (i == 2) {
            this.serverId2 = res.serverId;
          }
        },
        fail: function(res) {
          Toast("照片上传失败，请刷新重试！");
          //  this.showTipsFn();
        }
      });
    },

    //开始识别
    bgFn1() {
      // if (this.serverId1 == "" && this.serverId2 == "") {
      //   this.tipsContent = "请分别上传身份证的正、反面照片！";
      //   this.showTipsFn();
      //   return false;
      // }
      // alert(this.serverId1);
      // alert(this.serverId2);
      // this.serverId1 =
      //   "y2Re3I3HIcYg0I9x9WVWZ6onhGeNexVK5J54lCfTxHcODRrnk1u2_WR-659saI4K";
      // this.serverId2 =
      //   "lWyoGFyNGuGCvWzEeclnSs6aJHwRlRaITabzix7pEzG6MuhpvqXYoJIgCVpn6Yss";
      const toast1 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      let serverIdList = {
        serverId1: this.serverId1,
        serverId2: this.serverId2
      };
      this.getEndTime({
        serverIdList,
        successCallback: res => {
          console.log(res);
          let dataOne = res.data;
          console.log(dataOne);
          this.contentList[0].chooseName = dataOne.chooseName;
          this.contentList[0].chooseCertcode = dataOne.chooseCertcode;
          this.contentList[0].bdContent = dataOne.name;
          this.contentList[0].cardNo = dataOne.cardNum;
          this.contentList[0].enterTime =
            dataOne.issue + "至" + dataOne.validityto;
          this.contentList[0].startTime = dataOne.issue;
          this.contentList[0].endTime = dataOne.validityto;
          this.contentList[0].btnStyle = "";
          this.contentList[0].isdisabled = false;
          toast1.clear();
        },
        failCallback: res => {
          this.tipsContent = res;
          this.showTipsFn();
          // this.tipsData =res
        // this.isShowError = true;
          toast1.clear();
        }
      });
    },

    bgFn2() {
      this.isYesOrNo = true;
    },

    bgFn3() {
      this.$router.push({
        path: "/"
      });
    },

    bgFn4() {
      this.isYesOrNo = false;
      if (
        this.contentList[0].bdContent == "" ||
        this.contentList[0].bdContent == undefined ||
        this.contentList[0].startTime == "" ||
        this.contentList[0].startTime == undefined ||
        this.contentList[0].cardNo == "" ||
        this.contentList[0].cardNo == undefined ||
        this.contentList[0].endTime == "" ||
        this.contentList[0].endTime == undefined
      ) {
        this.tipsData =
          "您提供的身份证照片不完整或者图像不合标准，请重新上传！";
        this.isShowError = true;
        return false;
      }

      var mydate = new Date();
      var str = "" + mydate.getFullYear() + "-";
      str += mydate.getMonth() + 1 + "-";
      str += mydate.getDate();
      var date = new Date(str.replace("-", "/").replace("-", "/"));
      var startTime = new Date(
        this.contentList[0].startTime.replace("-", "/").replace("-", "/")
      );
      var endTime = new Date(
        this.contentList[0].endTime.replace("-", "/").replace("-", "/")
      );
      if (startTime > date) {
        this.tipsData = "证件有效起期大于当前时间，请确认！";
        this.isShowError = true;
        return;
      }
      if (endTime < date) {
        this.tipsData = "证件有效止期小于当前时间，请确认！";
        this.isShowError = true;
        return;
      }

      if (
        this.contentList[0].chooseName != this.contentList[0].bdContent ||
        this.contentList[0].chooseCertcode != this.contentList[0].cardNo
      ) {
        this.tipsData =
          "客户身份信息与系统留存信息不一致，请至公司柜面操作该项目！";
        this.isShowError = true;
        return;
      } else {
        let toast2 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
        let changeTimeDate = {
          iCStartTime: this.contentList[0].startTime,
          iCEndTime: this.contentList[0].endTime
        };
        console.log(changeTimeDate)
        this.changeClientMessage({
        changeTimeDate,
        successCallback: result => {
          let tipsData = result;
              this.$router.push({
                path: "/successPageChange",
                query: { tipsData:tipsData }
              });
          toast2.clear();
        },
        failCallback: res => {
          this.tipsData = res;
          this.isShowError = true;
          toast2.clear();
        }
      });
        // var data = $TOOLS.ajaxComm(
        //   "doSubmit.html",
        //   {
        //     startDate: this.contentList[0].startTime,
        //     endDate: this.contentList[0].endTime
        //   },
        //   "POST",
        //   "JSON"
        // );
        // switch (data.responseCode) {
        //   case "0":
        //     // window.location.href = 'gotoChangResultPage.html'

        //     break;
        //   default:
        //     this.tipsData = data.msg;
        //     this.isShowError = true;
        //     break;
        // }
      }
    },

    showTipsFn() {
      this.isShowTips = true;
      setTimeout(() => {
        this.isShowTips = false;
      }, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(./css/style.css);
.end-box ul li p button.btnStyle {
  border: 1px solid rgba(153, 153, 153, 1);
  color: rgba(153, 153, 153, 1);
}
</style>
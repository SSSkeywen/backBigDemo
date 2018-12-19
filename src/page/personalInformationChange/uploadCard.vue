<template>
  <div id="bqContent">
    <section class="uc-box">
      <div class="uc-img" @click="clickChooseImage">
        <img :src="cardOne" width="100%" class="uploadImg" id="uploadImg1">
      </div>
      <div class="uc-img">
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
              <button id="starBtn" class="style-click">开始识别</button>
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
    <section class="tips-two" id="yes_no" style="display: none;">
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
        <p class="error-font" id="ermsg"></p>
        <div class="error-btn">
          <button class="style-click" id="IKnow">知道了</button>
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
      contentList: [
        {
          selectTrue: true,
          bdContent: "张三",
          cardNo: "340826********6207",
          enterTime: "至2029-01-01",
          btnStyle: "btnStyle"
        }
      ],
      tipsContent: "对不起，请选择保单做变更投资分配比例",
      wxInformation:''
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
        console.log(this.wxInformation)
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
      wxConifg: "wxConifg"
      // isClientCardChange: "isClientCardChange"
    }),
    bgFn(index) {
      console.log(this.contentList[index]);
      // window.location.href = './endbxPageTwo.html'
    },

    clickChooseImage(){
				console.log("拍照")

				wx.ready(()=> {
					wx.chooseImage({
						count: 1, 
						sizeType: [ 'compressed'],
						sourceType: ['camera'], 
						success: (res)=> {
							this.images.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							this.imgCameraSrc = res.localIds;
						},
						fail: (res)=>{
							Toast("拍摄照片失败，请重新再试！");
						}
					});
				});
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
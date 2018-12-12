<template>
    <div class="alert-box">
        <div class="alert-content">
            <p class="alert-font">短信验证码将发送至您尾号为<span style="color:blue">{{pnoneBack}}</span>的手机，5分钟内有效，请点击获取，请查收！（每日最多五次）</p>
            <div class="alert-input">
                <div class="alert-left">
                    <input v-model="codeData" style="text-align:center;" type="text" placeholder="请输入验证码">
                </div>
                <div class="alert-send">
                    <button class="style-click" :class="isSendBtn?'send-click':''" :disabled="isSendBtn" @click="getCodeFn">{{btnContent}}</button>
                </div>
            </div>
            <div class="line-down" style="height:0.4rem;">
              <p v-if="isWorngData" style="line-height:0.4rem;color:red;font-size:12px;padding:0 5%;">{{worngData}}</p>
            </div>
            
            <div class="alert-btn">
                <div class="line-right">
                    <button class="style-click" @click="colseAlertFn">取消</button>
                </div>
                <div>
                    <button style="    color: #54ce55;" class="style-click" @click="sureSend">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tipsImgSrc: require("@/assets/publicImg/icon_3.jpg"),
      btnContent:'获取验证码',
      isSendBtn: false,
      codeData:'',
      worngData:'',
      isWorngData:false,
      // pnoneBack:''
    };
  },
  props:['pnoneBack'],
  methods: {
    getCodeFn() {
      this.isSendBtn = true;
      this.miuFnOne(120);

      setTimeout(() => {
        this.btnContent = "获取验证码";
        this.isSendBtn = false;
      }, 120000);
      this.$emit('sendCodeFn')
    },
    inputCode(code){
      this.codeData = code
    },

    isCodeWrongFn(msg){
      // console.log(1111)
      this.worngData = msg||'验证码输入错误！'
      this.isWorngData = true
    },

    sureSend() {
      if(this.codeData == ''){
        this.worngData = '验证码不能为空！'
        this.isWorngData = true
        return false
      }
      this.$emit('sendCodeFnTwo',this.codeData)
    },

    colseAlertFn(){
      this.$emit('clolseAlert')
    },

    miuFnOne(miu) {
      let miuFn = setTimeout(() => {
        miu--;
        this.btnContent = "" + miu + "s后重发";
        if (miu == 1) {
          return false;
        }
        this.miuFnOne(miu);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.alert-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  .alert-content {
    background-color: #fff;
    width: 90%;
    border-radius: 7px;
    overflow: hidden;
    font-size: 0.32rem;
    .alert-font {
      line-height: 0.48rem;
      text-align: justify;
      color: #666;
      padding: 0.2rem 5%;
      font-size: 0.32rem;
    }
    .alert-input {
      display: flex;
      justify-content: space-between;
      padding: 0 5% 0rem;
      .alert-left {
        width: 45%;
        input {
          width: 100%;
          border: 1px solid #dedede;
          border-radius: 7px;
          height: 0.72rem;
          padding: 3px;
          font-size: 0.3rem;
          box-sizing: border-box;
        }
      }
      .alert-send {
        width: 50%;
        button {
          width: 100%;
          height: 0.72rem;
          border: 0px;
          border-radius: 7px;
          background: #54ce55;
          color: #fff;
          font-size: 0.3rem;
        }
        .send-click{
          background-color: #bebebe;
        }
      }
    }
    .alert-btn {
      display: flex;
      div {
        flex: 1;
        button {
          width: 100%;
          display: inline-block;
          line-height: 0.92rem;
          height: 0.92rem;
          color: #666;
          text-align: center;
          font-size: 0.32rem;
          background: #fff;
        }
      }
    }
  }
}
</style>
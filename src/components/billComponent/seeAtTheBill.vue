<template>
    <div class="sa-box">
        <div class="sa-content">
            <header>
                <img :src="logo" alt="">
            </header>
            <hgroup>续期转账成功账单</hgroup>
            <ul>
                <li>
                    <p>保单号：</p>
                    <p>{{policyCode}}</p>
                </li>
                <li>
                    <p>应交日期：</p>
                    <p>{{recordInfoSub.DUE_TIME}}</p>
                </li>
                <li>
                    <p>实际扣款日期：</p>
                    <p>{{recordInfoSub.FINISH_TIME}}</p>
                </li>
                <li>
                    <p>实际扣款金额：</p>
                    <p>{{recordInfoSub.FEE_AMOUNT}}</p>
                </li>
                <li>
                    <p>缴别：</p>
                    <p>{{CHARGE_NAME}}</p>
                </li>
                <li>
                    <p>保费交至日期：</p>
                    <p>{{PAIDUP_DATE}}</p>
                </li>
                <li>
                    <p>交费期数：</p>
                    <p>{{recordInfoSub.POLICY_PERIOD}}</p>
                </li>
            </ul>
            <div class="sa-btn">
                <button class="style-click" @click="closeWindow">关闭</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@/assets/publicImg/logo.png")
    };
  },
  props:['recordInfoSub','policyCode','PAIDUP_DATE','CHARGE_NAME'],
  methods: {
      closeWindow() {
          this.$emit('clolseWindow')
      }
  },
};
</script>

<style lang="scss" scoped>
.sa-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .sa-content {
    width: 90%;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    header {
      width: 100%;
      margin: 0 auto;
      background-color: #00ae4d;
      img {
        width: 64%;
        margin: 0 auto;
      }
    }
    hgroup{
        text-align: center;
        font-size: 0.32rem;
        margin: 10px auto;
        font-weight: 600;
    }
    ul{
        width: 90%;
        margin: 0px auto;
        padding: 0 0 10px;
        li{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #dcdcdc;
            line-height: 0.52rem;
        }
    }
    .sa-btn{
        width: 90%;
        margin: 0px auto;
        padding: 0 0 10px;
        button{
            width: 50%;
            height: 0.7rem;
            background-color: #00AE4D;
            color: #FFFFFF;
            border: none;
            margin: 0 auto;
            display: block;
            border-radius: 10px;
        }
    }
  }
}
</style>
<template>
    <div class="alert-box" v-if="alertCount.isShowAlert">
        <div class="alert-content">
        <div class="alert-contentTitle">提示信息</div>
            <div class="alert-img">
                <img :src="tipsImgSrc" alt="">
                <p class="alert-font">{{alertCount.alertData}}</p>
            </div>
            <div class="alert-btn">
                <button class="style-click" @click="IKnow">{{alertCount.btnMsg}}</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tipsImgSrc: require('@/assets/images/hint1.png')
        }
    },
    props:['alertCount'],
    methods: {
        IKnow() {
            this.alertCount.isShowAlert = false;
            this.$emit('btnIKnow',event.target)
        }
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
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  .alert-content {
    background-color: #fff;
    width: 90%;
    border-radius: 0 0 7px 7px;
    overflow: hidden;
    font-size: 0.32rem;
    .alert-img{
        margin: 0 auto;
        padding:45px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0ab308;
    }
    .alert-btn {
      button {
        width: 70%;
        line-height: 0.8rem;
        background: #0ab308;
        color: #fff;
        display: block;
        border-radius: 7px;
        margin: 0 auto;
        margin-bottom: 20px;
      }
    }
    .alert-contentTitle{
        width: 100%;
        line-height: 0.8rem;
        background: #0ab308;
        color: #ffffff;
        text-align: center;

    }
  }
}

</style>
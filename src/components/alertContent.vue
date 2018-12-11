<template>
    <div class="alert-box" v-if="alertCount.isShowAlert">
        <div class="alert-content">
            <div class="alert-img">
                <img :src="tipsImgSrc" alt="">
            </div>
            <p class="alert-font">{{alertCount.alertData}}</p>
            <div class="alert-btn">
                <button class="style-click" @click="IKnow">知道了</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tipsImgSrc: require('@/assets/publicImg/icon_3.jpg')
        }
    },
    props:['alertCount'],
    methods: {
        IKnow() {
            this.alertCount.isShowAlert = false
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
    border-radius: 7px;
    overflow: hidden;
    font-size: 0.32rem;
    .alert-img{
        width: 1.2rem;
        margin: 0 auto;
        padding-top: 0.3rem;
        img{
            width: 100%;
        }
    }
    .alert-font{
        padding: 0.5rem 0.2rem;
        text-align: center;
    }
    .alert-btn {
      button {
        width: 100%;
        line-height: 0.8rem;
        background: #0ab308;
        color: #fff;
        display: block;
      }
    }
  }
}
</style>
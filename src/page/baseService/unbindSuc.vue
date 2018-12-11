<template>
  <div class="unbind-suc-box">
    <div class="moda5">
      <div
        class="modal-info center-self-xy mYBounceInDown"
        style="border-radius: 0; -webkit-border-radius: 0;top:0;"
      >
        <div class="modal-t">
          <div style="padding-top: 12%;">
              <img :src="src1">               
            </div>
            <!-- <div class="tetx-content">解绑成功
              <p style="margin-top: 0.2rem;">请退出微信后重新登陆，解绑立马生效。</p>
          </div> -->
          <div v-html="choose"></div>
          <div class="modal-b clearfix">
            <a href="#" class="tijiao" @click="ikonw">我知道了</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      codeData: "",
      src1:require("@/assets/bsImg/success1.jpg"),
      choose: this.$route.query.pathAddress
    };
  },
  created() {},
  mounted() {
    
    console.log(this.choose);
    setTimeout(()=>{
      this.choose = this.$route.query.pathAddress;
    },200)
  },
  methods: {
    ikonw() {
      // 显示加载动画
      // this.jumpLoading=true;
      this.$router.push({ path: "/", query: {} });
    }
  }
};
</script>

<style lang="scss" scoped>
.unbind-suc-box {
  .moda5 {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    .modal-info {
      background-color: #fff;
      width: 88.8%;
      // height: 5rem;
      position: absolute;
      top: 0;
      left: 5.6%;
      box-sizing: border-box;
      border-radius: 10px;
      -webkit-border-radius: 10px;
      overflow: hidden;
      z-index: 2;
      .modal-t {
        height: 100%;
        position: relative;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        div {
          img {
            display: block;
            width: 1.3rem;
            height: 1.3rem;
            margin: 0 auto;
          }
        }
        .tetx-content {
          text-align: center;
          font-size: 0.34rem;
          margin-top: 8%;
          color: #4a4a4a;
        }
        .modal-b {
          width: 100%;
          height: 0.8rem;
          display: flex;
          text-align: center;
          // position: absolute;
          bottom: 0;
          left: 0;
          .tijiao {
            background-color: #54ce55;
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            line-height: 0.8rem;
            font-size: 0.34rem;
            color: #fff;
            &:active {
              background-color: #43ab44;
            }
          }
        }
      }
    }
  }
}
</style>
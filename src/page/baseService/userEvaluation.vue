<template>
  <div class="userEvaluation" style="background-color: #dcdcdc;    min-height: 100vh;">
    <div class="content">
          <img class="logo" :src="logo">
          <div class="content_text">
            <img class="userTitle" :src="userTitle">
            <div class="userTitle_text">
              <i class="serialNumber">A1</i>
              <p class="userTitle_child">
                <span>请对本次服务的整体情况进行评价。</span>
                <br>
                <span>答案选择如下：</span>
              </p>
            </div>

          </div>
          <div class="Research_ser">
              <ul>
                  <li><button  @click="subClick('1001')" name="questionOne" value="1001">满意</button></li>
                  <li><button  @click="subClick('1002')" name="questionOne" value="1002">一般</button></li>
                  <li><button  @click="subClick('1003')" name="questionOne" value="1003">不满意</button></li>
              </ul>
          </div>
    </div>
    <alertUserEvaluation :alertCount="alertCount" ref="Alert" v-on:btnIKnow="btnIKnow"></alertUserEvaluation>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapActions } from "vuex";
import alertUserEvaluation from '@/components/alertUserEvaluation.vue'
import { Toast } from "vant";
export default {
      components: {
        alertUserEvaluation
    },
  data() {
    return {
      alertCount:{
          isShowAlert:false,
          alertData:'谢谢参与！',
      },
      logo: require("@/assets/images/logo_ut.png"),
      userTitle: require("@/assets/images/userTitle.png"),
    };
  },
  mounted() {

  },
  methods: {
    AlertReport(){
      this.$router.push({ 
        path: "/xzyiyuan",
        query:{
          hospitalList: this.hospitalList,
        }
    });
    },
    subClick(code){
      this.alertCount.alertData ="谢谢参与!";
      this.alertCount.btnMsg ="回到首页";
      this.alertCount.isShowAlert = true;
    },
    btnIKnow(){
      this.$router.push({ 
        path: "/businessHanding",
      });
    },
  }
};
</script>

<style scoped>
.userEvaluation{
    background: #22b22c url("../../../src/assets/images/bg_ut.jpg");
    background-size: 100% 100%;
}
.logo{
  width: 42%;
  margin: 0 auto;
}
.content_text{
  width: 79%;
  margin: 0 auto;
  margin-top: 48px;
}
.userTitle{
  width: 61%;
  margin: 15px auto;
}
.serialNumber{
  width: 45px;
  height: 45px;
  background: #5dce58;
  display: inline-block;
  text-align: center;
  color: #ffffff;
  line-height: 45px;
  margin-left: 10px;
  float: left;

}
.userTitle_child{
  float: left;
  margin-left: 5px;
  font-weight: bold;
}

.Research_ser ul li {
    width: 100%;
    text-align: center;
}

.Research_ser ul li button {
    width: 60%;
    height: 46px;
    margin: 0 auto;
    background: #3dbf2b;
    border: none;
    color: #fff;
    letter-spacing: 3px;
    font-size: 20px;
    -webkit-box-shadow: 0px 1px 0px #3dbf2b inset, 0px 3px 0px 0px #208d11, 0px 10px 5px #999;
    box-shadow: 0px 1px 0px #3dbf2b inset, 0px 3px 0px 0px #208d11, 0px 10px 5px #999;
    border-radius: 7px;
    margin-top: 60px;

}
.Research_ser ul li:first-child button{
  position: relative;
  left: -49px;
}

</style>

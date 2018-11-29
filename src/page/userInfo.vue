<template>
    <div class="user-box" @click="closeSelect">
        <div class="user-container">
            <div class="user-logo">
                <img :src="logoImgSrc" alt="">
            </div>
            <div class="user-form">
                <input class="user-text" type="text" placeholder="姓名">
                <div class="main_sty">
                    <input type="text" name='select' lx ='0' class="user-text" @click.stop="isOpenSelect=!isOpenSelect" v-model="cardNameType" style="border:1px solid #dedede;text-align:center;" readonly placeholder="请选择您的证件类型" >
                    <transition name="fade">
                    <div class="main_select" v-show="isOpenSelect">
                        <ul>
                            <li :value = "item.cardValue" v-for="(item,index) in cardList" :key="index" @click="selectCard(index)">{{item.cardName}}</li>
                            <!-- <li value = "2">军人证</li>
                            <li value = "3">护照</li> -->
                       <!--      <li value = "4">出生证</li> -->
                            <!-- <li value = "5">异常身份证</li>
                            <li value = "6">港澳台通行证</li>
                            <li value = "7">士兵证</li>
                            <li value = "8">警官证</li>
                            <li value = "61">外国人永久居留身份证</li>
                            <li value = "9">其他</li> -->
                        </ul>
                    </div>
                    </transition>
                </div>
                <input class="user-text" type="text" placeholder="证件号码">
                <button class="style-click" type="submit" @click="validation"  name="check_btn">验证</button>
            </div>
        </div>
        <bgComponent></bgComponent>
        <alertContent :alertCount="alertCount"></alertContent>
        <sendAlrtContent v-if="false"></sendAlrtContent>
    </div>
</template>

<script>
import bgComponent from "../components/bgComponent";
import alertContent from "../components/alertContent";
import sendAlrtContent from "../components/sendAlrtContent";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      cardNameType: "请选择您的证件类型",
      logoImgSrc: require("@/assets/publicImg/1_03.png"),
      isOpenSelect: false,
      alertCount:{
          isShowAlert:false,
          alertData:'请输入',
      },
      cardList: [
        {
          cardName: "身份证",
          cardValue: "1"
        },
        {
          cardName: "军人证",
          cardValue: "2"
        },
        {
          cardName: "护照",
          cardValue: "3"
        },
        {
          cardName: "异常身份证",
          cardValue: "5"
        },
        {
          cardName: "港澳台通行证",
          cardValue: "6"
        },
        {
          cardName: "士兵证",
          cardValue: "7"
        },
        {
          cardName: "警官证",
          cardValue: "8"
        },
        {
          cardName: "外国人永久居留身份证",
          cardValue: "61"
        },
        {
          cardName: "其他",
          cardValue: "9"
        }
      ]
    };
  },
  components: {
    bgComponent,
    alertContent,
    sendAlrtContent
  },
  created(){
    console.log(this.$route.query.pathAddress)
  },
  methods: {
    selectCard(index) {
      console.log(index);
      this.cardNameType = this.cardList[index].cardName
      this.isOpenSelect = false
    },
    validation(){
      this.$router.push({ path: this.$route.query.pathAddress });
    },

    //关闭下拉框
    closeSelect(){
      this.isOpenSelect = false
    }
  }
};
</script>

<style lang="scss" scoped>
.user-box {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #3ad298 0%, #051fd8 100%);
}

.user-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 10% 0;
  text-align: center;
  .user-logo {
    img {
      width: 50%;
      margin: 0 auto;
    }
  }
  .user-form {
    padding: 10px 0;
    position: relative;
    z-index: 2;
    .user-text {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: 0;
      border: 1px solid rgba(255, 255, 255, 0.4);
      background-color: rgba(255, 255, 255, 0.2);
      width: 250px;
      border-radius: 36px;
      padding: 10px 15px;
      margin: 0 auto 10px auto;
      display: block;
      /* text-align: center; */
      font-size: 18px;
      color: white;
      -webkit-transition-duration: 0.25s;
      transition-duration: 0.25s;
      font-weight: 300;
      text-align: center;
      margin-bottom: 15px;
      box-sizing: border-box;
    }
    .user-text:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
    .user-text:focus {
      background-color: white;
      width: 300px;
      color: #333;
    }
    button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: 0;
      background-color: #56b3f5;
      border: 0;
      padding: 10px 15px;
      color: #fff;
      border-radius: 37px;
      width: 250px;
      cursor: pointer;
      font-size: 18px;
      -webkit-transition-duration: 0.25s;
      transition-duration: 0.25s;
    }
  }
}
.main_select {
  position: relative;
  top: -26px;
  height: 160px;
  overflow: hidden;
  ul {
    max-height: 160px;
    overflow-y: scroll;
    li {
      line-height: 36px;
      border: 1px solid #dedede;
      border-bottom: none;
      cursor: pointer;
      width: 270px;
      display: inline-block;
      color: #333;
      background: #fff;
    }
  }
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: white !important;
  font-weight: 300;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: white !important;
  opacity: 1;
  font-weight: 300;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: white !important;
  opacity: 1;
  font-weight: 300;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: white !important;
  font-weight: 300;
}

.fade-enter-active,
.fade-leave-active {
  transition: height 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  height: 0px;
}
</style>
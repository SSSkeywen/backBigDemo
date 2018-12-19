<template>
  <div id="bqContent">
    <header class="bq-title">客户身份证有效期变更</header>
    <section class="bq-box-style end-box">
      <ul v-for="(item,index) in contentList" :key="index">
        <li class="line">
          <p>客户类型</p>
          <p v-text="item.customerType"></p>
        </li>
        <li class="line">
          <p>姓名</p>
          <p v-text="item.realName"></p>
        </li>
        <li class="line">
          <p>证件类型</p>
          <p v-text="item.certiName"></p>
        </li>
        <li class="line">
          <p>证件号码</p>
          <p v-text="item.subCertiCode"></p>
        </li>
        <li class="line">
          <p>证件有效期</p>
          <p v-text="item.certiValidate"></p>
        </li>
        <li class="line" style="display:none">
          <p>性别</p>
          <p v-text="item.gender"></p>
        </li>
        <li class="line" style="display:none">
          <p>出生日期</p>
          <p v-text="item.birthday"></p>
        </li>
        <li class="line" style="display:none">
          <p>证件类型</p>
          <p v-text="item.certiType"></p>
        </li>
        <li class="line">
          <p>&nbsp;</p>
          <p @click="bgFn(index)">
            <button :disabled="item.isdisabled" :class="item.btnStyle" class="style-click">选择变更</button>
          </p>
        </li>
      </ul>
    </section>
    <!-- <section class="bq-submit">
            <div class="bq-submit-content">
                <div class="bq-submit-left" @click="allSelect">
                    <div>
                        <img src="./img/selectIconOne.svg" v-if="selectAll">
                        <img src="./img/checked.png" v-else>
                    </div>
                    <p>全选</p>
                </div>
                <div class="bq-submit-right style-click" @click="submitFn">
                    <p>选择变更</p>
                </div>
            </div>
    </section>-->
    <transition name="fade">
      <div class="tips-style" v-if="isShowTips">
        <p v-text="tipsContent"></p>
      </div>
    </transition>
    <!-- <section class="error-style" v-show="isShowError" style="display: none;">
            <div class="error-content">
                <img src="./img/xitongyichang.png" width="100%">
                <p class="error-font">系统异常，请刷新重试</p>
                <div class="error-btn">
                    <button class="style-click">刷新</button>
                </div>
            </div>
    </section>-->
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
      selectAll: true,
      isShowTips: false,
      isShowError: true,
      contentList: [],
      tipsContent: "对不起，请选择保单做变更投资分配比例"
    };
  },
  created() {
    const toast1 = Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 0
    });
    this.clientCardChange({
      successCallback: result => {
        console.log(result);
        this.contentList = result;
        toast1.clear();
      },
      fCallback: res => {
        console.log(res);
        toast1.clear();
      }
    });
  },
  methods: {
    ...mapActions({
      clientCardChange: "clientCardChange",
      isClientCardChange: "isClientCardChange"
    }),
    bgFn(index) {
      const toast1 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      let changeData = {
        name: this.contentList[index].realName,
        gender: this.contentList[index].gender,
        birthday: this.contentList[index].birthday,
        certtype: this.contentList[index].certiType,
        certcode: this.contentList[index].certiCode
      };
      console.log(changeData);
      this.isClientCardChange({
        changeData,
        successCallback: result => {
          console.log(result);
          // this.contentList = result;
          this.$router.push({
            path: "/uploadCard",
            // query: { contentList: this.contentList[index] }
          });
          toast1.clear();
        },
        fCallback: res => {
          console.log(res);
          toast1.clear();
        }
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
#bqContent {
  background: whitesmoke;
  min-height: 100vh;
}
@import url(./css/style.css);
</style>
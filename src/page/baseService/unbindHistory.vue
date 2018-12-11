<template>
  <div class="history-wrap">
    <div class="set-history-box">
      <div class="header1 fix">
        <div class="header">
          <div>
            <img :src="src1">操作历史纪录
          </div>
          <div class="totalNum">共计:
            <span id="totalNum">{{totalNum}}</span>条记录
          </div>
        </div>
        <div class="list-top">
          <div class="list-title">
            <div style="padding-left: 1.16rem;">操作时间</div>
            <div style="padding-right:1.2rem;">操作业务</div>
          </div>
        </div>
      </div>
      <div class="top-space"></div>
      <ul class="ywqdList">
        <li v-for="(item,index) in myData" :key="index">
          <div>{{item.time}}</div>
          <div>{{item.serviceName}}</div>
        </li>
      </ul>
      <div class="kongbai" v-if="loadBtn">已加载全部</div>
      <div style="width: 100%;height: 0.88rem;"></div>
      <a href="#" class="btn" @click="toNext">提交解绑</a>
    </div>
    <div class="moda1" v-if="jumpLoading">
      <div class="moda1-con">
        <img :src="src2">
      </div>正在提交申请，请耐心等待..........
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import unbindSelfVue from "./unbindSelf.vue";
export default {
  data() {
    return {
      src1: require("@/assets/bsImg/time.png"),
      src2: require("@/assets/bsImg/waiting.gif"),
      success1: require("@/assets/bsImg/success1.jpg"),
      loadBtn: false,
      jumpLoading: false,
      myData: [],
      totalNum:''
    };
  },
  created() {
    // 如果列表数据小于5条  <div class="kongbai" v-if="loadBtn">已加载全部</div> 不显示
    this.querybusoperaionlist({
      successCallback: res => {
        console.log(res.data.dataList);
        if (res.data.totalNum >= 5) {
          this.loadBtn = true;
        }
        this.totalNum = res.data.totalNum;
        
        this.myData = res.data.dataList;
        console.log(this.myData)
      },
      failCallback: res => {
        if (res.code == 2002) {
          this.$route.push({
            path: "/userInfo",
            query: { pathAddress: "/unbindSelf" }
          });
        } else {
          this.alertCount.alertData = res.msg;
          this.alertCount.isShowAlert = true;
        }
      }
    });
  },
  methods: {
    ...mapActions({
      querybusoperaionlist: "querybusoperaionlist",
      untieimmediately: "untieimmediately"
    }),

    toNext() {
      // 显示加载动画
      this.jumpLoading = true;
      this.$router.push({ path: "/unbindSuc", query: {} });
      // 立即解绑
      this.untieimmediately({
        successCallback: res => {
          console.log(res.data);
          let choose;
          if (res.data.flag == 1) {
            //解绑成功
            choose = `
          <div class="tetx-content" style="text-align: center;">解绑成功
            <p style="margin-top: 0.2rem;">请退出微信后重新登陆，解绑立马生效。</p>
          </div>`;
            this.$router.push({
              path: "/unbindSuc",
              query: { pathAddress: choose }
            });
          } else if (res.data.flag == 2) {
            //提交人工审核成功
            choose = `
          <div class="tetx-content" style=";font-size: 0.32rem; margin-top: 4%;line-height: 0.5rem;text-align: center;">
             解绑申请已提交，公司专员会尽快为您处理，1-2个工作日后会将处理结果以短信形式通知到您，请等待。
          </div>`;
            this.$router.push({
              path: "/unbindSuc",
              query: { pathAddress: choose }
            });
          } else if (res.data.flag == 3) {
            //解绑失败
            this.alertCount.alertData = res.msg;
            this.alertCount.isShowAlert = true;
          }
        },
        failCallback: res => {
          if (res.code == 2002) {
            this.$route.push({
              path: "/userInfo",
              query: { pathAddress: "/unbindSelf" }
            });
          } else {
            this.alertCount.alertData = res.msg;
            this.alertCount.isShowAlert = true;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.moda1 {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.73);
  z-index: 9999;
  text-align: center;
  color: #fff;
  .moda1-con {
    width: 100%;
    margin-top: 30%;
    margin-bottom: 10%;
    img {
      display: block;
      margin: 0 auto;
      border: 0;
    }
  }
}
.set-history-box {
  width: 100%;
  min-height: 100%;
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #efeff4;
  .fix {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    
  }
  .header1 {
    background-color: #fff;
    z-index: 3;
    .header {
      display: flex;
      justify-content: space-between;
      height: 1.17rem;
      line-height: 1.17rem;
      background-color: #fff;
      padding: 0 0.4rem;
      div {
        font-size: 0.36rem;
        color: #4a4a4a;
        img {
          display: inline-block;
          /* margin-top: 0.455rem; */
          width: 0.36rem;
          height: 0.36rem;
          margin-right: 0.1rem;
          vertical-align: -4%;
        }
      }
      .totalNum {
        color: #9b9b9b;
        font-size: 0.24rem;
        span {
          color: #000000;
        }
      }
    }
  }
  .list-top {
    background-color: rgb(255, 255, 255);
    .list-title {
      display: flex;
      justify-content: space-between;
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: rgba(2, 173, 77, 0.1);
      border-top: 1px solid rgb(21, 169, 86);
      border-bottom: 1px solid rgb(21, 169, 86);
      font-size: 0.3rem;
      color: rgb(74, 74, 74);
    }
  }
  .top-space {
    width: 100%;
    height: 1.97rem;
  }
  .ywqdList {
    padding: 0 0.29rem;
    background-color: #fff;
    li {
      position: relative;
      display: block;
      height: 0.95rem;
      line-height: 0.95rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      &:first-child {
        border: 0;
      }
      div {
        padding-left: 0.53rem;
        font-size: 0.32rem;
        color: #666;
        &:nth-child(2) {
          padding-left: 0;
          padding-right: 0.21rem;
        }
      }
    }
  }
  .kongbai {
    font-size: 0.24rem;
    color: rgb(199, 199, 199);
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
  }
  .btn {
    display: block;
    width: 100%;
    height: 0.88rem;
    color: #fff;
    font-size: 0.36rem;
    background-color: #02ad4d;
    line-height: 0.88rem;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
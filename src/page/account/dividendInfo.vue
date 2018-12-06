<template>
  <div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <section
      class="date"
      style="display: flex;  width: 95%;margin: 0 auto;margin-top: 10px;margin-bottom: 10px;height: 42px;line-height: 42px;"
    >
      <div style="line-height: 21px;">
        <span>分配&nbsp;
          <br>日期&nbsp;
        </span>
      </div>
      <div
        class="date_time"
        style="width: 85%;  text-align: center;display: flex;justify-content: space-between;"
      >
        <div class="dkzhxx_lable1" style="top: 6px;">
          <input
            readonly
            name="textfield"
            type="text"
            class="dkzhxx_input01"
            :value="startDate"
            @click="openDate('ago')"
          >
        </div>—
        <div class="dkzhxx_lable2" style="top: 6px;">
          <input
            readonly
            name="textfield"
            type="text"
            class="dkzhxx_input02"
            :value="endDate"
            @click="openDate('now')"
          >
        </div>
      </div>
    </section>
    <div class="dateBox">
      <van-datetime-picker
        v-show="agoShow"
        v-model="date1"
        type="date"
        @confirm="ok()"
        @change="change(date1,'ago')"
      />
      <van-datetime-picker
        v-show="nowShow"
        v-model="date2"
        type="date"
        @confirm="ok()"
        @cancel="cancel()"
        @change="change(date2,'now')"
      />
    </div>
    <div v-if="dividendInfo.length!=0">
      <section class="mp-box-one" v-for="(item,index) in dividendInfo" :key="index">
        <ul class="mp-list">
          <li class="mp-list-li line-down">
            <p>险种名称：</p>
            <p v-text="item.productAbbr"></p>
          </li>
          <li class="mp-list-li line-down">
            <p>红利选择方式：</p>
            <p v-text="item.modeName"></p>
          </li>
          <li class="mp-list-li line-down">
            <p>红利授权给付方式：</p>
            <p v-text="item.authName"></p>
          </li>
          <li class="mp-list-li line-down">
            <p>分配日期：</p>
            <p>{{item.realloDate | getdateFilter}}</p>
          </li>
          <li class="mp-list-li line-down">
            <p>保额红利金额：</p>
            <p v-text="item.bonusSa"></p>
          </li>
          <li class="mp-list-li line-down">
            <p>现金红利金额：</p>
            <p v-text="item.distriAmount"></p>
          </li>
        </ul>
      </section>
    </div>
    <div v-else class="downBox">
      <section class="mp-box-one">
        <ul class="mp-list">
          <li class="mp-list-li line-down">
            <p>未查到符合条件的数据</p>
          </li>
        </ul>
      </section>
    </div>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import { dateStyle } from "@/filter/dateStyle.js";
import { getDate } from "@/filter/getData.js";
import { mapActions } from "vuex";
import { DatetimePicker } from "vant";
import alertContent from "@/components/alertContent.vue";
export default {
  data() {
    return {
      headerContent: "分红账户",
      alertCount: {
        alertData: "",
        isShowAlert: false
      },
      agoShow: false,
      nowShow: false,
      startDate: this.$route.query.startDate,
      endDate: this.$route.query.endDate,
      date1: this.$route.query.startDate,
      date2: this.$route.query.endDate,
      policyCode: this.$route.query.policyCode,
      partyNo: this.$route.query.partyNo,
      agentId: this.$route.query.agentId,
      dividendInfo: []
    };
  },
  components: {
    headerT,
    alertContent
  },
  filters: {
    dateFilter(date) {
      return dateStyle(date);
    },
    getdateFilter(date) {
      return getDate(date);
    }
  },
  created() {
    let data = {
      policyCode: this.policyCode,
      //policyCode: "115528513508",
      partyNo: this.partyNo,
      //partyNo: "368986",
      agentId: this.agentId,
      //agentId: "005468556",
      startDate: this.startDate,
      //startDate: "2018-08-15",
      endDate: this.endDate
      //endDate: "2018-08-16"
    };
    // var data = JSON.stringify(data1);
    console.log(data);
    this.getDevidentaccInfo({
      data,
      successCallback: res => {
        this.dividendInfo = res.data;
        console.log("222222222222222"+this.dividendInfo)
      },
      failCallback: res => {
        if (res.code == 2002) {
          this.$route.push({
            path: "/userInfo",
            query: { pathAddress: "/dividendInfo" }
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
      getLates: "getLates",
      getDevidentaccInfo: "getDevidentaccInfo"
    }),
    ok() {
      this.agoShow = false;
      this.nowShow = false;
      if (this.startDate == "" || this.endDate == "") {
        this.alertCount.alertData = "分配日期不能为空！";
        this.alertCount.isShowAlert = true;
        return false;
      }
      if (this.startDate > this.endDate) {
        this.alertCount.alertData = "开始时间不能大于结束时间！";
        this.alertCount.isShowAlert = true;
        return false;
      }
      let data = {
        policyCode: this.policyCode,
        partyNo: this.partyNo,
        agentId: this.agentId,
        //agentId: "005468556",
        startDate: this.startDate,
        endDate: this.endDate
      };
      // var data = JSON.stringify(data1);
      console.log(data);
      this.getDevidentaccInfo({
        data,
        successCallback: res => {
          this.dividendInfo = res.data;
          console.log("222222222222222"+res.data)
        },
        failCallback: res => {
          if (res.code == 2002) {
            this.$route.push({
              path: "/userInfo",
              query: { pathAddress: "/dividendInfo" }
            });
          } else {
            this.alertCount.alertData = res.msg;
            this.alertCount.isShowAlert = true;
          }
        }
      });
    },
    change(item, time) {
      this.item = dateStyle(item);
      if (time === "ago") {
        this.startDate = this.item.replace(
          /(\d{4}).(\d{1,2}).(\d{1,2}).+/gm,
          "$1-$2-$3"
        );
      } else {
        this.endDate = this.item.replace(
          /(\d{4}).(\d{1,2}).(\d{1,2}).+/gm,
          "$1-$2-$3"
        );
      }
    },
    cancel() {
      this.agoShow = false;
      this.nowShow = false;
    },
    openDate(time) {
      if (time === "ago") {
        this.agoShow = true;
        this.nowShow = false;
        this.date1 = new Date(this.date1);
      } else {
        this.agoShow = false;
        this.nowShow = true;
        this.date2 = new Date(this.date2);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dateBox {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 99;
}
.date input {
  width: 100%;
  border-radius: 0;
  /* background: url(img/icon_date.png) no-repeat right center; */
  background-color: #fff;
  border: none;
  font-size: 14px;
  width: 95%;
  padding-left: 2%;
  height: 30px;
}

.mg-box {
  min-height: 100vh;
  background-color: #dcdcdc;
}
.mp-hgroup {
  width: 95%;
  line-height: 0.8rem;
  color: #fff;
  background: url("../../assets/mgImg/xq_header_bg.png") no-repeat;
  margin: 0 auto;
  margin-top: 2%;
  background-size: 100% 100%;
  padding: 0 0 0 0.3rem;
  box-sizing: border-box;
}
.mp-box-one {
  width: 95%;
  background-color: #fff;
  margin: 10px auto;
  padding: 0 0.3rem 10px;
  box-sizing: border-box;
  border-radius: 10px;
  .mp-min-title {
    display: flex;
    justify-content: space-between;
    line-height: 0.8rem;
    .mp-min-left {
      display: flex;
      font-weight: 600;
      .mp-min-left-img {
        width: 0.3rem;
        padding-top: 0.17rem;
        margin-right: 0.2rem;
        img {
          width: 100%;
          display: block;
        }
      }
    }
    .mp-min-right {
      width: 0.44rem;
      padding-top: 0.22rem;
      img {
        width: 100%;
      }
    }
  }
  .mp-list {
    .mp-list-li {
      display: flex;
      justify-content: space-between;
      line-height: 0.52rem;
    }
    .mp-list-li:last-child {
      padding-bottom: 0.1rem;
    }
  }
}

/* 动画效果css */
.ani-down {
  transition: all 0.2s;
}
.add-ani-style {
  transform: rotateZ(180deg);
}
</style>
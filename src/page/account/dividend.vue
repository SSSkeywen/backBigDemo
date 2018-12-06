<template>
  <div class="mg-box">
    <headerT :headerContent="headerContent">sss</headerT>
    <div v-if="dividendData.length!=0">
    <section class="mg-content-list">
      <ul>
        <li
          v-for="(item,index) in dividendData"
          :key="index"
          @click="changeMessage(item.policyCode)"
        >
          <mincontentList :changeListData="item"></mincontentList>
        </li>
      </ul>
    </section>
    </div>
    <div v-else class="downBox">目前没有分红账户的保单</div>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import mincontentList from "../../components/policyInfoComponent/minContentList.vue";
import { mapActions } from "vuex";
import { dateStyle } from "@/filter/dateStyle.js";
import alertContent from "@/components/alertContent.vue";
export default {
  components: {
    headerT,
    mincontentList,
    alertContent
  },
  data() {
    return {
      headerContent: "分红账户",
      alertCount: {
        alertData: "",
        isShowAlert: false
      },
      agentId: "",
      partyNo: "",
      dividendData: [
        
      ]
    };
  },
  created() {
    this.getLatesTwo({
      successCallback: res => {
        console.log(res);
        for (let item of res.data.bounsAccountList) {
          if (item.liabilityState == "有效") {
            item.statusStyle = "green";
          }
          if (item.liabilityState == "停效") {
            item.statusStyle = "red";
          }
        }
        this.agentId = res.data.agentId;
        this.partyNo = res.data.partyNo;
        this.dividendData = res.data.bounsAccountList;
      },
      failCallback: res => {
        if (res.code == 2002) {
          this.$route.push({
            path: "/userInfo",
            query: { pathAddress: "/dividend" }
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
      getLatesTwo: "getLatesTwo"
    }),
    getDay(day) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth =
        today.getMonth() + 1 < 10
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1;
      var tDate =
        today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
      return tYear + "-" + tMonth + "-" + tDate;
    },
    changeMessage(policyCode) {
      this.$router.push({
        path: "/dividendInfo",
        query: {
          policyCode: policyCode,
          agentId: this.agentId,
          partyNo: this.partyNo,
          startDate: this.getDay(-7),
          endDate: this.getDay(0)
        }
      });
      console.log(this.$router);
    }
  }
};
</script>

<style lang="scss" scoped>
.mg-box {
  min-height: 100vh;
  background-color: #dcdcdc;
}
.mg-select {
  width: 90%;
  margin: 10px auto;
  border-radius: 7px;
  background-color: #fbfbfb;
  height: 30px;
  select {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 7px;
    background-color: #fff;
  }
}
.mg-content-list {
  width: 90%;
  margin: 0.2rem auto 0;
  ul {
    li {
      border-radius: 10px;
      background-color: #fff;
      margin-bottom: 0.24rem;
      overflow: hidden;
    }
  }
}
</style>


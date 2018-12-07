<template>
  <div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="contentListBox.data">
      <div class="mg-select">
        <select name id v-model="selectData" @change="selectPolicy()">
          <option
            v-for="(item,index) in selectList"
            :key="index"
            :value="item.value"
            v-html="item.content"
          ></option>
        </select>
      </div>
      <section class="mg-content-list">
        <ul>
          <li
            v-for="(item,index) in contentListData"
            :key="index"
            @click="policyMessage(item.policyCode)"
          >
            <contentList :contentListData="item"></contentList>
          </li>
        </ul>
      </section>
    </div>
    <nothing v-else :tipsContent="tipsContent"></nothing>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import nothing from "../../components/nothing.vue";
import contentList from "../../components/mgContentList.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    contentList,
    nothing
  },
  data() {
    return {
      tipsContent: "没有保单",
      selectData: "0",
      headerContent: "我的保单",
      selectList: [
        {
          value: "0",
          content: "&nbsp;全部"
        },
        {
          value: "1",
          content: "我是投保人"
        },
        {
          value: "2",
          content: "我是被保人"
        },
        {
          value: "3",
          content: "有效保单"
        },
        {
          value: "4",
          content: "失效保单"
        }
      ],
      contentListData: [
        // {
        //   policyCode: "",
        //   productName: "",
        //   applicantName: "",
        //   insuredName: "",
        //   validateDate: null,
        //   statusName: ""
        // }
      ],
      //定义包含全部值的变量
      contentListBox: {}
    };
  },
  created() {
    const toast1 = Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 2000
    });
    this.getLates({
      successCallback: res => {
        console.log(res);
        for (let item of res.data.AllPolicyList) {
          if (item.statusName == "有效") {
            item.statusStyle = "green";
          }else if (item.statusName == "终止") {
            item.statusStyle = "zhongzhi";
          }else if (item.statusName == "停效") {
            item.statusStyle = "red";
          }
        }
        this.contentListBox = res;
        this.contentListData = res.data.AllPolicyList;

        toast1.clear();
      },
      failCallback: res => {
        console.log(res);
        if (res.code == 2002) {
          this.$router.push({
            path: "/userInfo",
            query: { pathAddress: "/myGuaranteeSlip" }
          });
        }
        toast1.clear();
      }
    });
  },

  methods: {
    ...mapActions({
      getLates: "getLates"
    }),
    policyMessage(policyCode) {
      this.$router.push({
        path: "/mgPlicyInfo",
        query: { policyCode: policyCode }
      });
    },

    //select选择框方法
    selectPolicy(ele) {
      let myName = JSON.parse(window.localStorage.getItem("clientMsg")).customer
        .name;
      console.log(myName);
      if (this.selectData == 0) {
        this.contentListData = [];
        this.contentListData = this.contentListBox.data.AllPolicyList;
      }
      //我是投保人
      if (this.selectData == 1) {
        this.contentListData = [];
        for (let item of this.contentListBox.data.AllPolicyList) {
          if (item.applicantName == myName) {
            this.contentListData.push(item);
          }
        }
      }
      //我是被保人
      if (this.selectData == 2) {
        this.contentListData = [];
        for (let item of this.contentListBox.data.AllPolicyList) {
          if (item.insuredName == myName) {
            this.contentListData.push(item);
          }
        }
      }
      //有效保单
      if (this.selectData == 3) {
        this.contentListData = [];
        for (let item of this.contentListBox.data.AllPolicyList) {
          if (item.statusName == "有效") {
            this.contentListData.push(item);
          }
        }
      }

      //失效保单
      if (this.selectData == 4) {
        this.contentListData = [];
        for (let item of this.contentListBox.data.AllPolicyList) {
          if (item.statusName != "有效") {
            this.contentListData.push(item);
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mg-box {
  min-height: 100vh;
  background-color: #dcdcdc;
  padding-bottom: 0.1rem;
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
    background-position: 96% center;
  }
}
.mg-content-list {
  width: 90%;
  margin: 0 auto;
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
<template>
  <div class="mg-box">
    <!-- 投保进程查询 -->
    <headerT :headerContent="headerContent"></headerT>
    <ul class="tabBox">
      <li class="liSelf" :class="{current: ok}" @click="tog(1)">本人保单状态查询</li>
      <li class="liClient" :class="{current: !ok}" @click="tog(2)">客户保单状态查询</li>
    </ul>
    <div class="downBox">
      <div class="tabli-box" v-show="ok">
        <progressInfo v-if="isSowFirstContentList" :myaddData="myaddData"></progressInfo>
      </div>
      <div class="tabli-box" v-show="!ok">
        <section class="searchBox">
          <table>
            <tr>
              <td>投保单号</td>
              <td>
                <input
                  name="codeNum"
                  type="text"
                  @change="inputPlicyCode"
                  v-model="policyCodeInput"
                  placeholder="请输入投保单号"
                >
              </td>
            </tr>
            <tr>
              <td>身份证号</td>
              <td>
                <input
                  name="IDNum"
                  type="text"
                  v-model="certcodeInput"
                  @change="inputcertcode"
                  placeholder="请输入身份证号码"
                >
              </td>
            </tr>
          </table>
          <input class="btn_search" type="button" value="查询" @click="queryMsg">
        </section>
        <progressInfo v-if="btngo" :myaddData="myaddData2"></progressInfo>
      </div>
    </div>
    <footer id="banquan" class="banquan" style="position: fixed; bottom: 0; z-index:9">
      <span>版权所有&nbsp;©&nbsp;2001-2016&nbsp;中国太平保险集团有限责任公司</span>
    </footer>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import progressInfo from "../../components/policyInfoComponent/progressInfo.vue";
import { mapActions } from "vuex";
import alertContent from "@/components/alertContent.vue";
export default {
  data() {
    return {
      headerContent: "全部保单列表",
      ok: true,
      isSowFirstContentList: false,
      btngo: false,
      policyCodeInput: "",
      certcodeInput: "",
      alertCount: {
        alertData: "",
        isShowAlert: false
      },
      myaddData: [
        {
          showMap: false,
          steps: [
            //  {
            //     stepText: "投保单已提交",
            //     stepDate: "2016-02-02"
            //   },
            //   {
            //     stepText: "付款成功",
            //     stepDate: "2016-02-03"
            //   },
            //   {
            //     stepText: "你的保单已打印，寄送中！",
            //     stepDate: "2016-02-04"
            //   },
            //   {
            //     stepText: "保单已寄送",
            //     stepDate: "2016-02-05"
            //   },
            //   {
            //     stepText: "保单已签收",
            //     stepDate: "2016-02-06"
            //   },
            //   {
            //     stepText: "回访成功",
            //     stepDate: "2016-02-07"
            //   }
          ]
        }
        // {
        //     showMap:false
        // }
      ],
      myaddData2: [
        {
          showMap: false,
          steps: [
            //  {
            //     stepText: "投保单已提交",
            //     stepDate: "2016-02-02"
            //   },
            //   {
            //     stepText: "付款成功",
            //     stepDate: "2016-02-03"
            //   },
            //   {
            //     stepText: "你的保单已打印，寄送中！",
            //     stepDate: "2016-02-04"
            //   },
            //   {
            //     stepText: "保单已寄送",
            //     stepDate: "2016-02-05"
            //   },
            //   {
            //     stepText: "保单已签收",
            //     stepDate: "2016-02-06"
            //   },
            //   {
            //     stepText: "回访成功",
            //     stepDate: "2016-02-07"
            //   }
          ]
        }
        // {
        //     showMap:false
        // }
      ]
    };
  },
  components: {
    headerT,
    progressInfo,
    alertContent
  },
  created() {
    this.getInsureProgressList({
      successCallback: res => {
        if (res.data == null) {
          this.isSowFirstContentList = true;
          this.myaddData = "";
        } else {
          console.info(res.data);
          console.info(res.data.length);
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].isFinish != "Y") {
              console.info(res.data[i].sendCode);
              this.myaddData[i].sendCode = res.data[i].sendCode;
              this.myaddData[i].productName = res.data[i].productName;
              this.myaddData[i].insureStateName = res.data[i].insureStateName;
              // console.log(this.insureCode);
              if (res.data[i].insureState >= 13) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                newAbject.stepText = "您的保单代理人已签收！";
                newAbject.stepDate = res.data[i].agentSignTime;
                this.myaddData[i].steps.push(newAbject);
              }
              // console.log("=========================");
              // console.log(this.myaddData);
              if (res.data[i].insureState >= 12) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                if (res.data[i].insureState == 12) {
                  if (res.data[i].isWtDown == "a") {
                    newAbject.stepText = "您的保单已打印，寄送中！";
                  } else if (res.data[i].isWtDown == "c") {
                    newAbject.stepText =
                      "电子保单已生成，请登录太平保险网上营业厅下载！";
                  } else {
                    newAbject.stepText = "保单已打印";
                  }
                } else {
                  newAbject.stepText = "保单已打印";
                }
                newAbject.stepDate = res.data[i].showTime;
                this.myaddData[i].steps.push(newAbject);
              }

              if (res.data[i].insureState >= 11) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                if (res.data[i].insureState == 11) {
                  newAbject.stepText = "您的保单已承保，打印中！";
                } else {
                  newAbject.stepText = "已承保";
                }
                newAbject.stepDate = res.data[i].acceptDate;
                this.myaddData[i].steps.push(newAbject);
              }

              if (res.data[i].insureState >= 3) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                newAbject.stepText = "您的保单已核保完成!";
                newAbject.stepDate = res.data[i].operateDate3;
                this.myaddData[i].steps.push(newAbject);
              }

              if (res.data[i].insureState >= 2) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                newAbject.stepText = "您的保单正在核保中！";
                newAbject.stepDate = res.data[i].operateDate2;
                this.myaddData[i].steps.push(newAbject);
              }

              if (res.data[i].insureState >= 1) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                newAbject.stepText = "您的保单等待核保！";
                newAbject.stepDate = res.data[i].operateDate1;
                this.myaddData[i].steps.push(newAbject);
              }
              // this.myaddData = res.data;
              this.isSowFirstContentList = true;
            }
          }
         // this.isSowFirstContentList = true;
          //                 alert(21)
        }
      },
      failCallback: res => {
        if (res.code == 2002) {
          // this.$route.push({
          //   path: "/userInfo",
          //   query: { pathAddress: "/dividend" }
          // });
          this.ok = false;
        }
        // else if(res.code == 3) {
        // //   this.ok = false;
        // // }
        else {
          this.alertCount.alertData = res.msg;
          this.alertCount.isShowAlert = true;
        }
      }
    });
  },

  methods: {
    ...mapActions({
      getInsureProgressList: "getInsureProgressList",
      insureStaQueByPolicyCode: "insureStaQueByPolicyCode"
    }),
    tog(str) {
      // tab切换
      str == 2 ? (this.ok = false) : (this.ok = true);
    },

    queryMsg() {
      this.btngo = false;

      if (this.policyCodeInput != "") {
        this.newNum = "policy";
      } else {
        this.newNum = "cert";
      }

      if (
        this.certcodeInput != "" &&
        !this.$toolsTwo.codeCrad(this.certcodeInput)
      ) {
        this.alertCount.alertData = "身份证号不合法，请重新输入";
        this.alertCount.isShowAlert = true;
        return false;
      }
      let policyCodeData = {
        policyCode: this.policyCodeInput,
        certcode: this.certcodeInput,
        num: this.newNum
      };
      console.info(policyCodeData);
      this.insureStaQueByPolicyCode({
        policyCodeData,

        successCallback: res => {
          console.info("result:" + res.code);

          for (let i = 0; i < res.data.length; i++) {
            this.myaddData2[i].steps = [];
            if (res.data[i].isFinish != "Y") {
              this.myaddData2[i].sendCode = res.data[i].sendCode;
              this.myaddData2[i].productName = res.data[i].productName;
              this.myaddData2[i].insureStateName = res.data[i].insureStateName;

              if (res.data[i].insureState >= 13) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                newAbject.stepText = "您的保单代理人已签收！";
                newAbject.stepDate = res.data[i].agentSignTime;
                this.myaddData2[i].steps.push(newAbject);
              }

              if (res.data[i].insureState >= 12) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                if (res.data[i].insureState == 12) {
                  if (res.data[i].isWtDown == "a") {
                    newAbject.stepText = "您的保单已打印，寄送中！";
                  } else if (res.data[i].isWtDown == "c") {
                    newAbject.stepText =
                      "电子保单已生成，请登录太平保险网上营业厅下载！";
                  } else {
                    newAbject.stepText = "保单已打印";
                  }
                } else {
                  newAbject.stepText = "保单已打印";
                }
                newAbject.stepDate = res.data[i].showTime;
                this.myaddData2[i].steps.push(newAbject);
              }

              if (res.data[i].insureState >= 11) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                if (res.data[i].insureState == 11) {
                  newAbject.stepText = "您的保单已承保，打印中！";
                } else {
                  newAbject.stepText = "已承保";
                }
                newAbject.stepDate = res.data[i].acceptDate;
                this.myaddData2[i].steps.push(newAbject);
              }

              if (res.data[i].insureState >= 3) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                newAbject.stepText = "您的保单已核保完成!";
                newAbject.stepDate = res.data[i].operateDate3;
                this.myaddData2[i].steps.push(newAbject);
              }

              if (res.data[i].insureState >= 2) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                newAbject.stepText = "您的保单正在核保中！";
                newAbject.stepDate = res.data[i].operateDate2;
                this.myaddData2[i].steps.push(newAbject);
              }

              if (res.data[i].insureState >= 1) {
                let newAbject = {
                  stepText: "",
                  stepDate: ""
                };
                newAbject.stepText = "您的保单等待核保！";
                newAbject.stepDate = res.data[i].operateDate1;
                this.myaddData2[i].steps.push(newAbject);
              }
              this.btngo = true;
            }
          }
        },
        
        failCallback: res => {
          // if (res.code == 2002) {
          //   this.$route.push({
          //     path: "/userInfo",
          //     query: { pathAddress: "/dividend" }
          //   });
          // } else {
            this.alertCount.alertData = res.msg;
            this.alertCount.isShowAlert = true;
          // }
        }
      });
    },
    //输入投保单号
    inputPlicyCode() {
      if (this.policyCodeInput != "") {
        this.certcodeInput = "";
      }
    },
    //输入身份证号
    inputcertcode() {
      if (this.certcodeInput != "") {
        this.policyCodeInput = "";
      }
    }
  }
};
</script>

<style lang="" scoped>
.banquan {
  width: 100%;
  height: 45px;
  margin-top: 8%;
  line-height: 45px;
  background-color: #f0f0f0;
  color: #949494;
  font-size: 12px;
  text-align: center;
}
.mg-box {
  min-height: 100vh;
  background-color: #dcdcdc;
}
.downBox {
  width: 100%;
  margin: 20px auto;
}
.tabBox {
  display: flex;
  width: 100%;
  height: 40px;
}
.tabBox li {
  flex: 1;
  height: 100%;
  background-color: #bcbcbc;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.tabBox li.current {
  background-color: #00ae4d;
}

.searchBox table {
  table-layout: fixed;
  width: 100%;
  background-color: #fff;
  border: 0;
}
.searchBox table tr {
  display: flex;
  line-height: 0.6rem;
}
.searchBox table td {
  flex: 1;
  padding-right: 5px;
}
.searchBox table td:nth-child(1) {
  padding-left: 10px;
  flex: 0 0 80px;
}
.searchBox table td input {
  appearance: none;
  outline: none;
  display: block;
  border: 1px solid #999;
  width: 100%;
  box-sizing: border-box;
}
.btn_search {
  appearance: none;
  display: block;
  width: 90%;
  height: 40px;
  border-radius: 8px;
  margin: 20px auto;
  background-color: #00ae4d;
  text-align: center;
  line-height: 40px;
  color: #fff;
}
.btn_search:hover{background-color: rgb(0,125,68);}
</style>

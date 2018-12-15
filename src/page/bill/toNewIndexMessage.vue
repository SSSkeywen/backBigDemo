<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <hgroup class="mp-hgroup">保单号：{{xqListData.POLICY_CODE}}<span class="tn-look" @click="jumpMyPolicy(xqListData.POLICY_CODE)">查看详情</span></hgroup>
        <div class="tn-title">
          <p class="tn-name">{{xqListData.PRODUCT_NAME}}</p>
          <div class="tn-state">
            <p>被保人：{{xqListData.BBR_NAME}}</p>
            <p class="green">状态：{{xqListData.LIABILITY_STATUS_NAME}} </p>
          </div>
        </div>
        <section class="tn-lists">
            <hgroup>
              <div class="tn-list-img">
                <img :src="imgSrcTitle" alt="">
              </div>
              <p>交费信息</p>
            </hgroup>
            <div class="tn-content">
              <ul>
                <li class="tn-first-li">
                  <p>应交日期</p>
                  <p>应交金额</p>
                  <p>交费状态</p>
                </li>
                <li v-for="(item,index) in xqListData.recordInfoSub" :key="index">
                  <div class="tn-list-top">
                    <p>{{item.DUE_TIME}}</p>
                    <p>{{item.FEE_AMOUNT}}</p>
                    <p @click="openContent(index)">已交费<i><img :class="item.isShow?'open-style':''" :src="toDownIcon"></i></p>
                  </div>
                  <div v-if="item.isShow" class="tn-list-bottom">
                    <button @click="seeTheBillMessage(index)">查看账单</button>
                    <button v-if="item.ELEFLAG == 1" @click="viewElectronicInvoices(item.FEE_ID,'查看电子发票')">查看电子发票</button>
                    <button v-else @click="viewElectronicInvoices(item.FEE_ID,'申请电子发票')">申请电子发票</button>
                  </div>
                </li>
                <!-- <li>
                  <div class="tn-list-top">
                    <p>2004-03-29</p>
                    <p>2008.5</p>
                    <p>已交费<i><img :src="toDownIcon"></i></p>
                  </div>
                  <div class="tn-list-bottom">
                    <button @click="seeTheBillMessage">查看账单</button>
                    <button @click="viewElectronicInvoices">查看电子发票</button>
                  </div>
                </li> -->
              </ul>
            </div>
        </section>
        <seeAtTheBill :recordInfoSub="recordInfoSub" :PAIDUP_DATE="xqListData.PAIDUP_DATE" :CHARGE_NAME="xqListData.CHARGE_NAME" :policyCode="xqListData.POLICY_CODE" v-if="isOpenWindow" @clolseWindow="clolseWindow"></seeAtTheBill>
        <alertContent :alertCount="alertCount"></alertContent>
    </div>
</template>

<script>
import headerT from "../../components/header.vue";
import alertContent from "../../components/alertContent";
import toNewComponent from "../../components/billComponent/toNewComponent.vue";
import seeAtTheBill from "../../components/billComponent/seeAtTheBill.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    toNewComponent,
    seeAtTheBill,
    alertContent
  },
  data() {
    return {
      headerContent: "续期账单查询",
      toDownIcon:require('@/assets/billImg/xq_icon_xia.png'),
      imgSrcTitle: require('@/assets/mgImg/xq_icon_xx.png'),
      isOpenContent: false,
      isOpenWindow: false,
      indexKey:0,
      xqListData:{
        ACCO_NAME:'',
        PRODUCT_NAME:'',
        LIABILITY_STATUS_NAME:'',
        recordInfoSub:[]
      },
      recordInfoSub:[],
      alertCount: {
        isShowAlert: false,
        alertData: "请输入"
      }
    };
  },
  created(){
    console.log(this.$route.query.policyCode)
    let xqPolicyCode = this.$route.query.policyCode
    this.getToNewIndexListMsg({
      xqPolicyCode,
      successCallback: result => {
        console.log(result);
        for(let item of result.data.recordInfoSub){
          item.isShow = false
        }
        this.xqListData = result.data
      },
      fCallback: res => {}
    });
  },
  mounted(){
    // console.log(this.$store.getters.xqDataList)
    // let xqDataList = JSON.parse(window.localStorage.getItem("xqDataList"));
  },
  methods: {
    ...mapActions({
      getToNewIndexListMsg: "getToNewIndexListMsg",
      applyInvoice:"applyInvoice"
    }),
    policyMessage(policyCode) {
      // this.$router.push({ path: '/mgPlicyInfo',query: {policyCode: policyCode} });
    },
    openContent(index){
      this.xqListData.recordInfoSub[index].isShow = !this.xqListData.recordInfoSub[index].isShow
    },

    //打开查看账单
    seeTheBillMessage(index){
      this.recordInfoSub = this.xqListData.recordInfoSub[index]
      this.isOpenWindow = true
    },

    //关闭查看账单
    clolseWindow(){
      this.isOpenWindow = false
    },

    //跳转到查看电子发票页面
    viewElectronicInvoices(feeId,butonFlag){
      // this.$router.push({ path: '/mgPlicyInfo',query: {policyCode: policyCode} });
      // this.$router.push({ path: '/toNewIndexView' });
      // console.log(policyCode + "+" + butonFlag);
      let typeData = {
        prem: feeId,
        flg: "4"
      };
      if (butonFlag == "申请电子发票") {
        let tipsData = {
          pathAddress: "/toNewList",
          titleName: "续期账单查询",
          prem: feeId,
          flg: "4"
        };
        console.log(tipsData);
        this.$router.push({
          path: "/successMessage",
          query: { tipsData: tipsData }
        });
      } else {
      this.applyInvoice({
        typeData,
        successCallback: result => {
          console.log(result);
          // this.$router.push({ path: "/toNewIndexView" });
          if (result.RETURN_FLAG == "0") {
            this.alertCount.alertData = result.RETURN_MESSAGE;
            this.alertCount.isShowAlert = true;
          } else if (result.RETURN_FLAG == "1") {
            // let billmessage = {

            // }
            let tipsData = JSON.stringify(result.INVOICE_DETAILS);
            console.log(tipsData);
            this.$router.push({
              path: "/sqzdList",
              query: { tipsData: tipsData }
            });
          } else if (result.RETURN_FLAG == "2") {
            // let billmessage = {

            // }
            // let tipsData = {
            //   pathAddress:'/sqzdList',
            //   titleName:'首期账单查询'
              
            // }
            // console.log(tipsData);
            // this.$router.push({
            //   path: "/successMessage",
            //   query: { tipsData: tipsData }
            // });
          }
        },
        fCallback: res => {}
      });
    }
    },

    jumpMyPolicy(policyCode){
      this.$router.push({
        path: "/mgPlicyInfo",
        query: { policyCode: policyCode }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.casemx-box {
  min-height: 100vh;
  background: #dcdcdc;
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
    .tn-look {
      margin-right: 4%;
      color: #006CB7;
      text-decoration: underline;
      font-weight: 600;
      float: right;
    }
  }
  .tn-title{
    background-color: #fff;
    width: 95%;
    margin: 10px auto 0;
    padding: 10px 4%;
    box-sizing: border-box;
    .tn-state{
      display: flex;
      justify-content: space-between;
    }
  }

  .tn-lists{
    width: 95%;
    background-color: #fff;
    margin: 10px auto;
    padding: 1% 5%;
    box-sizing: border-box;
    hgroup{
      display: flex;
      line-height: 0.8rem;
      .tn-list-img{
        width: 10%;
        img{
          width: 50%;
          margin-top: 18%;
        }
      }
      p{
        font-weight: 600;
      }
    }
    .tn-content{
      ul{
        .tn-first-li{
          width: 100%;
          background-color: #00ae4d;
          color: #fff;
          display: flex;
          p{
            flex: 1;
            text-align: center;
          }
        }
        li{
          line-height: 0.6rem;
          border-bottom: 1px solid #d1d2d2;
          .tn-list-top{
            display: flex;
            p{
              flex: 1;
              text-align: center;
              position: relative;
              i{
                img{
                  position: absolute;
                  right: -0.1rem;
                  width: 0.32rem;
                  top: 0.2rem;
                  transition: all 0.1s;
                }
                img.open-style{
                  transform: rotate(180deg);
                }
              }
            }
          }
          .tn-list-bottom{
            display: flex;
            justify-content: space-around;
            margin-bottom: 0.1rem;
            button{
              width: 37%;
              height: 0.52rem;
              line-height: 0.52rem;
              background-color: #fff;
              color: #00ae4d;
              border: 1px solid #00ae4d;
              border-radius: 5px;
            }
          }
        }
        li:last-child{
          border-bottom:none;
        }
      }
    }
  }
}
.green{
    color: #00ae4d;
}
.red{
   color: #898b8b; 
}
</style>
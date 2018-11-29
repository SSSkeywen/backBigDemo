<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <hgroup class="mp-hgroup">合计金额：111<span class="tn-look">查看详情</span></hgroup>
        <div class="tn-title">
          <p class="tn-name">太平爱爸妈骨折综合意外伤害保险</p>
          <div class="tn-state">
            <p>被保人：张亚芳</p>
            <p class="green">状态：有效 </p>
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
                <li>
                  <div class="tn-list-top">
                    <p>2004-03-29</p>
                    <p>2008.5</p>
                    <p @click="openContent">已交费<i><img :class="isOpenContent?'open-style':''" :src="toDownIcon"></i></p>
                  </div>
                  <div v-if="isOpenContent" class="tn-list-bottom">
                    <button>查看账单</button>
                    <button>查看电子发票</button>
                  </div>
                </li>
                <li>
                  <div class="tn-list-top">
                    <p>2004-03-29</p>
                    <p>2008.5</p>
                    <p>已交费<i><img :src="toDownIcon"></i></p>
                  </div>
                  <div class="tn-list-bottom">
                    <button @click="seeTheBillMessage">查看账单</button>
                    <button @click="viewElectronicInvoices">查看电子发票</button>
                  </div>
                </li>
              </ul>
            </div>
        </section>
        <seeAtTheBill v-if="isOpenWindow" @clolseWindow="clolseWindow"></seeAtTheBill>
    </div>
</template>

<script>
import headerT from "../../components/header.vue";
import toNewComponent from "../../components/billComponent/toNewComponent.vue";
import seeAtTheBill from "../../components/billComponent/seeAtTheBill.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    toNewComponent,
    seeAtTheBill
  },
  data() {
    return {
      headerContent: "续期账单查询",
      toDownIcon:require('@/assets/billImg/xq_icon_xia.png'),
      imgSrcTitle: require('@/assets/mgImg/xq_icon_xx.png'),
      isOpenContent: false,
      isOpenWindow: false,
    };
  },
  created(){
    console.log(this.$route.query.policyCode)
    let xqPolicyCode = this.$route.query.policyCode
    // let xqPolicyCode = new FormData()
    //     xqPolicyCode.append("policyCode", this.$route.query.policyCode);
    this.getToNewIndexListMsg({
      xqPolicyCode,
      successCallback: res => {
        console.log(res.result);
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
      getToNewIndexListMsg: "getToNewIndexListMsg"
    }),
    policyMessage(policyCode) {
      // this.$router.push({ path: '/mgPlicyInfo',query: {policyCode: policyCode} });
    },
    openContent(){
      this.isOpenContent = !this.isOpenContent
    },

    //打开查看账单
    seeTheBillMessage(){
      this.isOpenWindow = true
    },

    //关闭查看账单
    clolseWindow(){
      this.isOpenWindow = false
    },

    //跳转到查看电子发票页面
    viewElectronicInvoices(){
      // this.$router.push({ path: '/mgPlicyInfo',query: {policyCode: policyCode} });
      this.$router.push({ path: '/toNewIndexView' });
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
      color: #fba41c;
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
                  right: 0;
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
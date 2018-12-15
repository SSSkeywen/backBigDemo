<template>
  <div class="change-bg">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="addressList">
    <section  class="sq clearfix" v-for="(item,index) in addressList" :key="index">
      <div class="sq_xz">
        <ul>
          <li class="zs_qh">
            <div class="sq_mc" style="width: 88%;">
              <span>保单号：</span>
              <i name="policyCode">{{item.policyCode}}</i>
              <a class="shangczp_r_y2" @click="changeAddressFn(index)">修改</a>
              <!--<i class="_select"><input type="checkbox" name="" id="" value="" /></i>-->
            </div>
          </li>
          <ul class="zs" style="display: block;">
            <li class="quxi">
              <div class="sq_mc1">
                <span>投保人</span>
              </div>
              <div class="sq_nr">
                <span>{{secondaryName}}</span>   
              </div>
            </li>
            <li class="quxi">
              <div class="sq_mc1">
                <span>收费地址</span>
              </div>
              <div class="sq_nr">
                <span>{{item.addressFee}}</span>
              </div>
            </li>
            <li class="quxi">
              <div class="sq_mc1">
                <span>邮政编码</span>
              </div>
              <div class="sq_nr">
                <span>{{item.zipLink}}</span>
              </div>
            </li>
            <!--<li class="btn">
							<button>修改</button>
            </li>-->
          </ul>
        </ul>
      </div>
    </section>
    </div>
    <p v-else>未查询到数据！</p>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import btnComponent from "../../components/btnComponent.vue";
import alertContent from "../../components/alertContent";
import yesAndNoAlert from "../../components/yesAndNoAlert";
import notToOpenComponent from "../../components/notToOpenComponent.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      headerContent: "收费地址变更",
      addressList: [],
      secondaryName:''
    };
  },
  components: {
    headerT,
    btnComponent,
    alertContent,
    yesAndNoAlert,
    notToOpenComponent
  },
  created() {
    const toast1 = Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 1000
    });
    this.getPayInfomation({
      successCallback: result => {
        console.log(result);
        this.addressList = result.list;
        this.secondaryName = result.secondaryName;
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
      getPayInfomation: "getPayInfomation"
    }),

    IKnow() {
      this.$router.go(-1);
    },

    changCountNew() {
      this.alertCountTwo.isShowyesOrNo = true;
    },

    changeAddressFn(index) {
      let changeData = this.addressList[index];
      this.$router.push({
        path: "/contactAddressChange",
        query: { changeData: changeData }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sq_xz {
  width: 95%;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  line-height: 30px;
  margin-top: 10px;
}
.zs_qh {
  width: 100%;
  background: #00ae4d;
  border-radius: 10px 10px 0 0;
}
.sq_mc {
  width: 88%;
  margin: 0 auto;
  color: #fff;
}
.sq_mc a {
  color: #fba41c;
  float: right;
  text-decoration: underline;
}
.zs {
  display: block;
  width: 88%;
  margin: 5px auto;
  padding-bottom: 10px;
}
.quxi {
  display: -webkit-flex;
  display: flex;
  border-bottom: 1px solid #d1d2d2;
  width: 100%;
}
.sq_mc1 {
  width: 40%;
}
.quxi .sq_nr {
  width: 60%;
  font-size: 14px;
  text-align: right;
}
</style>
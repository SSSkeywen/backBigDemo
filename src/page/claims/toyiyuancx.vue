<template>
  <div class="yy-box">
    <headerT :headerContent="headerContent"></headerT>
    <section v-show="isShowMsg">
      <div class="yy-select">
        <ul class="yy-ul">
          <li class="yy-li">
            <p class="yy-select-title">请选择省份：</p>
            <select name id @change="selectProvince(proData)" v-model="proData">
              <option>上海市</option>
              <option>重庆市</option>
              <option>天津市</option>
              <option>北京市</option>
              <option>河北省</option>
              <option>海南省</option>
              <option>山西省</option>
              <option>吉林省</option>
              <option>黑龙江省</option>
              <option>江苏省</option>
              <option>浙江省</option>
              <option>安徽省</option>
              <option>云南省</option>
              <option>青海省</option>
              <option>宁夏回族自治区</option>
              <option>新疆维吾尔自治区</option>
              <option>四川省</option>
              <option>湖北省</option>
              <option>湖南省</option>
              <option>广东省</option>
              <option>广西壮族自治区</option>
              <option>浙江省</option>
              <option>西藏自治区</option>
              <option>陕西省</option>
              <option>甘肃省</option>
              <option>内蒙古自治区</option>
              <option>辽宁省</option>
              <option>福建省</option>
              <option>江西省</option>
              <option>山东省</option>
              <option>河南省</option>
              <option>贵州省</option>
            </select>
          </li>
          <li class="yy-li">
            <p class="yy-select-title">请选择城市：</p>
            <select name id v-model="cityData">
              <option :value="item" v-for="(item,index) in cityList" :key="index">{{item}}</option>
            </select>
          </li>
          <li class="yy-li">
            <p class="yy-select-title">请输入医院名称：</p>
            <input type="text" placeholder="请输入2-15个字符" v-model="hospitalData">
          </li>
        </ul>
      </div>
      <div class="yy_cx">
        <button @click="queryFn">开始查询</button>
      </div>
    </section>
    <section v-show="!isShowMsg">
      <hospitalList :hospitalListData="hospitalListData" @closeHospitalList="closeHospitalList"></hospitalList>
    </section>
    <alertContent :alertCount="alertCount"></alertContent>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import alertContent from "../../components/alertContent.vue";
import hospitalList from "../../components/claimsComponent/hospitalList.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    hospitalList,
    alertContent
  },
  data() {
    return {
      headerContent: "医院信息",
      isShowMsg: true,
      proData: "上海市",
      cityData: "全部",
      cityList: ["全部城市"],
      hospitalData: "",
      hospitalListData: [],
      alertCount: {
        isShowAlert: false,
        alertData: ""
      }
    };
  },
  created() {
    this.selectProvince(this.proData);
  },
  methods: {
    ...mapActions({
      hospitalInformation: "hospitalInformation",
      hospitalList: "hospitalList"
    }),
    selectProvince(proData) {
      let provinceSelectData = {
        provinceName: proData
      };
      this.hospitalInformation({
        provinceSelectData,
        successCallback: result => {
          this.cityList = ["全部城市"]
          for(let item of result){
            this.cityList.push(item);
          }
          
          this.cityData = this.cityList[0];
        },
        fCallback: res => {}
      });
    },
    queryFn() {
      if (this.hospitalData == "") {
        this.alertCount.isShowAlert = true;
        this.alertCount.alertData = '医院名称不能为空！';
        return false;
      }
      let hospitalSelectData = {
        provinceName: this.proData,
        cityName: this.cityData,
        hospitalName: this.hospitalData
      };

      this.hospitalList({
        hospitalSelectData,
        successCallback: result => {
          this.hospitalListData = result.data;
          if (this.hospitalListData) {
            this.isShowMsg = !this.isShowMsg;
          } else {
            this.alertCount.isShowAlert = true;
            this.alertCount.alertData = result.msg;
          }
        },
        fCallback: res => {}
      });
    },

    //关闭医院列表
    closeHospitalList() {
      this.isShowMsg = !this.isShowMsg;
    }
  }
};
</script>

<style lang="scss" scoped>
.yy-box {
  min-height: 100vh;
  background-color: #dcdcdc;
  padding-bottom: 0.2rem;
  box-sizing: border-box;
  .yy-select {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding-bottom: 10px;
    .yy-ul {
      width: 90%;
      margin: 0 auto;
      padding-top: 1%;
      padding-bottom: 1%;
      .yy-li {
        width: 100%;
        line-height: 0.52rem;
        margin: 5px 0;
        select,
        input {
          width: 95%;
          height: 0.52rem;
          line-height: 0.36rem;
          border-radius: 7px;
          padding-left: 0.1rem;
          border: 1px solid #999;
          background-position: 96% center;
        }
      }
      .yy-xx-li {
        border-bottom: 1px solid #7b7b7b;
        width: 100%;
        line-height: 0.52rem;
        margin: 5px 0;
        p:last-child {
          font-size: 0.24rem;
          height: 0.52rem;
          line-height: 0.36rem;
          color: #7b7b7b;
        }
      }
    }
  }

  .yy_cx {
    width: 50%;
    margin: 0 auto;
    button {
      width: 100%;
      height: 0.7rem;
      background-color: #00ae4d;
      color: #fff;
      border: none;
      border-radius: 7px;
    }
  }
}
</style>
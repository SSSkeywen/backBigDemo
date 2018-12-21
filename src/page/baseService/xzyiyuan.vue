<template>
  <div style="background-color: #dcdcdc;    min-height: 100vh;">
    <div class="header">就诊医院（最多4家）</div>
    <div class="content">
      <div class="bdhflb" v-if="this.$route.query.hospitalList !=null&&this.$route.query.hospitalList!=''">
        <div class="bdhf_cont">
          <ul>
            <li v-for="(Item,hospitalIndex) in this.$route.query.hospitalList "
             :key="hospitalIndex"
             :value="hospitalIndex"
             >
              <div class="bdhf_cont_left"><p>{{Item}}</p></div>
              <div class="bdhf_cont_right">
                <label>
                  <input class="green_botton" type="submit" name="button_sh"  value="删除" @click="del($event)">
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="bdhflb">
        <div class="bdhf_tt">查询添加医院</div>
        <div class="bdhf_cont2">
          <div
            class="form_nr"
            v-for="(queryAddhospitalItem,queryAddhospitalIndex) in queryAddhospitalList"
            :key="queryAddhospitalIndex"
          >
            <div class="form_nrtop" v-text="queryAddhospitalItem.queryAddhospitalName">请选择省份：</div>
            <div class="form_nrbottom" v-if="queryAddhospitalItem.isSElect">
              <select name="select" class="select_lei" id="select_sf" @change="queryProvinces">
                <option
                  v-for="(provinceItem,provinceIndex) in provinceList"
                  :key="provinceIndex"
                  v-text="provinceItem.provinceName"
                ></option>
              </select>
            </div>
            <div class="form_nrbottom1" v-if="queryAddhospitalItem.isSElect1">
              <select name="select_cs" class="select_lei" id="city">
                <option>全部城市</option>
                <!-- <option selected="selected">上海</option> -->
                <option
                v-for="(Item,Index) in city"
                :key="Index"
                v-text="Item"
              ></option>
              </select>
            </div>

            <div class="form_nrbottom" v-if="queryAddhospitalItem.isSElect2">
              <input
                type="text"
                name="input_yymc"
                onblur="if (value==''){value='请输入2-15个字符';style.color='#000'}"
                onfocus="if(value=='请输入2-15个字符'){value='';style.color='#000'}"
                value="请输入2-15个字符"
                class="yzxxlr_input"
                style="color:#999;"
                id="hospName"
              >
            </div>
            <div style="clear:both"></div>
          </div>

          <div style="clear:both"></div>
        </div>
        <div class="bdhf_rbtn_div" @click="yiyuanlbFn()">
          <label>
            <input
              class="green_botton select_botton"
              name="btn_kscx"
              type="submit"
              id="button"
              value="查询医院"
            >
          </label>
        </div>
      </div>
    </div>
    <div class="reset_div" @click="AlertReport()">
      <input type="button" name="wcba" class="reget_btn" value="完成报案">
    </div>

    <div id="bangd_agent_dialog1" class="yz_fail" style="display: none">
      <div class="yz_fail_nr">
        <div class="yz_close" style=" top: 10px;"></div>
        <div class="yz_successcont" style="height:50%"></div>
        <div class="yz_failfont" style="color: black;" name="msg">报案成功</div>
        <div class="yz_bgzc" style=" margin: 10%;display: none"></div>
      </div>
      <div class="sure">确定</div>
    </div>
     <alertContentThing :alertCount="alertCount" ref="Alert" v-on:btnIKnow="btnIKnow"></alertContentThing>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapActions } from "vuex";
import alertContentThing from '@/components/alertContentThing.vue'
import { Toast } from "vant";
export default {
      components: {
        alertContentThing
    },
  data() {
    return {
      // 医院
      hospitalList: [
        { hospitalName: "上海第十医院" },
        { hospitalName: "华山医院" }
      ],
      queryAddhospitalList: [
        { queryAddhospitalName: "请选择省份：", isSElect: "true" },
        { queryAddhospitalName: "请选择城市：", isSElect1: "true" },
        { queryAddhospitalName: "请输入医院名称：", isSElect2: "true" }
      ],
      // 省份选择框
      provinceList: [
        { provinceName: "上海市" },
        { provinceName: "重庆市" },
        { provinceName: "天津市" },
        { provinceName: "北京市" },
        { provinceName: "河北省" },
        { provinceName: "海南省" },
        { provinceName: "山西" },
        { provinceName: "吉林省" },
        { provinceName: "黑龙江省" },
        { provinceName: "江苏省" },
        { provinceName: "浙江省" },
        { provinceName: "安徽省" },
        { provinceName: "云南省" },
        { provinceName: "青海省" },
        { provinceName: "宁夏回族自治区" },
        { provinceName: "新疆维吾尔自治区" },
        { provinceName: "四川省" },
        { provinceName: "湖北省" },
        { provinceName: "湖南省" },
        { provinceName: "广东省" },
        { provinceName: "广西壮族自治区" },
        { provinceName: "浙江省" },
        { provinceName: "西藏自治" },
        { provinceName: "陕西省" },
        { provinceName: "甘肃省" },
        { provinceName: "内蒙古自治区" },
        { provinceName: "辽宁省" },
        { provinceName: "福建省" },
        { provinceName: "山东省" },
        { provinceName: "河南省" },
        { provinceName: "贵州省" }
      ],
      city:[],
      // 人际关系
      relationList: [
        { customeRelations: "请选择" },
        { customeRelations: "配偶" },
        { customeRelations: "子女" },
        { customeRelations: "父母" },
        { customeRelations: "本人" },
        { customeRelations: "同事" },
        { customeRelations: "其他" }
      ],
      // 事故性质
      accidentNatureList: [
        { accidentNatureRelations: "请选择" },
        { accidentNatureRelations: "意外" },
        { accidentNatureRelations: "疾病" }
      ],
      alertCount:{
          isShowAlert:false,
          alertData:'报案成功',
      },
      res:"",
      hospitalItem:[],
      hospitalItem1:""
    };
  },
  mounted() {
    this.queryProvinces();
    this.hospitalItem=[];
    let t=this.$route.query.hospitalList || 0;
    this.hospitalItem=t;
    console.log("this.hospitalList")
    console.log(this.hospitalItem)
    // alert(this.$route.query.hospitalList.length);
    //  alert(this.hospitalItem.length);
  },
  methods: {
    ...mapActions({
        xzyiyuan: "xzyiyuan",
        hospitalQuery:"hospitalQuery"
    }),
    //跳转到下一页
    yiyuanlbFn() {
      //省份
      this.select_sf = document.querySelector("#select_sf");
      let index = this.select_sf.selectedIndex;
      let provincesValue =this.select_sf.options[index].text;
      //城市
      this.city = document.querySelector("#city");
      let indexCity = this.city.selectedIndex;
      let cityValue =this.city.options[indexCity].text;
      //医院
      let hospName =document.querySelector('#hospName').value;
      let hospitalJson={sfName:provincesValue,csName:cityValue,yyName:hospName};

      if( hospName == "" || hospName == "请输入2-15个字符"){
          Toast('您输入医院名称不能为空');
          return ;
      }
      console.log("console.log(hospitalQuery);");
      console.log(hospitalJson);
      this.hospitalQuery({
        hospitalJson,
          successCallback: result => {
              this.result=result;
              this.res=result;
              console.log("----------------this.result")
              console.log(this.res)
              console.log(this.result);
              this.$router.push({ 
                  path: "/yiyuanlb",
                  query:{
                      res: this.res,
                  }
              });
              
          },
          failCallback: res => {
            console.log(res.msg)
             Toast(res.msg);
          }
      });
    },
    //完成报案弹窗
    AlertReport(){
      this.alertCount.alertData ="报案成功!";
      this.alertCount.btnMsg ="确定";
      this.alertCount.isShowAlert = true;
      this.$router.push({ path: "../userEvaluation" });
      console.log("完成报案");
    },
    del(e){
      let self= e.target.parentNode.parentNode.parentNode;
      let index=e.target.parentNode.parentNode.parentNode.value;

      // this.hospitalItem.splice(index,1,null);
      if(self.parentNode.children.length > 1){
         self.remove();
      }else{
        self.parentNode.parentNode.parentNode.remove();
      }
      //
      //alert(e.target.parentNode.parentNode.parentNode.parentNode.children.length)
    },
    btnIKnow(){
      this.$router.push({ path: "../businessHanding" });
    },
    //省份查询
    queryProvinces(){
      //省份
      this.select_sf = document.querySelector("#select_sf");
      let index = this.select_sf.selectedIndex;
      let provinces =this.select_sf.options[index].text;
      console.log(provinces)
      //城市
      this.city = document.querySelector("#city");
      this.xzyiyuan({
        provinces,
        successCallback: result => {
            this.result=result;
            this.city=this.result.data;
            console.log("this.result")
            console.log(this.result);
            console.log(this.result.data);
            // this.city.selectedIndex=
            
        },
        failCallback: res => {

        }
    });
    }
  }
};
</script>

<style scoped>
.bdhflb {
  padding-bottom: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4) /*firefox*/;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4) /*webkit*/;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
}
.header {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #006cb7;
  text-align: center;
  font-size: 0.36rem;
  color: #fff;
}
.content {
  padding: 20px 10px 10px;
}
.bg_nrbottom input {
  width: 97%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*firefox*/;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*webkit*/;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
.bdhf_cont {
  overflow: hidden;
}
.bdhf_cont ul {
  margin-bottom: -1px;
}
.bdhf_cont ul li {
  padding: 12px 10px 10px;
  overflow: hidden;
  border-bottom: 1px solid #cbcbcb;
}
.bdhf_cont_left {
  width: 65%;
  float: left;
  height:40px;
  font-size: 0.26rem;
  display:flex;
  align-content: center;
  justify-content: center;
  background: url("../../../src/assets/mgImg/icon_04.png") no-repeat center left;
}
.bdhf_cont_left p {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  padding-left: 30px;
}
.bdhf_cont_right {
  width: 30%;
  margin-left: 2%;
  float: right;
}
.green_botton {
  display: block;
  padding-top: 0.12rem;
  padding-bottom: 0.12rem;
  text-align: center;
  cursor: pointer;
  font-family: "微软雅黑";
  font-size: 0.24rem;
  color: #fff;
  background: #22b22c url("../../../src/assets/mgImg/from_botton_bghover.jpg")
    repeat;
  border: 0;
  width: 96%;
  border-radius: 5px;
  margin: 0 auto;
}
.bdhf_tt {
  padding: 10px 10px;
  color: #fff;
  font-size: 0.34rem;
  background: #00ac0c;
  -moz-border-radius-topleft: 10px;
  -moz-border-radius-topright: 10px;
  -khtml-border-top-left-radius: 10px;
  -khtml-border-top-right-radius: 10px;
  -webkit-border-top-left-radius: 10px;
  -webkit-border-top-right-radius: 10px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3) /*firefox*/;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3) /*webkit*/;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
}
.bdhf_cont2 {
  margin: 10px;
}
.form_nr {
  width: 96%;
  padding-bottom: 10px;
  padding-left: 2%;
  padding-right: 2%;
}
.form_nrtop {
  width: 100%;
  line-height: 0.8rem;
  font-size: 0.3rem;
}
.form_nrbottom {
  width: 100%;
}
.select_lei {
  font-family: "微软雅黑";
  font-size: 0.26rem;
  height: 38px;
  float: right;
  width: 100%;
  line-height: 38px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*firefox*/;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*webkit*/;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  background: url("../../../src/assets/images/Group1.png") no-repeat scroll 98% center transparent !important;
  background-size: 8px 8px !important;
  padding-left:10px;
}
.reget_btn {
  font-family: "微软雅黑";
  font-size: 1.6em;
  color: #fff;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  cursor: pointer;
  border: 1px solid #8f8f8f;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -moz-box-shadow: inset 0px 0px 10px 0px rgba(255, 255, 255, 0.8) /*firefox*/;
  -webkit-box-shadow: inset 0px 0px 10px 0px rgba(255, 255, 255, 0.8) /*webkit*/;
  box-shadow: inset 0px 0px 10px 0px rgba(255, 255, 255, 0.8);
}
.reget_btn {
  font-family: "微软雅黑";
  font-size: 0.34rem;
  color: #fff;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  cursor: pointer;
  background: #00ac0c url("../../../src/assets/mgImg/btn_green.png") repeat-x;
  border: 1px solid #8f8f8f;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;

  -moz-box-shadow: inset 0px 0px 10px 0px rgba(255, 255, 255, 0.8) /*firefox*/;
  -webkit-box-shadow: inset 0px 0px 10px 0px rgba(255, 255, 255, 0.8) /*webkit*/;
  box-shadow: inset 0px 0px 10px 0px rgba(255, 255, 255, 0.8);
}
.yzxxlr_input {
  text-indent: 0.15rem;
  border: 1px solid #a1a1a1;
  height: 0.66rem;
  font-family: "微软雅黑";
  font-size: 0.26rem;
  line-height: 0.66rem;
  width: 100%;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  /* progid: DXImageTransform.Microsoft.gradient(startColorstr=#3363370b,endColorstr=#3363370b); */
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*firefox*/;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) /*webkit*/;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
select {
  border-radius: 0px;
  border-color: rgb(169, 169, 169);
}
/* 弹窗 */
.yz_fail {
  z-index: 9999;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: Gray;
  filter: alpha(opacity=95);
  text-align: center;
  opacity: 0.95;
  vertical-align: top;
}
.yz_fail_nr {
  margin: 50px 0 0 3%;
  height: 70%;
  width: 94%;
  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
.yz_close {
  height: 40px;
  width: 40px;
  right: 1%;
  top: 35px;
  background: url("../../../src/assets/mgImg/close_icon.png") no-repeat;
  position: absolute;
  z-index: 9999999;
}
.yz_failcont {
  height: 55%;
  background: url("../../../src/assets/mgImg/fail_icon.png") 50% 85% no-repeat;
}
.yz_failfont {
  overflow-y: hidden;
  margin: 0 10px 0 10px;
  height: 40%;
  font-size: 22px;
  text-align: center;
}
.yz_successcont {
  height: 55%;
  background: url("../../../src/assets/mgImg/sucess_icon.png") 50% 85% no-repeat;
}
.yz_failcont {
  height: 55%;
  background: url("../../../src/assets/mgImg/fail_icon.png") 50% 85% no-repeat;
}
select {
  border-radius: 0px;
  border: 1px solid rgb(169, 169, 169);
}
.sure{
  width: 60%;
  height: 0.8rem;
  background: #00ac0c;
  text-align: center;
  line-height: 0.8rem;
}
</style>

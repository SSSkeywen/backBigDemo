<template>
  <div id="lpba">
    <div class="header">理赔报案</div>
    <div class="content">
      <div class="contert_zt">
        <div class="baoanxx_t1">
          <div class="baoanxx_left">
            <img :src="dangerousCustomer" width="18" height="23">
          </div>
          <div class="baoanxx_right">出险客户信息</div>
        </div>
        <div
          class="form_nr"
          v-for="(dangerousCustomerItem,dangerousCustomerIndex) in dangerousCustomerList"
          :key="dangerousCustomerIndex"
        >
          <div class="form_nrtop" v-text="dangerousCustomerItem.dangerousCustomerTitle">出险客户姓名：</div>
          <div class="form_nrbottom" v-if="dangerousCustomerItem.isSElect">
            <select id="customerName" name="accidentName" class="select_lei" @change="getInf">
              <!-- <option value accidentId accidentSex certcode certtype></option> -->
              <option 
                v-for="(item,index) in customerName"
                v-text="item"
              ></option>
            </select>
          </div>
          <div class="form_nrbottom" v-if="dangerousCustomerItem.isSElect1">
            <select name="certtype" disabled class="select_lei" ref="idType" id="idType" >
              <option
                v-for="(certtypeItem,certtypeIndex) in certtypeList"
                :key="certtypeIndex"
                :value="certtypeIndex"
                v-text="certtypeItem.Certtype"
              ></option>
            </select>
          </div>

          <div class="form_nrbottom" v-if="dangerousCustomerItem.isSElect3">
            <input type="text" disabled id="idTypeNum" class="yzxxlr_input" style="color:#999;" name="accidentMobile">
          </div>
          <div class="form_nrbottom" v-if="dangerousCustomerItem.isSElect4">
            <input type="text"  id="tel" class="yzxxlr_input" style="color:#999;" name="accidentMobile">
          </div>
          <div style="clear:both"></div>
        </div>

        <!-- 出险信息2 -->
        <div class="baoanxx_t1">
          <div class="baoanxx_left">
            <img :src="baoanxxImg" width="18" height="21">
          </div>
          <div class="baoanxx_right">报案信息</div>
        </div>
        <div
          class="form_nr"
          v-for="(dangerousCustomer2Item,dangerousCustomer2Index) in dangerousCustomerList2"
          :key="dangerousCustomer2Index +'-label'"
        >
          <div class="form_nrtop" v-text="dangerousCustomer2Item.dangerousCustomerTitle"></div>
          <div class="form_nrbottom" v-if="dangerousCustomer2Item.isSElect">
            <input type="text" class="yzxxlr_input" id="InfName" style="color:#999;" placeholder="请输入" name="callerName" disabled >
          </div>
          <div class="form_nrbottom" v-if="dangerousCustomer2Item.isSElect6">
            <input type="text" class="yzxxlr_input" id="accidentPlace" placeholder="请输入" style="color:#999;" name="callerName">
          </div>
          <div class="form_nrbottom" v-if="dangerousCustomer2Item.isSElect7">
            <input type="text" class="yzxxlr_input" id="infTel" placeholder="请输入" style="color:#999;" name="callerName">
          </div>
          <div class="form_nrbottom" v-if="dangerousCustomer2Item.isSElect1">
            <select name="relation" class="select_lei" id="relation">
              <option
                v-for="(relationItem,relationIndex) in relationList"
                :key="relationIndex"
                :value="relationIndex"
                v-text="relationItem.customeRelations"
              ></option>
            </select>
          </div>
          <div class="form_nrbottom" v-if="dangerousCustomer2Item.isSElect5">
            <input
            id="accidentDate"
              type="text"
              class="yzxxlr_input"
              style="color:#999;"
              name="callerName"
              placeholder="请选择"
              readonly
              :value="startDate"
              @click="openDate('ago')"
            >
            <div class="dateBox">
              <van-datetime-picker
                v-model="date1"
                type="date"
                :min-date="minDate"
                v-show="agoShow"
                @change="change(date1,'ago')"
                @confirm="ok()"
                @cancel="cancelBtn()"
              />
            </div>
          </div>
          <div class="form_nrbottom" v-if="dangerousCustomer2Item.isSElect2">
            <select name="accidentNature" class="select_lei" id="InfNrelationame">
              <option
                v-for="(accidentNatureItem,accidentNatureIndex) in accidentNatureList"
                :key="accidentNatureIndex"
                :value="accidentNatureIndex"
                v-text="accidentNatureItem.accidentNatureRelations"
              ></option>
            </select>
          </div>
          <div class="form_nrbottom" v-if="dangerousCustomer2Item.isSElect3">
            <ul>
              <li>
                <input
                    type="checkbox"
                    name="CheckboxGroup0"
                    value="0"
                    autocomplete="off"
                    style=" -webkit-appearance: checkbox; "
                    v-model="accidentResults"
                  >
                <label>门诊</label>
              </li>
              <li>
                <input
                    type="checkbox"
                    name="CheckboxGroup1"
                    value="1"
                    autocomplete="off"
                    style=" -webkit-appearance: checkbox; "
                    v-model="accidentResults"
                  >
                <label>住院</label>
              </li>
             <li>
                <input
                    type="checkbox"
                    name="CheckboxGroup2"
                    value="2"
                    autocomplete="off"
                    style=" -webkit-appearance: checkbox; "
                    v-model="accidentResults"
                  >
                <label>残疾</label>
              </li>
              <li>
                <input
                    type="checkbox"
                    name="CheckboxGroup3"
                    value="3"
                    autocomplete="off"
                    style=" -webkit-appearance: checkbox; "
                    v-model="accidentResults"
                  >
                <label>重疾</label>
              </li>
            </ul>
            <br>
            <ul>
              <li class>
                <span class="form_bset">(注：如为身故出险，请拨打95589进行报案。)</span>
              </li>
            </ul>
          </div>
          <div class="form_nrbottom" v-if="dangerousCustomer2Item.isSElect4">
            <textarea name="accidentContent" id="detailsAccident" class="longw_input" style="color:#999;"></textarea>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>

      <div class="reset_div" @click="nextPage()">
        <input type="button" class="reget_btn" value="下一步">
      </div>
    </div>
    <!--弹出框内容-->
    <div id="dialog" class="yz_fail" style="display: none">
      <div class="yz_fail_nr">
        <div class="yz_close"></div>
        <div class="yz_failcont"></div>
        <div class="yz_failfont" name="msg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { dateStyle } from "@/filter/dateStyle.js";
import { toolsTwo } from "@/js/toolsTwo.js";
import { Toast } from "vant";

export default {
  data() {
    return {
      minDate: new Date(),
      currentDate:'',
      startDate:'',
      endDate: this.$route.query.endDate,
      date1: this.$route.query.startDate,
      agoShow: false,
      nowShow: false,
      dangerousCustomer: require("@/assets/images/icon_01.png"),
      baoanxxImg: require("@/assets/images/icon_02.png"),
      // dangerousCustomer: "@/assets/images/icon_01.png",
      // 证件
      certtypeList: [
        { Certtype: "身份证" },
        { Certtype: "军人证" },
        { Certtype: "护照" },
        { Certtype: "出生证" },
        { Certtype: "异常身份证" },
        { Certtype: "回乡证" },
        { Certtype: "士兵证" },
        { Certtype: "警官证" },
        { Certtype: "其它" }
      ],
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
      dangerousCustomerList: [
        { dangerousCustomerTitle: "出险客户姓名：", isSElect: "true" },
        { dangerousCustomerTitle: "证件类型：", isSElect1: "true" },
        { dangerousCustomerTitle: "证件号码：", isSElect3: "true" },
        { dangerousCustomerTitle: "出险客户手机号：", isSElect4: "true" },

      ],
      dangerousCustomerList2: [
        { dangerousCustomerTitle: "报案人姓名：", isSElect: "true" },
        { dangerousCustomerTitle: "与出险客户关系：", isSElect1: "true" },
        { dangerousCustomerTitle: "事故日期：", isSElect5: "true" },
        { dangerousCustomerTitle: "事故地点：", isSElect6: "true" },
        { dangerousCustomerTitle: "报案人手机号：", isSElect7: "true" },
        { dangerousCustomerTitle: "事故性质：", isSElect2: "true" },
        { dangerousCustomerTitle: "事故结果：", isSElect3: "true" },
        { dangerousCustomerTitle: "事故经过：", isSElect4: "true" }
      ],
      incidentOutcomeList: [
        { incidentOutcomeName: "门诊", incidentOutcomeID: "CheckboxGroup1_0" },
        { incidentOutcomeName: "住院", incidentOutcomeID: "CheckboxGroup1_4" },
        { incidentOutcomeName: "残疾", incidentOutcomeID: "CheckboxGroup1_1" },
        { incidentOutcomeName: "重疾", incidentOutcomeID: "CheckboxGroup1_2" }
      ],
      customerName:["请选择"],
      customerName2:[],
      idType:[],
      accidentResults:[]
    };
  },
  created(){
        this.getebaoaninfo({
            successCallback: (res) => {
              console.log("获取成功")
                let list=res.data.list;

                for (let i=0;i<list.length;i++){
                  //存储客户姓名
                  // this.customerName.splice(0,this.customerName.length)
                  this.customerName.push(list[i].real_NAME);
                }

            },
            failCallback:(res) => {
              console.log("获取失败")
            },
            fCallback:(res) => {
                if(res.code==2002){
                    this.$router.push({  
                        path: '/userInfo',
                        query:{pathAddress: '/unitLinked'} 
                    });
                }
                 console.log("2002")
            }
        })
  },
  mounted() {

  },
  mutations:{
    //向state里设置数据
    changeListMutation(state,list){
      state.list = list
    },


  },
  methods: {
    ...mapActions({
        getebaoaninfo: "getebaoaninfo"
    }),
    //跳转到下一页
    nextPage() {
      console.log(this.accidentResults)
        //       //出险客户信息
        let customerName = document.querySelector('#customerName').selectedIndex;
      //事故日期
        let accidentDatevalue = document.querySelector('#accidentDate').value;

        //事故地点
        let accidentPlacevalue = document.querySelector('#accidentPlace').value;

        //报案人姓名
        let InfNamevalue = document.querySelector('#InfName').value;
        
        //报案人关系
        let relationvalue = document.querySelector('#relation').selectedIndex;

        //客户手机号
        let tel =document.querySelector('#tel').value;

        //客户证件号码
        let idTypeNum =document.querySelector('#idTypeNum').value;

        //报案人手机号
        let infTel =document.querySelector('#infTel').value;

        //事故性质
        let  InfNrelationame = document.querySelector('#InfNrelationame').selectedIndex;
        let  detailsAccident = document.querySelector('#detailsAccident').value;
        
        if( customerName == 0){
            Toast('出险客户姓名不能为空!');
            return ;
        }
        // if( idTypeNum == ""){
        //     Toast('出险客户证件号码不能为空!');
        //     return ;
        // }
        // if(this.$toolsTwo.phoneFn(tel) == false){
        //     Toast('出险客户手机号不能为空!');
        //     return ;
        // }
        if( tel == ""){
            Toast('出险客户手机号不能为空!');
            return ;
        }
        if(this.$toolsTwo.phoneFn(tel) == false){
            Toast('出险客户手机号格式有误!');
            return ;
        }
        if( InfNamevalue == ""){
            Toast('与出险报案人姓名不能为空!');
            return ;
        }
        if( relationvalue == 0 ){
            Toast('与出险客户关系不能为空!');
            return ;
            
        }
      if( accidentDatevalue == "" ){
            Toast('事故日期不能为空!');
            return ;
        }
        if( accidentPlacevalue == "" ){
            Toast('事故地点不能为空!');
            return ;
        }
       if( infTel == ""){
            Toast('报案人手机号不能为空!');
            return ;
        }
        if(this.$toolsTwo.phoneFn(infTel) == false){
            Toast('报案人手机号格式有误!');
            return ;
        }
        if( InfNrelationame == 0 ){
            Toast('事故性质不能为空!');
            return ;
            
        }
        if( detailsAccident== ""){
            Toast('事故经过不能为空!');
            return ;
            
        }
        if( this.accidentResults == ""){
            Toast('请选择事故结果。');
            return ;
            
        }

        this.$router.push({ path: "/xzyiyuan" });
      
      
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
    openDate(time) {
      if (time === "ago") {
        this.agoShow = true;
        this.date1 = new Date(this.date1);
      } else {
        this.agoShow = false;
        this.date2 = new Date(this.date2);
      }
    },
      ok() {
      this.agoShow = false;

      if (this.startDate == undefined || this.startDate == "") {
        this.startDate =
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate();
      } else {
      }
    },
    cancelBtn() {
      this.agoShow = false;

      if (this.startDate != undefined) {
        this.startDate = "";
      } else {
      }
    },

    getInf(){
        this.getebaoaninfo({
            successCallback: (res) => {
              
              this.customer= document.querySelector('#customerName');
              let ind =document.querySelector('#customerName').selectedIndex-1;
              console.log("mounted获取成功")
              

              //证件类型
              this.idType = document.querySelector('#idType');
              //证件类型号码
              this.idTypeNum = document.querySelector('#idTypeNum');
              //客户手机号
              this.tel = document.querySelector('#tel');
               //报案人姓名
              this.InfName = document.querySelector('#InfName');
              //报案人关系
              this.relation = document.querySelector('#relation');
              //事故日期
              this.accidentDate = document.querySelector('#accidentDate');
              //事故地点
              this.accidentPlace = document.querySelector('#accidentPlace');
              //报案人手机号
              this.infTel = document.querySelector('#infTel');
              // //事故性质
              // this.relation = document.querySelector('#InfNrelationame');
              let list=res.data.list;

              this.idTypeNum.value=list[ind].certi_CODE;

              this.tel.value=list[ind].celler;

              this.idType.selectedIndex = list[ind].certi_TYPE;

              this.InfName.value= list[ind].real_NAME;
              
              this.infTel.value= list[ind].celler;

                for (let i=0;i<list.length;i++){
                  //存储客户姓名
                 
                  //this.customerName2.push(list[i].real_NAME);
                }
            },
        })
    },
  },
  
  
};



// Vue.use(DatetimePicker);
</script>

<style scoped>
@import url("./../../../static/css/claimReport.css");
.box {
  width: 100%;
  position: relative;
}
.banquan {
  margin-top: 8%;
}
.header {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #006cb7;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.banquan {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #f0f0f0;
  color: #949494;
  font-size: 12px;
  text-align: center;
}
.dateBox {
  position: fixed;
  bottom: 0;
  left: -0.1rem;
  width: 100%;
  z-index: 99;
}
.van-picker {
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  background-color: #fff;
  -webkit-text-size-adjust: 100%;
}
.van-picker__toolbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 44px;
  line-height: 44px;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.van-picker__columns {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
}
.van-picker {
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  background-color: #fff;
  -webkit-text-size-adjust: 100%;
}
.van-picker__cancel,
.van-picker__confirm {
  color: #38f;
  padding: 0 15px;
  font-size: 14px;
}
</style>


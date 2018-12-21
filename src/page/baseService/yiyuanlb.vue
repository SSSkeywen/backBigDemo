<template>
  <div style="background-color: #dcdcdc;    min-height: 100vh;">
    <div class="header">医院列表</div>
    <div class="content">
      <div class="bdhflb">
        <div class="bdhf_tt">您还可以添加 {{4-this.hospitalList.length}} 家医院</div>
        <div class="bdhf_cont2">
            <ul>
              <li
              v-for="(Item,Index) in list"
              :key="Index"
       
              >
                 <div>
                    <p class="">
                      <span class="hospitalName">{{list[Index].hospitalName}}</span>
                      <span class="hospitalClass">{{list[Index].hospitalClassName}}</span>
                      <span class="btn_add" ref="btn_add" v-bind:class="{btn_addHusy:isAction}" @click="addHos($event)" :value="Index">添加</span>
                    </p>
                    
                 </div>
              </li>
            </ul>
        </div>
        <div class="bdhf_rbtn_div" @click="queryHos()">
          <!-- <label>
            <input
              class="green_botton select_botton"
              name="btn_kscx"
              type="submit"
              id="button"
              value="查询医院"
            >
          </label> -->
          <p>查询更对结果医院</p>
        </div>
      </div>
    </div>
    <div class="reset_div" @click="AlertReport()">
      <input type="button" name="wcba" class="reget_btn" value="添加完成">
    </div>
     <alertContent :alertCount="alertCount" ref="Alert"></alertContent>
  </div>
  <!-- </div> -->
</template>

<script>
  import { mapActions } from "vuex";
import alertContent from '@/components/alertContent.vue'
import { Toast } from "vant";
export default {
      components: {
        alertContent
    },
  data() {
    return {
      alertCount:{
          isShowAlert:false,
          alertData:'报案成功',
      },
      res:"",
      list:[],
      isAction:false,
      hospitalList:[]
    };
  },
  mounted() {
        this.res =  this.$route.query.res;
        this.list = this.res.data.list;
        
        console.log("========this.res");
        console.log(this.$route.query.res);
        console.log(this.res.list);
        console.log(this.res);
        console.log("========this.list");
        // alert("========this.list");
        //  alert(this.res.data.list.length)
        console.log(this.res.data.list[0]);
  },
  methods: {
    ...mapActions({
        hospitalQuery:"hospitalQuery"
    }),
    addHos(e){
      if(this.hospitalList.length<4){
        if(e.target.classList.contains("btn_addHusy") == false){
            let t=e.target.parentNode.children[0].textContent;
            this.btn_add=document.querySelector(".btn_add");
            e.target.classList.add("btn_addHusy");

          //合并·字符串
          this.hospitalList.push(t);
        }
          // console.log(e.target.classList.contains("btn_addHusy")== true)
      }

    },
    AlertReport(){
      this.$router.push({ 
        path: "/xzyiyuan",
        query:{
          hospitalList: this.hospitalList,
        }
    });
    },
    queryHos(){
      // if(this.$route.query.res.data.list.length>0){
      //     let l=this.$route.query.res.data.list.length;
      //     this.list.push(this.$route.query.res.data.list[l])
      //     alert(l)
      // }
    }
  }
};
</script>

<style scoped>
.bdhflb {
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
  width: 68%;
  float: left;
  font-size: 0.26rem;
  line-height: 0.7rem;
  background: url("../../../src/assets/mgImg/icon_04.png") no-repeat center left;
  text-indent: 20px;
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
.bdhf_cont2 ul li{
  margin-left: 10px;
  height: 65px;
  border-bottom: 1px solid #cbcbcb;
}
.bdhf_cont2 ul li p{
  display:flex;
  align-items: center;
  justify-content: center;
}
.bdhf_cont2 ul li span{
  display: inline-block;
  border-right: 1px solid #cbcbcb;
  text-align: center;
  /* line-height: 45px; */
}
.bdhf_cont2 ul li .hospitalName{
    width: 53%;
    border-right: 0 solid #cbcbcb;
    position: relative;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;

}
.bdhf_cont2 ul li{
  position: relative;
}
.bdhf_cont2 ul li:after{
    display: inline-block;
    content: "";
    position: absolute;
    right: 45%;
    /* left: 55%; */
    /* bottom: 0; */
    top: 0;
    width: 77%;
    height: 51px;
    border-right: 1px solid #cbcbcb;
}
.bdhf_cont2 ul li .hospitalClass{
  width: 22%;
  line-height: 65px;
  display: inline-block;
}
.bdhf_cont2 ul li .btn_add{
    display: inline-block;
    margin-top: 0px;
    width: 20%;
    line-height: 30px;
    background: #22b22c;
    color: #fff;
    border-radius: 5px;
    margin-left: 6px;
    text-align: center;

}
.bdhf_cont2 ul li .btn_addHusy{
  background: #cdcdcd;
}
.bdhf_rbtn_div{
  color:#00ac0c;
  text-align: center;
  height: 52px;
  line-height: 52px;
}
</style>

<template>
  <div class="content" :class="{white:this.type!=0}">
    <div id="header" v-if="this.type!=0">
      <header v-if="this.type=='total'">
        <span>每月收益</span>（元）：
      </header>
      <header v-if="this.type=='month'">
        <span >近一月收益</span>（元）：
      </header>
      <header v-if="this.type=='year'">
        <span >近一年收益</span>（元）：
      </header>
      <header v-if="this.type=='lqje'">
        <span >总领取金额</span>（元）：
      </header>
      <header v-if="this.type=='trje'">
        <span >总投入金额</span>（元）：
      </header>
    </div>
    <div id="wrapper" :class="{top0:this.type==0}">
      <div class="scroller">
        <ul class="nowWorth"  v-if="this.type==0">
          <li>
            <div class="v3">
              <div>开户所交保费（元）:</div>
            </div>
            <div class="v4">
              <div v-if="detialDAta.openAccPremium!=''||detialDAta.openAccPremium!=0">{{detialDAta.openAccPremium}}</div>
              <div v-else>0.0</div>
            </div>
          </li>
          <li>
            <div class="v3">
              <div>追加净保费（元）:</div>
            </div>
            <div class="v4">
              <div v-if="detialDAta.additionalPremium!=''||detialDAta.additionalPremium!=0">{{detialDAta.additionalPremium}}</div>
              <div v-else>0.0</div>
            </div>
          </li>
          
          <li>
            <div class="v3">
              <div>初始费用（元）:</div>
            </div>
            <div class="v4">
              <div v-if="detialDAta.initialAmount!=''||detialDAta.initialAmount!=0">{{detialDAta.initialAmount}}</div>
              <div v-else>0.0</div>
            </div>
          </li>
          <li>
            <div class="v3">
              <div>总领取金额（元）:</div>
            </div>
            <div class="v4">
              <div v-if="detialDAta.totalPayAmount!=''||detialDAta.totalPayAmount!=0">{{detialDAta.totalPayAmount}}</div>
              <div v-else>0.0</div>
            </div>
          </li>
          <li>
            <div class="v3">
              <div>部分领取费用（元）:</div>
            </div>
            <div class="v4">
              <div v-if="detialDAta.partialSurrender!=''||detialDAta.partialSurrender!=0">{{detialDAta.partialSurrender}}</div>
              <div v-else>0.0</div>
            </div>
          </li>
          <!-- <li v-if="productId==1179||productId==1182">
            <div class="v3">
              <div>抵缴保费（元）:</div>
            </div>
            <div class="v4">
              <div>{{detialDAta.renewalAmount}}</div>
            </div>
          </li>
          <li v-if="productId==1179&&detialDAta.balanceAmount!=0&&detialDAta.balanceAmount!=''">
            <div class="v3">
              <div>转入保单余额（元）:</div>
            </div>
            <div class="v4">
              <div>{{detialDAta.balanceAmount}}</div>
            </div>
          </li> -->
        </ul>
        
        <ul v-if="this.type=='total'||this.type=='year'||this.type=='month'">
            <li v-for="(item,index) in list" :key="index">
              <div class="v1">
                <div>
                  <!-- <span>{{detialDAta.typeName}}（元）:</span> -->
                  <span>{{detialDAta.typeName}}（元）:</span>
                  <span v-if="item.depositDate">{{item.depositDate}}</span>
                </div>
              </div>
              <div class="v2">
                <div>{{item.depositAmount}}</div>
              </div>
            </li>
            <li v-if="list==''||list==null||list.length<=0">
              <div class="v3">
                <div>
                  <!-- <span>{{detialDAta.typeName}}（元）:</span> -->
                  <span v-if="this.type=='total'||this.type=='year'">每月收益（元）:</span>
                  <span v-if="this.type=='month'">近一月收益（元）:</span>
                </div>
              </div>
              <div class="v2">
                <div>+0.00</div>
              </div>
            </li>
        </ul>
        <!-- 总投入 -->
        <ul v-if="this.type=='trje'">
          <li v-for="(item,index) in list" :key="index">
            <div class="v1">
              <div>
                <span>{{item.typeName}}（元）:</span>
                <span v-if="item.depositDate">{{item.depositDate}}</span>
              </div>
            </div>
            <div class="v2">
              <div>{{item.depositAmount}}</div>
            </div>
          </li>
          <li v-if="list==''||list==null||list.length<=0">
              <div class="v3">
                <div>
                  <span>部分生存金转入金额（元）:</span>
                </div>
              </div>
              <div class="v2">
                <div>+0.00</div>
              </div>
            </li>
        </ul>
        <!-- 总领取 -->
        <ul v-if="this.type=='lqje'">
          <li v-for="(item,index) in list" :key="index">
            <div v-if="item.depositAmountType!=null&&(productId==1179||productId==1182)">
                <div class="v1" v-if="item.depositAmountType==1">
                  <div>
                    <span>抵缴保费（元）:</span>
                    <span v-if="item.depositDate">{{item.depositDate}}</span>
                  </div>
                </div>
                <div class="v1" v-if="item.depositAmountType==2">
                  <div>
                    <span>转入保单余额（元）:</span>
                    <span v-if="item.depositDate">{{item.depositDate}}</span>
                  </div>
                </div>
                <div class="v2" v-if="item.depositAmountType==1">
                  <div>{{item.depositAmount}}</div>
                </div>
                <div class="v2" v-if="item.depositAmountType==2">
                  <div>{{item.depositAmount}}</div>
                </div>
            </div>
            <!-- 默认的显示字段 -->
            <div v-else>
                <div class="v1">
                  <div>
                    <span>部分领取金额（元）:</span>
                    <span v-if="item.depositDate">{{item.depositDate}}</span>
                  </div>
                </div>
                <div class="v2">
                  <div>{{item.depositAmount}}</div>
                </div>
            </div>
          </li>
          <li v-if="list==''||list==null||list.length<=0">
            <div class="v3">
              <div>
                <span>部分领取金额（元）:</span>
              </div>
            </div>
            <div class="v2">
              <div>+0.00</div>
            </div>
          </li>
        </ul>
        <div id="footer" v-if="laodMore">
            <div id="pullUp" style="text-align: center; background: #fafafa">
                <!-- <span class="pullUpIcon"></span> -->
                <span class="pullUpLabel" style="text-align: center">上拉加载更多</span>
            </div>
        </div>
      </div>
      <div class="zp_kuang" v-if="this.type==0">
        <ul>
          <li>
            <div class="v3">
              <div>生存转入金额（元）:</div>
            </div>
            <div class="v4">
            </div>
          </li>
          <li class="zp_li" v-for="(item,index) in list" :key="index">
            <div class="v3">
              <div>保单号</div>
              <div>{{item.policyCode}}</div>
            </div>
            <div class="v4">
              <div class="zp_div">{{item.insertDate}}</div>
              <div class="zp_div1">{{item.depositAmount}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    
    <!-- <button @click="getTen" style="display:block; position:fixed; top: 0; z-index:9999">huouqu</button> -->
  </div>
</template>


<script>
import { mapActions } from "vuex";
import { List } from "vant";
export default {
  data() {
    return {
      laodMore:false,
      type: "",
      productId: "",
      detialDAta: [],
      list: [],
      newList:[]
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.productId = this.$route.query.productId;
    let typeData = {
      type: this.$route.query.type,
      policyId: this.$route.query.policyId,
      itemId: this.$route.query.itemId
    };
    if (this.type == 0) {
      typeData["productId"] = this.$route.query.productId;
      console.log(typeData);
      this.getUniversalNowWorth({
        typeData,
        successCallback: res => {
          this.detialDAta = res.data.detailInfo;
          this.list = res.data.scjDetail;
          console.log(this.list)
        },
        fCallback: res => {}
      });
    }else if(this.type == "lqje"){
      typeData["productId"] = this.$route.query.productId;
      console.log(typeData);
      this.getUniversalDetial({
        typeData,
        successCallback: res => {
          this.detialDAta = res.data;
          this.list = res.data.GoldAccountDetailedInfo;
          for(let i=0;i<this.list.length;i++){
             if(this.list[i].depositAmountType==2&&this.list[i].depositAmount==''){
               this.list.splice(i,1);
             }
           }
          console.log(this.list);
        },
        fCallback: res => {}
      });
    }else{
      console.log(typeData);
      this.getUniversalDetial({
        typeData,
        successCallback: res => {
          if(this.type=='trje'){
            this.detialDAta = res.data.detailInfo;
            this.list= res.data.resultList;
          }else {
            // this.type=='year'||this.type=='month'||this.type=='total'
            console.log('-------year---------')
            console.log(res)
            this.detialDAta = res.data;
            this.list = res.data.data.GoldAccountDetailedInfo;
            // if(this.detialDAta.totalCount>10){
            //   console.log(0)
            //   this.pageNum++;
            //   let a= (this.pageNum - 1) * 10;
            //   this.newList = this.list.slice(a,a+10);
            //   // this.getTen();
            //   this.laodMore=true;
            // }
          }
        },
        fCallback: res => {}
      });
    }
  },

  methods: {
    ...mapActions({
      getUniversalDetial: "getUniversalDetial",
      getUniversalNowWorth: "getUniversalNowWorth"
    }),
    getTen(){
      this.pageNum++;
      console.log('--ten--')
      console.log(this.pageNum)
      let a= (this.pageNum - 1) * 10;
      this.newList = this.newList.concat(this.list.slice(a,a+10));
      if(this.newList.length >= this.list.length){
        this.laodMore = false
      }else{
        this.laodMore = true;
      }
    }
    
  }

};
</script>

<style scoped>

body {  font-size: 12px;  -webkit-user-select: none;  -webkit-text-size-adjust: none;  font-family: helvetica;}
ul,li {  padding: 0;  margin: 0;  border: 0; position: relative;}
.content{background: #fafafa;min-height: 100vh;}
.content.white{background-color: #fff;}
#header {  position: absolute;  top: 0;  left: 0;  width: 100%;  height: 45px;  line-height: 45px;  background: #999;  padding: 0;  color: #fff;  font-size: 20px;  text-align: center;}
#header a {  color: #f3f3f3;  text-decoration: none;  font-weight: bold;  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);}

#wrapper {  position: absolute;  z-index: 1;  top: 45px;  bottom: 0px;  left: 0;  width: 100%;  overflow: auto;}
.top0 .scroller{margin-top: 0.16rem;}
.scroller {  position: relative;  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  float: left;  width: 100%;  padding: 0;background: #fff;}
.scroller ul {  position: relative;  list-style: none;  padding: 0;  margin: 0 auto;  width: 90%;  text-align: left;}
.scroller li {  height: 40px;  line-height: 40px;  font-size: 14px;}
.scroller li > a {  display: block;}

#wrapper.top0 {  position: absolute;  z-index: 1;  top: 0px;  bottom: 0px;  left: 0;  width: 100%;  overflow: auto;}
#wrapper ul.thelist {  background: #fff;  width: 100%;  height: 100%;}
#wrapper li {  display: block;  height: 70px;}
#wrapper li div.v1 {  margin-top: 10px;  width: 70%;  float: left;}
#wrapper li div.v1 span{display: block;}
#wrapper li div.v1 div {  line-height: 26px;}
#wrapper li div.v2 {  width: 30%;  float: left;}
#wrapper li div.v2 div {  height: 70px;  line-height: 70px;  font-weight: 800;}
#wrapper li div.v3 {  width: 70%;  float: left;}
#wrapper li div.v3 div {  line-height: 70px;}
#wrapper li div.v4 {  width: 30%;  float: left;}
#wrapper li div.v4 div {line-height: 70px;font-weight: 800;}
/* #wrapper li div.v3 span{line-height: 35px; display: block} */
#wrapper li div.v4 .lineH35{line-height: 35px;}

#wrapper .scroller li{ border-bottom: 1px solid #dedede;}
#wrapper .scroller li::before{display: none;}
#wrapper .scroller li:last-child:after{display: none;}
#wrapper .scroller .nowWorth{width: 100%;}
#wrapper .scroller .nowWorth li::before{display: block;content: '';width: 200%;height: 200%;border-top: 1px solid #e3e3e3;transform: scaleY(.5);position: absolute;top: -50%;left:-50%;}
#wrapper .scroller .nowWorth li:last-child:after{display: block;content: '';width: 200%;height: 200%;border-top: 1px solid #e3e3e3;transform: scaleY(.5);position: absolute;top: 50%;left:-50%;}

#wrapper .scroller .nowWorth li{height: 0.8rem; position: relative; padding: 0 0.27rem;border: 0;}
#wrapper .scroller .nowWorth li div.v3 div{ line-height: .8rem;}
#wrapper .scroller .nowWorth li div.v4 div{ line-height: .8rem; text-align: right; font-weight: normal;}
#wrapper .zp_kuang{margin-top: 0.16rem; background: #fff; float: left; width: 100%;}
#wrapper .zp_kuang li{height: 0.8rem; position: relative; padding: 0 0.27rem;}
#wrapper .zp_kuang .zp_li{ height: 1.1rem;}
#wrapper .zp_kuang .zp_li div.v3{ margin-top: 0.15rem;}
#wrapper .zp_kuang .zp_li div.v4{ margin-top: 0.15rem;}
#wrapper .zp_kuang  li div.v3 div{line-height: .8rem;}
#wrapper .zp_kuang .zp_li div.v3 div{line-height: .4rem;}
#wrapper .zp_kuang .zp_li div.v4 .zp_div{font-size: .24rem; line-height: .36rem; color:#999;text-align: right;  font-weight: normal;}
#wrapper .zp_kuang .zp_li div.v4 .zp_div1{margin-top: 0.04rem; font-size: .28rem; line-height:.4rem; text-align: right; font-weight: normal;}
/** 下拉样式 Pull down styles**/
#footer {
  position: static;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    color-stop(0, #999),
    color-stop(0.02, #666),
    color-stop(1, #222)
  );
  background-image: -moz-linear-gradient(top, #999, #666 2%, #222);
  background-image: -o-linear-gradient(top, #999, #666 2%, #222);
  padding: 0;
  border-top: 1px solid #444;
}
#pullDown,
#pullUp {
  background: #fff;
  height: 40px;
  line-height: 40px;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  font-size: 14px;
  color: #888;
}
#pullDown .pullDownIcon,
#pullUp .pullUpIcon {
  display: block;
  float: left;
  width: 40px;
  height: 40px;
  background: url() 0 0 no-repeat;
  background-size: 40px 80px;
  background-size: 40px 80px;
  transition-property: -webkit-transform;
  transition-duration: 250ms;
}
#pullDown .pullDownIcon {
  transform: rotate(0deg) translateZ(0);
}
#pullUp .pullUpIcon {
  transform: rotate(-180deg) translateZ(0);
}
#pullDown.flip .pullDownIcon {
  transform: rotate(-180deg) translateZ(0);
}
#pullUp.flip .pullUpIcon {
  transform: rotate(0deg) translateZ(0);
}
#pullDown.loading .pullDownIcon,
#pullUp.loading .pullUpIcon {
  background-position: 0 100%;
  transform: rotate(0deg) translateZ(0);
  transition-duration: 0ms;
  animation-name: loading;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes loading {
  from {
    transform: rotate(0deg) translateZ(0);
  }
  to {
    transform: rotate(360deg) translateZ(0);
  }
}
</style>
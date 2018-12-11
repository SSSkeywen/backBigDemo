<template>
  <div class="content">
    <div id="header" v-if="this.type!=0">
      <header v-if="this.type=='total'">
        <span>累计收益</span>（元）：
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
      <div id="scroller">
        <!-- 现有账户价值 -->
        <ul  v-if="this.type==0">
          <li>
            <div class="v3">
              <div>开户所交保费（元）:</div>
            </div>
            <div class="v4">
              <div>{{detialDAta.openAccPremium}}</div>
            </div>
          </li>
          <li>
            <div class="v3">
              <div>追加净保费（元）:</div>
            </div>
            <div class="v4">
              <div>{{detialDAta.additionalPremium}}</div>
            </div>
          </li>
          <li>
            <div class="v3">
              <div>生存转入金额（元）:</div>
            </div>
            <div class="v4">
              <div>{{detialDAta.survivalConvert}}</div>
            </div>
          </li>
          <li>
            <div class="v3">
              <div>初始费用（元）:</div>
            </div>
            <div class="v4">
              <div>{{detialDAta.initialAmount}}</div>
            </div>
          </li>
          <li>
            <div class="v3">
              <div>总领取金额（元）:</div>
            </div>
            <div class="v4">
              <div>{{detialDAta.totalPayAmount}}</div>
            </div>
          </li>
          <li>
            <div class="v3">
              <div>部分领取费用（元）:</div>
            </div>
            <div class="v4">
              <div>{{detialDAta.partialSurrender}}</div>
            </div>
          </li>
          <li v-if="this.productId==1179||this.productId==1182">
                <div class="v3">
                    <div>抵缴保费（元）:</div>
                </div>
                <div class="v4">
                    <div>{{detialDAta.renewalAmount}}</div>
                </div>
          </li>
          <li v-if="this.productId==1179&&detialDAta.depositAmount100!=''">
                <div class="v3">
                    <div>转入保单余额（元）:</div>
                </div>
                <div class="v4">
                    <div>{{detialDAta.depositAmount100}}</div>
                </div>
          </li>
        </ul>
        <!-- 累计 和 近一年 -->
        <ul v-if="this.type=='total'||this.type=='year'">
          <li v-for="(item,index) in list" :key="index">
            <div class="v3">
              <div>
                <!-- <span>{{detialDAta.typeName}}（元）:</span> -->
                <span>每月收益（元）:</span>
                <span v-if="item.depositDate">{{item.depositDate}}</span>
              </div>
            </div>
            <div class="v4">
              <div v-if="list!=''&&list!=null">{{item.depositAmount}}</div>
              <div v-else class="lineH35">+0</div>
            </div>
          </li>
        </ul>
        <!-- 近一月 -->
        <ul v-if="this.type=='month'">
          <li>
            <div class="v3">
              <div>
                <span>近一月收益（元）:</span>
                <span v-if="list[0].depositDate">{{list[0].depositDate}}</span>
              </div>
            </div>
            <div class="v4">
              <div v-if="list!=''&&list!=null">{{list[0].depositAmount}}</div>
              <div v-else class="lineH35">+0</div>
            </div>
          </li>
        </ul>
        <!-- 总投入 -->
        <ul v-if="this.type=='trje'">
          <li>
            <div class="v3">
              <div>
                <span style="line-height:70px">开户所交保费（元）:</span>
              </div>
            </div>
            <div class="v4">
              <div>{{detialDAta.openAccPremium}}</div>
            </div>
          </li>
        </ul>
        <!-- 总领取 -->
        <ul v-if="this.type=='lqje'">
          <li v-for="(item,index) in list" :key="index">
            <div class="v3">
              <div>
                <!-- <span>{{detialDAta.typeName}}（元）:</span> -->
                <span>部分领取金额（元）:</span>
                <span v-if="item.depositDate">{{item.depositDate}}</span>
              </div>
            </div>
            <div class="v4">
              <!-- <div v-if="list!=''&&list!=null">{{item.depositAmount}}</div> -->
              <!-- 如果无值 显示空 -->
              <!-- <div v-else class="lineH35"></div> -->
              <div>{{item.depositAmount}}</div>
            </div>
          </li>
          <li v-if="this.productId==1163||this.productId==1182">
                <div class="v3">
                    <div>抵缴保费（元）:</div>
                </div>
                <div class="v4">
                    <div>{{detialDAta.renewalAmount}}</div>
                </div>
          </li>
          <li v-if="this.productId==1179&&detialDAta.depositAmount100!=''">
                <div class="v3">
                    <div>转入保单余额（元）:</div>
                </div>
                <div class="v4">
                    <div>{{detialDAta.depositAmount100}}</div>
                </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- <div id="footer">
        <div id="pullUp" style="text-align: center; background: #fafafa">
            <span class="pullUpIcon"></span><span class="pullUpLabel"
                style="text-align: center">上拉加载更多</span>
        </div>
    </div>-->
  </div>
</template>


<script>
import { mapActions } from "vuex";
import { List } from "vant";
export default {
  data() {
    return {
      type: "",
      productId: "",
      detialDAta: [],
      list: []
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
          this.detialDAta = res.data;
        },
        fCallback: res => {}
      });
    } else if(this.type == "lqje"){
      typeData["productId"] = this.$route.query.productId;
      console.log(typeData);
      this.getUniversalDetial({
        typeData,
        successCallback: res => {
          this.detialDAta = res.data;
          this.list = res.data.GoldAccountDetailedInfo.reverse();
          console.log(this.list);
        },
        fCallback: res => {}
      });
    }else{
      console.log(typeData);
      this.getUniversalDetial({
        typeData,
        successCallback: res => {
          this.detialDAta = res.data;
          this.list = res.data.GoldAccountDetailedInfo.reverse();
          console.log(this.list);
        },
        fCallback: res => {}
      });
    }
  },

  methods: {
    ...mapActions({
      getUniversalDetial: "getUniversalDetial",
      getUniversalNowWorth: "getUniversalNowWorth"
    })
  }
};
</script>

<style scoped>

body {  font-size: 12px;  -webkit-user-select: none;  -webkit-text-size-adjust: none;  font-family: helvetica;}
ul,li {  padding: 0;  margin: 0;  border: 0;}
#header {  position: absolute;  top: 0;  left: 0;  width: 100%;  height: 45px;  line-height: 45px;  background: #999;  padding: 0;  color: #fff;  font-size: 20px;  text-align: center;}
#header a {  color: #f3f3f3;  text-decoration: none;  font-weight: bold;  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);}

#wrapper {  position: absolute;  z-index: 1;  top: 45px;  bottom: 0px;  left: 0;  width: 100%;  overflow: auto;}
#scroller {  position: relative;  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  float: left;  width: 100%;  padding: 0;}
#scroller ul {  position: relative;  list-style: none;  padding: 0;  margin: 0 auto;  width: 90%;  text-align: left;}
#scroller li {  height: 40px;  line-height: 40px;  font-size: 14px;}
#scroller li > a {  display: block;}

#wrapper.top0 {  position: absolute;  z-index: 1;  top: 0px;  bottom: 0px;  left: 0;  width: 100%;  overflow: auto;}
#wrapper ul.thelist {  background: #fff;  width: 100%;  height: 100%;}
#wrapper li {  display: block;  height: 70px;  border-bottom: 1px #dedede solid;}
#wrapper li div.v1 {  margin-top: 10px;  width: 70%;  float: left;}
#wrapper li div.v1 div {  line-height: 26px;}
#wrapper li div.v2 {  width: 30%;  float: left;}
#wrapper li div.v2 div {  height: 70px;  line-height: 70px;  font-weight: 800;}
#wrapper li div.v3 {  width: 70%;  float: left;}
#wrapper li div.v3 div {  line-height: 70px;}
#wrapper li div.v4 {  width: 30%;  float: left;}
#wrapper li div.v4 div {line-height: 70px;font-weight: 800;}
#wrapper li div.v3 span{line-height: 35px; display: block}
#wrapper li div.v4 .lineH35{line-height: 35px;}
/** 下拉样式 Pull down styles**/
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
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
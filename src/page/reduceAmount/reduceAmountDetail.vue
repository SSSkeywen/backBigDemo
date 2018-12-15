<template>
<div class="mg-box">
	<div class="reduceAmountList-box" v-if="showConten">
        <div class="reduceAmountList-list">
            <section class="bq-list-box" v-for="(item,index) in dataList" :key="index">
                <header class="bq-title">
                    <div class="bq-title-img" @click="selectBd(index)" :class="{active: item.selectTrue}">
                    </div>
                    <article class="bq-title-font">
                        <p>保单号：
                            <span>{{item.RAP_policyCode}}</span>
                        </p>
                    </article>
                </header>
                <ul class="bq-content-list"
                    >
                    <li v-if="item.listDatas[0].PRODUCT_NAME">
                        <p>险种名称</p>
                        <p v-text="item.listDatas[0].PRODUCT_NAME"></p>
                    </li>
                    <li v-if="item.listDatas[0].CHARGE_NAME">
                        <p>缴费方式</p>
                        <p v-text="item.listDatas[0].CHARGE_NAME"></p>
                    </li>
                    <li v-if="item.listDatas[0].FEE_DATE">
                        <p>险种期限</p>
                        <p v-text="item.listDatas[0].FEE_DATE"></p>
                    </li>
                    <li v-if="item.listDatas[0].SA_LEVE_UNIT">
                        <p>保额/档次/份数</p>
                        <p v-text="item.listDatas[0].SA_LEVE_UNIT"></p>
                    </li>
                    <li v-if="item.listDatas[0].NEXT_DIS_PREM">
                        <p>下期缴费（元）</p>
                        <p v-text="item.listDatas[0].NEXT_DIS_PREM"></p>
                    </li>
                    <li v-if="item.listDatas[0].PAIDUP_AMOUNT">
                       <p>缴清金额（元）</p>
                       <p v-text="item.listDatas[0].PAIDUP_AMOUNT"></p>
                    </li>
                </ul>
            </section>
        </div>
	</div>
    <amountbtn @changeBtn="changeBtn" @allSelect="allSelect" :controlchangeBtn="selectAll" v-if="showConten"></amountbtn>
    <section class="error-style" v-show="isShowError">
            <div class="error-content">
                <img src="@/assets/reduceAmount/xitongyichang.png" width="100%">
                <p class="error-font"v-text="tipsContent"></p>
                <div class="error-btn">
                    <button class="style-click" @click="selectClickHere">知道了</button>
                </div>
            </div>
    </section>
    <section class="tips-two"  style="display: none;" v-show="isShowyesOrNo">
        <div class="tips-content">
            <div class="tips-font line-down">
                <p class="p-two">您选择的保单减额交清后将无需交纳保费，但同时保额会降低，请确认。</p>
            </div>
            <div class="tips-btn">
                <div class="line-right">
                    <button class="style-click" @click="closeTipsFn">否</button>
                </div>
                <div>
                    <button class="style-click" @click="submitFnTwo">是</button>
                </div>
            </div>
        </div>
    </section>
     <alertContent :alertCount="alertCount"></alertContent>
      <!-- 加载中弹出框 -->
 	<div id="accepting" class="zfqr_jiaz" style="display:none; font-size:14px;" v-show="acceptingShow">
		<div class="zfqr_nr">
			<img src="images/waiting.gif" width="44" height="44" />
			<br />
			<br />
			数据努力提交中，请一定不要返回或者退出微信~~
		</div>
	</div>
</div>

</template>
<script>
import amountbtn from "@/components/reduceAmount/reduceAmountButton.vue"
import headerT from "@/components/header.vue"
import { mapActions } from "vuex";
import { Toast } from "vant";
import alertContent from "@/components/alertContent.vue";
export default {
	data(){
		return{
            showConten: false,
            tipsContent: '对不起，请选择保单做减额交清',
            isShowError: false,
            reduceResult: false,
            isShowyesOrNo: false,
            acceptingShow: false,
            selectAll: false,
            dataList: [],
            listDatas: [],
			password: '',
			alertCount: {
				isShowAlert: false,
				alertData: ''
			},
			headerContent: '您名下支持减额交情的保单列表',
		}
	},
	methods: {
        ...mapActions({
             getReduceAmountChangeInfo: 'getReduceAmountChangeInfo'
        }),
         showTipsFn(tipsData) {
            this.isShowError = true;
            //this.tipsContent = tipsData;
        },
        selectClickHere(){
            this.isShowError=false;
        },
        closeTipsFn() {
            this.isShowyesOrNo = false;
        },
        submitFnTwo() {
        	this.isShowyesOrNo = false;
        	this.toSubmitDate();
        },
        toSubmitDate(){
        	//保单号列表
        	var array="";
            var num =0;
            //var flag = false;
            var array = new Array(); 
            for(let item of this.dataList) {
	            var arrayInfo = new Array();
                if(item.selectTrue){
                    var policy = item.RAP_policyCode;
                    arrayInfo.push(item.listDatas[0].ITEM_ID);
                	//单个保单
                	var map = {
                			policyCode: policy,
                			itemList: arrayInfo
                	}
                	array.push(map);
                    // flag = true;
                }
            }
        	this.acceptingShow = true 
            this.$router.push({path: '/reduceAmountResult', query: {neeeParms: JSON.stringify(array)}})
        },
        allSelect(b){
            this.selectAll = b
            if(this.selectAll){
                for(let item of this.dataList){
                    item.selectTrue = true
                }
            }else{
                for (let item of this.dataList) {
                    item.selectTrue = false
                }
            }
        },
        changeBtn(){
            var v=false;
            for (let item of this.dataList){
                if (item.selectTrue== true) {
                	 this.isShowError = false;
                    //this.alertCount.isShowAlert = false
                    this.isShowyesOrNo = true;
                    v=true;
                    break;
                }
            }
           if(v==false){
        	 this.tipsContent = '请选择减额交清的保单。'
             this.isShowError = true;
            //this.alertCount.isShowAlert = true
            this.alertCount.alertData = '请选择减额交清的保单。'
           }
        },
        selectBd(index){
            let data = this.dataList[index]
            data.selectTrue = !this.dataList[index].selectTrue
            this.$set(this.dataList, index, data)
            //全选后 取消一个 取消全选
            if(this.selectAll== true && this.dataList[index].selectTrue==false){
                this.selectAll= false
            }
            for (let item of this.dataList){
                if(item.selectTrue==false){
                    return;
                }
            }
            this.selectAll= true
        }
	
	},
	mounted() {
        let editdata = {"policys":JSON.parse(this.$route.query.data)}
         
        this.getReduceAmountChangeInfo({
            editdata,
            successCallback: res => {
                if(res && res.length > 0) {
                    this.showConten = true
                    this.dataList = res
                    this.dataList.forEach((it) => {
                        it.selectTrue = false;
                    })
                }
            },
            failCallback: res => {
                if(res.msg){
                    Toast({
                        message: res.msg,
                        duration: 3000
                    });
                }
            }
        });
        
	},
	components: {
	 headerT,
     amountbtn,
     alertContent
  },
}
</script>

<style lang="scss" scoped>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
    .bq-list-box {
        background-color: #fff;
        margin-bottom: 0.2rem; 
    }
  .bq-list-box .bq-title {
        padding: 0.23rem 0.3rem;
        box-sizing: border-box;
        height: 0.88rem;
        background: #00addc;
        display: flex;
        display: -webkit-flex; }
    .bq-list-box .bq-title .bq-title-img {
        width: 0.42rem;
        height: 0.42rem; 
    }
    .bq-list-box .bq-title .bq-title-img {
        width: 0.4rem;
        height: 0.4rem;
        border: 0.01rem solid #c9c9c9;
        border-radius: 0.1rem;
        margin-right: 0.3rem;
        background: #fff;
    }
    .bq-list-box .bq-title .active{
        border: 0;
        background-image: url('../../assets/reduceAmount/checked.png');
        background-size: cover;
    }
    .bq-list-box .bq-title .bq-title-img img {
        width: 0.42rem;
        display: block; 
    }
    .bq-list-box .bq-title .bq-title-font {
        font-size: 0.34rem;
        font-family: PingFangSC-Regular;
        color: white;
        line-height: 0.48rem;
        margin-left: 0.36rem;
     }
  .bq-list-box .bq-content-list {
        padding: 0 0.3rem;
        font-size: 0.3rem; 
    }
    .bq-list-box .bq-content-list li {
        height: 0.88rem;
        padding: 0.23rem 0;
        box-sizing: border-box;
        color: #999999;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between; 
    }
    .bq-list-box .bq-content-list li p:last-child {
        color: #3D3D3D; 
    }
    .bq-list-box .bq-content-list li .bq-select {
        display: flex;
        display: -webkit-flex; 
    }
    .bq-list-box .bq-content-list li .bq-select p {
        color: #666666; 
    }
    .bq-list-box .bq-content-list li .bq-select .select-style {
        width: 0.3rem;
        padding: 0.06rem 0;
        margin-left: 0.1rem; 
    }
    .bq-list-box .bq-content-list li .bq-select .select-style img {
        height: 0.3rem;
        display: block; 
    }
  .bq-list-box .bq-zh-list {
    padding: 0.1rem 0.3rem 0.3rem; }
    .bq-list-box .bq-zh-list ul {
      padding: 0.22rem 0.2rem 0.36rem 0.3rem;
      font-size: 0.3rem;
      background: #f1f8fe;
      border-radius: 0.06rem;
      margin-bottom: 0.2rem; }
      .bq-list-box .bq-zh-list ul li {
        padding: 0.12rem 0;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        color: #999999; }
        .bq-list-box .bq-zh-list ul li p:last-child {
          color: #3d3d3d; }
        .bq-list-box .bq-zh-list ul li .bq-bl {
          display: flex;
          display: -webkit-flex; }
          .bq-list-box .bq-zh-list ul li .bq-bl input {
            border-bottom: 1px solid #CDCDCD;
            height: 0.5rem;
            display: block;
            text-align: right;
            background-color: transparent;
            padding-right: 0.12rem;
            width: 1.3rem;
            color: #006cb7;
            font-size: 0.32rem; }
        .bq-list-box .bq-zh-list ul li .delect-style {
          width: 0.4rem; }
          .bq-list-box .bq-zh-list ul li .delect-style img {
            width: 0.4rem;
            display: block; }
      .bq-list-box .bq-zh-list ul li:first-child {
        color: #3d3d3d; }
    .bq-list-box .bq-zh-list ul:last-child {
      margin-bottom: 0; }


    .error-style{
        background-color: rgba(0,0,0,0.3972);
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
        .error-content{
            position: fixed;
            left: 1.21rem;
            top: 2.55rem;
            background-color: #fff;
            width: 5.08rem;
            border-radius: 7px;
            .error-font{
                font-size:0.3rem;
                font-family:PingFangSC-Medium;
                color:rgba(57,57,60,1);
                line-height:0.46rem;
                text-align: center;
                margin-top: 0.48rem;
            }
        .error-btn{
            padding: 0.32rem 0.44rem 0.45rem;
            button{
                width:4.2rem;
                height:0.8rem;
                background:rgba(0,174,77,1);
                border-radius:0.4rem;
                font-size:0.32rem;
                font-family:PingFangSC-Regular;
                color:rgba(255,255,255,1);
                display: block;
            }
        }
    }
}
    
}
.error-style{
    background-color: rgba(0,0,0,0.3972);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    .error-content{
        position: fixed;
        left: 1.21rem;
        top: 2.55rem;
        background-color: #fff;
        width: 5.08rem;
        border-radius: 7px;
        .error-font{
            font-size:0.3rem;
            font-family:PingFangSC-Medium;
            color:rgba(57,57,60,1);
            line-height:0.46rem;
            text-align: center;
            margin-top: 0.48rem;
        }
        .error-btn{
            padding: 0.32rem 0.44rem 0.45rem;
            button{
                width:4.2rem;
                height:0.8rem;
                background:rgba(0,174,77,1);
                border-radius:0.4rem;
                font-size:0.32rem;
                font-family:PingFangSC-Regular;
                color:rgba(255,255,255,1);
                display: block;
            }
        }
    }
}

//提示样式2
.tips-two{
    position: fixed;
    // padding: 0 0.3rem;
    background:rgba(0,0,0,0.3972);
    z-index: 9;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 0;
    top: 0;
    left: 0;
    .tips-content{
        position: fixed;
        width:5.4rem;
        background:rgba(255,255,255,1);
        border-radius:0.12rem;
        text-align: center;
        overflow: hidden;
        top: 2.94rem;
        left: 1.05rem;
        .tips-font{
            padding: 0.3rem;
            .p-one{
                font-size:0.32rem;
                font-family:PingFangSC-Medium;
                color:rgba(57,57,60,1);
                line-height:0.45rem;
            }
            .p-two{
                font-size:0.3rem;
                font-family:PingFangSC-Regular;
                color:rgba(57,57,60,1);
                line-height:0.46rem;
            }
        }
        .tips-btn{
            display: flex;
            display: -webkit-flex;
            div{
                flex: 1;
                button{
                    width: 100%;
                    height: 0.92rem;
                    background-color: #fff;
                    font-size:0.32rem;
                }
            }
        }
    }
    .tips-phone{
        position: fixed;
        top: 2.92rem;
        width: 6.82rem;
        left: 0.34rem;
        background-color: #fff;
        border-radius:0.12rem;
        overflow: hidden;
        header{
            padding: 0.26rem 0;
            text-align: center;
            font-size:0.32rem;
            font-family:PingFangSC-Medium;
            color:rgba(57,57,60,1);
            line-height:0.46rem;
        }
        .tips-number{
            padding: 0.4rem 0.34rem;
            .tips-phone-top{
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                div{
                    input{
                        width:3.6rem;
                        height:0.72rem;
                        border-radius:2px;
                        border:1px solid rgba(183,188,192,1);
                        font-size:0.28rem;
                        font-family:PingFangSC-Regular;
                        line-height:0.4rem;
                        padding: 0.16rem 0.2rem;
                        box-sizing: border-box;
                    }
                    button{
                        width:2.43rem;
                        height:0.72rem;
                        background:rgba(0,174,77,1);
                        border-radius:0.06rem;
                        font-size:0.28rem;
                        font-family:PingFangSC-Regular;
                        color:rgba(255,255,255,1);
                        line-height:0.4rem;
                    }
                    button.disable-style{
                        background:rgba(153,153,153,1);
                    }
                }
            }
            .tips-phone-down{
                font-size:0.26rem;
                font-family:PingFangSC-Regular;
                color:rgba(148,148,148,1);
                line-height:0.37rem;
                margin-top: 0.33rem;
                text-align: left;
            }
        }
        .tips-btn{
            display: flex;
            display: -webkit-flex;
            div{
                flex: 1;
                button{
                    width: 100%;
                    height: 0.92rem;
                    background-color: #fff;
                    font-size:0.32rem;
                }
            }
        }
        .tips-phone-btn{
            height: 0.92rem;
            button{
                width: 100%;
                height: 100%;
                font-size:0.32rem;
                font-family:PingFangSC-Regular;
                color:rgba(57,57,60,1);
                line-height:0.46rem;
                background-color: #fff;
            }
        }
    }
}

</style>
<template>
<div class="mg-box">
	<div class="reduceAmountList-box" v-if="showConten">
	    <headerT :headerContent="headerContent" style="
		"></headerT>
        <div class="reduceAmountList-list">
            <div class="reduceAmountList-list-box"  v-for="(item, index) in contentList" :key="index">
            	<div class="bq-img" @click="selectFn(index)" :class="{active: item.selectTrue}">
                </div>
                <div class="reduceAmountList-list-right">
                    <div style="
                        color: #3e3e3e;
                        font-size: 0.34rem;
                        border-bottom: 0.01rem solid #dfdfdf;
                        padding-bottom: 0.2rem;
                        display: flex;
                      
                    ">
                        <p style="padding-right: 0.22rem;">保单号:</p>
                        <p v-text="item.POLICY_CODE"></p>
                    </div>
                    <div class="setfont">
                        <p>第一主险名称:</p>
                        <p v-text="item.PRODUCT_NAME"></p>
                    </div>
                    <div class="setfont">
                        <p>下期缴费日:</p>
                        <p v-text="item.PAY_DUE_DATE"></p>
                    </div>
                    <div class="setfont">
                        <p>下期缴费金额（元）:</p>
                        <p v-text="item.NEXT_DIS_PREM"></p>
                    </div>
                </div>
            </div>
        </div>
        <amountbtn @changeBtn="changeBtn" @allSelect="allSelect" :controlchangeBtn="selectAll"></amountbtn>
	</div>
    <alertContent :alertCount="alertCount"></alertContent>
    <section class="error-style" v-show="isShowError">
        <div class="error-content">
            <img src="@/assets/reduceAmount/xitongyichang.png" width="100%">
            <p class="error-font"v-text="tipsContent"></p>
            <div class="error-btn">
                <button class="style-click" @click="selectClickHere">知道了</button>
            </div>
        </div>
    </section>
</div>

</template>
<script>
import alertContent from "@/components/alertContent.vue";
import amountbtn from "@/components/reduceAmount/reduceAmountButton.vue"
import headerT from "@/components/header.vue"
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
	data(){
		return{
            showConten: false,
            selectAll: false,
            isShowError: false,
            tipsContent: '对不起，请选择保单做减额交清',
            contentList:  [
                
            ],
			password: '',
			alertCount: {
				isShowAlert: false,
				alertData: ''
			},
			headerContent: '您名下支持减额交情的保单列表',
		}
	},
    mounted(){
         this.getReduceAmountList({
            successCallback: res => {
                if(res.code === 0) {
                    this.contentList = res.data;
                    if(res.data && res.data.length > 0){
                        this.showConten = true
                        this.contentList.forEach((it) => {
                            it.selectTrue = false;
                        }) 
                    }
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
	methods: {
         ...mapActions({
             getReduceAmountList: 'getReduceAmountList'
        }),
        changeBtn(){
            //var arrry= "";
            var arrry= []
            var num = 0;
            var flag = false;
            for (let item of this.contentList) {
                if(item.selectTrue){
                    var policy = item.POLICY_CODE;
                    //if(num == 0){
                        //arrry+= policy
                    //}else{
                        //arrry+=","+ policy
                    //}
                    //num ++;
                    arrry.push(policy)
                    flag = true;
                }
            }
            if(!flag){
                this.showTipsFn();
                return;
            } else {
                // this.alertCount.isShowAlert = false
                 this.isShowError = false;
                this.$router.push({path: "/reduceAmountDetail", query: {data: JSON.stringify(arrry)}})
            }
        },
        showTipsFn(){
            //this.alertCount.isShowAlert = true
            //this.alertCount.alertData = '请选择保单！'
           this.isShowError = true;
        },
        allSelect(b){
            this.selectAll = b
            if(this.selectAll){
                for(let item of this.contentList){
                    item.selectTrue = true
                }
            }else{
                for (let item of this.contentList) {
                    item.selectTrue = false
                }
            }
        },
        selectClickHere(){
            this.isShowError=false;
        },
        selectFn(index){
            let data = this.contentList[index]
            data.selectTrue = !this.contentList[index].selectTrue
            this.$set(this.contentList, index, data)
            //全选后 取消一个 取消全选
            if(this.selectAll== true && this.contentList[index].selectTrue==false){
                this.selectAll= false
            }
            for (let item of this.contentList){
                if(item.selectTrue==false){
                    return;
                }
            }
            this.selectAll= true
        }
	
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
    .reduceAmountList-box{
        .reduceAmountList-list-box{
            background-color: #fff;
            display: flex;
            padding: 0.4rem 0.3rem;
            border-bottom: 0.01rem solid rgb(223, 223, 223);
            .bq-img{
                width: 0.4rem;
                height: 0.4rem;
                border: 0.01rem solid #c9c9c9;
                border-radius: 0.1rem;
                margin-right: 0.3rem;
            }
            .active{
                border: 0;
                background-image: url('../../assets/reduceAmount/checked.png');
                background-size: cover;
            }
            .reduceAmountList-list-right{
                width:100%;
            }
            .setfont{
                color: #9a9a9a;
                padding-top: 0.4rem;
                font-size: 0.15rem;
                display: flex;
                p{
                    padding-right: 0.22rem;
                }
            }

        }
        .reduceAmountList-list-box:last-child{
                border: 0;
        }
        
    }
    .error-style {
            background-color: rgba(0, 0, 0, 0.3972);
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 9;  }
        .error-style .error-content {
            position: fixed;
            left: 1.21rem;
            top: 2.55rem;
            background-color: #fff;
            width: 5.08rem;
            border-radius: 7px; }
        .error-style .error-content .error-font {
            font-size: 0.3rem;
            font-family: PingFangSC-Medium;
            color: #39393c;
            line-height: 0.46rem;
            text-align: center;
            margin-top: 0.48rem; }
        .error-style .error-content .error-btn {
            padding: 0.32rem 0.44rem 0.45rem; }
        .error-style .error-content .error-btn button {
            width: 4.2rem;
            height: 0.8rem;
            background: #00ae4d;
            border-radius: 0.4rem;
            font-size: 0.32rem;
            font-family: PingFangSC-Regular;
            color: white;
            display: block; }

}

</style>
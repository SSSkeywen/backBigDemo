<template>
<div class="mg-box">
	<div class="annuityCollectDetail-box">
        <headerT :headerContent="headerContent" style="
                margin-bottom: 0.22rem;
            "></headerT>
        <div class="annuityCollectDetail-content" v-for="(item, index) in annuityCollectDetail" :key ="index">
           <div class="annuityCollectDetail-content-title">
                <div class="annuityCollectDetail-content-left"> 保单号：{{item.policyCode}}
                </div>
                 <div class="annuityCollectDetail-content-right" @click="selectAnnuity(index)" :class="{active: item.active}">
                </div>
           </div>
           <div class="annuityCollectDetail-content-box">
                <div class="annuityCollectDetail-content-center" v-if="item.productInfo[0].productNumber">险种序号： {{item.productInfo[0].productNumber}}</div>
                <div class="annuityCollectDetail-content-center" v-if="item.productInfo[0].productName">险种名称： {{item.productInfo[0].productName}}
                </div>
                <div class="annuityCollectDetail-content-center">保额/档次/份数： {{item.productInfo[0].amount ? item.productInfo[0].amount : 0}}&nbsp;/&nbsp;{{item.productInfo[0].benefitLevel ? item.productInfo[0].benefitLevel : 0}}&nbsp;/&nbsp;{{item.productInfo[0].unit ? item.productInfo[0].unit : 0}}
                </div>
                <div class="annuityCollectDetail-content-center" v-if="item.productInfo[0].initialType">缴费期限： {{setinitialType(item.productInfo[0].initialType)}} 
                </div>
                <div class="annuityCollectDetail-content-center">开始领取年龄： {{item.productInfo[0].startPayDate === null ? 0 : item.productInfo[0].startPayDate}}
                </div>
                <div class="annuityCollectDetail-content-center" v-if="item.productInfo[0].payEnsure">领取年限：
                </div>
                <select v-model="item.productInfo[0].payEnsure" v-if="item.productInfo[0].payEnsure">
                    <option value="0">0</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
                <div class="annuityCollectDetail-content-center" v-if="item.productInfo[0].payType">领取方式：
                </div>
                <select  style="
                    margin-bottom: 0.18rem;"
                    v-model="item.productInfo[0].payType"
                    v-if="item.productInfo[0].payType">
                    <option value="1" >年领</option>
                    <option value="4" >月领</option>
                    <option value="5" >趸领</option>
                </select>

           </div>
        </div>
        <div>
		    <smallButton :btnText="btnTexts" @btnControls="surenBtn" style="margin: 0.4rem auto;"></smallButton>
        </div>
	</div>
	<alertContent :alertCount="alertCount"></alertContent>
</div>

</template>
<script>
import alertContent from "@/components/alertContent.vue";
import headerT from "@/components/header.vue";
import smallButton from '@/components/smallButton.vue'
import { mapActions } from "vuex";
import { Picker } from "vant";
export default {
	data(){
		return{
            setpayEnsure: '',
            payType: [1, 4, 5],
            
            annuityCollectDetail: [],
            policyCode: '',
            isactive: false,
			contentListData: {
				POLICY_CODE: 13213,
				ACTUAL_TITLE: 53,
				ACTUAL_PREM: 95495,
				
				},
			check:  false,
			alertCount: {
				isShowAlert: false,
				alertData: 'saksdjsdj'
			},
			headerContent: '年金领取方式变更',
			btnTexts: '确认变更'
		}
	},
	methods: {
        ...mapActions({
            arfandyearchangeDetail: "arfandyearchangeDetail"
        }),
        setinitialType(day){
            //1年交4月交5
            if(day == 1) {
                return "年交"
            } else if(day == 4) {
                return "月交"
            } else if (day == 5) {
                return "趸交"
            }
        },
        selectAnnuity(index){
            this.annuityCollectDetail[index].active = !this.annuityCollectDetail[index].active
        },
		surenBtn(){
            let arr = this.annuityCollectDetail.filter(item => item.active)
			let res = arr.length > 0
            let policyCodearr = []
            let itemId = []
            let payYears = []
            let payType = []
            arr.forEach((item) => {
                if(item.policyCode) {
                    policyCodearr.push(item.policyCode)
                } 
                if (item.productInfo) {
                    if(item.productInfo[0].productID){
                        itemId.push(item.productInfo[0].productID)
                    }  
                    if(item.productInfo[0].payEnsure){
                        payYears.push(item.productInfo[0].payEnsure)
                    }
                    if(item.productInfo[0].payType) {
                        payType.push(item.productInfo[0].payType)
                    }
                }
                
            })
            let obj = {
                "arr": policyCodearr,
                "itemId":itemId,
                "payYears":payYears,
                "payType": payYears}
            
			if(res){
				this.alertCount.isShowAlert = false
                this.$router.push({path: '/statusPage',  query: {needParams: JSON.stringify(obj)}})
				
			} else {
			   this.alertCount.isShowAlert = true
			   this.alertCount.alertData = '请选择保单！'
			} 
		}
	},
	mounted() {
       let policyCodeItem  = this.$route.query.policyCode
       this.policyCode = policyCodeItem
        this.arfandyearchangeDetail({
            policyCodeItem,
            successCallback: res => {
                if(res.code == 0){
                    this.annuityCollectDetail = res.data
                    this.annuityCollectDetail = this.annuityCollectDetail.map((item) => {
                        let obj = {
                                        "policyCode": item.policyCode,
                                        "active": false,
                                        "productInfo": [
                                            {
                                                "amount": item.productInfo[0].amount,
                                                "productNumber": item.productInfo[0].productNumber,
                                                "unit":  item.productInfo[0].unit,
                                                "payEnsure": item.productInfo[0].payEnsure,
                                                "payType":item.productInfo[0].payType,
                                                "startPayDate": item.productInfo[0].startPayDate,
                                                "policyCode": item.productInfo[0].policyCode,
                                                "initialType": item.productInfo[0].initialType,
                                                "benefitLevel": item.productInfo[0].benefitLevel,
                                                "itemId": item.productInfo[0].itemId,
                                                "productName": item.productInfo[0].productName,
                                                "productID": item.productInfo[0].productID
                                            }
                                        ]
                                    }
                        return obj

                    })
                }

            },
            fCallback: res => {}
        });
       


	},
	components: {
	 headerT,
	 alertContent,
	 smallButton
  },
}
</script>

<style lang="scss" scoped>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
}
.annuityCollectDetail-box{
    
}
.annuityCollectDetail-box-title{
	height: 0.8rem;
	background: #2f6bb1;
	text-align: center;
    color: #fff;
    line-height: 0.8rem;
    font-size: 0.36rem;
	margin-bottom: 0.4rem;
}
.annuityCollectDetail-content{
    background: #fff;
    box-shadow: 0 0 0.1rem #ccc;
    width: 94%;
    margin: 0 auto;
    border-radius: 0.1rem;
        padding: 0.2rem;
    box-sizing: border-box;
}
.annuityCollectDetail-content-title{
    padding: 0 0.1rem;
    display: flex;
    color: #FFFFFF;
    width: 100%;
    margin: 0 auto;
    height: 0.92rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background-size: cover;
    background-image: url('../../assets/img/line.png');
    background-repeat: no-repeat
}
.annuityCollectDetail-content-right{
	width: 0.4rem;
    height: 0.4rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.1rem;
}
.annuityCollectDetail-content-box{
    select{
        margin: 0 0.1rem;
        width: 6.26rem;
        height: 0.48rem;
        border-radius: 0.1rem;
        background-position: 5.8rem !important;
        option {
            text-align: center;
        }
    }
}
.annuityCollectDetail-content-center{
    padding: 0.1rem 0.1rem;
    
}

.active{
   background-image: url('../../assets/img/active.png');
   background-size: contain;
}
.annuityCollectDetail-btn{
	margin-bottom: 0.4rem;
}
</style>
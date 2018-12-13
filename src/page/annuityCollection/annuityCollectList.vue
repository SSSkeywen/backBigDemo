<template>
<div class="mg-box">
	<div class="annuityCollectList-box">
		<headerT :headerContent="headerContent" ></headerT>
		<div v-if="contentListData && contentListData.length > 0">
			<div class="annuityCollectList-content">
				<div v-for="(item, index) in contentListData"  :key="index">
					<div class="head-x" style="
						margin-top: 0.22rem;
					">
						<p>保单号：{{item.policyCode}}</p>
						<div class="annuityCollectDetail-content-right" @click="selectAnnuity(index)" :class="{active: item.active}">
						</div>
					</div>
					<ul class="mg-ul-x">
						<li>
							<p>第一主险名称：{{item.productName}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div style="
				display:  flex;
				justify-content:  center;
				margin-top: 0.4rem;
			">
				<smallButton :btnText="btnTexts" @btnControls="surenBtn"></smallButton>
			</div>
		</div>
		<div v-else>
			您没有可做年金领取的保单！
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
export default {
	data(){
		return{
			contentListData: [],
			alertCount: {
				isShowAlert: false,
				alertData: ''
			},
			headerContent: '年金领取方式变更',
			btnTexts: '确认'
		}
	},
	methods: {
		...mapActions({
            arfandyearchangeList: "arfandyearchangeList"
        }),
		selectAnnuity(index){
			this.contentListData[index].active = !this.contentListData[index].active
		},
		surenBtn(){
			let arr = this.contentListData.filter(item => item.active)
			let res = arr.length > 0
			if(res){
				this.alertCount.isShowAlert = false
				let policyCodeArr = []
			    arr.forEach((item) => {
					policyCodeArr.push(item.policyCode)
				})
				let policyCode = policyCodeArr.join()
				this.$router.push({path: '/annuityCollectDetail', query: {policyCode: policyCode}})
			} else {
			   this.alertCount.isShowAlert = true
			   this.alertCount.alertData = '请选择保单！'
			}
		}
	},
	mounted() {
		this.arfandyearchangeList({
			successCallback: res => {
				if(res.code == 0) {
					this.contentListData = res.data
					 this.contentListData = this.contentListData.map((item) => {
						let obj = {}
						obj.policyCode = item.policyCode
						obj.productName = item.productName
						obj.active = false
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
.annuityCollectList-box-title{
	height: 0.8rem;
	background: #2f6bb1;
	text-align: center;
    color: #fff;
    line-height: 0.8rem;
    font-size: 0.36rem;
	margin-bottom: 0.4rem;
}
.annuityCollectList-content{
    padding: 0 0.15rem;

}
.annuityCollectList-content-right{
	color: #9a9a9a;
    font-size: 0.28rem;
    padding-left: 0.77rem;
}
.annuityCollectList-btn{
	margin-bottom: 0.4rem;
}
.head-x{
    border-radius: 0.15rem 0.15rem 0 0;
    display: flex;
    background-color: #00ae4d;
    color: #FFFFFF;
    width: 100%;
    padding: 0 0.26rem;
    margin: 0 auto;
    line-height: 0.52rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    div{
        width: 7%;
        img{
            width: 100%;
        }
    }
    .annuityCollectDetail-content-right{
        width: 0.4rem;
        height: 0.4rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 0.1rem;
    }
    .active{
        background-image: url('../../assets/img/active.png');
        background-size: contain;
    }
}
.mg-ul-x{
    width: 100%;
    margin: 0 auto;
   
    li{
        background: #fff;
        display: flex;
        justify-content: space-between;
        line-height: 0.6rem;
        p{
            padding: 0 0.26rem;
        }
    }
}
</style>
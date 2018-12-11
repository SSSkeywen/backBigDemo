<template>
<div class="mg-box">
	<div class="passwordCheck-box">
	    <headerT :headerContent="headerContent" style="
			margin-bottom: 0.4rem;
		"></headerT>
		<div class="passwordCheck-content">
			<div class="passwordCheck-content-left">
				保险服务密码
			</div>
			<input class="passwordCheck-content-right" type="text" placeholder="请输入8位数字密码" maxlength="8" v-model="password">
		</div>
		<div style="
			display:  flex;
			justify-content:  center;
			margin-top: 0.4rem;
		">
			<publicButton :btnText="btnTexts" @btnControls="surenBtn"></publicButton>
		</div>
	</div>
	<alertContent :alertCount="alertCount"></alertContent>
</div>

</template>
<script>
import alertContent from "@/components/alertContent.vue";
import headerT from "@/components/header.vue";
import publicButton from '@/components/publicButton.vue'
export default {
	data(){
		return{
			password: '',
			alertCount: {
				isShowAlert: false,
				alertData: ''
			},
			headerContent: '保险服务密码校验',
			btnTexts: '确认'
		}
	},
	methods: {
		surenBtn(){
			if(!this.password){
				this.alertCount.isShowAlert = true
				this.alertCount.alertData = '密码不能为空！'
			} else {
				let regex = /^([0-9]{8})?$/.test(this.password)
				if(!regex){
					this.alertCount.isShowAlert = true
					this.alertCount.alertData = '密码应为8位数字！'
				} else {
					this.alertCount.isShowAlert = false
					//  发送请求 如果通过 跳转到 nextPath
					this.$router.push({path:this.$route.query.nextPath})
				}
			}
		}
	},
	mounted() {

	},
	components: {
     publicButton,
	 headerT,
	 alertContent
  },
}
</script>

<style scoped>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
}
.passwordCheck-box-title{
	height: 0.8rem;
	background: #2f6bb1;
	text-align: center;
    color: #fff;
    line-height: 0.8rem;
    font-size: 0.36rem;
	margin-bottom: 0.4rem;
}
.passwordCheck-content{
	display: flex;
    padding: 0 0.3rem 0 0.3rem;
    background: #fff;
    height:  0.88rem;
    line-height: 0.88rem;

}
.passwordCheck-content-right{
	color: #9a9a9a;
    font-size: 0.28rem;
    padding-left: 0.77rem;
}
.passwordCheck-btn{
	margin-bottom: 0.4rem;
}
</style>
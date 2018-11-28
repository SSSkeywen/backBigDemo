<template>
<div class="mg-box">
<div class="contenr" style="padding-top: 0.28rem;" id="app">   
	<ul class="zp_ul">
		<li class="zp_listT">
			<div class="zp_baodan" style="margin-left: 0.27rem">保单号：{{this.bdName}}</div>
		</li>
		<li class="zp_list"><div>信件类型</div><div>{{this.xjlx}}</div></li>
		<li class="zp_list"><div>地址</div><div>{{this.addres}}</div></li>
		<li class="zp_list"><div>邮编</div><div>{{this.yb}}</div></li>
	</ul>
	<div style="margin: 0 0.28rem;">您好，您的邮寄地址已确认，如需修改，请进行保单收费地址变更操作！</div>
	<div style="text-align: center;"><a href="javascript:history.back();" class="btn" style="margin: 0.59rem auto 0;">返回</a></div>
</div>
</div>
</template>
<script>

export default {
	data(){
		return{
			bdName:"00128983762019876",
			xjlx:"保单年度报告",
			addres:"闵行区浦江镇122号",
			yb:"21000",
		}
	}
}
</script>

<style scoped>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
}
</style>
<template>
<div class="mg-box">
<div class="zp_title">收费地址变更</div>
	<div class="contenr">
		<ul class="zp_ul">
			<li class="zp_listT">
				<div class="zp_baodan" style="margin-left: 0.27rem;">保单号：{{this.bdName}}</div>
			</li>
			<li class="zp_list"><div>收费地址</div><div>{{this.addres}}</div></li>
			<li class="zp_list"><div>收费邮编</div><div>{{this.yb}}</div></li>
			<li class="zp_list" style="margin-top: 0.15rem;">
				<div></div>
				<a href="javascript:;" class="btn1">修改</a>
			</li>
		</ul>
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
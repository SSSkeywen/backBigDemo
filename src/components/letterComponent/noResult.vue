<template>
<div>
<div class="zp_title"> <img :src="imgSrc"></div>
<div class="zp_wenzi">未查询到信件信息！</div>
</div>
</template>


<script>
export default {
	data(){
		return {
			imgSrc: require('@/assets/mgImg/confim.png'),
		}
	},
	props:{
	}
}
</script>

<style scoped>
.zp_title img{display: block; width: 0.96rem;height: 1.1rem;    margin: 0 auto 0.72rem;    margin-top: 1.4rem;}
.zp_wenzi{color:#39393C;font-size: 0.28rem;text-align: center;padding: 0  1rem; margin-top: 0.59rem;word-break: break-all;}
</style>
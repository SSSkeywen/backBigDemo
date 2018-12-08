<template>
<div class="tabli-con">
	<div v-if="myaddData.length!=0">
		<div v-for="(item,index) in myaddData" :key="index">
			<section class="bd_fk">
				<ul>
					<li>
						<span>投保单号：</span><i>{{item.sendCode}}</i>
					</li>
					<li>
						<span>第一主险名称：</span><i> {{item.productName}}</i>
					</li>
					<li>
						<span :class="item.currentStatus">当前状态：</span><i style="color: #3B6A8F;">{{item.insureStateName}}</i>
					</li>
				</ul>
				<div id="div" class="bd_xz bd_xz1" @click="slideMap(item)">
					<img :src="imgSrcThree" id="img" class="xuanzhuan" :class="item.showMap?'add-ani-style':''">
				</div>
			</section>
			<div class="bd_nr">
				<ul class="progress" v-if="item.showMap">
					<li  v-for="(items,index) in item.steps" :key="index" >
						<progressInfoMap :num="item.steps.length" :steps="items" :plc="index"></progressInfoMap>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div v-else class="downBox">该客户名下暂无60内承包的保单</div>
</div>
</template>


<script>
import progressInfoMap from './progressInfoMap.vue';
export default {
	props:['myaddData'],
	data() {
		return {
			// showMap: false,
			imgSrcThree: require('@/assets/policyimg/bd_icon.png'),
		}
	},
	components:{
		progressInfoMap,
	},
	mounted(){
		console.log(this.myaddData)
	},
	methods:{
		slideMap(item){
			console.log(item)
			item.showMap = !item.showMap;
			// item.showMap = true
			item.steps=item.steps
		}
	}
}
</script>

<style scoped>
.tabli-con{
	width: 91%;
  	margin: auto;
	font-size: 14px;
    line-height: 1.5;
	color: #666;
}
.tabli-con:last-child{padding-bottom: 65px;}
.bd_fk {
    /* width: 85%; */
    margin: 0 auto;
    margin-top: 7%;
    background: url('../../assets/policyimg/bd_bg.png');
    background-size: 100% 100%;
    display: -webkit-flex;
    display: flex;
    padding: 3%;
    position: relative;
    box-shadow: 5px 5px 10px;
}
.bd_fk>ul {
    width: 80%;
}
.bd_fk>ul i {
    font-size: 16px;
    color: #000;
}
.bd_fk .bd_xz {
    width: 10%;
    float: right;
    margin-left: 10%;
    /* padding-top: 8%; */
	display: flex;
    align-items: center;
}
.bd_fk .bd_xz1 img {
	width: 70%;
	vertical-align: middle;
    transform: rotate(-90deg);
}
.bd_nr{ margin-top: 1%; width: 95%; margin-left: 3%;}
.bd_nr>ul { border-left: 2px solid #747576;}

/* .bd_nr>ul>li:nth-child(1){background: mediumblue url('../../assets/policyimg/bd_bg3.png');} */
/* 动画效果css */
.ani-down{
    transition: all .2s;
}
.bd_fk .bd_xz1 img.add-ani-style{
    transform: rotateZ(0deg);
}
</style>
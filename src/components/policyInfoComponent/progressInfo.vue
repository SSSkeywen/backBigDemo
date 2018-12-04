<template>
<div class="box">
	<div v-if="myaddData.length!=0">
		<div v-for="(item,index) in myaddData" :key="index">
			<section>
				<ul class="mg-ul">
					<li>
						<p>投保单号：{{item.sendCode}}</p>
						<em class="btn_arrow ani-down" 
						:class="item.showMap?'add-ani-style':''" 
						@click="slideMap(item)">
							<img :src="imgSrcThree" alt="">
						</em>
					</li>
					<li>
						<p>第一主险名称：{{item.productName}}</p>
					</li>
					<li>
						<p :class="item.currentStatus">状态：{{item.insureStateName}}</p>
					</li>
				</ul>
			</section>
			<div class="actBox">
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
			showMap: false,
			imgSrcThree: require('@/assets/mgImg/xq_icon_xia.png'),
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
.mg-ul li{position: relative;}
section{
	position: relative;
	z-index: 10;
	border-radius: 10px;
    background-color: #fff;
    margin-bottom: 0.24rem;
    overflow: hidden;
}
.mg-ul{
    width: 88%;
    margin: 0 auto;
    
}
.mg-ul li{
	position: relative;
    line-height: 0.6rem;
}
.btn_arrow{
	position: absolute;
	right: 0px;
	top: 4px;
	width: 24px;
	height: 24px;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
}
.btn_arrow img{
	position: absolute;
	width: 100%;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.actBox{
	position: relative;
	z-index: 1;
	margin-top: -20px;
}
.progress{
	/*display: none;*/
	margin-left: 10px;
	padding-left: 30px;
	padding-top: 10px;
	padding-bottom: 10px;
	border-left: 2px solid #00ae4d;
}
.progress .son{
	position: relative;
	width: 80%;
	padding:0px 20px;
	margin-top: 20px;
	border-radius:8px;
	background-color: #00ae4d;
	line-height: 30px;
	color: #fff;
}
.ball{
	position: absolute;
	width: 16px;
	height: 16px;
	border-radius:50%;
	background-color: rgba(0, 244, 0, 0.5);
	left: -39px;
	top: 50%;
	transform: translateY(-50%) rotate(45deg);
}
.ball:after{
	position: absolute;
	content:'';
	width:100%;
	height: 100%;
	border-radius:50%;
	background-color: #00ae4d;
	transform:scale3d(0.5, 0.5, 0.5);
	transform-origin: (50% ,50%);
}
.arrow{
	position: absolute;
	width: 16px;
	height: 16px;
	background-color: #00ae4d;
	left: -8px;
	top: 50%;
	transform: translateY(-50%) rotate(45deg);
}
.stepDate{
	display: block;
}
.stepName{display: block;}
/* 动画效果css */
.ani-down{
    transition: all .2s;
}
.add-ani-style{
    transform: rotateZ(0deg);
}
</style>
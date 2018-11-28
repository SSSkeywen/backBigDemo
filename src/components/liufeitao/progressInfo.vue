<template>
  <div class="box">
	<section>
		<ul class="mg-ul">
            <li>
                <p>投保单号：{{myaddData.insureCode}}</p>
                <em class="btn_arrow ani-down" :class="showMap?'add-ani-style':''" @click="slideMap()"><img :src="imgSrcThree" alt=""></em>
            </li>
            <li>
                <p>第一主险名称：{{myaddData.zhuxianName}}</p>
            </li>
            <li>
                <p :class="myaddData.currentStatus">状态：{{myaddData.currentStatus}}</p>
            </li>
        </ul>
	</section>
	<div class="actBox">

		<!-- <transition name="slide"> -->
			<ul class="progress" v-if="showMap">
				<li  v-for="(item,index) in reverseSum" :key="index" >
					<progressInfoMap :num="reverseSum.length" :steps="item" :plc="index"></progressInfoMap>
				</li>
			</ul>
		<!-- </transition> -->
	</div>
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
		// ani
	},
	computed: {
		//反向排列显示列表
	  reverseSum: function () {
	    return this.myaddData.steps.reverse()
	  }
	},
	methods:{
		slideMap(){
			this.showMap = !this.showMap;
		},
		beforeEnter(el){
			el.style.opacity = 0;
			console.log(el);
		},
		enter(el){
			console.log(this+'_ent')
		},
		afterEnter(el){
			console.log(this+'_Af')
		}
	}
}
</script>

<style scoped>
/*.slide-move{transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);}
.slide-enter-active,.slide-leave-active{
	transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    opacity: 1;
}
.slide-enter{
	opacity: 0;
	transform: translateY(-30%);
}*/
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
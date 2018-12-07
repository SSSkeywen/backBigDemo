<template>
<transition name="slide" 
		@before-enter="beforeEnter"
        @enter="enter"
        @leave="leave">
	<div class="list-animate bounceInDown" v-show="steps.stepText!=''" >
		<div class="bd_nr_icon">
			<span class="bd_icon"></span>
		</div>
		<div class="bd_nr3">
			<ul>
				<li v-if="steps.stepDate">{{steps.stepDate}}</li>
				<li v-if="steps.stepText">{{steps.stepText}}</li>
			</ul>
		</div>

	</div>
</transition>
</template>


<script>
export default {
	props:['steps','plc','num'],
	data(){
		return{
			src1:require('@/assets/policyimg/bd_icon2.png'),
		}
	},
	mounted(){
		// console.log(this.steps)
	},
	methods:{
		beforeEnter(el){
			el.style.opacity=0;
		},
		enter(el){
			el.style.animationDuration=(this.num-this.plc)*.3+'s';
			el.style.animationTimingFunction='cubic-bezier(.07,.78,.84,1.3)';
			el.style.opacity=1;
		},
		leave(el){
			el.style.opacity=1;
		}
	}
}
</script>

<style scoped>
@import url('./../../../static/css/animate.css');

.list-animate{
	display: flex;
    position: relative;
}
.bd_nr_icon img { width: 60%; }

.bd_icon{
	position: absolute;
	left: -3%;
    top: 26%;
	width: 20px;
	height: 20px;
	background: url('../../assets/policyimg/bd_icon2.png') 0 0 no-repeat;
	background-size: 100%;
}
.bd_nr4 ul li{    
	font-size: 14px;
    line-height: 1.5;
}
.bd_nr3 {
	width: 90%;
    margin: 5px auto;
    background: url('../../assets/policyimg/bd_bg3.png');
    background-size: 100% 100%;
    color: #fff;
}
.bd_nr3>ul {
    width: 75%;
    margin: auto auto;
    margin-top: 5px;
}
 .bd_nr3>ul>li { line-height: 30px;height: 30px;}
 
li:nth-child(1) .bd_nr_icon span{background-image: url('../../assets/policyimg/bd_icon1.png') }
li:nth-child(1) .bd_nr3{
	background-image: url('../../assets/policyimg/bd_bg2.png');
	color: #666;
}
</style>
<template>
<transition name="slide" 
		@before-enter="beforeEnter"
        @enter="enter"
        @leave="leave">
	<div class="list bounceInDown" v-show="steps.stepDate!=''" >
		<span class="ball"></span>
		<span class="arrow"></span>
		<div class="stepBox">
			<span class="stepDate">{{steps.stepDate}}</span>
			<span class="stepName">{{steps.stepText}}</span>
		</div>
	</div>
</transition>
</template>


<script>
export default {
	props:['steps','plc','num'],
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
/* .slide-enter-active,.slide-leave-active{
	transition: all .5s cubic-bezier(.07,.78,.84,1.3);
    opacity: 1;
}
.slide-enter{
	opacity: 0;
	transform: translateY(-150%);
} */
.list{
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
.stepDate,.stepName{display: block;}
</style>
<template>
<div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
	<div class="grzx_top">
		<ul>
			<li>
				<span style="width:55%;">开始时间</span>
				<span style="width:45%;">结束时间</span>
			</li>
			<li>
				<input type="text" v-model="agoDate" @click="openDate('ago')"> 
				<em>—</em>
				<input type="text" v-model="nowDate" @click="openDate('now')"></li>
			<li class="grzx_top_li">
				<button class="grzx_btn">
					<img :src="imgSrc" width="20px;" height="20px">查询
				</button>
			</li>
		</ul>
	</div>
	<div class="dateBox">
		<van-datetime-picker v-show="agoShow" v-model="agoDate" type="date" @confirm="ok('ago')" @cancel="cancel()" />
		<van-datetime-picker v-show="nowShow" v-model="nowDate" type="date" @confirm="ok('now')" @cancel="cancel()"/>
	</div>
</div>
</template>


<script>
import headerT from '../../components/header.vue';
import { mapActions } from "vuex";
import {dateStyle} from '@/filter/dateStyle.js';
import { DatetimePicker } from 'vant';
export default {
    filters: {
        dateFilter(date){
            return dateStyle(date)
        }
    },
    components: {
        headerT
    },
    data() {
        return {
        	agoShow:false,
        	nowShow:false,
        	agoDate: new Date(2018, 10, 1),
        	nowDate: new Date(),
            imgSrc: require('@/assets/images/search.png'),
            headerContent: '贷款账户'
        }
    },
    methods: {
        ok(x){
        	this.agoShow=false;
        	this.nowShow=false;
        },
        cancel(){
        	this.agoShow=false;
        	this.nowShow=false;
        },
        openDate(x){
        	if (x=='ago') {
        		this.agoShow=true;
        		this.nowShow=false;
        	}else{
        		this.agoShow=false;
        		this.nowShow=true;
        	}
        }
    }   
}
</script>

<style lang="scss" scoped>
.dateBox{
	position: fixed;
	bottom: 0;
	width: 100%;
}
.mg-box{
    min-height: 100vh;
    // background-color: #DCDCDC;  
}
input[type="text"] {box-sizing: border-box;padding: 3px;border: 1px solid #e0e0e1; color:#999;    outline: 0;}
.grzx_btn{height:40px;margin:10px auto;width:200px; border:none;color:#fff;font-size:14px;border-radius:7px;}
.grzx_bg{height:30px;line-height:30px;}
.grzx_top{margin:20px 2% 0px 2%;width: 96%;}
.grzx_top ul{width:100%;}
.grzx_top ul li{width:100%;height:30px;line-height:30px;}
.grzx_top ul li span{float:left;font-size:14px;font-weight:bold;color:#000;}
.grzx_top ul li input{ width:45%; float:left; display:block;height:30px;}
.grzx_top ul li em{ width:8%; display:block;float:left;margin:0px 1%; text-align:center;}
.grzx_top ul li.grzx_top_li{height:55px;line-height:55px; text-align:center;}
.grzx_top ul li.grzx_top_li button{margin:10px auto;width:100%;height:35px;background:#fb6362;color:#fff;box-shadow:2px 2px 2px rgba(0,0,0,.6);border:none;     font: icon;}
.grzx_top ul li.grzx_top_li button img{
	position: absolute;
	left: 30%; 
	vertical-align: middle;
}
</style>
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
    <div class="recordBox">
        <figure class="ssd_hklb_fig1">贷款记录</figure>
        <section class="ssd_hklb_nav " v-for="(item,index) in loansData.loanList" :key="index" >
            <div class="ssd_hklb_list dklb">
                <div class="ssd_hkld_list_title "> 
                    <span>保单号：003158178921008</span>
                    <span>贷款时间：2015-10-10</span>
                </div>
                <div class="ssd_hkld_list_img grzx_bg" @click="tog(item,index)">
                    <a href="javascript:;" class="OnclickImg ssd_hkld_open ssd_hkld_open_1" :class="{'off':!item.listShow}"></a>
                </div>
            </div>
            <ul class="ssd_hkld_conlist ssd_hkld_conlist_1" v-show="item.listShow">
                <li>
                    <i>险种简称：</i>
                    <em>福禄双升</em>
                </li>
                <li>
                    <i>贷款金额：</i>
                    <em>100元</em>
                </li>
                <li>
                    <i>贷款年利率：</i>
                    <em>5.10%</em>
                </li>
                <li>
                    <i>约定到期日：</i>
                    <em>2016-10-10</em>
                </li>
                <li>
                    <i>操作途径：</i>
                    <em>微信</em>
                </li>
                <li>
                    <i>贷款状态：</i>
                    <em>贷款生效付费成功</em>
                </li> 
            </ul>
        </section>
    </div>
    <div class="recordBox">
        <figure class="ssd_hklb_fig1">还款记录</figure>
        <section class="ssd_hklb_nav " v-for="(item,index) in loansData.repayList" :key="index">
            <div class="ssd_hklb_list">
                <div class="ssd_hkld_list_title "> 
                    <span>保单号：003158178921008</span>
                    <span>还款时间：2015-10-10</span>
                </div>
                <div class="ssd_hkld_list_img grzx_bg" @click="tog(item,index)">
                    <a href="javascript:;" class="OnclickImg ssd_hkld_open ssd_hkld_open_1" :class="{'off':!item.listShow}"></a>
                </div>
            </div>
            <ul class="ssd_hkld_conlist ssd_hkld_conlist_1" v-show="item.listShow">
                <li>
                    <i>险种简称：</i>
                    <em>福禄双升</em>
                </li>
                <li>
                    <i>还款金额：</i>
                    <em>100元</em>
                </li>
                <li>
                    <i>操作途径：</i>
                    <em>微信</em>
                </li>
                <li>
                    <i>还款状态：</i>
                    <em>还款成功</em>
                </li> 
            </ul>
        </section>
    </div>
    <div class="recordBox">
        <figure class="ssd_hklb_fig1">结息记录</figure>
        <section class="ssd_hklb_nav " v-for="(item,index) in loansData.interestList" :key="index">
            <div class="ssd_hklb_list">
                <div class="ssd_hkld_list_title "> 
                    <span>保单号：003158178921008</span>
                    <span>结息时间：2015-10-10</span>
                </div>
                <div class="ssd_hkld_list_img grzx_bg" @click="tog(item,index)">
                    <a href="javascript:;" class="OnclickImg ssd_hkld_open ssd_hkld_open_1" :class="{'off':!item.listShow}"></a>
                </div>
            </div>
            <ul class="ssd_hkld_conlist ssd_hkld_conlist_1" v-show="item.listShow">
                <li>
                    <i>险种简称：</i>
                    <em>福禄双升</em>
                </li>                <li>
                    <i>结息金额：</i>
                    <em>100元</em>
                </li>
            </ul>
        </section>
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
            headerContent: '贷款账户',
            loansData:{
                loanList:[
                    {
                        listShow:true
                    },
                    {
                        listShow:false
                    }
                ],
                repayList:[
                    {
                        listShow:true
                    },
                    {
                        listShow:false
                    }
                ],
                interestList:[
                    {
                        listShow:true
                    },
                    {
                        listShow:false
                    }
                ]
            }
        }
    },
    methods: {
        tog(item,index){
            item.listShow=!item.listShow
        },
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
// 查询结果
.ssd_hklb_list {
    height: 60px;
    // line-height: 60px;
    padding: 5px;
    background: url('../../assets/mgImg/bgg.png');
    border-radius: 7px;
}
.dklb{background: url('../../assets/mgImg/bg.png');}
.ssd_hkld_list_title {
    width: 80%;
    height: 60px;
    float: left;
}
.ssd_hkld_list_title span {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    display: inline-block;
    color: #fff;
}
.ssd_hkld_open {
    background: url('../../assets/mgImg/jx.png') no-repeat center;
    background-size: 30px 30px;
    width: 100%;
    height: 60px;
    float: left;
}
.ssd_hkld_open.off{transform: rotate(-90deg);}
.grzx_bg {
    height: 30px;
    line-height: 30px;
}
.ssd_hkld_list_img {
    width: 20%;
    height: 60px;
    float: left;
    text-align: center;
}
.ssd_hklb_nav {
    margin: 2%;
    width: 96%;
}
.ssd_hklb_fig1 {
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin: 0px 2%;
    width: 96%;
}
.ssd_hkld_conlist {
    width: 100%;
}
.ssd_hklb_nav ul li {
    border-bottom: 1px solid #dedede;
    line-height: 30px;
    height: 30px;
    width: 100%;
    display: inline-block;
}
.ssd_hklb_nav ul li i {
    width: 44%;
    display: inline-block;
    float: left;
    color: #000000;
    font-size: 12px;
    font-weight: 600;
}
.ssd_hklb_nav ul li em {
    width: 56%;
    display: inline-block;
    float: left;
    color: #000000;
    font-size: 12px;
}
</style>
<template>
    <div class="mg-box">
		<headerT :headerContent="headerContent"></headerT>
        <section class="date" style="display: flex;  width: 95%;margin: 0 auto;margin-top: 10px;margin-bottom: 10px;height: 42px;line-height: 42px;">
			<div style="line-height: 21px;">
				<span>分配&nbsp;<br>日期&nbsp;</span>
			</div>
			<div class="date_time" style="width: 85%;  text-align: center;display: flex;justify-content: space-between;">
				<div class="dkzhxx_lable1" style="top: 6px;">
					<input name="textfield" type="date" class="dkzhxx_input01" id="datepicker" value="2005-02-09">
				</div>—
				<div class="dkzhxx_lable2" style="top: 6px;">
					<input name="textfield" type="date" class="dkzhxx_input02" id="datepicker1" value="2018-11-12">
				</div>
			</div>
		</section>
		<section class="mp-box-one" v-for="(item,index) in dividendInfo" :key="index">
            <ul class="mp-list">
                <li class="mp-list-li line-down">
                    <p>险种名称：</p>
                    <p v-text="item.productName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>红利选择方式：</p>
                    <p v-text="item.dividendType"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>红利授权给付方式：</p>
                    <p v-text="item.dividendWay"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>分配日期：</p>
                    <p v-text="item.dividendTime"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>保额红利金额：</p>
                    <p v-text="item.dividendNum"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>现金红利金额：</p>
                    <p v-text="item.dividendNum2"></p>
                </li>
            </ul>
		</section>
    </div>
</template>

<script>
import headerT from '../../components/header.vue';
import {dateStyle} from '@/filter/dateStyle.js'
import { mapActions } from "vuex";
export default {
    data() {
        return {
            headerContent: '分红账户',
            dividendInfo:[
                {
                	policyCode:'001',
                    productName:'太平爱宝贝综合意外伤害保险',
                    applicantName:'范聪杰1',
                    insuredName:'范聪杰1',
                    validateDate:null,
                    statusName:'有效',
                    dividendType:'',
                    dividendWay:'',
                    dividendTime:'2011-01-01',
                    dividendNum:'1000元',
                    dividendNum2:''
                },
                {	
                	policyCode:'002',
                    productName:'太平爱宝贝综合意外伤害保险',
                    applicantName:'范聪杰1',
                    insuredName:'范聪杰1',
                    validateDate:null,
                    statusName:'有效',
                    dividendType:'',
                    dividendWay:'',
                    dividendTime:'2012-01-01',
                    dividendNum:'2000元',
                    dividendNum2:''
                }
            ]
        }
    },
    components:{
    	headerT
    },
    filters: {
        dateFilter(date){
            return dateStyle(date)
        }
    },
    created(){
        this.getLates({
            successCallback: (res) => {
                for(let item of res.result){
                    if(item.statusName == '有效'){
                        item.statusStyle = 'green'
                    } 
                    if(item.statusName == '停效'){
                        item.statusStyle = 'red'
                    } 
                }
                this.dividendData = res.result
            },
            fCallback:(res) => {
            }
        })
    },
    methods: {
        ...mapActions({
            getLates: "getLates"
        })
    }  
    
}
</script>

<style lang="scss" scoped>
.date input {
    width: 100%;
    border-radius: 0;
    /* background: url(img/icon_date.png) no-repeat right center; */
    background-color: #fff;
    border: none;
    font-size: 14px;
    width: 95%;
    padding-left: 2%;
    height: 30px;
}

.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;
}
.mp-hgroup{
    width: 95%;
    line-height: 0.8rem;
    color: #fff;
    background: url('../../assets/mgImg/xq_header_bg.png') no-repeat;
    margin: 0 auto;
    margin-top: 2%;
    background-size: 100% 100%;
    padding: 0 0 0 0.3rem;
    box-sizing: border-box;
}
.mp-box-one{
    width: 95%;
    background-color: #fff;
    margin: 10px auto;
    padding: 0 0.3rem 10px;
    box-sizing: border-box;
    border-radius: 10px;
    .mp-min-title{
        display: flex;
        justify-content: space-between;
        line-height: 0.8rem;
        .mp-min-left{
            display: flex;
            font-weight: 600;
            .mp-min-left-img{
                width: 0.3rem;
                padding-top: 0.17rem;
                margin-right: 0.2rem;
                img{
                    width: 100%;
                    display: block;
                }
            }
        }
        .mp-min-right{
            width: 0.44rem;
            padding-top: 0.22rem;
            img{
                width: 100%;
            }
        }
    }
    .mp-list{
        .mp-list-li{
            display: flex;
            justify-content: space-between;
            line-height: 0.52rem;
        }
        .mp-list-li:last-child{
            padding-bottom: 0.1rem;
        }
    }
}

/* 动画效果css */
.ani-down{
    transition: all .2s;
}
.add-ani-style{
    transform: rotateZ(180deg);
}
</style>
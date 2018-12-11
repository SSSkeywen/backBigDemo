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
				<input class="dateRili" type="text" v-model="selectAgoDate" @click="openDate('ago')" readonly> 
				<em>—</em>
				<input class="dateRili" type="text" v-model="selectNowDate" @click="openDate('now')" readonly></li>
			<li class="grzx_top_li">
				<button ref="searchBtn" class="grzx_btn" @click="select()">
					<img :src="imgSrc" width="20px;" height="20px">查询
				</button>
			</li>
		</ul>
	</div>
    <div class="date-wrap" v-show="pickerShow">
        <div class="dateBox">
            <van-datetime-picker v-show="pickerShow" v-model="pickerDate" type="date" @confirm="ok" @cancel="cancel()" />
        </div>
    </div>
    <div v-if="loansData.showFlog == '1'">
        <div class="recordBox">      
            <div v-if="loansData.registerType!='1'">
                <figure class="ssd_hklb_fig1">贷款记录</figure>
                <div v-if=" (loansData.LOANLIST==null && loansData.LOANNORESULTLIST==null)||(loansData.LOANLIST=='' && loansData.LOANNORESULTLIST=='')"  >
                    <span>&nbsp;&nbsp;现查询的时间段内您名下无贷款记录！</span>
                </div>
                <!-- 贷款申请成功记录-->
                <section class="ssd_hklb_nav " v-for="(item,index) in loansData.LOANLIST" :key="index" >
                    <div class="ssd_hklb_list dklb">
                        <div class="ssd_hkld_list_title "> 
                            <span>保单号：{{item.policy_code}}</span>
                            <span>贷款时间：{{item.oper_date}}</span>
                        </div>
                        <div class="ssd_hkld_list_img grzx_bg" @click="tog(item,index)">
                            <a href="javascript:;" class="OnclickImg ssd_hkld_open ssd_hkld_open_1" :class="{'off':!item.listShow}"></a>
                        </div>
                    </div>
                    <ul class="ssd_hkld_conlist ssd_hkld_conlist_1" v-show="item.listShow">
                        <li>
                            <i>险种简称：</i>{{item.product_abbr}}
                        </li>
                        <li>
                            <i>贷款金额：</i>{{item.loan_amt}}
                        </li>

                        <div v-if="item.change_status=='3'">
                            <li>
                                <i> 本次贷款年利率： </i> {{item.interest_rate | rateFilter }}
                            </li>
                            <li>
                                <i> 约定到期日： </i> {{item.expiry_date}}
                            </li>
                        </div>
                        <div v-if="item.change_status!='3'">
                            <div v-if="item.first_loan == 'Y'">
                                <li>
                                    <i> 本次贷款年利率： </i> {{item.interest_rate | rateFilter}}
                                </li>
                                <li><i> 约定到期日： </i> <em> 贷款到账日+六个月 </em></li>
                            </div>
                            <div v-if="item.first_loan != 'Y'">
                                <li>
                                    <i> 本次贷款年利率： </i>  与贷款到账当日未清偿的贷款利率一致 
                                </li>
                                <li>
                                    <i> 约定到期日： </i>  与贷款到账当日未清偿的贷款到期日一致
                                </li>
                            </div>
                        </div>
                        <li>
                            <i>操作途径：</i>{{item.biz_channel}}
                        </li>
                        <li>
                            <i>贷款状态：</i>{{item.loan_state}}
                        </li> 
                    </ul>
                </section>
                <!-- 贷款申请无结果记录-->
                <section class="ssd_hklb_nav " v-for="(item,index) in loansData.LOANNORESULTLIST" :key="index" >
                    <div class="ssd_hklb_list dklb">
                        <div class="ssd_hkld_list_title "> 
                            <span>保单号：{{item.policycode}}</span>
                            <span>贷款时间：{{item.insert_date}}</span>
                        </div>
                        <div class="ssd_hkld_list_img grzx_bg" @click="tog(item,index)">
                            <a href="javascript:;" class="OnclickImg ssd_hkld_open ssd_hkld_open_1" :class="{'off':!item.listShow}"></a>
                        </div>
                    </div>
                    <ul class="ssd_hkld_conlist ssd_hkld_conlist_1" v-show="item.listShow">
                        <li>
                            <i>险种简称：</i>{{item.product_abbr}}
                        </li>
                        <li>
                            <i>贷款金额：</i>{{item.apply_amount}}
                        </li>
                        <li>
                            <i>操作途径：</i> 微信
                        </li>
                        <div v-if="item.apply_status=='0'">
                            <li>
                                <i> 贷款状态： </i>  保全申请处理中 
                            </li>
                        </div>
                        <div v-if="item.apply_status!='0'">
                            <li>
                                <i> 贷款状态： </i>  保全申请失败 
                            </li>
                        </div>
                    </ul>
                </section>
            </div>   
        </div>

        <div class="recordBox">
            <figure class="ssd_hklb_fig1">还款记录</figure>
            <div v-if="(loansData.DISLIST==null && loansData.REFUNDNORESULTLIST==null)||(loansData.DISLIST=='' && loansData.REFUNDNORESULTLIST=='') "  >
                <span>&nbsp;&nbsp;现查询的时间段内您名下无还款记录！</span>
            </div>
            <!-- 还款申请成功记录-->
            <section class="ssd_hklb_nav " v-for="(item,index) in loansData.DISLIST" :key="index">
                <div class="ssd_hklb_list">
                    <div class="ssd_hkld_list_title "> 
                        <span>保单号：{{item.policy_code}}</span>
                        <span>还款时间：{{item.oper_date}}</span>
                    </div>
                    <div class="ssd_hkld_list_img grzx_bg" @click="tog(item,index)">
                        <a href="javascript:;" class="OnclickImg ssd_hkld_open ssd_hkld_open_1" :class="{'off':!item.listShow}"></a>
                    </div>
                </div>
                <ul class="ssd_hkld_conlist ssd_hkld_conlist_1" v-show="item.listShow">
                    <li>
                        <i>险种简称：</i>{{item.product_abbr}}
                    </li>
                    <li>
                        <i>还款金额：</i>{{item.discharge_amt}}
                    </li>
                    <li>
                        <i>操作途径：</i>{{item.biz_channel}}
                    </li>
                    <li>
                        <i>还款状态：</i>{{item.dis_state}}
                    </li> 
                </ul>
            </section>
            <!-- 还款申请无结果记录-->
            <section class="ssd_hklb_nav " v-for="(item,index) in loansData.REFUNDNORESULTLIST" :key="index">
                <div class="ssd_hklb_list">
                    <div class="ssd_hkld_list_title "> 
                        <span>保单号：{{item.policycode}}</span>
                        <span>还款时间：{{item.insert_date}}</span>
                    </div>
                    <div class="ssd_hkld_list_img grzx_bg" @click="tog(item,index)">
                        <a href="javascript:;" class="OnclickImg ssd_hkld_open ssd_hkld_open_1" :class="{'off':!item.listShow}"></a>
                    </div>
                </div>
                <ul class="ssd_hkld_conlist ssd_hkld_conlist_1" v-show="item.listShow">
                    <li>
                        <i>险种简称：</i>{{item.product_abbr}}
                    </li>
                    <li>
                        <i>还款金额：</i>{{item.apply_amount}}
                    </li>
                    <li>
                        <i>操作途径：</i>微信
                    </li>
                    <div v-if="item.apply_status=='0'">
                        <li>
                            <i> 还款状态： </i>  保全申请处理中 
                        </li>
                    </div>
                    <div v-if="item.apply_status!='0'">
                        <li>
                            <i> 还款状态： </i>  保全申请失败 
                        </li>
                    </div> 
                </ul>
            </section>
        </div>

        <div class="recordBox">
            <div v-if="loansData.registerType!='1'">
                <figure class="ssd_hklb_fig1">结息记录</figure>
                <div v-if=" loansData.CAPILIST==null||loansData.CAPILIST=='' "  >
                    <span>&nbsp;&nbsp;现查询的时间段内您名下无结息记录！</span>
                </div>
                <section class="ssd_hklb_nav " v-for="(item,index) in loansData.CAPILIST" :key="index">
                    <div class="ssd_hklb_list">
                        <div class="ssd_hkld_list_title "> 
                            <span>保单号：{{item.policy_code}}</span>
                            <span>结息时间：{{item.oper_date}}</span>
                        </div>
                        <div class="ssd_hkld_list_img grzx_bg" @click="tog(item,index)">
                            <a href="javascript:;" class="OnclickImg ssd_hkld_open ssd_hkld_open_1" :class="{'off':!item.listShow}"></a>
                        </div>
                    </div>
                    <ul class="ssd_hkld_conlist ssd_hkld_conlist_1" v-show="item.listShow">
                        <li>
                            <i>险种简称：</i>{{item.product_abbr}}
                        </li>                
                        <li>
                            <i>结息金额：</i>{{item.loan_interest}}
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </div>

    <alertContent :alertCount="alertCount"></alertContent>
</div>
</template>


<script>
import headerT from '../../components/header.vue';
import { mapActions } from "vuex";
import {interestRate} from '@/filter/interestRate.js';
import alertContent from "../../components/alertContent";
import { DatetimePicker,Toast } from 'vant';
export default {
    filters: {
        rateFilter(rate){
            return interestRate(rate)
        }
    },
    components: {
        headerT,
        alertContent,
    },
    data() {
        return {
            selectAgoDate: new Date(),
            selectNowDate: new Date(),
            pickerShow: false,
            pickerProperty: 'ago',//用来判断是选择开始时间 还是 结束时间
            pickerDate: new Date(),          
            imgSrc: require('@/assets/images/search.png'),
            headerContent: '贷款账户',
            loansData:{
                // loanlist: [],
                // dislist: [],
                // refundnoresultlist: [],
                // totallist: [],
                // nopreserresultlist: [],
                // capilist: [],
                // loannoresultlist: []
            },
            alertCount:{
                isShowAlert:false,
                alertData:'请输入',
            },
            ifErrorTime: true,//用于记录选择时间是否有问题
        }
    },
    created(){
        // this.setInitDate();
        this.historyinit({//取服务器当前时间
            successCallback: (res) => {
                // console.info("result:"+res)
                this.selectAgoDate = res.start_date;
                this.selectNowDate = res.end_date;
            },
            failCallback:(res) => {
                if(res.code == 2002){
                    this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
                }else{
                    this.alertCount.isShowAlert = true;
                    this.alertCount.alertData = res.msg;
                }
            }
        })
    },
    methods: {
        select(){
            console.info("ifErrorTime:"+this.ifErrorTime)
            if(this.ifErrorTime){
                let date = {
                    start_date: this.selectAgoDate, 
                    end_date: this.selectNowDate
                }
                const toast1 = Toast.loading({
                    mask: true,
                    message: "加载中...",
                    duration: 3000
                });
                this.historyquery({
                    date,
                    successCallback: (res) => {
                        toast1.clear();
                        // console.info("result:"+JSON.stringify(res))
                        // console.info((0.045*100).toFixed(2) + '%')

                        if(res.LOANLIST!=null){
                            (res.LOANLIST).forEach((item, index) => {
                                if(index==0){
                                    item.listShow =true;
                                }else{
                                    item.listShow =false;
                                }
                            });
                        }

                        if(res.LOANNORESULTLIST!=null){
                            (res.LOANNORESULTLIST).forEach((item, index) => {
                                if(index==0){
                                    item.listShow =true;
                                }else{
                                    item.listShow =false;
                                }
                            });
                        }

                        if(res.DISLIST!=null){
                            (res.DISLIST).forEach((item, index) => {
                                if(index==0){
                                    item.listShow =true;
                                }else{
                                    item.listShow =false;
                                }
                            });
                        }

                        if(res.REFUNDNORESULTLIST!=null){
                            (res.REFUNDNORESULTLIST).forEach((item, index) => {
                                // console.info("item.index:"+index)
                                if(index==0){
                                    item.listShow =true;
                                }else{
                                    item.listShow =false;
                                }
                            });
                        }

                        if(res.CAPILIST!=null){
                            (res.CAPILIST).forEach((item, index) => {
                                if(index==0){
                                    item.listShow =true;
                                }else{
                                    item.listShow =false;
                                }
                            });
                        }

                        this.loansData = res;
                    },
                    failCallback:(res) => {
                        toast1.clear();
                        this.alertCount.isShowAlert = true;
                        this.alertCount.alertData = res.msg;
                    }
                })
            }
        },
        tog(item,index){
            item.listShow=!item.listShow
        },
        ok(item){
            console.log("item:"+item)
        	this.pickerShow=true;
            let month = item.getMonth() - 0 + 1;
            if (month < 10) {
                month = "0" + month;
            }
            let today = item.getDate();
            if (today < 10) {
                today = "0" + today;
            }
            if(this.pickerProperty == 'ago'){
                this.selectAgoDate = item.getFullYear() + "-" + month + "-" + today;
            }else{
                this.selectNowDate = item.getFullYear() + "-" + month + "-" + today;
            }
            this.pickerShow=false;

            //判断时间是否存在如下三种问题
            let agoTime = new Date(this.selectAgoDate).getTime();
            let nowTime = new Date(this.selectNowDate).getTime();
            let todayTime = new Date().getTime();
            let diffDays = parseInt(Math.abs(agoTime-nowTime)/1000/60/60/24);
            this.ifErrorTime = true;
            if(agoTime > nowTime){
                Toast("结束时间不能在开始时间之前！");
                this.ifErrorTime = false;
            }else if(diffDays >= 365){
                Toast("结束时间和开始时间间隔不能超过一年！");
                this.ifErrorTime = false;
            }else if(nowTime > todayTime){
                Toast("结束时间不能超过当天！");
                this.ifErrorTime = false;
            }
            if(!this.ifErrorTime){
               this.$refs.searchBtn.style.backgroundColor='#ddd' 
            }else{
               this.$refs.searchBtn.style.backgroundColor='#fb6362'
            }
        },
        cancel(){
        	this.pickerShow=false;
        },
        openDate(x){
            this.pickerShow=true;
        	if (x=='ago') {
        		this.pickerProperty = 'ago';
        	}else{
        		this.pickerProperty = 'nwo';
        	}
        },
        ...mapActions({
            historyinit: "historyinit",
            historyquery: "historyquery",
        }),
    }   
}
</script>

<style lang="scss" scoped>
.date-wrap{
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0);
}
.dateBox{
	position: absolute;
    z-index: 99;
	bottom: 0;
	width: 100%;
}
.mg-box{
    min-height: 100vh;
    // background-color: #DCDCDC;  
}
input[type="text"] {box-sizing: border-box;padding: 3px;border: 1px solid #e0e0e1; border-radius: 2px; color:#999;outline: 0;}
.dateRili{background: url('../../assets/mgImg/rili.png') right center no-repeat}
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
    color: #000000;
    font-size: 12px;
    font-weight: 600;
}
.ssd_hklb_nav ul li em {
    width: 56%;
    display: inline-block;
    color: #000000;
    font-size: 12px;
}
</style>
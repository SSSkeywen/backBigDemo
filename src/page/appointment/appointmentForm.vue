<template>
<div class="mg-box">
	<div class="user-message">
		<div class="message-title">
			<img  src="@/assets/appointment/2_04.png"/> 预约人信息
		</div>
		<div class="appointmentline">
			<div class="appointmentline-left">手机号:</div>
			<div class="appointmentline-right">{{datalist.subPhone}}</div>
		</div>
		<div class="appointmentline">
			<div class="appointmentline-left">验证码:</div>
			<div class="appointmentline-right">
				<input type="text"  placeholder="请输入您的验证码"  class=" appointmentline-right-left" />
				<div  @click="sendCode">
					<input class="sendcode" type="button" :value="sendCodeFont" :disabled="sendCodeFontdisabled" :class="{changesendCode: sendCodeFontdisabled}">
				</div>
			</div>
		</div>
	</div>
	<div class="appoint-message" style="
		    background: #fff;
		">
		<div class="message-title">
			<img  src="@/assets/appointment/2_04.png"/> 预约柜面信息
		</div>
		<div class="appointmentline">
			<div class="appointmentline-left">预约柜面&nbsp;<span>*</span>&nbsp;:</div>
			<div class="appointmentline-right">
				<div style="
					font-weight: bold;
					color: #343434;
				">
				{{datalist.sitename}}
				</div>
				<div class="appointmentline-right-right" @click="pushaddressIndex">
				<img  src="@/assets/appointment/2_17.png"/>
				</div>
			</div>
		</div>
		<div class="appointmentline">
			<div class="appointmentline-left">预约日期&nbsp;<span>*</span>&nbsp;:</div>
			<div class="appointmentline-right" @click="showCalendar=true" id="orderdate">
			{{orderdate}}
			</div>
		</div>
		<div class="appointmentline">
			<div class="appointmentline-left">预约时段&nbsp;<span>*</span>&nbsp;:</div>
			<div class="appointmentline-right" @click="chooseTimeContentshow=true">
			{{ordertime}}
			</div>
		</div>
		<div class="appointmentline">
			<div class="appointmentline-left">预约项目:</div>
			<div class="appointmentline-right">
				<div class="appointmentline-right-left" :class="{changeProjectColor: projectlist}">
				{{project}}
				</div>
				<div class="appointmentline-right-right">
				<img  @click="pushserver" src="@/assets/appointment/2_17.png"/>
				</div>
			</div>
		</div>
		<p style='color:red;font-size:0.24rem;text-indent:0em;appointmentline-height:20px;padding:0 1em;margin-bottom: 0.4rem;'>注:带“*”的为必填项<br/>&nbsp;&nbsp;&nbsp;&nbsp;选择“预约项目”，预约成功后可在“预约查询”页面查看应备资料</p>
	</div>
	<div style="display:none;position: fixed;top:0;height: 100%;width: 100%;background-color: rgba(0,0,0,0.3);padding-top: 40%;" id="calendarPlugin" v-show="showCalendar">
		<div id="zp_div" >
			<div id="preMonth" class="zp_img" @click="preMonth"></div>
			<div id="yearAndMonth"></div>
			<div id="nextMonth" class="zp_img zp_right" @click="nextMonth"></div>
		</div>
		<table id="fillingDay" style="    width: 100%;background-color: #fff;">
		</table>
	</div> 
	<div class="chooseTime" v-show="chooseTimeContentshow">
		<div class="chooseTimeTitle">
			请选择时间段
		</div>
		<div class="chooseTimeContent" v-for="(item,index) in timelist" :key="index" >
			<div class="chooseTimeContentcir" @click="chooseTimeContentcir(item.slotid, index)" :class="{chooseTimeslect:item.select, chooseTimedisabled: item.state == 1}">
			</div>
			<div class="chooseTimetext" >
			{{item.timeshow}}
			</div>
		</div>
	</div>
	<div id="sub">立即预约</div>
</div>

</template>
<script src="a">
</script>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
	data(){
		return{
			chooseTimeContentshow: false,
			slotid: '',
			timelist: [],
			startDateStr: null,
			endDate: null,
			endDateStr: null,
			passList: [],//定义特殊可预约
			noPassList: [],//定义特殊不可预约 
			weekList: [],//星期规则
			showFlag: true,
			startDate: null,
			currentShowMonth: null,
			currentShowYear: null,
			projectlist: null,
			project: '',
			showCalendar: false,
			datalist: {},
			countDown: 60,
			timer: null,
			sendCodeFontdisabled: false,
            sendCodeFont: '获取验证码',
			orderdate:'请选择预约日期',
			ordertime:'请选择预约时段',
		}
   },
	methods: {
		chooseTimeContentcir(slotid, index){
			this.slotid = slotid
			this.chooseTimeContentshow = false
		},
		preMonth(){
			$("#nextMonth").addClass("zp_right");
			$("#nextMonth").css("visibility","visible");
			//切换年月显示 
			if(this.currentShowMonth == 1){
				this.currentShowYear -= 1;
				this.currentShowMonth = 12;
			}else{
				this.currentShowMonth -= 1;
			}
			//当前年月填充 
			var mTemp = this.currentShowMonth < 10 ? ('0' + this.currentShowMonth) : this.currentShowMonth;
			$("#yearAndMonth").html(this.currentShowYear + "-" + mTemp);
			//填充日历 
			this.fillingDayFunction(this.currentShowYear, this.currentShowMonth);
			//当为当前年月时，需要隐藏掉此元素 
			if(this.currentShowYear == this.startDate.getFullYear() && this.currentShowMonth == this.startDate.getMonth() + 1){
				$("#preMonth").css("visibility","hidden");
				$("#preMonth").removeClass('zp_left');
			}
		},
		nextMonth(){
			$("#preMonth").addClass("zp_left");
			$("#preMonth").css("visibility","visible");
			//切换年月显示 
			if(this.currentShowMonth < 12){
				this.currentShowMonth += 1;
			}else{
				this.currentShowYear += 1;
				this.currentShowMonth = 1;
			}
			//当前年月填充 
			var mTemp = this.currentShowMonth < 10 ? ('0' + this.currentShowMonth) : this.currentShowMonth;
			$("#yearAndMonth").html(this.currentShowYear + "-" + mTemp);		
			//填充日历 
			this.fillingDayFunction(this.currentShowYear, this.currentShowMonth);
			//当前年月达到最大时 ，需要隐藏掉此元素 
			if(this.currentShowYear == this.endDate.getFullYear() && this.currentShowMonth == this.endDate.getMonth() + 1){
				$("#nextMonth").css("visibility","hidden");
				$("#nextMonth").removeClass("zp_right");
			}
		},
		setTime(){
			this.timer = setInterval(() => {
					if (this.countDown <= 0) {   
					this.sendCodeFontdisabled = false
					this.sendCodeFont="获取验证码";   
					this.countDown = 60;  
					clearInterval(this.timer)
					this.timer = null
					
				} else {
					this.sendCodeFontdisabled = true
					this.sendCodeFont="重新发送(" + this.countDown + ")";
					this.countDown = this.countDown -1;  
					// 999898
				}
			},1000);

		},
		sendCode(){
			if(!this.datalist.phone){
				Toast({
					message: '手机号码为必录入项',
					duration: 3000
				});
			} else {
				if(/^1\d{10}$/.test(this.datalist.phone)){
					let editdata = {
						"phone":this.datalist.phone,
						}
					this.createverifycode({
						editdata,
						successCallback: (res) => {
							Toast({
								message: '验证码发送成功',
								duration: 3000
							});
							this.setTime();
						},
						failCallback:(res) => {
							Toast({
								message: '验证码发送失败',
								duration: 3000
							});
						}
					})
				} else {
					Toast({
						message: '手机号码格式不对',
						duration: 3000
					});
				}
			}
		},
		...mapActions({
             listsitennfobyids: 'listsitennfobyids',
			 createverifycode: 'createverifycode',
			 listsiteopendatebysite: 'listsiteopendatebysite',
			 listordertimeslotbysite: 'listordertimeslotbysite'
        }),
		pushserver(){
			this.$router.push({path: '/server',query:{'siteId': this.$route.query.siteId}})
		},
		pushaddressIndex(){
			this.$router.push({path: '/addressIndex'})
		},
		fillingDayFunction(year, month){//month值为1-12
			//当前年月填充 
			debugger
	        var mTemp = month < 10 ? ('0' + month) : month;
			$("#yearAndMonth").html(year + "-" + mTemp);
	        //获取当前月的第一天 
	        var monthFirstDay = new Date(year, month-1, 1);
	        var monthFirstWeekDay = monthFirstDay.getDay();
	        var monthTotal;
	        if(month == 4 || month == 6 || month == 9 || month == 11){
	        	monthTotal = 30;
	        }else if(month == 2){
	        	if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)){
	        		monthTotal = 29;
	        	}else{
	        		monthTotal = 28;
	        	}        	
	        }else{
	        	monthTotal = 31;
	        }
	        //计算row 行数 
	        var rowNum;
	        if(monthTotal == 28 && monthFirstWeekDay == 0){//仅当前月份只有28天，且第一天为礼拜天为四行 
	        	rowNum = 4;
	        }else if( (monthTotal == 30 && monthFirstWeekDay == 6) || 
	        		(monthTotal == 31 && monthFirstWeekDay >= 5)){
	        	rowNum = 6;
	        }else{
	        	rowNum = 5;
	        }
	        
	        //调用填充日历函数
	        this.fillingCalendar(monthFirstWeekDay, rowNum, monthTotal);	        
		},
		fillingCalendar(monthFirstWeekDay, rowNum, monthTotal){
			//填充日历 
			console.log('fillingCalendar')
	        var html = '<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>';
			var count = 0;
	        for(var i = 1 ; i <= rowNum; i++){
	        	html += '<tr>';
	        	for(var k = 1; k <= 7; k++){
	        		//对于第一行的第几列开始填充 
	        		if(i == 1 && k < (monthFirstWeekDay + 1) ){
	        			html += '<td></td>';
	        		}else{
		        		count ++;
		        		//如果超过月份最后一天立即跳出 
		        		if(count > monthTotal){
		        			html += `<td></td>`;
		        		}else{
		        			//调用方法 是否禁用 
		        			var flag = this.isDisable(count);
		        			if(flag){
		        				html += '<td  tag="no"> <i class="zp_gray">'+ count + '</i></td>';
		        			}else{
		        				//若为当前选中日期，则标红 
		        				var selectDate = $("#orderdate").attr('value');
		        				if(selectDate){
		        					var arrSelect = selectDate.split('-');
		        					var y1 = parseInt(arrSelect[0]);
		        					var m1 = parseInt(arrSelect[1]);
		        					var d1 = parseInt(arrSelect[2]);
		        					if( y1== this.currentShowYear &&
		        							m1 == this.currentShowMonth && d1 == count){
		        						html += '<td><i class="zp_red">' + count + '</i></td>';
		        					}else{
		        						html += '<td><i>' + count + '</i></td>';
		        					}
		        				}else{		        					
			        				html += '<td><i>' + count + '</i></td>';
		        				}
		        			}	        			
		        		}
	        		}
	        	}
	        	html += '</tr>';
	        }			
	        //填充日历天数 
	        $("#fillingDay").html(html);
	        
	        //由于table元素重新生成，需要重新定义td点击事件
	        this.clickCalendar();
		},
		clickCalendar(){
			//日期选中 
			
			$("td").click(function(){
				alert(1)
				if($(this).attr("tag") == 'no'){
					return;	
				}
				console.log('click')
				var text = $(this).text();
				if(text){	
					//选中的颜色标绿 
					$(".zp_red").removeClass("zp_red");
					$(this).children('i').addClass('zp_red');
					var selectMonth = this.currentShowMonth >= 10 ? this.currentShowMonth : ('0' + this.currentShowMonth);
					var selectText = text >= 10 ? text : ('0' + text);
					$("#orderdate").attr('value', this.currentShowYear + '-' + selectMonth + '-' + selectText);
					$("#calendarPlugin").hide();
					this.showCalendar = false
					this.showFlag = true;
					this.changeDate(false);
				}			
			});
		},
		changeDate(initFlag){
			$("#timeSlot").removeAttr("disabled");
			var data = $TOOLS.ajaxComm("sxy/listOrderTimeSlotBySite.html",{siteid:$("#siteid").val(),orderdate:$("#orderdate").val()},"POST", "JSON");
			var htmlStr = "<li class='zp_li'><div style='margin-left: 0.5rem;'>请选择时间段</div></li>"; 
			for(var i = 0; i < data.result.length; i++){
				if(data.result[i].state==0){
					htmlStr += "<li class='zp_li'><div class='zp_img3 zp_img2'></div><div class='zp_d' value='"+data.result[i].slotid+"'>"+data.result[i].timeshow+"</div></li>";
				}else{
					htmlStr += "<li class='zp_li' disabled='disabled'><div class='zp_img3 zp_img2'></div><div class='zp_d' value='"+data.result[i].slotid+"'>" + data.result[i].timeshow + "</div></li>";
				}
			}
			$(".modle .conter ul").html(htmlStr);
			if(initFlag){
				$("#timeSlot").attr('tag', "${sessionScope.updateSlotid}");
				$("#timeSlot").attr("placeholder","${sessionScope.timeshow}");
				$(".zp_li").each(function() {
					var ttttt = $(this).children('.zp_d').attr('value');
					if(ttttt == "${sessionScope.updateSlotid}"){
						$(this).children('.zp_img3').addClass("zp_img1").removeClass('zp_img2');
						$(this).siblings().children('.zp_img3').removeClass('zp_img1');
						$(this).siblings().children('.zp_img3').addClass('zp_img2');
					}
				});
			}
		},
		isDisable(count){
			//创建日历中的年月日 Date类型
			var dateRL = new Date(this.currentShowYear, this.currentShowMonth - 1, count);
			//若小于起始 或大于结束日期 
			if(dateRL <= this.startDate || dateRL > this.endDate){
				return true;
			}
			//拼写日历中的年月日 YYYY-MM-dd
			var monthString = this.currentShowMonth < 10 ? this.currentShowMonth : '0' + this.currentShowMonth;
			var countString = count < 10 ? count : '0' + count;
			var dateRLString = this.currentShowYear + '-' + monthString + '-' + countString;
			//特殊可预约 
			if(this.passList.length > 0){
				for(var i = 0; i < this.passList.length; i++){
					if(dateRLString == this.passList[i]){
						return false;
					}
				}
			}
			//特殊不可预约 
			if(this.nopassList.length > 0){
				for(var i = 0; i < this.nopassList.length; i++){
					if(dateRLString == this.nopassList[i]){
						return true;
					}
				}
			}
			//星期规则
			var weekNum = dateRL.getDay();
			if(weekNum == 0){//礼拜天特殊处理
				if(this.weekList[6] == 0){
					return true;
				}else{
					return false;
				}
			}else{
				if(this.weekList[weekNum-1] == 0){
					return true;
				}else{
					return false;
				}
			}
		}
	},
	mounted() {
		let editdata = {siteId:this.$route.query.siteId}
		console.log('123', editdata)
		this.listsitennfobyids({
			editdata,
            successCallback: res => {
				this.datalist = res.data
            },
            failCallback: res => {
                    Toast({
                        message: res.msg,
                        duration: 3000
                    });
            }
        });
		let edit = this.$route.query.siteId
		this.listsiteopendatebysite({
			edit,
            successCallback: res => {
				
				console.log('zzz', res.data)
					//设定预约起始日、结束日[字符串和date类型两种]
	
					//日历被点击时是否展示标示值
					this.passList = res.data.passList;
					this.nopassList = res.data.nopassList;
					this.weekList = res.data.weekrule.split('');
					

					//字符串格式的起始和结束日 
					this.startDateStr = res.data.datestart;
					var endDateStr = res.data.dateend;	
					//转换date格式的起始和结束日 
					var tempStart = this.startDateStr.split('-');		
					var tempEnd = endDateStr.split('-');
					this.startDate = new Date(tempStart[0], parseInt(tempStart[1]) - 1, parseInt(tempStart[2]));
					console.log('this.startDate', this.startDate)
					this.endDate = new Date(tempEnd[0], parseInt(tempEnd[1]) - 1, parseInt(tempEnd[2]));
					//当前日历展示的年月
					this.currentShowYear = this.startDate.getFullYear();
					this.currentShowMonth = this.startDate.getMonth() + 1;
					this.fillingDayFunction(this.currentShowYear, this.currentShowMonth);
					console.log('this.passList', this.passList)
            },
            failCallback: res => {
                    Toast({
                        message: res.msg,
                        duration: 3000
                    });
            }
        });
		this.projectlist = this.$route.query.project ? JSON.parse(this.$route.query.project) : this.projectlist
		if(this.projectlist && this.projectlist.length > 0){
			let arr = []
			this.projectlist.forEach((item) => {
				arr.push(item.name)
			})
			console.log('arr', arr)
			this.project = arr.join()
		} else {
			this.project = '请选择预约项目'
		}
		let sitedata = {
			"siteId": edit,
			"orderDate":"2018-12-25"
		}
		this.listordertimeslotbysite({
			sitedata,
            successCallback: res => {
				this.timelist = res.data
				console.log('das', res)
				this.timelist.forEach((item) => {
					item.select = false
				})
            },
            failCallback: res => {
                    Toast({
                        message: res.msg,
                        duration: 3000
                    });
            }
        });
	},
	components: {
	},
}
</script>

<style lang="scss" scoped>
@import url('./../../../static/css/index.css');
 .zp_gray{width: 0.48rem;height: 0.48rem;background-color: #f5f5f5;color: #bdbdbd;display:block;line-height:0.48rem;border-radius: 50%;-webkit-border-radius: 50%;margin-left:0.28rem;text-align: center;}
.wh_container{
	position: absolute;
    bottom: 0;
}
::-input-placeholder{
	color: red
} 
input{
	    font-size: 0.3rem;
}
.chooseTime{
	width: 6.04rem;
    height: 6.56rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -3.02rem;
    margin-left: -3.28rem;
    border-radius: 0.2rem;
	.chooseTimeTitle{
		    margin-top: 0.66rem;
		padding-left: 0.44rem;
		font-size: 0.3rem;
	}
	.chooseTimeContent{
		display: flex;
		margin-top: 0.36rem;
		padding-left: 0.44rem;
	}
	.chooseTimeContentcir{
		    width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		border: 0.01rem solid #9f9f9f;
		margin-right: 0.2rem;
	}
	.chooseTimetext{
		    font-size: 0.26rem;
	}
}
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
    .sendcode{
    	width: 2.26rem !important;
	    height: 0.5rem;
	    background: #31b53e;
	    text-align: center;
	    appointmentline-height: 0.5rem;
	    color: #fff;
	    font-size: 0.22rem !important;
	    border-radius: 0.05rem;
	    line-height: 0.5rem;
    }
    .appointmentline{
    	display: flex;
	 background: #fff;
	 padding-left: 0.2rem;
	 height: 0.9rem;
	 align-items: center;
	  border-bottom: 0.02rem solid #f4ede5;
	.appointmentline-left {
		 width: 2.03rem;
		font-weight: bold;
	 	color: #343434;
	 	font-size: 0.3rem;
	 	span{
	 		color: #fff;
	 	}
	 }
	 .appointmentline-right{
	 	color: #cacaca;
	 	 font-size: 0.25rem;
	 	  display:  flex;
		    justify-content: space-between;
		    width: 60%;
		input{
			font-size: 0.25rem;
    		width: 60%;
		}
	 }
    }
}
.user-message{
	padding-bottom: 0.3rem;
}
#sub{
	    width: 6.78rem;
	    height: 0.7rem;
	    background: #30b63b;
	    font-size: 0.26rem;
	    color: #fff;
	    margin: 0 auto;
	    line-height: 0.7rem;
    	    text-align: center;
}
.message-title{
    height: 0.9rem;
    background: #fff;
    display: flex;
    align-items: center;
    padding-left: 0.2rem;
     color: #2f2f2f;
    font-size: 0.3rem;
     font-weight: bold;
    border-bottom: 0.02rem solid #f4ede5;
    img{
    	 width: 0.7rem;
	 height: 0.7rem;
	 padding-right: 0.2rem;
    }
}
.changesendCode{
    background:#999898 !important;
}
.changeProjectColor{
	color: rgb(52, 52, 52);
}
 .zp_gray{width: 0.48rem;height: 0.48rem;background-color: #f5f5f5;color: #bdbdbd;display:block;line-height:0.48rem;border-radius: 50%;-webkit-border-radius: 50%;margin-left:0.28rem;text-align: center;}
tr{width:7.5rem;display: block;height:0.9rem;}
tr:first-child{padding-top: 0.3rem;}

	th{width:1.07rem;display:block;text-align: center;float: left;height: 100%;}
	td{width:1.07rem;display:block;text-align: center;float: left;height: 100%;line-height: 0.48rem;}
	#zp_div{width:7.5rem;height: 0.9rem;line-height: 0.9rem;background-color: #30b639;text-align: center;display: flex;justify-content:space-around;-webkit-justify-content: space-around;color:#FFF;font-size: 0.32rem;}
    .zp_img{height:0.3rem;width:0.16rem;margin-top:0.3rem;}
    .zp_left{background: url("") no-repeat center;-webkit-background-size: 100%;
	  	background-size: 100%;}
    .zp_right{background: url("") no-repeat center;-webkit-background-size: 100%;
	  	background-size: 100%;}
	 .zp_red{width: 0.48rem;height: 0.48rem;background-color: #30b639;color: #fff;display:block;line-height:0.48rem;border-radius: 50%;-webkit-border-radius: 50%;margin-left:0.28rem;text-align: center;}
	 .zp_gray{width: 0.48rem;height: 0.48rem;background-color: #f5f5f5;color: #bdbdbd;display:block;line-height:0.48rem;border-radius: 50%;-webkit-border-radius: 50%;margin-left:0.28rem;text-align: center;}
     	.modle{position: fixed;top: 0;height: 100%;width: 100%;background-color: rgba(0, 0, 0, 0.7)}
	   	.conter{width: 6rem;    margin-left: 0.75rem;   background-color: #fff;padding: 0.45rem 0;border-radius: 4px;-webkit-border-radius: 4px;overflow: hidden;    position: absolute;top: 3.68rem;font-size: 0.32rem;}
	   	.conter ul li{display: block;height: 0.8rem;line-height: 0.8rem;}
	   	.zp_img3{  width: 0.44rem;
    height: 0.44rem; margin-left: 0.5rem; margin-right: 0.2rem; float: left;margin-top: 0.18rem;}
     .zp_img2{background: url('') no-repeat center; -webkit-background-size: 100%; 
    background-size: 100%;}
    .zp_img1{background: url('') no-repeat center; -webkit-background-size: 100%;
    background-size: 100%;}
	   .zp_d{height: 0.8rem;line-height: 0.8rem;}
</style>
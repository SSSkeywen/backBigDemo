<template>
<div class="content">
	<div class="bd_tt">
	全部保单信息
	</div> 
	<div class="bdhflb">
		<div class="bdhf_tt">
			保单号码：003158178991008
		</div>
		<div class="bdhf_cont">
			<div class="bdhf_cont_right">
				<label>
					<input type="button" policyid="" itemid="" productid="" class="detail_btn">
				</label>
			</div>
			<div class="bdhf_cont_left">
			    <p class="bdhf_lpdate">
				          投保人姓名：
				    <span>张然</span>
				</p>
				<p class="bdhf_lpdate">
					生效日期：
					<span>2010-02-02</span>
				</p>
				<p class="bdhf_lpdate">
					第一主险名称：
					<span>太平爱爸妈骨折综合意外伤害保险</span>
				</p>
			</div>
		</div>
	</div>
	<div class="bdhflb">
	     <div class="bdhf_cont">
	         <div class="bdhf_cont_left" style="width:100%;">
	            <p class="bdhf_lptt">目前没有财富金账户（个险）的保单。
	            </p>
	         </div>
	     </div>
	 </div>
</div>
</template>


<script>
export default {
    data() {
        return {
            unitLinkedData:[{
                policyCode:'001',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰2',
                validateDate:null,
                statusName:'有效',
                effectiveDate:'2001-01-01',
                dividendNum:'1000元'
             },{
                policyCode:'002',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰2',
                validateDate:null,
                statusName:'有效',
                effectiveDate:'2001-01-01',
                dividendNum:'1000元'
             }]
        }
    },
}
</script>

<style scoped>
.content {padding: 20px 10px 30px;}
.bd_tt {
    text-align: center;
    font-size: 22px;
    padding: 0 0 20px;
}
.bdhflb {
    margin-bottom: 20px;
    overflow: hidden;
    background: #FFF;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    /* progid: DXImageTransform.Microsoft.gradient(startColorstr=#3363370b,endColorstr=#3363370b); */
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.4) /*firefox*/;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.4) /*webkit*/;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.4);
}
.bdhf_tt {
    padding: 10px 10px;
    color: #FFF;
    font-size: 20px;
    background: #00ac0c;
    /*background: #00ac0c url(../images/logo_tt.png) 92% 50% no-repeat;*/
    -moz-border-radius-topleft: 10px;
    -moz-border-radius-topright: 10px;
    -khtml-border-top-left-radius: 10px;
    -khtml-border-top-right-radius: 10px;
    -webkit-border-top-left-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    /* progid: DXImageTransform.Microsoft.gradient(startColorstr=#3363370b,endColorstr=#3363370b); */
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.3) /*firefox*/;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.3) /*webkit*/;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.3);
}
.bdhf_cont {
    padding: 25px 15px;
    overflow: hidden;
}
.bdhf_cont_right {
    width: 30%;
    margin-left: 2%;
    float: right;
}
.bdhf_cont_left {
    width: 68%;
    float: left;
}
.detail_btn {
    float: right;
    cursor: pointer;
    margin-top: 3px;
    background: url('../../assets/mgImg/detail_btn.png') right center no-repeat;
    height: 54px;
    border: 0;
    width: 54px;
}
.bdhf_lpdate {
    padding-top: 10px;
    font-size: 16px;
    color: #808080;
}
.bdhf_lpdate span, .qbbdhf_lb span, .qbbdhf_litop span { color: #00ac0c;}
.bdhf_lptt { font-size: 21px;}
</style>
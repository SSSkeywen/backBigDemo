<template>
<div class="mg-box">
    <nav class="nav_top" style="padding-top:10%;width:100%; text-align:center;">
    	<img src="@/assets/publicImg/icon_2.jpg" width="75px" height="75px" style="
            margin:  0 auto;
        ">
	    </nav>
	    <nav class="nav_content2">
	    	<span style="text-align: left;text-align:justify;text-indent: 2em;color: #000;"> </span>
	    </nav>
	    <section>
			<table border="1" style="width: 95%; margin: 0 auto; text-align: center; line-height: 30px;">
				<tr>
					<td>源账户</td>
					<td>目标账户</td>
					<td>数量</td>
				</tr>
				<tr  v-for="(item, index) in datalist" :key="index">
					<td v-if="item.FROM_ACCOUNT_CODE">{{item.FROM_ACCOUNT_CODE}}</td>
					<td v-if="item.TO_ACCOUNT_CODE">{{item.TO_ACCOUNT_CODE}}</td>
					<td v-if="item.UNIT">{{item.UNIT}}</td>
				</tr>
			</table>
		</section>
		<p style=" width: 95%; margin: 0 auto; line-height: 20px;margin-top: 5px; "></p>
	    <section class="yy_cx">
			<button class="cany_btn" @click="cany">参与问卷调查</button>
		</section>
		
		<section class="yy_cx">
			<button style="background-color: #949494;" class="konw_btn" @click="know">知道了</button>
		</section>
</div>

</template>
<script>
import alertContent from "@/components/alertContent.vue";
import amountbtn from "@/components/reduceAmount/reduceAmountButton.vue"
import headerT from "@/components/header.vue"
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
	data(){
		return{
           datalist: []
		}
	},
    mounted(){
		this.getapproval({
				successCallback: res => {
					this.datalist = res.transAccount
				},
				failCallback: res => {
						Toast({
						message: res,
						duration: 3000
					});
				}
			});
	},
	methods: {
		cany(){
			// 跳转文君调查的页面
			this.$router.push({path: '/'})
		},
		know(){
			this.$router.push({path: '/'})
		},
         ...mapActions({
             getapproval: 'getapproval'
        }),
       
	
	},
	components: {
	 headerT,
     amountbtn,
     alertContent
  },
}
</script>

<style lang="scss" scoped>
@import url('./../../../static/css/index.css');
.mg-box{
	table{
		border-collapse: collapse;
	}
	td{
	    border: 0.01rem solid #000;
	}
    min-height: 100vh;
    background-color: #f2f2f2;
    .nav_btn{width:100%;height:36px;line-height:36px;}
    .nav_btn button{width:90%;height:36px;border:0px;margin:0 5%; background:#04be01;color:#fff;border-radius:5px; font-size:16px;}
    .nav_content2 p{width:100%;line-height:50px; text-align:center; display:inline-block;font-size:18px;color:#000;}
    .nav_content2 span{width:88%;line-height:30px; text-align:center;display:inline-block;margin:0 6%;min-height:50px;color: #666;}
    .nav_content2{width:100%; text-align:center; font-size:16px;padding:10px 0px;}
    .yy_cx {
            width: auto;
            margin: 1.17647059em 15px 0.3em;
        }
	.yy_cx button { width: 100%; height: 46px; background-color: #00ae4d; -webkit-border-radius: 5px; -moz-border-radius: 5px; -ms-border-radius: 5px; border-radius: 5px; color: #fff; font-size: 18px; border: none; }
}

</style>
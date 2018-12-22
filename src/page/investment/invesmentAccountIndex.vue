<template>
	<div class="me-box">
		<div class="invesmentAccountIndex-box">
			<headerT :headerContent="headerContent"></headerT>
			<div class="invesmentAccountIndex-body" @click="pushpage(item.RESULT_LIST[0].policyCode)" v-for="(item, i) in datalist" :key="i">
					<div class="invesmentAccountIndex-top">
					<div class="invesmentAccountIndex-left">
						保单号：{{item.RESULT_LIST[0].policyCode}}
						</div>
						<img src="@/assets/invesment/icon_xin.png" alt>
					</div>
					<div class="invesmentAccountIndex-title samestyle">
					{{item.RESULT_LIST[0].productName}}
					</div>
					<div class="invesmentAccountIndex-day samestyle">
					生效日期:&nbsp;&nbsp;{{getTime(item.RESULT_LIST[0].validateDate)}}
					</div>
				</div>
			</div>
			<div v-if="showNothing">未查找到符合条件的数据！</div>
		</div>
	</div>
</template>

<script>
import headerT from '@/components/header.vue'
import { mapActions } from "vuex";
import { Toast } from "vant";
    export default {
        data() {
            return {
				showNothing: true,
				datalist: [],
                headerContent: '投资账户单位转换',
            }
        },
        components:{
            headerT
        },
        mounted(){
			this.getList({
				successCallback: res => {
					this.datalist = res
					if(this.datalist && this.datalist.length > 0) {
						this.showNothing = false
					}
				},
				failCallback: res => {
					Toast({
                        message: res
                    })
				}
			});
        },
        methods:{
			...mapActions({
				getList: 'getList'
			}),
			getTime (time){
				var data = new Date(time);
				var day = data.getDate();
				var month = data.getMonth();
				month = month+1;
				if(month.toString()<10){
						month = "0"+month;
				}
				if(day.toString()<10){
						day = "0"+day;           
				}
				//日期改为yyyy-m-d格式，且默认时间为去年今日至今天
				return (data.getFullYear().toString()+"-"+month.toString()+"-"+day.toString()+""+"");
			},
			pushpage(v){
				this.$router.push({path: '/invesmentAccountList',  query: {code:v}})
			}
        }
    }
</script>

<style lang="scss" scoped>
.me-box {
  background-color: #dcdcdc;
  min-height:100vh;
}
.invesmentAccountIndex-box{
	.invesmentAccountIndex-body{
		width: 6.76rem;
		height: 1.75rem;
		margin: 0 auto;
		margin-top: 0.2rem;
		border-radius: 0.3rem;
		background: #fff;
		.invesmentAccountIndex-top{
			    display: flex;
    			align-items: center;
			    color: #fff;
			    height: 0.54rem;
				background: #02ac4c;
				padding: 0 0.4rem;
				justify-content: space-between;
				/* align-items: center; */
				line-height: 0.54rem;
				    border-radius: 0.3rem 0.3rem 0rem 0rem;
			img{
				width: 0.42rem;
    			height: 0.42rem;
			}
		}
		.samestyle{
			padding: 0 0.4rem;
			padding-top: 0.15rem;
			color: #060606;
			font-size: 0.27rem;
		}
	}
    
}
</style>
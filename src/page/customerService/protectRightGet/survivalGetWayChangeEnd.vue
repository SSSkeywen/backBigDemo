<template>
<div class="normal-box">
	<div class="tk_pw tk_pw_css" style="overflow-y:auto;">
        <nav class="nav_top">
            <img :src="imgSrc2">
        </nav>
        <nav class="nav_content2"  v-for="(item,index) in approvalInfoList" :key="index">
			<p v-if="item.returnFlag==0" >保单号{{item.policyCode}} 变更成功</p>
			<p v-else >保单号{{item.policyCode}} 变更失败</p>
            <pre>
				<p>批文信息：{{item.returnMessage}}</p>
			</pre>
        </nav>
        <nav class="nav_btn">
            <a href="#">
                <button @click="closePage">关闭</button>
            </a>
        </nav>
    </div>
</div>
</template>


<script>
export default {
	data(){
		return{
			imgSrc3: require("@/assets/bsImg/success1.jpg"),
			imgSrc2: require("@/assets/bsImg/huang.jpg"),
			approvalInfoList: [],
		}
	},
	created(){
		let message =  JSON.parse(window.localStorage.getItem('survivalGetWayChangeApproval'));
		for(let item of message){
			let approvalInfo = {
				returnFlag: item.mess.RETURN_FLAG,
				policyCode: item.policyCode,
				returnMessage: item.mess.RETURN_MESSAGE
			}
			this.approvalInfoList.push(approvalInfo);
		}
	},
	methods: {
		closePage() {
			this.$router.push({ path: '/businessHanding'});
		}
	},
}
</script>

<style lang="scss" scoped>
.normal-box{
    min-height:100vh;
    background-color: #EFEFF4;
// 结果页面
	.tk_pw_css {
	    width: 100%;
	    height: 100%;
	    position: fixed;
	    background: #fff;
	    top: 0;
	    .nav_top{
	        padding-top: 10%;
	        width: 100%;
	        text-align: center;
	        img{
	            display: inline-block;
	            width: 75px;
	            height: 75px;
	        }
	    }
	    .nav_content2{
	        width: 100%;
	        padding:10px 0;
			font-size: 16px;
			text-align: center;
	        p {
	            width: 100%;
	            line-height: 50px;
	            text-align: center;
	            display: inline-block;
	            font-size: 18px;
	            color: #000;
	        }
	        pre{
	            white-space: pre-wrap;
				word-wrap: break-word;
				font-size: 0;
				p{
					display: inline-block;
					width: 90%;
					line-height: 29px;
					text-align: left;
					font-size: 18px;
	            	color: #000;
					font-family: 'Microsoft YaHei';
				}
	        }
	    }
	    .nav_btn {
	        width: 100%;
	        height: 36px;
	        line-height: 36px;
	        a{
	            button {
	                width: 90%;
	                height: 36px;
	                border: 0px;
	                margin: 0 5%;
	                background: #04be01;
	                color: #fff;
	                border-radius: 5px;
	                font-size: 16px;
	            }
	        }
	    }
    }
}
</style>
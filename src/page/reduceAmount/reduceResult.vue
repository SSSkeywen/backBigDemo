<template>
<div class="mg-box">
	<div class="success-header">
			<img src="@/assets/reduceAmount/successBg.png"
				width="100%" alt="" srcset="">
		</div>
    <section class="success-list success-list-two">
			<ul v-for="(item,index) in successData">
				<li class="line-down-two" :class="item.successStyle">
					<p class="title-p">{{item.successTips}}</p>
				</li>
				<li class="success-li-content">
					<div class="success-li-number" @click="isShowPwFn(index)">
						<p>保单号：{{item.policy_code}}</p>
						<div class="toup-icon"
              style="
                margin: auto 0;
            "
							:class="item.isShowPwContent? '':'to-down-icon'"  v-show="item.isShowMessage">
							<img src="@/assets/reduceAmount/toUp.png"
								width="100%" alt="">
						</div>
					</div>
					<p v-if="item.isShowPwContent" class="success-pw-countent"
						v-text="item.hxCountright"  v-show="item.isShowMessage"></p>
				</li>
			</ul>
		</section>
		<section class="success-btn"  @click="toBusinessPage">
			<button class="style-click">关闭</button>
		</section>
     </div>
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
      successData: [],
			password: '',
			alertCount: {
				isShowAlert: false,
				alertData: ''
			},
			headerContent: '您名下支持减额交情的保单列表',
		}
	},
	methods: {
        ...mapActions({
             reduceAmountPay: 'reduceAmountPay'
        }),
        toBusinessPage() {
          this.$router.push({path: '/'})
        },
        isShowPwFn(index){
          let data = this.successData[index]
          data.isShowPwContent = !this.successData[index].isShowPwContent
          this.$set(this.successData, index, data)
          // this.successData[index].isShowPwContent = !this.successData[index].isShowPwContent
        }
	
	},
	mounted() {
    let editdata = {list:JSON.parse(this.$route.query.neeeParms)}
    this.reduceAmountPay({
            editdata,
            successCallback: res => {
                 if(res && res.length > 0){
                  this.successData = res
                   for(let item of this.successData){
                    if(item.RETURN_FLAG  == 0){
                      item.isShowMessage=true;
                      item.isShowPwContent= true;
                      item.successTips="变更成功";
                      item.successStyle = "success-style";
                      item.hxCountright =item.RETURN_MESSAGE;
                    }
                    else{
                      item.isShowMessage=true;
                      item.isShowPwContent= true;
                      item.successTips="变更失败";
                      item.successStyle = "fail-style";
                      var msg = item.RETURN_MESSAGE;
                      if(msg){
                        var str = msg.split(":");
                        item.hxCountright = str[1];
                      }
                    }
                  }
                 }
            },
            failCallback: res => {
              console.log("errpage", res)
                if(res.msg){
                    console.log(22, Toast)
                    Toast({
                        message: res.msg,
                        duration: 3000
                    });
                }
            }
        });
    return
    this.successData = [
        {
            "policy_code": "151113178941008",
            "CHANGE_ID": 0,
            "CS_APPLY_NO": "0",
            "RETURN_MESSAGE": null,
            "RETURN_FLAG": "1"
        },
        {
            "policy_code": "151113178941008",
            "CHANGE_ID": 0,
            "CS_APPLY_NO": "0",
            "RETURN_MESSAGE": 'dasdasdaad',
            "RETURN_FLAG": "1"
        }
    ]
    
	},
	components: {
	 headerT,
	 alertContent,
     amountbtn
  },
}
</script>

<style lang="scss" scoped>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
    .success-header {
  background: #fff; }
  .success-header img {
    width: 100%;
    display: block; }

.success-list ul {
  background: #fff;
  font-size: 0.28rem;
  color: #999999;
  line-height: 0.4rem;
  margin-bottom: 0.16rem; }
  .success-list ul li {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0.3rem 0.23rem; }
    .success-list ul li p.title-p {
      color: #00ae4d; }
  .success-list ul .success-li-content .success-li-number {
    line-height: 0.8rem;
    background: #00addc;
    border-radius: 0.1rem;
    font-size: 0.28rem;
    font-family: SourceHanSansCN-Regular;
    color: white;
    padding: 0 0.3rem 0 0.19rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between; }
    .success-list ul .success-li-content .success-li-number div.toup-icon {
      width: 0.2rem; }
    .success-list ul .success-li-content .success-li-number .to-down-icon {
      transform: rotateZ(180deg); }
  .success-list ul .success-li-content .success-pw-countent {
    font-size: 0.26rem;
    font-family: SourceHanSansCN-Regular;
    color: #39393c;
    margin-top: 0.23rem;
    text-indent: 2em; }
.success-list ul.success-style li p:last-child span {
  color: #00ae4d;
  margin-left: 0.1rem; }
 .success-list li.fail-style p.title-p {
  color: red; }

.success-list-two ul {
  background: #fff;
  font-size: 0.28rem;
  color: #999999;
  line-height: 0.4rem;
  margin-bottom: 0.16rem; }
  .success-list-two ul li {
    display: block;
    padding: 0.2rem 0.3rem 0.23rem; }
    .success-list-two ul li p.title-p {
      color: #00ae4d; }
  .success-list-two ul .success-li-content .success-li-number {
    line-height: 0.8rem;
    background: #00addc;
    border-radius: 0.1rem;
    font-size: 0.28rem;
    font-family: SourceHanSansCN-Regular;
    color: white;
    padding: 0 0.3rem 0 0.19rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between; }
    .success-list-two ul .success-li-content .success-li-number div.toup-icon {
      width: 0.2rem; }
    .success-list-two ul .success-li-content .success-li-number .to-down-icon {
      transform: rotateZ(180deg); }
  .success-list-two ul .success-li-content .success-pw-countent {
    font-size: 0.26rem;
    font-family: SourceHanSansCN-Regular;
    color: #39393c;
    margin-top: 0.23rem;
    text-indent: 2em; }
.success-list-two ul.success-style li p:last-child span {
  color: #00ae4d;
  margin-left: 0.1rem; }
.success-list-two li.fail-style p.title-p {
  color: red; } 

.success-btn {
  padding: 0.4rem 0.3rem;
  font-size: 0; }
  .success-btn button {
    width: 6.9rem;
    height: 0.92rem;
    background: #00ae4d;
    border-radius: 0.1rem;
    font-size: 0.32rem;
    color: white; }
}

</style>
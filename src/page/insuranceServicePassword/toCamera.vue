<template>
	<div class="camera-box">
        <headerT :headerContent="headerContent"></headerT>
		<hgroup class="hp-hgroup">注意事项：</hgroup>
		<ul class="hp-ul">
			<li>1、因认证要求，请务必保证拍摄投保人本人正面头像并上传，如不符合将会影响本次操作结果。</li>
			<li>2、如果拍照过程中发生闪退情况，请先清理一下手机内存。</li>
		</ul>
		<div class="hp-tp">
			<div>
				<img :src="imgCameraSrc" width="100%" id="myImg">
			</div>
		</div>
		<footer class="hp-footer">
			<div>
				<p id="chooseImage" @click="clickChooseImage">拍照</p>
				<p id="uploadImage" @click="clickUploadImage">确认</p>
			</div>
		</footer>
		<sendAlrtContent v-show="getNote" ref="senAlertContent" :pnoneBack="pnoneBack" :codeData="codeData"  @clolseAlert="clolseAlert" @sendCodeFnTwo="sendCodeFnTwo" @sendCodeFn="sendCodeFn"></sendAlrtContent>
		<!-- <form action="uploadImageInsucode.html" method="get" id="subForm" style="display:none;">
			<input type="text" name="param" id="param">
			<input type="submit">
		</form> -->
	</div>
</template>


<script>
import headerT from '@/components/header.vue';
import sendAlrtContent from "../../components/sendAlrtContent";
import { mapActions } from "vuex";
import { Toast } from 'vant';
	export default {
		data() {
            return {
				headerContent: '新增保险服务密码',
				getNote:false,//是否显示验证码弹框
				imgCameraSrc: require('@/assets/mgImg/zhaopian.jpg'),
				alertCount:{
					isShowAlert:false,
					alertData:'请输入',
				},
				wxInformation: '',
				images: {
					localId: [],
					serverId: []
				},
				pnoneBack: '',//手机号
				codeData: '',//验证码
            }
        },
        components:{
			headerT,
			sendAlrtContent
		},
		mounted(){
			this.wxConifg({
				successCallback: (res) => {
					let wxInformation = res;
					//alert("signature:" + wxInformation.signature)
					wx.config({
						debug: false, 
						appId: wxInformation.appid, 
						timestamp: wxInformation.timestamp, 
						nonceStr: wxInformation.nonce_Str, 
						signature: wxInformation.signature,
						jsApiList: [
							'chooseImage',
							'uploadImage'
						] 
					});
				},
				failCallback:(res) =>{
					if(res.code == 2002){
                        this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
                    }else{
                        this.alertCount.isShowAlert = true;
                        this.alertCount.alertData = res.msg;
                    }
				}
			});
			
		},
        methods: {
			...mapActions({
				wxConifg: 'wxConifg',
				uploadImageInsucode: 'uploadImageInsucode',
				// selectPhoneInsucode: selectPhoneInsucode,
				getVerifyCodeInsucode: 'getVerifyCodeInsucode',
				validatephonecode: 'validatephonecode',
				modifyPhoneInsucode: 'modifyPhoneInsucode',
				redictNewUrl: 'redictNewUrl',
            }),
			clickChooseImage(){
				console.log("拍照")

				wx.ready(()=> {
					wx.chooseImage({
						count: 1, 
						sizeType: [ 'compressed'],
						sourceType: ['camera'], 
						success: (res)=> {
							this.images.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							this.imgCameraSrc = res.localIds;
						},
						fail: (res)=>{
							Toast("拍摄照片失败，请重新再试！");
						}
					});
				});
			},
			clickUploadImage(){
				alert("上传")
				//this.test();
				wx.ready(()=> {
					
					if(this.images.localId.length <= 0||this.images.localId.length>1){
						Toast("请选择一张照片");
						return false;
					}
					console.log("localId:"+this.images.localId);
					var i=0, len=this.images.localId.length;
					this.upload(i,len);
				});
			},
			//测试
			test(){
				let serverId = '1111';
				this.uploadImageInsucode({
					serverId,
					successCallback: (res) => {
						if(res.resultCode == '1'){//人脸校验成功
							//获取发送验证码的手机号
							this.pnoneBack = res.telephone;
							this.getNote= true;//显示验证码弹框
						}else{//错误提示页面
							this.$router.push({ path: '/msg'});
						}	
					},
					failCallback:(res) =>{
						if(res.code == 2002){
							this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
						}else{
							this.alertCount.isShowAlert = true;
							this.alertCount.alertData = res.msg;
						}
					}
				});
			},
			//测试
			upload(i,len){

				wx.uploadImage({
					localId: this.images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: (res)=> {
						i++;
						this.images.serverId.push(res.serverId);
						if(i<len){
							upload();
						}else{
							let sId=this.images.serverId.length-1;
							let serverId = this.images.serverId[sId];
							this.uploadImageInsucode({
								serverId,
								successCallback: (res) => {
									if(res.resultCode == '1'){//人脸校验成功
										//获取发送验证码的手机号
										this.pnoneBack = res.resultData;
										this.getNote= true;//显示验证码弹框
										
									}else{//错误提示页面
										this.$router.push({ path: '/msg'});
									}	
								},
								failCallback:(res) =>{
									if(res.code == 2002){
										this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
									}else{
										this.alertCount.isShowAlert = true;
										this.alertCount.alertData = res.msg;
									}
								}
							});
						}
					},
					fail: (res)=>{
						Toast("上传照片至腾讯服务器出现错误，烦请您重新点击拍照按钮上传照片，给您带来不便深感歉意，谢谢。")
					}
				});
			},
			clolseAlert(){
			// 子组件调用  返回上一页
				this.getNote= false
			},
			sendCodeFn(){
			// 子组件调用 发送验证码 
				this.getVerifyCodeInsucode({
					successCallback: (res) => {
						this.$refs.senAlertContent.inputCode(res)
					},
					failCallback:(res) =>{
						if(res.code == 2002){
							this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
						}else {
							//TOOD 红色字提示
							// this.alertCount.isShowAlert = true;
							// this.alertCount.alertData = res.msg;
							Toast(res.msg);
						}
					}
				});
			},
			sendCodeFnTwo(codeData){
			// 子组件调用 校验验证码
				let data = {
					verificationCode: codeData,
				}
				this.validatephonecode({
					data,
					successCallback: (res) => {
						if(res.resultCode == '1'){
							this.alertCount.isShowAlert = true;
							this.alertCount.alertData = res.resultMsg;
						}else if(res.resultCode == '2'){
							this.modifyPhoneInsucode({
								successCallback: (res) => {
									let url = '',flag=0;
									if(res.resultCode == '3'){
										this.$router.push({ path: '/msg'});
									}else if(res.resultCode == '2'){
										url = 'jumppage/insurecode/ bindbank';
										flag = 1;
									}else if(res.resultCode == '1'){
										url = 'jumppage/insurecode/addinsuredcodeiclower';
										flag = 1;
									}	
									if(flag == 1){
										//跳网厅账户绑定
										this.redictNewUrl({
											url,
											successCallback: (res) => {
												window.location.href = res;
											},
											failCallback:(res) =>{
												this.alertCount.isShowAlert = true;
												this.alertCount.alertData = res.msg;
											}
										});
									}
								},
								failCallback:(res) =>{
									if(res.code == 2002){
										this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
									}else{
										this.alertCount.isShowAlert = true;
										this.alertCount.alertData = res.msg;
									}
								}
							});

						}else if(res.resultCode == '3'){//在页面上进行错误提示
							//TODO
							
						}	
					},
					failCallback:(res) =>{
						if(res.code == 2002){
							this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
						}else{
							this.alertCount.isShowAlert = true;
							this.alertCount.alertData = res.msg;
						}
					}
				});

			},
		}
	}
</script>

<style lang="scss" scoped>
.camera-box{
	color: #666;
	font-size: 14px;
	line-height: 1.5;
	font-weight: 300;
    font-family: 'Microsoft Yahei';
	.hp-hgroup {
	    padding: 0.3rem 0.35rem 0.2rem;
	    font-size: 0.32rem;
	    font-weight: bold;
	}
	.hp-ul {
	    padding: 0 0.35rem;
	    line-height: 0.5rem;
	    text-align: justify;
	}
	.hp-tp {
	    padding-top: 0.5rem;
	    div{
			margin: 0 auto;
			width: 60%;
			border: 13px solid #d9dbdd;
			border-radius: 10px;
			img{vertical-align: middle;}
	    }
	}
	.hp-footer {
	    width: 100%;
	    height: 1.2rem;
	    div {
		    width: 100%;
		    line-height: 0.8rem;
		    height: 1.2rem;
		    display: flex;
		    position: fixed;
		    left: 0;
		    bottom: 0;
		    border-top: 1px solid #bfbfbe;
		    padding: 0.2rem 0;
		    box-sizing: border-box;
		    font-size: 0.32rem;
		    background: #fff;
		    p{
			    width: 50%;
			    text-align: center;
			    color: #20a239;
			    &:first-child { border-right: 1px solid #bfbfbe;}
			}
		}
	}
}
</style>
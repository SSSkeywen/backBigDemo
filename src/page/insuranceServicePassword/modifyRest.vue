<template>
	<div class="modifyRest-box">
        <div class="logo">
            <img :src="imgSrcLogo">
        </div>
        <p>保险服务密码修改与重置</p>
        <ul class="content">
            <li><span class="urlBtn" @click="toModigy">保险服务密码修改</span></li>
            <li><span class="urlBtn lastBtn" @click="toRest">保险服务密码重置</span></li>
        </ul>
	</div>
</template>


<script>
import { mapActions } from "vuex";
	export default {
		data() {
            return {
                imgSrcLogo: require('@/assets/images/logo.png')
            }
        },
        components:{
        },
        methods: {
            ...mapActions({
               getPasswordModify : 'getPasswordModify',
               getPasswordRest : 'getPasswordRest'
            }),
            toModigy(){
                this.getPasswordModify({
                    successCallback: res => {
                        window.location.href=res.data;
                    },
                    fCallback: res => {}
                })
            },
            toRest(){
                this.getPasswordRest({
                    successCallback: res => {
                        window.location.href=res.data;
                    },
                    fCallback: res => {}
                })
            }
		}
	}
</script>

<style lang="scss" scoped>
.modifyRest-box{
    padding-top: 15%;
    min-height: 100vh;
    box-sizing: border-box;
    background: #fff;
    font-size: 14px;
    line-height: 1.5;
    font-family: 'Microsoft Yahei';
    .logo{
        width: 50%;
        margin: 0 auto;
        img{
            width: 100%;
            margin: 30% auto 0;
            vertical-align: middle;
        }
    }
    p {
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin-top: 10%;
    }
    .content {
        width: 100%;
        li{
            margin-top: 5%;
            .urlBtn{
                display: block;
                width: 70%;
                margin: 0 auto;
                border: none;
                border-radius: 5px;
                line-height: 40px;
                background-color: #0069b2;
                color: #fff;
                font-size: 16px;
                text-align: center;
                &.lastBtn{
                    background-color: #0aa548; 
                }
            }
        }
        
    }
}
</style>
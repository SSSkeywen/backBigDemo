<template>
    <div class="open-box">
        <headerT :headerContent="headerContent"></headerT>
        <div class="alert-box">
            <div class="alert-content">
                <div class="alert-img">
                    <img :src="tipsImgSrc" alt="">
                </div>
                <p class="alert-font">{{alertCount.alertData}}</p>
                <div class="alert-btn">
                    <button class="style-click" @click="toNext">知道了</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerT from '@/components/header.vue'
// import alertContent from "@/components/alertContent";
import { mapActions } from "vuex";
    export default {
        data() {
            return {
                headerContent: '新增保险服务密码',
                tipsImgSrc: require('@/assets/publicImg/icon_3.jpg'),
                alertCount:{
                    isShowAlert:true,
                    alertData:'请输入',
                },
            }
        },
        components:{
            headerT
        },
        created(){
            this.getmsg({
                successCallback: (res) => {
                    this.alertCount.isShowAlert = true;
                    this.alertCount.alertData = res;
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
        methods:{
            ...mapActions({
                getmsg: 'getmsg',
            }),
            toNext(){
                this.$router.push({ path: '/businessHanding'});
            }   
        }
    }
</script>

<style lang="scss" scoped>
.alert-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  .alert-content {
    background-color: #fff;
    width: 90%;
    border-radius: 7px;
    overflow: hidden;
    font-size: 0.32rem;
    .alert-img{
        width: 1.2rem;
        margin: 0 auto;
        padding-top: 0.3rem;
        img{
            width: 100%;
        }
    }
    .alert-font{
        padding: 0.5rem 0.2rem;
        text-align: center;
    }
    .alert-btn {
      button {
        width: 100%;
        line-height: 0.8rem;
        background: #0ab308;
        color: #fff;
      }
    }
  }
}
</style>
<template>
<!-- 批文信息 -->
<div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <section v-if="approvalMsg == null" class="mp-box-one">尊敬的用户，你请求的批文不存在。</section>
    <section v-if="approvalMsg != null" class="mp-box-one"> {{ approvalMsg }} </section>  
    <a class="btn-back" href="javascript:history.back()">返回</a>
    <alertContent :alertCount="alertCount"></alertContent>
</div>
</template>

<script>
import headerT from '../../components/header.vue'
import alertContent from "../../components/alertContent";
import { mapActions } from "vuex";
export default {
    components:{
        headerT,
        alertContent,
	},
	data() {
	    return {
            headerContent: '批文信息',
            approvalMsg: {
                // noticeCode: '',
                // approval: '',  
            },
            alertCount:{
                isShowAlert:false,
                alertData:'请输入',
            },
        }
	},
    created(){
        let noticeCode = this.$route.query.noticeCode;
        //policyCodeData.append("policyCode", this.$route.query.policyCode);
        this.getChangeListApprovalMsg({
            noticeCode,
            successCallback: (res) => {
                console.info("result:"+res)
                this.approvalMsg = res
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
        ...mapActions({
            getChangeListApprovalMsg: "getChangeListApprovalMsg"
        })
	}
}
</script>

<style lang="scss" scoped>
.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;
}
.mp-box-one{
    width: 95%;
    background-color: #fff;
    margin: 10px auto;
    padding: 0.2rem 0.3rem 0.4rem;
    border-radius: 10px;
    box-sizing: border-box;
    line-height: 16px;
    text-align: center;
}  
.btn-back{
    display: block;
    width: 50%;
    height: 30px;
    margin: 0.2rem auto;
    border-radius: 6px;
    background-color: #00ae4d;
    color: #fff;
    line-height: 30px;
    text-align: center;
}  
</style>
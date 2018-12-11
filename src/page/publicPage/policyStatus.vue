<template>
<div class="mg-box">
	<div class="policyStatus-box">
        <div v-for="(item, index) in resdata" :key="index">
            <div class="statusIcon" >
                    <img v-if="item.RETURN_FLAG == 0" src="@/assets/publicImg/icon_2.jpg" class="successiCon topicon"/>
                    <img v-if="item.RETURN_FLAG == 1" src="@/assets/publicImg/icon_3.jpg" class="falseiCon topicon"/>
            </div>
            <p class="firstText"><span v-if="item.codeItem">保单号：{{item.codeItem}}变更</span><span v-if="item.RETURN_FLAG == 0">成功</span><span  v-if="item.RETURN_FLAG == 1">失败</span></p>
            <p class="firstText secondText" v-if="item.RETURN_MESSAGE">批文信息：{{item.RETURN_MESSAGE}}</p>
       </div>
	</div>
    <div>
        <publicButton :btnText="btnTexts" @btnControls="surenBtn" style="margin: 0.73rem auto;background: #04be01;"></publicButton>
    </div>
</div>

</template>
<script>
import alertContent from "@/components/alertContent.vue";
import headerT from "@/components/header.vue";
// import list from "@/components/annuityCollect/annuityCollectListTable.vue";
import publicButton from '@/components/publicButton.vue'
import { mapActions } from "vuex";
export default {
	data(){
		return{
            resdata: [],
            result:{},
			btnTexts: '关闭'
		}
	},
	methods: {
        ...mapActions({
            arfandyearchangeStatus: "arfandyearchangeStatus"
        }),
		surenBtn(){
			this.$router.push({path:"/businessHanding"})
		}
	},
	mounted() {

        let editdata = JSON.parse(this.$route.query.needParams)
        this.arfandyearchangeStatus({
            editdata,
            successCallback: res => {
                this.resdata = res.resultItem.map((item, index) => {
                    let obj = {
                        "CHANGE_ID": item.CHANGE_ID,   
                        "CS_APPLY_NO": item.CS_APPLY_NO,
                        "RETURN_MESSAGE": item.RETURN_MESSAGE,
                        "RETURN_FLAG": item.RETURN_FLAG,
                        "codeItem": res.codeItem[index]
                    }
                    return obj
                })
               
            },
            fCallback: res => {}
        });
      
	},
	components: {
	 headerT,
	 alertContent,
	 publicButton
  },
}
</script>

<style lang="scss" scoped>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
}
.policyStatus-box{
    .topicon{
        text-align: center;
        margin: 0 auto;
        padding-top: 0.82rem;
    }
    .successiCon{
        width: 2.28rem;
        height: 2.28rem;
    }
    .falseiCon{
        width: 2.07rem;
        height: 2.34rem;
    }
    .firstText{
        color: #020202;
        font-size: 0.36rem;
        margin: 0 auto;
        text-align: center;
        padding: 0.65rem 0 0.55rem 0;
    }
    .secondText{
        color: #686868;
        font-size: 0.156rem;
        padding: 0;
    }
    
}
</style>
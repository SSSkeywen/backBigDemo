<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <ul v-if="caseMstList">
            <li v-for="(item,index) in caseMstList" :key="index">
              <caseMsg v-if="item.caseStatus!='强撤'&&item.caseStatus!='撤消'&&item.caseStatus!='不予受理撤件'&&item.caseStatus!='不予立案'" :caseMstList="item"></caseMsg>  
            </li>
            <!-- #if($rtHtml.caseStatus !="强撤"  && $rtHtml.caseStatus !="撤消" && $rtHtml.caseStatus !="不予受理撤件" && $rtHtml.caseStatus !="不予立案") -->
        </ul>
        <p class="casemx-p">{{selectResult}}</p>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import caseMsg from '../../components/claimsComponent/caseMsg.vue'
import { mapActions } from "vuex";
import { Toast } from "vant";
    export default {
        components:{
            headerT,
            caseMsg
        },
        data() {
            return {
                headerContent: '案件进度',
                caseMstList:[],
                selectResult:''
            }
        },
        created(){
            const toast1 = Toast.loading({
                mask: true,
                message: "加载中...",
                duration: 1000
            });
            this.lawCaseListFn({
                successCallback: (result) => {
                    console.log(result)
                    this.caseMstList = result.data
                    this.selectResult = result.msg
                    toast1.clear();
                },
                fCallback:(res) => {
                    toast1.clear();
                }
            })
        },
        methods: {
            ...mapActions({
                lawCaseListFn: "lawCaseListFn"
            }),
        },
    }
</script>

<style lang="scss" scoped>
.casemx-box{
    min-height: 100vh;
    background: #DCDCDC;
}
.casemx-p{
    padding: 0.2rem;
}
</style>
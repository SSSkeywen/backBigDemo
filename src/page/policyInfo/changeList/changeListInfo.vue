<template>
    <div class="mg-box">
        <headerT :headerContent="headerContent"></headerT>
        <ul>
            <li v-for="(item,index) in changeListInfoData" :key="index">
                <changeListInfoList :changeListInfoData="item"></changeListInfoList>
            </li>
        </ul>
    </div>
</template>

<script>
import headerT from '../../../components/header.vue'
import changeListInfoList from '../../../components/liufeitao/changeListInfoList.vue'
import { mapActions } from "vuex";
export default {
    components:{
        headerT,
        changeListInfoList
    },
    data() {
        return {
            headerContent: '保全变更记录',
            changeListInfoData:[
                {
                    serviceName:'',
                    changeStatus:'',
                    noticeCode:'',
                    handlerName:'',
                    proposeTime:'',
                    validateDate:'',
                    approval:'',
                    noticeCode:''
                }
            ]
        }
    },
    created(){
        let policyCodeData = new FormData();
        policyCodeData.append("policyCode", this.$route.query.policyCode);
        this.getChangeListInfo({
            policyCodeData,
            successCallback: (res) => {
                console.info("result:"+res.result)
                this.changeListInfoData = res.result
            },
            fCallback:(res) => {
            }
        })
    },
    methods: {
        ...mapActions({
            getChangeListInfo: "getChangeListInfo"
        }),
        seek(approval,noticeCode){
            this.$router.push({ path: '/approvalMsg',query: {approval: approval,noticeCode:noticeCode} });
        }
    }
}
</script>

<style lang="scss" scoped>
.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;
}
.mp-hgroup{
    width: 95%;
    line-height: 0.8rem;
    color: #fff;
    background: url('../../../assets/mgImg/xq_header_bg.png') no-repeat;
    margin: 0 auto;
    margin-top: 2%;
    background-size: 100% 100%;
    padding: 0 0 0 0.3rem;
    box-sizing: border-box;
}

/* 动画效果css */
.ani-down{
    transition: all .2s;
}
.add-ani-style{
    transform: rotateZ(180deg);
}
</style>
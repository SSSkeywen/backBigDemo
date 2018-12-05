<template>
    <div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <section class="mg-content-list">
        <ul>
            <li v-for="(item,index) in changeListData" :key="index" @click="changeMessage(item.policyCode)">
                <mincontentList :changeListData="item"></mincontentList>
            </li>
            <p v-if="changeListData == null">
                未查找到符合条件的数据！
            </p>
        </ul>
    </section>
    <alertContent :alertCount="alertCount"></alertContent>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import mincontentList from '../../components/policyInfoComponent/minContentList.vue'
import alertContent from "../../components/alertContent";
import { mapActions } from "vuex";
export default {
    components: {
        headerT,
        mincontentList,
        alertContent,
    },
    data() {
        return {
            headerContent: '保全变更记录',
            changeListData:[
                // {
                //     policyCode:'',
                //     productAbbr:'',
                //     applicantName:'',
                //     insuredName:'',
                //     validateDate:null,
                //     agentCode:'',
                //     liabilityState:''
                // }
            ],
            alertCount:{
                isShowAlert:false,
                alertData:'请输入',
            },
        }
    },
    created(){
        this.getChangeList({
            successCallback: (res) => {
                console.info("result:"+res)
                for(let item of res){
                    if(item.liabilityState == '有效'){
                        item.statusStyle = 'green'
                    } 
                    if(item.liabilityState == '停效'){
                        item.statusStyle = 'red'
                    } 
                    if(item.liabilityState == '终止'){
                        item.statusStyle = 'grey'
                    } 
                }
                this.changeListData = res
            },
            failCallback:(res) => {
                this.alertCount.isShowAlert = true;
                this.alertCount.alertData = res;
            }
        })
    },  
    methods: {
        ...mapActions({
            getChangeList: "getChangeList"
        }),
        changeMessage(policyCode) {
            this.$router.push({ path: '/changeListInfo',query: {policyCode: policyCode} });
        }
    }   
}
</script>

<style lang="scss" scoped>
.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;
    
}
.mg-select{
    width: 90%;
    margin: 10px auto;
    border-radius: 7px;
    background-color: #fbfbfb;
    height: 30px;
    select{
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 7px;
        background-color: #fff;
    }
}
.mg-content-list{
    width: 90%;
    margin: 0.2rem auto 0;
    ul{
        li{
            border-radius: 10px;
            background-color: #fff;
            margin-bottom: 0.24rem;
            overflow: hidden;
        }
    }
}
</style>


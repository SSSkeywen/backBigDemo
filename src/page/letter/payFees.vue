<template>
    <div class="mg-box">
        <headerT :headerContent="headerContent"></headerT>
        <div class="contenr" v-if="this.ajaxData!=''">
            <div class="list-box" v-for="(item,index) in ajaxData" :key="index">
                <letterInfo :item="item"></letterInfo>
            </div>
        </div>
        <noResult v-else></noResult>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import letterInfo from '../../components/letterComponent/letterInfo.vue'
import noResult from '../../components/letterComponent/noResult.vue'
import { mapActions } from "vuex";
export default {
    components: {
        headerT,
        letterInfo,
        noResult
    },
    data() {
        return {
            headerContent: '缴费提醒查询',
            ajaxData:[
            {
                policyCode:'001',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰1',
                validateDate:null,
                statusName:'有效',
                dividendTime:'2001-01-01',
                dividendNum:'1000元',
                postCode:'',
                postWay:'自助查询',
                payDate:'2016-01-12',
                beginDate:'',
                endDate:'',
                activeDate:'2001-01-01'
             },{
                policyCode:'002222222',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰1',
                validateDate:null,
                statusName:'有效',
                dividendTime:'2001-01-01',
                dividendNum:'1000元',
                postCode:'',
                postWay:'自助查询',
                payDate:'2016-01-12',
                beginDate:'',
                endDate:'',
                activeDate:'2001-01-01'

             }
             ]
            
        }
    },
    // created(){
    //     this.getLates({
    //         successCallback: (res) => {
    //             for(let item of res.result){
    //                 if(item.statusName == '有效'){
    //                     item.statusStyle = 'green'
    //                 } 
    //                 if(item.statusName == '停效'){
    //                     item.statusStyle = 'red'
    //                 } 
    //             }
    //             this.ajaxData = res.result
    //         },
    //         fCallback:(res) => {
    //         }
    //     })
    // },
    
    methods: {
        ...mapActions({
            getLates: "getLates"
        }),
        nextFloor(policyCode) {
            this.$router.push({ path: '/'});
        }
    }   
}
</script>

<style>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
}
</style>


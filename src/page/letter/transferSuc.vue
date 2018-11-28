<template>
    <div class="mg-box">
        <headerT :headerContent="headerContent"></headerT>
        <div class="contenr">
            <div class="list-box" v-for="(item,index) in ajaxData" :key="index">
                <letterInfo :item="item"></letterInfo>
            </div>   
        </div>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import letterInfo from '../../components/letterComponent/letterInfo.vue'
import { mapActions } from "vuex";
export default {
    components: {
        headerT,
        letterInfo
    },
    data() {
        return {
            headerContent: '转账成功通知书查询',
            ajaxData:[{
                policyCode:'001',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰1',
                validateDate:null,
                statusName:'有效',
                dividendTime:'2001-01-01',
                dividendNum:'1000元',
                // postCode:'200000',
                postWay:'自助查询',
                dieDate:'200年11月11日',
                beginDate:'',
                endDate:'',
                selectList:[
                    {
                        value:'0',
                        content:'第1期'
                    },{
                        value:'1',
                        content:'第2期'
                    },{
                        value:'2',
                        content:'第3期'
                    },{
                        value:'3',
                        content:'第4期'
                    },{
                        value:'4',
                        content:'第5期'
                    }
                ]
             },
             {
                policyCode:'00222222',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰1',
                validateDate:null,
                statusName:'有效',
                dividendTime:'2001-01-01',
                dividendNum:'1000元',
                // postCode:'200000',
                postWay:'自助查询',
                dieDate:'200年11月11日',
                beginDate:'',
                endDate:'',
                selectList:[
                    {
                        value:'0',
                        content:'第1期'
                    },{
                        value:'1',
                        content:'第2期'
                    },{
                        value:'2',
                        content:'第3期'
                    },{
                        value:'3',
                        content:'第4期'
                    },{
                        value:'4',
                        content:'第5期'
                    }
                ]
             }]
            
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


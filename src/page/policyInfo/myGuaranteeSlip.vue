<template>
    <div class="mg-box">
        <headerT :headerContent="headerContent"></headerT>
        <div class="mg-select">
            <select name="" id="" v-model="selectData" @change="selectPolicy()">
                <option v-for="(item,index) in selectList"  :key="index" :value="item.value" v-html="item.content"></option>
            </select>
        </div>
        <section class="mg-content-list">
            <ul>
                <li v-for="(item,index) in contentListData" :key="index" @click="policyMessage(item.policyCode)">
                    <contentList :contentListData="item"></contentList>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import contentList from '../../components/mgContentList.vue'
import { mapActions } from "vuex";
    export default {
        components:{
            headerT,
            contentList
        },
        data() {
            return {
                selectData:'0',
                headerContent: '我的保单',
                selectList:[
                    {
                        value:'0',
                        content:'&nbsp;全部'
                    },{
                        value:'1',
                        content:'我是投保人'
                    },{
                        value:'2',
                        content:'我是被保人'
                    },{
                        value:'3',
                        content:'有效保单'
                    },{
                        value:'4',
                        content:'失效保单'
                    }
                ],
                contentListData:[
                    {
                        policyCode:'003152059157008',
                        productName:'太平爱宝贝综合意外伤害保险',
                        applicantName:'范聪杰',
                        insuredName:'范聪杰',
                        validateDate:null,
                        statusName:'有效',
                    }
                ]
            }
        },
        created(){
            this.getLates({
                successCallback: (res) => {
                    
                    for(let item of res.result){
                        if(item.statusName == '有效'){
                            item.statusStyle = 'green'
                        } 
                        if(item.statusName == '终止'){
                            item.statusStyle = 'red'
                        } 
                    }
                    this.contentListData = res.result
                },
                fCallback:(res) => {
                }
            })
        },
        
        methods: {
            ...mapActions({
                getLates: "getLates"
            }),
            policyMessage(policyCode) {
                this.$router.push({ path: '/mgPlicyInfo' });
            },

            //select选择框方法
            selectPolicy(ele){
                console.log(this.selectData)
                if(this.selectData == 0){
                    this.contentListData = []
                }
                //console.log(ele.target.value)
            }
        },
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
    margin: 0 auto;
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
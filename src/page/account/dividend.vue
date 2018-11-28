<template>
    <div class="mg-box">
    <headerT :headerContent="headerContent">sss</headerT>
    <section class="mg-content-list">
        <ul>
            <li v-for="(item,index) in dividendData" :key="index" @click="changeMessage(item.policyCode)">
                <mincontentList :changeListData="item"></mincontentList>
            </li>
        </ul>
    </section>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import mincontentList from '../../components/liufeitao/minContentList.vue'
import { mapActions } from "vuex";
export default {
    components: {
        headerT,
        mincontentList
    },
    data() {
        return {
            headerContent: '分红账户',
            dividendData:[
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
                    if(item.statusName == '停效'){
                        item.statusStyle = 'red'
                    } 
                }
                this.dividendData = res.result
            },
            fCallback:(res) => {
            }
        })
    },
    
    methods: {
        ...mapActions({
            getLates: "getLates"
        }),
        changeMessage(policyCode) {
            this.$router.push({ path: '/' });
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


<template>
    <div class="mg-box">
        <headerT :headerContent="headerContent"></headerT>
        <section v-if="unitLinkedData.length!=0" class="mg-content-list">
            <ul>
                <li v-for="(item,index) in unitLinkedData" :key="index" @click="lookMsg(index)">
                    <mincontentList :changeListData="item"></mincontentList>
                    <!-- <span>{{item.validateDate | dateFilter}}</span> -->
                </li>
            </ul>
        </section>
        <nothing v-else :tipsContent="tipsContent"></nothing>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import mincontentList from '../../components/policyInfoComponent/minContentList.vue'
import nothing from '../../components/nothing.vue'
import { mapActions } from "vuex";
import {dateStyle} from '@/filter/dateStyle.js';
export default {
    components: {
        headerT,
        mincontentList,
        nothing
    },
    data() {
        return {
            headerContent: '投连账户',
            tipsContent:'未查询到符合条件的数据！',
            unitLinkedData:[]
            
        }
    },
    filters: {
        dateFilter(date){
            return dateStyle(date)
        }
    },
    created(){
        this.getUnitLinked({
            successCallback: (res) => {
                for(let item of res.data){
                    if(item.liabilityState == '有效'){
                        item.statusStyle = 'green'
                    } 
                    if(item.liabilityState == '终止'){
                        item.statusStyle = 'red'
                    } 
                }
                this.unitLinkedData = res.data;
            },
            fCallback:(res) => {
                if(res.code==2002){
                    this.$router.push({  
                        path: '/userInfo',
                        query:{pathAddress: '/unitLinked'} 
                    });
                }
            }
        })
    },
    methods: {
        ...mapActions({
            getUnitLinked: "getUnitLinked"
        }),
        lookMsg(index) {
            this.$router.push({ 
                path: '/unitLinkedInfo',
                query: {
                    index:index
                } 
            });
            
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


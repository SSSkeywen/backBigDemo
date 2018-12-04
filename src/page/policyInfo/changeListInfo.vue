<template>
    <div class="mg-box">
        <headerT :headerContent="headerContent"></headerT>
        <ul>
            <li v-for="(item,index) in changeListInfoData" :key="index">
                <section class="mp-box-one">
                    <ul class="mp-list">
                        <li class="mp-list-li line-down">
                            <p>保全项目：</p>
                            <p v-text="item.serviceName"></p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>保全操作状态：</p>
                            <p v-text="item.changeStatus"></p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>保全批单号：</p>
                            <p v-text="item.noticeCode"></p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>申请人名称：</p>
                            <p v-text="item.handlerName"></p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>保全申请时间：</p>
                            <p>{{item.proposeTime | dateFilter}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>保全生效时间：</p>
                            <p>{{item.validateDate | dateFilter}}</p>
                        </li>
                        <li class="mp-list-li line-down">
                            <p>批文信息：</p>
                            <p class="green"  @click="seek(item.noticeCode)">点击查看</p>
                        </li>
                    </ul>
                </section>
            </li>
            <li v-if="changeListInfoData == ''">
                未查找到符合条件的数据！
            </li>
        </ul>
        <alertContent :alertCount="alertCount"></alertContent>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import alertContent from "../../components/alertContent";
import {dateStyle} from '@/filter/dateStyle.js'
import { mapActions } from "vuex";
export default {
    filters: {
        dateFilter(date){
            return dateStyle(date)
        }
    },
    components:{
        headerT,
        alertContent,
    },
    data() {
        return {
            headerContent: '保全变更记录',
            changeListInfoData:[
                // {
                //     serviceName:'',
                //     changeStatus:'',
                //     noticeCode:'',
                //     handlerName:'',
                //     proposeTime:'',
                //     validateDate:'',
                //     approval:'',
                //     noticeCode:''
                // }
            ],
            alertCount:{
                isShowAlert:false,
                alertData:'请输入',
            },
        }
    },
    created(){
        let policyCode = this.$route.query.policyCode;
        // policyCodeData.append("policyCode", this.$route.query.policyCode);
        this.getChangeListInfo({
            policyCode,
            successCallback: (res) => {
                // console.info("result:"+JSON.stringify(res))
                this.changeListInfoData = res
            },
            failCallback:(res) => {
                this.alertCount.isShowAlert = true;
                this.alertCount.alertData = res;
            }
        })
    },
    methods: {
        ...mapActions({
            getChangeListInfo: "getChangeListInfo"
        }),
        seek(noticeCode){
            //this.$router.push({ path: '/approvalMsg',query: {approval: approval,noticeCode:noticeCode} });
            this.$router.push({ path: '/changeListApproval', query: {noticeCode:noticeCode} });
        },
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
    background: url('../../assets/mgImg/xq_header_bg.png') no-repeat;
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
/* 动画效果css */
.mp-box-one{
    width: 95%;
    background-color: #fff;
    margin: 10px auto;
    padding: 0 0.3rem 0.2rem;
    border-radius: 10px;
    box-sizing: border-box;
    .mp-min-title{
        display: flex;
        justify-content: space-between;
        line-height: 0.8rem;
        .mp-min-left{
            display: flex;
            font-weight: 600;
            .mp-min-left-img{
                width: 0.3rem;
                padding-top: 0.17rem;
                margin-right: 0.2rem;
                img{
                    width: 100%;
                    display: block;
                }
            }
        }
        .mp-min-right{
            width: 0.44rem;
            padding-top: 0.22rem;
            img{
                width: 100%;
            }
        }
    }
    .mp-list{
        .mp-list-li{
            display: flex;
            justify-content: space-between;
            line-height: 0.52rem;
        }
        .mp-list-li:last-child{
            padding-bottom: 0.1rem;
        }
    }
    
}
// liuft
.line-down:before{
        display: none;
    }
.green{
    color: #00ae4d;
}
.red{
   color: #898b8b; 
}
</style>
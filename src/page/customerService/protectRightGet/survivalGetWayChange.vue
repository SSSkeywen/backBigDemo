<template>
<div class="normal-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="survival-change-box" v-if="dataList.length>0&&dataList!=null&&dataList!=''">
        <div class="list-box" v-for="(item,index) in dataList" :key="index">
            <div class="sq_xz">
                <span>保单号：</span>
                <i>{{item.policyCode}}</i>
                <i class="_select" @click="checkOne(item.policyCode)">
                    <input type="checkbox" name="checkbox" :checked="selectCode.indexOf(item.policyCode)>=0">
                </i>
            </div>
            <ul class="list-con">
                <li>
                    <span>现生存金授权给付方式：</span>
                    <span>{{item.authName}}</span>
                </li>
                <li>
                    <span>使用生存金抵缴贷款：</span>
                    <span>{{item.payloanpermitName}}</span>
                <li>
                    <span>授权账号：</span>
                    <span>{{item.bankAccount}}</span>
                </li>
                <li>
                    <span>账号所属银行：</span>
                    <span>{{item.bankName}}</span>
                </li>
                <li>
                    <span>账号所有人：</span>
                    <span>{{item.assigneeName}}</span>
                </li>
            </ul> 
        </div>
        <div class="survival-tishi">
            <p>温馨提示：</p>
            <h6>1、微信生存金领取方式变更仅支持授权、被保人为同一人、投被保人非同一人且被保人是投保人未成年人子女的保单生存金领取方式变更；</h6>
        </div>
        <section class="yy_cx">
            <button @click="confirms">确认</button>
        </section>
    </div>
    <div v-else>错误信息</div>
    <alertContent :alertCount="alertCount"></alertContent>
</div>
</template>

<script>
import headerT from '@/components/header.vue'
import alertContent from '@/components/alertContent.vue'
import { mapActions } from "vuex";
import {Toast } from 'vant';
export default {
    data() {
        return {
            headerContent: '生存金领取方式变更',
            alertCount:{
              isShowAlert:false,
              alertData:'请输入',
            },
            // 选择的保单号集合
            selectCode:[],
            dataList:[]
        }
    },
    components:{
        headerT,
        alertContent
    },
    created(){
        
        this.getSurvivalGetWayChangeList({
            successCallback: (res) => {
                for(let item of res){
                    if(item.payloanpermit=='Y'){
                        item.payloanpermitName = '是'
                    }else{
                        item.payloanpermitName = '否'
                    }
                }
                this.dataList = res;
            },
            failCallback:(res) => {
                if(res.code == 2002){
                    this.$router.push({ path: '/userInfo',query: {pathAddress: '/survivalGetWayChange'} });
                }else{
                    this.alertCount.isShowAlert = true;
                    this.alertCount.alertData = res.msg;
                }
            }
        })
    },
    methods:{
         ...mapActions({
            getSurvivalGetWayChangeList:'getSurvivalGetWayChangeList',
            getSurvivalGetWayChangechecked:'getSurvivalGetWayChangechecked',
        }),
        checkOne(code){
            var codeIndex = this.selectCode.indexOf(code);
            if(codeIndex>=0){
              //如果包含了该code，则删除（单选按钮由选中变为非选中状态）
              this.selectCode.splice(codeIndex,1);
            }else{ //选中该按钮
              this.selectCode.push(code);
            }
        },
        confirms(){
            console.log(this.selectCode);
            if (this.selectCode.length>0) {
                let policyCodeStr = '';
                for(let item of this.selectCode) {
                    if(''==policyCodeStr){
                        policyCodeStr += item;
                    }else{
                        policyCodeStr = policyCodeStr+','+item;
                    }
                }
                this.getSurvivalGetWayChangechecked({
                    policyCodeStr,
                    successCallback: (res) => {
                        if(res.code == '0'){
                            this.$router.push({ 
                                path: '/survivalGetWayChangeInfo',
                                query:{policyCodeStr: policyCodeStr}
                            });
                        }else{
                            this.alertCount.isShowAlert = true;
                            this.alertCount.alertData = res.msg;
                        }
                    },
                    failCallback:(res) => {
                        if(res.code == 2002){
                            this.$router.push({ path: '/userInfo',query: {pathAddress: '/survivalGetWayChangeInfo'} });
                        }else{
                            this.alertCount.isShowAlert = true;
                            this.alertCount.alertData = res.msg;
                        }
                    }
                })
                
            }else{
                this.alertCount.isShowAlert=true;   
                this.alertCount.alertData='请选择你要变更的保单！';   
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.normal-box{
    min-height:100vh;
    background-color: #EFEFF4;
    line-height: 1.5;
    .survival-tishi{
        box-sizing: border-box;
        width: 100%;
        margin: 0 auto;
        color: #f00;
        background: #fff;
        border-radius: 6px;
        font-size: 12px;
        padding: 8px;
        margin-top:10px;
        p,h6{font-size: 14px;}
    }
    .survival-change-box{
        box-sizing: border-box;
        padding-left: 2.5%;
        padding-right: 2.5%;
        .list-box{
            margin-top: 10px;
            margin-bottom: 10px;
            border: 1px solid #DCDCDC;
            .sq_xz{  
                position: relative;
                width: 95%;
                padding-left: 2%;
                padding-right: 3%;
                background: #00ae4d;
                border-radius: 7px 7px 0 0;
                color: #fff;
                line-height: 26px;
                ._select{
                    position: absolute;
                    top: 4px;
                    right: 3%;
                    input{
                        appearance: checkbox;
                        outline: 0;
                        border: 0;
                        width: 20px;
                        height: 20px;
                        color: #000;
                    }
                }
            }
            .list-con{
                width: 94%;
                padding-left: 3%;
                padding-right: 3%;
                padding-top: 5px;
                padding-bottom: 10px;
                background-color: #fff; 
                li{
                    // display: flex;
                    width: 100%;
                    line-height: 20px;
                    margin-bottom: 5px;
                    // .sq_mc1 {width: 40%;}
                    .sq_nr {
                        // width: 60%;
                        font-size: 14px;
                        text-align: right;
                    }
                    &:last-child{border: 0;}
                }
            }
        }
        .yy_cx{
            margin: 5px auto;
            text-align: center;
            height: 35px;
            line-height: 35px;
            padding: 10px 0px;
            button{
                height: 35px;
                line-height: 35px;
                width: 50%;
                border: none;
                background: #00AE4F;
                border-radius: 7px;
                color: #fff;
                font-size: 14px;
            }
        }
    }  
}  
</style>
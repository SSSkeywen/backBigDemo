<template>
<div class="normal-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="bonus-change-box" v-if="dataList.length>0&&dataList!=null&&dataList!=''">
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
                    <span>目前红利授权给付方式：</span>
                    <span>{{item.authName}}</span>
                </li>
                <li>
                    <span>现金红利金额（元）：</span>
                    <span>{{item.cashBonus}}</span>
                </li>
                <div v-if="item.authDraw!=2">
                    <li>
                        <span>授权账号：</span>
                        <span>{{account.accCode}}</span>
                    </li>
                    <li>
                        <span>账号所属银行：</span>
                        <span>{{account.bankName}}</span>
                    </li>
                    <li>
                        <span>账户所有人：</span>
                        <span>{{account.accName}}</span>
                    </li>
                </div>
                <div v-else>
                    <li>
                        <span>授权账号：</span>
                        <span></span>
                    </li>
                    <li>
                        <span>账号所属银行：</span>
                        <span></span>
                    </li>
                    <li>
                        <span>账户所有人：</span>
                        <span></span>
                    </li>
                </div>
                
            </ul> 
        </div>
        <section class="yy_cx">
            <button @click="confirms">确认</button>
        </section>
    </div>
    <div v-else>没有符合红利领取方式变更的保单</div>
    <alertContent :alertCount="alertCount"></alertContent>
</div>
</template>

<script>
import headerT from '@/components/header.vue'
import alertContent from '@/components/alertContent.vue'
import { mapActions } from "vuex";
export default {
    data() {
        return {
            headerContent: '红利领取方式变更',
            alertCount:{
              isShowAlert:false,
              alertData:'请输入',
            },
            selectCode:[],// 选择的保单号集合
            dataList:[],
            account:{},//银行信息
        }
    },
    components:{
        headerT,
        alertContent
    },
    created(){
        this.getBonusGetWayChangeList({
            successCallback: (res) => {
                this.dataList = res.atli;
                this.account = res.account;
            },
            failCallback:(res) => {
                if(res.code == 2002){
                    this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
                }else{
                    this.alertCount.isShowAlert = true;
                    this.alertCount.alertData = res.msg;
                }
            }
        })
    },
    methods:{
        ...mapActions({
            getBonusGetWayChangeList:'getBonusGetWayChangeList',
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
            // 传递保单号
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
                this.$router.push({ 
                    path: '/bonusGetWayChangeInfo',
                    query:{
                        policyCodeStr: policyCodeStr
                    }
                });
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
    .bonus-change-box{
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
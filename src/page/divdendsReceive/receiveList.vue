<template>
<div class="normal-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="pay-box" v-if="dataList.length>0&&dataList!=null&&dataList!=''">
        <div class="list-box"  v-for="(item,index) in LIST" 
                        :value="index">
            <div class="sq_xz">
                <span>保单号：</span>
                <i>{{LIST[0]}}</i>
                <i class="_select btn_checkbox"   @click="checkOne($event,LIST[0])">
                    <input  class="check_input" :value="index" type="checkbox" name="checkbox" :checked="selectCode.indexOf(LIST[index])>=0">
                </i>
                
            </div>
            <div class="policyholder_box">
                <ul class="list-con"  
                v-for="(item,index) in PRODUCT_LIST" 
                :value="index">
                    <li>
                        <div class="sq_mc1"><span>险种序列号:</span></div>
                        <div class="sq_nr"><span>{{PRODUCT_LIST[index].INTERNAL_ID}}</span></div>
                    </li>
                    <li>
                        <div class="sq_mc1"><span>险种名称:</span></div>
                        <div class="sq_nr"><span>{{PRODUCT_LIST[index].PRODUCT_NAME}}</span></div>
                    </li>
                    <li>
                        <div class="sq_mc1"><span>保单红利本息合计&nbsp;(&nbsp;元&nbsp;)&nbsp;:&nbsp;</span></div>
                        <div class="sq_nr"><span>{{PRODUCT_LIST[index].PRO_BONUS_SA}}</span></div>
                    </li>
                    <li>
                        <div class="sq_mc1"><span>可领取红利金额本息合计&nbsp;(&nbsp;元&nbsp;)&nbsp;:&nbsp;</span></div>
                        <div class="sq_nr interestAmount"><span class="cash_bonus">{{CASH_BONUS_SA}}</span></div>
                    </li>
                </ul> 
                <div class="getAmount_box">
                    <div class="sq_mc1"><span>本次领取金额&nbsp;(&nbsp;元&nbsp;)&nbsp;:&nbsp;</span></div>
                    <input  class="getAmount" id="getAmount" ref="Amount" type="text" value="">
                </div>
            </div>
        </div>
        <section class="yy_cx">
            <button @click="confirms">选择领取</button>
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
import { Toast } from "vant";
import { toolsTwo } from "@/js/toolsTwo.js";
 export default {
        data() {
            return {
                headerContent: '红利领取',
                alertCount:{
                  isShowAlert:false,
                  alertData:'请输入',
                },
                // 选择的保单号集合
                selectCode:"",
                getAmount:[],
                dataList:[{}],
                lists:[],
                LIST:[],
                CASH_BONUS_SA:[],
                PRODUCT_LIST:[],
                getAmount:[],
                account:[],
                orangeId:[],
                panelShow:false
            }
        },
        components:{
            headerT,
            alertContent,
        },
        created(){

            this.getbonuslist({
                successCallback: (res) => {
                    console.log(res);
                console.log("获取成功"+res);

                    for (let i=0;i<res.data.BONUSLIST.length;i++){
                        this.lists=res.data.BONUSLIST[i];
                        for(let l=0;l< this.lists.length;l++){
                            this.PRODUCT_LIST= this.lists[l].PRODUCT_LIST;
                        }
                       
                        this.CASH_BONUS_SA=res.data.BONUSLIST[i][1].CASH_BONUS_SA;
                        this.lists.splice(0,1);
                        this.LIST=res.data.LIST;
                        this.account=res.data.account;
                        let orangeId = this.account.orangeId;
                        console.log('--------------getbonuslist');
                        console.log(this.account.organId);
                        // console.log('--------------');
                        // console.log(this.account);
                        return this.account.orangeId;
                    }
                },
                failCallback:(res) => {
                console.log("获取失败")
                },
                fCallback:(res) => {
                   
                    console.log("2002")
                }
            });

        },
        updated() {
             //alert(this.$refs.Amount.value)
        },
        methods:{
            ...mapActions({
                getbonuslist: "getbonuslist",
            }),
            checkOne(e,code){
                var codeIndex = this.selectCode.indexOf(code);
                if(codeIndex>=0){
                  //如果包含了该code，则删除（单选按钮由选中变为非选中状态）
                    this.selectCode.splice(codeIndex,1);
                }else{ //选中该按钮
                    //this.selectCode.push(code);
                    this.selectCode= code;
    
                }
            },
            confirms(){
                let getAmountValue = document.querySelector('#getAmount').value;
                let cash_bonus = document.querySelector('.cash_bonus').textContent;
                //  console.log(parseInt(getAmountValue) > parseInt(cash_bonus))
                if(this.selectCode ==""){
                     Toast('对不起，请选择保单红利领取变更');
                     return ;
                }
                if(getAmountValue ==""){
                     Toast('您此次未做红利领取，不允许后续操作');
                     return ;
                }
                if(parseInt(getAmountValue) > parseInt(cash_bonus)){
                     Toast('不能大于保单红利本息合计！');
                     return ;
                }
                if(this.$toolsTwo.money(getAmountValue) == false){
                    Toast('输入有误!');
                    return ;
                }
              if(this.$toolsTwo.decimals(getAmountValue) == false){
                    Toast('输入有误!');
                    return ;
                }

                // 传递保单号
               this.$router.push({ 
                    path: '/accpuntInf',
                    query:{
                        selectCode: this.selectCode,
                        getAmount:getAmountValue,
                        account:this.account
                    }
                });

               
            }
        }
    }
</script>

<style lang="scss" scoped>
.normal-box{
        min-height:100vh;
        background-color: #EFEFF4;
    }
    .list-box{
        box-sizing: border-box;
        padding-top: 10px;
        padding-left: 2.5%;
        padding-right: 2.5%;
        .sq_xz{  
            width: 88%;
            padding-left: 6%;
            padding-right: 6%;
            background: #00ae4d;
            border-radius: 10px 10px 0 0;
            color: #fff;
            line-height: 26px;
            ._select{
                float: right;
                input{
                    appearance: checkbox;
                    outline: 0;
                    border: 0;
                    width: 20px;
                    height: 20px;
                    margin-top: 4px;
                    color: #000;
                }
            }
        }
        .list-con{
            /* width: 88%;
            padding-left: 6%; */
            padding-right: 6%;
            padding-bottom: 5px;
            background-color: #fff; 
            padding-top: 5px;

        }
    }
    .yy_cx{
        width: 100%;
        text-align: center;
        padding: 10px 0;
        height: 35px;
        margin: 5px auto;
        line-height: 35px;
    }
    button{
        width: 50%;
        height: 35px;
        background-color: #00ae4d;
        border-radius: 7px;
        border: none;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
    }
    .policyholder_box{
        margin: 0 auto;
        background: #fff;
    }
    li,.getAmount_box{
        display: flex;
        width: 92%;
        /* border-bottom: 1px solid #d1d2d2; */
        margin-left:4%;
        margin-bottom:4px;
        line-height: 20px;
        .sq_nr {
            /* width: 60%; */
            font-size: 14px;
            text-align: right;
            padding-left: 0.1rem;
        }
        &:last-child{border: 0;}
        .getAmount{
            width: 45%;
            border:1px solid #e0e0e1;
            padding: 3px;
            color:#000;
            outline: 0;
            border-radius: 7px;
        }
        .interestAmount{
            color: #fba41c;
        }
    }
    .getAmount_box{
        padding-bottom: 10px;
    }
</style>
<template>
	<div class="me-box">
		<div class="invesmentAccountChange-box">
			<headerT :headerContent="headerContent"></headerT>
			<section class="box clearfix">
                <div class="content">
                    <ul class="list">
                        <li>
                            <span>源账户</span>
                            <div class="sq_nr">
                                <select name="userOrgan" class="select_lei" disabled v-model="userOrgan" style="
                                    color:  #bdbdbd;
                                ">
                                    <option  :value="userOrganlist.code">
                                        {{userOrganlist.value}}
                                    </option>
                                </select>

                                <i class="iconArrows">
                                    <img :src="imgSrc1" >
                                </i>
                            </div>
                        </li>
                        <li>
                            <span>目标账户</span>
                            <div class="sq_nr">
                                <select name="aimuserOrgan" class="select_lei" v-model="aimuserOrgan" style="
                                    color:  #2f2f2f;
                                ">
                                    <option :value="item.ACCOUNT_CODE" v-for="(item,i) in list" :key="i">
                                        {{item.FUND_NAME}}
                                    </option>
                                </select>

                                <i class="iconArrows">
                                    <img :src="imgSrc1" >
                                </i>
                            </div>
                        </li>
                        <li>
                            <span>单位数</span>
                            <input type="number" v-model="setNumber" style="width:64%;"/>
                        </li>
                    </ul>
                </div>
            </section>
             <publicButton :btnText="btnTexts" @btnControls="surenBtn" style="
                    background: #00ad4c;
                    margin: 0 auto;
            "></publicButton>
            <section class="box clearfix" v-show="tip">
				<div class="content">
					<ul class="list" v-for="(item, i) in listdata">		
                        <li>
                            <span>源账户</span>
                            <span style="width:64%">{{item.userOrgan}}</span>
                        </li>
                        <li>
                            <span>目标账户</span>
                            <span style="width:64%">{{item.aimuserOrgan}}</span>
                        </li>
                        <li>
                            <span>单位数</span>
                            <span style="width:64%; color: gray">{{item.setNumber}}</span>
                        </li>
					</ul>		
    			</div>
            </section>
            <publicButton :btnText="changBtn" @btnControls="controlBtn" style="
                    background: #00ad4c;
                    margin: 0 auto;
            " v-show="tip"></publicButton>
		</div>
	</div>
</template>

<script>
import publicButton from '@/components/publicButton.vue'
import headerT from '@/components/header.vue'
import { mapActions } from "vuex";
import { Toast } from "vant";
    export default {
        data() {
            return {
                listdata: [],
                changBtn: '',
                tip: false,
                setNumber: '',
                allList: [],
                policyCode: '',
                productId: '',
                UNITS: '',
                aimuserOrgan: '',
                userOrganlist:{},
                list: [],
                userOrgan: '',
                imgSrc1: require("@/assets/mgImg/icon-arrow-right.png"),
                orginCustomer: '3223',
                headerContent: '投资账户单位转换',
                btnTexts: '添加'
            }
        },
        components:{
            headerT,
            publicButton
        },
        created(){
            this.getaccountname({
				successCallback: res => {
                    this.policyCode = res.policyCode
                    this.productId = res.productId
                    this.userOrgan = res.ACCOUNT_CODE
                    this.UNITS = res.OUT_UNITS
                    this.userOrganlist = {
                        value: res.FUND_NAME,
                        code: res.ACCOUNT_CODE
                    }
                    this.list = res.list
                    this.aimuserOrgan = this.list[0].ACCOUNT_CODE
				},
				failCallback: res => {
                    Toast({
                        message: res
                    })
                }
			});
        },
        methods:{
            ...mapActions({
                getaccountname: 'getaccountname',
                numberunitschange: 'numberunitschange'
			}),
            controlBtn(){
                 const toast1 =  Toast.loading({
                    mask: true,
                    message: "加载中...",
                    duration: 0
                });
                 let acc_list = this.listdata.map((item) => {
                    var trans = {
                        TO_ACCOUNT_CODE:	item.aimuserOrgan,
                        UNIT:				 item.setNumber,
                        FROM_ACCOUNT_CODE:	item.userOrgan
                    }
                    return trans
                })
                var editdata = {
                    POLICY_CODE:this.policyCode,
                    PRODUCT_ID: ""+this.productId,
                    ACC_LIST:acc_list
                    
                }
                
                this.numberunitschange({
                    editdata,
                    successCallback: res => {
                        toast1.clear();
                        if(res.data.flag == 0 ){
                            // 成功 
                            this.$router.push({path: '/investmentResult'})
                        } else {
                            Toast({
                                message: res.msg
                            })
                        }
                    },
                    failCallback: res => {
                        Toast({
                            message: res
                        })
                         toast1.clear();
                    }
                });
                    
            },
            surenBtn(){
               if(this.setNumber==""||parseFloat(this.setNumber)<=0){
                   Toast({
                            message: "单位数不能为空或0",
                            duration: 3000
                        });
		           return;
		       }
               if(parseFloat(this.setNumber)>parseFloat(this.UNITS)){
                    Toast({
                        message: "单位数不能大于账户可转出基金单位数！",
                        duration: 3000
                    });
                  return;
                }
               if(this.userOrgan==this.aimuserOrgan){
                  Toast({
                            message: "源账户和目标账户不能相同！",
                            duration: 3000
                        });
		         return;
		       }
                this.tip = true;
                this.changBtn = '确认转换';
                this.listdata.push({
                    userOrgan: this.userOrgan,
                    aimuserOrgan: this.aimuserOrgan,
                    setNumber: this.setNumber
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.me-box {
  background-color: #dcdcdc;
  min-height:100vh;
}
.invesmentAccountChange-box{
    .sq_nr{
        color: #b2b2b2;
        display: flex;
        align-items: center;
        width: 4.5rem;
        select{
            width: 100%;
            height:0.88rem;
            border: none;
            appearance: none;
            color: rgb(119, 119, 119);
            font-size: 0.32rem;
            line-height: 0.88rem;
            background-color: transparent;
            outline: none;
            &.blur{color:#000;}
        }
        .iconArrows{
            img{
                display: inline-block;
                vertical-align: middle;
                width: 50%;
            }
        }

    }
    .box{
		    margin: 0.4rem 0;
		background: #fff;
		padding: 0 0.25rem;
	}
	li{
		height: 0.88rem;
		display: flex;
		border-bottom: 0.01rem solid #F4F4F3;
		align-items: center;
		color: #383838;
		justify-content: space-between;
        font-size: 0.32rem;
	}
    
}
</style>
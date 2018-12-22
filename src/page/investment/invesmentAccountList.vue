<template>
	<div class="me-box">
         <headerT :headerContent="headerContent" style="
			margin-bottom: 0.15rem;
		"></headerT>
         <div class="list-content" style="
        padding: 0 0.2rem; 
        ">
            <div class="list-top" v-if="result.policyCode">
                <div class="list-title" style="
                    height: 0.83rem;
                    line-height: 0.83rem;
                    color: #fff;
                    padding: 0 0.32rem;
                ">
                    保单号：{{result.policyCode}}
                </div>
            </div>
            <div class="list-status" v-if="result.productName && result.insurantname && result.statusName">
                <p class="list-line" style="
                        padding-top: 0.15rem;
                ">
                   {{result.productName}}
                </p>
                <div class="list-line"style="
                    display:  flex;
                    justify-content: space-between;
                    padding-top: 0.15rem;
                ">
                    <p class="list-line-left">
                        被保人：{{result.insurantname}}
                        </p>
                        <p class="list-line-right" style="
                            color:  #00ae4d;
                        ">
                        状态：{{result.statusName}}
                        </p>
                </div>
            </div>
            <div class="list-box" v-for="(item, i) in datalist" :key="i">
                <div class="customer">
                    <div class="customer-title">
                        <img src="@/assets/invesment/sp.png">&nbsp;&nbsp;{{item.FUND_NAME}}
                    </div>
                    <div class="customer-content">
                        <div class="customer-line"><div class="customer-line-left">账户代码</div><div class="customer-line-right">{{item.ACCOUNT_CODE}}</div></div>
                        <div class="customer-line"><div class="customer-line-left">现有基金单位数</div><div class="customer-line-right">{{item.ACCUM_UNITS}}</div></div>
                        <div class="customer-line"><div class="customer-line-left">已申请卖出基金单位数</div><div class="customer-line-right">{{item.APPLY_UNITS}}</div></div>
                        <div class="customer-line"><div class="customer-line-left">可转出基金单位数</div><div class="customer-line-right">{{item.OUT_UNITS}}</div></div>
                    </div>
                </div>
                <publicButton :btnText="btnTexts" @btnControls="surenBtn(item.FUND_NAME)" style="
                    background: #00ad4c;
                    margin: 0 auto;
                    margin-bottom: 0.2rem;
                "></publicButton>
            </div>
            <div v-if="showNothing">未查找到符合条件的数据！</div>
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
                showNothing: true,
                result: {},
                datalist: [],
                btnTexts: '开始转换',
                headerContent: '投资账户单位转换',
            }
        },
        components:{
            publicButton,
            headerT
        },
        created(){
            let editdata = {policyCode :this.$route.query.code}
           this.queryinfo({
               editdata,
				successCallback: res => {
                    this.result = res
					this.datalist = res.account.RESULT_LIST
                    if(this.datalist && this.datalist.length > 0){
                        this.showNothing = false
                    }

				},
				failCallback: res => {
                    Toast({
                        message: res
                    })
                }
			});
        },
        methods:{
            surenBtn(name){
                let editdata = {'accountName':encodeURI(name)}
                this.putaccountname({
                    editdata,
                    successCallback: res => {
                        this.$router.push({path: '/invesmentAccountChange', query: {name: name}})
                    },
                    failCallback: res => {
                         Toast({
                            message: res,
                            duration: 3000
                        });
                    }
                });
            },
            ...mapActions({
				queryinfo: 'queryinfo',
                getaccountname: 'getaccountname',
                putaccountname: 'putaccountname'
			}),
			pushpage(){
				
			}
        }
    }
</script>

<style lang="scss" scoped>
.me-box {
  background-color: #dcdcdc;
  min-height:100vh;
  .list-status{
    height:  1.26rem;
    background: #fff;
    padding: 0 0.32rem;
     margin: 0.16rem 0;
     
  }
  .list-top{
    .list-title{
        background-size: contain;
        background-image: url('../../assets/invesment/xq_header_bg.png')
    }
  }
  .customer{
    background: #fff;
    padding: 0.2rem 0.32rem 0;
    margin-bottom: 0.32rem;
    .customer-title{
       font-size: 0.27rem;
       font-weight: bold;
       color: #060606;
       display: flex;
       padding-bottom: 0.34rem;
       img{
           width: 0.54rem;
           height: 0.42rem;
       }
    }
    .customer-line{
        display: flex;
        justify-content: space-between;
        font-size: 0.28rem;
        border-bottom: 0.01rem solid #cfcfcf;
        padding-bottom: 0.1rem;
    }
    .customer-line:last-child{
        border: 0;
    }
  }
}
</style>
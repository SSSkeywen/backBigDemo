<template>
<div class="normal-box">
    <div class="pay-box" v-if="code=0&&code!=null&&code!=''">
        <nav>
            <img :src="tipsImgSrc" alt="">
        </nav>

        <div class="list-box" >
            <p>保单号:{{LIST}}变更成功。</p>
            <span>核心批文内容：兹经演示授权，并经本公司同意将该保单下的累积账户金额：{{monery}}人民币 本次领取金额：{{getAmounr}}人民币零元壹角 收付方式：客户银行转账 开户银行：{{bankCard}} 账号：{{account}}账户所有人：{{accountOwner}}</span>
        </div>
        <section class="yy_cx">
            <button @click="confirms">关闭</button>
        </section>
    </div>
    <div class="changeFailure" v-else>
        <nav>
            <img :src="FailureSrc" alt="">
        </nav>
        <div class="list-box" >
            <p>保单号:{{LIST}}变更失败。</p>
            <span>批文信息:{{this.result.msg}}</span>
        </div>
        <section class="yy_cx">
            <button @click="confirms">关闭</button>
        </section>
    </div>
</div>
</template>

<script>
import alertContent from '@/components/alertContent.vue'
import { mapActions } from "vuex";
export default {
    data() {
        return {
            alertCount:{
                isShowAlert:false,
                alertData:'请输入',
            },
            LIST:'12345678977',
            monery:"1111",
            getAmounr:"100",
            //银行卡
            bankCard:"中国工商银行",
            //银行卡类型
            bankCardType:"",
            //账号所属机构
            organization:"",
            //付费账号
            account:'123456',
                //账号所有人
            accountOwner:"演示",
            panelShow:false,
            tipsImgSrc: require('@/assets/publicImg/icon_3.jpg'),
            FailureSrc:require('@/assets/images/icon_03.png'),
            result:[],
            code:[],
        }
    },
    components:{
        alertContent,
    },
    mounted() {
            this.LIST = this.$route.query.pathAddress;
            this.getAmounr = this.$route.query.getAmount;
            this.bankCard = this.$route.query.bankCard;
            this.account = this.$route.query.account;
            this.accountOwner = this.$route.query.accountOwner;
        //  //领取类型
        //  let getType=1;
        //  //保单号
        // //  let CodeNoData=this.LIST;
        //  let CodeNoData=this.LIST;
        //  //领取金额
        //  let getAmounr= this.getAmounr
        let CodeNoData={time:1,policyCodes:this.LIST,money:this.getAmounr};

        console.log(CodeNoData);
        this.changeSuccess({
            CodeNoData,
            successCallback: result => {
                this.result=result
                this.code=result.code
                console.log("changeSuccess.result")
                console.log(this.result)
                
            },
            failCallback: res => {
            console.log("changeSuccess.失败")
                this.code=res.code;
                this.result=res;
                console.log(res)
                console.log(this.result.msg)
            }
        });

    },
    methods:{
        ...mapActions({
            changeSuccess: "changeSuccess"
        }),
        confirms(){
            // 传递保单号
            this.$router.push({ 
                path: '../businessHanding',
                query:{
                    selectCode: this.selectCode
                }
            });
            
        }
    }
}


</script>

<style lang="scss" scoped>
nav{
    padding-top: 10%;
    width: 100%;
    text-align: center;
}
nav img{
    width: 75px;
    height: 75px;
    margin: 0 auto;
}
.list-box{
    width: 100%;
    text-align: center;
    font-size: 16px;
    padding: 10px 0;
}
.list-box p {
    width:100%;
    line-height: 50px;
    text-align: center;
    display: inline-block;
    font-size: 18px;
    color: #333;
}
.list-box span{
    /* width: 88%; */
    line-height: 30px;
    text-align: center;
    display: inline-block;
    margin: 0 6%;
    min-height: 50px;
    color: #666;
}
.yy_cx{
        width: 100%;
        text-align: center;
        padding: 10px 0;
        height: 36px;
        margin: 5px auto;
        line-height: 36px;
    }
    button{
            width: 90%;
            height: 36px;
            margin: 0 5%;
            background-color: #04be01;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            color: #fff;
            font-size: 16px;
        }
</style>

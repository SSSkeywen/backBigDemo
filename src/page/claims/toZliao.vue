<template>
    <div class="claims-box">
        <div>
            <img :src="claimsImg" width="100%">
        </div>
        <ul class="claims-ul">
            <li v-for="(item,index) in claimsLists" :key="index">
                <p>
                    <i><img :src="item.num" alt=""></i>{{item.content}}
                </p>
            </li>
        </ul>
        <p class="claims-tips">*申请重大疾病险种还需提供病理报告或条款约定的其他证明材料。</p>
        <h2 class="claims-h2">注意：</h2>
        <p class="claims-p1">理赔申请书为理赔必备文件，包括理赔申请、理赔委托和理赔委托转账授权内容，客户可以到太平人寿网站单证下载处下载使用。如果委托他人代为办理理赔。请详细填写理赔委托内容：如您采用银行转账方式领取理赔金。请详细填写理赔委托转账内容并提供受益人的存折复印件。附近上述材料外，保险金申请人还应根据保险公司的实际需要提供其他相关证明。</p>
        <p class="clsims-p2">除上述证明外，保险金申请人还应根据保险公司的实际需要提供其他相关的证明。</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                claimsImg: require("@/assets/claimsImg/ziliao_03.png"),
                claimsLists:[
                    {
                        num:require("@/assets/claimsImg/ziliao_1.png"),
                        content:'疾病诊断证明'
                    },{
                        num:require("@/assets/claimsImg/ziliao_2.png"),
                        content:'医疗费用原始收据'
                    },{
                        num:require("@/assets/claimsImg/ziliao_3.png"),
                        content:'门诊病历及出院小结'
                    },{
                        num:require("@/assets/claimsImg/ziliao_4.png"),
                        content:'医疗费用清单、处方明细；'
                    },{
                        num:require("@/assets/claimsImg/ziliao_5.png"),
                        content:'事故证明（交通、公安等部门出具）'
                    },{
                        num:require("@/assets/claimsImg/ziliao_6.png"),
                        content:'残疾鉴定书'
                    },{
                        num:require("@/assets/claimsImg/ziliao_7.png"),
                        content:'居民死亡证明书'
                    },{
                        num:require("@/assets/claimsImg/ziliao_8.png"),
                        content:'户籍注销证明'
                    },{
                        num:require("@/assets/claimsImg/ziliao_9.png"),
                        content:'丧葬证明'
                    },{
                        num:require("@/assets/claimsImg/ziliao_10.png"),
                        content:'受益人或委托代理人身份证明'
                    }
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
.claims-box{
    min-height: 100vh;
    background: #f1f1f1;
    padding: 0.1rem;
    box-sizing: border-box;
}
.claims-ul{
    width: 90%;
    margin: 0 auto;
    li{
        margin: 10px 0;
        p{
            i{
                margin: 0 5px;
                img{
                    display: inline-block;
                    vertical-align: top;
                }
            }
        }
    }
}
.claims-tips{
    width: 94%;
    margin-left: auto;
    margin-right: auto;
    line-height: 24px;
    color: #F00;
    text-align: center;
    font-weight: bold;
    font-size: 0.26rem;
}
.claims-h2{
    width: 70px;
    text-align: center;
    line-height: 26px;
    color: #fff;
    background: #22b22c;
    border-radius: 5px;
    font-size: 0.3rem;
}
.claims-p1{
        margin: 0px 10px 10px;
    line-height: 24px;
    font-size: 0.26rem;
}
.clsims-p2{
    width: 94%;
    margin-left: auto;
    margin-right: auto;
    line-height: 20px;
    color: #666;
    text-align: center;
    font-size: 0.24rem;
}
</style>
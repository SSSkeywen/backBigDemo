<template>
    <div class="open-box">
        <headerT :headerContent="headerContent"></headerT>
        <div class="open-box-content">
            <ul>
                <li v-for="(item,index) in openDataLists" :key="index">
                    <hgroup>{{item.title}}</hgroup>
                    <p v-for="(itemTwo,indexTwo) in item.lists" :key="indexTwo">{{itemTwo}}</p>
                </li>
            </ul>
            <input type="checkbox" name="checkbox" id="duihao" v-model="checked">
            <label for="duihao" :class="{'show':checked}">&nbsp;&nbsp;本人已阅读并同意以上约定</label>
            <div class="foot">
                <button class="cancol" onclick="history.back()">取&nbsp;消</button>
                <button class="sure" @click="toNext">确&nbsp;定</button>
            </div>
        </div>
    </div>
</template>

<script>
import headerT from '@/components/header.vue'
// import caseMsg from '../../components/claimsComponent/caseMsg.vue'
import { mapActions } from "vuex";
// import { Toast } from "vant";
    export default {
        data() {
            return {
                headerContent: '新增保险服务密码',
                checked:false,
                openDataLists:[
                    {
                        title:'一、下列信息涉及您的重大权益调整，请在变更之前仔细阅读：',
                        lists:[
                            '本人同意提供给中国太平（指中国太平保险集团有限责任公司及其直接或间接控股的公司）的个人资料（包括本单证签署之前提供的以及本人接受中国太平各项服务时产生的信息），可用于中国太平及因服务必要而委托的第三方为本人提供服务及推荐产品，接收信息的主体对上述信息负有保密义务。本条款自申请确认时生效，具有独立的法律效力，不受合同成立与否及效力状态变化的影响。'
                        ]
                    },
                    {
                        title:'二、您申请开通保险服务密码功能,请确认:',
                        lists:[
                            '1.本人自愿申请太平人寿保险有限公司保险服务密码，已知晓通过该保险服务密码，可对本人名下保单进行保全操作，并保证按照贵司网上自助业务办理要求进行业务办理。',
                            '2.本人了解保护个人信息安全的重要性，承诺不使用他人手机号码签约服务密码，不使用他人手机应用服务密码，并确保不将服务密码的用户名、密码告知他人，不在公共网络环境或非正规网站下载软件。本人愿意承担因上述行为导致的资金风险及各类风险。'
                        ]
                    },
                    {
                        title:'三、安全提示：',
                        lists:[
                            '为了您的资金安全以及保单权益，请妥善保管您的服务密码，不要向包括我司工作人员在内的任何人透露您的个人信息，中国太平网站地址为：www.cntaiping.com，微信服务公众号为：中国太平95589，对于不明来源的邮件、短信、电话，请不要轻信，应立即通过我司客服95589进行核实。'
                        ]
                    }
                ],
                alertCount:{
                    isShowAlert:false,
                    alertData:'请输入',
                },
            }
        },
        components:{
            headerT,
            // caseMsg
        },
        created(){
            this.verifyinglanding({
                successCallback: (res) => {
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
                verifyinglanding: 'verifyinglanding',
                toPwdAddJudge: 'toPwdAddJudge',
                redictNewUrl: 'redictNewUrl',
            }),
            toNext(){
                if (this.checked) {
                    this.toPwdAddJudge({
                        successCallback: (res) => {
                            if(res.resultCode == '1'){
                                //跳网厅
                                let url = 'jumppage/insurecode/addinsuredcode';
                                this.redictNewUrl({
                                    url,
                                    successCallback: (res) => {
                                       window.location.href = res;
                                    },
                                    failCallback:(res) => {
                                        if(res.code == 2002){
                                            this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
                                        }else{
                                            this.alertCount.isShowAlert = true;
                                            this.alertCount.alertData = res.msg;
                                        }
                                    }
                                });
                            }else if(res.resultCode == '2'){
                                //跳拍照页面
                                this.$router.push({ path: '/toCamera'});
                            }else{
                                //错误提示页面
                                 this.$router.push({ path: '/msg'});
                            }
                        },
                        failCallback:(res) => {
                            if(res.code == 2002){
                                this.$router.push({ path: '/userInfo',query: {pathAddress: '/myGuaranteeSlip'} });
                            }else{
                                this.alertCount.isShowAlert = true;
                                this.alertCount.alertData = res.msg;
                            }
                        }
                    });
                }else{
                    alert('请勾选已阅读')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.open-box{
    min-height: 100vh;
    background: #f3f2f2;
    font-size: 0.28rem;
    .open-box-content{
        padding: 0.26rem;
        padding-right: 0.22rem;
        width: 100%;
        height: 93%;
        box-sizing: border-box;
        padding-bottom: 0;
        ul{
            li{  
                padding-bottom: 0.2rem;
                hgroup{
                    font-size: 0.28rem;
                    color: #515151;
                }
                p{
                    font-size: 0.26rem;
                    color: #838383;
                    line-height: 0.42rem;
                }
            }
        }
        input[type="checkbox"] {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: none;
        }
        label{
            display: inline-block;
            width: 100%;
            text-align: left;
            box-sizing: border-box;
            font-size: 0.24rem;
            color: #515151;
            vertical-align: middle;
            &:before {
                content: "";
                display: inline-block;
                width: 13px;
                height: 13px;
                vertical-align: -10%;
                margin-right: 8px;
                box-sizing: border-box;
                border-radius: 3px;
                -webkit-border-radius: 3px;
                border: 1px solid #ccc;
            }
            &.show:before{
                background: url('../../assets/mgImg/jfjlcx.png') no-repeat center;
                -webkit-background-size: 100%;
                background-size: 100%;
            }
        }
        .foot{
            width: 100%;
            height: 1.2rem;
            display: flex;
            justify-content: space-around;
            margin-top: 0.2rem;
            button {
                background: #006CB7;
                color: #fff;
                border-radius: 5px;
                font-size: 0.32rem;
                width: 48%;
                height: 57%;
            }
        }
    }
}
</style>
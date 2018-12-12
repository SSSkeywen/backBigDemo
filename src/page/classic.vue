<template>
    <div class="box">
        <header v-if="clientMsg">
            <clientMessage :clientMsg="clientMsg"></clientMessage>
        </header>
        <classicNav :navLists="navLists"></classicNav>
        <classicSwiper v-if="clientMsg.advertisingResult" :swiperImgSrcLists="clientMsg.advertisingResult"></classicSwiper>
        <classicPageList class="message-list" :pageListData="pageListData"></classicPageList>
        <classicPageList class="message-list" :pageListData="pageListDataTwo"></classicPageList>
    </div>
</template>

<script>
import clientMessage from '../components/classicComponent/clientMessage'
import classicNav from '../components/classicComponent/classicNav'
import classicSwiper from '../components/classicComponent/classicSwiper'
import classicPageList from '../components/classicComponent/classicPageList'
import { mapActions } from "vuex";
import { Toast } from "vant";
import {config} from '@/config/config.js'
    export default {
                data() {
                    return {
                        clientMsg:{
                            authorizationMap:{
                                headimgurl:'',
                            },
                            customer:{
                                name:''
                            }
                        },
                        authorizationMap:{},
                        navLists: [
                            {
                                navIcon:require('@/assets/classicImg/icon01.png'),
                                navTitle: '我的保单',
                                navPath:'/myGuaranteeSlip',
                            },
                            {
                                navIcon:require('@/assets/classicImg/icon02.png'),
                                navTitle: '热卖万能',
                                navPath:'/universal',
                            },
                            {
                                navIcon:require('@/assets/classicImg/icon03@huizhi.png'),
                                navTitle: '回执回访',
                                navPath:'',
                            },
                            {
                                navIcon:require('@/assets/classicImg/icon04@xuqi.png'),
                                navTitle: '续期交费',
                                navPath:'',
                            },
                            {
                                navIcon:require('@/assets/classicImg/icon05@lipei.png'),
                                navTitle: '理赔报案',
                                navPath:'',
                            },
                            {
                                navIcon:require('@/assets/classicImg/icon06@shishi.png'),
                                navTitle: '实时贷',
                                navPath:'',
                            },
                            {
                                navIcon:require('@/assets/classicImg/icon07@guimian.png'),
                                navTitle: '柜面预约',
                                navPath:'',
                            },
                            {
                                navIcon:require('@/assets/classicImg/icon08@dianzi.png'),
                                navTitle: '电子保单',
                                navPath:'',
                            }
                        ],
                        swiperImgSrcLists:[
                            {
                                swiperImgSrc:require('@/assets/classicImg/swiperImg.png')
                            },
                            {
                                swiperImgSrc:require('@/assets/classicImg/swiperImg.png')
                            },{
                                swiperImgSrc:require('@/assets/classicImg/swiperImg.png')
                            }
                        ],
                        pageListData:{
                            pageTitle:'信息查询',
                            allPagePath:'/messageInquire',
                            pageLists:[
                                {
                                    pageBg:require('@/assets/classicImg/bg01@yuding.png'),
                                    pageName:'预订单查询',
                                    pageIcon:require('@/assets/classicImg/listIcon01@yuding.png'),
                                    pagePath:'',
                                },{
                                    pageBg:require('@/assets/classicImg/bg02@tubao.png'),
                                    pageName:'投保进程',
                                    pageIcon:require('@/assets/classicImg/listIcon02@tubao.png'),
                                    pagePath:'/insureProgress',
                                },{
                                    pageBg:require('@/assets/classicImg/bg03@daikuan.png'),
                                    pageName:'贷款账户',
                                    pageIcon:require('@/assets/classicImg/listIcon03@daikuan.png'),
                                    pagePath:'/loanHistory',
                                },{
                                    pageBg:require('@/assets/classicImg/bg04@lipei.png'),
                                    pageName:'理赔流程',
                                    pageIcon:require('@/assets/classicImg/listIcon04@lipei.png'),
                                    pagePath:'/toLiucheng',
                                }
                            ]
                        },
                        pageListDataTwo:{
                            pageTitle:'业务办理',
                            allPagePath:'/businessHanding',
                            pageLists:[
                                {
                                    pageBg:require('@/assets/classicImg/bg05@zuzhu.png'),
                                    pageName:'自助解绑',
                                    pageIcon:require('@/assets/classicImg/listIcon05@zizhu.png'),
                                    pagePath:'/unbindSelf',
                                },{
                                    pageBg:require('@/assets/classicImg/bg06@kaitong.png'),
                                    pageName:'开通保险<br>服务密码',
                                    pageIcon:require('@/assets/classicImg/listIcon06@kaitong.png'),
                                    pagePath:'/insure',
                                },{
                                    pageBg:require('@/assets/classicImg/bg07@yuyue.png'),
                                    pageName:'预约终止',
                                    pageIcon:require('@/assets/classicImg/listIcon07@yuyue.png'),
                                    pagePath:'/terminateCancelList',
                                },{
                                    pageBg:require('@/assets/classicImg/bg08@hongli.png'),
                                    pageName:'红利领取',
                                    pageIcon:require('@/assets/classicImg/listIcon08@hongli.png'),
                                    pagePath:'',
                                }
                            ]
                        }
                    }
        },
        components:{
            clientMessage,
            classicNav,
            classicSwiper,
            classicPageList
        },
        created(){
            const toast1 = Toast.loading({
                mask: true,
                message: "加载中...",
                duration: 1000
            });
            this.getClientMessage({
                successCallback: (result) => {
                    // console.log(res)
                    this.$set(this.clientMsg.authorizationMap,"headimgurl", result.authorizationMap.headimgurl)
                    this.clientMsg = result
                    // console.log(this.clientMsg)
                    // this.authorizationMap = res.data.authorizationMap
                    toast1.clear();
                },
                fCallback:(res) => {
                    toast1.clear();
                }
            })
        },
        methods: {
            ...mapActions({
                getClientMessage: "getClientMessage"
            }),

            myGuaranteeSlip() {
                // this.$router.push({ path: "/messageInquire" });
            }
        },
    }
</script>

<style scoped lang="scss">
.box{
    padding-bottom: 0.5rem;
}
.message-list{
    margin-top: 0.5rem;
}
</style>
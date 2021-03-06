import Vue from 'vue'
import Router from 'vue-router'
import classic from '@/page/classic'
import messageInquire from '@/page/messageInquire'
import businessHanding from '@/page/businessHanding'
import userFailPage from '@/page/userFailPage'
import successPage from '@/page/successPage'
import successPageChange from '@/page/successPageChange'
import transitionPage from '@/page/transitionPage'

//回执回访
import reminded from '@/page/reminded/reminded'

// 绑定页面
import userInfo from '@/page/userInfo'


import myGuaranteeSlip from '@/page/policyInfo/myGuaranteeSlip'
import mgPlicyInfo from '@/page/policyInfo/mgPlicyInfo'

//理赔
import toLiucheng from '@/page/claims/toLiucheng'
import toZliao from '@/page/claims/toZliao'
import toWenda from '@/page/claims/toWenda'
import toCasemx from '@/page/claims/toCasemx'
import toyiyuancx from '@/page/claims/toyiyuancx'
import toCasemxMsg from '@/page/claims/toCasemxMsg'

//账单发票
import sqzdList from '@/page/bill/sqzdList'
import sqzdMessage from '@/page/bill/sqzdMessage'
import toNewIndex from '@/page/bill/toNewIndex'
import toNewIndexMessage from '@/page/bill/toNewIndexMessage'
import toNewList from '@/page/bill/toNewList'
import toNewIndexView from '@/page/bill/toNewIndexView'
import saveTheBill from '@/page/bill/saveTheBill'
import saveTheBillList from '@/page/bill/saveTheBillList'
import settingTheBill from '@/page/bill/settingTheBill'
import settingTheBillList from '@/page/bill/settingTheBillList'
import successMessage from '@/page/bill/successMessage'
import sendInvoice from '@/page/bill/sendInvoice'

//保全变更记录
import changeList from '@/page/policyInfo/changeList'
import changeListInfo from '@/page/policyInfo/changeListInfo'
import changeListApproval from '@/page/policyInfo/changeListApproval'

//投保进程查询
import insureProgress from '@/page/policyInfo/insureProgress'

// 账户
import universal from '@/page/account/universal'

import universalInfo from '@/page/account/universalInfo'

import universalWorth from '@/page/account/universalWorth'

import universalDetial from '@/page/account/universalDetial'
import dividend from '@/page/account/dividend'
import dividendInfo from '@/page/account/dividendInfo'
import loanHistory from '@/page/credit/loanHistory'
import unitLinked from '@/page/account/unitLinked'
import unitLinkedInfo from '@/page/account/unitLinkedInfo'
import survival from '@/page/account/survival'
import survivalInfo from '@/page/account/survivalInfo'
// 退信
import yearReport from '@/page/letter/yearReport'
import lostNotice from '@/page/letter/lostNotice'
import lostForever from '@/page/letter/lostForever'
import transferSuc from '@/page/letter/transferSuc'
import payFees from '@/page/letter/payFees'
import bounce from '@/page/letter/bounce'
import addressOk from '@/page/letter/addressOk'
import addressNew from '@/page/letter/addressNew'

// 减额交情
import passwordCheck from '@/page/reduceAmount/passwordCheck'
import reduceAmountList from '@/page/reduceAmount/reduceAmountList'
import reduceAmountDetail from '@/page/reduceAmount/reduceAmountDetail'
import reduceAmountResult from '@/page/reduceAmount/reduceResult'
// 年金领取频率及年限变更
import annuityCollectList from '@/page/annuityCollection/annuityCollectList'
import annuityCollectDetail from '@/page/annuityCollection/annuityCollectDetail'
import statusPage from '@/page/publicPage/policyStatus'

//保险服务密码
//保险服务密码

import insure from '@/page/insuranceServicePassword/insure'
import toCamera from '@/page/insuranceServicePassword/toCamera'
import msg from '@/page/insuranceServicePassword/msg'
import modifyRest from '@/page/insuranceServicePassword/modifyRest'

//个人信息变更
import phoneChange from '@/page/personalInformationChange/phoneChange'
import emilChange from '@/page/personalInformationChange/emilChange'
import homeAdressChange from '@/page/personalInformationChange/homeAdressChange'
import companyAdressChange from '@/page/personalInformationChange/companyAdressChange'
import clientCardEntTiemChange from '@/page/personalInformationChange/clientCardEntTiemChange'
import uploadCard from '@/page/personalInformationChange/uploadCard'

//交费信息变更
import contactAddress from '@/page/payInfoChange/contactAddress'
import contactAddressChange from '@/page/payInfoChange/contactAddressChange'
import overdueWayChange from '@/page/insurancePactService/overdueWayChange'
import overdueWayChangeEnd from '@/page/insurancePactService/overdueWayChangeEnd'


//基本服务
import unbindSelf from '@/page/baseService/unbindSelf'
import unbindHistory from '@/page/baseService/unbindHistory'
import unbindSuc from '@/page/baseService/unbindSuc'


// 赵盼预约终止首页
import terminateCancelList from "@/page/safeInforChange/terminateCancelList";
import terminateCancelInfo from "@/page/safeInforChange/terminateCancelInfo";
import terminateCancelResult from "@/page/safeInforChange/terminateCancelResult";

// 赵盼生存金领取
import ybtScjlqffzhxxOne from "@/page/accountLink/bonusGetWayChange";
import ybtScjlqffzhxx from "@/page/accountLink/ybtScjlqffzhxx";
import ybtScjlqffzhxxResult from "@/page/accountLink/ybtScjlqffzhxxResult";

// 赵盼理赔报案claimReport

import claimReport from "@/page/baseService/claimReport";
import userEvaluation from "@/page/baseService/userEvaluation";

// 赵盼理赔报案的第二页
import xzyiyuan from "@/page/baseService/xzyiyuan";

// 赵盼医院查询列表
import yiyuanlb from "@/page/baseService/yiyuanlb";

//红利领取
import receiveList from "@/page/divdendsReceive/receiveList";
import accpuntInf from "@/page/divdendsReceive/accpuntInf";
import changeSuccess from "@/page/divdendsReceive/changeSuccess";

// 赵盼红利变更hlbgPage
import hlbgPage from "@/page/accountLink/hlbgPage";
import hlbgPageTwo from "@/page/accountLink/hlbgPageTwo";
import hlsuccessPage from "@/page/accountLink/hlsuccessPage";

//通知书方式变更
import billChangeSuccess from "@/page/notificationSendingModeChanges/billChangeSuccess"
import billLoseEfficacy from "@/page/notificationSendingModeChanges/billLoseEfficacy"
import billYearReport from "@/page/notificationSendingModeChanges/billYearReport"
import billLoseEfficacyEver from "@/page/notificationSendingModeChanges/billLoseEfficacyEver"
import infoChangeResult from '@/page/notificationSendingModeChanges/infoChangeResult'

//红利领取方式变更
import bonusGetWayChange from '@/page/customerService/protectRightGet/bonusGetWayChange'
import bonusGetWayChangeInfo from '@/page/customerService/protectRightGet/bonusGetWayChangeInfo'
import bonusGetWayChangeApproval from '@/page/customerService/protectRightGet/bonusGetWayChangeApproval'

// 生存金领取方式变更
import survivalGetWayChange from '@/page/customerService/protectRightGet/survivalGetWayChange'
import survivalGetWayChangeInfo from '@/page/customerService/protectRightGet/survivalGetWayChangeInfo'
import survivalGetWayChangeEnd from '@/page/customerService/protectRightGet/survivalGetWayChangeEnd'

// 续费账号
import paymentAccount from '@/page/paymentInformationChange/paymentAccount'
import paymentAccountInfo from '@/page/paymentInformationChange/paymentAccountInfo'

// 投资账户单位转换
import invesmentAccountIndex from '@/page/investment/invesmentAccountIndex'
import invesmentAccountList from '@/page/investment/invesmentAccountList'
import invesmentAccountChange from '@/page/investment/invesmentAccountChange'
import investmentResult from '@/page/investment/investmentResult'

//随心约
import appointmentIndex from '@/page/appointment/appointmentIndex'
import appointmentForm from '@/page/appointment/appointmentForm'
import addressIndex from '@/page/appointment/addressIndex'
import server from '@/page/appointment/server'
import city from '@/page/appointment/city'


Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'classic',
      component: classic
    }, {
      path: '/myGuaranteeSlip',
      name: 'myGuaranteeSlip',
      component: myGuaranteeSlip
    }, {
      path: '/businessHanding',
      name: 'businessHanding',
      component: businessHanding
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/userFailPage',
      name: 'userFailPage',
      component: userFailPage
    },
    {
      path: '/successPage',
      name: 'successPage',
      component: successPage
    },
    {
      path: '/successPageChange',
      name: 'successPageChange',
      component: successPageChange
    },
    {
      path: '/transitionPage',
      name: 'transitionPage',
      component: transitionPage
    },
    {
      
      path: '/messageInquire',
      name: 'messageInquire',
      component: messageInquire
    }, {
      path: '/mgPlicyInfo',
      name: 'mgPlicyInfo',
      component: mgPlicyInfo
    },
    //回执回访问
    {
      path: '/reminded',
      name: 'reminded',
      component: reminded
    },
    //理赔
    {
      path: '/toLiucheng',
      name: 'toLiucheng',
      component: toLiucheng
    }, {
      path: '/toZliao',
      name: 'toZliao',
      component: toZliao
    }, {
      path: '/toWenda',
      name: 'toWenda',
      component: toWenda
    }, {
      path: '/toCasemx',
      name: 'toCasemx',
      component: toCasemx
    }, {
      path: '/toCasemxMsg',
      name: 'toCasemxMsg',
      component: toCasemxMsg
    }, {
      path: '/toyiyuancx',
      name: 'toyiyuancx',
      component: toyiyuancx
    },

    //账单
    {
      path: '/sqzdList',
      name: 'sqzdList',
      component: sqzdList
    }, 
    {
      path: '/sqzdMessage',
      name: 'sqzdMessage',
      component: sqzdMessage
    }, 
    {
      path: '/toNewIndex',
      name: 'toNewIndex',
      component: toNewIndex
    }, 
    {
      path: '/toNewIndexMessage',
      name: 'toNewIndexMessage',
      component: toNewIndexMessage
    }, 
    {
      path: '/toNewList',
      name: 'toNewList',
      component: toNewList
    }, 
    {
      path: '/toNewIndexView',
      name: 'toNewIndexView',
      component: toNewIndexView
    }, 
    {
      path: '/saveTheBill',
      name: 'saveTheBill',
      component: saveTheBill
    }, 
    {
      path: '/saveTheBillList',
      name: 'saveTheBillList',
      component: saveTheBillList
    },
    {
      path: '/settingTheBill',
      name: 'settingTheBill',
      component: settingTheBill
    }, 
    {
      path: '/settingTheBillList',
      name: 'settingTheBillList',
      component: settingTheBillList
    }, 
    {
      path: '/successMessage',
      name: 'successMessage',
      component: successMessage
    },
    {
      path: '/sendInvoice',
      name: 'sendInvoice',
      component: sendInvoice
    },
    //liu feitao
    //changeList 保全变更
    {
      path: '/changeList',
      name: 'changeList',
      component: changeList
    },
    //changeListInfo 保全变更记录
    {
      path: '/changeListInfo',
      name: 'changeListInfo',
      component: changeListInfo
    },
    //changeListApproval 批文信息
    {
      path: '/changeListApproval',
      name: 'changeListApproval',
      component: changeListApproval
    },
    // insureProgress 投保进程查询
    {
      path: '/insureProgress',
      name: 'insureProgress',
      component: insureProgress
    },
    // 账户
    // universal 万能账户

    {
      path: '/universal',
      name: 'universal',
      component: universal
    },

    // universalInfo 万能账户信息
    {
      path: '/universalInfo',
      name: 'universalInfo',
      component: universalInfo
    },
    // survivalWorth 万能账户信息 现有账户价值
    {
      path: '/universalWorth',
      name: 'universalWorth',
      component: universalWorth
    },
    // universalDetial 万能账户信息 现有账户价值 详细信息
    {
      path: '/universalDetial',
      name: 'universalDetial',
      component: universalDetial
    },
    // dividend 分红账户
    {
      path: '/dividend',
      name: 'dividend',
      component: dividend
    },
    // dividendInfo 分红账户信息
    {
      path: '/dividendInfo',
      name: 'dividendInfo',
      component: dividendInfo
    },
    // loanHistory 贷款账户
    {
      path: '/loanHistory',
      name: 'loanHistory',
      component: loanHistory
    },
    // unitLinked 连投账户
    {
      path: '/unitLinked',
      name: 'unitLinked',
      component: unitLinked
    }
    ,
    // unitLinkedInfo 连投账户
    {
      path: '/unitLinkedInfo',
      name: 'unitLinkedInfo',
      component: unitLinkedInfo
    },

    // survival 生存金账户
    {
      path: '/survival',
      name: 'survival',
      component: survival
    },
    // survivalInfo 生存金账户信息
    {
      path: '/survivalInfo',
      name: 'survivalInfo',
      component: survivalInfo
    },

    // yearReport 保单年度报告
    {
      path: '/yearReport',
      name: 'yearReport',
      component: yearReport
    },
    // lostNotice 失效通知书查询
    {
      path: '/lostNotice',
      name: 'lostNotice',
      component: lostNotice
    },
    // lostForever 永久失效通知书查询
    {
      path: '/lostForever',
      name: 'lostForever',
      component: lostForever
    },
    // transferSuc 转账成功通知书查询
    {
      path: '/transferSuc',
      name: 'transferSuc',
      component: transferSuc
    },
    // payFees 缴费提醒查询
    {
      path: '/payFees',
      name: 'payFees',
      component: payFees
    },
    // bounce 退信查询
    {
      path: '/bounce',
      name: 'bounce',
      component: bounce
    },
    // addressNew 地址修改
    {
      path: '/addressNew',
      name: 'addressNew',
      component: addressNew
    },
    // addressOk 地址确认
    {
      path: '/addressOk',
      name: 'addressOk',
      component: addressOk
    },

    //保险服务密码
    //开通
    {
      path: '/insure',
      name: 'insure',
      component: insure
    },
    //开通 拍照
    {
      path: '/toCamera',
      name: 'toCamera',
      component: toCamera
    },
    //开通 错误页面
    {
      path: '/msg',
      name: 'msg',
      component: msg
    },
    //修改和重置
    {
      path: '/modifyRest',
      name: 'modifyRest',
      component: modifyRest
    },
    //个人信息变更
    {
      path: '/phoneChange',
      name: 'phoneChange',
      component: phoneChange
    },
    {
      path: '/emilChange',
      name: 'emilChange',
      component: emilChange
    },
    {
      path: '/homeAdressChange',
      name: 'homeAdressChange',
      component: homeAdressChange
    },
    {
      path: '/companyAdressChange',
      name: 'companyAdressChange',
      component: companyAdressChange
    }, 
    { path: '/clientCardEntTiemChange', name: 'clientCardEntTiemChange', component: clientCardEntTiemChange }, 
    { path: '/uploadCard', name: 'uploadCard', component: uploadCard }, 

    //交费信息变更
    {
      path: '/contactAddress',
      name: 'contactAddress',
      component: contactAddress
    },
    {
      path: '/contactAddressChange',
      name: 'contactAddressChange',
      component: contactAddressChange
    }, 
    //基本服务
    {
      path: '/unbindSelf',
      name: 'unbindSelf',
      component: unbindSelf
    },
    // 自助解绑 历史记录
    {
      path: '/unbindHistory',
      name: 'unbindHistory',
      component: unbindHistory
    },
    // 自助解绑 成功
    {
      path: '/unbindSuc',
      name: 'unbindSuc',
      component: unbindSuc
    },

    //陈
    // 减额交清
    {
      path: '/passwordCheck',
      name: 'passwordCheck',
      component: passwordCheck
    }, {
      path: '/reduceAmountList',
      name: 'reduceAmountList',
      component: reduceAmountList
    }, {
      path: '/reduceAmountDetail',
      name: 'reduceAmountDetail',
      component: reduceAmountDetail
    }, {
      path: '/reduceAmountResult',
      name: 'reduceAmountResult',
      component: reduceAmountResult
    },

    {
      path: '/annuityCollectList',
      name: 'annuityCollectList',
      component: annuityCollectList
    },
    {
      path: '/annuityCollectDetail',
      name: 'annuityCollectDetail',
      component: annuityCollectDetail
    },
    {
      path: '/statusPage',
      name: 'statusPage',
      component: statusPage
    },

    //赵盼预约终止terminateCancelList
    {
      path: "/terminateCancelList",
      name: "terminateCancelList",
      component: terminateCancelList
    },
    //赵盼预约终止中间页
    {
      path: "/terminateCancelInfo",
      name: "terminateCancelInfo",
      component: terminateCancelInfo
    },
    //赵盼预约终止结束页面
    {
      path: "/terminateCancelResult",
      name: "terminateCancelResult",
      component: terminateCancelResult
    },

    //赵盼理赔报案

    {
      path: "/claimReport",
      name: "claimReport",
      component: claimReport
    },
    {
      path: "/userEvaluation",
      name: "userEvaluation",
      component: userEvaluation
    },
    //赵盼理赔报案下一页yiyuanlb
    {
      path: "/xzyiyuan",
      name: "xzyiyuan",
      component: xzyiyuan
    },
    //医院查询列表
    {
      path: "/yiyuanlb",
      name: "yiyuanlb",
      component: yiyuanlb
    },
    {
      path: '/receiveList',
      name: 'receiveList',
      component: receiveList
    }, 
    {
      path: '/accpuntInf',
      name: 'accpuntInf',
      component: accpuntInf
    },
    {
      path: '/changeSuccess',
      name: 'changeSuccess',
      component: changeSuccess
    },
    //通知书方式变更
    { path: '/billChangeSuccess', name: 'billChangeSuccess', component: billChangeSuccess },
    { path: '/billLoseEfficacy', name: 'billLoseEfficacy', component: billLoseEfficacy },
    { path: '/billYearReport', name: 'billYearReport', component: billYearReport },
    { path: '/billLoseEfficacyEver', name: 'billLoseEfficacyEver', component: billLoseEfficacyEver},
    {path: '/infoChangeResult',name: 'infoChangeResult',component: infoChangeResult},
    //红利领取方式变更

    {
      path: '/bonusGetWayChange',
      name: 'bonusGetWayChange',
      component: bonusGetWayChange
    },
    {
      path: '/bonusGetWayChangeInfo',
      name: 'bonusGetWayChangeInfo',
      component: bonusGetWayChangeInfo
    },
    {
      path: '/bonusGetWayChangeApproval',
      name: 'bonusGetWayChangeApproval',
      component: bonusGetWayChangeApproval
    },
    // 赵盼生存金领取
    {
      path: "/ybtScjlqffzhxxOne",
      name: "ybtScjlqffzhxxOne",
      component: ybtScjlqffzhxxOne
    },
    {
      path: "/ybtScjlqffzhxx",
      name: "ybtScjlqffzhxx",
      component: ybtScjlqffzhxx
    },
    {
      path: "/ybtScjlqffzhxxResult",
      name: "ybtScjlqffzhxxResult",
      component: ybtScjlqffzhxxResult
    },
    {
      path: "/paymentAccount",
      name: "paymentAccount",
      component: paymentAccount
    },
    {
      path: "/paymentAccountInfo",
      name: "paymentAccountInfo",
      component: paymentAccountInfo
    },
    {
      path: '/overdueWayChange',
      name: 'overdueWayChange',
      component: overdueWayChange
    },
    {
      path: '/overdueWayChangeEnd',
      name: 'overdueWayChangeEnd',
      component: overdueWayChangeEnd
    },
    // 生存金领取方式变更
    {
      path: '/survivalGetWayChange',
      name: 'survivalGetWayChange',
      component: survivalGetWayChange
    },
    {
      path: '/survivalGetWayChangeInfo',
      name: 'survivalGetWayChangeInfo',
      component: survivalGetWayChangeInfo
    },
    {
      path: '/survivalGetWayChangeEnd',
      name: 'survivalGetWayChangeEnd',
      component: survivalGetWayChangeEnd
    },

    {
      path: "/invesmentAccountIndex",
      name: "invesmentAccountIndex",
      component: invesmentAccountIndex
    },
    {
      path: "/invesmentAccountList",
      name: "invesmentAccountList",
      component: invesmentAccountList
    },
    {
      path: "/invesmentAccountChange",
      name: "invesmentAccountChange",
      component: invesmentAccountChange
    },
    {
      path: "/investmentResult",
      name: "investmentResult",
      component: investmentResult
    },
    // 赵盼红利变更
    {
      path: "/hlbgPage",
      name: "hlbgPage",
      component: hlbgPage

    },
    {
      path: "/hlbgPageTwo",
      name: "hlbgPageTwo",
      component: hlbgPageTwo

    },
    {
      path: "/hlsuccessPage",
      name: "hlsuccessPage",
      component: hlsuccessPage

    },

    //sxy
    {
      path: "/appointmentIndex",
      name: "appointmentIndex",
      component: appointmentIndex
    },
    {
      path: "/appointmentForm",
      name: "appointmentForm",
      component: appointmentForm
    },
    {
      path: "/addressIndex",
      name: "addressIndex",
      component: addressIndex
    },
    {
      path: "/server",
      name: "server",
      component: server
    },
    {
      path: "/city",
      name: "city",
      component: city
    }
  ]
})

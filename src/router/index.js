import Vue from 'vue'
import Router from 'vue-router'
import classic from '@/page/classic'
import messageInquire from '@/page/messageInquire'
import businessHanding from '@/page/businessHanding'

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
import toNewIndexView from '@/page/bill/toNewIndexView'
import saveTheBill from '@/page/bill/saveTheBill'
import saveTheBillList from '@/page/bill/saveTheBillList'
import settingTheBill from '@/page/bill/settingTheBill'
import settingTheBillList from '@/page/bill/settingTheBillList'

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
      path: '/messageInquire',
      name: 'messageInquire',
      component: messageInquire
    }, {
      path: '/mgPlicyInfo',
      name: 'mgPlicyInfo',
      component: mgPlicyInfo
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
    }, {
      path: '/sqzdMessage',
      name: 'sqzdMessage',
      component: sqzdMessage
    }, {
      path: '/toNewIndex',
      name: 'toNewIndex',
      component: toNewIndex
    }, {
      path: '/toNewIndexMessage',
      name: 'toNewIndexMessage',
      component: toNewIndexMessage
    }, {
      path: '/toNewIndexView',
      name: 'toNewIndexView',
      component: toNewIndexView
    }, {
      path: '/saveTheBill',
      name: 'saveTheBill',
      component: saveTheBill
    }, {
      path: '/saveTheBillList',
      name: 'saveTheBillList',
      component: saveTheBillList
    },
    {
      path: '/settingTheBill',
      name: 'settingTheBill',
      component: settingTheBill
    }, {
      path: '/settingTheBillList',
      name: 'settingTheBillList',
      component: settingTheBillList
    },
  ]
})

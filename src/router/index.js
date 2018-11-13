import Vue from 'vue'
import Router from 'vue-router'
import classic from '@/page/classic'
import myGuaranteeSlip from '@/page/policyInfo/myGuaranteeSlip'
import messageInquire from '@/page/messageInquire'
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
    },
  ]
})

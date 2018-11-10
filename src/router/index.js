import Vue from 'vue'
import Router from 'vue-router'
import classic from '@/page/classic'
import myGuaranteeSlip from '@/page/policyInfo/myGuaranteeSlip'
import messageInquire from '@/page/messageInquire'
import mgPlicyInfo from '@/page/policyInfo/mgPlicyInfo'

//理赔
import toLiucheng from '@/page/claims/toLiucheng'

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
    }
  ]
})

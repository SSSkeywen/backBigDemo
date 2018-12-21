import axios from 'axios'
import { apiConfig } from '../api.js'
import { post } from '@/config/http.js'

const getSurvivalGetWayChangeList = 'getSurvivalGetWayChangeList'
const getSurvivalGetWayChangechecked = 'getSurvivalGetWayChangechecked'
const getSurvivalGetWayChangeOrganId = 'getSurvivalGetWayChangeOrganId'
const getSurvivalGetWayAccount = 'getSurvivalGetWayAccount'
const getSurvivalGetWayChangePolicyCodes = 'getSurvivalGetWayChangePolicyCodes'
const getSurvivalGetWayChangeApply = 'getSurvivalGetWayChangeApply'
const getSurvivalGetWayChangeResult = 'getSurvivalGetWayChangeResult'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {

}

const actions = {
    // 首页获取列表
    [getSurvivalGetWayChangeList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
      
        post(apiConfig.api_base_url + 'changesurvivalpaymentway/list', '').then((res) => {
            // console.log(JSON.stringify(res))
            let result = res
            if (result.code == '0') {
                successCallback(result.data)
            } else {
                failCallback()
            }
        }).catch((err) => {
            failCallback(err)
        })
    },
    // 首页选中列表的判断
    [getSurvivalGetWayChangechecked]({ commit }, {policyCodeStr, successCallback = () => { }, failCallback = () => { } }) {
      
        post(apiConfig.api_base_url + 'changesurvivalpaymentway/toupdate/'+policyCodeStr, '').then((res) => {
            console.log(JSON.stringify(res))
            if (res.code == 0) {
                successCallback(res)
            } else {
                failCallback(res)
            }

        }).catch((err) => {
            failCallback(err)
        })
    },

    // 获取银行信息
    [getSurvivalGetWayAccount]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'survivalpayment/getaccount', '').then((res) => {
            // console.log(JSON.stringify(res))
            if (res.code == 0) {
                successCallback(res)
            } else {
                failCallback(res)
            }
        }).catch((err) => {
            // let res = {
            //     code: 1005,//接口异常
            //     msg: '尊敬的用户，数据请求失败，请刷新后重试!',
            // }
            failCallback(err)
        })
    },
    // organId
    [getSurvivalGetWayChangeOrganId]({ commit }, {organId, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'common/getorganname/'+organId, '').then((res) => {
            // console.log(JSON.stringify(res))
            if (res.code == 0) {
                successCallback(res)
            } else {
                failCallback(res)
            }
        }).catch((err) => {
            failCallback(err)
        })
    },

    //保单集合信息
    [getSurvivalGetWayChangePolicyCodes]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'changesurvivalpaymentway/getchoosepolicy', '').then((res) => {
            // console.log(JSON.stringify(res))
            if (res.code == 0) {
                successCallback(res)
            } else {
                failCallback(res)
            }
        }).catch((err) => {
            failCallback(err)
        })
    },

    // 提交 
    [getSurvivalGetWayChangeApply]({ commit }, {parmas, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'changesurvivalpaymentway/apply/', parmas).then((res) => {
            console.log(res)
            if (res.code == 0) {
                successCallback(res)
               
            } else {
                failCallback(res)
            }
        }).catch((err) => {
            failCallback(err)
        })
    },
    // 提交 获取 批文
    [getSurvivalGetWayChangeResult]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'survivalpayment/result', '').then((res) => {
            console.log(res)
            if (res.code == 0) {
                successCallback(res)
            } else {
                failCallback(res)
            }
        }).catch((err) => {
            failCallback(err)
        })
    },
    // getSurvivalGetWayChangeResult
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}
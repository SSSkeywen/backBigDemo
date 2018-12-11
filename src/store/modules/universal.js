import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getUniversalList = 'getUniversalList';
const getUniversalUrl = 'getUniversalUrl';
const getUniversalWorth = 'getUniversalWorth';
const getUniversalDetial = 'getUniversalDetial';
const getUniversalNowWorth = 'getUniversalNowWorth';

const state = {
    ulrData: ''
}

const mutations = {
    
}

const actions = {
    //获取万能账户 险类列表
    [getUniversalList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'cfgx/toGoldAccountIndex', '').then((res) => {
            console.log(res)
            let result = res;
            if (result.code == '0') {
                // window.localStorage.setItem('localData', JSON.stringify(result))
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
    },
    //获取万能账户 url跳转
    [getUniversalUrl]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'cfgx/getGoldAccountCFGXPolicyList/'+typeData).then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
        
    },
    //获取万能账户 价值信息
    [getUniversalWorth]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'cfgx/getGoldAccountCFGXRateInfo',typeData).then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
        
    },
    //获取万能账户 价值信息
    [getUniversalWorth]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'cfgx/getGoldAccountCFGXRateInfo',typeData).then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
        
    },
    //获取万能账户 价值信息 详情 
    [getUniversalDetial]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'cfgx/toGoldAccountCFGXDetailedInfo',typeData).then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(res)
            }

        }).catch((err) => {
            failCallback()
        })
        
    },
    //获取万能账户 现有价值 详情 
    [getUniversalNowWorth]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'cfgx/toGetCFGXDetailInfo',typeData).then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(res)
            }

        }).catch((err) => {
            failCallback()
        })
        
    }
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
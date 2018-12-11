import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const pureinsuredunbind = 'pureinsuredunbind'
const getusermobiletailnumber = 'getusermobiletailnumber'
const getverifycationcode = 'getverifycationcode'
const comparisonverifycode = 'comparisonverifycode'
const querybusoperaionlist = 'querybusoperaionlist'
const launchuntie = 'launchuntie'
const untieimmediately = 'untieimmediately'

const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    ulrData: '/wxqhb/'
}

const mutations = {

}

const actions = {
    //获取用户手机号
    [getusermobiletailnumber]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {

        post(apiConfig.api_base_url + 'untied/getusermobiletailnumber','').then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
            }
        }).catch((err) => {
        })
    },
    //获取短信验证码
    [getverifycationcode]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'untied/getverifycationcode', '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
            }
        }).catch((err) => {
        })
    },
    //校验短信验证码
    [comparisonverifycode]({ commit }, { verifyCode, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'untied/comparisonverifycode', verifyCode).then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
            }
        }).catch((err) => {
        })
    },
    //获取业务操作清单
    [querybusoperaionlist]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'untied/querybusoperaionlist', '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
            }
        }).catch((err) => {
        })
    },
    //发起解绑
    [launchuntie]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'untied/launchuntie', '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
            }
        }).catch((err) => {
        })
    },
    //立即解绑
    [untieimmediately]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'untied/untieimmediately', '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
            }
        }).catch((err) => {
        })
    },
    //解绑
    [pureinsuredunbind]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'untied/pureinsuredunbind', '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
            }
        }).catch((err) => {
        })
    },
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}
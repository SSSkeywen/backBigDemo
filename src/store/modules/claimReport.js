import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const getebaoaninfo = 'getebaoaninfo'
const hospitallist = 'hospitallist'
const hospitalbaoan= 'hospitalbaoan'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    //投/被保人客户信息查询
    [getebaoaninfo]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'lpba/getebaoaninfo1', '').then((res) => {
            console.log(res)
            let result = res;
            console.log("11:"+parseInt(result.code))
            // console.log("11"+result.code == 0)
            if (result.code == 0) {
                successCallback(result)
                 console.log(result)

                // console.log("11"+result.code)
            } else {
                failCallback(result)
   
            }
        }).catch((err) => {
            failCallback(err)
            console.log("00"+err)
        })
    },
    //查询结果医院列表
    [hospitallist]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'lpba/hospitallist', '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
            }
        }).catch((err) => {
            failCallback(result)
        })
    },
    //报案完成
    [hospitalbaoan]({ commit }, { data, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'lpba/hospitalbaoan', data).then((res) => {
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
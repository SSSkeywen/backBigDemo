import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const getaccpuntInf = 'getaccpuntInf'
const getvalidation = 'getvalidation'
const changeSuccess= 'changeSuccess'
const getNameOrg= 'getNameOrg'



const state = {
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    ////发送验证码
    [getaccpuntInf]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'hllq//hlsendauthcode', '').then((res) => {
            console.log(res)
            let result = res;
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
    [getvalidation]({ commit }, {CodeNoData,successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'hllq/hldovalidatephonecode/'+CodeNoData,"" ).then((res) => {
            console.log(res)
            console.log("phoneCodeNoData:"+CodeNoData)
            let result = res;
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
    [changeSuccess]({ commit }, {CodeNoData,successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'hllq/bonuschange',CodeNoData).then((res) => {
            // console.log(res)
            // console.log("changeSuccess:"+CodeNoData)
            let result = res;
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
    [getNameOrg]({ commit }, {orangeId,successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'orange/get/'+orangeId,).then((res) => {
            let result = res;
            if (result.code == 0) {
                successCallback(result)
                 console.log(result)
            } else {
                failCallback(result)
   
            }
        }).catch((err) => {
            failCallback(err)
            console.log("00"+err)
        })
    },
    
}

const getters = {
    
}
export default {
    state,
    mutations,
    actions,
    getters,
    getNameOrg
}
import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const changePhone = 'changePhone'
const changeInformation = 'changeInformation'
const clientCardChange = 'clientCardChange'
const isClientCardChange = 'isClientCardChange'
const getWxConfig = 'getWxConfig'


const state = {
}

const mutations = {
    
}

const actions = {
    [changePhone]({ commit }, { phoneData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'icc/sjbg', phoneData).then((res) => {
            let result = res.data
            if (res.code == '0') {
                successCallback(result)
            } else {
                failCallback(res.msg)
            }
        }).catch((err) => {
            failCallback(err)
        })
    },

    //基本信息变更
    [changeInformation]({ commit }, { phoneData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'icc/jbxxbg/' + phoneData.address, phoneData.data).then((res) => {
            console.log(res)
            let result = res.data
            if (res.code == '0') {
                successCallback(result)
            } else {
                failCallback(res.msg)
            }
        }).catch((err) => {
            failCallback(err)
        })
    },

    //客户身份证有效期变更
    [clientCardChange]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'changecredentials/list', '').then((res) => {
            let result = res.data
            if (res.code == '0') {
                successCallback(result)
            } else {
                failCallback(res.msg)
            }
        }).catch((err) => {
            failCallback(err)
        })
    },

    //客户身份证有效期变更判断
    [isClientCardChange]({ commit }, { changeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'changecredentials/iscanchange', changeData).then((res) => {
            let result = res
            console.log(res)
            if (res.code == '0') {
                successCallback(result)
            } else {
                failCallback(res.msg)
            }
        }).catch((err) => {
            failCallback(err)
        })
    },

    //获取客户身份信息调用微信API
    // [getWxConfig]({ commit }, { url, successCallback = () => { }, failCallback = () => { } }) {
    //     post(apiConfig.api_base_url + 'common/wxconfig', url).then((res) => {
    //         let result = res
    //         console.log(res)
    //         if (res.code == '0') {
    //             successCallback(result)
    //         } else {
    //             failCallback(res.msg)
    //         }
    //     }).catch((err) => {
    //         failCallback(err)
    //     })
    // },

}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
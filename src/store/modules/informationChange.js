import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const changePhone = 'changePhone'
const changeInformation = 'changeInformation'
const clientCardChange = 'clientCardChange'
const isClientCardChange = 'isClientCardChange'
const getClientInfometion = 'getClientInfometion'
const getEndTime = 'getEndTime'
const changeClientMessage = 'changeClientMessage'


const state = {
}

const mutations = {
    
}

const actions = {
    [getClientInfometion]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'icc/jbxxinit', '').then((res) => {
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
        console.log(phoneData.data)
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

    //获取客户身份信息
    [getEndTime]({ commit }, { serverIdList, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'changecredentials/uploadimgs/' + serverIdList.serverId1 + ',' + serverIdList.serverId2).then((res) => {
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

    //客户身份信息变更
    [changeClientMessage]({ commit }, { changeTimeDate, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'changecredentials/submit', changeTimeDate).then((res) => {
            let result = res
            console.log(res)
            if (res.code == '0') {
                successCallback(result.data)
            } else {
                failCallback(res.msg)
            }
        }).catch((err) => {
            failCallback(err)
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
import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

//本页为账单/发票目录下的页面的所有接口和数据

const getToNewIndexList = 'getToNewIndexList'
const getToNewIndexListMsg = 'getToNewIndexListMsg'
const getBillList = 'getBillList'
const setEndTitem = 'setEndTitem'
const applyInvoice = 'applyInvoice'
const LookApplyInvoice = 'LookApplyInvoice'
const sendEmail = 'sendEmail'


const state = {
    ulrData: '/wxqhb/',
    xqDataList: null,
}

const mutations = {
    [setEndTitem](key, value) {
        let curTime = new Date().getTime()
        window.localStorage.setItem(value.name, JSON.stringify({ data: value, time: curTime }))
    }
}

const actions = {
    //获取保单的列表的详细信息
    [getBillList]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'dzfp/' + typeData, '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result.data)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
    },

    //申请电子发票
    [applyInvoice]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'dzfp/elec', typeData).then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result.data)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
    },

    //查看电子发票
    [LookApplyInvoice]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'dzfp/downtionpdf', typeData).then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result.data)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
    },

    //发送Email
    [sendEmail]({ commit }, { emailAddress, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'dzfp/sendmail', emailAddress).then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result.data)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
    },

    //获取续期账单的列表
    [getToNewIndexList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'dzfp/', '')
            .then((res) => {
                let result = res
                if (result.code == '0') {
                    successCallback(result.data)
                    // state.xqDataList = result
                    // result.result.name = 'xqDataList'
                    // commit(setEndTitem, result.result)
                } else {
                    failCallback()
                }

            }).catch((err) => {
                failCallback()
            })
    },

    //获取续期账单的列表的详细信息
    [getToNewIndexListMsg]({ commit }, { xqPolicyCode, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'dzfp/toXufeiAccountDetails/' + xqPolicyCode, '')
            .then((res) => {
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
}

const getters = {
    xqDataList(state) {
        return state.xqDataList
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}
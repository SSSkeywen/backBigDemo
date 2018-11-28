import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

//本页为账单/发票目录下的页面的所有接口和数据

const getToNewIndexList = 'getToNewIndexList'
const getToNewIndexListMsg = 'getToNewIndexListMsg'
const getBillList = 'getBillList'
const setEndTitem = 'setEndTitem'


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
    //获取首期账单的列表的详细信息
    [getBillList]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'policy/BillInquirylist/' + typeData, '').then((res) => {
            console.log(res)
            let result = res
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
        // axios({
        //     method: 'post',
        //     url: apiConfig.api_base_url + 'policy/BillInquirylis/' + typeData,
        //     data: '',
        //     "Content-Type": "multipart/form-data"
        // }).then((res) => {
        //     console.log(res)
        //     let result = res.data
        //     if (result.responseCode == '0') {
        //         successCallback(result)
        //     } else {
        //         failCallback()
        //     }

        // }).catch((err) => {
        //     failCallback()
        // })
    },
    //获取续期账单的列表
    [getToNewIndexList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        // post(apiConfig.api_base_url + 'xufeibill/toXufeiAccountList', '')
        //     .then((res) => {
        //         let result = res
        //         if (result.responseCode == '0') {
        //             successCallback(result)
        //             state.xqDataList = result
        //             result.result.name = 'xqDataList'
        //             commit(setEndTitem, result.result)
        //         } else {
        //             failCallback()
        //         }

        //     }).catch((err) => {
        //         failCallback()
        //     })
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'xufeibill/toXufeiAccountList',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result)
                state.xqDataList = result
                console.log(commit)
                result.result.name = 'xqDataList'
                commit(setEndTitem,result.result)
                // window.localStorage.setItem('xqDataList', JSON.stringify(result.result))
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
    },

    //获取续期账单的列表的详细信息
    [getToNewIndexListMsg]({ commit }, { xqPolicyCode, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'xufeibill/toXufeiAccountDetails/' + xqPolicyCode, '')
            .then((res) => {
                let result = res
                if (result.responseCode == '0') {
                    successCallback(result)
                } else {
                    failCallback()
                }

            }).catch((err) => {
                failCallback()
            })
        // axios({
        //     method: 'post',
        //     url: apiConfig.api_base_url + 'xufeibill/toXufeiAccountDetails/' + xqPolicyCode,
        //     data: '',
        //     "Content-Type": "multipart/form-data"
        // }).then((res) => {
        //     console.log(res)
        //     let result = res.data
        //     if (result.responseCode == '0') {
        //         successCallback(result)
        //     } else {
        //         failCallback()
        //     }

        // }).catch((err) => {
        //     failCallback()
        // })
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
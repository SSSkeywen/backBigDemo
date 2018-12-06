import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const hospitalInformation = 'hospitalInformation'
const hospitalList = 'hospitalList'
const lawCaseListFn = 'lawCaseListFn'
const caseListmessage = 'caseListmessage'


const state = {
}

const mutations = {
    
}

const actions = {
    // 案件进度
    [lawCaseListFn]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'claim/querydata', '').then((res) => {
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result.msg)
            }
        }).catch((err) => {
            failCallback()
        })
    },

    // 案件进度详情
    [caseListmessage]({ commit }, {caseListmessageData, successCallback = () => { }, failCallback = () => { } }) {
        
        post(apiConfig.api_base_url + 'claim/querycaseinfo', caseListmessageData).then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result.msg)
            }
        }).catch((err) => {
            failCallback()
        })
    },

    //省市信息
    [hospitalInformation]({ commit }, { provinceSelectData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'hospitalinformation/querycitylist', provinceSelectData).then((res) => {
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
    //查询结果医院列表
    [hospitalList]({ commit }, {hospitalSelectData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'hospitalinformation/queryhospitallist', hospitalSelectData).then((res) => {
            console.log(res)
            // let result = res.data
            if (res.code == '0') {
                successCallback(res)
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
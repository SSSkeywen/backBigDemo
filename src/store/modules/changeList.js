//import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getChangeList = 'getChangeList'
const getChangeListInfo = 'getChangeListInfo'
const getChangeListApprovalMsg = 'getChangeListApprovalMsg'


const state = {
    //ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    ulrData: '/wxqhb/',
    xqDataList: null
}

const mutations = {
    
}

const actions = {
    [getChangeList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'bqbgrecord/list', '').then((res) => {
            console.log(res)
            //let result = res.data
            if (res.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(res.msg)
            }
        }).catch((err) => {
            failCallback("尊敬的用户，数据请求失败，请刷新后重试!")
        })
        // axios({
        //     method: 'get',
        //     url: state.ulrData + 'changelist/bqChangeRecordList.html',
        //   // url: state.ulrData + 'policy/toPolicyListVue.html',
        //     data: '',
        //     "Content-Type": "multipart/form-data"
        // }).then((res) => {
        //     console.log(res)
        //     let result = res.data
        //     if (result.responseCode == '0') {
        //         successCallback(result)
        //     } else {
        //     }

        // }).catch((err) => {
        // })
    },
    [getChangeListInfo]({ commit }, {policyCode, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'bqbgrecord/details/' + policyCode ,'').then((res) => {
            console.log(res)
            // let result = res.data
            if (res.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(res.msg)
            }

        }).catch((err) => {
            failCallback("尊敬的用户，数据请求失败，请刷新后重试!")
        })
        // axios({
        //     method: 'post',
        //     url: state.ulrData + 'changelist/bqChangeRecordDetails.html',
        //     data: policyCodeData,
        //     "Content-Type": "multipart/form-data"
        // }).then((res) => {
        //     console.log(res)
        //     let result = res.data
        //     if (result.responseCode == '0') {
        //         successCallback(result)
        //     } else {
        //     }

        // }).catch((err) => {
        // })
    },
    [getChangeListApprovalMsg]({ commit }, {noticeCode, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'bqbgrecord/getpw/' + noticeCode  ,'').then((res) => {
            console.log(res)
            if (res.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(res.msg)
            }
        }).catch((err) => {
            failCallback("尊敬的用户，数据请求失败，请刷新后重试!")
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
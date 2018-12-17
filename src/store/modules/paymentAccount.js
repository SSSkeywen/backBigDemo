import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const paymentAccountList = "paymentAccountList"
const getbankandorganlist = "getbankandorganlist" //1.3.3 收费账号获得机构和银行名称
const authquerysfzh = "authquerysfzh" // 1.3.5 收付平台鉴权查询
const sendauthvcodesfzh = "sendauthvcodesfzh" //1.3.7 收付平台鉴权发送手机验证码
const authenticationsfzh = "authenticationsfzh"
const postupdatepolicylist = "postupdatepolicylist" // 缴费账号变更申请

// http://10.7.181.184:8090/nwxqhb/api/v2/arfandyearchange/info/1012256,1100225323
const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    // ulrData: 'http://10.7.181.184:8090/nwxqhb/api/v2/'
}

const mutations = {

}

const actions = {
    [paymentAccountList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + '/jfzh/getupdatepolicyzh', '').then((res) => {
            let result = res
            console.log('paymentAccountListresult', result)
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
        })
    },
    [getbankandorganlist]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + '/jfzh/getbankandorganlist', '').then((res) => {
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
        })
    },
    [authquerysfzh]({ commit }, { editdata, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'jfzh/authquerysfzh/',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
        })
    },
    [sendauthvcodesfzh]({ commit }, { editdata, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'jfzh/sendauthvcodesfzh/',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(res)
            }

        }).catch((err) => {
        })
    },
    [authenticationsfzh]({ commit }, { editdata, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'jfzh/authenticationsfzh/',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log('authenticationsfzh', res)
            if (res.status == '200') {
                successCallback(res)
            } else {
                failCallback(res)
            }

        }).catch((err) => {
        })
    },
    [postupdatepolicylist]({ commit }, { editdata, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'jfzh/postupdatepolicylist/',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log('postupdatepolicylist', res)
            if (res.status == '200') {
                successCallback(res)
            } else {
                failCallback(res)
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
import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getReduceAmountList = "getReduceAmountList"
const getReduceAmountChangeInfo = "getReduceAmountChangeInfo"
const reduceAmountPay = "reduceAmountPay"

// http://10.7.181.184:8090/nwxqhb/api/v2/arfandyearchange/info/1012256,1100225323
const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    // ulrData: 'http://10.7.181.184:8090/nwxqhb/api/v2/'
}

const mutations = {
    
}

const actions = {
    [getReduceAmountList]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'jejq/getreduceamountlist', '').then((res) => {
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
        })
    },
    [getReduceAmountChangeInfo]({ commit }, {editdata, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'jejq/getreduceamountchangeinfo/',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data.data)
            } else {
                failCallback(res.data)
            }

        }).catch((err) => {
        })
    },
    [reduceAmountPay]({ commit }, {editdata, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'jejq/reduceamountpay',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data.data)
            } else {
                failCallback(res.data)
            }

        }).catch((err) => {
        })
    }
   
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
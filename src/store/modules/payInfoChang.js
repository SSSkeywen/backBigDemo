/**
 *  收费变更获取数据js
 * 2018-12-14  文飞创建
 *  */

import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const getPayInfomation = 'getPayInfomation'
const changeAddress = 'changeAddress'


const state = {
}

const mutations = {
    
}

const actions = {
    //获取变更地址列表
    [getPayInfomation]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'chargeaddress/querylist', '').then((res) => {
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

    //地址变更
    [changeAddress]({ commit }, { phoneData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'chargeaddress/changeaddress', phoneData).then((res) => {
            console.log(res)
            let result = res
            if (res.code == '0') {
                successCallback(result)
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
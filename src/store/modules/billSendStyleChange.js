/**
 *  通知书发送方式变更js
 * 2018-12-14  文飞创建
 *  */


import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const billChangeFn = 'billChangeFn'
const billChangeInformation = 'billChangeInformation'
const billChangeEverFn = 'billChangeEverFn'


const state = {
}

const mutations = {
    
}

const actions = {
    [billChangeFn]({ commit }, { postId, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'reportnotice/query/' + postId,'' ).then((res) => {
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

    //永久
    [billChangeEverFn]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'reportnotice/querylosenote', '').then((res) => {
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

    //信息变更
    [billChangeInformation]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'reportnotice/update', typeData).then((res) => {
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

}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
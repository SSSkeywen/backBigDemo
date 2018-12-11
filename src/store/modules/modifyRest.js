import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getPasswordModify = 'getPasswordModify';
const getPasswordRest = 'getPasswordRest';

const state = {

}

const mutations = {
    
}

const actions = {
    //获取保全服务密码修改地址 
    [getPasswordModify]({ commit }, {  successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'jumppage/xgmm', '').then((res) => {
            console.log(res)
            let result = res;
            if (result.code == '2005') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
    },
    //获取保全服务密码 重置地址 
    [getPasswordRest]({ commit }, {  successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'jumppage/czmm', '').then((res) => {
            console.log(res)
            let result = res;
            if (result.code == '2006') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
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
import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getUnitLinked = 'getUnitLinked';
// const getUnitLinkedDetail = 'getUnitLinkedDetail';

const state = {

}

const mutations = {
    
}

const actions = {
    //获取投连账户
    [getUnitLinked]({ commit }, {  successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'investmentaccount/getlist', '').then((res) => {
            console.log(res)
            let result = res;
            if (result.code == '0') {
                successCallback(result)
                // ajax数据 存储在localstore 备用
                window.localStorage.setItem('unitLinkedlist', JSON.stringify(result))
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
    },
    // //获取投连账户 详情
    // [getUnitLinkedDetail]({ commit }, { typeData, successCallback = () => { }, failCallback = () => { } }) {
    //     post(apiConfig.api_base_url + 'cfgx/getGoldAccountCFGXRateInfo',typeData).then((res) => {
    //         console.log(res)
    //         let result = res
    //         if (result.code == '0') {
    //             successCallback(result)
    //         } else {
    //             failCallback()
    //         }

    //     }).catch((err) => {
    //         failCallback()
    //     })
        
    // }
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
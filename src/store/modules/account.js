import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getLatesTwo = 'getLatesTwo'
const getDevidentaccInfo = 'getDevidentaccInfo'

const state = {
    ulrData: '/wxqhb/'
}

const mutations = {

}

const actions = {
    // getLates(sCallback){
    //     HTTP.request({
    //         url: '/toTaxExtensionPensionIndex.html',
    //         methods:'post',
    //         success: (res) => {
    //             sCallback(res)
    //         },
    //         failCallback:(res) => {
    //         }
    //     })
    // },
    [getLatesTwo]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
      
        post(apiConfig.api_base_url + 'devidentacc/list', '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
        })
    },
    [getDevidentaccInfo]({ commit }, { data, successCallback = () => { }, failCallback = () => { } }) {
        
        post(apiConfig.api_base_url + 'devidentacc/info', data).then((res) => {
            console.log(res)
            let result = res
            if (result.code == 0) {
                successCallback(result)
            } else {
                failCallback(result)
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
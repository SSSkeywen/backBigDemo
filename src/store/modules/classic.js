import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const getClientMessage = 'getClientMessage'


const state = {
    // ulrData: '/wxqhb/'
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
    [getClientMessage]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'page/tonewpagemenu', '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
        // axios({
        //     method: 'post',
        //     url: state.ulrData + 'page/toNewPageMenu.html',
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
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
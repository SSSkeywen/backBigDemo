import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const getClientMessage = 'getClientMessage'
const getJumpAddress = 'getJumpAddress'
const towtdecoder = 'towtdecoder'
const txmscanresultcode = 'txmscanresultcode'


const state = {
}

const mutations = {
    
}

const actions = {
    [getClientMessage]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        get(apiConfig.api_base_url + 'page/tonewpagemenu', '').then((res) => {
            let result = res.data
            if (res.code == '0') {
                window.localStorage.clear()
                // window.localStorage.setItem('clientMsg', JSON.stringify(result))
                window.localStorage.setItem('isBinding', JSON.stringify(result.isBinding))
                successCallback(result)
            } else {
                failCallback(res.msg)
            }

        }).catch((err) => {
            failCallback(err)
        })
    },


    [getJumpAddress]({ commit }, { newAddress, successCallback = () => { }, failCallback = () => { } }) {

        post(apiConfig.api_base_url + '/jumppage/topassword?url='+newAddress,'').then((res) => {
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

    [towtdecoder]({ commit }, { data, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'jumppage/towtdecoder/' +data ).then((res) => {
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

    //扫一扫入库
    [txmscanresultcode]({ commit }, { insertrvslData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'mainscan/txmscanresultcode', insertrvslData).then((res) => {
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
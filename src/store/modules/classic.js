import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const getClientMessage = 'getClientMessage'
const getJumpAddress = 'getJumpAddress'


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
        get(apiConfig.api_base_url + '/jumppage/topassword', newAddress).then((res) => {
            let result = res.data
            if (res.code == '0') {
                // window.localStorage.clear()
                // // window.localStorage.setItem('clientMsg', JSON.stringify(result))
                // window.localStorage.setItem('isBinding', JSON.stringify(result.isBinding))
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
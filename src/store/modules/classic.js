import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const getClientMessage = 'getClientMessage'


const state = {
}

const mutations = {
    
}

const actions = {
    [getClientMessage]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        get(apiConfig.api_base_url + 'page/tonewpagemenu', '').then((res) => {
            console.log(res)
            let result = res.data
            if (res.code == '0') {
                window.localStorage.setItem('clientMsg', JSON.stringify(result))
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
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
            // console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
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
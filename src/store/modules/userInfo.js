import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const checklogin = 'checklogin'


const state = {
}

const mutations = {
    
}

const actions = {
    [checklogin]({ commit }, {testData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'user/checklogin', testData).then((res) => {
            console.log(res)
            let result = res.data
            if (res.code == '0') {
                window.localStorage.setItem('clientMsg', JSON.stringify(result))
                successCallback(result)
            } else {
                failCallback(res.msg)
            }

        }).catch((err) => {
            failCallback(res.msg)
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
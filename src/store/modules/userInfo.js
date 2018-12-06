import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const checklogin = 'checklogin'
const loginverificationcode = 'loginverificationcode'
const phonewsercode = 'phonewsercode'


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
            failCallback(err)
        })
    },
    //用户发送验证码进行身份验证
    [loginverificationcode]({ commit }, { phoneNoData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'user/loginverificationcode', phoneNoData).then((res) => {
            console.log(res)
            let result = res.data
            if (res.code == '0') {
                // window.localStorage.setItem('clientMsg', JSON.stringify(result))
                successCallback(result)
            } else {
                failCallback(res.msg)
            }

        }).catch((err) => {
            failCallback(err)
        })
    },

    //验证用户验证码进行绑定
    [phonewsercode]({ commit }, { phoneCodeNoData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'user/phonewsercode', phoneCodeNoData).then((res) => {
            console.log(res)
            let result = res.data
            if (res.code == '0') {
                // window.localStorage.setItem('clientMsg', JSON.stringify(result))
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
import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const changePhone = 'changePhone'
const changeInformation = 'changeInformation'


const state = {
}

const mutations = {
    
}

const actions = {
    [changePhone]({ commit }, { phoneData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'icc/sjbg', phoneData).then((res) => {
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

    //基本信息变更
    [changeInformation]({ commit }, { phoneData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'icc/jbxxbg/' + phoneData.address, phoneData.data).then((res) => {
            console.log(res)
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

}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
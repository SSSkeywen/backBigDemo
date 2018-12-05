// import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getSurvivalList = 'getSurvivalList'
const getSurvivalListInfo = 'getSurvivalListInfo'


const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
}

const mutations = {
    
}

const actions = {
    [getSurvivalList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'survivalgold/getlist', '').then((res) => {
            console.log(res)
            if (res.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(res.msg)
            }

        }).catch((err) => {
            failCallback("尊敬的用户，数据请求失败，请刷新后重试!")
        })
    },
    [getSurvivalListInfo]({ commit }, {policyCode, successCallback = () => { }, failCallback = () => { } }) {
        console.info("policyCode:"+policyCode)
        post(apiConfig.api_base_url + 'survivalgold/getinfo/' + policyCode, '').then((res) => {
            if (res.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(res.msg)
            }

        }).catch((err) => {
            failCallback("尊敬的用户，数据请求失败，请刷新后重试!")
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
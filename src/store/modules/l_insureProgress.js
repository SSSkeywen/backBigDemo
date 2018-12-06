import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getInsureProgressList = 'getInsureProgressList'
const insureStaQueByPolicyCode = 'insureStaQueByPolicyCode'


const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    [getInsureProgressList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        
        post(apiConfig.api_base_url + 'tbjc/insurestaquebycustomerlist', '').then((res) => {
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
    [insureStaQueByPolicyCode]({ commit }, {policyCodeData, successCallback = () => { }, failCallback = () => { } }) {
        
            post(apiConfig.api_base_url + 'tbjc/insurestaquebypolicycode', policyCodeData).then((res) => {
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
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
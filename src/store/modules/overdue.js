import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const overDueQuery = 'overDueQuery'
const overDueUpdate = 'overDueUpdate'

const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    ulrData: '/wxqhb/'
}

const mutations = {

}

const actions = {
    // 获取保费逾期未付处理方式列表
    [overDueQuery]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'bfyqwzf/queryoverduemanage','').then((res) => {
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
    //保费逾期未付处理方式确认变更
    [overDueUpdate]({ commit }, {policyList, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'bfyqwzf/updateoverdueapproach',policyList).then((res) => {
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
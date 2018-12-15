import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const toBindUserUpdate = 'toBindUserUpdate'

const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    ulrData: '/wxqhb/'
}

const mutations = {

}

const actions = {
    //绑定账号变更跳转
    [toBindUserUpdate]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {

        post(apiConfig.api_base_url + 'jumppage/binduserupdate','').then((res) => {
            console.log(res)
            let result = res
            if (result.code == 2007) {
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
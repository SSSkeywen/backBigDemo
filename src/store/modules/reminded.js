import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const insertrvsl = 'insertrvsl'
const scanqrcode = 'scanqrcode'


const state = {
}

const mutations = {
    
}

const actions = {
    
    //扫一扫入库
    [insertrvsl]({ commit }, { insertrvslData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'sweepcode/insertrvsl', insertrvslData).then((res) => {
            let result = res
            if (res.code == '0') {
                successCallback(result)
            } else {
                failCallback(res.msg)
            }

        }).catch((err) => {
            failCallback(err)
        })
    },

    //扫一扫
    [scanqrcode]({ commit }, { scanqrcodeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'sweepcode/scanqrcode', scanqrcodeData).then((res) => {
            let result = res
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
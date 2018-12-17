import axios from 'axios'
import { apiConfig } from '../../api.js'
import { get, post } from '@/config/http.js'

const getBonusGetWayChangeList = 'getBonusGetWayChangeList'
const getBonusGetWayChangechecked = 'getBonusGetWayChangechecked'
const getOrgenName = 'getOrgenName'
const updateBonusGetWay = 'updateBonusGetWay'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {

}

const actions = {
    
    [getBonusGetWayChangeList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
      
        post(apiConfig.api_base_url + 'dividentpaymentedit/list', '').then((res) => {
            console.log(JSON.stringify(res))
            if (res.code == 0) {
                successCallback(res.data)
            } else {
                failCallback(res)
            }

        }).catch((err) => {
            let res = {
                code: 1005,//接口异常
                msg: '尊敬的用户，数据请求失败，请刷新后重试!',
            }
            failCallback(res)
        })
    },
    [getBonusGetWayChangechecked]({ commit }, {policyCodeStr, successCallback = () => { }, failCallback = () => { } }) {
      
        post(apiConfig.api_base_url + 'dividentpaymentedit/info/'+policyCodeStr, '').then((res) => {
            console.log(JSON.stringify(res))
            if (res.code == 0) {
                successCallback(res.data)
            } else {
                failCallback(res)
            }

        }).catch((err) => {
            let res = {
                code: 1005,//接口异常
                msg: '尊敬的用户，数据请求失败，请刷新后重试!',
            }
            failCallback(res)
        })
    },
    [getOrgenName]({ commit }, {organId, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'orange/get/'+organId, '').then((res) => {
            console.log(JSON.stringify(res))
            if (res.code == 0) {
                successCallback(res.data)
            } else {
                failCallback(res)
            }
        }).catch((err) => {
            let res = {
                code: 1005,//接口异常
                msg: '尊敬的用户，数据请求失败，请刷新后重试!',
            }
            failCallback(res)
        })
    },
    [updateBonusGetWay]({ commit }, {param, successCallback = () => { }, failCallback = () => { } }) {
        console.log("红利变更入参："+JSON.stringify(param));
        post(apiConfig.api_base_url + 'dividentpaymentedit/update', param).then((res) => {
            console.log(JSON.stringify(res))
            if (res.code == 0) {
                successCallback(res.data)
            } else {
                failCallback(res)
            }
        }).catch((err) => {
            let res = {
                code: 1005,//接口异常
                msg: '尊敬的用户，数据请求失败，请刷新后重试!',
            }
            failCallback(res)
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
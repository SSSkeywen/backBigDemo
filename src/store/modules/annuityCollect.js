import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const arfandyearchangeList = "arfandyearchangeList"
const arfandyearchangeDetail = "arfandyearchangeDetail"
const arfandyearchangeStatus = "arfandyearchangeStatus"

// http://10.7.181.184:8090/nwxqhb/api/v2/arfandyearchange/info/1012256,1100225323
const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    // ulrData: 'http://10.7.181.184:8090/nwxqhb/api/v2/'
}

const mutations = {
    
}

const actions = {
    [arfandyearchangeList]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'arfandyearchange/list', '').then((res) => {
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
    [arfandyearchangeDetail]({ commit }, { policyCodeItem, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'arfandyearchange/info/' + policyCodeItem, '').then((res) => {
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
    // [arfandyearchangeStatus]({ commit }, { editdata, successCallback = () => { }, failCallback = () => { } }) {
    //     post(apiConfig.api_base_url + 'arfandyearchange/edit/' + editdata, '').then((res) => {
    //         console.log(res)
    //         let result = res
    //         if (result.code == '0') {
    //             successCallback(result)
    //         } else {
    //             failCallback()
    //         }

    //     }).catch((err) => {
    //         failCallback()
    //     })
       
    // },
    [arfandyearchangeStatus]({ commit }, {editdata, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'arfandyearchange/edit/',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data.data)
            } else {
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
import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getList = "getList" //获得投连可转换保单列表
const queryinfo = "queryinfo"
const getaccountname = "getaccountname"
const putaccountname = "putaccountname"
const numberunitschange = "numberunitschange"
const getapproval = "getapproval"

// http://10.7.181.184:8090/nwxqhb/api/v2/arfandyearchange/info/1012256,1100225323
const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    // ulrData: 'http://10.7.181.184:8090/nwxqhb/api/v2/'
}

const mutations = {
    
}

const actions = {
    [getList]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'investacoutconversion/getlist',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data.data)
            } else {
                failCallback(res.data.msg)
            }

        }).catch((err) => {
        })
    },
    [queryinfo]({ commit }, {editdata,successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'investacoutconversion/queryinfo/',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data.data)
            } else {
                failCallback(res.data.msg)
            }

        }).catch((err) => {
        })
    },
    [getaccountname]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'investacoutconversion/getaccountname',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data.data)
            } else {
                failCallback(res.data.msg)
            }

        }).catch((err) => {
        })
    },
    
    [getapproval]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'investacoutconversion/getapproval/',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data.data)
            } else {
                failCallback(res.data.msg)
            }

        }).catch((err) => {
        })
    },
    [putaccountname]({ commit }, {editdata,successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'investacoutconversion/putaccountname/',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data.data)
            } else {
                failCallback(res.data.msg)
            }

        }).catch((err) => {
        })
    },


    [numberunitschange]({ commit }, {editdata,successCallback = () => { }, failCallback = () => { } }) {
        
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'investacoutconversion/numberunitschange',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(res.data.msg)
            }

        }).catch((err) => {
            console.log('err', err)
        })
    },

    // [numberunitschange]({ commit }, { editdata, successCallback = () => { }, failCallback = () => { } }) {
    //     console.log(editdata)
    //     post(apiConfig.api_base_url + 'investacoutconversion/numberunitschange', editdata).then((res) => {
    //         let result = res
    //         console.log('result', result)
    //         if (result.code == '0') {
    //             successCallback(result)
    //         } else {
    //             failCallback()
    //         }

    //     }).catch((err) => {
    //         failCallback()
    //     })
       
    // },
    
    // [numberunitschange]({ commit }, {editdata,successCallback = () => { }, failCallback = () => { } }) {
    //     axios({
    //         method: 'post',
    //         url: apiConfig.api_base_url + 'investacoutconversion/numberunitschange/',
    //         data: editdata,
    //         "Content-Type": "application/json"
    //     }).then((res) => {
    //         console.log('res', res.data.code)
    //         if (res.data.code == '0') {
    //             successCallback(res.data.data)
    //         } else {
    //             console.log('zzz')
    //             failCallback(res.data.msg)
    //         }

    //     }).catch((err) => {
    //     })
    // }
   

   
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
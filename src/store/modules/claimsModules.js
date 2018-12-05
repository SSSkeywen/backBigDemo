import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const hospitalInformation = 'hospitalInformation'
const hospitalList = 'hospitalList'
const lawCaseListFn = 'lawCaseListFn'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    // 案件进度
    [lawCaseListFn]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'claim/querydata', '').then((res) => {
            console.log(res)
            let result = res
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback()
            }
        }).catch((err) => {
            failCallback()
        })
    },
    //省市信息
    [hospitalInformation]({ commit }, { provinceSelectData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'hospitalinformation/querycitylist', provinceSelectData).then((res) => {
            console.log(res)
            let result = res.data
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(res.msg)
            }
        }).catch((err) => {
            failCallback(res.msg)
        })
        // axios({
        //     method: 'post',
        //     url: state.ulrData + 'sett/city/cityNamelist.html',
        //     data: provinceSelectData,
        //     "Content-Type": "multipart/form-data"
        // }).then((res) => {
        //     console.log(res)
        //     let result = res.data
        //     if (result.responseCode == '0') {
        //         successCallback(result)
        //     } else {
        //         failCallback()
        //     }

        // }).catch((err) => {
        //     failCallback()
        // })
    },
    //查询结果医院列表
    [hospitalList]({ commit }, {hospitalSelectData, successCallback = () => { }, failCallback = () => { } }) {
        post(state.ulrData + 'hospitalinformation/queryhospitallist', hospitalSelectData).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback(res.msg)
            }
        }).catch((err) => {
            failCallback(res.msg)
        })
        // axios({
        //     method: 'post',
        //     url: state.ulrData + 'sett/hospital/Hospitalxxlist.html',
        //     data: hospitalSelectData,
        //     "Content-Type": "multipart/form-data"
        // }).then((res) => {
        //     console.log(res)
        //     let result = res.data
        //     if (result.responseCode == '0') {
        //         successCallback(result)
        //     } else {
        //         failCallback()
        //     }

        // }).catch((err) => {
        //     failCallback()
        // })
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
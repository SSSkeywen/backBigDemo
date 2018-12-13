import axios from 'axios'
// import {HTTP} from '@/config/http.js'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getLates = 'getLates'
const getPolicyInfo = 'getPolicyInfo'


const state = {
    ulrData: '/'
}

const mutations = {

}

const actions = {
    // getLates({sCallback=()=>{}}){
    //     HTTP.request({
    //         url: 'policy/toPolicyListVue.html',
    //         methods:'post',
    //         success: (res) => {
    //             console.log(res)
    //             sCallback(res)
    //         },
    // failCallback:(res) => {
    // }
    // })
    // },
    // [getLates]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
    //     axios({
    //         method: 'post',
    //         url: state.ulrData + 'policy/toPolicyListVue.html',
    //         data: '',
    //         "Content-Type": "multipart/form-data"
    //     }).then((res) => {
    //         console.log(res)
    //         let result = res.data
    //         if (result.responseCode == '0') {
    //             successCallback(result)
    //         } else {
    //             failCallback()
    //         }

    //     }).catch((err) => {
    //         failCallback()
    //     })
    // },
    [getLates]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        console.log(111)
        post(apiConfig.api_base_url + 'policy/list', '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
            failCallback(res)
        })
    },
    //获取详情
    [getPolicyInfo]({ commit }, { policyCodeData, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'policy/newpolicyinfo/' + policyCodeData, '').then((res) => {
            console.log(res)
            let result = res
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
            failCallback()
        })
        //     axios({
        //         method: 'post',
        //         url: state.ulrData + 'policy/newpolicyInfoVue.html',
        //         data: policyCodeData,
        //         "Content-Type": "multipart/form-data"
        //     }).then((res) => {
        //         console.log(res)
        //         let result = res.data
        //         if (result.responseCode == '0') {
        //             successCallback(result)
        //         } else {
        //             failCallback()
        //         }

        //     }).catch((err) => {
        //         failCallback()
        //     })
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
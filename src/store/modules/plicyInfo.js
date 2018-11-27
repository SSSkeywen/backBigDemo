import axios from 'axios'
// import {HTTP} from '@/config/http.js'
import { get, post } from '@/config/http.js'

const getLates = 'getLates'
const getPolicyInfo = 'getPolicyInfo'


const state = {
    ulrData: '/wxqhb/'
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
        get(state.ulrData + 'policy/toPolicyListVue.html', '').then((res) => {
            console.log(res)
            let result = res
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
            }

        }).catch((err) => {
        })
    },
    //获取详情
    [getPolicyInfo]({ commit }, { policyCodeData, successCallback = () => { }, failCallback = () => { } }) {
        post(state.ulrData + 'policy/newpolicyInfoVue.html', policyCodeData).then((res) => {
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
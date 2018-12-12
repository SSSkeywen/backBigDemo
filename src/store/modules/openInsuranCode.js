//import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const verifyinglanding = 'verifyinglanding'
const toPwdAddJudge = 'toPwdAddJudge'
const redictNewUrl = 'redictNewUrl'
const wxConifg = 'wxConifg'
const uploadImageInsucode = 'uploadImageInsucode'
const getVerifyCodeInsucode = 'getVerifyCodeInsucode'
const validatephonecode = 'validatephonecode'
const modifyPhoneInsucode = 'modifyPhoneInsucode'
const getmsg = 'getmsg'

const state = {
    //ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    ulrData: '/wxqhb/',
    xqDataList: null
}

const mutations = {
    
}

const actions = {
    //判断用户是否登陆
    [verifyinglanding]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'page/verifyinglanding', '').then((res) => {
            console.log(JSON.stringify(res))
            if (res.code == '0') {
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
    //
    [toPwdAddJudge]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'insurecode/topwdaddjudge', '').then((res) => {
            console.log(JSON.stringify(res))
            //let result = res.data
            if (res.code == '0') {
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
    //跳到网厅的地址
    [redictNewUrl]({ commit }, {url, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + url, '').then((res) => {
            console.log(JSON.stringify(res))
            //let result = res.data
            if (res.code == '1009') {
                failCallback(res)
            } else {
                successCallback(res.data)
            }
        }).catch((err) => {
            let res = {
                code: 1005,//接口异常
                msg: '尊敬的用户，数据请求失败，请刷新后重试!',
            }
            failCallback(res)
        })
    },
    //获取腾讯信息
    [wxConifg]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        let data = {
            url: window.location.href.split("#")[0],    
        };
        post(apiConfig.api_base_url + 'common/wxconfig', data).then((res) => {
            console.log(JSON.stringify(res))
           // alert("wxConifg:" + JSON.stringify(res))
            //let result = res.data
            if (res.code == '0') {
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
    //上传照片并进行人脸校验
    [uploadImageInsucode]({ commit }, {serverId, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'insurecode/uploadimage/' + serverId, '').then((res) => {
            console.log(JSON.stringify(res))
            //let result = res.data
            if (res.code == '0') {
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
    //发送验证码
    [getVerifyCodeInsucode]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'insurecode/getverifycodeinsucode', '').then((res) => {
            console.log(JSON.stringify(res))
            //let result = res.data
            if (res.code == '0') {
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
    //校验验证码
    [validatephonecode]({ commit }, {data, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'insurecode/validatephonecode', data).then((res) => {
            console.log(JSON.stringify(res))
            //let result = res.data
            if (res.code == '0') {
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
    //手机号变更
    [modifyPhoneInsucode]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'insurecode/modifyphone', '').then((res) => {
            console.log(JSON.stringify(res))
            //let result = res.data
            if (res.code == '0') {
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
    //获取错误信息
    [getmsg]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'insurecode/getmsg', '').then((res) => {
            console.log(JSON.stringify(res))
            //let result = res.data
            if (res.code == '0') {
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
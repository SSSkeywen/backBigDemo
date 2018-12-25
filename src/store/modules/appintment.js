import axios from 'axios'
import { apiConfig } from '../api.js'
import { get, post } from '@/config/http.js'

const getaddress = "getaddress" //获得投连可转换保单列表
const list = "list"
const listsitennfobyids = 'listsitennfobyids'
const createverifycode = 'createverifycode'
const listsiteopendatebysite = 'listsiteopendatebysite'
const listprojects = 'listprojects'
const listordertimeslotbysite = 'listordertimeslotbysite'

// http://10.7.181.184:8090/nwxqhb/api/v2/arfandyearchange/info/1012256,1100225323
const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    // ulrData: 'http://10.7.181.184:8090/nwxqhb/api/v2/'
}

const mutations = {
    
}

const actions = {
    [getaddress]({ commit }, {editdata,successCallback = () => { }, failCallback = () => { } }) {
        console.log('editdata', editdata)
        axios({
            method: 'post',
            url: apiConfig.api_base_url + 'bookingcounter/getaddress',
            data: editdata,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            if (res.data.code == '0') {
                successCallback(res)
            } else {
                failCallback(res)
            }

        }).catch((err) => {
            console.log('err', err)
        })
    },
    [list]({ commit }, { editdata, successCallback = () => { }, failCallback = () => { } }) {
        console.log(editdata)
        post(apiConfig.api_base_url + 'bookingcounter/list', editdata).then((res) => {
            let result = res
            console.log('listresult', result)
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
            console.log('err', err)
        })
       
    },
    [listsitennfobyids]({ commit }, { editdata, successCallback = () => { }, failCallback = () => { } }) {
        console.log(editdata)
        post(apiConfig.api_base_url + 'bookingcounter/listsitennfobyids', editdata).then((res) => {
            let result = res
            console.log('listsitennfobyids', result)
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
            console.log('err', err)
        })
       
    },
    [createverifycode]({ commit }, { editdata, successCallback = () => { }, failCallback = () => { } }) {
        console.log(editdata)
        post(apiConfig.api_base_url + 'bookingcounter/createverifycode', editdata).then((res) => {
            let result = res
            console.log('createverifycode', result)
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
            console.log('err', err)
        })
       
    },
    [listsiteopendatebysite]({ commit }, { edit, successCallback = () => { }, failCallback = () => { } }) {
        console.log(edit)
        post(apiConfig.api_base_url + 'bookingcounter/listsiteopendatebysite/'+edit ).then((res) => {
            let result = res
            console.log('createverifycode', result)
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
            console.log('err', err)
        })
       
    },
    [listordertimeslotbysite]({ commit }, {sitedata, successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'bookingcounter/listordertimeslotbysite', sitedata).then((res) => {
            let result = res
            console.log('listordertimeslotbysite', result)
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
            console.log('err', err)
        })
       
    },
    [listprojects]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'bookingcounter/listprojects').then((res) => {
            let result = res
            console.log('listprojects', result)
            if (result.code == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
            console.log('err', err)
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
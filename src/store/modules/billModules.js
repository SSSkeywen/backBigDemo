import axios from 'axios'

//本页为账单/发票目录下的页面的所有接口和数据

const getToNewIndexList = 'getToNewIndexList'
const getToNewIndexListMsg = 'getToNewIndexListMsg'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    //获取续期账单的列表
    [getToNewIndexList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'toXufeiAccountList',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
        })
    },
    //获取续期账单的列表的详细信息
    [getToNewIndexListMsg]({ commit }, {hospitalSelectData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'page/toNewPageMenu.html',
            data: hospitalSelectData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback()
            }

        }).catch((err) => {
            failCallback()
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
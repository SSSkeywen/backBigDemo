import axios from 'axios'

const getSurvivalList = 'getSurvivalList'
const getSurvivalListInfo = 'getSurvivalListInfo'


const state = {
    ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
}

const mutations = {
    
}

const actions = {
    [getSurvivalList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'changelist/bqChangeRecordList.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback(result)
            }

        }).catch((err) => {
        })
    },
    [getSurvivalListInfo]({ commit }, {policyCodeData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'changelist/bqChangeRecordDetails.html',
            data: policyCodeData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback(result)
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
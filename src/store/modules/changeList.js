import axios from 'axios'

const getChangeList = 'getChangeList'
const getChangeListInfo = 'getChangeListInfo'


const state = {
    ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
}

const mutations = {
    
}

const actions = {
    [getChangeList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'changelist/bqChangeRecordList.html',
          // url: state.ulrData + 'policy/toPolicyListVue.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
            }

        }).catch((err) => {
        })
    },
    [getChangeListInfo]({ commit }, {policyCodeData, successCallback = () => { }, failCallback = () => { } }) {
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
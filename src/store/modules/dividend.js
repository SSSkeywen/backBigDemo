import axios from 'axios'

const getDividend = 'getDividend'
const postDividend = 'postDividend'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    [getDividend]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'policy/toBounsAccountListVue',
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

    // post 获取详情
    [postDividend]({ commit }, {policyCodeData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'policy/toBounsAccountInfoVueByDate',
            data: policyCodeData,
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
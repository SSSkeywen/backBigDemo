import axios from 'axios'

const getUnitLinked = 'getUnitLinked'
const postUnitLinked = 'postUnitLinked'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    [getUnitLinked]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'policy/toSettleAccountListVue',
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
    [postUnitLinked]({ commit }, {policyCodeData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'policy/toSettleAccountInfoVue',
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
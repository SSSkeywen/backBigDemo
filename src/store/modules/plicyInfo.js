import axios from 'axios'

const getLates = 'getLates'
const getPolicyInfo = 'getPolicyInfo'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    // getLates(sCallback){
    //     HTTP.request({
    //         url: '/toTaxExtensionPensionIndex.html',
    //         methods:'post',
    //         success: (res) => {
    //             sCallback(res)
    //         },
    //         failCallback:(res) => {
    //         }
    //     })
    // },
    [getLates]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'policy/toPolicyListVue.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
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

    //获取详情
    [getPolicyInfo]({ commit }, {policyCodeData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'policy/newpolicyInfoVue.html',
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
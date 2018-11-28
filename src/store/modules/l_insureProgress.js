import axios from 'axios'

const getInsureProgressList = 'getInsureProgressList'
const insureStaQueByPolicyCode = 'insureStaQueByPolicyCode'


const state = {
    // ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    [getInsureProgressList]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'insureStaQueByCustomerList.html',
          // url: state.ulrData + 'policy/toPolicyListVue.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            
            let result = res.data
            // console.log(result)
            successCallback(result)
            // if (result.responseCode == '0') {
            //     successCallback(result)
            // } else {
            //     failCallback(res.msg)
            // }

        }).catch((err) => {
        })
    },
    [insureStaQueByPolicyCode]({ commit }, {policyCodeData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'insureStaQueByPolicyCode.html',
            data: policyCodeData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback(res.msg)
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
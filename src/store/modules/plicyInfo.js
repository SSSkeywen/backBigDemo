import axios from 'axios'

const getLates = 'getLates'


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
            method: 'get',
            url: state.ulrData + 'policy/toPolicyListVue.html',
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
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
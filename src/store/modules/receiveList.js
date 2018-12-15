import axios from 'axios'
import { get, post } from '@/config/http.js'
import { apiConfig } from '../api.js'

const getbonuslist = 'getbonuslist'
const hospitallist = 'hospitallist'
const hospitalbaoan= 'hospitalbaoan'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    //投/被保人客户信息查询
    [getbonuslist]({ commit }, {successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'hllq/bonuslist', '').then((res) => {
            console.log(res)
            let result = res;
            // console.log("11"+result.code == 0)
            if (result.code == 0) {
                successCallback(result)
                 console.log(result)

                // console.log("11"+result.code)
            } else {
                failCallback(result)
   
            }
        }).catch((err) => {
            failCallback(err)
            console.log("00"+err)
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
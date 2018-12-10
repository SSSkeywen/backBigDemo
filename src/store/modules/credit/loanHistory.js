//import axios from 'axios'
import { apiConfig } from '../../api.js'
import { get, post } from '@/config/http.js'

const historyquery = 'historyquery'
const historyinit = 'historyinit'

const state = {
    //ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
}

const mutations = {
    
}

const actions = {
    [historyinit]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        post(apiConfig.api_base_url + 'ssd/historyinit', '').then((res) => {
            console.log(res)
            //let result = res.data
            if (res.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(res)
            }
        }).catch((err) => {
            let res = {
                code: 1005,//接口异常
                msg: '尊敬的用户，数据请求失败，请刷新后重试!',
            }
            failCallback(res)
        })
        
    },
    [historyquery]({ commit }, { date, successCallback = () => { }, failCallback = () => { } }) {
        console.info("date:"+JSON.stringify(date));
        post(apiConfig.api_base_url + 'ssd/historyquery' , date).then((res) => {
            console.log(JSON.stringify(res))
            //let result = res.data
            if (res.code == '0') {
                successCallback(res.data)
            } else {
                failCallback(res)
            }
        }).catch((err) => {
            let res = {
                code: 1005,//接口异常
                msg: '尊敬的用户，数据请求失败，请刷新后重试!',
            }
            failCallback(res)
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
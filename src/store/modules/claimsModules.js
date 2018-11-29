import axios from 'axios'
import { get, post } from '@/config/http.js'

const hospitalInformation = 'hospitalInformation'
const hospitalList = 'hospitalList'


const state = {
    ulrData: '/wxqhb/'
}

const mutations = {
    
}

const actions = {
    //省市信息
    [hospitalInformation]({ commit }, { provinceSelectData, successCallback = () => { }, failCallback = () => { } }) {
        post(state.ulrData + 'sett/city/cityNamelist.html', '').then((res) => {
            console.log(res)
            let result = res
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback()
            }
        }).catch((err) => {
            failCallback()
        })
        // axios({
        //     method: 'post',
        //     url: state.ulrData + 'sett/city/cityNamelist.html',
        //     data: provinceSelectData,
        //     "Content-Type": "multipart/form-data"
        // }).then((res) => {
        //     console.log(res)
        //     let result = res.data
        //     if (result.responseCode == '0') {
        //         successCallback(result)
        //     } else {
        //         failCallback()
        //     }

        // }).catch((err) => {
        //     failCallback()
        // })
    },
    //查询结果医院列表
    [hospitalList]({ commit }, {hospitalSelectData, successCallback = () => { }, failCallback = () => { } }) {
        post(state.ulrData + 'sett/hospital/Hospitalxxlist.html', '').then((res) => {
            console.log(res)
            let result = res
            if (result.responseCode == '0') {
                successCallback(result)
            } else {
                failCallback()
            }
        }).catch((err) => {
            failCallback()
        })
        // axios({
        //     method: 'post',
        //     url: state.ulrData + 'sett/hospital/Hospitalxxlist.html',
        //     data: hospitalSelectData,
        //     "Content-Type": "multipart/form-data"
        // }).then((res) => {
        //     console.log(res)
        //     let result = res.data
        //     if (result.responseCode == '0') {
        //         successCallback(result)
        //     } else {
        //         failCallback()
        //     }

        // }).catch((err) => {
        //     failCallback()
        // })
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
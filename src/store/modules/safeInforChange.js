import axios from 'axios'
import {
  get,
  post
} from '@/config/http.js'
import {
  apiConfig
} from '../api.js'

const terminaTecancel = 'terminaTecancel'
const terminaTecancelInfo = 'terminaTecancelInfo'
const getChangeListInfo = 'getChangeListInfo'
const terminatecancelsendcode = 'terminatecancelsendcode'
const terminatecancelvalidatecode = 'terminatecancelvalidatecode'
const toterminatecancelapply = 'toterminatecancelapply'


const state = {
  ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
}

const mutations = {

}

// const actions = {
//   [terminaTecancel]({
//     commit
//   }, {
//     successCallback = () => {},
//     failCallback = () => {}
//   }) {
//     axios({
//       method: 'get',
//       url: state.ulrData + 'yyzz/terminatecancelInfo.html',
//       // url: state.ulrData + 'policy/toPolicyListVue.html',
//       data: '',
//       "Content-Type": "multipart/form-data"
//     }).then((res) => {
//       console.log(res)
//       let result = res.data
//       if (result.responseCode == '0') {
//         successCallback(result)
//       } else {}

//     }).catch((err) => {})
//   },

// }
const actions = {
  [terminaTecancel]({
    commit
  }, {
    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'yyzz/terminatecancellist', '').then((res) => {
      //console.log(res)
      let result = res
      if (result.code == '0') {
        successCallback(result)
      } else {
        failCallback(result)
      }

    }).catch((err) => {
      failCallback(err)
    })
  },
  [terminaTecancelInfo]({
    commit
  }, {
    contentPlocly,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    // console.log(111)

    post(apiConfig.api_base_url + 'yyzz/terminatecancelInfo/' + contentPlocly, "").then((res) => {

      console.log(res)
      let result = res
      if (result.code == '0') {
        successCallback(result)
      } else {
        failCallback(result)
      }

    }).catch((err) => {
      failCallback(err)
    })
  },
  [terminatecancelsendcode]({
    commit
  }, {
    contentPlocly,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    // console.log(22222)

    post(apiConfig.api_base_url + 'yyzz/terminatecancelsendcode', "").then((res) => {

      // console.log(res)
      let result = res
      if (result.code == '0') {
        successCallback(result)
      } else {
        failCallback(result)
      }

    }).catch((err) => {
      failCallback(err)
    })
  },
  [terminatecancelvalidatecode]({
    commit
  }, {
    code,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    //  console.log(3333);

    post(apiConfig.api_base_url + 'yyzz/terminatecancelvalidatecode/' + code, "").then((res) => {

      let result = res
      if (result.code == '0') {
        successCallback(result)
      } else {
        failCallback(result)
      }

    }).catch((err) => {
      failCallback(err)
    })
  },
  [toterminatecancelapply]({
    commit
  }, {
    policyList,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    // console.log(111)

    // policyList = '[{POLICY_CODE:001133806957310,ITEM_ID:332910959}]';

    post(apiConfig.api_base_url + 'yyzz/toterminatecancelapply', policyList).then((res) => {

      // console.log(res)
      let result = res
      if (result.code == '0') {
        successCallback(result)
      } else {
        failCallback(result)
      }

    }).catch((err) => {
      failCallback(err)
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

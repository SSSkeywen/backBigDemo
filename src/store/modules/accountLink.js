import axios from 'axios'
import {
  get,
  post
} from '@/config/http.js'
import {
  apiConfig
} from '../api.js'
// 红利领取接口
const survivalpaymentList = 'survivalpaymentList'
const existchange = 'existchange'
const getorganname = 'getorganname'
const getaccount = 'getaccount'
const apply = 'apply'
const resultzp = 'resultzp'
// 红利处置方式变更
const gethLchangebylist = 'gethLchangebylist'
const gethLchangebyinfo = 'gethLchangebyinfo'
const getbonusinfo = 'getbonusinfo'
const checkoverdueapproach = 'checkoverdueapproach'
// const apply = 'apply'
// const resultzp = 'resultzp'


// const toterminatecancelapply = 'toterminatecancelapply'


const state = {
  ulrData: 'https://tpwxtestcloud.life.cntaiping.com/wxqhb/'
}

const mutations = {

}
// http: //wxtest.life.cntaiping/new_wxqhbCloud/api/v2/survivalpayment/ list

const actions = {
  [survivalpaymentList]({
    // commit
  }, {
    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'survivalpayment/list', '').then((res) => {

      let result = res
      if (result.code == '0') {
        successCallback(result)
      } else {
        // console.log(res.code)
        failCallback(result)
      }

    }).catch((err) => {
      failCallback(err)
    })
  },
  [existchange]({
    // commit
  }, {
    policyCodes,

    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'survivalpayment/existchange/' + policyCodes, '').then((res) => {
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
  }, //红利领取机构id
  [getorganname]({
    // commit
  }, {
    organId,

    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'common/getorganname/' + organId, '').then((res) => {
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
  //红利领取银行卡信息
  [getaccount]({
    // commit
  }, {
    phoneCode,

    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'survivalpayment/getaccount', '').then((res) => {
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
  }, //survivalpayment/apply
  [apply]({
    // commit
  }, {
    policyList,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'survivalpayment/apply', policyList).then((res) => {
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
  }, //红利领取批文接口
  [resultzp]({
    // commit
  }, {
    policyList,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'survivalpayment/result', policyList).then((res) => {
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
  }, // 红利处置方式变更
  [gethLchangebylist]({
    // commit
  }, {
    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'hlcz/gethLchangebylist', '').then((res) => {
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
  }, //红利处置方式变更hlcz/gethLchangebyinfo
  [gethLchangebyinfo]({
    // commit
  }, {
    policyCode,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'hlcz/gethLchangebyinfo/' + policyCode, '').then((res) => {
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
  [getbonusinfo]({
    // commit
  }, {
    param,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'hlcz/getbonusinfo', param).then((res) => {
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
  [checkoverdueapproach]({
    // commit
  }, {
    param,
    successCallback = () => {},
    failCallback = () => {}
  }) {
    //console.log(111)
    post(apiConfig.api_base_url + 'hlcz/checkoverdueapproach', '').then((res) => {
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
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}

// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import plicyInfo from './modules/plicyInfo.js'
import classic from './modules/classic.js'
import userInfo from './modules/userInfo.js'
import claimsModules from './modules/claimsModules.js'
import billModules from './modules/billModules.js'

//刘飞涛
import account from './modules/account.js'
import dividend from './modules/dividend.js'
import unitLinked from './modules/unitLinked.js'

//李y
import l_insureProgress from './modules/l_insureProgress.js'

//hy
import changeList from './modules/changeList.js'
import survival from './modules/survival.js'



Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        plicyInfo,
        classic,
        userInfo,
        claimsModules,
        billModules,

        account,
        dividend,
        unitLinked,

        l_insureProgress,

        changeList,
        survival
    }
})
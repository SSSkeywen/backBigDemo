// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import plicyInfo from './modules/plicyInfo.js'
import classic from './modules/classic.js'
import userInfo from './modules/userInfo.js'
import claimsModules from './modules/claimsModules.js'
import billModules from './modules/billModules.js'
import informationChange from './modules/informationChange.js'

//刘飞涛
import universal from './modules/universal.js'
import account from './modules/account.js'
import dividend from './modules/dividend.js'
import unitLinked from './modules/unitLinked.js'
import modifyRest from './modules/modifyRest.js'

//李y
import l_insureProgress from './modules/l_insureProgress.js'
import unbindSelf from './modules/unbindSelf.js'

//hy
import changeList from './modules/changeList.js'
import survival from './modules/survival.js'
import loanHistory from './modules/credit/loanHistory.js'
import openInsuranCode from './modules/openInsuranCode.js'

//CYL
import arfandyearchange from './modules/annuityCollect.js'



Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        plicyInfo,
        classic,
        userInfo,
        claimsModules,
        billModules,
        informationChange,

        account,
        universal,
        dividend,
        unitLinked,
        modifyRest,

        l_insureProgress,
        unbindSelf,

        changeList,
        survival,
        loanHistory,
        openInsuranCode,

        arfandyearchange
    }
})
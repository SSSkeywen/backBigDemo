// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import plicyInfo from './modules/plicyInfo.js'
import classic from './modules/classic.js'
import userInfo from './modules/userInfo.js'
import claimsModules from './modules/claimsModules.js'
import billModules from './modules/billModules.js'
import informationChange from './modules/informationChange.js'
import toBindUserUpdate from './modules/toBindUserUpdate.js'
import payInfoChang from './modules/payInfoChang.js'
import billSendStyleChange from './modules/billSendStyleChange.js'
import safeInforChange from './modules/safeInforChange.js'
import reminded from './modules/reminded.js'

//刘飞涛
import universal from './modules/universal.js'
import account from './modules/account.js'
import dividend from './modules/dividend.js'
import unitLinked from './modules/unitLinked.js'
import modifyRest from './modules/modifyRest.js'
import survivalGetWayChange from './modules/survivalGetWayChange.js'

//李y
import l_insureProgress from './modules/l_insureProgress.js'
import unbindSelf from './modules/unbindSelf.js'
import overdue from './modules/overdue.js'

//hy
import changeList from './modules/changeList.js'
import survival from './modules/survival.js'
import loanHistory from './modules/credit/loanHistory.js'
import openInsuranCode from './modules/openInsuranCode.js'

//CYL
import arfandyearchange from './modules/annuityCollect.js'
import reduceAmount from './modules/reduceAmount.js'
import paymentAccount from './modules/paymentAccount.js'
import invesment from './modules/invesment.js'
import appintment from './modules/appintment.js'


//zyl
import claimReport from './modules/claimReport.js'
import receiveList from './modules/receiveList.js'

import accpuntInf from './modules/accpuntInf.js'
import bonusGetWayChange from './modules/customerService/bonusGetWayChange.js'

//zp
import accountLink from './modules/accountLink.js'



Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        plicyInfo,
        classic,
        userInfo,
        claimsModules,
        billModules,
        informationChange,
        toBindUserUpdate,
        payInfoChang,
        safeInforChange,
        reminded,

        account,
        universal,
        dividend,
        unitLinked,
        modifyRest,
        survivalGetWayChange,

        l_insureProgress,
        unbindSelf,
        overdue,

        changeList,
        survival,
        loanHistory,
        openInsuranCode,
        bonusGetWayChange,

        arfandyearchange,
        reduceAmount,
        paymentAccount,
        invesment,
        appintment,

        claimReport,
        receiveList,
        accpuntInf,
        billSendStyleChange,

        accountLink

    }
})
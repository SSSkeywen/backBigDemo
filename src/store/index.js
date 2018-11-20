// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import plicyInfo from './modules/plicyInfo.js'
import classic from './modules/classic.js'
import claimsModules from './modules/claimsModules.js'
import billModules from './modules/billModules.js'



Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        plicyInfo,
        classic,
        claimsModules,
        billModules
    }
})
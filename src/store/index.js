// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import plicyInfo from './modules/plicyInfo.js'
import classic from './modules/classic.js'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        plicyInfo,
        classic
    }
})
// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import plicyInfo from './modules/plicyInfo.js'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        plicyInfo
    }
})
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)


//引入vantui
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
Vue.use(Vant)

//rem转换
import './js/1rem100px.js'

//录入校验
import toolsTwo from './js/toolsTwo.js'
Vue.prototype.$toolsTwo = toolsTwo

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

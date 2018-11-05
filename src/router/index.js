import Vue from 'vue'
import Router from 'vue-router'
import classic from '@/page/classic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'classic',
      component: classic
    }
  ]
})

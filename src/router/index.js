import Vue from 'vue'
import Router from 'vue-router'

//组件
import scenery from '../components/scenery'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
    },
    {
      path: '/scenery',
      name: '',
      component:scenery
    }
  ]
})

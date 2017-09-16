import Vue from 'vue'
import Router from 'vue-router'

//组件
import scenery from '../components/scenery'
import layout from '../components/matrix'
Vue.use(Router)
//布景scenery
//布局layout/2级
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
    },{
      path: '/scenery',
      name: '',
      component:scenery
    },{
      path: '/layout',
      component: layout
    }
  ]
})

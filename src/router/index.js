import Vue from 'vue'
import Router from 'vue-router'

//组件
import scenery from '../components/scenery'
import layout from '../components/layout'
import plan from '../components/plan'
import choose from '../components/choose'
import config from '../components/config'
import config1 from '../components/config1'
Vue.use(Router)
//布景scenery
//布局layout/2级
export default new Router({
  routes: [
    {
      path: '/scenery',
      name: '',
      component:scenery
    },{
      path: '/layout',
      component: layout,
      children: [{
        path: 'choose',
        component: choose
      },{
        path: 'config',
        // component: config
        component: config1
      }]
    },{
      path: '/plan',
      component: plan
    }
  ]
})

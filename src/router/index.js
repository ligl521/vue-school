import Vue from 'vue'
import Router from 'vue-router'
import school from '@/components/school'
import schoolDetail from '@/components/schoolDetail'
import index from '@/components/index'
import homes from '@/components/homes'
Vue.use(Router)

export default new Router({
    routes:[
      {
        path: '/',
        name: 'index',
        component: index
      },{
        path: '/homes',
        name: 'homes',
        component: homes
      },{
        path: '/school',
        name: 'school',
        component: school
      },
      {
        path: '/schoolDetail',
        name: 'schoolDetail',
        component: schoolDetail
      }
    ]
})

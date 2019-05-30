import Vue from 'vue'
import Router from 'vue-router'
import school from '@/components/school'
import schoolDetail from '@/components/schoolDetail'
import schoollisttwo from '@/components/schoollisttwo'
import homepage from '@/components/homepage'
import schoolku from '@/components/schoolku'
Vue.use(Router)

export default new Router({
    routes:[{
      path: '/',
      name: 'homepage',
      component: homepage
    },{
        path: '/schoollisttwo',
        name: 'schoollisttwo',
        component: schoollisttwo
      },{
        path: '/school',
        name: 'school',
        component: school
      },
      {
        path: '/schoolDetail',
        name: 'schoolDetail',
        component: schoolDetail
      },{
        path: '/schoolku',
        name: 'schoolku',
        component: schoolku
      }
    ]
})

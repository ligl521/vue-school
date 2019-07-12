import Vue from 'vue'
import Router from 'vue-router'
import school from '@/components/school'
import schoolTalent from '@/components/schoolTalent'
import schoolGroup from '@/components/schoolGroup'
import schoolDetail02 from '@/components/schoolDetail02'
import schoolHome from '@/components/schoolHome'
import schoolDataBade from '@/components/schoolDataBade'
import schoolVisual from '@/components/schoolVisual'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'schoolHome',
            component: schoolHome
        }, {
            path: '/school',
            name: 'school',
            component: school
        }, {
            path: '/schoolGroup',
            name: 'schoolGroup',
            component: schoolGroup
        }, {
            path: '/schoolDetail02',
            name: 'schoolDetail02',
            component: schoolDetail02
        }, {
          path: '/schoolTalent',
          name: 'schoolTalent',
          component: schoolTalent
        }, {
          path: '/schoolDataBade',
          name: 'schoolDataBade',
          component: schoolDataBade
        }, {
          path: '/schoolVisual',
          name: 'schoolVisual',
          component: schoolVisual
        }


    ]
})

import Vue from 'vue'
import Router from 'vue-router'
import school from '@/components/school'
import schoolTalent from '@/components/schoolTalent'
import schoolGroup from '@/components/schoolGroup'
import schoolDetail from '@/components/schoolDetail'
import schoolHome from '@/components/schoolHome'

import schoolDataBade from '@/components/schoolDataBade'
import schoolVisual from '@/components/schoolVisual'

import register from '@/components/register'

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
            path: '/schoolDetail',
            name: 'schoolDetail',
            component: schoolDetail
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
        },
        {
            path: '/register',
            name: 'register',
            component: register
        }
    ]
})
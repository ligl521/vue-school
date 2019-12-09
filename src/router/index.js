import Vue from 'vue'
import Router from 'vue-router'
import school from '@/components/school'
import talent from '@/components/talent'
import talentDetails from '@/components/talentDetails'
import resume from '@/components/resume'
import personnel from '@/components/personnel'
import schoolDetail from '@/components/schoolDetail'
import company from '@/components/company'
import companyDetail from '@/components/companyDetail'
import schoolHome from '@/components/schoolHome'

import schoolDataBade from '@/components/schoolDataBade'
import schoolVisual from '@/components/schoolVisual'

import register from '@/components/register'
import schoolAdd from '@/components/schoolAdd'

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
            path: '/company',
            name: 'company',
            component: company
        }, {
            path: '/companyDetail',
            name: 'companyDetail',
            component: companyDetail
        }, {
            path: '/schoolDetail',
            name: 'schoolDetail',
            component: schoolDetail
        }, {
            path: '/talent',
            name: 'talent',
            component: talent
        }, {
            path: '/talentDetails',
            name: 'talentDetails',
            component: talentDetails
        }, {
            path: '/personnel',
            name: 'personnel',
            component: personnel
        }, {
            path: '/resume',
            name: 'resume',
            component: resume
        },{
            path: '/schoolDataBade',
            name: 'schoolDataBade',
            component: schoolDataBade
        }, {
            path: '/schoolVisual',
            name: 'schoolVisual',
            component: schoolVisual
        }, {
            path: '/register',
            name: 'register',
            component: register
        }, {
            path: '/schoolAdd',
            name: 'schoolAdd',
            component: schoolAdd
        },
    ]
})
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
import companyAdd from '@/components/companyAdd'
import project from '@/components/project'
import projectDetail from '@/components/projectDetail'

import visible from '@/components/visible'
import register from '@/components/register'
import schoolAdd from '@/components/schoolAdd' 
import personalCenter from '@/components/personalCenter'


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
            path: '/companyAdd',
            name: 'companyAdd',
            component: companyAdd
        },{
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
            path: '/project',
            name: 'project',
            component: project
        },{
            path: '/projectDetail',
            name: 'projectDetail',
            component: projectDetail
        }, {
            path: '/visible',
            name: 'visible',
            component: visible
        }, {
            path: '/register',
            name: 'register',
            component: register
        }, {
            path: '/schoolAdd',
            name: 'schoolAdd',
            component: schoolAdd
        },{
            path: '/personalCenter',
            name: 'personalCenter',
            component: personalCenter
        },
    ]
})
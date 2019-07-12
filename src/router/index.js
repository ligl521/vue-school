import Vue from 'vue'
import Router from 'vue-router'
import school from '@/components/school'
import homepage from '@/components/homepage'
import schoolku from '@/components/schoolku'
import schoolDetail02 from '@/components/schoolDetail02'
import schoolHome from '@/components/schoolHome'
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
        path: '/schoolku',
        name: 'schoolku',
        component: schoolku
    }, {
        path: '/schoolDetail02',
        name: 'schoolDetail02',
        component: schoolDetail02
    }, {
        path: '/register',
        name: 'register',
        component: register
    }]
})
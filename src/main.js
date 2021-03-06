// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layout from './layout'
//element引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import router from './router/index.js'
import store from './store/store' //引入store
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//vuex
import Vuex from 'vuex'
import axios from 'axios'
//清除全局
import './assets/css/reset.css'
//引入swiper
require('swiper/dist/css/swiper.css')
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
//引入时间格式
import moment from 'moment'
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)

})
//图片裁剪
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
    //bus总线
import VueBus from 'vue-bus';
Vue.prototype.bus = new Vue();
//环境地址
Vue.prototype.axios = axios
    //测试环境
    // axios.defaults.baseURL = "http://192.168.0.22:8080/nsi-1.0"
    // axios.defaults.baseURL = "http://192.168.0.103:8080/nsi-1.0"
    // axios.defaults.baseURL = "http://192.168.0.102:8080/nsi-1.0"
    // axios.defaults.baseURL = "http://high.natapp1.cc/nsi-1.0"
    //生产环境
    axios.defaults.baseURL = "https://data.xinxueshuo.cn/nsi-1.0/"
    // var xinxueshuoSite = "https: //data.xinxueshuo.cn/data/dist/index.html#/"

Vue.use(ElementUI, Vuex, VueBus);
Vue.config.productionTip = false
router.afterEach((to,from,next)=>{
　window,scrollTo(0,0)
})

import commonSchoolDetail from './assets/js/commonSchoolDetail'
Vue.prototype.commonSchoolDetail=commonSchoolDetail
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, //使用store
    components: {
        layout
    },
    template: '<layout/>'
})

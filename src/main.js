// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layout from './layout'
import router from './router/index.js'
//element引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//清除全局
import './assets/css/reset.css'
//引入swiper
require('swiper/dist/css/swiper.css')
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { layout },
    template: '<layout/>'
})

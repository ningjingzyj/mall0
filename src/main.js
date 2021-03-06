import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
//import env from './env'
import Swiper2, { Navigation, Pagination, Autoplay } from "swiper";
Swiper2.use([Autoplay, Navigation, Pagination]);

//mock开关
const mock = false;
if(mock){
    require('./mock/api');
}

//根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b (接口代理)
//axios.defaults.baseURL = '放easy-mock上的项目地址';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
//根据环境变量获取不同的请求地址
//axios.defaults.baseURI = env.baseURL;
//接口错误拦截
axios.interceptors.response.use(function(response){
   let res = response.data;
   let path = location.hash;
   if(res.status == 0){
       return res.data;
   }else if(res.status == 10){
       if(path != '#/index'){
            window.location.href= '/#/login';
           return Promise.reject(res);
       }
   }else{
       //alert(res.msg);
       Message.warning(res.msg);
       return Promise.reject(res);
   }
})


Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
    loading:'/imgs/loading-svg/loading-bars.svg',
})
Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')

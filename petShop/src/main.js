// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';  //ui 框架            
import 'vant/lib/index.css'; //UI样式
import Axios from 'axios'  //请求依赖
import {Request_get,Request_post,Request_Delete,Request_put,generateTimeReqestNumber,clientTimeZone,getBylanguage} from '@/utils/util.js'
import VueResource from 'vue-resource'
import Vuei18n from 'vue-i18n'	//国际化
import { Lazyload } from 'vant';  //局部使用懒加载报错
import store from './store/index.js';
import '@/permission.js';
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '51snZtbBwEIzdhGgCUdj5YnWx0Tgf93L'
})
Vue.use(Lazyload); //局部使用懒加载报错
Vue.use(Vant);
Vue.use(VueResource) //浏览器版本低请求兼容
Vue.use(Vuei18n) //国际化


Vue.config.productionTip = false
Vue.prototype.$Axios=Axios
Vue.prototype.$Request_get=Request_get  //全局get请求
Vue.prototype.$Request_post=Request_post//全局post请求
Vue.prototype.$Request_put=Request_put 		//全局Put请求
Vue.prototype.$SimpleDateFormat=generateTimeReqestNumber  //全局获取时间yyyymmdd
Vue.prototype.$Gettimezone=clientTimeZone  //获取时区
Vue.prototype.$request="http://192.168.10.102:3001/petshop/v1/api"
Vue.prototype.$requests="https://mychen.vip:8070/petshop/v1/api"


Axios.defaults.headers.post['Content-Type'] = 'application/json';
//拦截器
Axios.interceptors.request.use(function(config){
	console.log(localStorage.getItem("userInfo"))
	config.headers.Authorization = localStorage.getItem("userInfo");
//	console.log(config)
	return config
	
},function(error){
	return Promise.reject(error)
})
Axios.interceptors.response.use(function(response){
//	console.log(response)
	return response
	
},function(error){
	return Promise.reject(error)
})


// 注册i18n实例并引入语言文件，文件格式等下解析
const i18n = new Vuei18n({
  locale: "en",//getBylanguage()
  messages: {
    'zh': require('@/assets/language/zh.json'),
    'en': require('@/assets/language/en.json')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})



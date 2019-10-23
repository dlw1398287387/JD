// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueI18n from 'vue-i18n';
import Viser from 'viser-vue';
import Storage from 'vue-ls';
import store from './store/index.js';
import 'babel-polyfill';
import api from './API/config.js';
import Axios from 'axios';  //请求依赖
import {Request_get,Request_post,Request_put,Request_patch,Request_Delete,generateTimeReqestNumber,clientTimeZone,getBylanguage,openNotification} from '@/utils/util.js'


Vue.prototype.$Axios=Axios
Vue.prototype.$Request_get=Request_get  //全局get请求
Vue.prototype.$Request_post=Request_post	//全局post请求
Vue.prototype.$Request_put=Request_put 		//全局Put请求
Vue.prototype.$Request_patch=Request_patch  //全局patch请求
Vue.prototype.$Request_Delete=Request_Delete //全局Delete请求
Vue.prototype.$SimpleDateFormat=generateTimeReqestNumber  //全局获取时间yyyymmdd
Vue.prototype.$Gettimezone=clientTimeZone  //获取时区
Vue.prototype.$openNotification=openNotification //全局提示
Vue.prototype.$Vue=Vue
Vue.prototype.$http="http://192.168.10.102:3000/System/v1/api"
Vue.prototype.$https="https://mychen.vip:8090/System/v1/api"

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueI18n)
Vue.use(Viser)

/**
 * axios请求拦截器 
 */
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.interceptors.request.use(function(config){
	console.log(JSON.stringify(Vue.ls.get("userInfotoken")))
	config.headers.Authorization = JSON.stringify(Vue.ls.get("userInfotoken"));
	return config;
},function(error){
	return Promise.reject(error)
})
Axios.interceptors.response.use(function(response){
	if(response.status!=200){
		alert("服务器繁忙")
	}
	return response
},function(error){
	return Promise.reject(error)
})


//console.log(api)

const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
}
Vue.use(Storage,options);

import '@/permission.js'

const i18n = new VueI18n({
	locale: 'en',
	messages: {
	    'zh': require("@/Language/zh.json"), 
	    'en': require("@/Language/en.json")  
	}
})


//console.log(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

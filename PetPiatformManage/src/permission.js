import Vue from 'vue'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

console.log("<--")
console.log("*Ant Design Pro Vue")
console.log("-->")

NProgress.configure({ showSpinner: false })// NProgress Configuration
router.beforeEach((to, from, next) => {
	console.log(to)
	NProgress.start(); //开启加载进度样式
	if(to.fullPath!="/user/login"){//因为进入登录页面也在路由钩子函数中，所以需要判断
//		console.log(Vue.ls.get("userInfotoken"))
		if(Vue.ls.get("userInfotoken")==null){//当userInfo为空，就让用户再次进入登录页面重新登录，
			if(from.name!="Register"){
				next('/user/login');
				NProgress.done(); //加载完成关闭 加载进度样式
			}
		}
	}
 	next()
});



router.afterEach(transition => {
	NProgress.done(); //页面渲染完成，关闭加载进度样式
});

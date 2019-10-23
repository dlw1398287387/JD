import Vue from 'vue'
import Router from 'vue-router'
import RouteView from '@/components/layouts/RouteView'
import BasicLayout from '@/components/layouts/BasicLayout'

Vue.use(Router)

export default new Router({
	
	routes: [
		{	//第一级路由
			path:'/', 
			name:'index',
			component:BasicLayout,
			meta: { title: '首页',keepAlive: true, },
			redirect: '/dashboard/ChartDish',
			children: [
					{ //二级路由
						path:'/dashboard',
						name:'dashboard',
						component:RouteView,
						redirect:'/dashboard/ChartDish',
						meta: { title:'控制台',icon:'dashboard', menuKey:'sub1',  keepAlive: false, hiddenHeaderContent: true,},
						children: [
							{//三级路由
							  path: '/dashboard/ChartDish',
						      name: 'ChartDish',
						      component: ()=>import('@/views/dashboard/ChartDish'),
						      meta: { title: '图表页', menuSelectKey:'1',  keepAlive: false, hiddenHeaderContent: true,},
							},
							{
							  path: '/dashboard/Workbench',
						      name: 'Workbench',
						      component: ()=>import('@/views/dashboard/Workbench'),
						      meta: { title: '图表盘', menuSelectKey:'2', keepAlive: false, hiddenHeaderContent: false,},
							},
							{
							  path: '/dashboard/Monitor',
						      name: 'Monitor',
						      component: ()=>import('@/views/dashboard/Monitor'),
						      meta: { title:'监听页', menuSelectKey:'3', keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:'/dashboard/Analysis',
								name:'Analysis',
								component:()=>import('@/views/dashboard/analysis'),
								meta: { title:'分析页', menuSelectKey:'4', keepAlive: false, hiddenHeaderContent: false,},
							},
						]
					},
					
					{
						path:'/Product',
						name:'Product',
						component:RouteView,
						meta: { title:'产品页',icon:'table', menuKey:'sub2', keepAlive: false, hiddenHeaderContent: true,},
						children:[
							{
								path:'/form/AddToProduct',
								name:'AddToProduct',
								component:()=>import('@/views/Products/AddToProduct'),
								meta: { title:'添加产品',menuSelectKey:'6',  keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:'lists/ProductList',
								name:'ProductList',
								component:()=>import('@/views/Products/ProductList'),
								meta:{ title:'产品列表',menuSelectKey:'7',  keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:"lists/UpdateProduct",
								name:"UpdateProduct",
								component:()=>import('@/views/Products/UpdateProduct'),
								meta:{ title:'产品编辑',menuSelectKey:'8',  keepAlive: false, hiddenHeaderContent: false,},
							},
						]
					},
					{
						path:'/Product',
						name:'Product',
						component:RouteView,
						meta: { title:'线下服务',icon:'table', menuKey:'sub3', keepAlive: false, hiddenHeaderContent: true,},
						children:[
							{
								path:'/offline/addService',
								name:'addService',
								component:()=>import('@/views/offlineService/addService'),
								meta: { title:'添加城市服务',menuSelectKey:'9',  keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:'/offline/serviceList',
								name:'serviceList',
								component:()=>import('@/views/offlineService/serviceList'),
								meta: { title:'查看服务列表',menuSelectKey:'10',  keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:'/offline/editService',
								name:'editService',
								component:()=>import('@/views/offlineService/editService'),
								meta: { title:'编辑城市服务',menuSelectKey:'11',  keepAlive: false, hiddenHeaderContent: false,},
							},
						]
					},
					
					{
						path:'/Orders',
						name:'Orders',
						component:RouteView,
						meta: { title:'订单页',icon:'snippets', menuKey:'sub4', keepAlive: false, hiddenHeaderContent: true,},
						children:[
							{
								path:'/orders/orderList1',
								name:'orderList1',
								component:()=>import('@/views/orders/orderList1'),
								meta: { title:'新订单',menuSelectKey:'12',  keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:'/orders/orderList2',
								name:'orderList2',
								component:()=>import('@/views/orders/orderList2'),
								meta: { title:'运输订单',menuSelectKey:'13',  keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:'/orders/orderList3',
								name:'orderList3',
								component:()=>import('@/views/orders/orderList3'),
								meta: { title:'已完成订单',menuSelectKey:'14',  keepAlive: false, hiddenHeaderContent: false,},
							},
							
						]
					},
					{
						path:'/coupon',
						name:'coupon',
						component:RouteView,
						meta: { title:'优惠卷',icon:'form', menuKey:'sub5', keepAlive: false, hiddenHeaderContent: true,},
						children:[
							{
								path:'/coupon/Addcoupon',
								name:'Addcoupon',
								component:()=>import('@/views/coupon/coupon'),
								meta: { title:'添加优惠卷',menuSelectKey:'15',  keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:'/coupon/couponList',
								name:'couponList',
								component:()=>import('@/views/coupon/couponList'),
								meta: { title:'优惠卷列表',menuSelectKey:'16',  keepAlive: false, hiddenHeaderContent: false,},
							},
						]
					},
					{
						path:'/form',
						name:'form',
						component:RouteView,
						meta: { title:'表单页',icon:'form', menuKey:'sub6', keepAlive: false, hiddenHeaderContent: true,},
						children:[
							{
								path:'/form/basicsForm',
								name:'basicsForm',
								component:()=>import('@/views/form/basicsForm'),
								meta: { title:'基础表单',menuSelectKey:'17',  keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:'/form/advancedForm',
								name:'advancedForm',
								component:()=>import('@/views/form/advancedForm'),
								meta: { title:'高级表单',menuSelectKey:'18',  keepAlive: false, hiddenHeaderContent: false,},
							},
							{
								path:'/form/substepFrom',
								name:'substepFrom',
								component:()=>import('@/views/form/substepFrom'),
								meta:{ title:'转账表单',menuSelectKey:'19',  keepAlive: false, hiddenHeaderContent: false,},
							},
						]
					},
					
					{
						path:'/detail',
						name:'detail',
						component:RouteView,
						meta:{ title:'详情页',icon:'profile',menuKey:'sub7', keepAlive: false, hiddenHeaderContent:true,},
						children:[
							{
								path:'/detail/basics',
								name:'basice',
								component:()=>import('@/views/detail/basics'),
								meta: { title:'基础详情页',menuSelectKey:'20',  keepAlive: false, hiddenHeaderContent: false,},
							}
						]
					},
					{
						path:'/exception',
						name:'exception',
						component:RouteView,
						redirect:'/exception/403',
						meta: { title:'异常页', icon:'warning', menuKey:'sub8',  keepAlive: false, hiddenHeaderContent: true,},
						children: [
							{//三级子路由
							  path: '/exception/403',
						      name: '403',
						      component: ()=>import('@/views/exception/403'),
						      meta: { title:'403',menuSelectKey:'21',  keepAlive: false, hiddenHeaderContent: true,},
							},
							{
							  path: '/exception/404',
						      name: '404',
						      component: ()=>import('@/views/exception/404'),
						      meta: { title:'404',menuSelectKey:'22',  keepAlive: false, hiddenHeaderContent: true,},
							},
							{
							  path: '/exception/500',
						      name: '500',
						      component: ()=>import('@/views/exception/500'),
						      meta: { title:'500',menuSelectKey:'23',  keepAlive: false, hiddenHeaderContent: true,},
							},
						]
					},
					{
						path:'/user',
						name:'user',
						component:RouteView,
						meta: { title:'个人页',icon:'user', menuKey:'sub9', keepAlive: false, hiddenHeaderContent: true,},
						children:[
							{
								path:'/account/center',
								name:'center',
								component:()=>import('@/views/account/center/index'),
								meta:{title:'个人主页',menuSelectKey:'24',  keepAlive: false, hiddenHeaderContent: true,}
							},
							{
								path:'/account/Personal_settings',
								name:'Personal_settings',
								component:()=>import('@/views/account/settings/Personal_settings.vue'),
								meta:{title:'个人设置',menuSelectKey:'25',  keepAlive: false, hiddenHeaderContent: true,}
							}
						]
					},
		    ]
		},
		
		
		//登录，注册路由
		{
			path: '/user/login',
			name: 'login',
			component: ()=>import('@/views/user/Login')
		},
		{
			path: '/user/Register',
			name: 'Register',
			component: ()=>import('@/views/user/Register'),
		},
		{
			path: '/user/RegisterResult',
			name: 'RegisterResult',
			component: ()=>import('@/views/user/RegisterResult'),
		},
	]
})

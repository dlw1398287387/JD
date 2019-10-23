import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
//	mode: 'history',
  routes: [
		{
			path:'/',
			name:'index',
			redirect:'pet_home',
			meta: { keepAlive: false, },
		},
		{//主页
			path:'/pet_home',
			name:'pet_home',
			component:()=>import('@/views/shop/pet_home'),
			meta: { keepAlive: false, },
		},
		{//搜索栏
			path:'/search',
			name:'search',
			component:()=>import('@/views/shop/search'),
			meta: { keepAlive: false, },
		},
		{//商品列表，例如/搜索商品跳转的列表
			path:'/productList',
			name:'productList',
			component:()=>import('@/views/shop/productList/productList'),
		},
		{//搜索宠物商店页头部
			path:'/Folded_plate',
			name:'Folded_plate',
			component:()=>import('@/components/modularization/Folded_plate'),
			meta: { keepAlive: false, },
		},
		{//搜索宠物商店列表
			path:'/petStoreList',
			name:'petStoreList',
			component:()=>import('@/views/shop/petStoreList'),
			meta: { keepAlive: false, },
		},
		{//商品详情页
			path:'/details_navigation',
			name:'details_navigation',
			component:()=>import('@/views/shop/commodity/details_navigation'),
			meta: { keepAlive: false, },
		},
		{
			path:'/purchase',
			name:'purchase',
			component:()=>import('@/views/shop/commodity/purchase'),
			meta: { keepAlive: false, },
		},
		{//用户主页
			path:'/Users/User_page',
			name:'User_page',
			component:()=>import('@/views/shop/Users/User_Page'),
			meta: { keepAlive: true, },
		},
		{//用户设置
			path:'/Users/setting',
			name:'setting',
			component:()=>import('@/views/shop/Users/setting'),
			meta: { keepAlive: false, },
		},
		{//店铺关注，喜欢，浏览记录 子页
			path:'/container',
			name:'container',
			component:()=>import('@/views/shop/Users/container'),
			meta: { keepAlive: false, },
		},
		{//收货地址列表
			path:'/Users/ConsigneeList',
			name:'ConsigneeList',
			component:()=>import('@/views/shop/Users/address/ConsigneeList'),
			meta: { keepAlive: false, },
		},
		{//添加收货列表
			path:'/Users/AddConsignee',
			name:'AddConsignee',
			component:()=>import('@/views/shop/Users/address/AddConsignee'),
			meta: { keepAlive: false, },
		},
		{//修改收货列表
			path:'/Users/EditConsignee',
			name:'EditConsignee',
			component:()=>import('@/views/shop/Users/address/EditConsignee'),
			meta: { keepAlive: false, },
		},
		{//我的优惠卷列表
			path:'/Users/Coupon',
			name:'Coupon',
			component:()=>import('@/views/shop/Users/coupons/coupons'),
			meta: { keepAlive: false, },
		},
		{//订单页
			path:'/Users/orderLists',
			name:'orderLists',
			component:()=>import('@/views/shop/Users/Orders/orderLists'),
			meta: { keepAlive: false, },
		},
		{//提交订单
			path:'/confirmOrder',
			name:'confirmOrder',
			component:()=>import('@/views/shop/commodity/confirmOrder'),
			meta: { keepAlive: false, },
		},
		{//购物车订单提交
			path:'/submitCart',
			name:'submitCart',
			component:()=>import('@/views/shop/commodity/submitCart'),
			meta: { keepAlive: false, },
		},
		{//商品运送完成后评价
			path:'/evaluate',
			name:'evaluate',
			component:()=>import('@/views/shop/Users/evaluate/evaluate'),
			meta: { keepAlive: false, },
		},
		{//店铺主页
			path:'/petStore',
			name:'petStore',
			component:()=>import('@/views/shop/petStore/home')
		},
		{//购物车
			path:'/shoppingCart',
			name:'shoppingCart',
			component:()=>import('@/views/shop/shoppingCart'),
			meta: { keepAlive: false, },
		},
		{//城市服务分类
			path:'/cityHome',
			name:'cityHome',
			component:()=>import('@/views/shop/cityService/home'),
			meta: { keepAlive: false, },
		},
		{//城市服务列表
			path:'/cityServiceList',
			name:'cityServiceList',
			component:()=>import('@/views/shop/cityService/cityServiceList'),
			meta: { keepAlive: false, },
		},
		{//城市服务商品详情
			path:'/serviceDtails',
			name:'serviceDtails',
			component:()=>import('@/views/shop/cityService/dtails/dtails'),
			meta: { keepAlive: false, },
		},
		{//购买城市服务（预约）
			path:'/confirmService',
			name:'confirmService',
			component:()=>import('@/views/shop/cityService/dtails/confirmService'),
			meta: { keepAlive: false, },
		},
    { //设备端 petTV
      path: '/pettv',
      name: 'pettv',
      component:()=>import('@/views/pet_tv/petTv'),
      meta: { keepAlive: false, },
    },
		{//协议页
			path:'/registerProtocol',
			name:'registerProtocol',
			component:()=>import('@/views/Userreadingprotocol/RegisterProtocol'),
			meta: { keepAlive: false, },
		},
		{//隐私
			path:'/Users/privacy',
			name:'privacy',
			component:()=>import('@/views/shop/else/privacy'),
			meta: { keepAlive: false, },
		},
		{//反馈
			path:'/Users/feedback',
			name:'feedback',
			component:()=>import('@/views/shop/else/feedback'),
			meta: { keepAlive: false, },
		},
		{//关于我们
			path:'/User/About_Us',
			name:'About_Us',
			component:()=>import('@/views/shop/else/About_Us'),
			meta: { keepAlive: false, },
		},
    {//400错误页面
			path:'/400',
			name:'400',
			component:()=>import('@/views/error/400'),
			meta: { keepAlive: false, },
		},
		//测试页面
		{
    	path:'/t1',
    	name:'t1',
    	component:()=>import('@/views/test/t1'),
    	meta: { keepAlive: false, },
    },
    {
    	path:'/No_more',
			name:'No_more',
			component:()=>import('@/components/modularization/No_more'),
			meta: { keepAlive: false, },
    },
    {
    	path:'/check',
    	name:'check',
    	component:()=>import('@/views/test/check'),
    	meta: { keepAlive: false, },
    },
    {
    	path:'/file',
    	name:'file',
    	component:()=>import('@/views/test/file'),
    	meta: { keepAlive: false, },
    },
    {
    	path:'/offlineServiceHome',
    	name:'offlineServiceHome',
    	component:()=>import('@/views/offlineService/Home'),
    	meta: { keepAlive: false, },
    },
    {
    	path:'/serviceList',
    	name:'serviceList',
    	component:()=>import('@/views/offlineService/serviceList'),
    	meta: { keepAlive: false, },
    },
  ],
  
  /**
   * 解决跳转第二页不在顶部的问题！
   */
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
	}
})


//		{//商品详情页——(导航栏)
//  	path:'/detailsLayout',
//  	name:'detailsLayout',
//  	component:()=>import('@/components/modularization/detailsLayout'),
//  	children:[
//  			
//  	]
//  },
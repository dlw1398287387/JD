import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
export default new Vuex.Store({
	state:{//设置常量
		count:1,
		data:'aaa',
		userInfo:{},
		//选择线下产品分类 分类参数。
		ServiceParams:JSON.parse(sessionStorage.getItem('serviceParams')),
		//点击查看商品详情的vuex管理,
		ProductDetails:JSON.parse(sessionStorage.getItem('productDetails')),
		//优惠卷
		UserCoupon:JSON.parse(sessionStorage.getItem('userCoupon')),
		//商铺信息
		ShopProductList:JSON.parse(sessionStorage.getItem('StoreInformation')),
		//搜索关键字
		SearchText:sessionStorage.getItem('searchText'),
		//搜索商品信息
		SearchProductList:JSON.parse(sessionStorage.getItem('searchProductList')),
		//从分类中搜索的线下服务产品
		OfflineServiceList:JSON.parse(sessionStorage.getItem('offlineServiceList')),
		//点击查看线下服务产品详情的vuex管理,
		OfflineServiceDetails:JSON.parse(sessionStorage.getItem('offlineServiceDetails'))
	},
	mutations:{//改变常量方法集
		aa(state){
			state.count+=2
		},
		bb(state,data){
			state.userInfo=data
		},
		setServiceParams(state){
			state.ServiceParams=JSON.parse(sessionStorage.getItem('serviceParams'))
		},
		setProductDetails(state){
			//防止页面刷新数据消失
			state.ProductDetails=JSON.parse(sessionStorage.getItem('productDetails'))
		},
		setUserCoupon(state){
			//防止页面刷新数据消失
			state.UserCoupon=JSON.parse(sessionStorage.getItem('userCoupon'))
		},
		setShopProductList(state){
			//设置获取店铺产品信息
			state.ShopProductList=JSON.parse(sessionStorage.getItem('StoreInformation'))
		},
		setSearchText(state){
			//设置搜索关键字
			state.SearchText=sessionStorage.getItem('searchText')
		},
		setSearchProductList(state){
			//设置搜索商品列表
			state.SearchProductList=JSON.parse(sessionStorage.getItem('searchProductList'))
		},
		setOfflineServiceList(state){
			//设置搜索商品列表
			state.OfflineServiceList=JSON.parse(sessionStorage.getItem('offlineServiceList'))
		},
		setOfflineServiceDetails(state){
			state.OfflineServiceDetails=JSON.parse(sessionStorage.getItem('offlineServiceDetails'))
		}
		
	},
	getters:{//派生一个常量，
		one:state=>{
			return state.count
		},
		
	}
})

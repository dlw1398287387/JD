import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
const that=this
export default new Vuex.Store({
	state:{//设置常量
		count:1,
		data:'aaa',
		userInfo:{username:"chenbida"}
	},
	mutations:{//改变常量方法集
		aa(state){
			state.count+=2
		}
	},
	getters:{//派生一个常量，
		one:state=>{
			return state.count
		}
	}
	
})
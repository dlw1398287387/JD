<template>
	<div style="height: 100vh;">
		<div class="User_Nabigation">
				<van-row>
				  <van-col span="3">
				  	<div class="User_Nabigation_left_icon" @click="goback">
				  		<van-icon name="arrow-left" />
				  	</div>
				  </van-col>
				  <van-col span="18">
				  	<div class="User_Nabigation_center_icon">
				  		选择服务分类
				  	</div>
				  </van-col>
				  <van-col span="3">
				  	<div class="User_Nabigation_rigth_icon" @click="goSkip('setting')">
				  		<!--<van-icon name="setting" />-->
				  	</div>
				  </van-col>
				</van-row>
			</div>
		<van-tree-select
		  :items="items"
		  :active-id.sync="activeIds"
		  :main-active-index.sync="mainActiveIndex"
		  @click-nav="onClickItem"
		  height="100%"
		>
			<div slot="content" v-for="item in content">
				<div style="float: left; width: 50%; margin-bottom: 20px;" @click="optionsService(item)">
					<img :src="item.imgs" style="width: 80px; height: 80px;" />
					<span style="display: flex; justify-content: center; color: #9F9F9F;">{{item.text}}</span>
				</div>
			</div>
		</van-tree-select>
	</div>
</template>

<script>
	import {items} from '@/views/shop/cityService/type.js';
	import navigationTop from '@/components/modularization/navigationTop';
	import { TreeSelect,Toast } from 'vant';
	export default{
		name:"home",
		data(){
			return{
				items,
			    activeIds: 1,
			    mainActiveIndex: 0,
			    content:items[0].children,
			}
		},
		mounted(){
			
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			onClickItem(index){
				this.content=items[index].children
			},
			optionsService(val){ //,
				Toast.loading({
				  mask: true,
				  message: '加载中...'
				});
				console.log(val)
				var data = {
					classify:val.text,
					lan:113.9924240112,
					lat:22.6925862447
				}
				this.$Request_post(this.$request+"/findByCityService",data).then(res=>{
					Toast.clear();
					console.log(res)
					//在vuex中管理状态，使用session，避免页面刷新数据消失，
					sessionStorage.setItem('offlineServiceList',JSON.stringify(res.data));
					//commit一次，再次让vuex状态重新获取一次值对象。
					this.$store.commit('setOfflineServiceList')
					console.log(res.data.length>0)
					if(res.data.length>0){
						this.$router.push({name:'cityServiceList'})
					}else{
						Toast('未找到此类型的服务！');
					}
					
				})
			}
		},
		components:{
			navigationTop,TreeSelect,Toast
		}
	}
</script>

<style lang="scss" scoped>
	.User_Nabigation{
		height: 35px;
		border: 0px solid black;
		margin-bottom: 10px;
		.User_Nabigation_left_icon{
			font-size: 24px;
			display: flex;
			margin-top: 3px;
			margin-left: 10px;
			line-height: 35px;
		}	
		.User_Nabigation_center_icon{
			font-size: 16px;
			display: flex;
			margin-top: 8px;
			justify-content: center;
		}
		.User_Nabigation_rigth_icon{
			font-size: 24px;
			display: flex;
			margin-left: 8px;
			margin-top: 4px;
			line-height: 35px;
		}
	}
</style>
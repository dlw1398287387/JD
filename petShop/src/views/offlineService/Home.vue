<template>
	<div>
		<!-- 服务页头部back 标题  导航栏代码块  -->
		<div style="height: 40px; border: 0px solid black; width: 100%; position: fixed; z-index: 999; background: #FFFFFF;">
			<van-row>
			  <van-col span="4"><van-icon style="line-height: 40px;" size="24px" name="arrow-left" /></van-col>
			  <van-col span="16"><span style="font-size: 18px; line-height: 40px;">classification of service</span></van-col>
			  <van-col span="4"></van-col>
			</van-row>
		</div>
		<div style="height: 40px;"></div>
		<!--服务页  服务分类栏目选项 -->
		<div style="width: 94%; margin-left: 3%; margin-top: 10px;">
			<van-row>
			  <van-col span="6" v-for="item in serviceIcon" @click="optionsType(item)" style="margin-bottom: 10px;">
			  	<img class="serviceImgType" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1566799153&di=3910f036ef81c15a625c13839ede6347&src=http://5b0988e595225.cdn.sohucs.com/images/20180518/74a4b38758934bf6b06bfa649de39272.jpg"/>
			  	<span style="display: flex; justify-content: center;">{{item.text}}</span>
			  </van-col>
			</van-row>
		</div>
		
		<div style="width: 99%; height: 600px; border: 1px solid black;">
			广告 推荐服务
		</div>
	</div>
</template>

<script>
	import {datas} from '@/views/offlineService/data.js'
	import { Row, Col,Icon  } from 'vant';
	export default{
		name:'Home',
		data(){
			return{
				serviceIcon:datas,
			}
		},
		methods:{
			optionsType(item){
				console.log(item)
				//在vuex中管理状态，使用session，避免页面刷新数据消失，
				sessionStorage.setItem('serviceParams',JSON.stringify(item));
				//commit一次，再次让vuex状态重新获取一次值对象。
				this.$store.commit('setServiceParams')
				this.$router.push({name:'serviceList'})
			}
		},
		components:{
			Row, Col,Icon 
		}
	}
</script>

<style lang="scss" scoped>
	.serviceImgType{
		width: 80%; 
		height: 70px; 
		border-radius: 50%;
	}
	@media only screen and (min-width:320px ) and (max-width:320px) {
		.serviceImgType{
			width: 80%; 
			height: 60px; 
			border-radius: 50%;
		}
	}
	@media only screen and (min-width:768px ) and (max-width:768px) {
		.serviceImgType{
			width: 60%; 
			height: 100px; 
			border-radius: 50%;
		}
	}
	@media only screen and (min-width:1024px ) and (max-width:1024px) {
		.serviceImgType{
			width: 50%; 
			height: 120px; 
			border-radius: 50%;
		}
	}
</style>
<template>
	<div>
		<!-- 服务页头部back 标题  导航栏代码块  -->
		<div style="height: 40px; border: 0px solid black; width: 100%; position: fixed; z-index: 999; background: #FFFFFF;">
			<van-row>
				<van-col span="4">
					<van-icon style="line-height: 40px;" size="24px" name="arrow-left" /></van-col>
				<van-col span="16"><span style="font-size: 18px; line-height: 40px;">{{content.text}}</span></van-col>
				<van-col span="4"></van-col>
			</van-row>
		</div>
		<div style="height: 40px;"></div>
		<!--服务页  服务分类栏目选项 -->
		<div style="width: 94%; margin-left: 3%; margin-top: 10px; margin-bottom: 30px;">
			<van-row>
				<van-col span="6" v-for="item in content.children">
					<img class="serviceImgType" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1566799153&di=3910f036ef81c15a625c13839ede6347&src=http://5b0988e595225.cdn.sohucs.com/images/20180518/74a4b38758934bf6b06bfa649de39272.jpg" />
					<span style="display: flex; justify-content: center;">{{item.text}}</span>
				</van-col>
			</van-row>
		</div>
		<!---->
		<div style="margin-bottom: 30px;">
			<van-swipe :loop="false" :height="swipeHeight">
				<van-swipe-item>
					<img style="width: 100%; height: 200px;" src="http://192.168.10.102:8089/15908619974@163.com/1.jpg" />
				</van-swipe-item>
				<van-swipe-item>
					<img style="width: 100%; height: 200px;" src="http://192.168.10.102:8089/15908619974@163.com/2.jpg" />
				</van-swipe-item>
				<van-swipe-item>
					<img style="width: 100%; height: 200px;" src="http://192.168.10.102:8089/15908619974@163.com/3.jpg" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<!---->
		<van-tabs v-model="active">
			<van-tab title="bath">Pet bath</van-tab>
			<van-tab title="shearing">内容 2</van-tab>
			<van-tab title="manicure">内容 3</van-tab>
			<van-tab title="dye">内容 4</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import { Row, Col, Icon, Swipe, SwipeItem, Lazyload, Tab, Tabs } from 'vant';
	export default {
		name: 'serviceList',
		data() {
			return {
				content: this.$store.state.ServiceParams,
				swipeHeight: 200,
				active: 0
			}
		},
		mounted() {
			console.log(this.$store.state.ServiceParams)
		},
		methods: {},
		components: {
			Row,
			Col,
			Icon,
			Swipe,
			SwipeItem,
			Lazyload,
			Tab,
			Tabs
		},

	}
</script>

<style lang="scss" scoped>
	.serviceImgType {
		width: 80%;
		height: 70px;
		border-radius: 50%;
	}
	
	@media only screen and (min-width:320px) and (max-width:320px) {
		.serviceImgType {
			width: 80%;
			height: 60px;
			border-radius: 50%;
		}
	}
	
	@media only screen and (min-width:768px) and (max-width:768px) {
		.serviceImgType {
			width: 60%;
			height: 100px;
			border-radius: 50%;
		}
	}
	
	@media only screen and (min-width:1024px) and (max-width:1024px) {
		.serviceImgType {
			width: 50%;
			height: 120px;
			border-radius: 50%;
		}
	}
</style>
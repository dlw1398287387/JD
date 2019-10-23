<template>
	<div>
		<div style="height: 50px;width: 100%; background:#FFFFFF; position: fixed; z-index: 999;">
			<van-row>
			  <van-col span="3">
			  	<van-icon style="margin: 10px; margin-left: -1px;" size="24px" name="arrow-left" @click="goSkip"/>
			  </van-col>
			  <van-col span="20">
				  	<span style="font-size: 16px; line-height: 44px;">城市服务</span>
			  </van-col>
			  <!--<van-col span="6">-->
			  	<!--<div style="display: flex; float: right; margin-right: 10px;">
			  		<van-icon name="location-o" style=" line-height: 44px;" />
					<span class="citySpan" @click="opens">{{city==''?"选择城市":city}}</span>
				</div>-->
			  <!--</van-col>-->
			</van-row>
			<van-row>
			  	<van-col span="24">
					<van-dropdown-menu>
					  <van-dropdown-item v-model="value1" :options="option1" />
					  <van-dropdown-item v-model="value2" :options="option2" />
					</van-dropdown-menu>
				</van-col>
			</van-row>
		</div>
		<cityPicker ref="city" v-on:cityPicker="cityPicker"></cityPicker>
		<div style="height: 100px"></div>
		<div style="width: 100%; margin-left: 0%; text-align: left; border-bottom:1px solid #ddd;" v-for="item in data">
			<van-card
			  :thumb="item.productImg[0]"
			  :title="item.productName"
			  :desc="'地址：'+item.storeCity[1]+item.storeCity[2]+item.storeAddress" 
			  :price="item.price"
			  currency="$"
			  @click="openProduct(item)"
			>
			<div slot="bottom">距离您：{{item.dist.toFixed(0)}}米</div>
			<div slot="footer">{{item.commentSum}}条评价/{{item.grade==0?"暂无评价":"好评"+Math.round(item.grade/item.commentSum)}}{{item.grade==0?'':'%'}}</div>
			</van-card>
			
		</div>
		
	</div>
</template>

<script>
	import cityPicker from '@/components/popups/cityPicker'
	import {Icon,Row,Col,Tag,DropdownMenu, DropdownItem,Card} from 'vant';
	export default{
		name:"cityServiceList",
		data(){
			return{
				city:'',
				value1: 0,
		        value2: 'a',
		        option1: [
		          { text: '全部商品', value: 0 },
		          { text: '新款商品', value: 1 },
		          { text: '活动商品', value: 2 }
		        ],
		        option2: [
		          { text: '默认排序', value: 'a' },
		          { text: '好评排序', value: 'b' },
		          { text: '销量排序', value: 'c' },
		        ],
		        data:this.$store.state.OfflineServiceList
			}
		},
		mounted(){
			console.log(this.$store.state.OfflineServiceList)
		},
		methods:{
			cityPicker(val){
				console.log(val)
				this.city=val[2].name
			},
			goSkip(){this.$router.go(-1)},
			opens(){
				this.$refs.city.onOpenshow();
			},
			openProduct(item){
//				console.log(item)
				//在vuex中管理状态，使用session，避免页面刷新数据消失，
				sessionStorage.setItem('offlineServiceDetails',JSON.stringify(item));
				//commit一次，再次让vuex状态重新获取一次值对象。
				this.$store.commit('setOfflineServiceDetails')
				this.$router.push({name:'serviceDtails'})
			},
		},
		components:{
			cityPicker,Icon,Row,Col,Tag,DropdownMenu,DropdownItem
		}
	}
</script>

<style lang="scss" scoped>
	.citySpan{
		display: flex; 
		line-height: 44px;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		/*! autoprefixer: off*/
		-webkit-box-orient:vertical;
		/* autoprefixer: on */
		-webkit-line-clamp:1; 
	}
	
</style>
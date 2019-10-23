<template>
	<div style="height: 120vh;" >
		<div style="height: 50px;width: 100%; background:#FFFFFF; position: fixed; z-index: 999;">
			<van-row>
			  <van-col span="3">
			  	<van-icon style="margin: 10px;" size="24px" name="arrow-left" @click="goSkip"/>
			  </van-col>
			  <van-col span="17">
				  	<span class="storeName" v-if="data!=null">{{data[0].ShopName}}</span>
				  	<span style="font-size: 12px; color: #9F9F9F;display: flex;margin-left: 8px;">1613.7万人关注</span>
			  </van-col>
			  <van-col span="4">
				  	<van-tag round type="danger" style="margin-top: 6px;line-height: 20px; margin-top: 4px;">
					  	<van-icon style="display: flex; margin-top: 4px;" size="14px" color="" name="like-o" />
					  	<span style="display: flex; margin-top: -16px; margin-left: 14px;">关注</span>
				  	</van-tag>
			  </van-col>
			</van-row>
			<van-row>
			  	<van-col span="24">
					<DropdownMenu style="text-align: left;">
					  <DropdownItem v-model="value1" :options="option1" />
					  <DropdownItem v-model="value2" :options="option2" />
					</DropdownMenu>
				</van-col>
			</van-row>
		</div>
		<div style="height: 110px"></div>
		
		<div style="position: absolute;width: 100%; background: #FAFAFA;">
			<div class="store_product_box" v-for="item in data" @click="checkGoods(item)">
					<div style="width: 35%;">
						<van-image width="120" height="120" style="width: 100%;" :src="item.productImg[0]" />
					</div>
					<div style="width: 65%;">
						<span class="storeProductName">
							<van-tag v-if="item.buildTime==null" style="font-size: 10px;" size="large" round type="danger">热销</van-tag>
							<van-tag v-if="item.buildTime!=null" style="font-size: 10px;" size="large" round type="danger">促销</van-tag>
							&nbsp;{{item.productName}}
						</span>
						<span class="storeProductPrice">￥{{item.defalutSelect.price}}.00</span>
						<span class="storeProductevaluateCount">{{item.commentSum}}条评价</span>
						<span class="storeProductfavorableRate">{{item.grade==0?"暂无好评":"好评"+Math.round(item.grade/item.commentSum)}}%</span>
						<div style="border-bottom: 1px solid #7D7E80; margin-top: 14px;"></div>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { DropdownMenu, DropdownItem, Icon, Row, Col, Tag, Image  } from 'vant';
	export default{
		name:"home",
		data(){
			return{
				value:"",
				data:this.$store.state.ShopProductList,
				dataState:false,
				value1: 0,
		        value2: 'a',
		        option1: [{ text: '全部商品', value: 0 }],
		        option2: [{ text: '销量排序', value: 'a' },{ text: '好评排序', value: 'b' },{ text: '', value: 'c' },],
			}
		},
		mounted(){
			console.log(this.$store.state.ShopProductList)
		},
		methods:{
			goSkip(){
				this.$router.go(-2)
			},
			checkGoods(val){
				console.log(val)
				//在vuex中管理状态，使用session，避免页面刷新数据消失，
				sessionStorage.setItem('productDetails',JSON.stringify(val));
				//commit一次，再次让vuex状态重新获取一次值对象。
				this.$store.commit('setProductDetails',val)
				this.$router.push({name:'details_navigation'})
			},
			Sort1(arr){//排序，按销量排序
				console.log(1)
			    for (var i = 0; i < arr.length; i++) {
			        for (var j = i; j < arr.length; j++) {
			            if (arr[i].commentSum < arr[j].commentSum) {
			                var maxStr = arr[j];
			                arr[j] = arr[i];
			                arr[i] = maxStr;
			            }
			        };
			    };
			    return arr;
			},
			Sort2(arr){//排序，按好评排序
			    for (var i = 0; i < arr.length; i++) {
			        for (var j = i; j < arr.length; j++) {
			            if (arr[i].grade/arr[i].commentSum < arr[j].grade/arr[j].commentSum) {
			                var maxStr = arr[j];
			                arr[j] = arr[i];
			                arr[i] = maxStr;
			            }
			        };
			    };
			    return arr;
			},
		},
		watch:{
			value2(val){//监听过滤器选择，并执行对应排序。
				if(val=="a"){
					this.data = this.Sort1(this.$store.state.ShopProductList)
				}
				if(val=="b"){
					this.data = this.Sort2(this.$store.state.ShopProductList)
				}
			}
		},
		components:{
			DropdownMenu, 
			DropdownItem,
			Icon,
			Row, 
			Col,
			Tag,
			Image
		}
	}
</script>

<style lang="scss" scoped>
	.store_product_box{
		display: flex;
		width: 100%;
		height: 120px;
		border: 0px solid black;
		margin-bottom: 10px;
	}
	.storeName{
		display: flex; 
		font-size: 16px;
		margin-left: 8px; 
		font-weight: bold; 
		margin-top:4px;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		/*! autoprefixer: off*/
		-webkit-box-orient:vertical;
		/* autoprefixer: on */
		-webkit-line-clamp:1; 
		text-align:left;
	}
	.storeProductName{
		font-size: 14px;
		margin-left: 10px;
		color: #666666;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		/*! autoprefixer: off*/
		-webkit-box-orient:vertical;
		/* autoprefixer: on */
		-webkit-line-clamp:2; 
		text-align:left;
	}
	.storeProductPrice{
		font-size: 14px;
		font-weight: bolder;
		display: flex;
		color: red;
		margin-left: 10px;
		margin-top: 30px;
	}
	.storeProductevaluateCount{
		font-size: 12px;
		color: #7D7E80;
		display: block;
		text-align: left;
		margin-left: 10px;
	}
	.storeProductfavorableRate{
		font-size: 12px;
		color: #7D7E80;
		text-align: left;
		display: flex;
		margin-left: 10px;
		margin-top: -16px;
		justify-content: center;
	}
</style>
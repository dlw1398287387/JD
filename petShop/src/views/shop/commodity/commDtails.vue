<template>
	<div>
		<van-swipe @change="onChange">
			<div v-for="item in productContent1.productImg">
				<van-swipe-item>
					<img class="swipe_imgs" :src="item" />
				</van-swipe-item>
			</div>

			<div class="custom-indicator" slot="indicator">
				{{ current + 1 }}/{{productContent1.productImg.length}}
			</div>
		</van-swipe>

		<div class="details_content">
			<!--促销价格  2个Icon-->
			<div class="details_next">
				<span class="details_price">¥{{productContent1.versionInfo[0].price}}.00</span>
				<div class="details_icon_box1">
					<van-icon class="details_icon1" name="refund-o" />
					<span class="details_icon1_text">降价通知</span>
				</div>
				<div class="details_icon_box2">
					<van-icon class="details_icon2" name="like-o" />
					<span class="details_icon1_text" @click="befond">关注</span>
				</div>
			</div>
			<!--原价格-->
			<span class="original_cost">¥{{productContent1.original_Price}}.00</span>

			<!--商品名称-->
			<div>
				<span class="commodity_name">{{productContent1.productName}}</span>
			</div>
			<!--商品描述，或者是备注-->
			<div>
				<span class="commodity_desc">{{productContent1.description}}</span>
			</div>
			<div style="margin-top: 10px; border-bottom: 1px solid #666;"></div>
			<div style="height: 10px; background: #F7F8FA;"></div>
			<!--选项-->
			<div class="commodity_configuration">
				<!--优惠卷-->
				<div v-if="CouponState" style="margin-top:0px ; background: #FFFFFF;">
					<van-row>
						<van-col span="4">
							<span style="display: flex; margin: 10px; font-size: 14px; color: #666;">领卷</span>
						</van-col>
						<van-col span="18" style="padding: 6px 0px;">
							<span style="font-size: 12px; font-weight: bold;color: red;">
								<van-tag plain type="danger">{{CouponText1}}</van-tag>
								<van-tag plain type="danger" v-if="CouponText2!=''">{{CouponText2}}</van-tag>
							</span>
						</van-col>
						<van-col span="2">
							<van-icon name="ellipsis" @click="onOpenCoupon" style="margin: 8px; font-weight: bold;" />
						</van-col>
					</van-row>
					<GetCoupon ref="getCoupon" :couponData="CouponData"></GetCoupon>
				</div>
				<!--选择配置，或者商品类型，大小，价格-->
				<div style="margin-top:0px; background: #FFFFFF;">
					<van-row>
						<van-col span="4">
							<span style="display: flex; margin: 10px; font-size: 14px; color: #666;">已选</span>
						</van-col>
						<van-col span="18" style="padding: 6px 0px;">
							<span style="font-size: 12px; font-weight: bold;">{{productContent1.defalutSelect.type}}-{{productContent1.defalutSelect.versions}}</span>
						</van-col>
						<van-col span="2">
							<van-icon name="ellipsis" @click="onOpencation" style="margin: 8px; font-weight: bold;" />
						</van-col>
					</van-row>
					<Classification ref="classification" :comm="productContent1"></Classification>
				</div>
				<!--选择送货地址-->
				<div style="margin-top:0px ; background: #FFFFFF;">
					<van-row>
						<van-col span="4">
							<span style="display: flex; margin: 10px; font-size: 14px; color: #666;">送至</span>
						</van-col>
						<van-col span="18" style="padding: 6px 0px;">
							<span style="font-size: 12px;">{{changessite.address!=null?changessite.address:defaultAddress}}</span><br />
							<span style="color: red;font-size: 12px;">现货,</span>
							<span style="font-size: 12px;">今日16:00前完成下单，预计3月6日23:30前发货</span>
						</van-col>
						<van-col span="2">
							<van-icon name="ellipsis" style="margin: 8px; font-weight: bold;" @click="onOpenAddress" />
						</van-col>
					</van-row>
					<shippingAddress ref="shippingaddress" v-on:changeAddress="changeAddress"></shippingAddress>
				</div>
				<!--免运费desc-->
				<div style="margin-top:00px; background: #FFFFFF;">
					<van-row>
						<van-col span="4">
							<span style="display: flex; margin: 10px; font-size: 14px; color: #666;">运费</span>
						</van-col>
						<van-col span="20" style="padding: 6px 0px;">
							<span style="font-size: 12px; font-weight: bold;">免运费</span>
						</van-col>
					</van-row>
				</div>
				<div style="height: 100px; background: #FFFFFF;">
					<ul v-for="item in datas">
						<li class="detail_ul_li">
							<van-icon name="passed" color="red" class="detail_li_icon"/>
							<span style="font-size: 12px;">{{item}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!--<van-goods-action>-->
			<!--<van-goods-action-mini-btn icon="chat-o" text="客服" @click="clickService" />-->
			<!--<van-goods-action-mini-btn icon="shop-o" text="店铺" @click="clickShop" />
			<van-goods-action-mini-btn info="5" icon="cart-o" text="购物车" @click="clickShoppingCart" />
			<van-goods-action-big-btn text="加入购物车"  @click="Addtocart"/>
			<van-goods-action-big-btn primary text="立即购买" @click="clickPurchase" />
		</van-goods-action>-->
		<van-goods-action>
		  <van-goods-action-icon icon="shop-o" text="店铺" @click="clickShop" />
		  <van-goods-action-icon icon="cart-o" text="购物车" @click="clickShoppingCart" />
		  <van-goods-action-button type="warning" text="加入购物车" @click="Addtocart" />
		  <van-goods-action-button type="danger"  text="立即购买" @click="clickPurchase" />
		</van-goods-action>
	</div>
</template>
<!--GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn,-->
<script>
	import { Swipe, SwipeItem, Icon, GoodsAction,GoodsActionIcon,GoodsActionButton, Row, Col,Toast } from 'vant';
	import shippingAddress from '@/components/popups/shippingAddress'
	import Classification from '@/components/popups/Classification'
	import GetCoupon from '@/components/popups/GetCoupon'

	export default {
		name: 'commDtails',
		data() {
			return {
				datas:  ['店铺发货&售后','货到付款','送保险','极速审核','七天无理由退货',],
				current: 0,
				defaultsite:{},
				changessite:{},
				productContent1:this.$store.state.ProductDetails,
				CouponState:false,
				CouponData:[],
				CouponText1:"",
				CouponText2:""
				
			}
		},
		computed: {
			/**
			 * 计算金额
			 */
			CalculationAmount(){
				for(var j=0;j<this.datas.verify.length;j++){
					if(this.datas.defaultCheck.Classify==this.datas.verify[j].c&&this.datas.defaultCheck.Versions==this.datas.verify[j].v){
						return this.datas.verify[j].price
					}
				}
			},
			/**
			 * 计算当前设置的默认地址。并显示在地址栏里
			 */
			defaultAddress() {
				var addressList = JSON.parse(localStorage.getItem("DirectoryInquiries"))
				if(addressList!=null){
					for(var i = 0; i < addressList.length; i++) {
						if(addressList[i].id == "1") {
							console.log(addressList[i].address)
							this.defaultsite=addressList[i]
							return addressList[i].address
						}
					}
				}
			}
		},
		mounted() {
			console.log(this.$store.state.ProductDetails)
//			console.log(this.changessite.address==null)
			this.datas.defaultsite=this.changessite.address==null?this.defaultsite:this.changessite
			var data={
				merchantOpenId:this.productContent1.openId,
				classify:this.productContent1.classify[2],
			}
			//此请求是获取单商品的优惠卷或者是店铺卷
			this.$Request_post(this.$request+"/findByCoupon",data).then(res=>{
				console.log(res.data)
				if(res.data.length>0){
					this.CouponData=res.data
					this.CouponState=true
					if(res.data.length>=1){
						this.CouponText1="满"+res.data[0].priceFull+"元减"+res.data[0].priceSubtract
					}
					if(res.data.length>=2){
						this.CouponText2="满"+res.data[1].priceFull+"元减"+res.data[1].priceSubtract
					}
				}
			})
		},
		methods: {
			onChange(index) {//轮播图角标
				this.current = index;
			},
			onOpenAddress() {//回调shippingAddress中的唤醒方法
				this.$refs.shippingaddress.openShow()
			},
			onOpencation() {//回调shippingAddress中的关闭方法
				this.$refs.classification.onOpenshow()
			},
			onOpenCoupon(){//回调领卷窗口中的开方法
				this.$refs.getCoupon.onOpenshow()
			},
			clickService() {
				console.log("客服")
			},
			clickShoppingCart() {
				console.log("购物车")
				this.$router.push({name:'shoppingCart'})
			},
			clickShop() {
				console.log("店铺")
				Toast.loading({
				  mask: true,
				  message: '加载中...'
				});
				this.$Request_post(this.$request+"/findByShop",{openId:this.productContent1.openId}).then(res=>{
					console.log(res)
					sessionStorage.setItem('StoreInformation',JSON.stringify(res.data));
					this.$store.commit('setShopProductList')
					Toast.clear();
					this.$router.push({name:'petStore',params:{openId:this.productContent1.openId}})
				})
			},
			Addtocart(){//加入购物车
				var data={
					productId:this.productContent1.productId,
					putaway_type:this.productContent1.putaway_type,
					classify:this.productContent1.classify,
					ShopName:this.productContent1.ShopName,
					productImg:this.productContent1.productImg,
					productName:this.productContent1.productName,
					description:this.productContent1.description,
					defalutSelect:this.productContent1.defalutSelect,
					original_Price:this.productContent1.original_Price,
					merchantId:this.productContent1.openId,
				}
				console.log(data)
				data.defalutSelect.count=1
				this.$Request_post(this.$request+"/AddtoCart",data).then(res=>{
					console.log(res)
					if(res.data.n==1&&res.data.ok==1){
						Toast.success('添加成功')
					}
				})
			},
			clickPurchase() {//立即购买
				this.productContent1.value=1
				//在vuex中管理状态，使用session，避免页面刷新数据消失，
				sessionStorage.setItem('productDetails',JSON.stringify(this.productContent1));
				//commit一次，再次让vuex状态重新获取一次值对象。
				this.$store.commit('setProductDetails',this.productContent1)
				//将必要订单信息 传递给订单页。
				this.$router.push({name:'confirmOrder'})
			},
			changeAddress(val) {//设置新地址 回调方法
				this.changessite = val
				console.log(val)
			},
			befond(){
				
			}
		},

		components: {
			Swipe,
			SwipeItem,
			Icon,
			GoodsAction,GoodsActionIcon,GoodsActionButton,
			Row,
			Col,
			shippingAddress,
			Classification,
			GetCoupon,
			Toast
		}
	}
</script>

<style lang="scss" scoped>
	.swipe_imgs {
		width: 100%;
		height: 350px;
	}
	
	.custom-indicator {
		position: absolute;
		font-size: 14px;
		bottom: 10px;
		right: 10px;
		background: rgba(0, 0, 0, 0.1);
		color: #fff;
		padding: 2px 10px;
		border-radius: 8px;
	}
	
	.details_content {
		border: 0px solid black;
		.details_next {
			/*height: 40px;*/
			.details_price {
				display: flex;
				font-weight: bold;
				color: red;
				margin: 10px;
			}
			.details_icon_box1 {
				border: 0px solid black;
				height: 36px;
				width: 60px;
				float: right;
				margin-top: -40px;
				margin-right: 50px;
				.details_icon1 {
					font-size: 20px;
				}
				.details_icon1_text {
					font-size: 12px;
					display: flex;
					margin-left: 6px;
					margin-top: -4px;
				}
			}
			.details_icon_box2 {
				border: 0px solid black;
				height: 36px;
				width: 60px;
				float: right;
				margin-top: -40px;
				margin-right: 0px;
				.details_icon2 {
					font-size: 20px;
				}
				.details_icon1_text {
					font-size: 12px;
					display: flex;
					margin-left: 18px;
					margin-top: -4px;
				}
			}
		}
		.original_cost {
			display: flex;
			margin-left: 10px;
			color: #666;
			font-size: 14px;
			text-decoration: line-through;
		}
		.commodity_name {
			margin-top: 6px;
			font-size: 14px;
			font-weight: bold;
			margin-left: 10px;
			display: flex;
			text-align: left;
		}
		.commodity_desc {
			margin-top: 6px;
			font-size: 12px;
			margin-left: 10px;
			display: flex;
			text-align: left;
		}
	}
	
	.commodity_configuration {
		border: 1px solid #F7F8FA;
		background: #F7F8FA;
		text-align: left;
		height: 90px;
	}
	
	.detail_ul_li {
		float: left;
		padding: 0px 10px;
	}
	
	.detail_li_icon {
		font-size: 2px;
		margin-top: 4px;
	}
</style>
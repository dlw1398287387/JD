<template>
	<div>
		<navigationTop>
			<div slot="icon_left">
				<div style="margin-top: 5px; font-size: 24px;">
					<van-icon name="arrow-left" />
				</div>
			</div>
			<div slot="content_center">
				<span style="display: flex;justify-content: center;margin-top: 8px;">确认订单</span>
			</div>n
			<div slot="icon_right"></div>
		</navigationTop>
		
		<div style="width: 100%; height: 100%; background: #F7F7F7;">
			<div class="addressInformation">
				<div class="name_phone">
					<van-tag round type="danger">收件人</van-tag>&nbsp;&nbsp;<span>{{addressContent.name}}</span>&nbsp;&nbsp;&nbsp;<span style="margin-top: 2px;">{{addressContent.tel}}</span>
				</div>
				<div class="address"  @click="selectAddress">
					<van-tag round type="primary">地 &nbsp;&nbsp;&nbsp;址</van-tag>&nbsp;&nbsp;<span>{{addressContent.address}}</span>
				</div>
				<van-icon name="arrow" @click="selectAddress"  style='float: right; margin-top: -40px;font-size: 14px;font-weight: bold;margin-right: 6px;'/>
				<div class="border"></div>
				<shippingAddress ref="shippingaddress" v-on:changeAddress="changeAddress"></shippingAddress>
			</div>
			<div class="modeofpayment " @click="maintain">
				<van-cell title="支付方式" value="在线支付..." style="text-align: left;"/>
			</div>
			<div class="order_details">
				<div class="store">
					<van-icon name="shop-o" class="store_icon"/>
					<span class="store_name">{{orderContent.ShopName}}</span>
				</div>
				
				<div class="store_box">
					<img class="store_box_img" :src="orderContent.productImg[0]" />
					<span class="store_box_name">{{orderContent.productName}}</span>
					<span class="store_box_type">{{orderContent.defalutSelect.type}}，{{orderContent.defalutSelect.versions}}</span>
					<span class="store_box_price">¥{{orderContent.defalutSelect.price*orderContent.value}}.00</span>
					<div class="store_box_tag">支持七天无理由退货(拆封后不支持)</div>
				</div>
				
				<div class="store_count">
					<span style="margin-left: 10px; line-height:30px;">购买数量</span>
					<van-stepper v-model="orderContent.value" style="margin-right: 10px;"/>
				</div>
				
				<div>
					<van-cell title="配送" value="商家默认快递" style="text-align: left;"/>
	  				<van-cell title="工作日、双休与节假日均送货" style="text-align: right;"/>
				</div>
				
				<div class="afterService">
					<span>退换无忧&nbsp;<label style="font-weight: bold;">商家赠送<van-icon name="info-o" /></label></span>
					<span>7天退货，15天内换货。</span>
				</div>  
				
				<div class="leave_msg">
					<span class="leave_span">留言</span>&nbsp;&nbsp;
					<input class="leave_input" v-model="leaveAmessage " type="text" placeholder="建议留言前先与商家沟通确认" />
				</div>
				<div style="display: flex;margin-bottom: 20px; justify-content: space-between; background: #FFFFFF;" @click="showInvoice">
					<span style="font-size: 14px;margin-left: 10px;">发票</span>
					<span style="font-size: 14px;margin-right: 10px;">{{Incoice}}&nbsp;&nbsp;<van-icon name="weapp-nav"/></span>
				</div>
				<invoice ref="invoice" v-on:BackIncoice="BackIncoice"></invoice>
				
				<div style="display: flex;margin-bottom: 20px; justify-content: space-between; background: #FFFFFF;" @click="showSelectCoupon">
					<span style="font-size: 14px;margin-left: 10px;">优惠卷</span>
					<span style="font-size: 14px;margin-right: 10px;">&nbsp;&nbsp;<van-icon name="weapp-nav"/></span>
				</div>
				<Selectcoupon ref="selectCou" :orderContent="orderContent" v-on:selectCoupon="selectCoupon"></Selectcoupon>
			</div>
			
			<div style="width: 94%; margin-left: 3%; background: #FFFFFF; margin-top: 10px; margin-bottom: 20px;">
				<div style="display: flex; justify-content: space-between;">
					<span style="font-size: 14px;margin-top: 10px;margin-left: 10px;">商品金额</span>
					<span style="font-size: 14px;margin-top: 10px;margin-right: 10px;margin-bottom: 10px;">¥{{orderContent.defalutSelect.price*orderContent.value}}.00</span>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<span style="font-size: 14px;margin-left: 10px;">运费</span>
					<span style="font-size: 14px;margin-right: 10px;margin-bottom: 10px; color: red;">¥0.00</span>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<span style="font-size: 14px;margin-left: 10px;">优惠卷</span>
					<span style="font-size: 14px;margin-right: 10px; margin-bottom: 10px;color: red;" v-if="couponData.priceSubtract">-&nbsp;¥{{couponData.priceSubtract}}</span>
					<span style="font-size: 14px;margin-right: 10px; margin-bottom: 10px;color: red;" v-if="!couponData.priceSubtract">¥0.00</span>
				</div>
			</div>
			
			<van-notice-bar :scrollable="false">
				 {{addressContent.address}}
				 <!--{{SelectCoupon}}-->
			</van-notice-bar>
			<div style="height: 50px;"></div>
			<van-submit-bar
			  :price="couponData.priceSubtract==null?(orderContent.defalutSelect.price*orderContent.value)*100:((orderContent.defalutSelect.price*orderContent.value)-couponData.priceSubtract)*100"
			  button-text="提交订单"
			  @submit="onSubmit"
			/>
		</div>
	</div>
</template>

<script>
	import { Icon ,Tag,Cell ,Stepper,SubmitBar,NoticeBar,Toast   } from 'vant';
	import navigationTop from '@/components/modularization/navigationTop'
	import shippingAddress from '@/components/popups/shippingAddress'
	import invoice from '@/components/popups/invoice'
	import Selectcoupon from '@/components/popups/Select_coupon'
	export default{
		name:'confirmOrder',
		data(){
			return{
				orderContent:this.$store.state.ProductDetails,
				Incoice:"不开发票",
				leaveAmessage:"",
				addressContent:{},
				couponData:{}
			}
		},
		mounted(){
			this.defaultAddress();
//			console.log(this.$store.state.ProductDetails)
//			console.log(this.$store.state.UserCoupon)
			
		},
//		computed:{
//			SelectCoupon(){
//				var product = this.$store.state.ProductDetails
//				var coupon = this.$store.state.UserCoupon
//				for(var i=0;i<coupon.length;i++){
//					if(coupon[i].merchantOpenId==product.openId){
//						if(product.classify[2]==coupon[i].classify[2]){
//							console.log("分类优惠卷")
//							if(this.orderContent.value*this.orderContent.defalutSelect.price>=coupon[i].priceFull){
//								console.log("满"+coupon[i].priceFull+"减"+coupon[i].priceSubtract)
//								console.log("减"+coupon[i].priceSubtract)
//							}
//						}
//						if(coupon[i].classify[0]=="ALL"){
//							console.log("店铺所有商品满优惠")
//							if(this.orderContent.value*this.orderContent.defalutSelect.price>=coupon[i].priceFull){
//								console.log("满"+coupon[i].priceFull+"减"+coupon[i].priceSubtract)
//							}
//						}
//					}
//				}
//			}
//		},
		methods:{
			//获取地址信息
			defaultAddress(){
				var addressData=JSON.parse(localStorage.getItem("DirectoryInquiries"))
				for(var i=0;i<addressData.length;i++){
					if(addressData[i].id=="1"){
						this.addressContent=addressData[i]
					}
				}
			},
			//唤醒shippingAddress回调
			selectAddress(){
				this.$refs.shippingaddress.openShow()
			},
			//唤醒expressage的回调
			showInvoice(){
				this.$refs.invoice.openShow()
			},
			showSelectCoupon(){
				this.$refs.selectCou.openShow()
			},
			//设置新地址回调，当触发此方法，则证明，用户需要从新设置收件人地址信息，我们从回调中从新获取并覆盖this.recipients即可！
			changeAddress(val) {
				this.recipients = val
			},
			//设置回调，当触发此方法，将优惠卷赋值
			selectCoupon(val){
//				console.log(val)
				this.couponData=val
				console.log(this.couponData)
			},
			BackIncoice(val){
				this.Incoice=val
			},
			maintain(){
				Toast('目前仅支持线上交易!敬请期待后续迭代!');
			},
			onSubmit(){
				console.log(this.orderContent)
				var datas={
					productId:this.orderContent.productId,
					merchantOpenId:this.orderContent.openId,
					putaway_type:this.orderContent.putaway_type,
					classify:this.orderContent.classify,
					productImg:this.orderContent.productImg,
					productName:this.orderContent.productName,
					description:this.orderContent.description,
					defalutSelect:this.orderContent.defalutSelect,
					original_Price:this.orderContent.original_Price,
					leaveAmessage:this.leaveAmessage,
					invoice:this.Incoice,
					consignee:this.addressContent,
				}
				datas.defalutSelect.count=this.orderContent.value
				console.log(datas)
				this.$Request_post(this.$request+"/submitOrder",datas).then(res=>{
					console.log(res)
					Toast.success('付款成功');
				})
			},
		},
		components:{
			navigationTop,
			Icon,
			Tag ,
			Cell,
			Stepper,
			SubmitBar ,
			NoticeBar,
			shippingAddress,
			Toast ,
			invoice,
			Selectcoupon
		}
	}
</script>

<style lang="scss" scoped>
.addressInformation{
	width: 100%; 
	height: 70px; 
	background: #FFFFFF; 
	margin-bottom: 10px;
	.name_phone{
		display: flex; 
		font-size: 14px; 
		font-weight: bold; 
		padding: 10px;
	}
	.address{
		display: flex;
		font-size: 12px;
		margin-left: 10px;
	}
	.border{
		margin-top: 4px;
		height: 2px;
		background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
	    background-size: 100px;
    }
}
.modeofpayment{
	width: 94%;
	height: 40px;
	margin-left: 3%;
	background: #FFFFFF;
	margin-bottom: 20px;
}
.order_details{
	width: 94%;
	height: 100%;
	margin-left: 3%;
	background: #FFFFFF;
	.store{
		height: 30px;
		border-bottom: 1px solid #e5e5e5;	
		.store_icon{
			display: flex;
			font-size: 20px;
			padding: 4px;
		}
		.store_name{
			display: flex;
			margin-top: -24px;
			margin-left: 30px;
		}
	}
	.store_box{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		.store_box_img{
			padding: 4px;
			display: flex;
			width: 90px;
			height: 90px;
			background: #FFFFFF;
		}
		.store_box_name{
			display: flex;
			font-size: 12px;
			font-weight: bold;
			margin-left: 98px;
			margin-top: -90px;
			overflow:hidden; 
			text-overflow:ellipsis;
			display:-webkit-box; 
			/*! autoprefixer: off*/
			-webkit-box-orient:vertical;
			/* autoprefixer: on */
			-webkit-line-clamp:1; 
			text-align: left;
			margin-bottom: 6px;
		}
		.store_box_type{
			display: flex;
			font-size: 12px;
			margin-left: 98px;
			overflow:hidden; 
			text-overflow:ellipsis;
			display:-webkit-box; 
			/*! autoprefixer: off*/
			-webkit-box-orient:vertical;
			/* autoprefixer: on */
			-webkit-line-clamp:1; 
			text-align: left;
			margin-bottom: 4px;
		}
		.store_box_price{
			display: flex;
			font-size: 18px;
			margin-left: 98px;
			color: red;
			margin-bottom: 4px;
		}
		.store_box_tag{
			float: left;
			padding: 2px;
			font-size: 10px;
			margin-left: 98px;
			border: 1px solid #1989FA;
			border-radius: 4px;
			color: #1989FA;
			margin-bottom: 10px;
		}
	}
	.store_count{
		display: flex;
		justify-content:space-between;
		width: 100%;
		font-size: 14px;
		margin-bottom: 10px;
	}
	.afterService span{
		display: flex;
		font-size: 14px;
		margin-left: 10px;
	}
	
	.leave_msg{
		margin-top: 20px;
		display: flex;
		margin-left: 10px;
		margin-bottom: 20px;
		.leave_span{
			font-size: 14px;
		}
		.leave_input{
			width: 80%;
			border: 0px solid;
			font-size: 14px;
			color: #666;
			margin-top: -4px;
		}
	}
}


</style>
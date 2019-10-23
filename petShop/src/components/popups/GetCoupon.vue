<template>
	<van-popup style="height:450px;" v-model="show" position="bottom" :overlay="true">
		<div style="height: 300px; background: #F7F8FA;">
			<div style="width: 100%; height: 40px; border: 0px solid black; margin-bottom: 10px;">
				<span style="display: flex; justify-content: center;font-size: 16px; line-height: 40px;">优惠卷</span>
				<van-icon style="float:right; margin-top: -38px;font-size: 18px;padding: 10px;" name="cross" @click="outShow" />
			</div>
			<span style="margin-left: 10px; margin-bottom: 10px; font-size: 14px;">可领取优惠卷</span>
			<div style="width: 94%; margin-left: 3%;">
			<div style="display: flex; border: 0px solid black; background: #FFFFFF; margin-bottom: 20px;" v-for="item in couponData">
				<div class="coupon_box">
					<div class="coupon_price_box">
						<span class="coupon_￥">￥</span>
						<span class="coupon_price">{{item.priceSubtract}}</span><br />
						<span class="coupon_condition">满{{item.priceFull}}元可用</span>
					</div>
				</div>
				<div class="coupon_detail">
					<div style="">
						<van-tag round type="primary">{{item.couponTags}}</van-tag>
						<span style="font-size: 12px;">{{item.couponDesc}}</span><br />
						<span class="coupon_time">{{moment(item.startingTime).format("YYYY-MM-DD")}} - {{moment(item.endTime).format("YYYY-MM-DD")}}</span>
						<van-tag round type="primary" class="coupon_add" @click="AddtoCoupon(item)">点击领取</van-tag>
					</div>
				</div>
			</div>
			</div>
		</div>
	</van-popup>
</template>

<script>
	import { Icon,Toast  } from 'vant';
	import moment from 'moment';
	export default {
		name: "GetCoupon",
		data() {
			return {
				show: false,
				data: []
			}
		},
		mounted() {
			console.log(moment("2019-07-25T07:03:03.000Z").format("YYYY-MM-DD HH:mm:ss"))
			console.log(this.couponData)
		},
		methods: {
			moment,
			onOpenshow() {
				this.show = true
			},
			outShow() {
				this.show = false
			},
			AddtoCoupon(value){
				console.log(value)
				var data={
					couponId:value.couponId,
					merchantOpenId:value.merchantOpenId,
					classify:value.classify,
					couponDesc:value.couponDesc,
					couponTags:value.couponTags,
					startingTime:value.startingTime,
					endTime:moment(value.endTime).format("YYYY-MM-DD HH:mm:ss"),
					priceFull:value.priceFull,
					priceSubtract:value.priceSubtract,
				}
				//领取优惠卷
				this.$Request_post("https://mychen.vip:8070/petshop/v1/api/GetBycoupon",data).then(res=>{
					console.log(res);
					if(res.data.code="200"){
						Toast(res.data.msg);
						if(res.data.msg!="您已领取该优惠卷！"){
							//领取成功 即重新获取个人优惠卷 并添加进vuex
							this.$Request_post("https://mychen.vip:8070/petshop/v1/api/findByMyCoupon").then(res=>{
								console.log(res.data)
								//在vuex中管理状态，使用session，避免页面刷新数据消失，
								sessionStorage.setItem('userCoupon',JSON.stringify(res.data));
								//commit一次，再次让vuex状态重新获取一次值对象。
								this.$store.commit('setUserCoupon',res.data)
							})
						}
					}
				})
			}
		},
		props: {
			couponData: {
				type: Array,
				default: []
			}
		},
		components: {
			Icon,
			Toast
		}
	}
</script>

<style lang="scss" scoped>
	@media only screen and (max-width: 321px) {
		.coupon_box {
			/*margin-left: 10px;*/
			display: flex;
			width: 40%;
			height: 80px;
			background: deepskyblue;
			.coupon_price_box {
				margin: 0 auto;
				margin-top: 10px;
				.coupon_￥ {
					font-weight: 600;
					color: #FFFFFF;
				}
				.coupon_price {
					font-size: 34px;
					font-weight: bolder;
					color: #FFFFFF;
				}
				.coupon_condition {
					font-size: 14px;
					color: #FFFFFF;
				}
			}
		}
		.coupon_detail {
			width: 60%;
			margin-left: 10px;
		}
		.coupon_time {
			display: flex;
			font-size: 12px;
			/*margin-top: 20px;*/
		}
		.coupon_add{
			float: right;
			/*margin-top: -20px;*/
			margin-right: 6px;
		}
	}
	@media only screen and (min-width: 375px) {
		.coupon_box {
			/*margin-left: 10px;*/
			display: flex;
			width: 40%;
			height: 80px;
			background: deepskyblue;
			.coupon_price_box {
				margin: 0 auto;
				margin-top: 10px;
				.coupon_￥ {
					font-weight: 600;
					color: #FFFFFF;
				}
				.coupon_price {
					font-size: 34px;
					font-weight: bolder;
					color: #FFFFFF;
				}
				.coupon_condition {
					font-size: 14px;
					color: #FFFFFF;
				}
			}
		}
		.coupon_detail {
			width: 60%;
			margin-left: 10px;
		}
		.coupon_time {
			display: flex;
			font-size: 12px;
			margin-top: 20px;
		}
		.coupon_add{
			float: right;
			margin-top: -20px;
			margin-right: 2px;
		}
	}
	
</style>
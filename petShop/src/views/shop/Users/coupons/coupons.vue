<template>
	<div style="height: 100vh; background: #F7F8FA;">
		<navigationTop>
			<div slot="icon_left">
				<van-icon name="arrow-left" style="margin-top: 5px; font-size: 24px;" />
			</div>
			<div slot="content_center">
				<span style="display: flex;justify-content: center;margin-top: 8px;">我的优惠卷</span>
			</div>
			<div slot="icon_right">
			</div>
		</navigationTop>
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
							<van-tag style="display:block; margin-top: 4px; margin-left: 4px; width: 38px;" round type="primary">{{item.couponTags}}</van-tag>
							<span style="display: flex; margin-left: 4px; font-size: 12px; text-align:left;">{{item.couponDesc}}</span><br />
							<span class="coupon_time">{{moment(item.startingTime).format("YYYY-MM-DD")}} - {{moment(item.endTime).format("YYYY-MM-DD")}}</span>
						</div>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
	import navigationTop from '@/components/modularization/navigationTop'
	import { Icon } from 'vant';
	import moment from 'moment';
	export default {
		name: "coupons",
		data() {
			return {
				couponData: this.$store.state.UserCoupon,
			}
		},
		mounted() {
			console.log(this.$store.state.UserCoupon)
		},
		methods: {
			moment,
		},
		components: {
			navigationTop,
			Icon
		}
	}
</script>

<style lang="scss" scoped>
		@media only screen and (max-width: 321px) {
		.coupon_box {
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
			margin-left: 0px;
		}
		.coupon_time {
			display: flex;
			font-size: 12px;
			margin-top: -8px;
			margin-left: 6px;
		}
		
	}
	@media only screen and (min-width: 375px) {
		.coupon_box {
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
			margin-left: 0px;
		}
		.coupon_time {
			display: flex;
			font-size: 12px;
			margin-top: -8px;
			margin-left: 4px;
		}
	}
	
</style>
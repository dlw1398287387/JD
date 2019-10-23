<template>
	<div>
		<van-popup v-model="show" position="bottom" :overlay="true">
			<div style="height: 40px; border: 0px solid black;">
				<span style="display: flex; justify-content: center; font-size: 14px; color: black; font-weight: bold;margin-top: 14px;">已使用优惠卷</span>
				<van-icon name="cross" @click="outShow" style='float: right; font-size: 18px; margin-top: -18px; margin-right: 10px;'/>
			</div>
	
			<div style="width: 92%; height: 60vh; border: 0px solid black; margin-left: 4%;">
				<div style="display: flex; border: 0px solid black; background: #FFFFFF; margin-bottom: 20px;"  v-if="SelectCoupon.priceSubtract!=null">
					<div style="width: 40%; height: 100px; border: 0px solid black; background: #1989FA;">
						<div style="margin-top: 20px;">
							<span style="font-weight: 600; color: #FFFFFF;">￥</span>
							<span style="font-size: 34px;font-weight: bolder;color: #FFFFFF;">{{SelectCoupon.priceSubtract}}</span><br />
							<span style="font-size: 14px;font-weight: bolder; color: #FFFFFF;">满{{SelectCoupon.priceFull}}元可用</span>
						</div>
					</div>
					<div style="width: 60%; height: 100px; border: 0px solid black; background: #FFFFFF;">
						<van-tag style="display: flex; width:36px; margin: 6px;" round type="primary">{{SelectCoupon.couponTags}}</van-tag>
						<span class="selectCouponDesc">{{SelectCoupon.couponDesc}}</span><br />
						<span style="display: flex;font-size: 12px; margin-left: 6px;">{{moment(SelectCoupon.startingTime).format("YYYY-MM-DD")}} - {{moment(SelectCoupon.endTime).format("YYYY-MM-DD")}}</span>
					</div>
				</div>
				
				<div v-if="SelectCoupon.priceSubtract==null">
					暂无优惠卷可用
				</div>
			</div>
			{{orderContent.value}}
		</van-popup>
	</div>
</template>

<script>
	import moment from 'moment';
	import { Popup, Icon } from 'vant';
	export default {
		name: 'Select_coupon',
		data() {
			return {
				show: false,
			}
		},
		computed: {
			SelectCoupon() {
				var product = this.orderContent
				var coupon = this.$store.state.UserCoupon
				var data= {}
				for(var i = 0; i < coupon.length; i++) {
					if(coupon[i].merchantOpenId == product.openId) {
						if(product.classify[2] == coupon[i].classify[2]) {
							if(product.value * product.defalutSelect.price >= coupon[i].priceFull) {
								console.log("分类优惠卷---满" + coupon[i].priceFull + "减" + coupon[i].priceSubtract)
								data=coupon[i]
							}
						}else{
							this.$emit("selectCoupon",{})
						}
						if(coupon[i].classify[0] == "ALL") {
							if(product.value * product.defalutSelect.price >= coupon[i].priceFull) {
								console.log("店铺所有商品满优惠---满" + coupon[i].priceFull + "减" + coupon[i].priceSubtract)
								data=coupon[i]
							}
						}else{
							this.$emit("selectCoupon",{})
						}
					}
				}
				this.$emit("selectCoupon",data)
				return data
			}
		},
		mounted() {
			console.log(this.orderContent)
			console.log(this.$store.state.UserCoupon)
		},
		methods: {
			moment,
			//唤出弹窗
			openShow() {
				this.show = true
			},
			//屏蔽弹窗
			outShow() {
				this.show = false
			},

		},
		props: {
			orderContent: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		components: {
			Popup,
			Icon,
		}
	}
</script>

<style lang="scss" scoped>
	.selectCouponDesc{
		font-size: 12px; 
		margin-left: 6px;
		display: block;
		word-wrap:break-word;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		/*! autoprefixer: off*/
		-webkit-box-orient:vertical;
		/* autoprefixer: on */
		-webkit-line-clamp:2; 
		text-align: left;
	}
</style>
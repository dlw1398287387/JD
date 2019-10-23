<template>
	<van-popup style="height:380px;" v-model="show" position="bottom" :overlay="true">
		<div style="height: 40px; border: 0px solid black;">
			<span style="display: flex; justify-content: center; font-size: 14px; color: black; font-weight: bold;margin-top: 14px;">预订必读</span>
			<van-icon name="cross" @click="outShow" style='float: right; font-size: 18px; margin-top: -18px; margin-right: 10px;'/>
		</div>
		
		<div class="policyBox">
			<span class="policytitle">取消政策与服务</span>
			<div style="display: flex;">
				<van-tag class="cancel" plain type="success">30分钟免费取消</van-tag>
			</div>
			<span class="dian">●&nbsp;<span class="cancel_desc">商家已为您提供预订成功后30分钟内免费取消权益（该权益不受商家取消政策限制）</span></span>
			<span class="cancel2">商家取消政策</span>
			<span class="dian">●&nbsp;<span class="cancel_desc">订单由商家确认后不可取消/变更，如未入住，商家将扣除全额房费</span></span>
			<span class="Bookingconfirmation">预订确认</span>
			<span class="Bookingconfirmation_desc">订单需商家确认后才生效，订单确认结果以短信或邮件通知为准（或订单中心查看）；请在订单生效后在前往预订地点体验服务</span>
			<span class="outformtotitle">入离时间&nbsp;&nbsp;&nbsp;<span class="outformto">早8:00以后  晚20:00以前</span></span>
		</div>
	</van-popup>
</template>

<script>
	import { Popup ,Tag } from 'vant';
	export default{
		name:"ReservationRequired",
		data(){
			return{
				show: false,
			}
		},
		methods:{
			onOpenshow(){
				this.show = true
			},
			outShow(){
				this.show = false
			},
		},
		components:{
			Popup,Tag 
		}
	}
</script>

<style lang="scss" scoped>
	.policyBox{
		width: 92%;
		margin-left: 4%;
		.policytitle{
			display: flex;
			font-size: 14px;
			font-weight: bold;
		}
		.cancel{
			margin-top: 10px;
			float: left;
		}
		.dian{
			display: flex; 
			font-size: 10px; 
			color: #FFC0CB;
			margin-top: 10px;
			.cancel_desc{
				text-align: left;
				color: black;
			}
		}
		.cancel2{
			font-size: 14px;
			display: flex;
			margin-top: 14px;
			margin-left: 12px;
			color: #666666;
		}
		.Bookingconfirmation{
			font-size: 14px;
			font-weight: bold;
			display: flex;
			margin-top: 10px;
		}
		.Bookingconfirmation_desc{
			display: flex;
			font-size: 12px;
			margin-top: 10px;
			text-align: left;
		}
		.outformtotitle{
			font-size: 14px;
			font-weight: bold;
			display: flex;
			margin-top: 10px;
		}
		.outformto{
			font-size: 14px;
			font-weight: 200;
			color: black;
		}
	}
</style>
<template>
	<div>
		
		<navigationTop>
			<div slot="icon_left">
				<van-icon name="arrow-left" style="margin-top: 5px; font-size: 24px;"/>
			</div>
			<div slot="content_center">
				<span style="display: flex;justify-content: center;margin-top: 8px;">设置</span>
			</div>
			<div slot="icon_right">
			</div>
		</navigationTop>
		
		<div>
			<table class="User_table_T">
				<tr>
					<td rowspan="2">
						<img class="User_table_img"  src="../../../assets/img/avatar2.jpg"/>
					</td>
					<td >&nbsp;&nbsp;&nbsp;</td>
					<td style="height: 20px;">
						<span class="User_Table_NickName">用户_7e6005174</span>
					</td>
				</tr>
				<tr>
					<td></td>
					<td colspan="2">
						<span class="User_Table_else">会员名:用户_7e6005174</span>
					</td>
				</tr>
			</table>
		</div>
		
		<div class="User_table_Bcart" @click="onMyCart">
			<van-icon name="qr" size="20px" style="margin-top: 20px;"/>
			<van-icon name="arrow" size="20px" style="margin-top: 20px;" />
		</div>
		<div style="border: 0px solid black; height: 80px; text-align: left;">
			<van-cell title="我的收货地址" is-link  @click="goSkip('ConsigneeList')"/>
			<van-cell title="我的优惠卷" is-link @click="goSkip('Coupon')"/>
			<van-cell title="隐私" is-link  to="privacy"/>
			<van-cell title="问题反馈" is-link to="feedback"/>
			<van-cell title="关于PetsFree" is-link @click="goSkip('About_Us')" />
		</div>
	</div>
</template>

<script>
	import coupons from "@/views/shop/Users/coupons/coupons.vue"
	import navigationTop from '@/components/modularization/navigationTop'
	import { Cell ,Icon } from 'vant';
	export default{
		name:'setting',
		data(){
			return{
				
			}
		},
		methods:{
			showCoupons(){
				
			},
			onMyCart(){
				console.log("111")
			},
		
			/**
			 * 跳转
			 * 1.需携带路由name参数
			 * 2.次级页面需要params参数则添加第二参数（次级页面不需要params也可不传）
			 */
			goSkip(routersName, paramsVal) {
				console.log("跳转到" + routersName + "页,携带" + paramsVal + "参数")
				this.$router.push({
					name: routersName,
					params: {
						name: paramsVal
					}
				})
			},
		},
		components:{
			navigationTop,
			Cell,
			Icon,
			coupons
		}
	}
</script>

<style lang="scss" scoped>
.User_table_T{
		margin-left: 20px;
		margin-bottom: 10px;
		.User_table_img{
			width: 70px;
			border-radius: 50px; 
			margin-top: 10px;
		}
		.User_Table_NickName{
			display: flex;
			margin-top: 14px; 
			margin-left: -10px;
		}
		.User_Table_else{
			color: rgba(0, 0, 0, 0.45); 
			display: flex;
			margin-left: -10px;
			font-size: 12px;
		}
	}
.User_table_Bcart{
		position: absolute;
		width: 70px;
		height: 60px;
		justify-content: center;
		margin-left: 80%;
		margin-top: -85px;
}
</style>
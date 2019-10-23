<template>
	<div>
		<GlobalPageHeader :headline="headline" :describe="describe"></GlobalPageHeader>
		
		<div>
			<a-card style="margin: 20px;">
				<a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
					<a-form-item label="选择上架类型" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="couponType" :fieldDecoratorOptions="{rules: [{ required: true, message: '请您需要上架的商品类型！' }]}">
						<a-select v-decorator="[
					          'gender',
					          {rules: [{ required: true, message: 'Please select your gender!' }]}
					        ]" placeholder="请您需要上架的商品类型" @change="selectType">
					        <a-select-option value="PreferentialGoods">
								商品优惠卷
							</a-select-option>
							<a-select-option value="DiscountStores">
								店铺优惠卷
							</a-select-option>
						</a-select>
					</a-form-item>
					
					<a-form-item v-if="selectStatus=='PreferentialGoods'" value="classList" label="选择产品类型" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="classify" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择产品分类' }]}">
						<a-cascader v-decorator="['residence',
				          {
				            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
				          }
				        ]" :options="residences" />
					</a-form-item>
					<a-form-item label="起止日期" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="buildTime" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择起止日期' }]}">
						<a-range-picker style="width: 100%;" :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }" showTime format="YYYY-MM-DD HH:mm:ss" @change="onChange" />
					</a-form-item>
					
					
					<a-form-item label="满" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="priceFull" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入优惠卷描述' }]}">
						<a-input-number :min="1" :defaultValue='10'  v-model="Full"/>---满：{{Full}}元可用
					</a-form-item>
					<a-form-item label="减" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="priceSubtract" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入优惠卷描述' }]}">
						<a-input-number :min="1" :defaultValue='1' v-model="Subtract"/>---减：{{Subtract}}元
					</a-form-item>
					
					<a-form-item style="text-align: center">
						<a-button type="primary" html-type="submit">添加优惠卷</a-button>
					</a-form-item>
				</a-form>
			</a-card>
		</div>
	</div>
</template>

<script>
	import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
	import { residences } from '@/views/Products/residences.js'
	import moment from 'moment';
	export default{
		name:"coupon",
		data(){
			return{
				headline:"添加优惠卷",
				describe:"此处用于添加产品购买优惠卷，注意优惠卷金额不可达到商品的三分之一，避免媷羊毛！优惠卷过期时间不可超过七天！",
				selectStatus:false,
				residences: residences,
				buildTime: {
					from: '',
					to: ""
				},
				Full:10,
				Subtract:1,
				
			}
		},
		mounted(){
			console.log(this.$ls.get("userDatas"))
		},
		methods:{
			moment,
			selectType(e){
				console.log(e)
				this.selectStatus=e
			},
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFieldsAndScroll((err, values) => {
					values.buildTime=this.buildTime;
					if(values.couponType=="PreferentialGoods"){
						values.couponTags="限品类"
						values.couponDesc="仅限购买"+this.$ls.get("userDatas").ShopName+"商铺"+values.classify[2]+"商品"
					}else{
						values.couponTags="店铺卷"
						values.classify=["ALL"]
						values.couponDesc="仅限购买"+this.$ls.get("userDatas").ShopName+"商铺商品"
					}
					values.ShopName=this.$ls.get("userDatas").ShopName
					console.log(values)
					this.$Request_post("https://mychen.vip:8090/System/v1/api/AddCoupon",values).then(res=>{
						console.log(res);
						this.$message.info(res.data.msg);
						var that=this
						setTimeout(function(){
							that.$router.go(0)
						},1000)
						
					})
				});
			},
			onChange(dates, dateStrings) {
				this.buildTime.from = dateStrings[0]
				this.buildTime.to = dateStrings[1]
			},
		},
		components:{
			GlobalPageHeader
		}
	}
</script>

<style>
</style>
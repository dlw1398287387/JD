<template>
	<div>
		<GlobalPageHeader :headline="headline" :describe="describe"></GlobalPageHeader>
		<a-card style="margin: 20px;">
			<a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
				<a-form-item value="classList" label="选择产品类型" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="classify" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择产品分类' }]}">
					<a-cascader v-decorator="[
			          'residence',
			          {
			            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
			            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
			          }
			        ]" :options="residences" />
				</a-form-item>
				<a-form-item label="输入商品名称" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="productName" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商品名称' }]}">
					<a-input name="ProductName" placeholder="请输入商品名称！" />
				</a-form-item>

				<a-form-item label="产品描述" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="description" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入目标描述' }]}">
					<a-textarea rows="4" placeholder="请输入产品的功能描述信息~" />
				</a-form-item>
				
				<a-form-item label="单价" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="price" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入产品单价' }]}">
					<a-input-number :min="1" :max="100000" />  $
				</a-form-item>
				
				<a-form-item label="产品图片" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="fileList" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择产品图片' }]}">
					<a-upload :action="actions" listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange">
						<div v-if="fileList.length < 5">
							<a-icon type="plus" />
							<div class="ant-upload-text">Upload</div>
						</div>
					</a-upload>
				</a-form-item>

				<a-form-item style="text-align: center">
					<a-button type="primary" html-type="submit">添加产品</a-button>
				</a-form-item>
			</a-form>
		</a-card>

	</div>
</template>

<script>
	import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
	import { residences } from '@/views/offlineService/residences.js'
	import { city } from '@/views/offlineService/city.js'
	export default {
		name: "addService",
		data() {
			return {
				headline: "添加城市服务",
				describe: "此页用于添加添加城市服务，",
				residences: residences,
				actions: "https://mychen.vip:8090/System/v1/api/upload?email=" + this.$ls.get("userDatas").email,
				previewImage: '',
				fileList: [],
				
			}
		},
		mounted() {
			console.log(this.$ls.get("userDatas").phone)
			console.log(this.$ls.get("userDatas").storeCity)
		},
		methods: {
			callback(key) {//
				console.log(key)
			},
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFieldsAndScroll((err, values) => {
					var ProductImg = []
					for(var i = 0; i < this.fileList.length; i++) {
						ProductImg.push(this.fileList[i].response.fileurl)
					}
					values.productImg = ProductImg
					values.storeName = this.$ls.get("userDatas").ShopName
					values.storeCity = this.$ls.get("userDatas").storeCity
					values.storeAddress = this.$ls.get("userDatas").storeAddress
					values.storephone = this.$ls.get("userDatas").phone
					var localtion = this.$Vue.ls.get("userDatas").storeLocation.split(',')
					values.storeLocation = [Number(localtion[1]),Number(localtion[0])]
					values.businessHours = {form:this.$ls.get("userDatas").form,to:this.$ls.get("userDatas").to}
					console.log(values)
					this.$Request_post("https://mychen.vip:8090/System/v1/api/createOfflineService", values).then(res => {
						console.log(res)
					})
				});
			},
			handlePreview(file) {
				this.previewImage = file.url || file.thumbUrl
				this.previewVisible = true
			},
			handleChange({fileList}) {
				this.fileList = fileList
			},
		},
		components: {
			GlobalPageHeader
		}
	}
</script>

<style>

</style>
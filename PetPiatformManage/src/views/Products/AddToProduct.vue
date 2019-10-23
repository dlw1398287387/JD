<template>
	<div>
		<GlobalPageHeader :headline="headline" :describe="describe"></GlobalPageHeader>
		<a-card style="margin: 20px;">
			<a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
				<a-form-item label="选择上架类型" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="putaway_type" :fieldDecoratorOptions="{rules: [{ required: true, message: '请您需要上架的商品类型！' }]}">
					<a-select v-decorator="[
				          'gender',
				          {rules: [{ required: true, message: 'Please select your gender!' }]}
				        ]" placeholder="请您需要上架的商品类型" @change="xuanz">
						<a-select-option value="普通商品">
							普通商品
						</a-select-option>
						<a-select-option value="促销商品">
							促销商品
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item value="classList" label="选择产品类型" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="classify" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择产品分类' }]}">
					<a-cascader v-decorator="[
			          'residence',
			          {
			            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
			            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
			          }
			        ]" :options="residences" />
				</a-form-item>
				<a-form-item v-if="selectStatus==2" label="起止日期" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="buildTime" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择起止日期' }]}">
					<a-range-picker style="width: 100%;" :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }" showTime format="YYYY-MM-DD HH:mm:ss" @change="onChange" />
				</a-form-item>
				<a-form-item label="产品名称" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="productName" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入产品名称' }]}">
					<a-input name="ProductName" placeholder="给目标起个名字" />
				</a-form-item>
				<a-form-item label="产品描述" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="description" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入目标描述' }]}">
					<a-textarea rows="4" placeholder="请输入产品的功能描述信息~" />
				</a-form-item>
				<a-form-item label="产品图片" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="fileList" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择产品图片' }]}">
					<a-upload :action="actions" listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange">
						<div v-if="fileList.length < 5">
							<a-icon type="plus" />
							<div class="ant-upload-text">Upload</div>
						</div>
					</a-upload>
				</a-form-item>
				<a-form-item label="单价" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="price" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入产品单价' }]}">
					<a-input-number :min="1" :max="100000" />
				</a-form-item>
				<a-form-item label="原价" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="original_Price" :required="false">
					<a-input-number :min="1" :max="10000" />
				</a-form-item>
				<a-form-item label="库存" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="inventory" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入产品库存' }]}">
					<a-input-number :min="1" :max="10000" />
				</a-form-item>

				<a-form-item label="RAM" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="type" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入产品选择类型' }]}">
					<a-input placeholder="请输入RAM" />
				</a-form-item>
				<a-form-item label="ROM" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="versions" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入产品选择型号' }]}">
					<a-input placeholder="请输入ROM" />
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
	import { residences } from '@/views/Products/residences.js'
	import moment from 'moment';
	export default {
		data() {
			return {
				headline: "添加产品",
				describe: "此页用于添加产品，",
				selectStatus: 0,
				actions: "https://mychen.vip:8090/System/v1/api/upload?email=" + this.$ls.get("userDatas").email,
				confirmDirty: false,
				residences: residences,
				previewVisible: false,
				previewImage: '',
				fileList: [],
				buildTime: {
					from: '',
					to: ""
				},
				classList:[]
			};
		},
		methods: {
			moment,
			callback(key) {
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
					if(this.selectStatus == "2") {
						values.buildTime = this.buildTime
					}
					values.ShopName=this.$ls.get("userDatas").ShopName
					console.log(values)
					if(values.putaway_type != null && values.classify != null && values.productName != null && values.description !== null && values.productImg.length > 0 && values.price != "" && values.inventory != "" && values.type != "" && values.versions != "") {
						console.log("1")
						this.$Request_post("https://mychen.vip:8090/System/v1/api/createProduct", values).then(res => {
							console.log(res)
						})
					}else{
						this.$openNotification("提交错误","请填写所以必填选项！")
					}
					
				});
			},
			handleSubmit2(e) {
				e.preventDefault();
				this.form.validateFieldsAndScroll((err, values) => {
					console.log(values)
				});
			},
			handleCancel() {
				this.previewVisible = false
			},
			handlePreview(file) {
				this.previewImage = file.url || file.thumbUrl
				this.previewVisible = true
			},
			handleChange({fileList}) {
				this.fileList = fileList
			},
			xuanz(e) {
				if(e == "普通商品") {
					this.selectStatus = 1
				}
				if(e == "促销商品") {
					this.selectStatus = 2
				}
			},
			onChange(dates, dateStrings) {
				this.buildTime.from = dateStrings[0]
				this.buildTime.to = dateStrings[1]
			},
		},
		components: {
			GlobalPageHeader,

		},
		watch:{
			classList(val){
				console.log(val)
			}
		}
		
	};
</script>

<style scoped>
	/* you can make up upload button and sample style by using stylesheets */
	
	.ant-upload-select-picture-card i {
		font-size: 32px;
		color: #999;
	}
	
	.ant-upload-select-picture-card .ant-upload-text {
		margin-top: 8px;
		color: #666;
	}
</style>
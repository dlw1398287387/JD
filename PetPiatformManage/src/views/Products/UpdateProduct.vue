<template>
	<div>
		<GlobalPageHeader :headline="headline" :describe="describe"></GlobalPageHeader>
		<a-card style="margin: 20px;">
			<a-tabs defaultActiveKey="1" @change="callback">
				<a-tab-pane tab="产品基本信息" key="1">
					<div v-if="PruductStatus">
						<a-form-item label="选择上架类型" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-select placeholder="请您需要上架的商品类型" :defaultValue='datas.putaway_type' v-model="datas.putaway_type">
								<a-select-option value="普通商品">
									普通商品
								</a-select-option>
								<a-select-option value="促销商品">
									促销商品
								</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item label="选择产品类型" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-cascader style="width: 100%" :defaultValue="datas.classify" v-model="datas.classify" :options="residences" />
						</a-form-item>
						<!--:defaultValue="[moment(datas[0].buildTime.from), moment(datas[0].buildTime.to)]" -->
						<a-form-item v-if="datas.putaway_type=='促销商品'" label="起止日期" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-range-picker :defaultValue="[moment(datas.buildTime.from), moment(datas.buildTime.to)]" style="width: 100%;" :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }" showTime format="YYYY-MM-DD HH:mm:ss" @change="onChange" />
						</a-form-item>
						<a-form-item label="产品名称" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-input :defaultValue="datas.productName" v-model="datas.productName" placeholder="给目标起个名字" />
						</a-form-item>
						<a-form-item label="产品描述" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-textarea :defaultValue="datas.description" v-model="datas.description" rows="4" placeholder="请输入产品的功能描述信息~" />
						</a-form-item>
						<a-form-item label="单价" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-input-number style="width: 30%;" :defaultValue="datas.versionInfo[0].price" v-model="datas.versionInfo[0].price" :min="1" :max="100000" />
						</a-form-item>
						<a-form-item label="原价" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-input-number style="width: 30%;" :defaultValue="datas.original_Price" v-model="datas.original_Price" :min="1" :max="10000" />
						</a-form-item>
						<a-form-item label="库存" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-input-number style="width: 30%;" :defaultValue="datas.versionInfo[0].inventory" v-model="datas.versionInfo[0].inventory" :min="1" :max="10000" />
						</a-form-item>
						<a-form-item label="RAM" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-input :defaultValue="datas.versionInfo[0].type" v-model="datas.versionInfo[0].type" placeholder="请输入RAM" />
						</a-form-item>
						<a-form-item label="ROM" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }" fieldDecoratorId="versions" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入产品选择型号' }]}">
							<a-input :defaultValue="datas.versionInfo[0].versions" v-model="datas.versionInfo[0].versions" placeholder="请输入ROM" />
						</a-form-item>
						<a-form-item label="产品图片" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
							<a-upload :action="actions" listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange" :remove="handleRemove">
								<div v-if="fileList.length < 3">
									<a-icon type="plus" />
									<div class="ant-upload-text">Upload</div>
								</div>
							</a-upload>
							<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
								<img alt="example" style="width: 100%" :src="previewImage" />
							</a-modal>
						</a-form-item>
						<a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
							<a-button htmlType="submit" type="primary" @click="onUpdate">保存</a-button>
							<a-button style="margin-left: 8px">返回</a-button>
						</a-form-item>
					</div>
				</a-tab-pane>
				<a-tab-pane tab="产品变种信息" key="2" v-if="requestStatus">
					<varietas :datas="datas"></varietas>
				</a-tab-pane>
				<a-tab-pane tab="产品介绍信息" key="3" v-if="requestStatus">
					<Introduce :datas="datas"></Introduce>
				</a-tab-pane>
				<a-tab-pane tab="产品评论信息" key="4" v-if="requestStatus">
					<Comment ></Comment>
				</a-tab-pane>
			</a-tabs>
		</a-card>
	</div>
</template>

<script>
	import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
	import { residences } from '@/views/Products/residences.js'
	import Comment from '@/views/Products/addProduct/comment'
	import varietas from '@/views/Products/addProduct/varietas'
	import Introduce from '@/views/Products/addProduct/Introduce'
	import moment from 'moment';
	export default {
		data() {
			return {
				headline: "修改产品",
				describe: "修改产品，需从产品列表入口进入！",
				id: this.$route.params.id,
				PruductStatus: false,
				requestStatus:false,
				residences: residences,
				selectStatus: 1,
				datas: {},
				previewVisible: false,
				previewImage: '',
				fileList: [],
				updateData: {},
				buildTime: {
					from: "2019-07-08 16:16:46",
					to: "2019-08-29 16:16:46"
				},
				actions: "https://mychen.vip:8090/System/v1/api/upload?email=" + this.$ls.get("userDatas").email,
			}
		},
		created() {
			if(this.id == null) {
				console.log("为空")
				this.$router.go(-1)
			} else {
				console.log("不为空")
				var data = {
					productId: this.id
				}
				this.$Request_post("https://mychen.vip:8090/System/v1/api/findByProductDetails", data).then(res => {
					console.log(res)
					this.requestStatus=true
					//由于是修改，例：添加时不是促销商品不带时间，到修改处想改成促销商品，会报错，应该时间选择器的默认选中时间是NULL。
					//所以我们随便添加一个时间 以至于不会让页面出错！只需要修改覆盖默认时间即可！
					if(res.data[0].buildTime == null) {
						this.datas = res.data[0]
						this.datas.buildTime = this.buildTime
					} else {
						this.datas = res.data[0]
					}
					//将图片添加到fileList里面展示在前台
					for(var i = 0; i < res.data[0].productImg.length; i++) {
						this.fileList.push({
							uid: '-1' + i,
							name: 'x' + i,
							status: 'done' + i,
							url: res.data[0].productImg[i],
						})
					}
					this.PruductStatus = true;
				})
			}
		},
		mounted() {

		},
		methods: {
			moment,
			callback (key) {
		      
		    },
			//将修改的时间加入到集合里面
			onChange(da, dateStrings) {
				console.log(dateStrings);
				this.buildTime.from = dateStrings[0];
				this.buildTime.to = dateStrings[1];
				this.datas.buildTime = this.buildTime;
			},
			handleCancel() {
				this.previewVisible = false;
			},
			handlePreview(file) {
				console.log(file)
				this.previewImage = file.url || file.thumbUrl;
				this.previewVisible = true;
			},
			handleChange({fileList}) {
				this.fileList = fileList;
			},
			//删除点击的图片
			handleRemove(file) {
				var data = {
					UserMir: file.url.split("http://mychen.vip:8089/")[1]
				};
				this.$Request_post("https://mychen.vip:8090/System/v1/api/DeleteFile", data).then(res => {
					console.log(res)
				})
			},
			onUpdate() {
				console.log(this.fileList)
				//将productImg字段置为空，
				this.datas.productImg = [];
				for(var i = 0; i < this.fileList.length; i++) {
					//在添加修改过的priductImg字段
					this.datas.productImg.push(this.fileList[i].response.fileurl)
				}
				if(this.datas.putaway_type == "普通商品"){
					this.datas.buildTime = null
					console.log(this.datas)
					this.$Request_post("https://mychen.vip:8090/System/v1/api/UpdateByProduct", this.datas).then(res => {
						console.log(res)
					})
				} else {
					console.log(this.datas)
					this.$Request_post("https://mychen.vip:8090/System/v1/api/UpdateByProduct", this.datas).then(res => {
						console.log(res)
						this.$router.go(-1)
					})
				}
			},
		},
		components: {
			GlobalPageHeader,
			Comment,
			varietas,
			Introduce
		}
	}
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
<template>
	<div class="clearfix">
		
				<a-upload :action="actions" listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange" :remove="handleRemove">
					<div v-if="fileList.length < 10">
						<a-icon type="plus" />
						<div class="ant-upload-text">Upload</div>
					</div>
				</a-upload>
				<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
					<img alt="example" style="width: 100%" :src="previewImage" />
				</a-modal>
			
			<a-button type="primary" @click="handleSubmit" style="display:block;margin: 0 auto;">确定</a-button>
		</a-form>
		
		<a-row>
			<a-col :xl="8" :md="7" :xs="0">&nbsp;</a-col>
			<a-col :xl="8" :md="10" :xs="24">
				<p style="display: flex;justify-content: center;">手机视图</p>
				<div style="width: 100%;border: 1px solid black;" v-for="item in datas.ImgDetails">
					<img style="width: 100%;" :src="item" />
				</div>
			</a-col>
			<a-col :xl="8" :md="7" :xs="0"><span>&nbsp;</span></a-col>
		</a-row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				actions: "https://mychen.vip:8090/System/v1/api/upload?email=" + this.$ls.get("userDatas").email,
				previewVisible: false,
				previewImage: '',
				fileList: [],
				ImgData:[]
			}
		},
		created() {
			console.log(this.datas)
			for(var i=0;i<this.datas.ImgDetails.length;i++){
				this.fileList.push({
					uid: '-1' + i,
					name: 'x' + i,
					status: 'done' + i,
					url: this.datas.ImgDetails[i],
				})
			}
		},
		methods: {
			handleSubmit() {
//				console.log(this.fileList)
				this.datas.ImgDetails=[]
				for(var i = 0; i < this.fileList.length; i++) {
					if(this.fileList[i].response==null){
//						console.log(this.fileList[i].url)
						this.datas.ImgDetails.push(this.fileList[i].url)
					}else{
//						console.log(this.fileList[i].response.fileurl)
						this.datas.ImgDetails.push(this.fileList[i].response.fileurl)
					}
				}
				var data={
					productId:this.datas.productId,
					ImgDetails:this.datas.ImgDetails
				}
				console.log(data)
				this.$Request_post("https://mychen.vip:8090/System/v1/api/UpdateByDetailsImg", data).then(res => {
					console.log(res)
					if(res.data=="更新成功!"){
						this.$openNotification('更新状态', "更新成功")
					}else{
						this.$openNotification('更新状态', "更新失败")
					}
				})
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
			handleRemove(file) {
				console.log(file.url)
				for(var i=0;i<this.datas.ImgDetails.length;i++){
					if(this.datas.ImgDetails[i]==file.url){
						console.log("是的")	
						this.datas.ImgDetails.splice(this.datas.ImgDetails[i],1)
					}
				}
			}
		},
		props: {
			datas: {
				type: Object,
				default: function() {
					return {};
				}
			},
		},
		watch: {
			
		}
	}
</script>
<style>
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
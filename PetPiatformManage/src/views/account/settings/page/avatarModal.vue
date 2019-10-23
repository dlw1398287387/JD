<template>
	<a-modal :visible="visible" title="修改头像" :maskClosable="false" :confirmLoading="confirmLoading" @cancel="handleCancel" :width="800">
		<a-row>
			<a-col :span="12" :style="{height: '350px'}">
				<vue-cropper ref="cropper" :img="img" :info="true" :autoCrop="autoCrop" :autoCropWidth="autoCropWidth" :autoCropHeight="autoCropHeight" :fixedBox="fixedBox" @realTime="realTime">
				</vue-cropper>
			</a-col>
			<a-col :span="12" :style="{height: '350px'}">
				<div class="avatar-upload-preview">
					<img :src="previews.url" :style="previews.img" />
				</div>
			</a-col>
		</a-row>

		<template slot="footer">
			<a-button key="back" @click="cancelHandel">取消</a-button>
			<a-button key="submit" type="primary" :loading="confirmLoading" @click="okHandel">保存</a-button>
		</template>

	</a-modal>
</template>
<script>
	import { VueCropper } from 'vue-cropper'  //三方库组件，截图
	//'./LOGOicon.png'
	export default {
		components: {
			VueCropper
		},
		data() {
			return {
				visible: false,
				id: null,
				confirmLoading: false,
				img: this.userAvatar,
				autoCrop: true,
				autoCropWidth: 200,
				autoCropHeight: 200,
				fixedBox: true,
				previews: {},
			};
		},
		methods: {
			edit(id) {
				this.visible = true;
				this.id = id;
				/* 获取原始头像 */
			},
			close() {
				this.id = null;
				this.visible = false;
			},
			cancelHandel() {
				console.log("关闭")
				this.close();
			},
			okHandel() {
				console.log("保存");
				const vm = this;
				vm.confirmLoading = true;
				vm.confirmLoading = false;
				vm.close();
				vm.$message.success('上传头像成功');
				this.$refs.cropper.getCropData((data) => {
					this.img = data;
					/**
					 * 将截取的圆形头像返回给父级
					 */
					this.$emit('CropDataimage', data);
				})
			},

			realTime(data) {
				this.previews = data
			},
			handleCancel() {
				this.visible = false
			},
			/**
			 * 使用upload图片选择器之后触发回调，将选择图片的base64重新赋值给img
			 */
			chufa(val) {
				console.log("触发回调")
				this.img = val
			}
		},
		props: {
			userAvatar: {
				type: String,
				default: ''
			}
		},
	};
</script>

<style lang="scss" scoped>
	.avatar-upload-preview {
		position: absolute;
		top: 50%;
		transform: translate(50%, -50%);
		width: 180px;
		height: 180px;
		border-radius: 50%;
		box-shadow: 0 0 4px #ccc;
		overflow: hidden;
		img {
			width: 100%;
			height: 180px;
		}
	}
</style>
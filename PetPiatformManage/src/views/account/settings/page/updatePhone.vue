<template>
	<div>
		<a-modal title="修改绑定手机" v-model="visible" @ok="handleOk" @cancel="handleCancel" cancelText="取消" okText="绑定">
			<a-form-item label="请输入手机号">
				<a-input placeholder="输入手机号" type="text" v-model="Phone" />
			</a-form-item>

			<a-form-item label="获取验证码" :required="false">
					<a-row :gutter="16">
					    <a-col class="gutter-row" :span="10">
					        <a-input placeholder="验证码" type="text" v-model="auth_code" />
					    </a-col>
					    <a-col>
					    	<a-button type="primary" @click="getAuthCode">获取</a-button>
					    </a-col>
					</a-row>
			</a-form-item>
			
		</a-modal>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				visible: false,
				Phone: '',
				auth_code:'',
			}
		},
		methods: {
			showModal() {
				this.visible = true
			},
			handleOk(e) {
				if(this.auth_code!=''&&this.Phone!=''){
					var data ={
						auth_code:this.auth_code,
						Phone:this.Phone,
					};
					this.$Request_patch("https://mychen.vip:8090/System/v1/api/updatePhone",data).then(res=>{
						console.log(res)
						if(res.data.status=="Success"){
							this.$Request_post('https://mychen.vip:8090/System/v1/api/findByUserInfo').then(res=>{
								console.log(res.data)
								if(res.data){
									this.$ls.set("userDatas",res.data,60*60*1000*6);
									this.$router.go(0)
								}
							})
						}else{
							this.$openNotification(res.data.msg)
						}
					})
				}else{
					if(this.auth_code==''){
						console.log("救援代码不能为空！")
					}
					if(this.Phone==''){
						console.log("请填写你要更换的手机号")
					}
				}
				this.visible = false;
				this.Phone='';
				this.auth_code='';
			},
			handleCancel(e) {
				this.visible = false;
				this.Phone='';
				this.auth_code='';
			},
			getAuthCode() {
				var data={
					email:'18924674362@163.com'
				}
		        this.$Request_post("https://mychen.vip:8090/System/v1/api/findByEmailCode",data).then(res=>{
					console.log(res)
				})
      		},
		}
	}
</script>
<style scoped>

</style>
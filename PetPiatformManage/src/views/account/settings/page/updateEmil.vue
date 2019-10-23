<template>
	<div>
		<a-modal title="修改绑定邮箱" v-model="visible" @ok="handleOk" @cancel="handleCancel" cancelText="取消" okText="绑定">
			<a-form-item label="请输入邮箱地址">
				<a-input placeholder="输入邮箱" type="email" v-model="email" />
			</a-form-item>
			
			<a-form-item label="获取验证码" :required="false">
					<a-row :gutter="16">
					    <a-col class="gutter-row" :span="10">
					        <a-input placeholder="验证码" type="password" v-model="auth_code" />
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
				email: '',
				auth_code:'',
				smsSendBtn: false,
				time: 10,
			}
		},
		methods: {
			showModal() {
				this.visible = true
			},
			handleOk(e) {
				console.log(e);
				if(this.email!=""&&this.auth_code!=''){
					var data={
						auth_code:this.auth_code,
						email:this.email,
					}
					this.$Request_patch("https://mychen.vip:8090/System/v1/api/updateEmil",data).then(res=>{
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
					
				}
				this.visible = false;
				this.email="";
				this.auth_code="";
			},
			handleCancel(e) {
				this.visible = false;
				this.email="";
				this.auth_code="";
			},
			getAuthCode() {
				var data={
					email:'18924674362@163.com'
				}
		        this.$Request_post("https://mychen.vip:8090/System/v1/api/findByEmailCode",data).then(res=>{
					console.log(res)
				})
      		},
		},
		computed:{}
	}
</script>
<style scoped>

</style>
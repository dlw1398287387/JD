<template>
	<div>
		<a-modal title="修改密码" v-model="visible" @ok="handleOk" @cancel="handleCancel" cancelText="取消" okText="修改">
			<a-form layout="vertical">
				<a-form-item label="输入您要修改的密码">
					<a-input placeholder="输入密码" type="password" v-model="Password" />
				</a-form-item>
				<span v-if="Password!=''" class="passwordLevel">{{passwordLevel}}</span>
				<a-form-item label="确认密码" :required="false">
					<a-input placeholder="确认密码" type="password" v-model="checkPassword" />
				</a-form-item>
				<span v-if="Password!=''" class="passwordLevel">{{passwordLevel2}}</span>
				
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
				
			</a-form>
		</a-modal>
	</div>
</template>
<script>
	const levelNames = {
		0: '低',
		1: '低',
		2: '中',
		3: '强'
	}
	export default {
		data() {
			return {
				visible: false,
				Password:'',
				checkPassword: '',
				auth_code:''
			}
		},
		methods: {
			showModal() {
				this.visible = true;
			},
			handleOk(e) {
				if(this.Password == this.checkPassword && this.auth_code!='') {
					var data={
						Password:this.Password,
						CheckPassword:this.checkPassword,
						auth_code:this.auth_code,
					}
					this.$Request_patch("https://mychen.vip:8090/System/v1/api/updatePassword",data).then(res=>{
						console.log(res);
						if(res.data.status="Success"){
							this.$openNotification(res.data.msg)
						}else{
							this.$openNotification(res.data.msg)
						}
					})
				}else{
					if(this.auth_code==''){
						this.$openNotification("请输入您的邮箱验证码！")
					}
					if(this.Password==''||this.checkPassword){
						this.$openNotification("请输入您需要修改的密码及确认密码！")
					}
				}
				this.visible = false;
				this.Password = "";
				this.checkPassword = "";
				this.auth_code = "";
			},
			handleCancel(e) {
				this.visible = false;
				this.Password = "";
				this.checkPassword = "";
				this.auth_code = "";
			},
			getAuthCode() {
				var data={
					email:'18924674362@163.com'
				}
		        this.$Request_post("https://mychen.vip:8090/System/v1/api/findByEmailCode",data).then(res=>{
					console.log(res);
					if(res.data.code=="1"){
						this.$message.success("验证码发送成功！请前往邮箱查收！");
					}
				})
      		},
		},
		computed: {
			//校验密码强度
			passwordLevel() {
				let level = 0
				// 判断这个字符串中有没有数字
				if(/[0-9]/.test(this.Password)) {
					level++;
				}
				// 判断字符串中有没有字母
				if(/[a-zA-Z]/.test(this.Password)) {
					level++;
				}
				// 判断字符串中有没有特殊符号
				if(/[^0-9a-zA-Z_]/.test(this.Password)) {
					level++;
				}
				return "当前密码强度:" + levelNames[level];
			},
			passwordLevel2(){
				if(this.checkPassword!=''){
					if(this.Password==this.checkPassword){ 
						console.log("1");
						return "";
					}else{
						console.log("2");
						return "密码不一致，请确认！";
					}
				}
			}
		}
	}
</script>

<style scoped>
	.passwordLevel {
		display: inherit;
		margin-bottom: 20px;
		margin-top: -10px;
		color: red;
	}
</style>
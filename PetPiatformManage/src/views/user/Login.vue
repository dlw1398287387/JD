<template>
	<div class="container">
		<div style="height: 80px;">
			<!--切换中英文-->
		</div>
		<div class="content">
			<div class="top">
				<div class="header">
					<img alt="logo" class="logo" src="../../assets/LOGOicon.png" />
					<span class="title">{{$t('user.projectName')}}</span>
				</div>
				<div class="desc">{{$t('user.projectDescribe')}}</div>
			</div>
			<div class="login">
				<a-form :autoFormCreate="(form) => this.form = form">
					<a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
						<a-tab-pane tab="账户密码登录" key="1">
							<a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
							<a-form-item fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户名', whitespace: true}]}">
								<a-input size="large" placeholder="Emil" v-model="email">
									<a-icon slot="prefix" type="user" />
								</a-input>
							</a-form-item>
							<a-form-item fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}">
								<a-input size="large" placeholder="Password" type="password" v-model="Password">
									<a-icon slot="prefix" type="lock" />
								</a-input>
							</a-form-item>
						</a-tab-pane>
						<a-tab-pane tab="手机号登录" key="2">
							<a-form-item>
								<a-input size="large" placeholder="mobile number">
									<a-icon slot="prefix" type="mobile" />
								</a-input>
							</a-form-item>
							<a-form-item>
								<a-row :gutter="8" style="margin: 0 -4px">
									<a-col :span="16">
										<a-input size="large" placeholder="captcha">
											<a-icon slot="prefix" type="mail" />
										</a-input>
									</a-col>
									<a-col :span="8" style="padding-left: 4px">
										<a-button style="width: 100%" class="captcha-button" size="large"><span style="font-size: 14px;">{{$t('user.getVerification')}}</span></a-button>
									</a-col>
								</a-row>
							</a-form-item>
						</a-tab-pane>
					</a-tabs>
					<div>
						<a-checkbox :checked="true" style="float: left">{{$t('user.automaticlogin')}}</a-checkbox>
						<a style="float: right" disabled="true">{{$t('user.forgetpassword')}}</a>
					</div>
					<a-form-item>
						<a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary" @click.stop.prevent="onSubmit">{{$t('user.login')}}</a-button>
					</a-form-item>
					<div>
						<span style="float: left">{{$t('user.Otherloginmethods')}}</span>
						<a-icon class="icon" type="alipay-circle" />
						<a-icon class="icon" type="taobao-circle" />
						<a-icon class="icon" type="weibo-circle" />
						<router-link style="float: right" to="/user/Register">{{$t('user.registerAccount')}}</router-link>
					</div>
				</a-form>
			</div>
		</div>
		<GlobalFooter></GlobalFooter>
	</div>
</template>

<script>
	import GlobalFooter from '@/components/pages/GlobalFooter'
	import { timeFix } from '@/utils/util'
	export default {
		name: "Login",
		data() {
			return {
				logging: false,
				error: '',
				email: '',
				Password: '',
			}
		},
		methods: {
			onSubmit() {
				var data = {
					email: this.email,
					Password: this.Password
				}
				this.$Request_post("https://mychen.vip:8090/System/v1/api/AdminLogin", data).then(res => {
					console.log(res)
					if(res.data.status == "Success") {
						this.$ls.set("userInfotoken", res.data, 60 * 60 * 1000 * 6)
						this.$Request_post('https://mychen.vip:8090/System/v1/api/findByUserInfo').then(res=>{
							console.log(res)
							if(res.data){
								this.$ls.set("userDatas",res.data,60*60*1000*6)
								this.$router.push({
									name: "index"
								})
								this.$message.success(timeFix() + '，欢迎回来', 3)
							}
						})
					} else if(res.data.status == "failing") {
						this.$openNotification(res.data.msg)
					} 
				})
			},
		},
		components: {
			GlobalFooter
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: auto;
		background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
		background-size: 100%;
	}
	
	.content {
		padding: 32px 0;
		flex: 1;
	}
	
	.top {
		text-align: center;
	}
	
	.header {
		height: 44px;
		line-height: 44px;
	}
	
	.header a {
		text-decoration: none;
	}
	
	.logo {
		height: 64px;
		vertical-align: top;
		margin-right: 16px;
		margin-top: -10px;
	}
	
	.title {
		font-size: 33px;
		color: rgba(0, 0, 0, .85);
		font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
		font-weight: 600;
		position: relative;
		top: 2px;
	}
	
	.desc {
		font-size: 14px;
		color: rgba(0, 0, 0, .45);
		margin-top: 12px;
		margin-bottom: 40px;
	}
	
	.icon {
		float: left;
		font-size: 24px;
		color: rgba(0, 0, 0, 0.2);
		margin-left: 16px;
		vertical-align: middle;
		cursor: pointer;
		transition: color 0.3s;
	}
	
	&:hover {
		color: #1890ff;
	}
	
	@media screen and (max-width: 576px) {
		width: 95%;
	}
	
	@media screen and (max-width: 320px) {
		.captcha-button {
			font-size: 14px;
		}
	}
	
	@media (min-width: 768px) {
		padding: 112px 0 24px;
	}
	
	.login {
		width: 368px;
		margin: 0 auto;
	}
</style>
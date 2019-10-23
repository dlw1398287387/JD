<template >
	<div class="container">
		<div style="height: 80px;"> <!--切换中英文--></div>                
		<div class="content">
			<div class="top">
				<div class="header">
					<img alt="logo" class="logo" src="../../assets/LOGOicon.png" />
					<span class="title">我也不知道叫啥名！</span>
				</div>
				<div class="desc">我也不知道怎么描述一下子！</div>
			</div>
			<div>
			 	<a-icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style="font-size: 56px;"/>
				<p style="font-size: 30px;margin-top: 40px;">您的账户：{{emilSum}}注册成功</p>
				
				<p>注意保存好您的救援代码！以免被他人获取！</p>
				<p>{{description}}</p>
				<div style="margin-top: 50px;">
					<!--<a-button size="large" type="primary">查看邮箱</a-button>-->
			      	<a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
		      	</div>
      			<div style="height: 70px;"></div>
			</div>
			
		</div>
		<GlobalFooter></GlobalFooter>
	</div>
</template>

<script>
	import GlobalFooter from '@/components/pages/GlobalFooter'
	export default {
		name: "Login",
		data() {
			return {
				emilSum:this.$route.params.emilNum,
				description: '激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。',
			}
		},
		methods: {
			goHomeHandle(){
				this.$router.push({name:'login'})
			}
		},
		mounted(){
			console.log(this.$router)
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
		text-align: center;
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
	

	

	
	
</style>
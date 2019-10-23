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
			<div class="login">
				<h3 style=""><span>注册</span></h3>
				<a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
					<a-form-item  fieldDecoratorId="email"
       				 :fieldDecoratorOptions="{rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }]}">
						<a-input size="large" type="text" placeholder="邮箱" v-model="email"></a-input>
      				</a-form-item>
      				
      				
      				<a-popover placement="right" trigger="click" :visible="state.passwordLevelChecked">
				        <template slot="content">
				          <div :style="{ width: '240px' }">
				            <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
				            <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
				            <div style="margin-top: 10px;">
				              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
				            </div>
				          </div>
				        </template>
				        <a-form-item
				          fieldDecoratorId="password"
				          :fieldDecoratorOptions="{rules: [
				          { required: true, message: '至少6位密码，区分大小写'},
				          { validator: this.handlePasswordLevel }
				        ]}"
				        >
				          <a-input size="large" type="password" @click="state.passwordLevelChecked = true" autocomplete="false" placeholder="至少6位密码，区分大小写" v-model="Password"></a-input>
				        </a-form-item>
			      	</a-popover>
      				
      				
      				<a-form-item
				        fieldDecoratorId="password2"
				        :fieldDecoratorOptions="{rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }]}">
				        <a-input size="large" type="password" autocomplete="false" placeholder="确认密码" v-model="CheckPassword"></a-input>
				    </a-form-item>
				    
				    <a-form-item
				        fieldDecoratorId="mobile"
				        :fieldDecoratorOptions="{rules: [{ required: true, message: '手机号' }], validateTrigger: 'blur'}">
				
				        <a-input-group size="large" compact>
				          <a-select style="width: 20%" size="large" defaultValue="+86">
				            <a-select-option value="+86">+86</a-select-option>
				            <a-select-option value="+87">+87</a-select-option>
				          </a-select>
				          <a-input style="width: 80%" placeholder="11 位手机号" v-model="phone"></a-input>
				        </a-input-group>
				    </a-form-item>
				    
				    
				    <a-row :gutter="16">
				        <a-col class="gutter-row" :span="16">
				          <a-form-item
				            fieldDecoratorId="captcha"
				            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}">
				            <a-input size="large" type="text" placeholder="验证码">
				              <a-icon slot="prefix" type='mail' :style="{ color: 'rgba(0,0,0,.25)' }"/>
				            </a-input>
				          </a-form-item>
				        </a-col>
				        <a-col class="gutter-row" :span="8">
				          <a-button
				            class="getCaptcha"
				            size="large"
				            :disabled="state.smsSendBtn"
				            @click.stop.prevent="getCaptcha"
				            v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"></a-button>
				        </a-col>
				    </a-row>
      				
					
					<a-form-item>
						<a-button size="large" type="primary" htmlType="submit" class="register-button">注册 </a-button>
				        <router-link style="float: right" to="/user/login">使用已有账户登录</router-link>
					</a-form-item>
					
				</a-form>
			</div>
		</div>
		<GlobalFooter></GlobalFooter>
	</div>
</template>

<script>
	const levelNames = {
	    0: '低',
	    1: '低',
	    2: '中',
	    3: '强'
  	}
	const levelClass = {
	    0: 'error',
	    1: 'error',
	    2: 'warning',
	    3: 'success'
  	}
   	const levelColor = {
	    0: '#ff0000',
	    1: '#ff0000',
	    2: '#ff7e05',
	    3: '#52c41a',
  	}
	import GlobalFooter from '@/components/pages/GlobalFooter'
	export default {
		name: "Login",
		data() {
			return {
				email:'',
				state: {
		          time: 60,
		          smsSendBtn: false,
		          passwordLevel: 0,
		          passwordLevelChecked: false,
		          percent: 10,
		          progressColor: '#FF0000'
        		},
        		Password:'',
        		CheckPassword:'',
        		phone:'',
			}
		},
		methods: {
			onSubmit() {
				var data={
					email:this.email,
					Password:this.Password,
					CheckPassword:this.CheckPassword,
					phone:this.phone,
				}
				console.log(data)
				this.$Request_post("https://mychen.vip:8090/System/v1/api/createUsers",data).then(res=>{
					console.log(res)
					if(res.data.status=="Success"){
						this.$router.push({name:'RegisterResult',params:{emilNum:this.email}})
					}else{
						this.$openNotification(res.data.msg)
					}
				})
			},
			handlePasswordLevel (rule, value, callback) {
		        let level = 0
		        // 判断这个字符串中有没有数字
		        if (/[0-9]/.test(value)) {
		          level++
		        }
		        // 判断字符串中有没有字母
		        if (/[a-zA-Z]/.test(value)) {
		          level++
		        }
		        // 判断字符串中有没有特殊符号
		        if (/[^0-9a-zA-Z_]/.test(value)) {
		          level++
		        }
		        this.state.passwordLevel = level
		        this.state.percent = level * 30
		        console.log('passwordLevel', this.state.passwordLevel, 'level', level)
		        if (level >= 2) {
		          if (level >= 3) {
		            this.state.percent = 100
		          }
		          callback()
		        } else {
		          if (level == 0) {
		            this.state.percent = 10
		          }
		          callback(new Error('密码强度不够'))
		        }
      		},
      		handlePasswordCheck (rule, value, callback) {
		        let password = this.form.getFieldValue('password')
		        if (value && password && value.trim() !== password.trim()) {
		          callback(new Error('两次密码不一致'))
		        }
		        callback()
      		},
      		getCaptcha(e) {
		        e.preventDefault()
		        let that = this
		
		        this.form.validateFields(['mobile'], {force: true},
		          (err, values) => {
		            if (!err) {
		              this.state.smsSendBtn = true;
		
		              let interval = window.setInterval(() => {
		                if (that.state.time-- <= 0) {
		                  that.state.time = 60;
		                  that.state.smsSendBtn = false;
		                  window.clearInterval(interval);
		                }
		              }, 1000);
		
		              const hide = this.$message.loading('验证码发送中..', 0);
		              var data={
		              	email:this.email
		              }
		              this.$Request_post("https://mychen.vip:8090/System/v1/api/findByEmailCode",data).then(res=>{
			              	setTimeout(hide, 2500);
			                  this.$notification['success']({
			                  message: '提示',
			                  description: '验证码获取成功，赶快去您的邮箱查收吧！您的验证码为：' + "123456",
			                  duration: 8
			               	})
		              })
					  	
		              getSmsCaptcha({mobile: values.mobile}).then(res => {
		                
		              }).catch(err => {
		                setTimeout(hide, 1);
		                clearInterval(interval);
		                that.state.time = 60;
		                that.state.smsSendBtn = false;
		                this.requestFailed(err);
		              });
		            }
		          }
		        );
      		},
		},
		computed: {
	      passwordLevelClass () {
	        return levelClass[this.state.passwordLevel]
	      },
	      passwordLevelName () {
	        return levelNames[this.state.passwordLevel]
	      },
	      passwordLevelColor () {
	        return levelColor[this.state.passwordLevel]
	      }
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
	
	.login {
		width: 368px;
		height: 100%;
		margin: 0 auto;
	}
	
	.register-button {
      width: 50%;
      /*margin-left: -70px;*/
    }
</style>
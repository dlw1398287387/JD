<template>
	<div style="float: right; margin-right: 10px;">
		
		<a-icon type="question-circle" style="color: rgba(0, 0, 0, 0.35);"/>
		
	    <User-Notice></User-Notice>
	    &nbsp;&nbsp;&nbsp;&nbsp;
		<a-dropdown>
			<!--../../../static/avatar2.jpg-->
        	<label><img :src="userAvatar" style="width: 28px;margin-left: 0px; border-radius: 60px; height: 28px;"/>
        		   &nbsp;&nbsp;{{nickName}}
        	</label>
        		<a-menu slot="overlay" style="width: 130px; margin-top: 25px;">
					<a-menu-item key="0">
						<a-icon type="user"/>
						<span>个人中心</span>
					</a-menu-item>
					<a-menu-item key="1">
						<a-icon type="setting"/>
						<span>账户设置</span>
					</a-menu-item>
					<a-menu-item key="2" disabled>
						<a-icon type="setting"/>
						<span>测试</span>
					</a-menu-item>
					<a-menu-divider />
					<a-menu-item key="3" @click="logOut">
						<a-icon type="logout"/>
						<span>退出登录</span>
					</a-menu-item>
				</a-menu>
        </a-dropdown>&nbsp;&nbsp;
        <a-button @click="cutLanguage" style="padding: 5px;">{{LanguageDesc}}</a-button>&nbsp;&nbsp;
      	
	</div>
</template>

<script>
	import UserNotice from '@/components/tools/UserNotice'
	export default{
		name:'UserMenu',
		data(){
			return{
				LanguageDesc:'Chinese',
				userAvatar:this.$Vue.ls.get("userDatas").userAvatar,
				nickName:this.$Vue.ls.get("userDatas").nickName,
			}
		},
		mounted(){
			if(this.userAvatar==null){
				this.userAvatar="../../../static/avatar2.jpg";
			}
		},
		methods:{ 
			logOut(){
				var that=this
				this.$confirm({
			        title: '提示',
			        content: '真的要注销登陆吗？',
			        okText: '确定',
        			cancelText:'取消',
			        onOk(){
			          that.$ls.remove('userInfo')
			          that.$router.push({name:'login'})
			        },
			        onCancel(){
			          console.log('取消');
			        },
			        class: 'test',
      			});
			},
			cutLanguage(){//English
				this.$notification.open({
		          message: '提示！',
		          description: '还没适配国际化！别着急！',
		          duration:1.5,
		        });
				if(this.LanguageDesc=="Chinese"){
					this.LanguageDesc="English"
				}else if(this.LanguageDesc=="English"){
					this.LanguageDesc="Chinese"
				}
			}
		},
		components:{
			UserNotice
		}
	}
</script>

<style scoped>
	
</style>
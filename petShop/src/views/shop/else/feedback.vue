<template>
	<div>
		<navigationTop>
			<div slot="icon_left">
				<div style="margin-top: 5px; font-size: 24px;">
					<van-icon name="arrow-left" />
				</div>
			</div>
			<div slot="content_center">
				<span style="display: flex;justify-content: center;margin-top: 8px;">问题反馈</span>
			</div>
			<div slot="icon_right"></div>
		</navigationTop>
		
		<div class="feedback_box">
			<span class="feedback_title">问题反馈</span>
			<div style="border-bottom:1px solid #666 ;"></div>
			<span class="feedback_thank">对您给予的帮助和支持，深表感谢</span>
			<van-button type="default" style="display: flex; margin-bottom: 20px;" @click="()=>actionsheet = !actionsheet">
				<span v-show="!checkType">问题类型</span>
				<span v-show="checkType">{{checkType}}</span>
			</van-button>
			
			
			<input placeholder="您的联系方式：手机号,邮箱？" class="feedback_input"/>
			<span style="color: red;float: right;margin-right: 16px; margin-top: -20px;">*选填</span>
			
			<van-actionsheet v-model="actionsheet" >
			  	<!--<van-picker
				  show-toolbar
				  title="标题"
				  :columns="columns"
				  @cancel="()=>actionsheet = !actionsheet"
				  @confirm="onConfirm"
				/>-->
			</van-actionsheet>
			<textarea class="feedback_textarea" v-model="textareas"></textarea>
			<van-button type="danger" size="large">提交</van-button>
		</div>
		
	</div>
</template>

<script>
	import navigationTop from '@/components/modularization/navigationTop'
	import { ActionSheet ,Button,Picker } from 'vant';
	export default{
		name:'feedback',
		data(){
			return{
				actionsheet:false,
				columns:['功能意见','界面意见','性能问题','网络问题','新的需求','其他问题'],
				checkType:'',
				textareas:''
			}
		},
		mounted(){
			console.log("1")
		},
		methods:{
		   onConfirm(picker){
		   		console.log(picker)
		   		this.checkType=picker
		   		this.actionsheet=!this.actionsheet
		   }
		},
		
		components:{
			navigationTop,
			ActionSheet,
			Button ,
			Picker  
		}
	}
</script>

<style lang="scss" scoped>
	.feedback_box{
		width: 90%;
		margin-left: 5%;
		.feedback_title{
			font-size: 18px;
			display: flex;
			margin: 10px;
		}
		.feedback_input{
			display: flex; 
			width: 80%;
			height: 20px;
			font-size: 12px;
		}
		.feedback_thank{
			font-size: 16px;
			display: flex;
			margin-bottom: 20px;
		}
		.feedback_textarea{
			margin-top: 20px;
			height: 90px;
			width: 100%;
		}
		
	}
	
</style>
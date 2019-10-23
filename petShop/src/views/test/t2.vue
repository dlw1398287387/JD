<template>
	<div>
		<div class="details_navigation">
			<div style="width: 25%; float: left; margin-top: 10px; font-size: 22px; ">
				<van-icon name="arrow-left" @click="goback"/>
			</div>
			<div style="width: 25%; float: left; margin-top: 12px;">
				<span :style="active_comm" @click="selected('active_comm')">商品</span>
			</div>
			<div style="width: 25%; float: left; margin-top: 12px;">
				<span :style="active_detail" @click="selected('active_detail')">详情</span>
			</div>
			<div style="width: 25%; float: left; margin-top: 12px;">
				<span :style="active_comment" @click="selected('active_comment')">评论</span>
			</div>
		</div>
		
		<slot></slot>
		 
	</div>
</template>

<script>
	import { Icon } from 'vant';
	export default{
		name:'t2',
		data(){
			return{
				active:0,
				active_comm:'',
				active_detail:'',
				active_comment:'',
			}
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			selected(name){
			   if(name=="active_comm"){
			   		this.active_comm="color:red;"
			   		this.active_detail=""
			   		this.active_comment=""
			   		this.$router.push({name:'details'})
			   }else if(name=="active_detail"){
			   		this.active_comm=""
			   		this.active_detail="color:red;"
			   		this.active_comment=""
			   }else if(name=="active_comment"){
			   		this.active_comm=""
			   		this.active_detail=""
			   		this.active_comment="color:red"
			   }
			}
		},
		components:{
			 Icon
		}
	}
</script>

<style lang="scss" scoped>
	.details_navigation{
		width: 100%;
		height: 44px;
		border: 0px solid black;
		font-size: 14px;
		border-bottom: 1px solid #666;
	}
	
</style>
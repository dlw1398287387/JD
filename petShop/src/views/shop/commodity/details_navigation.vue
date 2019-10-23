<template>
	<div>
		<div class="details_navigation">
			<div style="width: 10%; float: left; margin-top: 10px; font-size: 22px; ">
				<van-icon name="arrow-left" @click="goback"/>
			</div>
			<div style="width: 30%; float: left; margin-top: 12px;">
				<span :style="active_comm" @click="selected('active_comm')">商品</span>
			</div>
			<div style="width: 30%; float: left; margin-top: 12px;">
				<span :style="active_detail" @click="selected('active_detail')">详情</span>
			</div>
			<div style="width: 30%; float: left; margin-top: 12px;">
				<span :style="active_comment" @click="selected('active_comment')">评论</span>
			</div>
		</div>
		<div style="height: 44px;"></div>
		
		<div style="width: 100%;">
			<div v-if="show==1">
				<commDtails></commDtails>
			</div>
			<div v-if="show==2">
				<particulars></particulars>
			</div>
			<div v-if="show==3">
				<comments></comments>
			</div>
		</div>
	</div>
</template>

<script>
	import commDtails from '@/views/shop/commodity/commDtails'
	import particulars from '@/views/shop/commodity/particulars'
	import comments from '@/views/shop/commodity/comment'
	import { Icon } from 'vant';
	export default{
		name:'details_navigation',
		data(){
			return{
				active_comm:'color:red',
				active_detail:'',
				active_comment:'',
				show:1,
			}
		},
		mounted(){
			
		},
		methods:{
			goback(){
				if(this.show==1){
					this.$router.go(-1)
				}else{
					this.show=1
					this.active_comm="color:red;"
					this.active_detail=""
			   		this.active_comment=""
				}
			},
			
			selected(name){
			   if(name=="active_comm"){
			   		this.active_comm="color:red;"
			   		this.active_detail=""
			   		this.active_comment=""
			   		this.show=1
			   		console.log("商品")
			   }else if(name=="active_detail"){
			   		this.active_detail="color:red;"
			   		this.active_comm=""
			   		this.active_comment=""
			   		console.log("详情")
			   		this.show=2
			   }else if(name=="active_comment"){
			   		this.active_comment="color:red"
			   		this.active_comm=""
			   		this.active_detail=""
			   		console.log("评价")
			   		this.show=3
			   }
			}
		},
		components:{
			Icon,
			commDtails,
			particulars,
			comments
		},
		
	}
</script>

<style lang="scss" scoped>
	.details_navigation{
		width: 100%;
		height: 44px;
		border: 0px solid black;
		font-size: 14px;
		/*border-bottom: 1px solid #666;*/
		position: fixed;
		z-index: 999;
		background: #FFFFFF;
	}
</style>
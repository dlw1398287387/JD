<template>
	<div>
		
		<navigationTop left="3" center="17" rigth="4">
			<div slot="icon_left">
				<div style="margin-top: 5px; font-size: 24px;">
					<van-icon name="arrow-left" />
				</div>
			</div>
			<div slot="content_center">
				<van-search placeholder="请输入搜索关键词" style="padding: 0px 0px; "/>
			</div>
			<div slot="icon_right">
				<div style="position: absolute; margin-top: 6px; font-size: 14px; margin-left: 10px;">
			  		<span>LAX</span>
			  		<van-icon name="arrow-down" />
			  	</div>
			</div>
		</navigationTop>
		
		<div class="folded_home">
			<div class="folded_box" :style="changeColor1" @click="changesColor1">
				<span>Shopping</span>
			</div>
			<div class="folded_box" :style="changeColor2" @click="changesColor2">
				<span>Hotel</span>
			</div>
			<div class="folded_box" :style="changeColor3" @click="changesColor3">
				<span>Hospital</span>
			</div>
			<div class="folded_box" :style="changeColor4" @click="changesColor4">
				<span>Grooming</span>
			</div>
			<div class="folded_box" :style="changeColor5" @click="changesColor5">
				<span>Breeding</span>
			</div>
			<div class="folded_icon" @click="()=> hiddenState = !hiddenState"><van-icon :name="IconsState"/></div>
		</div>
		<div class="folded_Hidden" v-if="hiddenState">
			There are no more conditions
		</div>
		<div style="width: 100%; border-bottom:1px solid #353535 ; display: flex;"></div>
	</div>
	
</template>

<script>
	var changeInit="border: 1px solid #D7D7D8;";
	var changes="border: 1px solid #F5C829;color: #FFFFFF;background: #F5C829;";
	import navigationTop from '@/components/modularization/navigationTop'
	import { Icon ,Row, Col,Search } from 'vant';
	import {removeArrIndexOf} from '@/utils/util.js'
	export default{
		name:'Folded_plate',
		data(){
			return{
				changeColor1:changeInit,
				changeColor2:changeInit,
				changeColor3:changeInit,
				changeColor4:changeInit,
				changeColor5:changeInit,
				IconsState:"arrow-down",
				store_type:[],
				hiddenState:false,
			}
		},
		methods:{
			
			changesColor1(){
				if(this.changeColor1==changeInit){
					this.changeColor1=changes
					this.store_type.push("petshop")
				}else{
					this.changeColor1=changeInit
					removeArrIndexOf(this.store_type,"petshop")
				}
			},
			changesColor2(){
				if(this.changeColor2==changeInit){
					this.changeColor2=changes
					this.store_type.push("pethotel")
				}else{
					this.changeColor2=changeInit
					removeArrIndexOf(this.store_type,"pethotel")
				}
			},
			changesColor3(){
				if(this.changeColor3==changeInit){
					this.changeColor3=changes
					this.store_type.push("pethospital")
				}else{
					this.changeColor3=changeInit
					removeArrIndexOf(this.store_type,"pethospital")
				}
			},
			changesColor4(){
				if(this.changeColor4==changeInit){
					this.changeColor4=changes
					this.store_type.push("petgrooming")
				}else{
					this.changeColor4=changeInit
					removeArrIndexOf(this.store_type,"petgrooming")
				}
			},
			changesColor5(){
				if(this.changeColor5==changeInit){
					this.changeColor5=changes
					this.store_type.push("petbreeding")
				}else{
					this.changeColor5=changeInit
					removeArrIndexOf(this.store_type,"petbreeding")
				}
			},
		},
		watch:{
			store_type(value){
				console.log(value)
				this.$emit('store_type',value)
			},
			hiddenState(value){
				console.log(value)
				if(value){
					this.IconsState="arrow-up"
				}else{
					this.IconsState="arrow-down"
				}
			}
		},
		components:{
			navigationTop,
			Icon,
			Row, 
			Col,
			Search,
		}
	}
</script>

<style lang="scss" scoped>

@media only screen and (max-width: 375px) and (min-width:375px){
	.folded_home{
	display: flex;
	float: left;
	margin-bottom: 10px;
		.folded_box{
			margin-left: 6px;
			padding: 4px;
			font-size: 14px;
			border-radius: 4px;
		}
		.folded_icon{
			margin-left: 10px;
			margin-top: 5px; 
		}
	}
}

@media only screen and (max-width: 414px) and (min-width:414px){
	.folded_home{
	display: flex;
	float: left;
	margin-bottom: 10px;
		.folded_box{
			margin-left: 12px;
			padding: 4px;
			font-size: 14px;
			border-radius: 4px;
		}
		.folded_icon{
			margin-left: 14px;
			margin-top: 5px;
		}
	}
}

@media only screen and (max-width: 411px) and (min-width:411px){
	.folded_home{
	display: flex;
	float: left;
	margin-bottom: 10px;
		.folded_box{
			margin-left: 12px;
			padding: 4px;
			font-size: 14px;
			border-radius: 4px;
		}
		.folded_icon{
			margin-left:12px;
			margin-top: 5px;
		}
	}
}

@media only screen and (max-width: 360px) and (min-width:360px){
	.folded_home{
	display: flex;
	float: left;
	margin-bottom: 10px;
		.folded_box{
			margin-left: 8px;
			padding: 4px;
			font-size: 12px;
			border-radius: 4px;
		}
		.folded_icon{
			margin-left:8px;
			margin-top: 5px;
		}
	}
}

@media only screen and (max-width: 320px) and (min-width:320px){
	.folded_home{
	display: flex;
	float: left;
	margin-bottom: 6px;
		.folded_box{
			margin-left: 4px;
			padding: 4px;
			font-size: 12px;
			border-radius: 4px;
		}
		.folded_icon{
			margin-left: 6px;
			margin-top: 5px;
		}
	}
}

.folded_Hidden{
	width: 100%;
	height: 80px;
	border: 0px solid pink;
	display: flex;
}
</style>

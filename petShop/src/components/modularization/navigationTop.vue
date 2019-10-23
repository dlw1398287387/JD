<template>
	<div>
		<div style="height: 36px; border: 0px solid black; width: 100%; position: fixed; z-index: 999; background: #FFFFFF;">
			<van-row>
				<div @click="goback">
					<van-col :span="left">
						<slot name="icon_left"></slot>
					</van-col>
				</div>
			  	<div>
			  		<van-col :span="center">
			  			<slot name="content_center"></slot>
			  		</van-col>
			  	</div>
			  	<div>
			  		<div>
				  		<van-col :span="right">
				  			<slot name="icon_right"></slot>
				  		</van-col>
			  		</div>
			  	</div>
			</van-row>
		</div>
		<div style="height: 44px;"></div>
	</div>
</template>

<script>
	import { Row, Col } from 'vant';
	export default{
		name:'navigationTop',
		data(){
			return{
				
			}
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
		},
		props:{
			left:{
				type:Number,
				default:3
			},
			center:{
				type:Number,
				default:18
			},
			right:{
				type:Number,
				default:3
			}
		},
		components:{
			Row, 
			Col,
		}
	}
</script>

<style lang="scss" >
</style>
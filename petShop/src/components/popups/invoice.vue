<template>
	<div>
		<van-popup  v-model="show" position="bottom" :overlay="true">
			<div style="height: 40px; border: 0px solid black;">
		 	 	<span style="display: flex; justify-content: center; font-size: 14px; color: black; font-weight: bold;margin-top: 14px;">配送至</span>
		 	 	<van-icon name="cross" @click="outShow" style='float: right; font-size: 18px; margin-top: -18px; margin-right: 10px;' />
		 	</div>
		 	<p style="font-size: 14px; margin: 0px;">{{hint}}！</p>
		 	<van-picker :columns="columns" @change="onChange" /> 
		</van-popup>
	</div>
</template>

<script>
	import { Popup,Icon,Picker  } from 'vant';
	export default{
		name:'invoice',
		data(){
			return{
				show: false,
				columns: ['不开发票','电子发票', '单据发票'],
				hint:'发票收据会存放到您的包裹中',
			}
		},
		mounted(){
			
		},
		methods:{
			//唤出弹窗
			openShow(){
				this.show=true
			},
			//屏蔽弹窗
			outShow(){
				this.show=false
			},
			onChange(picker, value, index) {
				if(value=="电子发票"){
					this.hint="电子发票会发送至您的邮箱！注意查收！"
				}else{
					this.hint="发票收据会存放到您的包裹中"
				}
				this.$emit("BackIncoice",value)
		   }
		},
		components:{
			Popup,Icon,Picker 
		}
	}
</script>

<style>
</style>
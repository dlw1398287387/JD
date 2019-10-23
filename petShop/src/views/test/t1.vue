<template>
	<div>
		<div @click="onShow">
			<p>1</p>
			<p>1</p>
			<p>1</p>
			<p>1</p>
			<p>1</p>
			<p>1</p>
			<p>1</p>
			<p>1</p>
			<p>1</p>
		</div>
		
		
		<van-popup style="width: 80%; height: 100vh;" v-model="show" position="right" :close-on-click-overlay="true" :overlay="true" :lazy-render="true">
			<p>123</p>
			<p>123</p>
			<p>123</p>
			<p>123</p>
			<p>123</p>
			<p>123</p>
			<p>123</p>
			<p>123</p>
			<p>123</p>
			<p>123</p>
			<p>123</p><p>123</p>
		  	<span @click="onhidden">关闭</span>
		  	<span @click="onhidden">确定</span>
		</van-popup>
			
	</div>
</template>

<script>
	import { Popup } from 'vant';
	export default{
		data(){
			return{
				show: false
			}
		},
		mounted(){
			
			
		},
		methods:{
			onShow(){
				this.show=true
			},
			onhidden(){
				this.show=false
			}
		},
		components:{
			Popup 
		}
	}
</script>

<style>
</style>
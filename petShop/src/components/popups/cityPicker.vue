<template>
	<div>
		<van-popup style="" v-model="show" position="bottom" :overlay="true">
				<van-area :area-list="areaList" @confirm="confirm" @cancel="outShow"/>
		</van-popup>
	</div>
</template>

<script>
	import { city } from '@/views/shop/cityService/city'
	import { Area } from 'vant';
	export default{
		name:'cityPicker',
		data(){
			return{
				show: false,
				areaList: city,
			}
		},
		mounted(){},
		methods:{
			onOpenshow() {
				this.show = true
			},
			outShow() {
				this.show = false
			},
			confirm(e) {
				this.show = false
				this.$emit("cityPicker",e)
			},
			
		},
		components:{ Area }
	}
</script>

<style>
</style>
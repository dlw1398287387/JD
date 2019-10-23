<template>
	<div>
		<van-popup  v-model="show" position="bottom" :overlay="true">
		 	 <div style="height: 40px; border: 0px solid black;">
		 	 	<span style="display: flex; justify-content: center; font-size: 14px; color: black; font-weight: bold;margin-top: 14px;">配送至</span>
		 	 	<van-icon name="cross" @click="outShow" style='float: right; font-size: 18px; margin-top: -18px; margin-right: 10px;' />
		 	 </div>
		 	 
		 	 <div>
		 	 	<van-address-list
				  v-model="chosenAddressId"
				  :list="list"
				  @select="onSelect"
				/>
		 	 </div>
		</van-popup>
	</div>
</template>

<script>
	import { Popup,Icon ,AddressList  } from 'vant';
	export default{
		name:'shippingAddress',
		data(){
			return{
				 show: false,
				 chosenAddressId:'1',
				 list:[]
			}
		},
		mounted(){
			if(localStorage.getItem("DirectoryInquiries")){
				this.list=JSON.parse(localStorage.getItem("DirectoryInquiries"))
			}
			
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
			//选择收件人 地址信息，并返回给 父组件
			onSelect(item,index){
				this.$emit("changeAddress",item)
				this.show=false
			}
		},
		components:{
			Popup,Icon,AddressList 
		}
	}
</script>

<style lang="scss" scoped>
.van-address-list__add{
	display: none;
}
.van-icon-edit{
	display: none;
}
</style>
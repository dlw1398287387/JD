<template>
	<div>
		<div style="width: 100%;">
			<div v-for="(item,index) in data">
				<span :class="active==item.id?'active':'Classification'" @click="oncheck1(item.id)">{{item.id}}</span>
			</div>
		</div>
		
		<div style="width: 100%; display: flex;">
			<div v-for="item in data2">
				<span :class="active2==item.id?'active':'Classification'" @click="oncheck2(item.id)">{{item.id}}</span>
			</div>
		</div>
		
		{{calculate}}
	</div>
</template>

<script>
	import {CommDatails} from '@/views/shop/commodity/mock'
	export default {
		data() {
			return {
				show: false,
				data:CommDatails.Selectl.category,
				data2:CommDatails.Selectl.versions,
				active: '',
				active2: '',
				value: 1,
			};
		},
		mounted() {
			console.log(CommDatails)
			this.active='760P'
			this.active2='256G'
		},
		computed:{
			calculate(){
				if(this.active!=""&&this.active2!=null){
					for(var i=0;i<CommDatails.verify.length;i++){
						if(CommDatails.verify[i].c==this.active&&CommDatails.verify[i].v==this.active2){
//							console.log(CommDatails.verify[i].price)
							return this.active+":"+this.active2+"单价：¥"+CommDatails.verify[i].price+"库存："+CommDatails.verify[i].inventory
						}
					}
				}
			}
		},
		methods: {
			onOpenshow() {
				this.show = true
			},
			outShow() {
				this.show = false
			},
			oncheck1(name) {
//				console.log(name)
				this.active = name
			},
			oncheck2(name) {
//				console.log(name)
				this.active2 = name
			}
		},
	};
</script>

<style>
	.commodity_type {
		width: 100%;
		height: 30px;
		margin-left: 10px;
		font-size: 12px;
		color: #666;
	}
	
	.active {
		float: left;
		margin-left: 10px;
		padding: 10px;
		background: #efc531;
		margin-bottom: 10px;
		border-radius: 4px;
		font-size: 14px;
	}
	
	.Classification {
		float: left;
		margin-left: 10px;
		padding: 10px;
		background: #f7f7f7;
		margin-bottom: 10px;
		border-radius: 4px;
		font-size: 14px;
	}
</style>
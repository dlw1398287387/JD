<template>
	<div>
		<div v-for="item in orders" style="margin-bottom: 10px; text-align: left;">
			<van-card v-if="item.orderState==2" :num="item.defalutSelect.count" tag="全新" :price="item.defalutSelect.price" :desc="item.description" :title="item.productName" :thumb="item.productImg[0]" :origin-price="item.original_Price">
				<div slot="tags">
					<van-tag plain type="danger">{{item.defalutSelect.type}}</van-tag>
					<van-tag plain type="danger">{{item.defalutSelect.versions}}</van-tag>
				</div>
				<div slot="footer">
					<!--<van-button size="mini" >删除订单</van-button>-->
					<van-button size="mini" v-if="item.orderState==2">已发货</van-button>
					<van-button size="mini" v-if="item.orderState==2">查看物流</van-button>
					<van-button size="mini" v-if="item.orderState==2" @click="confirm(item.OrderId)">确认收货</van-button>
				</div>
			</van-card>
		</div>
	</div>
</template>

<script>
	import { Card } from 'vant';
	export default {
		name: 'order3',
		data() {
			return {
				orders: this.information
			}
		},
		methods: {
			confirm(e) {
				console.log(e)
				var data = {
					orderId:e,
					orderState:3
				}
				this.$Request_post("http://192.168.10.102:3001/petshop/v1/api/UpdateOrderState",data).then(res=>{
					console.log(res)
				})	
			}
		},
		components: {
			Card
		},
		props: {
			information: {
				type: Array
			}
		}
	}
</script>

<style>

</style>
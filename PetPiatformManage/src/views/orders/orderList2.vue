<template>
	<div>
		<GlobalPageHeader :headline="headline" :describe="describe"></GlobalPageHeader>
		<div style="height: 80vh; margin: 20px; background: #FFFFFF;">
			<a-skeleton active :loading="!loading">
				<div class="orderList_home">
					<div class="orderPhoneM" v-if="loading">
						<table style="width:1500px; border: 0px solid black;">
							<tr style="display: flex;margin-left: 10px; margin-top:10px;border-bottom: 1px solid black;">
								<th style="height:50px;width: 60px;line-height: 50px;border: 0px solid black;text-align: center;">图片</th>
								<th style="height:50px;width: 200px;line-height: 50px;border-right: 0px solid black;text-align: center;">订单号</th>
								<th style="height:50px;width: 70px;line-height: 50px;border: 0px solid black;text-align: center;">入库类型</th>
								<th style="height:50px;width: 70px;line-height: 50px;border: 0px solid black;text-align: center;">订单状态</th>
								<th style="height:50px;width: 150px;line-height: 50px;border: 0px solid black;text-align: center;">产品类型</th>
								<th style="height:50px;width: 300px;line-height: 50px;border: 0px solid black;text-align: center;">产品名称</th>
								<th style="height:50px;width: 200px;line-height: 50px;border: 0px solid black;text-align: center;">型号</th>
								<th style="height:50px;width: 50px;line-height: 50px;border: 0px solid black;text-align: center;">数量</th>
								<th style="height:50px;width: 50px;line-height: 50px;border: 0px solid black;text-align: center;">金额</th>
								<th style="height:50px;width: 80px;line-height: 50px;border: 0px solid black;text-align: center;">收件人姓名</th>
								<th style="height:50px;width: 300px;line-height: 50px;border: 0px solid black;text-align: center;">收件人地址</th>
								<th style="height:50px;width: 100px;line-height: 50px;border: 0px solid black;text-align: center;">收件人联系电话</th>
								<th style="height:50px;width: 200px;line-height: 50px;border: 0px solid black;text-align: center;">留言</th>
								<th style="height:50px;width: 80px;line-height: 50px;border: 0px solid black;text-align: center;">收据/发票</th>
								<th style="height:50px;width: 150px;line-height: 50px;border: 0px solid black;text-align: center;">下单时间</th>
								<th style="height:50px;width: 120px;line-height: 50px;border: 0px solid black;text-align: center;">快递单号</th>
								<th style="height:50px;width: 150px;line-height: 50px;border: 0px solid black;text-align: center;">发货时间</th>
							</tr>
							<tr v-for="item in data" class="tab_tr" style="">
								<td class="table_th_img">
									<img style="width: 50px; height: 50px; margin-top: -5px;" :src="item.productImg[0]" />
								</td>
								<td class="table_th_orderId">{{item.OrderId}}</td>
								<td class="table_th_putaway">{{item.putaway_type}}</td>
								<td class="table_th_orderState">{{item.orderState==1?"付款成功":"运送中"}}</td>
								<td class="table_th_title">{{item.classify[0]}}-{{item.classify[1]}}-{{item.classify[2]}}</td>
								<td class="table_th_orderName">{{item.productName}}</td>
								<td class="table_th_Select">{{item.defalutSelect.type}}--{{item.defalutSelect.versions}}</td>
								<td class="table_th_Count">{{item.defalutSelect.count}}</td>
								<td class="table_th_Price">{{item.defalutSelect.price*item.defalutSelect.count}}</td>
								<td class="table_th_recipients_name">{{item.consignee.name}}</td>
								<td class="table_th_recipients_address">{{item.consignee.address}}</td>
								<td class="table_th_recipients_phone">{{item.consignee.tel}}</td>
								<td class="table_th_leaveAmessage">{{item.leaveAmessage}}</td>
								<td class="table_th_invoice">{{item.invoice}}</td>
								<td class="table_th_updateTime">{{item.createTime}}</td>
								<td class="table_th_trackingNumbers">{{item.trackingNumbers}}</td>
								<td class="table_th_updateTime">{{item.updateTime}}</td>
							</tr>
						</table>

						<div style="margin-top: 50px;margin-left: 20px;">
							<a-pagination :defaultCurrent="1" :defaultPageSize="6" :total="dataLength" @change="onChange" />
						</div>
					</div>
				</div>
			</a-skeleton>
		</div>
	</div>
</template>

<script>
	import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
	export default{
		name:"orderList2",
		data(){
			return{
				headline: "订单列表",
				describe: "此页查看订单列表，处理新订单，更新订单状态！",
				data: [], //分页视图数据
				paging: [], //分页总数据源
				dataLength: 0, //分页总页数
				loading: false,
			}
		},
		mounted(){
			var data={
				findBystate:2
			}
			this.$Request_post("https://mychen.vip:8090/System/v1/api/findByOrders",data).then(res => {
				console.log(res)
				this.paging = res.data
				this.dataLength = res.data.length
				this.loading = true
				for(var i = 0; i < this.paging.length; i++) {
					if(i <= 5) {
						this.data.push(this.paging[i])
					}
				}
			})
		},
		methods:{
			onChange(pageNumber) {
				this.pageIndex=pageNumber
				this.data = []; //点击分页时，将显示视图的数据源清空
				var indexMin = 0; // Z角标
				var indexMax = 6; // Y角标
				if(pageNumber == 1) { //只有当分页为1时，直接赋值0-6角标
					indexMin = 0
					indexMax = 6
				} else {
					indexMax = indexMax * pageNumber //Y角标等于  6乘以分页index
					indexMin = indexMax - 6 //Z角标 等于 Y角标-6   
				}
				console.log(indexMin)
				console.log(indexMax)
				for(var i = 0; i < this.paging.length; i++) { //循环总数据源
					//当循环数据中，I的角标等于并且大于Z角标时 并且 i的角标小于Y的角标时，将满足此条件的数据push进视图数据
					if(i >= indexMin && i < indexMax) {
						this.data.push(this.paging[i])
					}
				}
			},
		},
		components:{
			GlobalPageHeader
		}
	}
</script>

<style lang="scss" scoped>
	.orderList_home {
		width: 100%;
		height: 70vh;
		overflow: auto;
		border: 0px solid #ccc;
	}
	
	.tab_tr {
		display: flex;
		margin-left: 10px;
		margin-top: 0px;
		border-bottom: 1px solid #E8E8E8;
		border-left: 1px solid #E8E8E8;
		border-right: 1px solid #E8E8E8;
	}
	
	.tab_tr:hover {
		background: #E6F7FF;
	}
	
	.table_th_img {
		height: 60px;
		width: 60px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_orderId {
		height: 60px;
		width: 200px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_putaway {
		height: 60px;
		width: 70px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_orderState {
		height: 60px;
		width: 70px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_orderName {
		height: 60px;
		width: 300px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
		display: block;
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		/*! autoprefixer: off*/
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		-webkit-line-clamp: 2;
		text-align: left;
	}
	
	.table_th_Select {
		height: 60px;
		width: 200px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_Count {
		height: 60px;
		width: 50px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_Price {
		height: 60px;
		width: 50px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_recipients_name {
		height: 60px;
		width: 80px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_recipients_address {
		height: 60px;
		width: 300px;
		border-right: 1px solid #E8E8E8;
		/*text-align: center;*/
		display: block;
		word-wrap: break-word;
		/*overflow:hidden;*/
		text-overflow: ellipsis;
		display: -webkit-box;
		/*! autoprefixer: off*/
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		-webkit-line-clamp: 3;
		text-align: left;
	}
	
	.table_th_recipients_phone {
		height: 60px;
		width: 100px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_leaveAmessage {
		height: 60px;
		width: 200px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
		display: block;
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		/*! autoprefixer: off*/
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		-webkit-line-clamp: 2;
		text-align: left;
	}
	
	.table_th_invoice {
		height: 60px;
		width: 80px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_caozuo {
		height: 60px;
		width: 80px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	.table_th_trackingNumbers{
		height: 60px;
		width: 120px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	.table_th_updateTime{
		height: 60px;
		width: 150px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
	
	.table_th_title {
		height: 60px;
		width: 150px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
</style>
<template>
	<div>
		<GlobalPageHeader :headline="headline" :describe="describe"></GlobalPageHeader>
		<div style=" height: 80vh; margin: 20px; background: #FFFFFF;">
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
								<th style="height:50px;width: 80px;line-height: 50px;border: 0px solid black;text-align: center;">操作</th>
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
								<td class="table_th_createTime">{{item.createTime}}</td>
								<td class="table_th_caozuo">
									<a-button type="primary" @click="operation(item.OrderId)">操作</a-button>
								</td>
							</tr>
						</table>

						<a-modal title="更新订单状态" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
							<div style="width: 100%;">
								<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="选择订单状态">
									<a-select defaultValue="已发货" placeholder="选择状态" @change="selectOrderStatus">
										<a-select-option value="2">
											已发货
										</a-select-option>
										<a-select-option value="0">
											暂无货
										</a-select-option>
									</a-select>
								</a-form-item>
								<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="输入运输单号">
									<a-input v-model="trackingNumbers" placeholder="请输入您的运输快递单号!" />
								</a-form-item>
							</div>
						</a-modal>

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
	export default {
		name: "orderList1",
		data() {
			return {
				headline: "订单列表",
				describe: "此页查看订单列表，处理新订单，更新订单状态！",
				data: [], //分页视图数据
				paging: [], //分页总数据源
				dataLength: 0, //分页总页数
				loading: false,
				OrderId: "",//操作订单号
				visible: false,
				confirmLoading: false,
				formItemLayout:{labelCol: { span: 6 },wrapperCol: { span: 8 },},
				pageIndex:1,//记住分页记录，修改订单时重新分页一次。
				updateState:2,
				trackingNumbers:"",
			}
		},
		mounted() {
			var data={
				findBystate:1,
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
		methods: {
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
			operation(id) {
				this.OrderId = id
				this.visible = true
			},
			selectOrderStatus(e){
				console.log(e)
				this.updateState=e
			},
			handleOk(e) {
				console.log(this.OrderId)
				this.confirmLoading = true;
				if(this.updateState==2){
					if(this.updateState==2&&this.trackingNumbers!=""){
						console.log("商品已出库，准备发货")
						console.log(this.trackingNumbers)
						var data={
							orderId:this.OrderId,
							orderState:parseInt(this.updateState),
							trackingNumbers:this.trackingNumbers
						}
						this.$Request_post("https://mychen.vip:8090/System/v1/api/UpdateByOrderState",data).then(res=>{
							console.log(res);
							this.visible = false;
							this.confirmLoading = false;
						})
					}
				}else{//此处有待商议
					console.log("此商品无库存，十分抱歉")
					this.visible = false;
					this.confirmLoading = false;
				}
				
//				setTimeout(() => {
//					console.log(this.updateState)
//					this.visible = false;
//					this.confirmLoading = false;
//				}, 2000);
			},
			handleCancel(e) {
				this.OrderId=""
				console.log('Clicked cancel button');
				this.visible = false
			},
			
		},
		components: {
			GlobalPageHeader
		},

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
	.table_th_createTime{
		height: 60px;
		width: 150px;
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
	.table_th_title {
		height: 60px;
		width: 150px;
		line-height: 60px;
		border-right: 1px solid #E8E8E8;
		text-align: center;
	}
</style>
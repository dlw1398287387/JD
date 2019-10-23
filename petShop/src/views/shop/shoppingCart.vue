<template>
	<div>
		<navigationTop>
			<div slot="icon_left">
				<div style="margin-top: 8px; font-size: 24px;">
					<van-icon name="arrow-left" />
				</div>
			</div>
			<div slot="content_center">
				<span style="display: flex;justify-content: center;margin-top: 8px;">购物车</span>
			</div>
			<div slot="icon_right">
				<span v-if="Edit" style="display: flex;justify-content: center;margin-top: 8px; margin-right: 10px;" @click="Edits">
					编辑
				</span>
				<span v-if="!Edit" style="display: flex;justify-content: center;margin-top: 8px; margin-right: 10px;" @click="Deletes">
					删除
				</span>
			</div>
		</navigationTop>

		<div v-show="Not" style=" width: 100%; border: 0px solid black;" align="center">
			<img src="../../assets/img/kkry.jpg" style="width: 80%; margin-top: 50px;" />
			<div align="center">
				<span @click="goSkip">返回首页</span>
			</div>
		</div>

		<div style="width: 100%; height: 100%; background: #F7F7F7;">
			<div style="height: 10px;"></div>
			<div class="shoppingCart" v-for="item in data">
				<div style="width: 100%; border: 0px solid black; margin-bottom: 6px;">
					<div style="height: 30px; border: 0px solid black; display: flex; ">
						<van-icon name="shop-o" class="store_icon" style="padding: 6px;" />
						<span style="padding: 6px; font-size: 14px;">{{item.ShopName}}</span>
					</div>
					<div class="border"></div>
					<div>
						<van-row>
							<van-col span="2">
								<van-checkbox @click="abd(item)" v-model="item.statu" style="line-height: 110px;margin-left: 4px;" checked-color="red"></van-checkbox>
							</van-col>
							<van-col span="6">
								<img :src="item.productImg[0]" class="comm_img" />
							</van-col>
							<van-col span="16">
								<span class="comm_Name">{{item.productName}}</span>
								<span class="comm_Type">{{item.description}}</span>
								<span style="display: flex;font-size: 14px; margin-left: 8px;">{{item.defalutSelect.type}}--{{item.defalutSelect.versions}}</span>
								<div style="display: flex; justify-content: space-between;">
									<span class="comm_price">¥{{item.defalutSelect.price*item.defalutSelect.count}}</span>
									<van-stepper v-model="item.defalutSelect.count" :disable-input="true" style="margin-right: 6px;"/>
								</div>
							</van-col>
						</van-row>
						<!--<div v-if="item.complimentary!=''" style="font-size: 12px;text-align: left; margin-bottom: 10px; margin-left: 10px;">
							赠品:{{item.complimentary}}
						</div>-->
					</div>
				</div>
			</div>
			<!--拉长页面，当数据量少时看起来不算太突兀-->
			<div :class="data.length>=3==true?'length':'lengtha'"></div>
		</div>
		
		<van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="onSubmit">
			<van-checkbox style="margin-left: 10px;" v-model="checked" checked-color="red" @click="openCheckd">全选</van-checkbox>
		</van-submit-bar>

	</div>
</template>

<script>
	
	import navigationTop from '@/components/modularization/navigationTop'
	import { Icon, Checkbox, Stepper, SubmitBar, Row, Col, Toast, Dialog } from 'vant';
	export default {
		name:'shoppingCart',
		data() {
			return {
				Not:false,
				Edit:true,
				checked: true,
				data: [],
				total: 0,
			};
		},
		mounted(){
			Toast.loading({
			  mask: true,
			  message: '加载中...'
			});
			this.$Request_post(this.$request+"/findByShoppingCart").then(res=>{
				Toast.clear();
				if(res.data.length<=0){
					this.Not=true;
				}else{
					console.log(res.data)
					this.data=res.data   
				}
			})
		},
		computed: { 
			totalPrice() {//计算购物车金额
				var total = 0;
				for(var i = 0; i < this.data.length; i++) {
					if(this.data[i].statu==true){
						total += this.data[i].defalutSelect.price * this.data[i].defalutSelect.count
					}
				}
				return total
			}, 
		},
		methods: {
			onSubmit() {
				//提交购物车订单，将选中的商品传递给支付页面
				console.log(this.data)
				var orderList=[]
				for(var i=0;i<this.data.length;i++){
					if(this.data[i].statu){
						orderList.push(this.data[i])
					}
				}
				console.log(orderList)
				this.$router.push({name:'submitCart',params:{orderList:orderList}})
			},
			Edits(){
				this.Edit=false
			},
			Deletes(){//删除购物车物品
				Dialog.confirm({
				  title: '删除',
				  message: '确定要删除选中购物车商品吗？'
				}).then(() => {
				  	//确定删除
				  	var where={
				  		CartId:[]
				  	}
				  	//将选中的iD收集起来。
					for(var i=0;i<this.data.length;i++){
						if(this.data[i].statu){
							where.CartId.push(this.data[i].CartId)
						}
					}
					this.$Request_post(this.$request+"/DeleteCartComm",where).then(res=>{
						console.log(res)
						if(res.data.code=="200"){
							Toast.success(res.data.msg);
							setTimeout(()=>{
								this.$router.go(0);
							},800)
						}else{
							Toast.fail(res.data.msg);
						}
					})
					this.Edit=true
				}).catch(() => {
				  	// on cancel
				  	this.Edit=true
				});
				
			},
			abd(item){
				this.checked=false
				var cont=0;
				for(var i=0;i<this.data.length;i++){
					if(this.data[i].statu==true){
						cont+=1;
					}
				}
				if(this.data.length==cont){
					this.checked=true
				}
			},
			openCheckd(){
				if(this.checked==true){
					for(var i=0;i<this.data.length;i++){
						this.data[i].statu=true
					}
				}else{
					for(var i=0;i<this.data.length;i++){
						this.data[i].statu=false
					}
				}
			},
			goSkip(){
				this.$router.go(-1)
			}
		},
		components: {
			navigationTop,
			Icon,
			Checkbox,
			Stepper,
			SubmitBar,
			Row,
			Col,
			Toast,
			Dialog 
		}
	};
</script>

<style lang="scss" scoped>
	.van-stepper__input[disabled] {
		color: black;
	}
	
	.shoppingCart {
		display: flex;
		width: 94%;
		height: 100%;
		background: #FFFFFF;
		margin-left: 3%;
		margin-bottom: 10px;
		border-radius: 4px;
	}
	
	.border {
		margin-top: 4px;
		height: 2px;
		background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
		background-size: 100px;
		margin-bottom: 4px;
	}
	
	.comm_img {
		display: flex;
		width: 100%;
		height: 100%;
	}
	
	.comm_Name {
		margin-left: 8px;
		display: flex;
		font-size: 12px;
		text-align: left;
		margin-bottom: 4px;
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
	
	.comm_Type {
		margin-left: 8px;
		display: flex;
		font-size: 12px;
		text-align: left;
		margin-bottom: 4px;
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		/*! autoprefixer: off*/
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		-webkit-line-clamp: 1;
		text-align: left;
	}
	
	.comm_price {
		margin-left: 8px;
		display: flex;
		font-size: 16px;
		margin-top: 4px;
		text-align: left;
		font-weight: bold;
		color: red;
	}
	.lengtha{
		height: 70vh;
	}
	.length{
		height: 10vh;
	}
	@media only screen and (min-width: 768px) and(max-width:768px) {
		.van-col--6{
			width:17%
		}
		.comm_img {
			display: flex;
			width: 120px;
			height: 120px;
		}
	}
	@media only screen and (min-width: 1024px) and(max-width:1024px) {
		.van-col--6{
			width:13%
		}
		.comm_img {
			display: flex;
			width: 120px;
			height: 120px;
		}
	}
</style>
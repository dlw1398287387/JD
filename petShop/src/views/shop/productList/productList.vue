<template>
	<div>
		<div style="height: 40px; ">
			<van-row>
				<van-col span="3">
					<van-icon style="line-height: 40px;" name="arrow-left" size="24px" @click="goback"/>
				</van-col>
				<van-col span="18">
					<van-search placeholder="请输入搜索关键词" v-model="value" style="padding: 0px 0px;margin-top: 4px;"/>
				</van-col>
				<van-col span="3">
				</van-col>
			</van-row>
		</div>
		
		<div style="text-align: left;">
			<van-dropdown-menu>
			  <van-dropdown-item v-model="value1" :options="option1" @change="Sort1"/>
			  <van-dropdown-item v-model="value2" :options="option2" @change="Sort2"/>
			</van-dropdown-menu>
		</div>
		
		<div class="product_home_t">
			<div class="product_box_t" v-for="item in searchData" @click="goSkip('details_navigation',item)">
				<div class="product_img_t">
					<van-image width="100%" height="100%" :src="item.productImg[0]" />
				</div>
				<div class="product_content_t">
					<div class="product_content_name_t">
						<span>
							{{item.productName}}
						</span>
					</div>
					<div class="product_content_tag_t">
						<van-tag type="danger" v-if="item.buildTime==null">热销</van-tag>
						<van-tag type="danger" v-if="item.buildTime!=null">秒杀</van-tag>
					</div>
					<div class="product_content_price_t">
						<span>
							<span class="product_content_price_￥_t">￥</span>
							<span class="product_content_price_sum_t">{{item.defalutSelect.price}}.00</span>
						</span>
						<span>
							<van-icon class="product_content_price_icon_t" name="shopping-cart-o" />
						</span>
					</div>
					<div class="product_content_evaluate_t">
						<span>{{item.commentSum}}条评价</span>&nbsp;
						<span>{{item.grade==0?"暂无好评":"好评"+Math.round(item.grade/item.commentSum)}}%</span>
					</div>
					<div class="product_content_shopName_t">
						<span>{{item.ShopName}}</span>
					</div>
					<div class="product_content_border_bottom_t"></div>
				</div>
			</div>
		</div>
		<div v-if="searchState">
			<span>十分抱歉，目前还没有您搜索的商品！</span>
		</div>
	</div>
</template>

<script>
	
	import { Row, Col, Icon, Search,DropdownMenu, Tag ,DropdownItem ,Image} from 'vant';
	export default{
		name:"productList",
		data(){
			return {
				searchData:this.$store.state.SearchProductList,
				searchState:this.$store.state.SearchProductList.length<1?true:false,
				value: "",
				value1: 1,
		        value2: 'a',
		        option1: [
		          { text: '综合', value: 1 },
		          { text: '价格最低', value: 2 },
		          { text: '价格最高', value: 3 },
		        ],
		        option2: [
		          { text: '默认排序', value: 'a' },
		          { text: '好评排序', value: 'b' },
		          { text: '销量排序', value: 'c' },
		        ]
			}
		},
		mounted(){
			console.log(this.$store.state.SearchProductList)
			this.value=this.$store.state.SearchText
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			goSkip(val,item){
				console.log(item)
				//在vuex中管理状态，使用session，避免页面刷新数据消失，
				sessionStorage.setItem('productDetails',JSON.stringify(item));
				//commit一次，再次让vuex状态重新获取一次值对象。
				this.$store.commit('setProductDetails',item)
				this.$router.push({name:val})
			},
			Sort1(e){
				if(e==1){
					console.log("综合")
					this.searchData=JSON.parse(sessionStorage.getItem('searchProductList'))
				}
				if(e==2){
					console.log("按价格最低排序")
					for (var i = 0; i < this.searchData.length; i++) {
			       	 	for (var j = i; j < this.searchData.length; j++) {
			            	if (this.searchData[i].defalutSelect.price > this.searchData[j].defalutSelect.price) {
			                	var maxStr = this.searchData[j];
			                	this.searchData[j] = this.searchData[i];
			                	this.searchData[i] = maxStr;
			            	}
			        	};
			    	};
				}
				if(e==3){
					console.log("按价格最高排序")
					for (var i = 0; i < this.searchData.length; i++) {
			       	 	for (var j = i; j < this.searchData.length; j++) {
			            	if (this.searchData[i].defalutSelect.price < this.searchData[j].defalutSelect.price) {
			                	var maxStr = this.searchData[j];
			                	this.searchData[j] = this.searchData[i];
			                	this.searchData[i] = maxStr;
			            	}
			        	};
			    	};
				}
				
			},
			Sort2(e){
				if(e=="a"){
					console.log("默认排序")
					this.searchData=JSON.parse(sessionStorage.getItem('searchProductList'))
				}
				if(e=="b"){
					console.log("好评排序")
					for (var i = 0; i < this.searchData.length; i++) {
			       	 	for (var j = i; j < this.searchData.length; j++) {
			            	if (this.searchData[i].grade/this.searchData[i].commentSum < this.searchData[j].grade/this.searchData[j].commentSum) {
			                	var maxStr = this.searchData[j];
			                	this.searchData[j] = this.searchData[i];
			                	this.searchData[i] = maxStr;
			            	}
			        	};
			    	};
				}
				if(e=="c"){
					for (var i = 0; i < this.searchData.length; i++) {
				        for (var j = i; j < this.searchData.length; j++) {
				            if (this.searchData[i].commentSum < this.searchData[j].commentSum) {
				                var maxStr = this.searchData[j];
				                this.searchData[j] = this.searchData[i];
				                this.searchData[i] = maxStr;
				            }
				        };
			    	};
				}
			}
		},
		watch:{
			value(val){
				if(val!=this.$store.state.SearchText){
					console.log("改动！")
					this.$router.go(-1)
				}
			}
		},
		components:{
			Row,Col,Icon,Search,DropdownMenu,Tag,DropdownItem,Image
		}
	}
</script>

<style lang="scss" scoped>
	.product_home_t{
		position: absolute; width: 100%; background: #FAFAFA; margin-top: 20px;
		.product_box_t{
			display: flex; width: 94%; height: 130px; margin-left: 3%; border:0px solid black; margin-bottom: 10px;
			.product_img_t{
				width: 35%;
			}
			.product_content_t{
				 width: 65%;
				 .product_content_name_t{
				 	display: flex; 
				 	margin-left: 10px; 
				 	font-size: 12px;
				 	color: black;
				 	text-align: left;
				 	overflow:hidden; 
					text-overflow:ellipsis;
					display:-webkit-box; 
					/*! autoprefixer: off*/
					-webkit-box-orient:vertical;
					/* autoprefixer: on */
					-webkit-line-clamp:2; 
				 }
				 .product_content_tag_t{
				 	display: flex; margin-left: 10px; margin-top: 10px;
				 }
				 .product_content_price_t{
				 	display: flex; margin-left: 10px; margin-top: 10px; justify-content: space-between;
				 	.product_content_price_￥_t{
				 		font-size: 12px;font-weight: bolder; color: red;
				 	}
				 	.product_content_price_sum_t{
				 		font-size: 16px;font-weight: bolder; color: red;
				 	}
				 	.product_content_price_icon_t{
				 		padding: 4px 4px; border-radius: 50px; background: #9F9F9F; font-size: 16px; margin-right: 20px;
				 	}
				 }
				 .product_content_evaluate_t{
				 	display: flex; margin-left: 10px; font-size: 10px;color: #969799;
				 }
				 .product_content_shopName_t{
				 	display: flex; margin-left: 10px; font-size: 10px; color: #969799;
				 }
				 .product_content_border_bottom_t{
				 	border-bottom: 1px solid #666666;
				 } 
			}
		}
	}

</style>
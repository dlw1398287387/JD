<template>
	<div>
		<div style="height: 34px; border: 0px solid black; background: #F7F8F9;">
			<van-row>
				<van-col span="3">
					<div style="font-size: 26px; margin-top: 4px;" @click="goSkip('User_page')">
						<van-icon name="contact" />
					</div>
				</van-col>
				<van-col span="18">
					<div>
						<van-search placeholder="请输入搜索关键词" style="padding: 0px 0px; " @click="goSkip('search')" />
					</div>
				</van-col>
				<van-col span="3">
					<div style="font-size: 26px; margin-top: 4px;" @click="goSkip('shoppingCart')">
						<van-icon name="shopping-cart-o" />
					</div>
				</van-col>
			</van-row>
		</div>
		<!--  轮播图     -->
		<div class="swipe_box" id="swipe">
			<van-swipe :autoplay="3000" indicator-color="white" :height="swipeHeight">
				<van-swipe-item><img class="swipe_box_img" src="../../assets/img/lunbotu1.png" /></van-swipe-item>
				<van-swipe-item><img class="swipe_box_img" src="../../assets/img/img1.png" /></van-swipe-item>
				<van-swipe-item><img class="swipe_box_img" src="../../assets/img/lunbotu1.png" /></van-swipe-item>
			</van-swipe>
		</div>

		<!--  国外信息检索   class="search_img_shop"  class="search_img_hotel"  class="search_img_hospital"-->
		<div class="search_three">
			<van-row>
				<div @click="goSkip('petStoreList','Pet Shop')">
					<van-col span="6"><img class="search_three_icon" src="../../assets/img/nav_shop.png" /></van-col>
				</div>
				<div @click="goSkip('petStoreList','Pet Hotel')">
					<van-col span="6"><img class="search_three_icon" src="../../assets/img/nav_hotel.png" /></van-col>
				</div>
				<div @click="goSkip('petStoreList','Pet Hospital')">
					<van-col span="6"><img class="search_three_icon" src="../../assets/img/nav_hospital.png" /></van-col>
				</div>
				<div @click="goSkip('cityHome')">
					<van-col span="6"><img class="search_three_icon" src="../../assets/img/nav_hospital.png" /></van-col>
				</div>
				<div @click="goSkip('petStoreList','Pet Shop')">
					<van-col span="6">Shop</van-col>
				</div>
				<div @click="goSkip('petStoreList','Pet Hotel')">
					<van-col span="6">Hotel</van-col>
				</div>
				<div @click="goSkip('petStoreList','Pet Hospital')">
					<van-col span="6">Hosplital</van-col>
				</div>
				<div @click="goSkip('petStoreList','Pet Hospital')">
					<van-col span="6">城市服务</van-col>
				</div>
			</van-row>
		</div>

		<!--宠物分类-->
		<!--分类狗-->
		<div class="pet_Type_dog">
			<div class="pet_dog" id="Dog" @click="">
				<span>Dog</span>
				<img src="../../assets/img/pic_dog.png" />
			</div>
			<div class="pet_Food">
				<span>Food</span>
			</div>
			<div class="pet_Treats">
				<span>Treats</span>
			</div>
			<div class="pet_Supplies">
				<span>Supplies</span>
			</div>
		</div>
		<!--分类猫-->
		<div class="pet_Type_cat" @click="">
			<div class="pet_cat">
				<span>Cat</span>
				<img src="../../assets/img/pic_cat.png" />
			</div>
			<div class="pet_cat_Food">
				<span>Food</span>
			</div>
			<div class="pet_cat_Treats">
				<span>Treats</span>
			</div>
			<div class="pet_cat_Supplies">
				<span>Supplies</span>
			</div>
		</div>

		<!-- 你可能喜欢  -->
		<div class="pet_may">
			<span class="pet_like">
					<div class="pet_1"></div>
					<span class="pet_may_desc">You may also like</span>
					<div class="pet_2"></div>
			</span>
		</div>

		<!-- 商家入驻推荐窗口  -->
		<div class="pet_merchant">
			<div class="merchant">
				<img src="../../assets/img/pic_shoplogo.png" />
				<div class="merchant_name">
					{{merchantMsg.name}}
				</div>
				<span class="merchant_address">
    			{{merchantMsg.desc}}
    		</span>
				<div class="merchant_type">
					<span class="merchant_type_text">{{ merchantMsg.type }}</span>
				</div>
				<div class="merchant_types">
					<span class="merchant_type_texts">{{ merchantMsg.types }}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	/**
	 * 挂载进Window全局中，（轮播图滑动手势变成翻页动作），
	 * @param {Object} value
	 */
	window.downState = function(value) {
		android.getH5ViewPagerInfo(value[0].x, value[0].y, value[0].width, value[0].height)
	}
	/**
	 * 挂载进Window全局中，获取安卓传递过来的API参数
	 * @param {Object} apis
	 */
	//window.findByAPIContent=function(apis){
	//		alert("2")
	//		localStorage.setItem('jsonAPI', apis)
	//}

	import { Swipe, SwipeItem, Row, Col ,} from 'vant';
	export default {
		name: 'pet_home',
		data() {
			return {
				iconState: true, //搜索框放大镜显示与消失
				search: '', //搜索框输入内容
				swipeHeight: 200, //轮播图高度
				Slide: [], //获取轮播图高度（推给Android解决滑动冲突）
				merchantMsg: {
					name: 'AUV Pet Shop',
					desc: '500m from the current location',
					type: 'Food',
					types: 'Supplies'
				}, //商家入驻信息
			}
		},

		mounted() {
			
			var that = this
			//		  this.check()
			//				alert(localStorage.getItem('jsonAPI'))
			//				alert(localStorage.getItem("JSON_API_TOKEN"))
			setTimeout(function() {
				//必须使用延时执行，否则watch监听不到
				that.getByheight()
			}, 1000)
			
			this.$Request_post(this.$request+"/findByMyCoupon").then(res=>{
				console.log(res.data)
				//在vuex中管理状态，使用session，避免页面刷新数据消失，
				sessionStorage.setItem('userCoupon',JSON.stringify(res.data));
				//commit一次，再次让vuex状态重新获取一次值对象。
				this.$store.commit('setUserCoupon',res.data)
			})
		},

		methods: {
			/**
			 * 校验本地是否存有安卓或ios传递的API参数，如果没有则判断为外部打开，并定位到错误页面
			 */
			check() {
				if(localStorage.getItem('JSON_API_TOKEN') == null) {
					this.$router.push({
						name: '400'
					})
				}
			},

			/**
			 * 获取轮播图宽高 Y,X,宽,高
			 * 传递给安卓禁用此块区域的滑动翻页动作
			 */
			getByheight() {
				var y = document.getElementById("swipe").offsetTop;
				var offWidth = window.screen.width
				//四个参数，X：距离顶部高度，Y：   heigth:高， width:宽
				var swiperArr = [{
					x: 0,
					y: y,
					height: 200,
					width: offWidth
				}]
				this.Slide = swiperArr
			},

			/**
			 * 跳转
			 * 1.需携带路由name参数
			 * 2.次级页面需要params参数则添加第二参数（次级页面不需要params也可不传）
			 */
			goSkip(routersName, paramsVal) {
				console.log("跳转到" + routersName + "页,携带" + paramsVal + "参数")
				this.$router.push({
					name: routersName,
					params: {
						name: paramsVal
					}
				})
			},

		},
		watch: {
			/**
			 * 因为高度生命周期的问题，我们必须要在获取到高度并赋值给Data变量，在传递给Android
			 * 监听Slide的值变动，不为空时调用downState推个Android
			 */
			Slide(value) {
				if(value.length != 0) {
					//console.log("调用安卓sdk")
					downState(value)
				}
			},
		},
		components: {
			Swipe,
			SwipeItem,
			Row,
			Col,
		},
	}
</script>

<style lang="scss" scoped>
	.swipe_box {
		margin-top: 4px;
		.swipe_box_img {
			width: 100%;
			height: 200px;
		}
	}
	
	.search_three {
		margin-top: 20px;
		.search_three_icon {
			width: 60px;
		}
	}
	
	.pet_Type_dog {
		display: flex;
		width: 94%;
		height: 100%;
		border: 0px solid black;
		margin-top: 6%;
		margin-left: 3.5%;
	}
	
	.pet_Type_dog .pet_dog {
		width: 32%;
		height: 10%;
		background: linear-gradient(to bottom right, #52b3ed, #50a7ed);
	}
	
	.pet_dog img {
		display: flex;
		width: 70%;
		margin-top: 21%;
		margin-left: 28%;
	}
	
	.pet_dog span {
		position: absolute;
		color: #F5F5F5;
		text-shadow: -1.4px 1.4px 5px rgba(0, 0, 0, 0.1);
		/*文本阴影效果*/
		font-weight: normal;
		margin-top: 3%;
		margin-left: -10%;
	}
	
	.pet_Type_dog .pet_Food {
		display: flex;
		margin-left: 1px;
		width: 21%;
		background: linear-gradient(to bottom right, #50abed, #4fa1ec);
		justify-content: center;
	}
	
	.pet_Food span {
		color: #F5F6FC;
		text-shadow: -1.4px 1.4px 5px rgba(0, 0, 0, 0.1);
		font-weight: normal;
		margin-top: 25%;
	}
	
	.pet_Type_dog .pet_Treats {
		display: flex;
		margin-left: 1px;
		width: 22%;
		background: linear-gradient(to bottom right, #4fa5ec, #4e9bec);
		justify-content: center;
	}
	
	.pet_Treats span {
		color: #F5F6FC;
		text-shadow: -1.4px 1.4px 5px rgba(0, 0, 0, 0.1);
		/*文本阴影效果*/
		font-weight: normal;
		margin-top: 25%;
	}
	
	.pet_Type_dog .pet_Supplies {
		display: flex;
		margin-left: 1px;
		width: 23%;
		background: linear-gradient(to bottom right, #4f9fec, #4d96ec);
		justify-content: center;
	}
	
	.pet_Supplies span {
		color: #F5F6FC;
		text-shadow: -1.4px 1.4px 5px rgba(0, 0, 0, 0.1);
		/*文本阴影效果*/
		font-weight: normal;
		margin-top: 25%;
	}
	
	.pet_Type_cat {
		display: flex;
		width: 94%;
		height: 100%;
		border: 0px solid black;
		margin-top: 0.3%;
		margin-left: 3.5%;
		margin-bottom: 20px;
	}
	
	.pet_Type_cat .pet_cat {
		width: 32%;
		height: 10%;
		background: linear-gradient(to bottom right, #5acf70, #4cca86);
	}
	
	.pet_cat img {
		display: flex;
		width: 70%;
		margin-top: 21%;
		margin-left: 28%;
	}
	
	.pet_cat span {
		position: absolute;
		color: #F5F5F5;
		text-shadow: -1.4px 1.4px 5px rgba(0, 0, 0, 0.1);
		/*文本阴影效果*/
		font-weight: normal;
		margin-top: 3%;
		margin-left: -10%;
	}
	
	.pet_Type_cat .pet_cat_Food {
		display: flex;
		margin-left: 1px;
		width: 21%;
		background: linear-gradient(to bottom right, #50cc7f, #45c890);
		justify-content: center;
	}
	
	.pet_cat_Food span {
		color: #F5F6FC;
		text-shadow: -1.4px 1.4px 5px rgba(0, 0, 0, 0.1);
		/*文本阴影效果*/
		font-weight: normal;
		margin-top: 25%;
	}
	
	.pet_Type_cat .pet_cat_Treats {
		display: flex;
		margin-left: 1px;
		width: 22%;
		background: linear-gradient(to bottom right, #49c98a, #3ec59a);
		justify-content: center;
	}
	
	.pet_cat_Treats span {
		color: #F5F6FC;
		text-shadow: -1.4px 1.4px 5px rgba(0, 0, 0, 0.1);
		/*文本阴影效果*/
		font-weight: normal;
		margin-top: 25%;
	}
	
	.pet_Type_cat .pet_cat_Supplies {
		display: flex;
		margin-left: 1px;
		width: 23%;
		background: linear-gradient(to bottom right, #43c794, #39c4a2);
		justify-content: center;
	}
	
	.pet_cat_Supplies span {
		color: #F5F6FC;
		text-shadow: -1.4px 1.4px 5px rgba(0, 0, 0, 0.1);
		/*文本阴影效果*/
		font-weight: normal;
		margin-top: 25%;
	}
	
	.pet_may {
		width: 100%;
		height: 25px;
		background: #F5F6FC;
	}
	
	.pet_like {
		display: flex;
		justify-content: center;
		color: #9F9F9F;
		font-size: 15px;
		.pet_may_desc {
			margin-top: 2px;
		}
	}
	
	.pet_may .pet_1 {
		width: 30px;
		display: flex;
		border-top: 2px solid #9F9F9F;
		margin-top: 12px;
	}
	
	.pet_may .pet_2 {
		width: 30px;
		display: flex;
		border-top: 2px solid #9F9F9F;
		margin-top: 12px;
	}
	
	.pet_merchant {
		width: 94%;
		height: 130px;
		border: 0px solid black;
		margin-left: 3.5%;
	}
	
	.merchant img {
		width: 90px;
		height: 90px;
		display: flex;
		margin-top: 7%;
	}
	
	.merchant_name {
		font-weight: bold;
		text-shadow: -1.4px 1.4px 5px rgba(0, 0, 0, 0.1);
		display: flex;
		margin-left: 30%;
		margin-top: -90px;
	}
	
	.merchant_address {
		font-size: 13px;
		color: #9f9f9f;
		display: flex;
		margin-left: 30%;
		margin-top: 8px;
	}
	
	.merchant_type {
		width: 55px;
		height: 30px;
		border: 2px solid #FFC800;
		color: #FFC800;
		border-radius: 8px;
		display: flex;
		margin-left: 30%;
		margin-top: 14px;
		justify-content: center;
		.merchant_type_text {
			margin-top: 4px;
		}
	}
	
	.merchant_types {
		width: 75px;
		height: 30px;
		border: 2px solid #FFC800;
		color: #FFC800;
		border-radius: 8px;
		display: flex;
		margin-left: 50%;
		margin-top: -35px;
		justify-content: center;
		.merchant_type_texts {
			margin-top: 4px;
		}
	}
</style>
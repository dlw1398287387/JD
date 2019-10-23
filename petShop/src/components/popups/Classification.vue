<template>
	<div>
		<van-popup style="height:450px;" v-model="show" position="bottom" :overlay="true">
			<div>
				<div style="height: 110px;">
					<img class="commodity_img" :src="PropsData.productImg[0]" />
					<van-icon name="cross" class="icons_cross" @click="outShow" />
					<span class="class_price">¥{{price}}</span>
					<span class="class_check">
		  			已选：<span style="color: black;">{{calculate}}</span>
					</span>
				</div>
				<div>
					<div class="Scroll_area">
						<div style="width: 100%;">
							<div class="commodity_type">类型</div>
							<div v-for="(item,index) in Arrtype">
								<span :class="active==item.type?'active':'Classification'" @click="oncheck1(item.type)">{{item.type}}</span>
							</div>
						</div>

						<div class="commodity_v">
							版本
						</div>
						<div style="width: 100%; display: flex;">
							<div v-for="item in Arrversions">
								<span :class="active2==item.versions?'active':'Classification'" @click="oncheck2(item.versions)">{{item.versions}}</span>
							</div>
						</div>

						<div style="width:100%; height: 41px;">
							<label style="margin-left: 10px;line-height: 31px;">数量</label>
							<van-stepper v-model="value" style=" float: right; margin-right: 20px;" />
						</div>
					</div>
				</div>
			</div>

			<div style="position: fixed; bottom: 0px;width: 49.9%;height: 50px;background: #ff9600;">
				<span style="display: flex;line-height: 50px;justify-content: center;font-weight: bold;color: #FFFFFF;" @click="AddTocart">加入购物车</span>
			</div>
			<div style="position: fixed;bottom: 0px; margin-left: 50%; width: 49.9%;height: 50px;background: #E4393C;">
				<span style="display: flex; line-height: 50px;justify-content: center;font-weight: bold;color: #FFFFFF;" @click="SubmitOrder">立即购买</span>
			</div>

		</van-popup>
	</div>
</template>

<script>
	import {CommDatails} from '@/views/shop/commodity/mock'
	import { Popup, Icon, Stepper } from 'vant';
	export default {
		name: 'Classification',
		data() {
			return {
				show: false,
				PropsData:this.comm,
				active:'',
				active2:'',
				price:'',
				value:1,
				Arrtype:[],
				Arrversions:[]
			}
		},
		created(){
			//将不重复数据收集起来,此处不使用data原型数据，是因为修改了赋值的数据后会影响原型数据
			var arrType=[]
			var arrVersions=[]
			//去除type的重复字段
			for(var i=0;i<this.comm.versionInfo.length;i++){
				arrType.push({type:this.comm.versionInfo[i].type})
				arrVersions.push({versions:this.comm.versionInfo[i].versions})
			}
			for (var i = 0; i < arrType.length; i++) {
		        for (var j = i + 1; j < arrType.length;) {
		            if (arrType[i].type == arrType[j].type) {//通过id属性进行匹配；
		                arrType.splice(j, 1);//去除重复的对象；
		            } else {
		                j++;
		            }
		        }
		    }
			this.Arrtype=arrType
			//去除versions的重复字段
			for (var i = 0; i < arrVersions.length; i++) {
		        for (var j = i + 1; j < arrVersions.length;) {
		            if (arrVersions[i].versions == arrVersions[j].versions) {//通过id属性进行匹配；
		                arrVersions.splice(j, 1);//去除重复的对象；
		            } else {
		                j++;
		            }
		        }
		    }
			this.Arrversions=arrVersions
			/**
			 * 此处将默认选中角标为0的 type 跟 versions 
			 */
			var arr=[]
			for(var i=0;i<this.comm.versionInfo.length;i++){
				if(this.comm.versionInfo[i].type==this.comm.versionInfo[0].type){
					arr.push({versions:this.comm.versionInfo[i].versions})
				}
			}
			this.Arrversions=arr;
			this.active2=this.Arrversions[0].versions
			
		},
		mounted() {
//			console.log(this.PropsData)
			this.active=this.PropsData.versionInfo[0].type
			this.active2=this.PropsData.versionInfo[0].versions
		},
		computed:{
			calculate(){
				if(this.active!=""&&this.active2!=""){
					for(var i=0;i<this.PropsData.versionInfo.length;i++){
						if(this.active==this.PropsData.versionInfo[i].type&&this.active2==this.PropsData.versionInfo[i].versions){
							this.price=this.PropsData.versionInfo[i].price*this.value
							this.comm.defalutSelect.type=this.active
							this.comm.defalutSelect.versions=this.active2
							this.comm.defalutSelect.price=this.PropsData.versionInfo[i].price
							return this.active+","+this.active2+","+this.PropsData.versionInfo[i].inventory+"库存"
						}
					}
				}
			},
		},
		methods: {
			onOpenshow() {
				this.show = true
			},
			outShow() {
				this.show = false
			},
			//选择分类
			oncheck1(name){
				this.active=name
				var arr=[]
				for(var i=0;i<this.comm.versionInfo.length;i++){
					if(this.comm.versionInfo[i].type==name){
						arr.push({versions:this.comm.versionInfo[i].versions})
					}
				}
				this.Arrversions=arr;
				this.active2=this.Arrversions[0].versions
			},
			//选择颜色 版本
			oncheck2(name){
				console.log("h1")
				this.active2=name
			},
			//进入订单页
			SubmitOrder(){
				this.PropsData.value=this.value
				//在vuex中管理状态，使用session，避免页面刷新数据消失，
				sessionStorage.setItem('productDetails',JSON.stringify(this.PropsData));
				//commit一次，再次让vuex状态重新获取一次值对象。
				this.$store.commit('setProductDetails',this.PropsData)
				this.$router.push({name:'confirmOrder'})
			},
			//添加购物车
			AddTocart(){
				console.log(this.PropsData)
				var data={
					productId:this.PropsData.productId,
					putaway_type:this.PropsData.putaway_type,
					classify:this.PropsData.classify,
					ShopName:this.PropsData.ShopName,
					productImg:this.PropsData.productImg,
					productName:this.PropsData.productName,
					description:this.PropsData.description,
					defalutSelect:this.PropsData.defalutSelect,
					original_Price:this.PropsData.original_Price,
					merchantId:this.PropsData.openId,
				}
				data.defalutSelect.count=this.value
				console.log(data)
				this.$Request_post("https://mychen.vip:8070/petshop/v1/api/AddtoCart",data).then(res=>{
					console.log(res)
					if(res.data.n==1&&res.data.ok==1){
						alert("添加成功！")
					}
				})
			}
		},
		props:{
			comm:{
				type:Object,
				default:function(){
					return{}
				}
			}
		},
		components: {
			Popup,
			Icon,
			Stepper
		}
	}
</script>

<style lang="scss" scoped>
	.active{
		float: left;
		margin-left: 10px;
		padding: 10px;
		background: #efc531;
		margin-bottom: 10px;
		border-radius: 4px;
		font-size: 14px;
	}
	
	.commodity_img {
		width: 90px;
		height: 90px;
		padding: 10px;
	}
	
	.icons_cross {
		float: right;
		font-size: 18px;
		padding: 10px;
	}
	
	.class_price {
		color: red;
		position: absolute;
		margin: 10px;
		margin-top: 20px;
	}
	
	.class_check {
		position: absolute;
		font-size: 12px;
		margin-top: 40px;
		padding: 10px;
		color: #666;
	}
	
	.Scroll_area {
		width: 100%;
		height: 290px;
		overflow: scroll;
		border: 0px solid black;
	}
	
	.commodity_type {
		width: 100%;
		height: 30px;
		margin-left: 10px;
		font-size: 12px;
		color: #666;
	}
	
	.commodity_v {
		display: flex;
		width: 100%;
		height: 30px;
		font-size: 12px;
		color: #666;
		margin-left: 10px;
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
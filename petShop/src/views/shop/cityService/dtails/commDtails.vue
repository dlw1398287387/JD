<template>
	<div>
		<van-swipe @change="onChange">
		  <van-swipe-item v-for="(item,index) in data.productImg" :key="index">
		  	<img class="swipe_imgs" :src="item" />
		  </van-swipe-item>
		
		  <div class="custom-indicator" slot="indicator">
		    {{ current + 1 }}/{{data.productImg.length}}
		  </div>
		</van-swipe>
		
		<div class="dtailsBox">
			<span class="dtailsPrice">￥{{data.price}}.00</span>
			<span class="dtailsProductName">{{data.productName}}</span>
			<span class="dtailsDesc">{{data.description}}</span>
		</div>
		
		<van-cell-group style="text-align: left;">
		  <van-cell :title="data.storeName" :label="'地址：'+data.storeCity[1]+data.storeCity[2]+data.storeAddress" >
		  	<div slot="right-icon">
		  		<van-icon name="phone"color="#FF0000" class="icon_phone"  @click="callPhone"/>
		  	</div>
		  </van-cell>
		  <van-cell title="距离您" :value="data.dist.toFixed(0)+'米'"/>
		  <van-cell :title="'营业时间:上午'+data.businessHours.form+'点~~~~下午'+data.businessHours.to"/>
		</van-cell-group>
		
	
		<baidu-map class="map" :center="infos" :zoom="17">
		    <bm-marker :position="infos" :dragging="true" @click="infoWindowOpen">
		      <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
		      	<span>地址：{{data.storeCity[1]+data.storeCity[2]+data.storeAddress}}</span><br />
		      	<span>店铺名称：{{data.storeName}}</span>
		      </bm-info-window>
		    </bm-marker>
		</baidu-map>
		
		<div style="height: 50px;"></div>
		<van-goods-action>
		  <van-goods-action-icon
		    icon="chat-o"
		    text="客服"
		    @click="onClickIcon"
		  />
		  <van-goods-action-button
		    type="danger"
		    text="立即预约"
		    @click="onClickButton"
		  />
		</van-goods-action>
		
	</div>
</template>


<script>
	import { Swipe, SwipeItem,Cell, CellGroup,Icon,Toast ,GoodsAction,GoodsActionIcon,GoodsActionButton  } from 'vant';
	export default{
		name:"commDtails",
		data(){
			return{
				data:this.$store.state.OfflineServiceDetails,
				current: 0,
				show: true,
				infos:{lng: this.$store.state.OfflineServiceDetails.storeLocation[0], lat: this.$store.state.OfflineServiceDetails.storeLocation[1]}
			}
		},
		mounted(){
			console.log(this.$store.state.OfflineServiceDetails)
		},
		methods:{
			onChange(index) {//轮播图角标
				this.current = index;
			},
			callPhone(){
				console.log(this.data.storePhone)
				window.location.href ='tel:'+this.data.storePhone
			},
			onClickIcon() {
		      Toast('点击图标');
		    },
		    onClickButton() {
		      this.$router.push({name:'confirmService'})
		    },
		 	infoWindowClose () {
		      this.show = false
		    },
		    infoWindowOpen () {
		      this.show = true
		    }
		},
		components:{
			Swipe,SwipeItem,Cell,CellGroup,Icon,Toast,GoodsAction,GoodsActionIcon,GoodsActionButton
		}
	}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 300px;
}
.baidumap{
	width: 100%;
	height: 400px;
}
	.swipe_imgs {
		width: 100%;
		height: 320px;
	}
	.custom-indicator {
		position: absolute;
		font-size: 14px;
		bottom: 10px;
		right: 10px;
		background: rgba(0, 0, 0, 0.1);
		color: #fff;
		padding: 2px 10px;
		border-radius: 8px;
	}
	.icon_phone{
		font-size: 24px;
	}
	.dtailsBox{
		width: 94%;
		margin-left: 3%;
		border: 0px solid black;
		.dtailsPrice{
			margin-top: 10px;
			display: flex;
		    font-weight: bold;
		    color: red;
		}
		.dtailsProductName{
		    margin-top: 6px;
		    font-size: 14px;
		    font-weight: bold;
		    /*margin-left: 10px;*/
		    display: -webkit-box;
		    display: -ms-flexbox;
		    display: flex;
		    text-align: left;
		}
		.dtailsDesc{
			margin-top: 6px;
		    font-size: 12px;
		    display: -webkit-box;
		    display: -ms-flexbox;
		    display: flex;
		    text-align: left;
		    margin-bottom: 10px;
		}
	}
</style>
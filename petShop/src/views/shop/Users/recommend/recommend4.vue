<template>
	<div>
		<div class="recommend_box">
			<div class="recommend_content" v-for="item in content">
				<img class="recommend_Img" :src="item.img" />
				<div class="recommend_Name">{{item.cargoName}}</div>
				<div class="recommend_Price">{{item.price}}</div>
				<van-tag class="recommend_Tag"  plain type="danger">去看看</van-tag>
			</div>
			
		</div>
	</div>
</template>

<script>
	const data=[{
			img:'http://g-search1.alicdn.com/img/bao/uploaded/i4/i1/1016227342/O1CN0162pruk246gPWe7wAV_!!0-item_pic.jpg_180x180.jpg_.webp',
			cargoName:'耐咬磨牙泰迪小狗尖叫鸡惨叫鸡大型犬狗球猫用品',
			price:'¥ 13.90',
		},
		{
			img:'http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i4/29306360/O1CN01kvhXhp1wqvTnukCTr_!!0-saturn_solar.jpg_180x180.jpg_.webp',
			cargoName:'狗狗玩具星记磨牙饼耐咬幼犬 金毛泰迪狗玩具漏食球用品',
			price:'¥ 19.00',
		},
		{
			img:'http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/704407379/O1CN01uFBM8824Nd4SFXv6w_!!0-item_pic.jpg_180x180.jpg_.webp',
			cargoName:'球泰迪法斗小狗金毛大型犬磨牙耐咬幼犬',
			price:'¥ 76.00',
		},
		{
			img:'http://g-search1.alicdn.com/img/bao/uploaded/i4/i1/2095401250/O1CN01fmMVyd1L6XZN9dmt9_!!0-item_pic.jpg',
			cargoName:'幼犬磨牙骨头棒泰迪金毛犬大型犬狗咬胶小狗用品',
			price:'¥ 18.00',
		}]
	import { Tag } from 'vant';

	export default{
		name:'recommend1',
		data(){
			return{
				content:data,
			}
		},
		components:{
			Tag
		}
	}
</script>

<style lang="scss" scoped>
	@import url("recommend.css");
</style>
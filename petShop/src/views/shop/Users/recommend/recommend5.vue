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
			img:'http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i1/106192011/O1CN015T6MOU1Qj4z8EUONM_!!0-saturn_solar.jpg_180x180.jpg_.webp',
			cargoName:'泰迪狗窝可拆洗四季通用宠物垫子 大型中型小型犬冬天保暖用品',
			price:'¥ 59.90',
		},
		{
			img:'http://g-search3.alicdn.com/img/bao/uploaded/i4/i1/4057339684/O1CN01NeeMZn2LPK0BwUTuG_!!0-item_pic.jpg_180x180.jpg_.webp',
			cargoName:'小澄饮水机智能自动饮水器猫咪喂水 宠物 用品 喝',
			price:'¥ 70.00',
		},
		{
			img:'//g-search3.alicdn.com/img/bao/uploaded/i4/i3/4057339684/O1CN01dZvO8d2LPK0AoTEHF_!!0-item_pic.jpg_180x180.jpg_.webp',
			cargoName:'FURRYTAIL尾巴 波波猫碗猫食盆猫咪饭盆不锈钢',
			price:'¥ 76.00',
		},
		{
			img:'http://g-search3.alicdn.com/img/bao/uploaded/i4/i1/TB1nuUcRVXXXXapXVXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg_.webp',
			cargoName:'狗狗沐浴露洗发水泰迪专用红棕色 洗澡 持久留香',
			price:'¥ 25.90',
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
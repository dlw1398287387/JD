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
			img:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i3/2446436799/O1CN012yvm0e205zLIVz6y6_!!2446436799.jpg_180x180.jpg_.webp',
			cargoName:'盘腰生物手术加长医用镊子镊筒套装组合不锈钢',
			price:'¥ 34.00',
		},
		{
			img:'http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/3836628861/O1CN015ZOP8F2FKO14kCe2I_!!0-item_pic.jpg_180x180.jpg_.webp',
			cargoName:'医用剪刀角膜拆线清理小号缝合 便携带敷料',
			price:'¥ 33.52',
		},
		{
			img:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i2/842564293/TB2O4iMjrplpuFjSspiXXcdfFXa_!!842564293.jpg_180x180.jpg_.webp',
			cargoName:'宠物喂药器猫咪狗狗喂药棒犬猫喂药器干湿双用型驱虫药喂药针管',
			price:'¥ 13.00',
		},
		{
			img:'https://img.alicdn.com/imgextra/i4/27395548/O1CN01NRdShW1qr1rOTreK5_!!0-saturn_solar.jpg_180x180.jpg',
			cargoName:'毛护毛素泰迪金毛萨摩 浴液洗 护理用品',
			price:'¥ 25.00',
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
<template keep-alive="true">
	<div>
		<div class="recommend_box" v-if="show">
			<div class="recommend_content" v-for="item in content" @click="goSkip('details_navigation',item)">
				<img class="recommend_Img" :src="item.productImg[0]" />
				<div class="recommend_Name">{{item.productName}}</div>
				<div class="recommend_Price">{{item.versionInfo[0].price}}￥</div>
				<van-tag class="recommend_Tag"  plain type="danger">去看看</van-tag>
			</div>
		</div>
	</div>
</template>

<script>
	import { Tag } from 'vant';
	export default{
		name:'recommend1',
		data(){
			return{
				show:false,
				content:[],
			}
		},
		created(){
			var data = {
				classify:["猫粮","狗粮"]
			}
			this.$Request_post("http://192.168.10.102:3001/petshop/v1/api/findByProduct",data).then(res=>{
				console.log(res.data)
				this.content=res.data
				this.show=true
			})
		},
		mounted(){
			console.log("1")
		},
		methods:{
			goSkip(val,item){
				//在vuex中管理状态，使用session，避免页面刷新数据消失，
				sessionStorage.setItem('productDetails',JSON.stringify(item));
				//commit一次，再次让vuex状态重新获取一次值对象。
				this.$store.commit('setProductDetails',item)
				this.$router.push({name:val})
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
<template>
	<div>
		<div class="recommend_box" v-if="show">
			<div class="recommend_content" v-for="item in content" @click="goSkip('details_navigation',item)">
				<img class="recommend_Img" :src="item.productImg[0]"/>
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
		mounted(){
			console.log("2")
			var data = {
				classify:["猫粮"]
			}
			this.$Request_post(this.$request+"/findByProduct",data).then(res=>{
				console.log(res.data)
				this.show=true
				this.content=res.data
			})
		},
		methods:{
			goSkip(val,item){
				console.log(item)
				this.$store.commit('setProductDetails',item)
//				this.$router.push({name:val,params:{productContent:this.ParamsRouter}})
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
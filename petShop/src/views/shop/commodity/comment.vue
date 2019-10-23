<template>
	<div>
		<!--<div style="width: 99%; border: 1px solid black; height: 150px; margin-bottom: 20px;">
			
		</div>-->
		<div style="width: 92%; border: 0px solid black;margin-left: 4%;" v-for="item in information">
			<div style="display: flex; width: 100%; height: 40px; border: 0px solid black; margin-bottom: 10px;">
				<img style="text-align: left; width: 36px;height: 36px; border-radius: 50px;" src="../../../assets/img/avatar2.jpg" />
				<span style="line-height: 40px; font-size: 14px; margin-left: 10px;">用户名</span>
			</div>
			<div style="display: flex; width: 92%; margin-left: 4%; margin-bottom: 10px; border: 0px solid black; justify-content: space-between;">
				<van-rate v-model="item.grade/20" color="red" size="14px" readonly="true"/>
				<span style="font-size: 14px;">{{item.createTime}}</span>
			</div>
			<div style="display: flex; width: 92%; margin-left: 4%; margin-bottom: 10px; border: 0px solid black;">
				<span style="font-size: 14px; text-align: left;">{{item.evaluateText}}</span>
			</div>
			<div style="float: left;width: 92%; margin-left: 4%; margin-bottom: 10px; border: 0px solid black;">
				<div style="display: flex;float: left;" v-for="itom in item.evaluateImg">
					<van-image style="margin-right: 6px;margin-bottom: 6px;" @click="openImage(itom,item.evaluateImg)" width="90px" height="90px" :src="itom"/>
				</div>
			</div>
			<div style="display: flex; width: 92%; margin-left: 4%; margin-bottom: 30px; border: 0px solid black;">
				<span style="font-size: 14px; text-align: left; color: #666666;">{{information[0].defalutSelect.type}}{{information[0].defalutSelect.versions}}</span>
			</div>
		</div>
		
		<van-image-preview
		  v-model="show"
		  :images="images"
		  @change="onChange"
		>
		  <template v-slot:index>第{{ index }}页</template>
		</van-image-preview>
		
	</div>
</template>

<script>
	
	import { Rate ,ImagePreview,Toast } from 'vant';
	export default{
		name:'comment',
		data(){
			return{
				content:this.$store.state.ProductDetails,
				information:[],
				show: false,
			    index: 1,
			    images: [ ]
			}
		},
		mounted(){
			Toast.loading({
			  mask: true,
			  message: '加载中...'
			});
			var data={
				productId:this.content.productId,
			}
			this.$Request_post(this.$request+"/findByEvaluation",data).then(res=>{
				Toast.clear();
				this.information=res.data
			})
		},
		methods:{
			openImage(itom,item){
				this.images=[]
				this.show = true
				this.images=item
//				for(var i=0;i<item.length;i++){
//					if(itom==item[i]){
//						this.images[0]=item[i]
//					}else{
//						this.images.push(item[i])
//					}
//				}
			},
			onChange(index) {
		       this.index = index+1;
		    }
		},
		components:{
			Rate,
			ImagePreview,
			Toast
		}
	}
</script>

<style lang="scss" scoped>
</style>
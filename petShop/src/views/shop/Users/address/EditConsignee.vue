<template>
	<div>
		<navigationTop>
			<div slot="icon_left">
				<div style="margin-top: 5px; font-size: 24px;">
					<van-icon name="arrow-left" />
				</div>
			</div>
			<div slot="content_center">
				<span style="display: flex;justify-content: center;margin-top: 8px;">编辑收货地址</span>
			</div>
			<div slot="icon_right">
				<span @click="saveConsignee" style="font-size: 16px; display: flex;margin-top: 10px;">保存</span>
			</div>
		</navigationTop>
		
		<div style="height: 15px;"></div>
		<!--修改收货地址-->
		<div>
			<van-cell-group>
			  <van-field v-model="name" label="收货人" />
			  <van-field v-model="tel" label="电话" type="number"/>
			  <van-field v-model="address" label="地址" />
			</van-cell-group>
		</div>
		<!--删除-->
		<div @click="onDeleteadderss" style="width: 90%; margin-left: 5%; height: 46px; background: #FF4444; border-radius: 4px; margin-top: 20px;">
			<span style="position: absolute; color: #FFFFFF; margin-top: 10px; margin-left:-30px;">删除地址</span>
		</div>
	</div>
</template>

<script>
	import navigationTop from '@/components/modularization/navigationTop'
	import { Field ,Toast ,Dialog  } from 'vant';
	export default{
		name:'EditConsignee',
		data(){
			return{
				id:'',
				name:'',
				tel:'',
				address:'',
				index:'',
			}
		},
		mounted(){
			console.log(this.$route.params)
			this.id=this.$route.params.ctx.id
			this.name=this.$route.params.ctx.name
			this.tel=this.$route.params.ctx.tel
			this.address=this.$route.params.ctx.address
			this.index=this.$route.params.index
		},
		methods:{
			saveConsignee(){
				try{
					var data=JSON.parse(localStorage.getItem("DirectoryInquiries"));
					var te={id:this.id,name:this.name,tel:this.tel,address:this.address}
					console.log(data)
					if(this.tel.length===11){
						data[this.index]=te
						localStorage.setItem("DirectoryInquiries",JSON.stringify(data))
						Toast('修改成功');
						this.$router.go(-1)
					}else{
						Toast('确认手机号是否正确！');
					}
				}
				catch(err){
					Toast('修改失败！');
				}
			},
			onDeleteadderss(){
				Dialog.confirm({
				  title: '删除此地址栏',
				  message: '您确定要删除此项收货地址栏吗？'
				}).then(() => {
				 	console.log("是的")
				 	console.log(this.id)
				 	console.log(JSON.parse(localStorage.getItem('DirectoryInquiries')))
				 	var addressLists=JSON.parse(localStorage.getItem('DirectoryInquiries'))
				 	for(var i=0;i<addressLists.length;i++){
				 		if(this.id==addressLists[i].id){
				 			addressLists.splice(i,1)
				 		}
				 	}
				 	localStorage.setItem("DirectoryInquiries",JSON.stringify(addressLists))
				}).catch(() => {
				    console.log("不了")
				})
			}
			
		},
		components:{
			navigationTop,
			Field,
			Toast,
			Dialog 
		}
		
	}
</script>

<style>
</style>
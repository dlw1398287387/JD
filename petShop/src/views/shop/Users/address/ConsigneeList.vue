<template>
	<div>
		<!--导航栏-->
		<navigationTop>
			<div slot="icon_left">
				<div style="margin-top: 5px; font-size: 24px;">
					<van-icon name="arrow-left" />
				</div>
			</div>
			<div slot="content_center">
				<span style="display: flex;justify-content: center;margin-top: 8px;">我的收货地址</span>
			</div>
			<div slot="icon_right">
			</div>
		</navigationTop>
		<!--地址内容-->
		<van-address-list
		  v-model="chosenAddressId"
		  :list="list"
		  add-button-text="新增地址"
		  @add="goSkip('AddConsignee')"
		  @edit="onEdit"
		  @select="onSelect"
		/>
		
		<div v-show="show1">
			<span>
				您还没有收货地址喔！
			</span><br />
			<!--<van-button type="default" @click="addmock">添加几条mock数据</van-button>-->
		</div>
		
	</div>
</template>

<script>
	
	import navigationTop from '@/components/modularization/navigationTop'
	import { AddressList,Popup,Toast,Dialog  } from 'vant';
	export default{
		name:"AddConsignee",
		data(){
			return{
				chosenAddressId: '1',
				list: [],
				show1:false, 
			}
		},
		created(){
			
		},
		/**
		 * 注意。用户第一次使用页面logs中会出现错误信息。不要担心。这个是缓存中没有数据造成的。添加收货地址就恢复正常。不影响正常使用。(数据格式问题)
		 */
		mounted(){
			console.log(JSON.parse(localStorage.getItem('DirectoryInquiries')))
//			this.list=JSON.parse(localStorage.getItem('DirectoryInquiries'))
			if(JSON.parse(localStorage.getItem('DirectoryInquiries')).length==0){
				this.show1=true
				console.log(JSON.parse(localStorage.getItem('DirectoryInquiries')))
			}else{
				this.list=JSON.parse(localStorage.getItem('DirectoryInquiries'))
				console.log(this.list)
				this.show1=false
			}
		},
		methods:{
			goSkip(routerName,routerParams){
				this.$router.push({name:routerName,params:{index:routerParams}})
			},
		    onEdit(item, index) {
		      	this.$router.push({name:'EditConsignee',params:{ctx:item,index:index}})
		    },
		    onSelect(item,index){
		    	console.log(item)
		    	console.log(index)
		    	if(item.id!="1"){
		    		Dialog.confirm({
					  title: '消息确认',
					  message: '您确定将此项，修改为默认收货地址吗？（功能修改中!）'
					}).then(() => {
					  // 将默认为收货地址的id与当前点击ID互换。并设置进本地缓存
					  var directoryInquiries=JSON.parse(localStorage.getItem("DirectoryInquiries"))
					  for(var i=0;i<directoryInquiries.length;i++){
					  	if(directoryInquiries[i].id=="1"){
					  		directoryInquiries[i].id=item.id
					  		directoryInquiries[index].id="1"
					  	}
					  }
					  console.log(directoryInquiries)
					  localStorage.setItem("DirectoryInquiries",JSON.stringify(directoryInquiries))
					}).catch(() => {
					  // 点击取消，将选择器重新赋值为1，
					  this.chosenAddressId="1"
					});
		    	}
		   },
		},
		components:{
			navigationTop,
			AddressList,
			Popup,
			Toast,
			Dialog 
		}
	}
</script>

<style lang="scss" scoped>
	.van-address-item__edit{
		/*display: none;*/
	}
	.Popup_r{
		background: #FFFFFF;
		width: 100%;
	}
</style>
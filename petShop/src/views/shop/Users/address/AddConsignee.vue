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
				<span style="display: flex;justify-content: center;margin-top: 8px;">添加收货地址</span>
			</div>
			<div slot="icon_right">
			</div>
		</navigationTop>
		<div style="height: 20px;"></div>
		<!--添加地址-->
		<van-address-edit
		  :area-list="areaList"
		  show-postal
		  show-set-default
		  save-button-text="保存"
		  @save="onSave"
		  @change-detail="onChangeDetail"
		/>
	</div>
</template>

<script>
	import {data} from '@/views/shop/Users/address/address.js' //城市选择，三级联动数据源
	import navigationTop from '@/components/modularization/navigationTop'
	import { AddressEdit } from 'vant';
	export default{
		name:"AddConsignee",
		data(){
			return{
				areaList:data,
			}
		},
		methods:{
			onSave(content) {
				try{
					console.log(content)
				    var addressData=JSON.parse(localStorage.getItem('DirectoryInquiries'))
				    console.log(addressData)
				    if(addressData==null){
				    	console.log("11")
				    	var address1 = {
						    id : "1",//由于还没有地址数据，直接插入一条1即可（地址列表默认选项）附近：就算没选择默认也会设置成默认地址。
						    name : content.name, 
						    tel : content.tel,
						    address : content.province+content.city+content.county+content.addressDetail
						}
				    	console.log(addressData)
				    	localStorage.setItem("DirectoryInquiries",JSON.stringify([address1]))
				    }else if(content.isDefault||addressData==null){
				    	console.log("是的默认为地址")
				    	//循环缓存中的数据，并修改其ID。length+1。循环中不要为了性能而加入return，循环外的不执行。
				    	for(var i=0;i<addressData.length;i++){
				    		if(addressData[i].id=="1"){
				    			console.log("有")
				    			var lgh =addressData.length+1
				    			console.log(lgh)
				    			addressData[i].id=""+lgh+""
				    		}
				    	}
				    	var address1 = {
							id : "1",//由于还没有地址数据，直接插入一条1即可（地址列表默认选项）附近：就算没选择默认也会设置成默认地址。
							name : content.name, 
							tel : content.tel,
							address : content.province+content.city+content.county+content.addressDetail
						}
				    	addressData.push(address1)//添加进集合里面
				    	console.log(addressData)
						localStorage.setItem("DirectoryInquiries",JSON.stringify(addressData))//加入缓存
				    }else{
				    	var address1 = {//由于数据格式原因。当有数据存在时，缓存中就有角标存在。使用三元表达式上给角标加1，
						    id : ""+addressData==null?1:addressData.length+1+"",
						    name : content.name, 
						    tel : content.tel,
						    address : content.province+content.city+content.county+content.addressDetail
						}
				    	addressData.push(address1)//添加进集合里面
				    	console.log(addressData)
				    	localStorage.setItem("DirectoryInquiries",JSON.stringify(addressData))//加入缓存
				    }
			    }
				catch(err){
					console.log(err)
				}
		    },
		    onChangeDetail(val) {
//		      console.log(val)
		    }
		},
		components:{
			navigationTop,
			AddressEdit
		}
	}
</script>

<style>
	
</style>
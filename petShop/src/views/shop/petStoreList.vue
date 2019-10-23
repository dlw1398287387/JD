<template>
	<div>
		<Foldedplate v-on:store_type="store_type"></Foldedplate>
		
		<div v-for="item in resultData">
			<div class="searcResult">
				<div class="searcImgfont">
					<img src="../../assets/img/list_img.png" />
					<div class="petInformationName">{{petInformationName}}</div>
				</div>
				<div class="ResultName">{{item.name}}</div>
				<div class="Resultaddress">{{item.address}}</div>
				<div class="ResultPhone">+ {{item.contact_no}}</div>
				<div class="ResultHours">{{item.business_hours}}</div>
				<div class="ResultPark"><img src="../../assets/img/list_park_icon.png"/></div>
				<div class="ResultMake"><img src="../../assets/img/list_reserve_icon.png"/></div>
				<div class="Resulttype">{{item.store_type[0]}}</div>
				<div class="Resulttype1">{{item.store_type[1]}}</div>
			</div>
		</div>
		<van-loading type="spinner" color="white" />
	</div>
</template>

<script>
	import Foldedplate from '@/components/modularization/Folded_plate'
	import { Toast ,Loading  } from 'vant';
	import crypto from 'crypto'
	export default{
		name:"petStoreList",
		data(){
			return{
				resultData:[],  //请求店铺json
				petInformationName:'', 
			}
		},
		mounted(){
		  alert("子页")
//		  console.log(this.$route.params.name)
		  this.petInformationName=this.$route.params.name
		  this.findBypetShops();
		  this.store_type()
		},
		methods:{
			findBypetShops (){
    			try{
    				Toast.loading({
						mask: false,
						message: 'loading...'
					});
		    		var apk=localStorage.getItem('JSON_API_TOKEN') //get安卓 ios 传递过来的jsonAPI串
		    		var api = JSON.parse(apk)  //转换数据格式
		    		var timz=this.$SimpleDateFormat()+this.$Gettimezone() 
					var encryptionContent=crypto.createHmac("md5",api.sessionKey)  //session_key解密
					encryptionContent.update(timz+api.apiKey+"WLINK_A0001"+"ExtPetsV1"+"find")
					var data={ //请求携带数据
						service_code:"WLINK_A0001",
						api_key:api.apiKey,
						proxy:true,
						time:timz,
						ext:"ExtPetsV1",
						command:"find",
						auth:encryptionContent.digest('hex'),
						geo_longitude:api.longitude, //"-115.27916"
						geo_latitude:api.latitude,   //"36.299571"
						max_distance:api.max_distance,
					}
					this.$Request_post('https://wsocktest.wavlink.org:8988/api/ext/pet/store/'+api.uuid,data).then(res=>{
						if(res.data.message=="Success"){
							console.log(res)
							console.log(res.data.data)
							this.resultData=res.data.data
							Toast.clear();
						}
					})
				}
    			catch(err){
    				Toast('Server Exception');
    			}
    		},
    		/**
    		 * 子组件传递条件索引值过来
    		 */
    		store_type(val){
    			if(val.length==0){
    				this.findBypetShops()
    			}else{
	    			try{ 
					    var apk=localStorage.getItem('JSON_API_TOKEN')  //get安卓 ios 传递过来的jsonAPI串
			    		var api = JSON.parse(apk)  //转换数据格式
			    		var timz=this.$SimpleDateFormat()+this.$Gettimezone()
						var encryptionContent=crypto.createHmac("md5",api.sessionKey)  //session_key解密
						encryptionContent.update(timz+api.apiKey+"WLINK_A0001"+"ExtPetsV1"+"find")
						var data={ //请求携带数据
							service_code:"WLINK_A0001",
							api_key:api.apiKey,
							proxy:true,
							time:timz,
							ext:"ExtPetsV1",
							command:"find",
							auth:encryptionContent.digest('hex'),
							geo_longitude:api.longitude, //api.longitude
							geo_latitude:api.latitude,   //api.latitude
							max_distance:api.max_distance,
							search_store:val,
						}
						this.$Request_post('https://wsocktest.wavlink.org:8988/api/ext/pet/store/'+api.uuid,data).then(res=>{
							if(res.data.message=="Success"){
								this.resultData=res.data.data
							}
						})
					}
					catch(err){
						Toast('Server Exception');
					}
    			}
    		}
    		
		},
		components:{
			Toast,
			Loading,
			Foldedplate
		}
	}
</script>

<style>

.folded_plate{
	width: 60px;
	border: 1px solid black;
	font-size: 12px;
	padding: 2px;
	justify-content: center;
	border-radius: 4px;
}

.searcResult{
	width: 100%;
	height: 100px;
	border-bottom: 1px solid #9F9F9F;
	margin-top: 10px;
	display: block;
}  

.searcImgfont {
		width: 100px;
		height: 100px;
		margin-left: 5px;
		/*border: 1px solid red;*/
	}
	.searcImgfont img{
		width: 90px;
		height: 90px;
		margin-left: 5px;
	}
	.searcImgfont .petInformationName{
		font-family: helvetica;
		font-size: 14px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #FFFFFF;
		margin-top: -60px;
		text-align: center;
	}
	
	.ResultName{
		display: flex;
		font-weight: bolder;
		margin-top: -100px;
		margin-left: 110px;
		white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.Resultaddress{
		display: flex;
		font-size: 10px;
		margin-left: 110px;
		margin-top: 6px;
		white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.ResultPhone{
		display: flex;
		font-size: 10px;
		margin-left: 110px;
		margin-top: 6px;
	}
	.ResultHours{
		display: flex;
		font-size: 10px;
		margin-left: 110px;
		margin-top: 6px;
		white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.ResultPark img{
		display: flex;
		width: 18px;
		height: 18px;
		margin-left: 110px;
		margin-top: 2px;
	}
	.ResultMake img{
		width: 18px;
		height: 18px;
		display: flex;
		margin-left: 130px;
		margin-top: -18px;
	}
	.Resulttype {
		display: flex;
		height: 17px;
		width: 40px;
		font-size: 12px;
		padding: 0px 3px;
		border: 0.5px solid #F5C825;
		color: #F5C825;
		border-radius: 3px;
		display: flex;
		margin-left: 150px;
		margin-top: -18px;
		justify-content: center;
	}  
	.Resulttype1 {
		height: 17px;
		width: 70px;
		font-size: 12px;
		padding: 0px 3px;
		border: 0.5px solid #F5C825;
		color: #F5C825;
		border-radius: 3px;
		display: flex;
		margin-left: 200px;
		margin-top: -19px;
		justify-content: center;
	} 

        
@media only screen and (max-width: 375px){
	.select1{
		margin-left: 10px;
	}
	.select2{
		margin-left: 10px;
	}
	.select3{
		margin-left: 10px;
	}
	.select4{
		margin-left:10px;
	}
	.select5{
		margin-left: 10px;
	}
}
@media only screen and (max-width: 321px){
	.select1{
		margin-left: 3px;
	}
	.select2{
		margin-left: 0px;
	}
	.select3{
		margin-left: 0px;
	}
	.select4{
		margin-left:0px;
	}
	.select5{
		margin-left: 0px;
	}
}
@media only screen and (max-width: 414px) and (min-width:414px) {
	.select1{
		margin-left: 13px;
	}
	.select2{
		margin-left: 15px;
	}
	.select3{
		margin-left: 15px;
	}
	.select4{
		margin-left:15px;
	}
	.select5{
		margin-left: 15px;
	}
}
@media only screen and (max-width: 411px) and (min-width:411px) {
	.select1{
		margin-left: 13px;
	}
	.select2{
		margin-left: 15px;
	}
	.select3{
		margin-left: 15px;
	}
	.select4{
		margin-left:15px;
	}
	.select5{
		margin-left: 15px;
	}
}
</style>
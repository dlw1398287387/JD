<template>
	<div>
		<!--头部-->
		<div class="User_shell">
			<div class="User_Nabigation">
				<van-row>
				  <van-col span="3">
				  	<div class="User_Nabigation_left_icon" @click="goback">
				  		<van-icon name="arrow-left" />
				  	</div>
				  </van-col>
				  <van-col span="18">
				  	<div class="User_Nabigation_center_icon">
				  		个人中心
				  	</div>
				  </van-col>
				  <van-col span="3">
				  	<div class="User_Nabigation_rigth_icon" @click="goSkip('setting')">
				  		<van-icon name="setting" />
				  	</div>
				  </van-col>
				</van-row>
			</div>
			
			<div>
				<table class="User_table_T">
					<tr>
						<td rowspan="2">
							<img class="User_table_img"  src="../../../assets/img/avatar2.jpg"/>
						</td>
						<td >&nbsp;&nbsp;&nbsp;</td>
						<td style="height: 20px;">
							<span class="User_Table_NickName">用户_7e6005174</span>
						</td>
					</tr>
					<tr>
						<td></td>
						<td colspan="2">
							<span class="User_Table_else">会员值843</span>
						</td>
					</tr>
				</table>
			</div>
		</div>
		
		
		<!--订单管理-->
		<div>
			<div style="float: right; margin-right: 20px; margin-bottom: 10px;" @click="goSkip('orderLists')">
				<span style="font-size: 12px; color: #7D7E80;">全部订单&nbsp;></span>
			</div>
			<div class="User_Order_Box">
				<div class="User_Types1" @click="goSkip('orderLists','1')">
					<div class="User_Types_icon">
						<van-icon name="send-gift-o" /><br />
					</div>
					<span style="font-size: 12px;">待发货</span>
				</div>
				<div class="User_Types2" @click="goSkip('orderLists','2')">
					<div class="User_Types_icon" >
						<van-icon name="logistics" /><br />
					</div>
					<span style="font-size: 12px;">待收货</span>
				</div>
				<div class="User_Types2" @click="goSkip('orderLists','3')">
					<div class="User_Types_icon">
						<van-icon name="comment-o" /><br />
					</div>
					<span style="font-size: 12px;">待评价</span>
				</div>
				<div class="User_Types2" @click="goSkip('orderLists','0')">
					<div class="User_Types_icon">
						<van-icon name="description" /><br />
					</div>
					<span style="font-size: 12px;">全部订单</span>
				</div>
			</div>
		</div>
		
		
		<div>
			<div class="User_browse_history">
				<div class="User_browse2" @click="goSkip('container','店铺关注')">
					<span class="User_browse_Num">32</span><br />
					<span class="User_browse_test">店铺关注</span>
				</div>
				<div class="User_browse2" @click="goSkip('container','喜欢')">
					<span class="User_browse_Num">12</span><br />
					<span class="User_browse_test">喜欢</span>
				</div>
				<div class="User_browse2" @click="goSkip('container','浏览记录')">
					<span class="User_browse_Num">152</span><br />
					<span class="User_browse_test">浏览记录</span>
				</div>
			</div>
		</div>
		
		<div class="recommend">
			<img class="recommend_img" src="http://m.360buyimg.com/babel/jfs/t29854/75/532933329/12534/16664248/5bf65f4cN606865eb.png" />
		</div>
		
		<div>
			<van-tabs  :swipeable="is">
			  <van-tab title="Food" >
			  	<recommend1></recommend1>
			  </van-tab>
			  <van-tab title="医疗">
			  	<recommend2></recommend2>
			  </van-tab>
			  <van-tab title="护理器械">
			  	<recommend3></recommend3>
			  </van-tab>
			  <van-tab title="玩具">
			  	<recommend4></recommend4>
			  </van-tab>
			  <van-tab title="生活用品">
			  	<recommend5></recommend5>
			  </van-tab>
			</van-tabs>
		</div>
		
	</div>
</template>

<script>
	import { Row, Col, Icon, Cell, Tab, Tabs  } from 'vant';
	import recommend1 from '@/views/shop/Users/recommend/recommend1'
	import recommend2 from '@/views/shop/Users/recommend/recommend2'
	import recommend3 from '@/views/shop/Users/recommend/recommend3'
	import recommend4 from '@/views/shop/Users/recommend/recommend4'
	import recommend5 from '@/views/shop/Users/recommend/recommend5'
	
	export default{
		name:"User_Page",
		data(){
			return{
				is:true,
			}
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			goSkip(routerName,routerParams){
				this.$router.push({name:routerName,params:{index:routerParams}})
			}
		},
		components:{
			Row, Col, Icon, Cell, Tab, Tabs,
			recommend1, recommend2, recommend3, recommend4, recommend5
		}
	}
</script>

<style lang="scss" scoped>
	.User_shell{
		 width: 100%; 
		 height: 140px; 
		 border: 0px solid black;
		 background: #4FA1EC;
		 margin-bottom: 10px;
	}
	.User_Nabigation{
		height: 35px;
		border: 0px solid black;
		.User_Nabigation_left_icon{
			font-size: 28px;
			display: flex;
			margin-top: 3px;
			margin-left: 10px;
		}	
		.User_Nabigation_center_icon{
			font-size: 16px;
			display: flex;
			margin-top: 8px;
			justify-content: center;
			font-weight: 600;
		}
		.User_Nabigation_rigth_icon{
			font-size: 24px;
			display: flex;
			margin-left: 8px;
			margin-top: 4px;
		}
	}
	.User_table_T{
		margin-left: 20px;
		.User_table_img{
			width: 70px;
			border-radius: 50px; 
			margin-top: 10px;
		}
		.User_Table_NickName{
			display: flex;
			margin-top: 14px; 
			margin-left: -10px;
		}
		.User_Table_else{
			color: rgba(0, 0, 0, 0.45); 
			display: flex;
			margin-left: -10px;
			font-size: 12px;
		}
	}
	.User_Order_Box{
		width:100%;
		height: 80px;
		border: 1px solid #F5F6FC;
		/*margin-left: 2%;*/
		border-radius: 6px;
		box-shadow: inset ;
		background: #FFFFFF;
		float: left;
		box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		margin-bottom: 15px;
		.User_Types1{
			border: 0px solid black;
			width: 23%;
			height: 81px;
			float: left; 
		}
		.User_Types2{
			border: 0px solid black;
			width: 23%;
			height: 81px;
			float: left; 
			margin-left: 2.6%;
		}
		.User_Types_icon{
			font-size: 30px; 
			margin-top: 10px;
		}
		.User_Types1:active{
			background: #E8E8E8;
		}
		.User_Types2:active{
			background: #E8E8E8;
		}
	}
	.User_browse_history{
		width:100%;
		height: 80px;
		border: 1px solid #F5F6FC;
		/*margin-left: 2%;*/
		border-radius: 4px;
		box-shadow: inset ;
		background: #FFFFFF;
		float: left;
		box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		margin-bottom: 15px;
		.User_browse1{
			border: 0px solid black;
			width: 30%;
			height: 81px;
			float: left;
			.User_browse_Num{
				display: block;
				font-weight: bold;
				margin-top: 10px;
			}
			.User_browse_test{
				font-size: 12px;
			}
		}
		.User_browse2{
			border: 0px solid black;
			width: 33.3%;
			height: 81px;
			float: left; 
			/*margin-left: 2.6%;*/
			.User_browse_Num{
				font-weight: bold;
				display: block;
				margin-top: 10px;
			}
			.User_browse_test{
				font-size: 12px;
			}
		}
		.User_browse1:active{
			background: #E8E8E8;
		}
		.User_browse2:active{
			background: #E8E8E8;
		}
	}
	.recommend{
		display: inline-block;
		width: 100%;
		height: 40px;
		border: 0px solid black;
		.recommend_img{
			height: 40px;
		}
	}
	
</style>

/**
 *  "openId": "OPENID",
    "nickName": "NICKNAME",
    "gender": GENDER,
    "city": "CITY",
    "province": "PROVINCE",
    "country": "COUNTRY",
    "avatarUrl": "AVATARURL",
    "unionId": "UNIONID",
    "watermark":
    {
    	"appid":"APPID",
		"timestamp":TIMESTAMP
    }
 */
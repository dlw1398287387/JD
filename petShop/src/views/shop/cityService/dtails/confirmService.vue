<template>
	<div>
		<div style="height: 50px;width: 100%; background:#FF4444; position: fixed; z-index: 999;">
			<van-row>
			  <van-col span="3">
			  	<van-icon style="margin: 10px;" color="#FFFFFF" size="24px" name="arrow-left" @click="goSkip"/>
			  </van-col>
			  <van-col span="20">
				  	<span class="storeName" style="border-radius: 8px;">{{data.storeName}}</span>
			  </van-col>
			</van-row>
		</div>
		<div style="height: 50px;"></div>
		<!--基础学习box-->
		<div class="serviceBox">
			<div class="serviceContent">
				<span class="serviceName">服务名称：{{data.productName}}</span>
				<span class="serviceType">服务类型：{{data.classify[2]}}</span>
				<span class="serviceTime">营业时间：上午{{data.businessHours.form}}点至晚上{{data.businessHours.to}}点</span>
				<span class="serviceTime">距离您：{{data.dist.toFixed(0)}}米</span>
				<div class="serviceRequired">
					<span class="serviceDesc">预约成功后30分钟内可免费取消</span>
					<span class="serviceDesc2" @click="openRequired">预订必读<van-icon class="serviceDesc_icon" name="arrow" /></span>
					<ReservationRequired ref="Requireds"></ReservationRequired>
				</div>
			</div>
		</div>
		<!--表单-->
		<div>
			<van-cell-group style="text-align: left;">
			  <van-cell title="单元格" value="内容" required>
			  	<div slot="default"><van-stepper v-model="amount" /></div>
			  </van-cell>
			  <van-field
			  	required
			    v-model="phone"
			    label="手机号"
			    placeholder="请输入手机号"
			  />
			  <van-cell required title="预计到店时间" value="1479854964" is-link @click="openSelectTime"/>
			  <selectTime ref="selectTimes" :officeHours="data.businessHours" v-on:changeTime="changeTime"></selectTime>
			  <van-field
			    v-model="leaveWord"
			    label="留言"
			    type="textarea"
			    placeholder="请输入留言"
			    rows="1"
			    autosize
			  />
			</van-cell-group>
		</div>
		<van-submit-bar
		  :price="(data.price*100)*amount"
		  button-text="提交订单"
		  @submit="onSubmit"
		/>
	</div>
</template>

<script>
	import moment from 'moment';
	import {Icon,Row,Col,CellGroup,Field,SubmitBar,Stepper } from 'vant';
	import ReservationRequired from '@/components/popups/ReservationRequired'
	import selectTime from '@/components/popups/SelectTime'
	export default{
		name:'comfirmOrder',
		data(){
			return{
				data:this.$store.state.OfflineServiceDetails,
				amount: 1,
				phone:'',
				leaveWord:'',
				ReservationTime:''
			}
		},
		mounted(){
			console.log(this.$store.state.OfflineServiceDetails)
		},
		methods:{
			moment,
			goSkip(){
				this.$router.go(-1);
			},
			openRequired(){
				this.$refs.Requireds.onOpenshow();
			},
			openSelectTime(){
				this.$refs.selectTimes.onOpenshow();
			},
			//选择时间的回调方法，将选择的时间回传
			changeTime(val){
				console.log(val)
				var Times = new Date();
				if(val[0]=="今日"){
					this.ReservationTime = moment(Times).format("YYYY-MM-DD")+"  "+val[1]
					console.log(moment(Times).format("YYYY-MM-DD")+"  "+val[1])
				}
				if(val[0]=="次日"){
					this.ReservationTime = moment(Times.setDate(Times.getDate()+1)).format("YYYY-MM-DD")+"  "+val[1]
					console.log(moment(Times.setDate(Times.getDate()+1)).format("YYYY-MM-DD")+"  "+val[1])
				}
				
			},
			onSubmit(){
				var data={
					productId:this.data.productId,
					merchantOpenId:this.data.merchantOpenId,
					storeAddress:this.data.storeCity[0]+this.data.storeCity[1]+this.data.storeCity[2]+this.data.storeAddress,
					storeLocation:this.data.storeLocation,
					amount:this.amount,
					phone:this.phone,
					leaveWord:this.leaveWord,
					ReservationTime:this.ReservationTime,
				}
				console.log(data)
			}
		},
		components:{
			Icon,Row,Col,CellGroup,Field ,SubmitBar,ReservationRequired,selectTime,Stepper 
		}
	}
</script>

<style lang="scss" scope>
	.storeName{
		font-size: 16px;
		color: #FFFFFF;
		line-height: 44px;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		/*! autoprefixer: off*/
		-webkit-box-orient:vertical;
		/* autoprefixer: on */
		-webkit-line-clamp:1;
	}
	.serviceBox{
		width: 100%;
		height: 180px;
		background: #FF4444;
		display: flex;
		.serviceContent{
			width: 94%;
			height: 170px;
			background: #FFFFFF;
			margin-left: 3%;
			border-radius: 6px !important;
			position: relative;
			.serviceName{
				display: flex;
				font-size: 14px;
				display: flex;
				text-align: left;
				margin: 10px;
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				/*! autoprefixer: off*/
				-webkit-box-orient:vertical;
				/* autoprefixer: on */
				-webkit-line-clamp:2;
			}
			.serviceType{
				display: flex;
				font-size: 14px;
				display: flex;
				margin: 10px;
			}
			.serviceTime{
				display: flex;
				font-size: 14px;
				display: flex;
				margin: 10px;
			}
			.serviceRequired{
				position: absolute;
				bottom:0px;
				width: 100%;
				height: 34px;
				background: #C8C9CC;
				border-bottom-left-radius: 6px;
				border-bottom-right-radius: 6px;
			}
			.serviceDesc{
				font-size: 13px;
				line-height: 34px;
				display: flex;
				margin-left: 10px;
			}
			.serviceDesc2{
				font-size: 13px;
				line-height: 34px;
				margin-top: -34px;
				float: right;
				margin-right: 16px;
				color: #1989FA;
				.serviceDesc_icon{
					position: absolute;
					margin-top: 10px;
				}
			}
		}
	}
</style>
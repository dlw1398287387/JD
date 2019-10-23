<template>
	<div>
		<navigationTop>
			<div slot="icon_left">
				<div style="margin-top: 8px; font-size: 24px;">
					<van-icon name="arrow-left" />
				</div>
			</div>
			<div slot="content_center">
				<span style="display: flex;justify-content: center;margin-top: 8px;">评价晒单</span>
			</div>
			<div slot="icon_right">
				<span style="display: flex;justify-content: center;margin-top: 8px; margin-right: 10px; color: red;" @click="subMit">
					提交
				</span>
			</div>
		</navigationTop>
		
		<div style="width: 94%; margin-left: 3%; border: 0px solid black;">
			<div style="width: 100%; height: 100px;">
				<van-row>
			  		<van-col span="8">
			  			<van-image style="margin-top: 10px;" width="80" height="80" :src="content.productImg[0]"/>
			  		</van-col>
			  		<van-col span="16">
			  			<span style="font-size: 12px; display: flex; text-align: left; margin-top: 10px;">{{content.productName}}</span>
			  			<span style="font-size: 12px; display: flex; text-align: left; margin-top: 10px;">{{content.defalutSelect.type}} - {{content.defalutSelect.versions}} x{{content.defalutSelect.count}} {{content.defalutSelect.count*content.defalutSelect.price}}元</span>
			  		</van-col>
			  	</van-row>
			</div>
		</div>
		
		<div style="width: 100%; background: #F7F7F7; height: 30px;">
			<span style="display: flex; margin-left: 3%; font-size: 14px; color: black; line-height: 30px;">分享你的使用体验吧</span>
		</div>
		
		<div style="width: 94%; margin-left: 3%; border: 0px solid black;">
			<van-rate style="line-height: 100px;" color="red" v-model="value" />
			<textarea style="width: 100%; height:120px;" placeholder="请输入您的评价信息！" v-model="evaluateText"></textarea>
			<van-uploader v-model="fileList" :max-count="3" multiple :after-read="onRead"/>
		</div>
		
	</div>
</template>

<script>
	import navigationTop from '@/components/modularization/navigationTop'
	import { Row, Col,Image,Rate,Uploader,Toast  } from 'vant';
	export default{
		name:"evaluate",
		data(){
			return{
				content:this.$route.params.content,
				value: 5,
				evaluateText:'',
				fileList: [],
			    imgs:[]
			}
		},
		mounted(){
			console.log(this.$route.params.content)
		},
		methods: {
		    // 返回布尔值
		    onRead(files) {
		      console.log(files)
//		      if (file.type !== 'image/jpeg') {
//		        Toast('请上传 jpg 格式图片');
//		        return false;
//		      }
		    },
		    subMit(){
		    	var imgs = this.fileUpload()
		    	var that=this;
		    	setTimeout(function(){
		    		var data={
			    		userOpenId:that.content.userOpenId,
			    		merchantOpenId:that.content.merchantOpenId,
			    		OrderId:that.content.OrderId,
			    		productId:that.content.productId,
			    		grade:that.value*20,
			    		defalutSelect:that.content.defalutSelect,
			    		evaluateText:that.evaluateText,
			    		evaluateImg:imgs,
			    	}
			    	console.log(data)
			    	console.log(imgs)
			    	
			    	that.$Request_post("http://192.168.10.102:3001/petshop/v1/api/AddEvaluation",data).then(res=>{
			    		if(res.data.msg="评论成功!"){
			    			Toast.success('评论成功');
			    			setTimeout(function(){
			    				that.$router.go(-1)
			    			},1500)
			    		}
			    	})
		    	},1000)
		    	
		    },
		    fileUpload(){
		    	var img=[]
		    	for(var i=0;i<this.fileList.length;i++){
		    		var formData = new FormData();
		    		formData.append('file',this.fileList[i].file)
		    		this.$Request_post("http://192.168.10.102:3000/System/v1/api/commentImg?email=15908619974@163.com",formData).then(res=>{
			      		console.log(res)
			      		Toast("图片上传成功！")
			      		img.push(res.data.fileurl)
		      		})
		    	}
		    	return img
		    }
		},
		components:{
			navigationTop,Row,Col,Image,Rate,Uploader ,Toast 
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
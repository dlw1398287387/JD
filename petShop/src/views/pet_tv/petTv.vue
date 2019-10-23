<template>
  <div>
    <div v-for="item in PetTvlist">
			<div class="thediv" @click="onClickVideo(item.source_uuid,item.title.en)">
		      <img :src="item.image_url" class="PetTV_videos" />
		      <img src="../../assets/img/icon_video.png" class="icon_video"/>
		      <span>{{item.title.en}}</span>
	    </div>
    </div>
    
  </div>
</template>

<script>

/**
 * 描述：挂载window事件，
 * 获取由安卓设备端传递过来的API参数，
 * 注：由于window方法载体中，API参数有生命周期问题，
 * 为了方便起见，直接设置本地数据缓存，
 * @param {Object} jsons 获取API
 */
window.findByPettvAPI = function(jsons){
	localStorage.setItem("pettvAPI",jsons)
}

/*描述：挂载window事件，（安卓JS交互）
 * 当用户点击视频列表时，取出data中视频url的结尾（后缀），
 * 让安卓内置支持播放器播放当前结尾的视频地址
 */
window.clickPlays = function(source_uuid,title){
	android.getClient(source_uuid,title)
}

import { Toast } from 'vant';
import crypto from 'crypto' //加密
export default {
	  data (){
	    return {
	      	PetTvlist:[], //视频data
					lodingStuts:false,  //控制加载组件显示，消失
	    }
	  },
	  
  	mounted(){
  		alert("123")
			if(localStorage.getItem("pettvAPI")==null){
				setTimeout(()=>{
					this.changeArr() 
				},1500)
			}else{
				this.changeArr()
			}
    },
    methods:{
			//点击事件：点击图片传递循环video连接地址参数
			onClickVideo(source_uuid,title){
				clickPlays(source_uuid,title)
			},
			
			/*描述：请求服务器获取视频列表
			 * 参数释义：见Git 
			 */
			//页面加载时，第一次请求，
			changeArr(){
				try{
					var api=JSON.parse(localStorage.getItem("pettvAPI"))
//					alert(api.uuid+":"+api.session_key+":"+api.api_key+":"+api.service_code)
					var timz=this.$SimpleDateFormat()+this.$Gettimezone()
					var hmac=crypto.createHmac("md5",api.session_key)  //session_key解密
					hmac.update(timz+api.api_key+api.service_code+"ExtPetsV1"+"find")
					var data={
							service_code:api.service_code,
							api_key:api.api_key,
							proxy:true,
							time:timz,
							ext:"ExtPetsV1",
							command:"find",
							auth:hmac.digest('hex'),
							media_type:"",
							pet_type:"all"
					}
					this.$Request_post('https://wsocktest.wavlink.org:8988/api/ext/pet/media/'+api.uuid,data).then(res=>{
							this.PetTvlist=res.data.data
					})
				}
				catch(err){
					Toast('Server Exception');
				}
			},
			changeStuta(){
				this.$refs.changes.changeStuta()
			}
		},
		components:{
			Toast
		},
		
}
</script>
<style scoped>
.ttal{
	width: 100%;
	height: 100%;
	background: black;
}
.thediv {
  width: 280px;
  height: 200px;
  position: relative;
  float: left;
  left: 10px;
  margin: 0 18px;
  margin-top: 30px;
  overflo:scroll;
}
/**
 * 图片宽高，以及圆角
 */
.PetTV_videos {
  width: 280px;
  height: 157px;
  border-radius: 6px;
}
/**
 * 视频标题，只显示两行，第二行超出显示...
 */
.thediv span {
  width: 280px;
  font-size: 14px;
  display: block;
  word-wrap:break-word;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
	/*! autoprefixer: off*/
	-webkit-box-orient:vertical;
	/* autoprefixer: on */
  -webkit-line-clamp:2; 
  text-align: left;
}
/**
 * 视频图片图标
 */
.icon_video{
	display:-ms-flexbox;
	display: flex;
	width: 30px;
	height: 30px;
	z-index: 999;
	position: absolute;
	margin-top: -100px;
	margin-left: 130px;
}

</style>
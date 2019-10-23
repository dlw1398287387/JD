<template>
	<div>
		<div class="btn_protocol_box">
			<p>{{$t("clause.exceptions1")}}</p>
			<p style="margin-top: 5px;"></p>
			<p><span style="font-weight: bolder;">{{$t("clause.exceptions2title")}}</span>{{$t("clause.exceptions2")}}</p>
			<p><span style="font-weight: bolder;">{{$t("clause.exceptions3title")}}</span>{{$t("clause.exceptions3")}}</p>
			<p><span style="font-weight: bolder;">{{$t("clause.exceptions4title")}}</span>{{$t("clause.exceptions4")}}</p>
			<p><span style="font-weight: bolder;">{{$t("clause.exceptions5title")}}</span>{{$t("clause.exceptions5")}}</p>
			<p><span style="font-weight: bolder;">{{$t("clause.exceptions6title")}}</span>{{$t("clause.exceptions6")}}</p>
			<p><span style="font-weight: bolder;">{{$t("clause.exceptions7title")}}</span>{{$t("clause.exceptions7")}}</p>
			<p><span style="font-weight: bolder;">{{$t("clause.exceptions8title")}}</span>{{$t("clause.exceptions8")}}</p>
			<p style="margin-top: 5px;"></p>
			<p>{{$t("clause.exceptions9")}}</p>
		</div>
		<div class="btn_protocol" @click="check"><span>{{$t("clause.agree")}}</span></div>
		<div style="height: 100px;"></div>
	</div>
</template>

<script>
	window.checkProtocol=function(msg){
		alert(msg)
	}
	
	export default{
		name:"RegisterProtocol",
		data(){
			return{
				
			}
		},
		mounted(){
			var that=this
			var userPhone = navigator.userAgent;
			if(userPhone.indexOf("Android")>-1){
				var adLanguage = window.android.sendLanguage();
				that.$i18n.locale=adLanguage
			}else{
				/**
				 * 描述一下：由于ios必须要让页面加载完成才能存本地缓存，而H5页面获取本地缓存速度太快，
				 * 所以形成了，js获取太快，ios传的慢。使它错开了正确的国际化编码，导致js获取的是上一次设置的本地数据缓存，
				 * 为了规避这个问题，只能设置一个定时任务，让它0.5秒后再获取缓存。
				 */
				setTimeout(function(){
					var iosLanguage=localStorage.getItem("Language")
					that.$i18n.locale=iosLanguage
				},500)		
			}
		},
		methods:{
			/**
			 * 用户协议页，给安卓IOS 传递字符串，表示用户同意该协议
			 */
			check(){
				var userPhone = navigator.userAgent;
				if(userPhone.indexOf("Android")>-1){
					window.android.callBackAgreement("true")
				}else{
					window.webkit.messageHandlers.agreeUserAgreement.postMessage("true")
				}
			}
		}
	}
</script>

<style scoped>
.btn_protocol_box{
	margin-top: 10px;
	width: 94%;
	/*border: 1px solid black;*/
	margin-left: 3%;
	text-align:left;
}
.btn_protocol_box p{
	font-size: 14px;
	color: #353535;
	word-break: break-word;
}

.btn_protocol{
	width: 80%;
	height: 40px;
	/*border: 1px solid black;*/
	border-radius: 15px;
	background: #F5C829;
	display: flex;
	justify-content: center;
	margin-left: 10%;
	margin-top: 20px;
}
.btn_protocol span{
	margin-top: 8px;
	color: #FFFFFF;
}
</style>
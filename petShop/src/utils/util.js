export function Request_get(url,params){
	return new Promise((resolv,reject)=>{
		this.$Axios.get(url,params)
		.then(res=>{
			resolv(res)
		})
		.catch(err=>{
			reject(err)
		})
	})
}

export function Request_post(url,data){
	return new Promise((resolv,reject)=>{
		this.$Axios.post(url,data)
		.then(res=>{
			resolv(res)
		})
		.catch(err=>{
			reject(err)
		})
	})	
}

export function Request_put(url,data){
	return new Promise((resolv,reject)=>{
		this.$Axios.put(url,data)
		.then(res=>{
			resolv(res)
		})
		.catch(err=>{
			reject(err)
		})
	})	
}




/**
 * 生成时间戳
 */
export function pad2(n) { return n < 10 ? '0' + n : n }
/**
 * 时间戳转换
 */
export function generateTimeReqestNumber() {
	var date = new Date();
	return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
}
/**
 * 生成时区
 */
export function clientTimeZone(){
     var munites = new Date().getTimezoneOffset();
     var hour = parseInt(munites / 60);
     var munite = munites % 60;
     var prefix = "-";
     if (hour < 0 || munite < 0) {
         prefix = "+";
         hour = -hour;
         if (munite < 0) {
              munite = -munite;
         }
     }
     hour = hour + "";
     munite = munite + "";
     if (hour.length == 1) {
         hour = "0" + hour;
     }
     if (munite.length == 1) {
         munite = "0" + munite;
     }
     return prefix + hour + munite;
}
/**
 * 国际化加载
 * 按照APP的国际化语言加载，由安卓或者ios传递 用户设置的国际化语言
 */
export  function getBylanguage(){
	var userPhone = navigator.userAgent;
	if(userPhone.indexOf("Android")>-1){
		return window.android.sendLanguage();
	}else{
		alert(localStorage.getItem("Language"))
		var language=localStorage.getItem("Language")
	 	return language
	}
}

/**
 * 删除角标
 */
export  function removeArrIndexOf(arr,index){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==index){
			arr.splice(i,1)
		}
	}
}





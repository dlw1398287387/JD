import Axios from 'axios'


/**
 * 懒得写登录界面了，直接模拟一个，服务的返回一个openId，保存起来，加入到请求headers中
 */

//if(localStorage.getItem("userInfo")){
	var data={
		username:"15908619974@163.com",
		Password:"chenbida123"
	}
	Axios.post("http://192.168.10.102:3001/petshop/v1/api/Userlogin",data).then(res=>{
		if(res.data=="改用户不存在!"){
			Axios.post("http://192.168.10.102:3001/petshop/v1/api//createUser",data).then(res=>{
				console.log(res)
				localStorage.setItem("userInfo",res.data.openId)
			})
		}else{
			localStorage.setItem("userInfo",res.data.openId)
		}
	})
//}



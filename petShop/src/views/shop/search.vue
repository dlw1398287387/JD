<template>
	<div>
		<div style="height: 40px; ">
			<van-row>
				<van-col span="3">
					<van-icon style="line-height: 40px;" name="arrow-left" size="24px" @click="goback"/>
				</van-col>
				<van-col span="17">
					<van-search placeholder="请输入搜索关键词" v-model="value" style="padding: 0px 0px;margin-top: 4px;"/>
				</van-col>
				<van-col span="4">
					<span style="line-height: 40px;" @click="goSkip">搜索</span>
				</van-col>
			</van-row>
		</div>

		<!--<div v-for="item in lists" class="search_return">
			<div class="search_return_font" @click="onclickContent(item.id)">
				{{item.id}}
			</div>
		</div>-->

		<div v-if="lists==0" class="recommend_box">
			<div class="recommend_content">
				<van-icon class="history_icon" name="delete" @click="recycleHistory" />
				<span>历史搜索</span>
				<div v-for="item in searchText1">
					<div class="recommend_content_condition" @click="onclickContent(item.name)">{{item.name}}</div>
				</div>
				<div v-if="searchText1.length<1">
					<span style="font-size: 12px; font-weight: 100; justify-content: center;">暂无搜索记录</span>
				</div>
			</div>
		</div>
			
		<div v-if="lists==0" class="recommend_box">
			<div class="recommend_content">
				<span>热门搜索</span>
				<div v-for="item in searchText">
					<div class="recommend_content_condition" @click="onclickContent(item.name)">{{item.name}}</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { Row, Col, Icon, Search, Dialog ,Toast } from 'vant';
	export default {
		name: "searc",
		data() {
			return {
				value: '',
				searchText: [
				    {name: '狗粮'},{name: "猫粮"},{name: '狗粮'},{name: "猫粮"},{name: '狗粮'},{name: "猫粮"},{name: '狗粮'},
					{name: "猫粮"},{name: '狗粮'},{name: "猫粮"},{name: "铲屎官"}, {name: "猫砂"}, {name: "狗罐头"},{name: '狗罐头'}, 
					{name: "猫罐头"},{name: "铲屎官"},{name: "猫砂"}],
				searchText1: JSON.parse(localStorage.getItem("SearchHistory")),
				lists: []
			}
		},
		components: {

		},
		methods: {
			goback(){
				this.$router.back(-1);
			},
			goSkip() {
				var arr=[{name:this.value}]
//				localStorage.setItem("SearchHistory",JSON.stringify(arr))
				var data=JSON.parse(localStorage.getItem("SearchHistory"))
				console.log(data.length)
				if(this.value!=""){
					if(data.length>=10){
						console.log("大于")
						data.unshift({name:this.value})
						data.pop();
					}else{
						data.unshift({name:this.value})
					}
				}


				localStorage.setItem("SearchHistory",JSON.stringify(data))
				console.log(data)
				
				Toast.loading({
				    mask: true,
				    message: '加载中...'
				});
				var data = {
					searchText:this.value
				}
				this.$Request_post(this.$request+"/searchProductList",data).then(res=>{
					console.log(res)
					Toast.clear();
					//在vuex中管理状态，使用session，避免页面刷新数据消失，
					sessionStorage.setItem('searchText',this.value);
					//commit一次，再次让vuex状态重新获取一次值对象。
					this.$store.commit('setSearchText',this.value)
					//在vuex中管理状态，使用session，避免页面刷新数据消失，
					sessionStorage.setItem('searchProductList',JSON.stringify(res.data));
					//commit一次，再次让vuex状态重新获取一次值对象。
					this.$store.commit('setSearchProductList',res.data)
					this.$router.push({name:"productList"})
				})
			},
			recycleHistory() {
				Dialog.confirm({
				  title: '提示！',
				  message: '确定要清空历史搜索记录吗？'
				}).then(() => {
				  var data=[]
				  localStorage.setItem("SearchHistory",JSON.stringify(data))
				  this.$router.go(0)
				}).catch(() => {
				  // on cancel
				});
			},
			onclickContent(msg) {
				Toast.loading({
				    mask: true,
				    message: '加载中...'
				});
				var data = {
					searchText:msg
				}
				this.$Request_post(this.$request+"/searchProductList",data).then(res=>{
					console.log(res)
					Toast.clear();
					//在vuex中管理状态，使用session，避免页面刷新数据消失，
					sessionStorage.setItem('searchText',msg);
					//commit一次，再次让vuex状态重新获取一次值对象。
					this.$store.commit('setSearchText',msg)
					//在vuex中管理状态，使用session，避免页面刷新数据消失，
					sessionStorage.setItem('searchProductList',JSON.stringify(res.data));
					//commit一次，再次让vuex状态重新获取一次值对象。
					this.$store.commit('setSearchProductList',res.data)
					
					this.$router.push({name:"productList"})
				})
			}
		},
		components: {
			Row,
			Col,
			Icon,
			Search,
			Dialog,
			Toast
		},
		watch: {
			value(value) {
//				console.log(value)
//				if(value != "") {
//					this.lists = [{id: value + "条件1"}, {id: value + "条件2"}, {id: value + "条件3"}, {id: value + "条件4"}, 
//					{id: value + "条件5"}, {id: value + "条件6"}, {id: value + "条件7"}, {id: value + "条件8"}, {id: value + "条件1"}]
//				} else {
//					this.lists = []
//				}
			}
		},
	}
</script>
<style lang="scss" scoped>
	.van-search__content{
		border-radius:8px;
	}
	.search_return {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #B6B6B6;
		margin-left: 4%;
	}
	
	.search_return_font {
		margin: 5px 0px;
		display: flex;
		margin-left: 10px;
	}
	
	.recommend_box {
		width: 94%;
		height: 100%;
		/*border: 0.5px solid lightcoral;*/
		margin-left: 3%;
		display: flex;
	}
	
	.recommend_content {
		width: 100%;
		height: 100%;
		/*border: 0.5px solid blueviolet;*/
	}
	
	.recommend_content span {
		margin: 10px;
		display: flex;
		font-weight: bolder;
	}
	
	.recommend_content_condition {
		/*border: 1px solid #9F9F9F;*/
		float: left;
		background: #F0F2F5;
		padding: 4px 10px;
		margin: 5px 5px;
		border-radius: 4px;
		text-align: left;
	}
	
	.history_icon {
		font-size: 20px;
		float: right;
		margin-right: 10px;
		margin-top: 8px;
	}
</style>
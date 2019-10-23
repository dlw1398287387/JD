<template>
	
	<div>
		<div class="logo" >
			<img src="../../assets/logo.svg" style="width: 30px; margin-left: 25px;" ></img>
			<span style="transition: color 0.3s;margin-top: 15px;margin-left: 5px; font-size:20px; color: #ffffff; font-weight: 600;" v-if="!showTitle">Ant Design System</span>
		</div>
	      <a-menu theme="dark" mode="inline" :selectedKeys="SelectedKeys" :openKeys="openKeys"  @openChange="onOpenChange" >
		    <template v-for="(item,index) in lists">
				<a-sub-menu :key="item.meta.menuKey">
			      <span slot="title"><a-icon :type="item.meta.icon" /><span>{{item.meta.title}}</span></span>
			      <template v-for="(itemz,indes) in item.children">
				      <a-menu-item :key="itemz.meta.menuSelectKey" @click="initMenu(itemz.meta.menuSelectKey,itemz.name)">{{itemz.meta.title}}</a-menu-item>
			      </template>
			    </a-sub-menu>
		    </template>
	      </a-menu>
	</div>
	
</template>

<script>
	export default{
		name:"GlobalMenu",
		data(){
			return{
				rootSubmenuKeys: ['sub1', 'sub2','sub3','sub4','sub5'],
      			openKeys: [this.$route.matched[1].meta.menuKey],
      			SelectedKeys:[this.$route.meta.menuSelectKey],
				lists:this.$router.options.routes[0].children,
			}
		},

		mounted(){
			
		},
		
		props:{
			showTitle: {
		        type: Boolean,
		        default: true
      		}
		},
		methods: {
			/**
		  	 * 展开二级Menu目录是关闭其他目录
		  	 */
		    onOpenChange (openKeys) {
		      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
		      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
		        this.openKeys = openKeys
		      } else {
		        this.openKeys = latestOpenKey ? [latestOpenKey] : []
		      }
		    },
		    // 选择导航栏子页时，赋值子页的key避免刷新页面时进入初始化状态。并跳转相应的路由页
		    initMenu(val,name){
		    	this.SelectedKeys=[val]
		    	this.$router.push({name:name})
		    }
		    
  		},
  		watch: {
		    '$route' (to, from) {//关于浏览器自带back回退时，导航栏状态不变的解决方式，监听路由，当路由发生改变时重新赋值给选择器
		      this.openKeys=[to.matched[1].meta.menuKey],
		      this.SelectedKeys=[to.meta.menuSelectKey]
		    }
  		}	
  		
	}
</script>

<style>

</style>
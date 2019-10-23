<template>
  <div style="position: absolute;">
    <a-layout-sider :trigger="null"  width="256px" >
    <a-drawer
      placement="left"
      :closable="false"
      @close="onClose"
      :visible="ipadVisible"
      width="256px"
    >
   
    <div style="width: 256px; height: 64px; background:#002140 ;display: flex;">
			<img src="../../assets/logo.svg" style="width: 30px; margin-left: 25px; margin-top: 0px;" ></img>
			<span style="margin-top: 15px; margin-left: 5px; font-size:20px; color: #ffffff; font-weight: 600;">Ant Design System</span>
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
    </a-drawer>
    </a-layout-sider>
    <!--<div class="test-f">字体</div>-->
  </div>
</template>
<script>
 import GlobalMenu from '@/components/pages/GlobalMenu'
export default {
  data() {
    return {
      ipadVisible: false, //由于props传递过来的值，不可被改变，否则会抛出异常,所以我们赋值给一个变量
      rootSubmenuKeys: ['sub1', 'sub2','sub3','sub4','sub5'],
      openKeys: [this.$route.matched[1].meta.menuKey],
      SelectedKeys:[this.$route.meta.menuSelectKey],
			lists:this.$router.options.routes[0].children,
    }
  },
  mounted(){
  	this.ipadVisible=this.visible
  },
  methods: {
    showDrawer() {
      this.ipadVisible = true
    },
    onClose() {
      this.ipadVisible = false
    },
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
		initMenu(val,name){
		    	this.SelectedKeys=[val]
		    	this.$router.push({name:name})
		},
  },
  watch: {
    '$route' (to, from) {//关于浏览器自带back回退时，导航栏状态不变的解决方式，监听路由，当路由发生改变时重新赋值给选择器
		      this.openKeys=[to.matched[1].meta.menuKey],
		      this.SelectedKeys=[to.meta.menuSelectKey]
		 }
  },
  components:{
  	GlobalMenu
  },
  props:{
  	visible:{
  		type:Boolean,
  		default:false,
  	},
  }
}
</script>
<style>
	/*.ant-drawer-body{
		padding: 0px;
	}*/
	.ant-drawer-wrapper-body{
		background: #001529;
	}
	.ant-drawer-header{
		height: 64px;
		background: #002140;
		border: 0px ;
		border-radius: 0px;
	}

</style>

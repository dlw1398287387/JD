<template>
  <a-layout id="components-layout-demo-custom-trigger">
  	<!-- PC Menu -->
  	
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" width="256px" class="AdaptiveMenuPC">
    	<!--<div style="height: 10px;"></div>-->
      <global-Menu :showTitle="collapsed"></global-Menu>
    </a-layout-sider>
    <!-- iPad Menu -->
    <div  class="AdaptiveMenuPhone">
    	<iPad-Menu ref="Ipad" :visible="visible"></iPad-Menu>
    </div>
    
    <a-layout>
    	<!-- 头部  -->
    	<a-row>
	      <a-layout-header style="background: #fff; padding: 0">
	      		<a-col :xl="19" :md="14" :xs="6">
	      			<div class="AdaptiveMenuPCIcon" @click="toggle">
	      				<a-icon  class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"  @click="()=> collapsed = !collapsed"  />
	      			</div>
	      			
	      			<div class="AdaptiveMenuPhoneIcon">
	      				<a-icon  class="trigger" type="menu-unfold"  @click="showDrawer"/>
	      			</div>
	        	</a-col>
	        	
	        	<!--个人中心 等等style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"-->
	        	<a-col :xl="5" :md="10" :xs="18" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
	        		<div>
		        		<User-Menu></User-Menu>
	        		</div>
	        	</a-col>
	        
	      </a-layout-header>
      </a-row>
      <!-- 面包屑 描述  -->
      
<!--     	<GlobalPageHeader></GlobalPageHeader>-->
      	
      <!-- 中间内容 -->   <!--margin: '14px 6px', padding: '14px',background: '#fff',  minHeight: '280px'-->
      <a-layout-content :style="{ margin: '1px 0px', padding: '0px',  minHeight: '280px' }">
        <!--<router-view></router-view>-->
        <slot></slot>
      </a-layout-content>
      
      <!-- 底部版权 -->
      <a-layout-Footer>
      	<global-Footer></global-Footer>
      </a-layout-Footer>
    </a-layout>
  </a-layout>
</template>
<script>
	import globalMenu from '@/components/pages/GlobalMenu'
	import globalFooter from '@/components/pages/GlobalFooter'
	import iPadMenu from '@/components/pages/iPadMenu'
	import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
	import UserMenu from '@/components/tools/UserMenu'
	import { triggerWindowResizeEvent } from '@/utils/util'
	
export default {
  data(){
    return {
      collapsed: false,
      screenstate:false,
      visible:false
    }
  },
  mounted(){
		
  },
  methods:{
  	toggle(){
  		triggerWindowResizeEvent()
  	},
  	/**
  	 * 调用非PC端 Menu导航栏的子级方法，
  	 */
  	showDrawer(){
  		this.$refs.Ipad.showDrawer()
  	}
  },
  components:{
  	globalMenu,
  	globalFooter,
  	iPadMenu,
  	GlobalPageHeader,
  	UserMenu,
  }
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
	height: 63px;
	width: 256px;
  background: #002140;
  display:inline-flex; 
  margin-top: 0px;
  overflow: hidden;
}


@media only screen and (max-width:1024px ) {
	.AdaptiveMenuPC{
		display: none;
	}
	.AdaptiveMenuPCIcon{
		display: none;
	}
	.fonts{
		color: red;
	}
}
@media only screen and (min-width: 1025px) {
	.AdaptiveMenuPhone{
		display: none;
	}
	.AdaptiveMenuPhoneIcon{
		display: none
	}
	.ant-drawer{
		display: none
	}
	.fonts{
		color: deeppink;
	}
	
}


</style>

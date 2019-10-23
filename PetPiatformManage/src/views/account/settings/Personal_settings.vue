<template>
  <div style="height: 100vh;">
  	
	  	<div class="settings_PC">
		  	<a-card style="margin: 20px;">
			    <a-tabs defaultActiveKey="1" tabPosition="left">
			      <a-tab-pane tab="基本设置" key="1"><index1></index1></a-tab-pane>
			      <a-tab-pane tab="安全设置" key="2"><index2></index2></a-tab-pane>
			      <a-tab-pane tab="账户绑定" key="3"><index3></index3></a-tab-pane>
			      <a-tab-pane tab="新消息通知" key="4"><index4></index4></a-tab-pane>
			    </a-tabs>
		    </a-card>
	    </div>
	    
	    <div class="settings_mobile">
		  	<a-card style="margin: 20px;">
			    <a-tabs defaultActiveKey="1" @change="callback">
				  	<a-tab-pane tab="基本设置" key="1"><index1></index1></a-tab-pane>
			      <a-tab-pane tab="安全设置" key="2"><index2></index2></a-tab-pane>
			      <a-tab-pane tab="账户绑定" key="3"><index3></index3></a-tab-pane>
			      <a-tab-pane tab="新消息通知" key="4"><index4></index4></a-tab-pane>
					</a-tabs>
		    </a-card>
	    </div>
  </div>
</template>




<script>
	import index1 from '@/views/account/settings/page/index1'
	import index2 from '@/views/account/settings/page/index2'
	import index3 from '@/views/account/settings/page/index3'
	import index4 from '@/views/account/settings/page/index4'
	export default{
		name:'Personal_settings',
		data(){
			return{
				
			}
		},
		mounted(){
			
		},
		methods: {
		    callback (val) {
		      console.log(val)
		    },
		},
		components:{
  			index1,
  			index2,
  			index3,
  			index4
  		}
	}
</script>

<style>
	@media only screen and (max-width:1025px ) {
		.settings_PC{
			display: none;
		}
	}
	@media only screen and (min-width:1025px ) {
		.settings_mobile{
			display: none;
		}
	}
</style>
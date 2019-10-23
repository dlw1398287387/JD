<template>
	<div style="margin: 20px;">
		<a-row :gutter="24">
			<a-col :xl="8" style="margin-bottom: 20px;">
				<a-card>
					<div align="center" style="margin-bottom: 20px;">
						<img src="../../../../static/avatar2.jpg" style="width: 100px; border-radius: 50px; margin-bottom: 10px;"/>
						<h2 style="margin-bottom: 0px;">天野远子</h2>
						<span>海纳百川，有容乃大</span>
					</div>
					<div style="margin-bottom: 8px;">
						<a-icon type="idcard"/>   
						<span style="margin-left: 10px;">交互专家</span>
					</div>
					<div style="margin-bottom: 8px;">
						<a-icon type="taobao"/>   
						<span style="margin-left: 10px;">蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</span>
					</div>
					<div style="margin-bottom: 8px;">
						<a-icon type="caret-down" theme="filled" />
						<span style="margin-left: 10px;">浙江省杭州市</span>
					</div>
					<a-divider />
					<span>标签</span>	
					<div style="margin-top: 10px;">
						<a-tag closable @close="log" style="margin-bottom: 5px;">小火鸡</a-tag>
						<a-tag closable @close="log" style="margin-bottom: 5px;">很有想法</a-tag>
						<a-tag closable @close="log" style="margin-bottom: 5px;">专注开发</a-tag>
						<a-tag closable @close="log" style="margin-bottom: 5px;">百纳海川</a-tag>
						<a-tag closable @close="log" style="margin-bottom: 5px;">Tag 2</a-tag>
  						<a-tag closable @close="preventDefault" style="margin-bottom: 5px;">Prevent Default</a-tag>
					</div>
					<a-divider />
					<span>团队</span>
					<div style="margin-top: 10px;">
						111
					</div>
					<a-divider />
				</a-card>
			</a-col>
			<a-col :xl="16">
				<a-card>
					<a-tabs defaultActiveKey="1" @change="callback">
					    <a-tab-pane tab="index 1" key="1">
					    	<index-1></index-1>
					    </a-tab-pane>
					    <a-tab-pane tab="index 2" key="2" forceRender>
					    	<index-2></index-2>
					    </a-tab-pane>
					    <a-tab-pane tab="index 3" key="3">
					    	<index-3></index-3>
					    </a-tab-pane>
					</a-tabs>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	import index1 from '@/views/account/center/page/index1'
	import index2 from '@/views/account/center/page/index2'
	import index3 from '@/views/account/center/page/index3'
	export default{
		name:'index',
		data(){
			return{
				
			}
		},
		methods:{
			log (e) {
		      console.log(e)
		    },
		    preventDefault (e) {
		      e.preventDefault()
		      console.log('Clicked! But prevent default.')
		    },
		    callback (key) {
		      console.log(key)
		    },
		    
		},
		components:{
			index1,
			index2,
			index3
		}
	}
</script>

<style>
</style>
<template>
	<div>
		<Global-PageHeader :headline="headline" :describe="describe"></Global-PageHeader>
		<a-row>
		   <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
				<div style="background: #fff; margin: 10px;" v-if='showChart'>
					
					<bar></bar>
				</div>
           </a-col> 
           <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
				<div style="background: #fff; margin: 10px;" v-if='showChart'>
					<bar></bar>
				</div>
           </a-col>
           <a-col :xl="12">
           		<div style="background: #fff; margin: 10px;" v-if='showChart'>
           			<pie></pie>
           		</div>
           </a-col>
           <a-col :xl="12">
           		<div style="background: #fff; margin: 10px;" v-if='showChart'>
           			<vline></vline>
           		</div>
           </a-col>
		</a-row>
	</div>
</template>

<script>
  import bar from '@/components/chart/bar'
  import pie from '@/components/chart/pie'
  import vline from '@/components/chart/line'
  import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
  export default{
  	name:'Monitor',
  	data(){
  		return{
  			showChart:false,
  			headline:'监听器',
  			describe:'监听项目图表页'
  		}
  	},
  	mounted(){
  		this.$nextTick(()=>{this.showChart=true})
  	},
  	components:{
  		bar,
  		pie,
  		vline,
  		GlobalPageHeader
  	}
  }
</script>
<style>
	
</style>
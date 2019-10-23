<template>
  	<div>
  		<Global-PageHeader  :headline="welcome" :describe="describe"></Global-PageHeader>
  		<a-row type="flex" justify="start" >
  			<a-col :xl="6" :xs="24" :lg="12" :md="12">
	         	<a-card title="Card Title" style="margin: 10px 10px; ">
				    <a slot="extra">全部项目</a>
				    <span>1</span><br />
				    <span>1</span><br />
				    <span>1</span>
				    <a-card-meta title="描述">
				    	<template slot="description">详细信息</template>
				  	</a-card-meta>
				</a-card>
			</a-col>
			<a-col :xl="6" :xs="24" :lg="12" :md="12">
	         	<a-card title="Card Title" style="margin: 10px 10px;">
				    <a slot="extra">全部项目</a>
				    <p>card content</p>
				    <p>card content</p>
				    <p>card content</p>
				</a-card>
			</a-col>
			<a-col :xl="6" :xs="24" :lg="12" :md="12">
	         	<a-card title="Card Title" style="margin: 10px 10px;">
				    <a slot="extra">全部项目</a>
				    <p>card content</p>
				    <p>card content</p>
				    <p>card content</p> 
				</a-card>
			</a-col>
			<a-col :xl="6" :xs="24" :lg="12" :md="12">
	         	<a-card title="Card Title" style="margin: 10px 10px;">
				    <a slot="extra">全部项目</a>
				    <p>card content</p>
				    <p>card content</p>
				    <p>card content</p> 
				</a-card>
			</a-col>
			<a-col :xl="6" :xs="24" :lg="12" :md="12">
	         	<a-card title="Card Title" style="margin: 10px 10px;">
				    <a slot="extra">全部项目</a>
				    <p>card content</p>
				    <p>card content</p>
				    <p>card content</p> 
				</a-card>
			</a-col>
			<a-col :xl="6" :xs="24" :lg="12" :md="12">
	         	<a-card title="Card Title" style="margin: 10px 10px;">
				    <a slot="extra">全部项目</a>
				    <p>card content</p>
				    <p>card content</p>
				    <p>card content</p> 
				</a-card>
			</a-col>
			<a-col :xl="6" :xs="24" :lg="12" :md="12">
	         	<a-card title="Card Title" style="margin: 10px 10px;">
				    <a slot="extra">全部项目</a>
				    <p>card content</p>
				    <p>card content</p>
				    <p>card content</p> 
				</a-card>
			</a-col>
			<a-col :xl="6" :xs="24" :lg="12" :md="12">
	         	<a-card title="Card Title" style="margin: 10px 10px;">
				    <a slot="extra">全部项目</a>
				    <p>card content</p>
				    <p>card content</p>
				    <p>card content</p> 
				</a-card>
			</a-col>
			<a-col :xl="6" :xs="24" :lg="12" :md="12">
	         	<a-card title="Card Title" style="margin: 10px 10px;">
				    <a slot="extra">全部项目</a>
				    <p>card content</p>
				    <p>card content</p>
				    <p>card content</p> 
				</a-card>
			</a-col>
        </a-row>
  	</div>
</template>
<script>
	
import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
import {timeFix,welcome} from '@/utils/util'
export default {
  data(){
    return {
    	welcome:timeFix()+","+this.$Vue.ls.get("userDatas").nickName+","+welcome(),
        describe:"前端工程师 | 欣博跃管理平台  - For - VUE平台",
    }
  },
  mounted(){
//	console.log(this.$router)
  },
  methods:{
  	
  },
  components:{
  	GlobalPageHeader
  }
}
</script>
<style>


</style>

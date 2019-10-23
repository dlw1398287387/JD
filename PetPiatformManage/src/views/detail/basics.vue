<template>
	<div>
		<Global-PageHeader :headline="headline" ></Global-PageHeader>
		<div>
			<a-card  style='margin: 20px;'>
				<h3 style="margin-bottom: 15px;">管理员列表</h3>
				<a-table :columns="columns" :dataSource="data" :bordered="stats" :pagination="{ pageSize: 5 }">
					
				    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
				    
				    <span slot="tags" slot-scope="tags">
				      <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
				    </span>
				    <span slot="action" slot-scope="text, record">
				      <a href="javascript:;">Invite 一 {{record.name}}</a>
				      <a-divider type="vertical"/>
				      <a href="javascript:;">Delete</a>
				      <a-divider type="vertical" />
				      <a href="javascript:;" class="ant-dropdown-link">
				        More actions <a-icon type="down"/>
				      </a>
				    </span>
				</a-table>
			</a-card>
		</div>
	</div>
</template>

<script>
	import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
	export default{
		name:"basics",
		data(){
			return{
				headline:"基础详情页",
				data,
      			columns,
      			stats:false
			}
		},
		methods:{
			
		},
		components:{
			GlobalPageHeader
		}
	}
	//table表列设置
	const columns = [{
	  align:'center',
	  title:'名称',
	  dataIndex: 'name',
	  key: 'name',
	  scopedSlots: { customRender: 'name' },
	}, {
	  align:'center',
	  title: '年龄',
	  dataIndex: 'age',
	  key: 'age',
	}, {
	  align:'center',
	  title: '地址',
	  dataIndex: 'address',
	  key: 'address',
	}, {
	  align:'center',
	  title: '人物标签',
	  key: 'tags',
	  dataIndex: 'tags',
	  scopedSlots: { customRender: 'tags' },
	}, {
	  align:'center',
	  title: '行动',
	  key: 'action',
	  scopedSlots: { customRender: 'action' },
	}];
	//数据源
	const data = [{
	  key: '1',
	  name: 'Jack',
	  age: 32,
	  address: '不知名地标1',
	  tags: ['标签1', '标签2'],
	}, {
	  key: '2',
	  name: 'Tom',
	  age: 42,
	  address: '不知名地标2',
	  tags: ['标签1'],
	}, {
	  key: '3',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '4',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '5',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '6',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '7',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},{
	  key: '8',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '9',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '10',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '11',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '12',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '13',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	},
	{
	  key: '14',
	  name: 'John',
	  age: 32,
	  address: '不知名地标3',
	  tags: ['标签1', '标签2'],
	}];
</script>

<style>
</style>
<template>
	<div>
		<GlobalPageHeader :headline="headline" :describe="describe"></GlobalPageHeader>
		<div style="height: 80vh;">
			<a-card style="margin: 20px; display: flex;">
				<a-skeleton active :loading="loading">
					<a-table :columns="columns" :dataSource="data" bordered style="width: 100%;">
						<span slot="productIdStatus" slot-scope="productIdStatus">
					      <span v-if="productIdStatus==0">审核中</span>
					   	</span>
						<span slot="tags" slot-scope="tags">
					      <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
					   	</span>
						<template slot="operation" slot-scope="text, record, index">
							<div class='editable-row-operations'>
								<span>
						          <a @click="">查看详情</a>
						        </span>
						        <span>
						          <a @click="">删除</a>
						        </span>
							</div>
						</template>
						<img slot="expandIcon" src="../../../AntManage/LOGOicon.png" />
						<p slot="expandedRowRender" slot-scope="record" style="margin: 0">描述：{{record.description}}</p>
					</a-table>
				</a-skeleton>
			</a-card>
		</div>
	</div>
</template>

<script>
	import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
	const columns = [
	  { title: '编号',   dataIndex: 'productId',},
	  { title: '状态',   dataIndex: 'productStatus',},
	  { title: '名称',   dataIndex: 'productName',width: '18%'},
	  { title: '类型',   dataIndex: 'classify',scopedSlots: { customRender: 'tags' }, width: '15%',},
	  { title: '城市',   dataIndex: 'storeCity',},
	  { title: '地址',   dataIndex: 'storeAddress',},
	  { title: 'Phone',   dataIndex: 'storePhone',},
	  { title: '价格',   dataIndex: 'price',},
	  { title: '操作',  dataIndex: 'operation',scopedSlots: {customRender: 'operation'},}
	];
	export default{
		name:"serviceList",
		data(){
			return{
				headline: "产品列表",
				describe: "此页用于查看产品状态，以及修改删除",
				loading:true,
				data:[],
      			columns,
			}
		},
		mounted(){
			this.$Request_post('https://mychen.vip:8090/System/v1/api/findByOfflineList').then(res=>{
				console.log(res)
				for(var i=0;i<res.data.length;i++){
					if(res.data[i].productStatus=="1"){
						res.data[i].productStatus="销售中"
					}
					if(res.data[i].productStatus=="2"){
						res.data[i].productStatus="资料未齐"
					}
					if(res.data[i].productStatus=="0"){
						res.data[i].productStatus="审核中"
					}
				}
				this.loading=false
				this.data=res.data
			})
		},
		components:{GlobalPageHeader}
		
	}
</script>

<style lang="scss" scoped>
</style>
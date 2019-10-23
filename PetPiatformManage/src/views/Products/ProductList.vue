<template>
	<div>
		<GlobalPageHeader :headline="headline" :describe="describe"></GlobalPageHeader>
		<div style="height: 80vh;">
			<a-card style="margin: 20px; display: flex;">
				<a-skeleton active :loading="loading">
					<a-table :columns="columns" :dataSource="data" bordered>
						<span slot="tags" slot-scope="tags">
					      <a-tag color="blue" :key="tag">{{tags}}</a-tag>
					   </span>
						<template slot="operation" slot-scope="text, record, index">
							<div class='editable-row-operations'>
								<span>
						          <a @click="() => Edit(record.productId)">查看详情</a>
						        </span>
						        <span>
						          <a @click="() => Delete(record.productId)">删除</a>
						        </span>
							</div>
						</template>
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
	  { title: '产品编号',   dataIndex: 'productId'},
	  { title: '状态',      dataIndex: 'productStatus',width: '7%',},
	  { title: '名称',      dataIndex: 'productName',width: '18%',},
	  { title: '产品类型',   dataIndex: 'classify',width: '8%',scopedSlots: { customRender: 'tags' }},
	  { title: '销售类型',   dataIndex: 'putaway_type',width: '8%',},
	  { title: '价格',      dataIndex: 'versionInfo[0].price',width: '5%',},
	  { title: '原价',      dataIndex: 'original_Price',width: '5%',},
	  { title: '库存',      dataIndex: 'versionInfo[0].inventory',width: '5%',},
	  { title: '销售至',     dataIndex: 'buildTime.to',width: '9%',},
	  { title: '默认选中类型', dataIndex: 'versionInfo[0].type',width: '7%',},
	  { title: '默认选中版本', dataIndex: 'versionInfo[0].versions',width: '7%',},
	  { title: '操作',      dataIndex: 'operation',scopedSlots: {customRender: 'operation'},width: '8%',}
	];
	
	export default{
		name:'ProductList',
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
			this.$Request_post("http://192.168.10.102:3000/System/v1/api/findByProductList").then(res=>{
				console.log(res.data)
				for(var i=0;i<res.data.length;i++){
					res.data[i].classify=res.data[i].classify+''
					if(res.data[i].productStatus=="1"){
						res.data[i].productStatus="销售中"
					}
					if(res.data[i].productStatus=="2"){
						res.data[i].productStatus="资料未齐"
					}
					if(res.data[i].productStatus=="3"){
						res.data[i].productStatus="审核中"
					}
				}
				this.data=res.data
				this.loading=false
			})
			
		},
		methods:{
			Edit(id) {
				this.$router.push({name:'UpdateProduct',params:{id:id}})
			},
			Delete(id){
				console.log(id)
				var that = this;
				this.$confirm({
			        title: 'Are you sure delete this task?',
			        content: 'Some descriptions',
			        okText: '确定',
			        okType: 'danger',
			        cancelText: '取消',
			        onOk() {
			        	var data={
			        		productId:id
			        	}
			        	that.$Request_post("https://mychen.vip:8090/System/v1/api/DeleteByProduct",data).then(res=>{
			        		console.log(res)
			        		that.$router.go(0)
			        	})
			        },
			        onCancel() {
			          console.log('Cancel');
			        },
			    });
			}
			
		},
		components:{GlobalPageHeader}
	}
</script>

<style>
</style>
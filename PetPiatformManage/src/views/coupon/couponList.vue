<template>
	<div>
		<GlobalPageHeader :headline="headline" :describe="describe"></GlobalPageHeader>
		<div style="height: 80vh;">
			<a-card style="margin: 20px;">
				<a-skeleton active :loading="loading">
					<a-table :columns="columns" :dataSource="data" bordered>
						<template slot="operation" slot-scope="text, record, index">
							<div class='editable-row-operations'>
								<span>
						          <a @click="() => Delete(record.couponId)">删除</a>
						        </span>
							</div>
						</template>
					</a-table>
				</a-skeleton>
			</a-card>
		</div>
	</div>
</template>

<script>
	import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
	import moment from 'moment';
	const columns = [{
			title: '优惠卷编号',
			dataIndex: 'couponId',
			width: '15%',
		},
		{
			title: '优惠卷',
			dataIndex: 'couponTags',
			width: '7%',
		},
		{
			title: '限制品类',
			dataIndex: 'classify',
			width: '14%',
		},
		{
			title: '开始日期',
			dataIndex: 'startingTime',
			width: '14%',
		},
		{
			title: '结束日期',
			dataIndex: 'endTime',
			width: '14%',
		},
		{
			title: '满？金额',
			dataIndex: 'priceFull',
			width: '8%',
		},
		{
			title: '减？金额',
			dataIndex: 'priceSubtract',
			width: '8%',
		},
		{
			title: '描述',
			dataIndex: 'couponDesc',
			width: '15%',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			scopedSlots: {
				customRender: 'operation'
			},
			width: '5%',
		}
	];

	export default {
		name: "couponList",
		data() {
			return {
				headline: "优惠卷列表",
				describe: "查看优惠卷列表",
				loading: true,
				data: [],
				columns,
			}
		},
		mounted() {
			console.log(moment("2019-07-25T03:12:49.000Z").format("YYYY-MM-DD HH:mm:ss"))
			this.$Request_post("https://mychen.vip:8090/System/v1/api/findByCouponList").then(res => {
				console.log(res)
				for(var i = 0; i < res.data.length; i++) {
					res.data[i].endTime = moment(res.data[i].endTime).format("YYYY-MM-DD HH:mm:ss")
					//因为我们的时间格式在后台处理过一遍。查询出来不是东八区有一些无用的字符，所以转换一遍
				}
				this.data = res.data
				this.loading = false
			})
		},
		methods: {
			Delete(id) {
				this.$confirm({
					title: '你确定要删除此项优惠卷?',
					content: '删除此优惠卷并不能终止优惠卷的使用，如：已领取过优惠卷的用户他们依旧能使用掉此优惠卷。但是可以终止新用户或未领取过的用户领取它！',
					okText: '确定',
					okType: 'danger',
					cancelText: '取消',
					onOk() {
						console.log('OK');
						var data = {
							couponId: id
						}
						this.$Request_post("https://mychen.vip:8090/System/v1/api/DeleteCoupon", data).then(res => {
							console.log(res)
						})
					},
					onCancel() {
						console.log('Cancel');
					},
				});

			}
		},
		components: {
			GlobalPageHeader
		}
	}
</script>

<style>

</style>
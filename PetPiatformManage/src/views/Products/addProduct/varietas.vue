<template>
	<div style="width: 100%;">
		<table style="width: 100%;">
			<a-row>
				<tr style="display: flex;">
					<a-col :span="5">
						<th style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">RAM</th>
					</a-col>
					<a-col :span="5">
						<th style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">ROM</th>
					</a-col>
					<a-col :span="5">
						<th style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">库存</th>
					</a-col>
					<a-col :span="5">
						<th style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">价格/元</th>
					</a-col>
					<a-col :span="4">
						<th style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">操作</th>
					</a-col>
				</tr>
			</a-row>
			<a-row>
				<tr style="display: flex;" v-for="(item,index) in data">
					<a-col :span="5">
						<td style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">
							<span v-if="indexs!=index">{{item.type}}</span>
							<a-input v-if="show&&index==indexs" style="width: 70%; margin-top: 6px;z-index: 999;" placeholder="输入选择项" v-model="updateRaw"></a-input>
						</td>
					</a-col>
					<a-col :span="5">
						<td style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">
							<span v-if="indexs!=index">{{item.versions}}</span>
							<a-input v-if="show&&index==indexs" style="width: 70%; margin-top: 6px;z-index: 999;" placeholder="输入选择项" v-model="updateRow"></a-input>
						</td>
					</a-col>
					<a-col :span="5">
						<td style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">
							<span v-if="indexs!=index">{{item.inventory}}</span>
							<a-input-number v-if="show&&index==indexs" style="margin-top: 6px;" :min="1" v-model="updateInventory" />
						</td>
					</a-col>
					<a-col :span="5">
						<td style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">
							<span v-if="indexs!=index">{{item.price}}￥</span>
							<a-input-number v-if="show&&index==indexs" style="margin-top: 6px;" :min="1" v-model="updatePrice" />
						</td>
					</a-col>
					<a-col :span="4">
						<td style="display: flex; justify-content: center;height: 50px; line-height: 50px;border: 1px solid #d9d9d9">
							<a-button v-if="indexs!=index" style="margin-top: 6px;" @click="Edit(item,index)">修改</a-button>
							<a-button v-if="show&&index==indexs" style="margin-top: 6px;" @click="Save(item,index)">保存</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
							<a-button style="margin-top: 6px;" @click="Delete(item,index)">删除</a-button>
						</td>
					</a-col>
				</tr>
				<tr style="display: flex; margin-top: 50px;">
					<a-col :span="6">
						<td style="display: flex; justify-content: center;">
							<span style="line-height: 30px;">RAW：</span>
							<a-input style="width: 70%;" placeholder="输入选择项" v-model="raw"></a-input>
						</td>
					</a-col>
					<a-col :span="6">
						<td style="display: flex; justify-content: center;">
							<span style="line-height: 30px;">RAW：</span>
							<a-input style="width: 70%;" placeholder="输入选择项" v-model="row"></a-input>
						</td>
					</a-col>
					<a-col :span="4">
						<td style="display: flex; justify-content: center;">
							<span style="line-height: 30px;">库存：</span>
							<!--<a-input style="width: 70%;" placeholder="输入库存" v-model="inventory"></a-input>-->
							<a-input-number :min="1" v-model="inventory" />
						</td>
					</a-col>
					<a-col :span="4">
						<td style="display: flex; justify-content: center;">
							<span style="line-height: 30px;">价格：</span>
							<!--<a-input style="width: 70%;" placeholder="输入单价" v-model="price"></a-input>-->
							<a-input-number :min="1" v-model="price" />
						</td>
					</a-col>
					<a-col :span="3">
						<td style="display: flex; justify-content: center;">
							<a-button @click="AddVarietas">添加</a-button>
						</td>
					</a-col>
				</tr>
			</a-row>
		</table>

		<div style="height: 80px;"></div>

		<!--<a-row>
			<div style="display: flex; text-align: center;">
				<a-col :span="24">
					<a-button @click="UpdateVarietas">保存</a-button>
					<a-button>取消</a-button>
				</a-col>
			</div>
		</a-row>-->

	</div>
</template>

<script>
	export default {
		name: 'varietas',
		data() {
			return {
				data: this.datas.versionInfo, //产品变种
				raw: '', //添加变种选项
				row: '', //添加变种选项
				inventory: 0, //添加变种库存
				price: 0, //添加变种价格
				indexs: this.datas.versionInfo.length, //修改显示状态
				show: false, //修改显示状态
				updateState: false, //修改状态 当前是修改状态还是未修改状态
				updateRaw: '',
				updateRow: '',
				updateInventory: 0,
				updatePrice: 0
			}
		},
		created() {

		},
		mounted() {
			//			console.log(this.datas)
		},
		methods: {
			AddVarietas() {
				for(var i = 0; i < this.data.length; i++) {
					if(this.data[i].type == this.raw && this.data[i].versions == this.row) {
						this.$notification["error"]({
							message: '更新通知',
							description: '您添加的商品变种已存在，请勿重复添加！',
						});
						this.raw = '';
						this.row = '';
						this.inventory = '';
						this.price = '';
						return ""
					}
				}
				var list = {
					type: this.raw,
					versions: this.row,
					inventory: this.inventory,
					price: this.price,
				}
				this.data.push(list);
				this.updateState = true
				this.indexs = this.datas.versionInfo.length
				this.show = true
				var data = {
					productId: this.datas.productId,
					versionInfo: this.data
				}
				this.$Request_post("https://mychen.vip:8090/System/v1/api/UpdateByVersionInfo", data).then(res => {
					console.log(res)
					if(res.data == "更新成功!") {
						this.$notification["success"]({
							message: '更改通知',
							description: '您新添加的变种，添加成功!',
						});
					}
					this.raw = '';
					this.row = '';
					this.inventory = '';
					this.price = '';
				})
			},
			Edit(e, i) {
				if(this.updateState) {
					this.updateState = false
					console.log("你要放弃当前的修改吗？")
					//之所以不使用this.datas.productId的数据源是因为model修改了数值之后，如果用户不修改此条，会导致视图上出现修改的数值。
					this.updateRaw = ""
					this.updateRow = ""
					this.updateInventory = ""
					this.updatePrice = ""
					//当他放弃修改时，我们在把它清空
					this.indexs = this.datas.versionInfo.length
					this.show = !this.show
				} else {
					this.updateState = true
					//之所以不使用this.datas.productId的数据源是因为model修改了数值之后，如果用户不修改此条，会导致视图上出现修改的数值。
					this.updateRaw = e.type
					this.updateRow = e.versions
					this.updateInventory = e.inventory
					this.updatePrice = e.price
					//
					this.indexs = i
					this.show = !this.show
				}
			},
			Save(e,i) {
				this.updateState = false
				this.indexs = this.datas.versionInfo.length
				this.show = !this.show
				if(e.type==this.updateRaw&&e.versions==this.updateRow&&e.inventory==this.updateInventory&&e.price==this.updatePrice){
					console.log("修改啥啊都没动")
					return ""
				}
				for(var j=0;j<this.data.length;j++){
					if(j!=i){
						if(this.data[j].type==this.updateRaw&&this.data[j].versions==this.updateRow){
							this.$notification["error"]({
								message: '更新通知',
								description: '您修改的商品变种已存在，请勿重复添加！',
							});
							return ""
						}
					}
				}
				var data = {
					productId: this.datas.productId,
					raw: this.data[i].type,
					row: this.data[i].versions,
					type: this.updateRaw,
					versions: this.updateRow,
					inventory: this.updateInventory,
					price: this.updatePrice
				}
				this.$Request_post("https://mychen.vip:8090/System/v1/api/UpdateByVersionInfoSubset", data).then(res => {
					console.log(res)
					if(res.data.msg == "更新成功！") {
						this.$notification["success"]({
							message: '更新通知',
							description: '您的商品变种，修改成功！',
						});
						this.data[i].type = this.updateRaw
						this.data[i].versions = this.updateRow
						this.data[i].inventory = this.updateInventory
						this.data[i].price = this.updatePrice
					}
				})
			},
			Delete(e, i) {
				console.log(e)
				console.log(i)
				var data = {
					productId: this.datas.productId,
					raw: e.type,
					row: e.versions
				}
				this.$Request_post("https://mychen.vip:8090/System/v1/api/DeleteByVersionInfoSubset", data).then(res => {
					console.log(res)
					if(res.data.msg=="删除成功！"){
						this.data.splice(i,1)
						this.$notification["success"]({
							message: '更新通知',
							description: '您的商品变种，删除成功！',
						});
					}
				})
			},

			UpdateVarietas() {
				console.log(this.data)
				var data = {
					productId: this.datas.productId,
					versionInfo: this.data
				}
				this.$Request_post("https://mychen.vip:8090/System/v1/api/UpdateByVersionInfo", data).then(res => {
					console.log(res)
				})
			},
		},
		props: {
			datas: {
				type: Object,
				default: function() {
					return {};
				}
			},

		},

	}
</script>

<style>

</style>
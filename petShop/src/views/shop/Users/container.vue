<template>
	<div>
		<navigationTop>
			<div slot="icon_left">
				<div style="margin-top: 5px; font-size: 24px;">
					<van-icon name="arrow-left" />
				</div>
			</div>
			<div slot="content_center">
				<span style="display: flex;justify-content: center;margin-top: 8px;">{{navigationTitle}}</span>
			</div>
			<div slot="icon_right"></div>
		</navigationTop>

		<div class="sum_record">
			<span class="sum_text">共{{sums.length}}条记录</span>
			<span class="sum_Edit" @click="()=> deleteStatu = !deleteStatu">
				<span v-if="!deleteStatu">编辑</span>
			<span v-if="deleteStatu">完成</span>
			</span>
		</div>

		<div style="width: 100%; background: #F7F7F7; position: absolute;">
			<div class="sum_content" v-for="(item,index) in sums">
				<van-checkbox-group v-model="result">
					<img class="sum_img" :src="item.img" />
					<van-checkbox v-if="deleteStatu" @click="changeCheck(result)" class="sum_checkbox" checked-color="red" v-for="(item, index) in item.id" :key="item" :name="item"></van-checkbox>
					<span class="sum_name">{{item.name}}</span>
					<span class="sum_price">¥ {{item.price}}</span>
					<div style="display: flex;">
						<div class="sum_tab">{{item.tab}}</div>
						<div class="sum_tab" v-if="item.tabs">{{item.tabs}}</div>
					</div>
				</van-checkbox-group>
			</div>

			<div style="display: inline-block; height: 80vh;">
				<span v-if="sums.length==0" style="display: flex; margin-top: 100px; margin-bottom: 10px;  ">还没有留下足迹噢，去逛逛吧~</span>
				<van-button v-if="sums.length==0" type="default" size="small" @click="go_stroll">去逛逛</van-button>
			</div>
		</div>

		<van-submit-bar button-text="删除" @submit="onSubmit" v-if="deleteStatu" :disabled="disabled">
			<van-checkbox checked-color="red" v-model="checked" @click="quanxuan">全选</van-checkbox>
		</van-submit-bar>

	</div>
</template>

<script>
	import { SubmitBar, Checkbox, CheckboxGroup, Button } from 'vant';
	import navigationTop from '@/components/modularization/navigationTop'
	export default {
		name: 'container',
		data() {
			return {
				navigationTitle: this.$route.params.index,
				sum: 1,
				sums: [{
						id: '1',
						img: 'http://img12.360buyimg.com/evalpic/s240x240_jfs/t1/17834/5/9707/177777/5c80d52fE10e364db/478f8f4c67465de0.jpg',
						name: '四川丑柑不知火  新鲜丑橘  橘子 2.5kg装 国产水果',
						price: '25.81',
						tab: '满减',
						tabs: '多买多优惠'
					},
					{
						id: '2',
						img: 'http://img12.360buyimg.com/evalpic/s240x240_jfs/t22270/197/352877788/243126/2f71a92c/5b0bacacNb5c0f6d3.jpg',
						name: '精气神 精瘦肉 400g/袋  山黑猪  林间散养',
						price: '29.92',
						tab: '满减'
					},
					{
						id: '3',
						img: 'http://img12.360buyimg.com/evalpic/s240x240_jfs/t22270/197/352877788/243126/2f71a92c/5b0bacacNb5c0f6d3.jpg',
						name: '精气神 精瘦肉 400g/袋  山黑猪  林间散养',
						price: '29.93',
						tab: '满减'
					},
					{
						id: '4',
						img: 'http://img12.360buyimg.com/evalpic/s240x240_jfs/t22270/197/352877788/243126/2f71a92c/5b0bacacNb5c0f6d3.jpg',
						name: '精气神 精瘦肉 400g/袋  山黑猪  林间散养',
						price: '29.94',
						tab: '满减'
					},
				], //遍历壳子
				deleteStatu: false,
				checked: false,
				result: [],
				disabled: true,
				
			}
		},
		mounted() {

		},
		methods: {
			changeCheck(e) {
				console.log(e)
				if(this.checked) {
					this.checked = false
				} else if(this.sums.length == this.result.length) {
					console.log(e.length)
					console.log(this.result.length)
					this.checked = true
				}
			},
			quanxuan() {
				if(this.checked) {
					for(var i = 0; i < this.sums.length; i++) {
						this.result.push(this.sums[i].id)
					}
				} else if(!this.checked) {
					this.result = []
				}
			},
			onSubmit() {
				console.log(this.result)
				alert("你确定要把编号为：" + this.result + "的浏览记录删除吗？")
				//遍历选中的id数，遍历数据数组，判断I中的ID是否等于数据中的ID，如果相同则校验他在数组中出现的角标，删除即可
				for(var i = 0; i < this.result.length; i++) {
					for(var j = 0; j < this.sums.length; j++) {
						if(this.result[i] == this.sums[j].id) {
							this.sums.splice(this.sums.indexOf(this.sums[j]), 1)
						}
					}
				}
				//判断是否为全选，如果是全选则，直接将this.sums置为空
				if(this.checked) {
					this.sums = []
				}
			},
			go_stroll() {
				this.$router.go(-1)
			}
		},
		components: {
			navigationTop,
			SubmitBar,
			Checkbox,
			CheckboxGroup,
			Button
		},
		watch: {
			/**
			 * 设置删除按钮 禁用不禁用
			 */
			result(value) {
				if(value.length == 0) {
					this.disabled = true
				} else if(value.length != 0) {
					this.disabled = false
				}
			},
			/**
			 * 当删除所以浏览记录之后，关闭底部删除导航栏。
			 */
			sums(value) {
				if(value.length == 0) {
					console.log("1")
					this.deleteStatu = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sum_record {
		width: 100%;
		height: 40px;
		border-top: 1px solid #E5E5E5;
		.sum_text {
			float: left;
			font-size: 14px;
			color: #666;
			padding: 10px;
		}
		.sum_Edit {
			font-size: 16px;
			color: red;
			float: right;
			padding: 10px;
		}
	}
	
	.sum_content {
		width: 48%;
		float: left;
		margin-left: 1.4%;
		margin-bottom: 0.5%;
		background: #FFFFFF;
		margin-top: 4px;
		.sum_img {
			width: 100%;
		}
		.sum_checkbox {
			float: right;
			margin-top: -100%;
			margin-right: 4px;
		}
		.sum_name {
			display: flex;
			font-size: 12px;
			text-align: left;
			margin: 4px;
		}
		.sum_price {
			display: flex;
			font-size: 14px;
			margin: 4px;
			font-weight: bold;
			color: #e93b3d;
		}
		.sum_tab {
			display: inline-block;
			font-size: 12px;
			color: #e93b3d;
			border: 1px solid #e93b3d;
			padding: 0 4px;
			margin-left: 4px;
			margin-bottom: 4px;
		}
	}
</style>
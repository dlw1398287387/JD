<template>
	<div>
		<a-popover title="Title" trigger="click" v-model="visible">
		    <a @click="hide" slot="content">确定</a><br slot="content"/>
		    <a @click="hide" slot="content">取消</a>
		    <a-button type="primary">Click me</a-button>
		</a-popover>
	</div>
</template>

<script>
	export default{
		name:'index1',
		data(){
			return{
				visible: false,
			}
		},
		methods:{
			hide (){
		      console.log(111)
		      this.visible = false
		    },
		},
	}
</script>

<style>
</style>
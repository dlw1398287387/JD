<template>
	<div>
		
		<img v-for="img in this.$store.state.ProductDetails.ImgDetails" v-lazy="img" style="width: 100%;">
		
	</div>
</template>

<script> 
	export default{
		name:'particulars',
		data(){
			return{
			}
		},
		components:{
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
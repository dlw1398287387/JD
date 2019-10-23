<template>
	<div>
		<detailsNavigation>
			 <router-view />
		</detailsNavigation>
	</div>
</template>

<script>
	import detailsNavigation from '@/components/modularization/details_navigation'
	export default{
		name:'detailsLayout',
		data(){
			return{
				
			}
		},
		props:{
			data:{
				type:String,
				default:''
			}
		},
		components:{
			detailsNavigation
		}
	}
</script>

<style>
</style>
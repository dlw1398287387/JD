<template>
	<div>
		<navigationTop>
			<div slot="icon_left">
				<div style="margin-top: 5px; font-size: 24px;">
					<van-icon name="arrow-left"/>
				</div>
			</div>
		</navigationTop>
		
		<div style="width: 100%;height: 100%; margin-bottom: 20px;">
			<img src="../../../../LOGOicon.png" style="width: 50%;" /><br />
			<span style="font-size: 16px; font-weight: bold;margin-left: 20px;">PetsFree</span>
		</div>
		<div style="text-align: left;">
			<van-cell title="功能介绍" is-link @click="onclock"/>
			<van-cell title="投诉" is-link @click="onclock"/>
			<van-cell title="关于PetsFree" is-link value="v1.4.2" @click="onclock"/>
		</div>
		<copyright></copyright>
	</div>
</template>

<script>
	import navigationTop from '@/components/modularization/navigationTop'
	import copyright from '@/components/modularization/copyright'
	import { Cell,Notify} from 'vant';
	export default{
		name:'About_Us',
		data(){
			return{
				
			}
		},
		mounted(){
			console.log("111")
		},
		methods:{
			onclock(){
				Notify({message: '系统升级中~!',duration: 1000,background: '#1989fa'});
			}
		},
		components:{
			navigationTop,
			copyright,
			Cell,
			Notify 
		}
	}
</script>

<style>
</style>
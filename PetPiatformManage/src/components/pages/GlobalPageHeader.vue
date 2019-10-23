<template>
	
		<div style="width: 100%;  background: #fff; margin-top: 2px;">
			<a-row>
				<a-col :xl="12"  :lg="12" :md="24" :xs="24">
					<div style="padding: 15px; margin-left: 15px;">
						<!--<span style="color: rgba(0, 0, 0, 0.45);">{{this.$route.matched[0].meta.title}}</span>&nbsp; /&nbsp;
						<span style="color: rgba(0, 0, 0, 0.45);">{{this.$route.matched[1].meta.title}}</span> &nbsp; /&nbsp;
						<span style="color: rgba(0, 0, 0, 0.45);">{{this.$route.matched[2].meta.title}}</span>-->
						<a-breadcrumb separator=">"> 
						    <a-breadcrumb-item><a-icon type="home" /><span>{{this.$route.matched[0].meta.title}}</span></a-breadcrumb-item>
						    <a-breadcrumb-item href=""><a-icon :type="this.$route.matched[1].meta.icon" /><span>{{this.$route.matched[1].meta.title}}</span></a-breadcrumb-item>
						    <a-breadcrumb-item href="">{{this.$route.matched[2].meta.title}}</a-breadcrumb-item>
						</a-breadcrumb>
						<table style="margin-top: 5px;">
							<tr>
								<td v-if="this.$route.meta.hiddenHeaderContent" rowspan="2"><img  src="../../../static/avatar2.jpg" style="width: 70px; border-radius: 50px; margin-top: 10px;"/></td>
								<td v-if="this.$route.meta.hiddenHeaderContent">&nbsp;&nbsp;&nbsp;</td>
								<td style="height: 20px;"><span class="headline">{{headline}}</span></td>
							</tr>
							<tr>
								<td v-if="this.$route.meta.hiddenHeaderContent"></td>
								<td colspan="2"><span style="color: rgba(0, 0, 0, 0.45);">{{describe}}</span></td>
							</tr>
						</table>
					</div>
				</a-col>
				<a-col :xl="12" :lg="12" :md="24" :xs="24">
					
				</a-col>
			</a-row>
		</div>
</template>

<script>
	
	export default{
		name:'GlobalPageHeader',
		data(){
			return{
				
			}
		},
		mounted(){
			console.log()
		},
		methods:{
			
		},
		props:{
			headline:{
				type:String,
				default:""
			},
			describe:{
				type: String,
				default:""
			}
		}
	}
</script>
	
<style>
	
.headline{
	display: flex;
	font-size: 20px;
	line-height: 28px;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.85);
	margin-bottom: 10px;
	-webkit-box-flex: 1;
	margin-top: 10px;
}

</style>
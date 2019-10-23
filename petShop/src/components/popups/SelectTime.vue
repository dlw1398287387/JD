<template>
	<van-popup v-model="show" position="bottom" :overlay="true">
		<van-picker  show-toolbar title="选择预约时间" :columns="columns" @change="onChange" @cancel="onCancel" @confirm="onConfirm"/>
	</van-popup>
</template>

<script>
	const citys = {
	  '今日': [],
	  '次日': [],
	};
	import { Popup, Icon,Picker,Toast   } from 'vant';
	export default{
		name:"SelectTime",
		data(){
			return{
				show:false,
				columns: [
			        {
			          values: Object.keys(citys),
			          className: 'column1'
			        },
			        {
			          values: citys['今日'],
			          className: 'column2',
			          defaultIndex: 0
			        }
			    ]
			}
		},
		mounted(){
			for(var i=0;i<this.officeHours.to-this.officeHours.form+1;i++){
				if(Number(this.officeHours.form)+i==Number(this.officeHours.form)){
					citys.今日.push(Number(this.officeHours.form)+i+":10")
					citys.次日.push(Number(this.officeHours.form)+i+":10")
				}else if(Number(this.officeHours.form)+i!=13&&Number(this.officeHours.form)+i!=14){
					citys.今日.push(Number(this.officeHours.form)+i+":00")
					citys.次日.push(Number(this.officeHours.form)+i+":00")
				}
			}
		},
		methods:{
			onOpenshow(){
				this.show = true
			},
			outShow(){
				this.show = false
			},
			onCancel(){
		      	Toast('取消');
		    },
		    onConfirm(value, index){
		    	Toast(`当前值：${value}, 当前索引：${index}`);
		    	this.$emit("changeTime",value)
		    	this.show = false
		    },
			onChange(picker, values) {
		      	picker.setColumnValues(1, citys[values[0]]);
		    },
		},
		components:{
			Popup, Icon ,Picker ,Toast 
		},
		props:{
			officeHours:{
				type:Object,
				default:function(){
					return{}
				}
			}
		},
	}
</script>

<style>
</style>
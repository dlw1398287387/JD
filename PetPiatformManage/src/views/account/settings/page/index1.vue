<template>
	<div style="margin-left: 20px; display: flex; overflow: hidden;">
		<a-row :gutter="16">
      		<a-col :md="24" :lg="16">
				<h2 style="margin-bottom: 20px;">基本设置</h2>
				<a-form layout="vertical">
			        <a-form-item label="昵称-nickName">
			        	<a-input placeholder="给自己起个名字" v-model="nickName"/>
			        </a-form-item>
			        <a-form-item label="店铺名称">
			        	<a-input placeholder="您店铺的名称" v-model="ShopName"/>
			        </a-form-item>
			        <a-form-item label="商店描述-Bio" >
			            <a-textarea rows="4" placeholder="You are not alone." v-model="description"/>
			        </a-form-item>
			        <a-form-item label="选择城市" >
			            <a-cascader :options="city" @change="onChange" :defaultValue="storeCity"/>
			        </a-form-item>
          			<a-form-item label="店铺地址-address" :required="false" >
            			<a-input placeholder="输入店铺详细地址" v-model="storeAddress"/>
          			</a-form-item>
          			<a-form-item label="店铺经纬度-location(推荐使用地图工具查询自家店铺地址位置在填写)如：22.698027,113.998909" :required="false" >
            			<a-input placeholder="输入店铺经纬度(location)" v-model="storeLocation"/>
          			</a-form-item>
          			<a-form-item label="请输入营业时间" :required="false" >
            			<a-input style=" width: 100px; text-align: center" placeholder="Minimum" v-model="form" />
						<a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
						<a-input style="width: 100px; text-align: center; border-left: 0" placeholder="Maximum" v-model="to" />
						<span style="color: red;"> *如：早上9点  ---- 晚上20点</span>
          			</a-form-item>
			        <a-form-item>
			            <a-button type="primary" @click="subUserInfo">提交</a-button>
			            <a-button style="margin-left: 8px">保存</a-button>
			        </a-form-item>
		        </a-form>
			</a-col>
			<a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
				<fileUpload v-on:uploadimage="uploadimage"></fileUpload>
			</a-col>
			<a-col :md="24" :lg="8" :style="{ minHeight: '180px;' }">
		        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
		          <a-icon type="cloud-upload-o" class="upload-icon"/>
		          <div class="mask">
		            <a-icon type="plus" />
		          </div>
		          <img :src="option.img" style="height: 180px;"/>
		        </div>
		    </a-col>
		</a-row>
		<avatar-modal ref="modal" v-on:CropDataimage="CropDataimage" :userAvatar="option.img"></avatar-modal>
		<span @click="abc">点击</span>
	</div>
</template>

<script>
	import fileUpload from '@/views/account/settings/page/fileUpload'
	import avatarModal from '@/views/account/settings/page/avatarModal'
	import { city } from '@/views/offlineService/city.js'
	export default{
		name:"index1",
		data(){
			return{
				preview: {},
				city: city,
		        option: {
		          img: this.$Vue.ls.get("userDatas").userAvatar,
		          info: true,
		          size: 1,
		          outputType: 'jpeg',
		          canScale: false,
		          autoCrop: true,
		          // 只有自动截图开启 宽度高度才生效
		          autoCropWidth: 180,
		          autoCropHeight: 180,
		          fixedBox: true,
		          // 开启宽度和高度比例
		          fixed: true,
		          fixedNumber: [1, 1]
		        },
		        choiceCity:[],
		        nickName:this.$Vue.ls.get("userDatas").nickName,
		        ShopName:this.$Vue.ls.get("userDatas").ShopName,
		        description:this.$Vue.ls.get("userDatas").description,
		        storeCity:this.$Vue.ls.get("userDatas").storeCity,
		        storeAddress:this.$Vue.ls.get("userDatas").storeAddress,
		        storeLocation:this.$Vue.ls.get("userDatas").storeLocation,
				form:this.$Vue.ls.get("userDatas").form,
				to:this.$Vue.ls.get("userDatas").to,
		        showTable:false,
			}
		},
		mounted(){
			console.log(this.$Vue.ls.get("userDatas"))
		},
		methods:{
			
			//子传父  传递base64图片
			uploadimage(val){
//				console.log(val)
				this.option.img=val
				//回调，传递一个参数给子
				this.$refs.modal.chufa(val);
			},//子传父  传递base64图片
			CropDataimage(val){
				this.option.img=val
			},
			abc(){
				console.log(this.$Vue.ls.get("userDatas"))
			},
			onChange(value) {
		       console.log(value);
		       this.choiceCity=value
		    },
			subUserInfo(){
				var data = {
					nickName:this.nickName,
					ShopName:this.ShopName,
					description:this.description,
					storeCity:this.choiceCity,
					storeAddress:this.storeAddress,
					storeLocation:this.storeLocation,
					form:this.form,
					to:this.to,
					userAvatar:this.option.img
				}
				console.log(data)
				this.$Request_put("https://mychen.vip:8090/System/v1/api/updateUsers",data).then(res=>{
					if(res.data.status=="Success"){
						this.$Request_post('https://mychen.vip:8090/System/v1/api/findByUserInfo').then(res=>{
							console.log(res.data)
							if(res.data){
								this.$ls.set("userDatas",res.data,60*60*1000*6);
								this.$router.go(0)
							}else{
								this.$openNotification(res.data.msg)
							}
						})
					}
				})
			}
		},
		components:{
			fileUpload,
			avatarModal
		}
	}
</script>

<style lang="scss" scoped>
	body::-webkit-scrollbar {
	    display:none
	}
  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }
  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }

</style>
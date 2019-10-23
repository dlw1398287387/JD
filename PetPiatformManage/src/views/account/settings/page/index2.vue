<template>
	<div style="margin-left: 20px;">
			<h2 style="margin-bottom: 20px;">安全设置</h2>
			<a-list itemLayout="horizontal" :dataSource="data" >
			    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
			      <a-list-item-meta>
			        <a slot="title">{{ item.title }}</a>
			        <span slot="description">
			          <span class="security-list-description">{{ item.description }}</span>
			          <span v-if="item.value"> : </span>
			          <span class="security-list-value">{{ item.value }}</span>
			        </span>
			      </a-list-item-meta>
			      <template v-if="item.actions">
			        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
			      </template>
			    </a-list-item>
	  		</a-list>
	  		<updatePassword ref="PassWord"></updatePassword>
	  		<updatePhone ref="Phone"></updatePhone>
	  		<updateEmil ref="unbundle"></updateEmil>
  	</div>
</template>
<script>
import updatePassword from '@/views/account/settings/page/updatePassword' 
import updatePhone from '@/views/account/settings/page/updatePhone' 
import updateEmil from '@/views/account/settings/page/updateEmil'
export default {
  data () {
    return {
      data: [
          { title: '账户密码' , description: '当前密码强度', value: '弱的一匹', actions: { title: '修改', callback: () => { this.$refs.PassWord.showModal() } } },
          { title: '绑定手机' , description: '已绑定手机', value:this.$Vue.ls.get("userDatas").phone , actions: { title: '修改', callback: () => { this.$refs.Phone.showModal() } }  },
          { title: '绑定邮箱' , description: '已绑定邮箱', value:this.$Vue.ls.get("userDatas").email , actions: { title: '修改', callback: () => { this.$refs.unbundle.showModal() } }  },
        ]
    }
  },
  components:{
    updatePassword,
    updatePhone,
    updateEmil
  }
}
</script>
<style>

</style>

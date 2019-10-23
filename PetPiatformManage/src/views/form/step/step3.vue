<template>
  <div>
  	<a-form style="max-width: 500px; margin: 40px auto ;">
  		<a-alert
        :closable="true"
        message="转账成功！资金于24小时内到账！"
        style="margin-bottom: 24px;"
      />
  		<div class="information">
          <a-row>
            <a-col :sm="8" :xs="24">付款账户：</a-col>
            <a-col :sm="16" :xs="24">ant-design@alipay.com</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">收款账户：</a-col>
            <a-col :sm="16" :xs="24">test@example.com</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">收款人姓名：</a-col>
            <a-col :sm="16" :xs="24">辉夜</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">转账金额：</a-col>
            <a-col :sm="16" :xs="24"><span class="money">5000</span> 元</a-col>
          </a-row>
        </div>
  	 
		<div style="max-width: 500px; margin: 40px auto ; position: relative;text-align: center;">
		    <a-button type="primary" @click="finish">再转一笔</a-button>
		    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		    <a-button style="margin-left: 8px">查看账单</a-button>
		</div>
	 </a-form>
  </div>
</template>

<script>
  export default {
    name: "Step3",
    data () {
      return {
        loading: false
      }
    },
    methods: {
      finish () {
        this.$emit('finish')
      }
    }
  }
</script>
<style scoped>
  .information {
  	position: relative;
    line-height: 22px;
    text-align: center;
  }
  .ant-row:not(:last-child) {
      margin-bottom: 24px;
    }
  .money {
    font-family: "Helvetica Neue",sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 14px;
  }
</style>
<template>
	<div class="footer">
		<div class="links">
			<a href="https://pro.ant.design/" target="_blank">Pro 首页</a>
			<a href="https://github.com/ant-design/ant-design-pro" target="_blank">
				<a-icon type="github" />
			</a>
			<a href="https://ant.design/">Ant Design</a>
			<a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/">Vue Antd</a>
		</div>
		<div class="copyright">
			Copyright
			<a-icon type="copyright" /> 2019 <span>京什么什么</span>
		</div>
		<div class="help">
			<span>帮助</span>
			<span>隐私</span>
			<span>条款</span>
		</div>

	</div>
</template>

<script>
	export default {
		name: "LayoutFooter"
	}
</script>

<style scoped>
	.footer {
		padding: 0 16px;
		margin: 8px 0 24px;
		text-align: center;
	}
	
	.links {
		margin-bottom: 4px;
	}
	
	.links a {
		color: rgba(0, 0, 0, .45);
		&:hover {
			color: rgba(0, 0, 0, .65);
		}
		&:not(:last-child) {
			margin-right: 40px;
		}
	}
	
	.copyright {
		color: rgba(0, 0, 0, .45);
		font-size: 14px;
		margin-bottom: 4px;
	}
	.help span{
		color: rgba(0, 0, 0, .45);
		font-size: 14px;
		padding: 0px 28px;
	}
</style>
<template>
	<div>
		<!--
        	作者：15908619974@163.com
        	时间：2019-01-10
        	描述：面包屑，标题栏
        -->
		<Global-PageHeader :headline="headline" :describe="describe"></Global-PageHeader>
		
		<div style="margin: 20px;">
			<a-row :gutter="16">
				<a-col :xl="6">
					<card CardTitle="销售额度" total="¥126,560">
						<a-tooltip title="销售比率" slot="card-action">
				          <a-icon type="info-circle-o" />
				        </a-tooltip>
				        <div slot="card-content">
				            <span>同周比12%<a-icon type="caret-up" style="color: red;"/></span> &nbsp;&nbsp;
				            <span>日环比 11%<a-icon type="caret-down" style="color: #52C41A;"/></span>
				        </div>
				        <div slot="card-footer">
				        	日均销售额￥ 234.56
				        </div>
					</card>
				</a-col>
				<a-col :xl="6">
					<card CardTitle="访问量" total="1,234">
						<a-tooltip title="访问峰值" slot="card-action">
				          <a-icon type="info-circle-o" />
				       	</a-tooltip>
				        <div slot="card-content">
				        	<span>同周比12%<a-icon type="caret-up" style="color: red;"/></span> &nbsp;&nbsp;
				            <span>日环比11%<a-icon type="caret-down" style="color: #52C41A;"/></span>
				        </div>
				        <div slot="card-footer">
				        	日访问量1,234
				        </div>
					</card>
				</a-col>
				<a-col :xl="6" >
					<card CardTitle="交易笔数" total="437">
						<a-tooltip title="交易比率" slot="card-action">
				          <a-icon type="info-circle-o" />
				        </a-tooltip>
				        <div slot="card-content">
				        	<span>同周比12%<a-icon type="caret-up" style="color: red;"/></span> &nbsp;&nbsp;
				            <span>日环比 11%<a-icon type="caret-down" style="color: #52C41A;"/></span>
				        </div>
				        <div slot="card-footer">
				        	日交易单437
				        </div>
					</card>
				</a-col>
				<a-col :xl="6">
					<card CardTitle="运营活动效果" total="70%">
						<a-tooltip title="增长值" slot="card-action">
				          <a-icon type="info-circle-o" />
				        </a-tooltip>
				        <div slot="card-content">
				        	<a-progress :percent="70" status="active" :showInfo="false" />
				        </div>
				        <div slot="card-footer">
				        	<span>同周比12%<a-icon type="caret-up" style="color: red;"/></span> &nbsp;&nbsp;
				            <span>日环比 3%<a-icon type="caret-down" style="color: #52C41A;"/></span>
				        </div>
					</card>
				</a-col>
				
				<!--
                 	作者：15908619974@163.com
                	时间：2019-01-10
                   	描述：项目表，在适配手机端时使用@media适配 class的宽度即可！
                   		例如：屏幕分辨率<1200px时 class="a-card-grid-style"的宽度等于100%
                   			反之：宽度33.3%
                    -->
				<a-col :xl="16"> 
					<a-card title="进行中的项目" :bordered="false" :body-style="{ padding: 0 }" style="margin-bottom: 14px;">
					  <a slot="extra">全部项目</a> 
						  <div v-for="item in lists">
						  	<a-card-grid class="a-card-grid-style">
							  	<a-icon :type="item.icon" style="font-size: 26px; color: #00ADF7;"/>
							  	<a style="margin-left: 10px; line-height: 24px;color: rgba(0, 0, 0, 0.85);display: inline-block;vertical-align: top;font-size: 14px;">{{item.name}}</a>
							  	<p>{{item.desc}}</p>
							  	<span>{{item.desc1}}</span><span style="color: rgba(0, 0, 0, 0.25); flex: 0 0 auto;float: right;">{{item.time}}</span>
						  	</a-card-grid>
						  </div>
					</a-card>
						
					<a-card title="动态" style="margin-bottom: 14px;">
				      <!--<a href="#" slot="extra">More</a>-->
				      <a-list
					    itemLayout="horizontal"
					    :dataSource="data"
					  >
					    <a-list-item slot="renderItem" slot-scope="item, index">
					      <a-list-item-meta
					        :description="item.time"
					      >
					        <a slot="title">{{item.title}}</a>
					        <a-avatar slot="avatar" :src="item.avatar" />
					      </a-list-item-meta>
					    </a-list-item>
					  </a-list>
					  
				    </a-card>
				</a-col>
				<a-col :xl="8">
					<a-card title="快速开始   / 便捷导航" style="margin-bottom: 14px" :bordered="false" :body-style="{padding: 0}">
			            <div class="item-group">
			              <a>操作一</a>
			              <a>操作二</a>
			              <a>操作三</a>
			              <a>操作四</a>
			              <a>操作五</a>
			              <a>BuiBuiBui</a>
			              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
			            </div>
			        </a-card>
				</a-col>
				<a-col :xl="8">
					<a-card title="快速开始2 / 便捷导航2" style="margin-bottom: 14px" :bordered="false" :body-style="{padding: 0}">
			            <div class="item-group">
			              <a>操作一</a>
			              <a>操作二</a>
			              <a>操作三</a>
			              <a>操作四</a>
			              <a>操作五</a>
			              <a>BuiBuiBui</a>
			              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
			            </div>
			        </a-card>
			        <a-card title="产品指数" style="margin-bottom: 14px;">
						<div v-if="showChart" style="height: 357px;">
							<radar></radar>
						</div>
					</a-card>
				</a-col>
			</a-row>
		
		</div>
	</div>
</template>

<script>
	const datas={name:'123',age:'15',desc:'dddd'}
	import GlobalPageHeader from '@/components/pages/GlobalPageHeader'
	import card from '@/components/chart/card'
	import radar from '@/components/chart/radar'
	export default {
	  data(){
	    return {
	      	headline:'图表盘',
	      	describe:'查看工作图表!',
	      	showChart:false,
	      	lists: [{icon:'alipay-circle',name:'Alipay',desc:'那是一种内在的东西， 他们到达不了，也无法触及的',desc1:'滴~滴滴',time:'N年前！'},
			      	{icon:'alipay-circle',name:'Alipay',desc:'那是一种内在的东西， 他们到达不了，也无法触及的',desc1:'滴~滴滴',time:'N年前！'},
			      	{icon:'alipay-circle',name:'Alipay',desc:'那是一种内在的东西， 他们到达不了，也无法触及的',desc1:'滴~滴滴',time:'N年前！'},
			      	{icon:'alipay-circle',name:'Alipay',desc:'那是一种内在的东西， 他们到达不了，也无法触及的',desc1:'滴~滴滴',time:'N年前！'},
			      	{icon:'alipay-circle',name:'Alipay',desc:'那是一种内在的东西， 他们到达不了，也无法触及的',desc1:'滴~滴滴',time:'N年前！'},
			      	{icon:'alipay-circle',name:'Alipay',desc:'那是一种内在的东西， 他们到达不了，也无法触及的',desc1:'滴~滴滴',time:'N年前！'},
	      	],
	      	datas,
	      	data,
	    }
	  },
	  mounted(){
  		this.$nextTick(()=>{this.showChart=true}) 
  		console.log(this.datas)
  	  },
	  methods:{
	  	
	  },
	  components:{
	  	GlobalPageHeader,
	  	card,
	  	radar
	  }
	}
	const data = [
	  {
	    title: '来着某某某管理员的动态消息 1',
	    time:'2019-02-16 09:35:37',
		avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',	    
	  },
	  {
	    title: '来着某某某管理员的动态消息 2',
	    time:'2019-02-16 09:36:37',
	    avatar:'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
	  },
	  {
	    title: '来着某某某管理员的动态消息 3',
	    time:'2019-02-16 09:37:37',
	    avatar:'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
	  },
	  {
	    title: '来着某某某管理员的动态消息 4',
	    time:'2019-02-16 09:38:37',
	    avatar:'http://dummyimage.com/64x64',
	  },
	]
</script>

<style>
	@media only screen and (min-width:1024px ) {
		.ant-card-grid{
			width:33.3%;
		}
	}
	@media only screen and (max-width: 1024px) {
		.ant-card-grid{
			width:100%;
		}
	}
	.item-group {
	    padding: 20px 0 8px 24px;
	    font-size: 0;
    }
    .item-group a {
        color: rgba(0, 0, 0, 0.65);
        display: inline-block;
        font-size: 14px;
        margin-bottom: 13px;
        width: 25%;
    }
    
</style>
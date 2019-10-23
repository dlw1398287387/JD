<template>
  <a-popover trigger="click" placement="bottom" :autoAdjustOverflow="false" overlayClassName="header-notice-wrapper" :overlayStyle="{ width: '300px', top: '50px',}">
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs>
          <a-tab-pane tab="通知" key="1">
            <a-list>
              <a-list-item>
                <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="消息" key="2">
            <a-list
					    itemLayout="horizontal"
					    :dataSource="data"
					  >
					    <a-list-item slot="renderItem" slot-scope="item, index">
					      <a-list-item-meta
					        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
					      >
					        <a slot="title" href="https://vuecomponent.github.io/ant-design-vue/">{{item.title}}</a>
					        <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					      </a-list-item-meta>
					    </a-list-item>
					  </a-list>
          </a-tab-pane>
          <a-tab-pane tab="待办" key="3">
            123
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice">
      <a-badge :count="100" :overflowCount='99'>
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>

  export default {
  
    name: "HeaderNotice",
    data () {
      return {
        loadding: false,
        data:[
						  {
						    title: 'Ant Design Title 1',
						  },
						  {
						    title: 'Ant Design Title 2',
						  },
						]
      }
    },
    methods: {
      fetchNotice () {
        if (this.loadding) {
          this.loadding = false
          return
        }
        this.loadding = true
        setTimeout(() => {
          this.loadding = false
        }, 2000)
      }
    }
  }
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
    
  }
</style>
<style lang="scss" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
# petmanage

> no

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# 登录过程描述
> 1.1登录后台使用指定账户密码登录，交互服务器返回token，由客户端本地保存token，有效时效为：6小时（时效可改），当登录，校验等操作完成由登录函数路由到后台页面。   



# 路由描述。（描述/已解决）
> 1.1所以路由记录于 router/index文件中，路由加载显示（例：二次header标题，面包屑，用户头像的显示，），icon全由index控制，由menu导航栏集成。   
> 1.2浏览器back后，menu选择指向不重定向的问题：使用watch钩子监听$route路由变化，并为menu指向参数重新赋值。  



# 关于缺陷的描述记录。（第一CSS冲突污染/已解决）
> 1.1在适配移动端时，Menu导航栏：发生样式污染，其中drawer组件自带padding：24px;导致导航栏样式重复而不执行IPad组件中的padding：0px;推荐打包之后打开css样式包，找到.ant-drawer-body样式，并删除在上线。  
> 1.2在移动端时，进行中的项目板块的样式不改变，宽度一直为33.3%，目前注释底层源码重新根据客户端适配100%||33.3%宽度。（ant-design-vue/dist/antd.css依赖中找到ant-card-grid）    



# 关于antv图标依赖缺陷的描述记录。（已解决）
> 1.1在PC端进行导航栏伸缩时，会导致图标不及时自动响应适配，或超出指定宽度。问题原因：menu导航栏伸缩时，导致图标无法确定当前父级宽度从而超出，不适配响应。故：使用$nextTick函数，然页面渲染完成在加载图表，并且每次点击menu导航栏伸缩时执行triggerWindowResizeEvent函数，触发 window.resize改变视图。  


# 开发进度。
> 1.1基础模块组件，布局，路由，异常错误，全部解决，等待后续数据接入。

# petshop

> petshop

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



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).




开发过程中遇到的问题，以及解决方式。
----
-  1.关于客户端pettv设备的版本低不支持直接axios请求，需要做兼容
```bash
npm install vue-resource
Import VueResource from 'vue-resource'
Vue.use(VueResource)
```

- 2.pet_home页，嵌入安卓中会导致轮播图与安卓viewpager滑动冲突
  解决办法H5中获取轮播图的高度，以及轮播图距离顶部的高度，XY轴位置，使用window.text=function(){}方法传递给安卓，禁用当前位置的viewpager

- 3.安卓 IOS主动向H5传递数据的问题。
	3.1:安卓中直接与JS交互，由JS收取数据，
	3.2:IOS跟安卓交互有所不同，但IOS支持可以直接在IOS本地设置JS的本地缓存，
	


# PetTv安卓设备端
> 1.1（时间未知！）与安卓做交互，打通与安卓设备端通信。   
> 1.2（时间未知！）获取安卓传输数据，请求API，获取web点击视频动作，传输，url,title信息回安卓设备端。  
> 1.3 (时间未知！)--(更新Vue.js框架时，发现打包样式丢失问题！)加入    
```bash
	/*! autoprefixer: off*/
	-webkit-box-orient:vertical;
	/* autoprefixer: on */
```
> 待补充：       

# 前提工作
> 1.1(时间未知) 搭建本地开发资源包，以及公共调用类，公共模板。

# petShop主页入口
> 1.1(时间未知) 完成petShop主页。     
> 1.2(时间未知) 获取百度地图API地址信息，获取以美国拉斯维加斯为例，200+条。     
> 1.3(时间未知) 将百度API获取的数据加入服务器数据库。     
> 1.4(时间未知) 完成门户商店主页，（三个入口），响应不同入口的title主题。   
> 1.5(时间未知) 搜索门户商店多选交互，并解决多选会产生数据重复问题！      
> 1.5(时间未知) 通过门户商店多选结果，调度服务器API产生数据响应。       
> 1.6(时间未知) 修改门户商店显示样式。     
> 待补充：       

# petShop搜索入口   
> 1.1(时间未知) search页交互完成，未产生数据，热门搜索，历史搜索，历史搜索以本地localStorage为缓存。      
> 待补充：       

# petShop个人中心
> 1.1(时间未知) 个人中心排版。   
> 1.2(时间未知) 订单项，订单记录，订单状态，浏览记录，状态，以及推送商品服务。页面编写完成。      
> 1.3(时间未知) 设置页，添加收货地址页入口，地区设置页入口，隐私设置页入口，问题反馈页入口，关于PetsFree入口。     
> 1.4(时间未知) 完成设置页所有入口视图编码。       
> 待补充：       
  
# petShop收货地址 (以localStorage为缓存)
>1.1(2019-2-？) 完成收货地址交互，以及，添加地址，修改地址，设置默认地址，删除地址交互。      
>1.2(2019-2-？) 修复在商品页修改默认收货地址引发 addressList报错。        
>1.3(2019-2-？) 修复收货地址列表样式冲突。    
> 待补充：    

# petShop购物车             
>1.1 (2019-3-？) 完成购物车模块代码编写。   
>1.2 (2019-3-？) 完成交互购物车以本地测试数据为例，删除，增加，单选，多选商品，并同时计算其 checked count金额。    
> 待补充：       
      
# petShop 推荐商品  
>1.3 (2019-3-？) 完成推荐商品模块编码。      
>1.2 (2019-3-？) 完成推荐商品交互数据交互，（以本地mock数据为例）。          
>1.3 (2019-3-？) 完成推荐商品五个入口组件交互。Food，医疗，护理器械，玩具，生活用品。        
> 待补充：       

# petShop 详细商品信息
>1.1 (2019-3-？) 完成以推荐商品为入口的详细商品页面编码。     
>1.2 (2019-3-？) 完成弹出层选择收货地址组件。     
>1.3 (2019-3-？) 完成弹出层选择商品类型，颜色组件。
>1.4 (2019-3-？) 完成详细商品页选项交互，以及加入购物车，选择不同类型商品，不同颜色商品计算相应价格。     
>1.5 (2019-3-？) 完成单项订单提交页，金额计算，以及发票选项，收货地址选择，描述一下:大部分商城购物车提交与单项提交都不同，所以，分为购物车提交和单项提交。      
>1.6 (2019-3-？) 完成详细商品页 back 商品  详情  评论分组编码与相应交互。      
> 待补充：       

# petShop 浏览过的商品历史记录，喜欢，商品关注    
>1.1 (2019-3-？) 完成三个入口的交互，信息浏览，删除选择历史几率。（mock数据为例）     
> 待补充：         

# petShop 待付款-待发货-待收货-待评价-全部订单
>1.1 (2019-3-？) 完成这五个入口的交互组件，    
>1.2 (2019-3-？) 完成相对应的数据交互，不同订单状态标签显示。      
> 待补充：       






[//寻找条件 inventoryWhere
	{ "productId": "110720190724133909"}
	{ "productId": "110720190724133910"}
]

[//修改条件 inventoryCount
	{ $inc: { "versionInfo.$.inventory": -1} }
	{ $inc: { "versionInfo.$.inventory": -10} }
]

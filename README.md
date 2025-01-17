<p align="center">
    <img alt="logo" src="https://image.whzb.com/chain/StellarUI/logo.png" width="200">
</p>
<h1 align="center">StellarUI</h1>

<p align="center">📱 一个基于vue2构建，打造的uni-app组件库</p>

<p align="center">
  🚀 <a href="https://StellarUI.cn">文档网站</a>&nbsp;

## ✨ 特性

- 🎯 多平台覆盖，支持 微信小程序、支付宝小程序、H5.
- 🚀 40+ 个高质量组件，覆盖移动端主流场景.
- 📖 提供丰富的文档和组件示例.
- 🎨 支持修改 CSS 变量实现主题定制.

## 📱 预览

扫描二维码访问演示，注意：因微信审核机制限制，当前的微信小程序示例可能不是最新版本，可以 clone 代码到本地预览。

<p style="display:flex;gap:24px">
<img src="https://image.whzb.com/chain/StellarUI/%E5%BE%AE%E4%BF%A1.jpg" width="200" height="200"/>
<img src="https://image.whzb.com/chain/StellarUI/%E6%94%AF%E4%BB%98%E5%AE%9D.png" width="200" height="200" />
</p>

## 快速上手

详细说明见 [快速上手](https://stellar-ui.intecloud.com.cn/pc/index/index?name=handbook-%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)。

  
## 优秀案例

我们非常欢迎大家一起贡献优秀的 Demo 与案例，欢迎在此 [issue](https://github.com/wuhanshuzhiyun/StellarUI/issues/1) 提交案例。
<style>
.project {
	display: flex;
	flex-wrap: wrap;
	column-gap: 20px;
	row-gap: 20px;
	margin-bottom:20px;
}
.item {
	width: calc((100% / 3) - 20px);
	border: 1px solid #999;
	border-radius: 6px;
	padding:15px;
}
.top {
	transition: all 0.3s;
}
.top img{
	width:100%;
	aspect-ratio: 1 / 1;
}

.bottom {
	margin-top:20px;
	display:flex;
	column-gap: 10px;
}
.bottom img {
	width:50px !important;
	height:50px;
	border-radius:50%;
}
.bottom .desc {
	font-size: 12px;
	color: #9a9a9a;
}
.mask {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
}
</style>

<div class="project">
	<div class="item">
		<div class="top">
			<img src="https://image.whzb.com/chain/StellarUI/头像/邻里购.png"></img>
		</div>	
		<div class="bottom">
			<img src="https://image.whzb.com/chain/StellarUI/头像/邻里购头像.png"></img>
			<div class="info">
				<p class="title">邻里购</p>
				<p class="desc">中百邻里购是中百旗下电商平台，主营蔬果、肉蛋、粮油、酒水、休食、家清、百货等，提供外卖、自提、包邮等商品服务，构建邻里生活服务圈。</p>
			</div>
		</div>
	</div>
	<div class="item">
		<div class="top">
			<img src="https://image.whzb.com/chain/StellarUI/头像/百荟.png"></img>
		</div>
		<div class="bottom">
			<img src="https://image.whzb.com/chain/StellarUI/头像/百荟头像.png"></img>
			<div class="info">
				<p class="title">百荟</p>
				<p class="desc">百荟平台是数智云公司自建的本地综合生活服务线上平台。集商业服务、生活服务、政务综合服务于一体的15分钟便民生活圈服务平台。</p>
			</div>
		</div>
	</div>
	<div class="item">
		<div class="top">
			<img src="https://image.whzb.com/chain/StellarUI/头像/中百百货.png"></img>
		</div>
		<div class="bottom">
			<img src="https://image.whzb.com/chain/StellarUI/头像/中百百货头像.png"></img>
			<div class="info">
				<p class="title">中百百货</p>
				<p class="desc">中百百货线上商城。</p>
			</div>
		</div>
	</div>
	<div class="item">
		<div class="top">
			<img src="https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手.png"></img>
		</div>
		<div class="bottom">
			<img src="https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手头像.png"></img>
			<div class="info">
				<p class="title">数智云巡店助手</p>
				<p class="desc">建立一套连锁超市巡店助手系统，以满足社超总部、区域经理、区域督导的巡店需求，结合门店自查统计，社超营运中心通过巡店助手系统提供的支持数据，更好，更优，服务于社超店铺经营，从而实现武汉中百便利店有限公司整体经营利润的提升。</p>
			</div>
		</div>
	</div>
</div>

## 周边生态

| 项目																					| 描述														|
| ---																					| ---														|
|[StellarPlus](https://stellar-ui.intecloud.com.cn/plus/#/)								| 一个基于vue3构建，打造的uni-app组件库							|
|[ste-vue-inset-loader](https://github.com/wuhanshuzhiyun/ste-vue-inset-loader)			|常用于小程序需要全局引入组件的场景的包							|
|[ste-helper](https://marketplace.visualstudio.com/items?itemName=StellarUI.ste-helper)	|旨在帮助开发者更加有效率的使用 StellarPlus来开发项目的vscode插件	|


## 贡献者们
<style>
.con-box{
	display: flex;
	flex-wrap:wrap;
	column-gap: 25px;
	row-gap: 25px;
	margin-bottom: 40px;
}
.con-item {
	display: flex;
	flex-direction: column;
	row-gap: 10px;
}
.con-image {
	width: 90px !important;
	height: 90px !important;
	border-radius: 50%;
}

.con-box a:link,
.con-box a:visited,
.con-box a:hover,
.con-box a:active {
	text-decoration: none !important;
	color: #1989fa !important;
}

.con-box .name {
	color: #1989fa !important;
	text-align: center;
}
</style>
<div class="con-box">
	<div class="con-item">
		<a>
			<image class="con-image" src="https://image.whzb.com/chain/StellarUI/头像/费玉婷.png"></image>
		</a>
		<a><div class="name">费玉婷</div></a>
	</div>
	<div class="con-item">
		<a target="_blank" href="https://github.com/HEXIAYUE">
			<image class="con-image" src="https://image.whzb.com/chain/StellarUI/头像/秦鹏飞.png"></image>
		</a>
		<a target="_blank" href="https://github.com/HEXIAYUE"><div class="name">秦鹏飞</div></a>
	</div>
	<div class="con-item">
		<a  target="_blank" href="https://github.com/zyydfaglory">
			<image class="con-image" src="https://image.whzb.com/chain/StellarUI/头像/张园因.png"></image>
		</a>
		<a target="_blank" href="https://github.com/zyydfaglory"><div class="name">张园因</div></a>
	</div>
	<div class="con-item">
		<a  target="_blank" href="https://github.com/woyou0712">
			<image class="con-image" src="https://image.whzb.com/chain/StellarUI/头像/徐亚君.png"></image>
		</a>
		<a target="_blank" href="https://github.com/woyou0712"><div class="name">徐亚君</div></a>
	</div>
	<div class="con-item">
		<a target="_blank" href="https://github.com/fxxisme">
			<image class="con-image" src="https://image.whzb.com/chain/StellarUI/头像/付宇威.png"></image>
		</a>
		<a target="_blank" href="https://github.com/fxxisme"><div class="name">付宇威</div></a>
	</div>
	<div class="con-item">
		<a>
			<image class="con-image" src="https://image.whzb.com/chain/StellarUI/头像/鲍思睿.png"></image>
		</a>
		<a><div class="name">鲍思睿</div></a>
	</div>
	<div class="con-item">
		<a>   
			<image class="con-image" src="https://image.whzb.com/chain/StellarUI/头像/齐巍.png"></image>
		</a>
		<a><div class="name">齐巍</div></a>
	</div>
</div>

## 鸣谢
- [uni-helper](https://github.com/uni-helper) - 感谢 uni-helper 团队提供的 uni-app 工具库，让 StellarUI 能够更方便地使用。


## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
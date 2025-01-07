<template>
	<view class="pc-page-body">
		<view class="pc-page-header">
			<!-- 您正在浏览基于 Vue 2.x 的文档;
			<a href="https://stellar-ui.intecloud.com.cn/plus" target="_blank">点击查看Vue 3.x版本。</a> -->
			<view class="left">
				<image class="logo" src="../../static/favicon.png" mode="widthFix"></image>
				<text class="logo-text">StellarUI</text>
			</view>
			<view class="right">
				<header-nav @change="handleHeaderNavChange" :mode.sync="navActive" />
				<version-switcher style="margin-left: 32px"></version-switcher>
			</view>
		</view>

		<view class="pc-page-content">
			<view class="pc-nav">
				<view class="group" v-for="group in datas" :key="group.key">
					<view class="name">
						{{ group.title }}
						<ste-icon v-if="group.lock && !cmpLock" code="&#xe691;" size="16px" />
					</view>
					<view class="nav-children" v-if="group.children">
						<view
							class="nav-item"
							v-for="nav in group.children"
							:key="nav.key"
							:class="activeName === nav.key ? 'active' : ''"
							@click="toView(nav.key, group.lock)"
						>
							<view class="name">
								{{ nav.title || nav.name }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<scroll-view scroll-y class="pc-content" :scroll-top="contentScrollTop" @scroll="handleContentScroll">
				<!-- 组件预览页面 -->
				<template v-if="cmpIsCompPage">
					<view v-html="contentViews[0]" class="markdown-view"></view>
					<comp-nav :mode.sync="compNavActive" @change="handleCompNavChange" />
					<view v-html="compContent" class="markdown-view"></view>
				</template>
				<!-- 非组件预览页面（开发指南，研发组等） -->
				<view v-html="content" class="markdown-view render" v-else></view>
				<!-- 底部评价 -->
				<commentVue v-if="isComponent && loadingMd" :activeName="activeName" :isComponent="isComponent" />
			</scroll-view>
			<!-- <view class="pc-content">
				
			</view> -->
			<view class="pc-view" v-if="cmpShowH5">
				<iframe class="view-iframe" :src="cmpIframeUrl" frameborder="0" />
			</view>
			<view class="popup-view" v-if="showPopup">
				<view class="popup-content">
					<input type="password" placeholder="请输入管理员密码" v-model="popupPwd" />
					<view class="popup-btn">
						<button size="mini" type="warn" @click="showPopup = false">取消</button>
						<button size="mini" type="primary" @click="setAdminPwd">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mdMap, vueMap, groupData } from '../markdown/index.js';
import md2html, { splitCompMarkdown } from './md2html.js';
import config from '@/common/config.js';
import request from '@/common/request.js';
import commentVue from './components/comment.vue';
import HeaderNav from './components/header-nav.vue';
import CompNav from './components/comp-nav.vue';
import VersionSwitcher from './components/version-select.vue';
import { getInfo } from '@/common/account.js';
import './mdStyle.scss';

let timeout = 0;

export default {
	components: { commentVue, HeaderNav, CompNav, VersionSwitcher },
	data() {
		return {
			content: '',
			navActive: config.NAV_KEY_DEV,
			activeName: 'handbook-介绍',
			datas: groupData[config.NAV_KEY_DEV],
			commentList: [],
			isComponent: false,
			loadingMd: false,
			commentParams: {
				title: '',
				content: '',
				versions: 2,
			},
			iframeUrl: '/mp/index/index',
			adminLock: uni.getStorageSync('admin-lock'),
			showPopup: false,
			popupPwd: '',
			key: '',
			groupKey: '',
			tmpGroupData: [],
			contentViews: [],
			compNavActive: config.NAV_COMP_KEY_DEMO,
			compContent: '',
			contentOldScrollTop: 0,
			contentScrollTop: 0,
		};
	},
	computed: {
		cmpIframeUrl() {
			return `${this.iframeUrl}?t=${Date.now()}`;
		},
		cmpLock() {
			return this.adminLock === 'true';
		},
		cmpIsCompPage() {
			return this.navActive === config.NAV_KEY_COMP;
		},
		cmpShowH5() {
			return (
				this.navActive === config.NAV_KEY_COMP ||
				config.SHOW_H5_PAGE.find((item) => this.activeName.indexOf(item) > -1)
			);
		},
	},
	watch: {
		activeName: {
			handler(v, old) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					if (v && mdMap[v]) {
						this.viewContent(mdMap[v]);
					}
					// 加载预览地址
					const com = vueMap[v];
					this.isComponent = !!com;
					let src = '';
					if (com) {
						// 如果是组件，获取组件预览地址
						const name = v.slice(4);
						src = `/mp/${name}-demo/${name}-demo`;
					} else {
						src = '/mp/index/index';
					}
					// 自定义主题打开小程序
					if (v.includes('自定义主题')) {
						src = `/mp/color-demo/color-demo`;
					}
					if (this.iframeUrl === src) return;
					// #ifdef H5
					this.$nextTick(() => {
						this.iframeUrl = src;
					});
					// #endif
				}, 20);
			},
			immediate: true,
		},
	},
	onLoad({ name }) {
		if (name && name !== this.activeName) {
			this.activeName = name;
			this.loadNavFromActiveName();
		}
	},
	async onShow() {
		const uuid = this.initUUID();
		this.commentParams.uuid = uuid;
	},
	methods: {
		initUUID() {
			let uuid = uni.getStorageSync('uuid');
			if (uuid) return uuid;
			uuid = Date.now().toString(32);
			for (let i = 0; i < 10; i++) {
				uuid += Math.floor(Math.random() * 32).toString(32);
			}
			uni.setStorageSync('uuid', uuid);
			return uuid;
		},
		viewContent(url) {
			this.content = '';
			this.loadingMd = false;
			// 加载文档
			uni.request({ url }).then(async (res) => {
				if (this.cmpIsCompPage) {
					this.getContentViews(res.data);
				} else {
					this.content = await md2html(res.data);
					this.bindMdEvents();
				}
				this.scrollContentToTop();
			});
		},
		toView(key, lock) {
			if (lock && !this.cmpLock) {
				this.showPopup = true;
				this.key = key;
				return;
			}
			this.activeName = key;
			this.compNavActive = config.NAV_COMP_KEY_DEMO;
			// 修改URL地址参数，不刷新当前页面
			history.replaceState({}, '', `/pc/index/index?name=${key}`);
		},
		setAdminPwd() {
			if (this.popupPwd === config.AdminPwd) {
				uni.setStorageSync('admin-lock', 'true');
				this.adminLock = 'true';
				this.showPopup = false;
				this.activeName = this.key;

				this.navActive = this.groupKey;
				this.datas = this.tmpGroupData;
				// 修改URL地址参数，不刷新当前页面
				history.replaceState({}, '', `/pc/index/index?name=${this.key}`);
				return;
			}
			uni.showToast({
				title: '密码不正确',
				icon: 'none',
			});
		},
		// 组件文档页导航切换
		handleCompNavChange(item) {
			if (item.key === config.NAV_COMP_KEY_DEMO) {
				this.compContent = this.contentViews[1];
				this.bindMdEvents();
			} else if (item.key === config.NAV_COMP_KEY_API) {
				this.compContent = this.contentViews[2];
				this.bindMdEvents();
			} else if (item.key === config.NAV_COMP_KEY_GUIDE) {
				this.compContent = this.contentViews[3];
				this.bindMdEvents();
			} else {
				this.compContent = '';
			}
		},
		// 顶部导航切换
		handleHeaderNavChange(item) {
			const tmpData = groupData[item.key];
			const first = tmpData[0];

			if (first.lock && !this.cmpLock) {
				this.showPopup = true;
				this.key = first.children[0].key;
				this.groupKey = item.key;
				this.tmpGroupData = tmpData;
				return;
			}
			this.datas = tmpData;
			this.toView(first.children[0].key, first.lock);
		},
		loadNavFromActiveName() {
			if (this.activeName.indexOf('ste') > -1) {
				this.navActive = config.NAV_KEY_COMP;
				this.datas = groupData[config.NAV_KEY_COMP];
			} else if (this.activeName.indexOf('devGuide') > -1) {
				this.navActive = config.NAV_KEY_DEV_GROUP;
				this.datas = groupData[config.NAV_KEY_DEV_GROUP];
			} else if (this.activeName.indexOf('handbook') > -1) {
				this.navActive = config.NAV_KEY_DEV;
				this.datas = groupData[config.NAV_KEY_DEV];
			}
		},
		getContentViews(str) {
			splitCompMarkdown(str).then((res) => {
				this.contentViews = res;
				this.compContent = this.contentViews[1];
				// 绑定事件
				this.bindMdEvents();
			});
		},
		handleContentScroll(e) {
			this.contentOldScrollTop = e.detail.scrollTop;
		},
		scrollContentToTop() {
			// 解决view层不同步的问题
			this.contentScrollTop = this.contentOldScrollTop;
			setTimeout(() => {
				this.contentScrollTop = 0;
			}, 200);
		},
		async copy(btn) {
			// #ifdef H5
			try {
				const data = btn.getAttribute('content');
				uni.setClipboardData({
					data,
					showToast: false,
					success: function () {
						btn.innerText = '复制成功';
						btn.disabled = true;
						setTimeout(() => {
							btn.innerText = '复制';
							btn.disabled = false;
						}, 1000);
					},
					fail: function () {
						btn.innerText = '复制失败';
						btn.disabled = true;
						setTimeout(() => {
							btn.innerText = '复制';
							btn.disabled = false;
						}, 1000);
					},
				});
			} catch (err) {
				console.error('无法复制文本: ', err);
			}
			// #endif
		},
		scrollToView($event, ele) {
			// #ifdef WEB
			$event.preventDefault();
			if (ele) {
				ele.scrollIntoView({ behavior: 'smooth' });
			}
			// #endif
		},
		bindMdEvents() {
			// #ifdef H5
			this.$nextTick(() => {
				this.loadingMd = true;
				document.querySelectorAll('.code-copy-button').forEach((btn) => {
					btn.addEventListener('click', () => this.copy(btn));
				});

				document.querySelectorAll('.header-anchor').forEach((ele) => {
					ele.addEventListener('click', (e) => this.scrollToView(e, ele));
				});
			});
			// #endif
		},
	},
};
</script>

<style lang="scss" scoped>
.pc-page-body {
	width: 100vw;
	height: 100vh;
	min-width: 1200px;
	overflow: hidden;
	.pc-page-header {
		height: var(--pc-header-nav-height);
		padding: 0 48px;
		box-shadow: 0 4px 8px #0000000d, inset 0 -1px 0 #dcdfe6;
		background-image: radial-gradient(transparent 1px, #fff 1px);
		position: fixed;
		top: 0;
		z-index: 99999;
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: space-between;
		.left {
			.logo {
				width: 50px;
			}
			.logo-text {
				font-size: 28px;
				font-weight: bold;
			}
			display: flex;
			align-items: center;
		}
		.right {
			display: flex;
			align-items: center;
		}
	}
	.pc-page-content {
		overflow-y: hidden;
		margin-top: var(--pc-header-nav-height);
		width: 100%;
		height: calc(100% - var(--pc-header-nav-height));
		display: flex;
		flex-direction: row;
		background-color: #fff;
		position: relative;

		.pc-nav {
			padding: 48px;
			height: 100%;
			border-right: 1px solid #ddd;
			// padding: 8px 0;
			overflow-y: auto;
			min-width: var(--pc-nav-width);
			max-width: var(--pc-nav-width);
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 1;
			background-color: #ffffff;
			&:hover {
				&::-webkit-scrollbar-thumb {
					background-color: #dddee0;
				}
			}

			.group:not(:first-child) {
				padding-top: 0;
			}

			.group {
				> .name {
					font-weight: bold;
					font-size: 16px;
					padding: 24px 0 0 8px;
					line-height: 28px;
				}
			}

			.nav-item {
				cursor: pointer;
				border-radius: 8px;
				.name {
					padding: 10px 16px;
					margin: 4px 0;
					font-size: 13px;
					line-height: 20px;
					color: #606266;
				}

				&:hover {
					background-color: #f2f4f7;
					.name {
						color: var(--pc-main-color);
					}
				}
				&.active {
					background: rgba(64, 158, 255, 0.1);
					font-weight: bold;
					.name {
						color: var(--pc-main-color);
					}
				}
			}
		}

		.pc-content {
			width: 100%;
			padding-left: calc(var(--pc-nav-width) + 32px);
			padding-right: calc(var(--pc-view-width) + var(--pc-padding) + 20px);
			overflow: auto;
			padding-top: 30px;
			&:hover {
				&::-webkit-scrollbar-thumb {
					background-color: #dddee0;
				}
			}
			.markdown-view {
				padding: 10px var(--pc-padding);
				padding-bottom: 0;
			}
		}
		@media (max-width: 1100px) {
			.pc-content {
				padding-right: calc(-8px + var(--pc-view-width));
			}
		}

		.pc-view {
			position: fixed;
			z-index: 10;
			top: calc(var(--pc-header-nav-height) + 32px);
			right: 20px;
			width: calc(var(--pc-view-width) + 28px);
			min-width: calc(var(--pc-view-width) + 28px);
			height: calc(var(--pc-view-height));
			padding: 50px 14px 30px;
			overflow: hidden;
			border-radius: 16px;
			background-image: url(./iPhone13.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;

			.view-iframe {
				width: 100%;
				height: 100%;
				border-radius: 0 0 20px 20px;
			}
		}

		.popup-view {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 99;
			display: flex;
			align-items: center;
			justify-content: center;
			.popup-content {
				padding: 20px 30px;
				background-color: #fff;
				border-radius: 4px;
				input {
					height: 40px;
					padding: 0 10px;
					line-height: 40px;
					border: 1px solid #ddd;
				}
				.popup-btn {
					margin-top: 20px;
					width: 100%;
					text-align: right;
					button + button {
						margin-left: 10px;
					}
				}
			}
		}
	}
}
</style>

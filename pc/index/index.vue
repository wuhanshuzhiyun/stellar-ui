<template>
	<view class="pc-page-body">
		<view class="pc-page-header">
			您正在浏览基于 Vue 2.x 的文档;
			<a href="https://stellar-ui.intecloud.com.cn/plus" target="_blank">点击查看Vue 3.x版本。</a>
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
			<view class="pc-content">
				<view v-html="content" class="markdown-view"></view>
				<commentVue v-if="isComponent && loadingMd" :activeName="activeName" :isComponent="isComponent" />
			</view>
			<view class="pc-view">
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
import { mdMap, vueMap, datas } from '../markdown/index.js';
import md2html from './md2html.js';
import config from '@/common/config.js';
import request from '@/common/request.js';
import commentVue from './components/comment.vue';
import { getInfo } from '@/common/account.js';
import './mdStyle.scss';

let timeout = 0;

export default {
	components: { commentVue },
	data() {
		return {
			content: '',
			activeName: 'handbook-介绍',
			datas,
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
		};
	},
	computed: {
		cmpIframeUrl() {
			return `${this.iframeUrl}?t=${Date.now()}`;
		},
		cmpLock() {
			return this.adminLock === 'true';
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
				this.content = await md2html(res.data);
				// 渲染完成后，为所有的代码按钮加载复制功能
				// #ifdef H5
				this.$nextTick(() => {
					this.loadingMd = true;
					document.querySelectorAll('.code-copy-button').forEach((btn) => {
						btn.addEventListener('click', () => this.copy(btn));
					});
				});
				// #endif
			});
		},
		toView(key, lock) {
			if (lock && !this.cmpLock) {
				this.showPopup = true;
				this.key = key;
				return;
			}
			this.activeName = key;
			// 修改URL地址参数，不刷新当前页面
			history.replaceState({}, '', `/pc/index/index?name=${key}`);
		},
		setAdminPwd() {
			if (this.popupPwd === config.AdminPwd) {
				uni.setStorageSync('admin-lock', 'true');
				this.adminLock = 'true';
				this.showPopup = false;
				this.activeName = this.key;
				// 修改URL地址参数，不刷新当前页面
				history.replaceState({}, '', `/pc/index/index?name=${this.key}`);
				return;
			}
			uni.showToast({
				title: '密码不正确',
				icon: 'none',
			});
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
	},
};
</script>

<style lang="scss" scoped>
.pc-page-body {
	width: 100vw;
	height: 100vh;
	min-width: 1200px;
	.pc-page-header {
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #eee;
		width: 100%;
		background-color: #409eff;
		a {
			color: #fff;
			font-weight: bold;
		}
	}
	.pc-page-content {
		width: 100%;
		height: calc(100% - 30px);
		display: flex;
		flex-direction: row;
		background-color: #fff;
		position: relative;
		.pc-nav {
			height: 100%;
			border-right: 1px solid #ddd;
			padding: 8px 0;
			overflow-y: auto;
			min-width: var(--pc-nav-width);
			max-width: var(--pc-nav-width);
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 1;
			background-color: #ffffff;

			.group {
				.name {
					font-weight: bold;
					font-size: 16px;
					padding: 24px 0 0 24px;
					line-height: 28px;
				}
			}

			.nav-item {
				cursor: pointer;

				.name {
					font-weight: 400;
					padding: 6px 0 6px 24px;
					margin: 4px 0;
					font-size: 14px;
					line-height: 20px;
				}

				&:hover,
				&.active {
					color: #1989fa;
				}

				&.active {
					.name {
						font-weight: bold;
					}
				}
			}
		}

		.pc-content {
			width: 100%;
			padding-left: var(--pc-nav-width);
			padding-right: calc(var(--pc-view-width) + var(--pc-padding) + 20px);
			overflow: auto;

			.markdown-view {
				padding: 12px var(--pc-padding);
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
			top: 50%;
			transform: translateY(-50%);
			right: var(--pc-padding);
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

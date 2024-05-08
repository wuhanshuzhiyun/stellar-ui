<template>
	<view class="pc-page-body">
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
			<view v-show="isComment && isComponent && loadingMd" class="comment-view">
				<view class="comment-title">意见反馈</view>
				<input class="user-input" placeholder="姓名" v-model="commentParams.user" maxlength="8" />

				<textarea
					class="comment-input"
					v-model="commentParams.content"
					rows="10"
					placeholder="反馈意见"
					maxlength="500"
				/>
				<view class="button-box">
					<view class="code-message">
						查看验证码
						<view class="code-img">
							<view class="img-box">
								<img :src="cmpImage" />
							</view>
							<view class="code-uuid">UUID:{{ commentParams.uuid }}</view>
						</view>
					</view>
					<input
						class="code-input"
						placeholder="验证码"
						v-model="commentParams.code"
						maxlength="6"
						style="width: 120px"
					/>
					<button type="primary" style="width: 120px; height: 32px; line-height: 32px" @click="setComment">
						提交
					</button>
				</view>
				<view class="comment-list" v-show="commentList.length">
					<view class="comment-item" v-for="item in commentList" :key="item.id">
						<view class="comment-head">
							<text class="head-user" v-if="item.user">{{ item.user }}</text>
							<text class="head-time">{{ item.time }}</text>
						</view>
						<view class="comment-content">
							{{ item.conents }}
						</view>
					</view>
				</view>
			</view>
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
</template>

<script>
import { mdMap, vueMap, datas } from '../markdown/index.js';
import md2html from './md2html.js';
import config from '@/common/config.js';
import request from '@/common/request.js';
import './mdStyle.scss';

let timeout = 0;

export default {
	data() {
		return {
			content: '',
			activeName: 'handbook-介绍',
			datas,
			isComment: false,
			commentList: [],
			isComponent: false,
			loadingMd: false,
			commentParams: {
				uuid: '',
				code: '',
				user: '',
				content: '',
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
		cmpImage() {
			if (!this.commentParams.uuid) return '';
			return `${config.BASE_URL}/api/wxcode?uuid=${this.commentParams.uuid}`;
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
						this.getComment(v);
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
	onShow() {
		const uuid = this.initUUID();
		this.commentParams.uuid = uuid;
		console.log(this.datas);
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
				console.log('html-length', this.content.length);
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
		getComment(name) {
			uni.request({
				url: `${config.BASE_URL}/api/list?name=${name}`,
				success: ({ data }) => {
					if (data.code === 0) {
						this.commentList = data.data.reverse();
						this.commentParams.content = '';
						this.commentParams.user = '';
						this.commentParams.code = '';
						this.isComment = true;
					}
				},
			});
		},
		setComment() {
			if (!this.commentParams.content) {
				uni.showToast({ title: '请输入反馈意见', icon: 'none' });
				return;
			}
			if (!this.commentParams.code) {
				uni.showToast({ title: '请输入验证码', icon: 'none' });
				return;
			}
			uni.request({
				url: `${config.BASE_URL}/api/create`,
				data: Object.assign({ name: this.activeName }, this.commentParams),
				method: 'POST',
				success: ({ data }) => {
					if (data.code === 0) {
						this.getComment(this.activeName);
						uni.showToast({
							title: '提交完成',
						});
						return;
					} else if (data.code === 401) {
						uni.showToast({ title: `内容涉及${data.message}信息，请修改后重新评论`, icon: 'none' });
					} else {
						uni.showToast({ title: data.message, icon: 'none' });
					}
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.pc-page-body {
	width: 100vw;
	height: 100vh;
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

		.markdown-view,
		.comment-view {
			padding: 12px var(--pc-padding);
		}
		.comment-view {
			border-top: 1px solid #ddd;
			.comment-title {
				font-size: 20px;
				font-weight: 600;
				border-left: 4px solid #1989fa;
				padding-left: 5px;
			}
			.comment-input,
			.user-input {
				margin-top: 12px;
				border: 1px solid #ddd;
				padding: 5px;
				border-radius: 4px;
			}
			.user-input {
				height: 32px;
			}
			.comment-input {
				width: 100%;
			}
			.button-box {
				margin-top: 12px;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.code-message {
					height: 32px;
					border-radius: 4px;
					display: flex;
					align-items: center;
					font-size: 12px;
					color: #1989fa;
					cursor: pointer;
					position: relative;

					.code-img {
						// 阴影
						box-shadow: 0 0 10px #ddd;
						display: none;
						position: absolute;
						z-index: 10;
						left: 0;
						bottom: 32px;
						width: 200px;
						height: 200px;
						background: #fff;
						text-align: center;
						border-radius: 4px;
						padding: 15px 30px 0 30px;

						.img-box {
							width: 100%;
							img {
								width: 100%;
							}
						}
						.code-uuid {
							margin-top: 5px;
						}
					}
					&:hover {
						.code-img {
							display: block;
						}
					}
				}
				.code-input {
					border: 1px solid #ddd;
					padding: 5px;
					border-radius: 4px;
					height: 32px;
					margin: 0 12rpx;
				}
			}
			.comment-list {
				border: 1px solid #ddd;
				padding: 12px;
				margin-top: 12px;
				.comment-item {
					& + .comment-item {
						border-top: 1px solid #ddd;
						margin-top: 12px;
						padding-top: 12px;
					}
					.comment-head {
						.head-user {
							font-zise: 18px;
							padding-right: 5px;
						}
						.head-time {
							font-size: 12px;
							color: #aaa;
						}
					}
					.comment-content {
						margin-top: 5px;
						font-size: 14px;
						color: #666;
					}
				}
			}
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
		top: 20px;
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
</style>
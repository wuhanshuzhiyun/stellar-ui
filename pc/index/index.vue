<template>
	<view class="pc-page-body">
		<view class="pc-nav">
			<view class="group" v-for="group in datas" :key="group.key">
				<view class="name">
					{{ group.title }}
				</view>
				<view class="nav-children" v-if="group.children">
					<view
						class="nav-item"
						v-for="nav in group.children"
						:key="nav.key"
						:class="activeName === nav.key ? 'active' : ''"
						@click="toView(nav.key)"
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
			<view v-show="isComponent" class="comment-view">
				<view class="comment-title">意见反馈</view>
				<input class="user-input" placeholder="姓名" v-model="commentParams.user" maxlength="8" />
				<textarea
					class="comment-input"
					v-model="commentParams.content"
					rows="10"
					placeholder="反馈意见"
					maxlength="300"
				/>
				<ste-button style="margin-top: 12px" type="primary" @click="setComment">提交</ste-button>
				<view class="comment-list" v-show="commentList.length">
					<view class="comment-item" v-for="item in commentList" :key="item.id">
						<view class="comment-head">
							<text class="head-user" v-if="item.user">{{ item.user }}</text>
							<text class="head-time">{{ item.time }}</text>
						</view>
						<view class="comment-content">
							{{ item.content }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pc-view">
			<iframe class="view-iframe" :src="viewUrl" frameborder="0" />
		</view>
	</view>
</template>

<script>
import { mdMap, vueMap, datas } from './mdFiles.js';
import md2html from './md2html.js';
import './mdStyle.scss';

const baseUrl = 'http://172.16.114.51:3000';

let timeout = 0;

export default {
	data() {
		return {
			content: '',
			activeName: '介绍',
			datas,
			viewUrl: '/mp/index/index',
			commentList: [],
			isComponent: false,
			commentParams: {
				user: '',
				content: '',
			},
		};
	},
	watch: {
		activeName: {
			handler(v) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					if (v && mdMap[v]) {
						this.viewContent(mdMap[v]);
					}
					// 加载预览地址
					const com = vueMap[v];
					this.isComponent = !!com;
					let src = '/mp/index/index';
					if (com) {
						// 如果是组件，获取组件预览地址
						const name = v.slice(4);
						src = `/mp/${name}-demo/${name}-demo`;
						this.getComment(v);
					}
					if (this.viewUrl === src) return;
					this.$nextTick(() => {
						this.viewUrl = src;
					});
				}, 100);
			},
			immediate: true,
		},
	},
	onLoad({ name }) {
		if (name) {
			this.activeName = name;
		}
	},
	methods: {
		viewContent(url) {
			this.content = '';
			// 加载文档
			uni.request({
				url,
			}).then(async (res) => {
				this.content = await md2html(res.data);
				// 渲染完成后，为所有的代码按钮加载复制功能
				this.$nextTick(() => {
					document.querySelectorAll('.code-copy-button').forEach((btn) => {
						btn.addEventListener('click', () => this.copy(btn));
					});
				});
			});
		},
		toView(key) {
			this.activeName = key;
			// 修改URL地址参数，不刷新当前页面
			history.replaceState({}, '', `/pc/index/index?name=${key}`);
		},
		async copy(btn) {
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
		},
		getComment(name) {
			uni.request({
				url: `${baseUrl}/list?name=${name}`,
				success: ({ data }) => {
					if (data.code === 0) {
						this.commentList = data.data.reverse();
						this.commentParams.content = '';
						this.commentParams.user = '';
					}
				},
			});
		},
		setComment() {
			uni.request({
				url: `${baseUrl}/create`,
				data: Object.assign({ name: this.activeName }, this.commentParams),
				method: 'POST',
				success: ({ data }) => {
					if (data.code === 0) {
						this.getComment(this.activeName);
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
				height: 30px;
			}
			.comment-input {
				width: 100%;
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
}
</style>

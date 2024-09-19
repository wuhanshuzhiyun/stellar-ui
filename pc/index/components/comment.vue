<template>
	<view class="comment-body">
		<view class="comment-title">意见反馈</view>
		<block v-if="userInfo">
			<input class="user-input" placeholder="标题" v-model="commentParams.title" maxlength="8" />

			<textarea
				class="comment-input"
				v-model="commentParams.content"
				rows="10"
				placeholder="反馈意见"
				maxlength="500"
			/>
			<view class="button-box">
				<view>
					<text class="user-name">{{ userInfo.nickname }}</text>
				</view>
				<button
					type="primary"
					style="width: 120px; height: 32px; line-height: 32px"
					:loading="isAjax"
					@click="setComment"
				>
					提交
				</button>
			</view>
		</block>
		<view class="not-login" v-else>
			<view class="to-login">
				<text class="btn" @click="toLogin">登录</text>
				后可提交意见
			</view>
		</view>
		<view class="comment-list" v-if="commentList.length">
			<view class="comment-item" v-for="item in commentList" :key="item.id">
				<view class="comment-head-title">
					<text class="head-user">{{ item.title }}</text>
					<text class="head-time">{{ item.time }}</text>
				</view>
				<view class="comment-head-user">
					<image class="avatar" :src="item.Account.avatar_url" mode="widthFix" />
					<text class="head-user">{{ item.Account.nickname }}</text>
				</view>

				<view class="comment-content">
					{{ item.content }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getInfo } from '@/common/account.js';
import request from '@/common/request.js';
import dayjs from 'dayjs';
export default {
	props: {
		activeName: {
			type: String,
			default: '',
		},
		isComponent: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			commentList: [],
			commentParams: {
				title: '',
				content: '',
				versions: 2,
			},
			userInfo: null,
			isAjax: false,
		};
	},
	watch: {
		isComponent: {
			handler(v) {
				if (!v) return;
				this.getComment(this.activeName);
			},
			immediate: true,
		},
	},
	async mounted() {
		this.userInfo = await getInfo(1);
	},
	methods: {
		toLogin() {
			uni.navigateTo({
				url: `/pc/index/login?back=${this.activeName}`,
			});
		},
		getComment(document_name) {
			request('/api/comments/list', { document_name, versions: this.commentParams.versions }).then((data) => {
				this.isComment = true;
				this.commentList = data.map((item) =>
					Object.assign(item, { time: dayjs(item.create_at).format('YYYY-MM-DD HH:mm:ss') })
				);
			});
		},
		setComment() {
			if (!this.commentParams.title) {
				uni.showToast({ title: '请输入标题', icon: 'none' });
				return;
			}
			if (!this.commentParams.content) {
				uni.showToast({ title: '请输入反馈意见', icon: 'none' });
				return;
			}
			if (this.isAjax) return;
			this.isAjax = true;
			request('/api/comments/append', Object.assign(this.commentParams, { document_name: this.activeName }), 'POST')
				.then((data) => {
					this.isAjax = false;
					uni.showToast({
						title: '评论成功',
						icon: 'none',
					});
					this.getComment(this.activeName);
					this.commentParams.title = '';
					this.commentParams.content = '';
				})
				.catch(() => {
					this.isAjax = false;
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.comment-body {
	padding: 12px var(--pc-padding);
	border-top: 1px solid #ddd;
	border-right: 1px solid #ddd;

	.comment-title {
		font-size: 20px;
		font-weight: 600;
		border-left: 4px solid #1989fa;
		padding-left: 5px;
	}
	.not-login {
		height: 240px;
		font-size: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		.to-login {
			height: 60rpx;
			line-height: 60rpx;
			cursor: pointer;
			.btn {
				color: #1989fa;
			}
		}
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
		justify-content: space-between;
		.user-name {
			color: #666;
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
			.comment-head-title {
				display: flex;
				align-items: flex-end;
				.head-time {
					font-size: 12px;
					color: #aaa;
					margin-left: 10px;
				}
			}
			.comment-head-user {
				display: flex;
				align-items: center;
				height: 40px;
				.avatar {
					width: 24px;
					height: 24px;
					margin-right: 5px;
				}
				.head-user {
					font-zise: 18px;
					padding-right: 6px;
					color: #666;
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
</style>

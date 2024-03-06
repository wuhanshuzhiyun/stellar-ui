<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="图标"></page-nav>
		<view class="content">
			<view class="tabs">
				<view class="tab1-title" :class="{ actived: tabIndex === 0 }" @click="tabIndex = 0">用法示例</view>
				<view class="tab2-title" :class="{ actived: tabIndex === 1 }" @click="tabIndex = 1">图标库</view>
			</view>
			<view v-if="tabIndex === 0" class="tab1-content">
				<view class="demo-item">
					<view class="title">基础用法</view>
					<view class="item-block" style="justify-content: flex-start">
						<ste-icon code="&#xe653;" size="60"></ste-icon>
					</view>
				</view>
				<view class="demo-item">
					<view class="title">图标颜色</view>
					<view class="item-block" style="justify-content: flex-start">
						<ste-icon code="&#xe64b;" color="#1989fa" size="60" marginRight="30"></ste-icon>
						<ste-icon code="&#xe64b;" color="#ee0a24" size="60"></ste-icon>
					</view>
				</view>
				<view class="demo-item">
					<view class="title">图标大小</view>
					<view class="item-block" style="justify-content: flex-start">
						<ste-icon code="&#xe628;" marginRight="30"></ste-icon>
						<ste-icon code="&#xe628;" marginRight="30" size="50"></ste-icon>
						<ste-icon code="&#xe628;" marginRight="30" size="70"></ste-icon>
					</view>
				</view>
				<view class="demo-item">
					<view class="title">图标是否粗体</view>
					<view class="item-block" style="justify-content: flex-start">
						<ste-icon code="&#xe628;" marginRight="30"></ste-icon>
						<ste-icon code="&#xe628;" bold></ste-icon>
					</view>
				</view>
			</view>
			<view v-if="tabIndex === 1" class="tab2-content">
				<view class="demo-item">
					<view class="item-block">
						<view v-for="item in glyphs" class="icon-item" @click="copy(item.unicode)">
							<view class="icon-content">
								<ste-icon :code="item.unicode" :size="40"></ste-icon>
							</view>
							<view class="icon-name">{{ item.name }}</view>
							<view class="icon-unicode">{{ item.unicode }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			iconUrl:
				'https://at.alicdn.com/t/c/font_4041637_ufl38b5x4g.json?spm=a313x.manage_type_myprojects.i1.24.28273a814UZfaX&file=font_4041637_ufl38b5x4g.json',
			glyphs: [],
			tabIndex: 0,
		};
	},
	onReady() {},
	onLoad() {
		uni.request({
			url: this.iconUrl,
			success: (res) => {
				this.glyphs = res.data.glyphs;
				this.glyphs.forEach((item) => {
					item.unicode = '&#x' + item.unicode + ';';
				});
			},
		});
	},
	methods: {
		copy(data) {
			uni.setClipboardData({
				data,
				showToast: false,
				success: function () {
					uni.showToast({
						icon: 'none',
						title: 'code复制到剪切板',
					});
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.demo-item {
	margin-bottom: 16px;

	.title {
		font-size: 14px;
		color: #8f9ca2;
		margin-bottom: 8px;
	}

	.item-block {
		display: flex;
		flex-wrap: wrap;
		row-gap: 60rpx;
		justify-content: center;
		align-items: center;

		.icon-item {
			width: 25%;

			.icon-content {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				padding-bottom: 20rpx;
			}

			.icon-name {
				text-align: center;
				overflow: hidden;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 28rpx;
			}

			.icon-unicode {
				font-size: 28rpx;
				text-align: center;
			}
		}
	}
}

.tabs {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: nowrap;
	height: 70rpx;
	border-bottom: 1px solid #eee;
	margin-bottom: 20rpx;
	.tab1-title,
	.tab2-title {
		width: 50%;
		text-align: center;
		font-size: 32rpx;
	}
	.actived {
		font-weight: bold;
	}
}
</style>

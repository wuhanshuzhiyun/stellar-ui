<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="图标对齐预览"></page-nav>
		<view class="content">
			<view class="font-title">字体地址</view>
			<view class="font-sample">
				<view>例子：</view>
				<view>
					/*
					在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。
					*/ @font-face { font-family: 'iconfont'; /* Project id 4041637 */ src:
					url('//at.alicdn.com/t/c/font_4041637_mw0hzcz34fq.woff2?t=1710296259155') format('woff2'),
					url('//at.alicdn.com/t/c/font_4041637_mw0hzcz34fq.woff?t=1710296259155') format('woff'),
					url('//at.alicdn.com/t/c/font_4041637_mw0hzcz34fq.ttf?t=1710296259155') format('truetype'),
					url('//at.alicdn.com/t/c/font_4041637_mw0hzcz34fq.svg?t=1710296259155#iconfont') format('svg'); }
				</view>
			</view>
			<textarea class="font-text-area" v-model="fontUrl" :maxlength="4000" style="height: 1000rpx" />
			<view class="icon-code-title">图标unicode编码</view>
			<view class="icon-code-sample">
				<view>例子：</view>
				<label>&</label>
				<label>#xe901;</label>
				<label>&</label>
				<label>#xea05;</label>
				<label>&</label>
				<label>#xeaffa;</label>
			</view>
			<textarea class="icon-code-text-area" v-model="iconCodeStr" :maxlength="4000" style="height: 200rpx" />
			<button @click="preview">预览</button>
			<view v-if="show" class="preview-box">
				<template v-for="(item, i) in iconCodeList">
					<view>弹性盒子居中</view>
					<view>盒子行高1</view>
					<view>文字、图标32px</view>
					<view class="preview-item" style="display: flex; align-items: center; line-height: 1">
						展
						<ste-icon
							size="32px"
							:fontFamily="fontFamily"
							:code="item"
							color="#FF4500"
							:marginRight="marginRight"
							:showBorder="true"
						></ste-icon>
						示2
						<ste-icon
							size="32px"
							:fontFamily="fontFamily"
							:code="item"
							color="#FF4500"
							:marginRight="marginRight"
							:showBorder="true"
						></ste-icon>
						3a
						<ste-icon
							size="32px"
							:fontFamily="fontFamily"
							:code="item"
							color="#FF4500"
							:marginRight="marginRight"
							:showBorder="true"
						></ste-icon>
						b
					</view>
					<view>弹性盒子居中</view>
					<view>盒子行高(默认)</view>
					<view>文字32px，图标24px</view>
					<view class="preview-item" style="display: flex; align-items: center">
						展
						<ste-icon
							size="18px"
							:fontFamily="fontFamily"
							:code="item"
							color="#FF4500"
							:marginRight="marginRight"
							:showBorder="true"
						></ste-icon>
						示2
						<ste-icon
							size="18px"
							:fontFamily="fontFamily"
							:code="item"
							color="#FF4500"
							:marginRight="marginRight"
							:showBorder="true"
						></ste-icon>
						3a
						<ste-icon
							size="18px"
							:fontFamily="fontFamily"
							:code="item"
							color="#FF4500"
							:marginRight="marginRight"
							:showBorder="true"
						></ste-icon>
						b
					</view>
					<view>非弹性盒子</view>
					<view>盒子行高（默认）</view>
					<view>文字32px，图标一16px，图标二32px</view>
					<view class="preview-item">
						<ste-icon
							size="16px"
							:fontFamily="fontFamily"
							:code="item"
							color="#FF4500"
							:marginRight="marginRight"
							marginTop="0px"
							:showBorder="true"
						></ste-icon>
						展示
						<ste-icon
							size="32px"
							:fontFamily="fontFamily"
							:code="item"
							color="#FF4500"
							:marginRight="marginRight"
							:showBorder="true"
						></ste-icon>
						展示展示展示展示23ab
					</view>
					<view class="gap"></view>
				</template>
				<view>
					<ste-icon
						v-for="(item, i) in iconCodeList"
						:size="48"
						:key="item.icon_id || i"
						:fontFamily="fontFamily"
						:code="item"
						color="#FF4500"
						:marginRight="marginRight"
						:showBorder="showBorder"
					></ste-icon>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			glyphs: [],
			tabIndex: 0,
			showUnicode: true,
			fontFamily: 'ste-' + Math.round(Math.random() * 10000000000),
			fontUrl: ``,
			iconCodeStr: '',
			iconCodeList: [],
			show: false,
			charType: 0,
		};
	},
	onReady() {},
	onLoad() {},
	methods: {
		preview() {
			let text = this.fontUrl;
			const regex = /url\(.*?\)\s*format\(.*?\)(?:,|;|$)/g;
			const matches = text.match(regex);
			if (matches == null) {
				this.$showToast({
					title: '字体地址格式不正确',
					icon: 'none',
				});
				return;
			}
			if (matches.length > 0) {
				const lastMatchIndex = matches.length - 1;
				matches[lastMatchIndex] = matches[lastMatchIndex].replace(/;$/, '');
			}

			const result = matches.join('');

			this.iconCodeList = [];
			this.iconCodeStr.split(';').forEach((item) => {
				if (item !== '') {
					this.iconCodeList.push(item + ';');
				}
			});

			uni.loadFontFace({
				family: this.fontFamily,
				source: this.fontUrl,
				source: result.substr(0, result.length - 1),
				success: (res) => {
					this.show = true;
				},
				fail(err) {
					console.error('err', err);
					this.$showToast({ title: '加载字体失败', icon: 'none' });
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	padding-bottom: 40rpx;
}
.content {
	padding-left: 30rpx;
	padding-right: 30rpx;
	overflow-x: hidden;
}
.font-sample,
.icon-code-sample {
	margin-bottom: 20rpx;
	color: #8b008b;
}
.font-text-area,
.icon-code-text-area {
	border: 1px solid #eee;
	width: 100%;
}

.preview-box {
	font-size: 32rpx;
	.preview-item {
		margin-top: 10rpx;
		border: 1px solid #2f4f4f;
		font-size: 32px;
		vertical-align: middle;
	}
}
.gap {
	height: 1px;
	margin-top: 30rpx;
	margin-bottom: 30rpx;
	background-color: #ffaa00;
}
</style>

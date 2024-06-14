<template>
	<view class="ste-toast-root" v-if="show">
		<view class="base">
			<view class="box">
				<view v-if="icon != 'none' || image" class="icon-box">
					<block v-if="image">
						<ste-image :src="image" :width="72" :height="72" display="block"></ste-image>
					</block>
					<block v-else>
						<ste-icon v-if="icon != 'loading'" :code="cmpIcon" :size="72"></ste-icon>
						<ste-loading v-else :size="72" color="#FFFFFF"></ste-loading>
					</block>
				</view>
				<ste-text clas="title" space="nbsp">{{ title }}</ste-text>
			</view>
		</view>
		<view class="mask" v-if="mask"></view>
	</view>
</template>
<script>
import utils from '../../utils/utils.js';
import useSteToast from './ste-toast.js';
let steToast = useSteToast();
let $state = steToast.$state;
/**
 * ste-toast 轻提示
 * @description 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-toast
 * @property {String} title 提示的内容
 * @property {String} icon 图标 默认值：success
 * @value success 显示成功图标 {String}
 * @value error 显示失败图标 {String}
 * @value loading 显示加载图标 {String}
 * @value none 无图标 {String}
 * @property {String} image 自定义图标的路径，image的优先级高于icon
 * @property {Number} duration 提示的延迟时间，单位ms 默认值：1500，值为 0 时，toast 不会自动消失（loading 类型默认为 0）
 * @property {Boolean} mask 是否显示透明蒙层，防止触摸穿透 默认值：false
 * @event {Function} success 提示打开成功的回调函数
 * @event {Function} fail 提示打开失败的回调函数
 * @event {Function} complete 提示结束的回调函数（提示打开、失败都会执行）
 * @event {Function} close 提示关闭的的回调函数
 */
export default {
	group: '展示组件',
	title: 'Toast 轻提示',
	name: 'ste-toast',
	data() {
		return {
			pageShow: true,
			show: false,
			title: '',
			icon: '',
			image: '',
			duration: '',
			mask: '',
			success: null,
			fail: null,
			complete: null,
			close: null,
			timer: null,
		};
	},
	onPageShow() {
		this.$nextTick(() => {
			this.pageShow = true;
		});
	},
	onPageHide() {
		this.pageShow = false;
		steToast.hideToast();
	},
	computed: {
		cmpIcon() {
			let iconObj = {
				success: '&#xe67a;',
				error: '&#xe67b;',
			};
			return iconObj[this.icon] ?? '';
		},
		openBegin() {
			return $state.openBegin;
		},
	},
	watch: {
		openBegin: {
			handler(newVal) {
				if (newVal && this.pageShow) {
					try {
						clearTimeout(this.timer);
						this.show = newVal;
						this.title = $state.title ?? '';
						this.icon = $state.icon ?? 'success';
						this.image = $state.image ?? '';
						this.duration = $state.duration ?? 1500;
						if (this.icon == 'loading') {
							this.duration = 0;
						}
						this.mask = $state.mask ?? false;
						this.success = $state.success ?? function () {};
						this.fail = $state.fail ?? function () {};
						this.complete = $state.complete ?? function () {};
						this.close = $state.close ?? function () {};
						if (this.duration) {
							this.timer = setTimeout(() => {
								steToast.hideToast();
							}, this.duration);
						}
						this.success();
					} catch (error) {
						this.fail();
					}
					this.complete();
				} else {
					this.show = false;
				}
			},
			immediate: true,
		},
		show: {
			handler(newVal) {
				if (!newVal) {
					this.close();
				}
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-toast-root {
	.base {
		position: fixed;
		text-align: center;
		z-index: 9999;
		top: 40%;
		left: 0;
		transform: translateY(-40%);
		width: 100vw;
	}
	.box {
		max-width: 520rpx;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 16rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #ffffff;
		line-height: 44rpx;
		padding: 40rpx 48rpx;
		word-break: break-all;
		text-align: center;
		margin: 0 auto;
		display: inline-block;
	}
	.icon-box {
		margin-bottom: 24rpx;
		text-align: center;
		display: flex;
		justify-content: center;
	}

	.mask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: transparent;
		z-index: 10000;
		top: 0;
		left: 0;
	}
}
</style>

<template>
	<button
		v-if="stopPropagation"
		class="ste-button--root"
		:disabled="disabled"
		:hover-class="!loading ? 'ste-button--root-active' : ''"
		@click.stop="handleClick"
		:style="[cmpBtnStyle]"
		:open-type="openType"
		:scope="scope"
		@getuserinfo="getuserinfo"
		@getUserInfo="getuserinfo"
		@contact="contact"
		@getphonenumber="getphonenumber"
		@getPhoneNumber="getphonenumber"
		@getrealtimephonenumber="getrealtimephonenumber"
		@agreeprivacyauthorization="agreeprivacyauthorization"
		@error="error"
		@opensetting="opensetting"
		@launchapp="launchapp"
		@chooseavatar="chooseavatar"
		@getAuthorize="getAuthorize"
		@followLifestyle="followLifestyle"
	>
		<view class="btn-box">
			<text v-if="loading">加载中.......</text>
			<slot v-else></slot>
		</view>
	</button>
	<button
		v-else
		class="ste-button--root"
		:disabled="disabled"
		:hover-class="!loading ? 'ste-button--root-active' : ''"
		@click="handleClick"
		:style="[cmpBtnStyle]"
		:open-type="openType"
		:scope="scope"
		@getuserinfo="getuserinfo"
		@getUserInfo="getuserinfo"
		@contact="contact"
		@getphonenumber="getphonenumber"
		@getPhoneNumber="getphonenumber"
		@getrealtimephonenumber="getrealtimephonenumber"
		@agreeprivacyauthorization="agreeprivacyauthorization"
		@error="error"
		@opensetting="opensetting"
		@launchapp="launchapp"
		@chooseavatar="chooseavatar"
		@getAuthorize="getAuthorize"
		@followLifestyle="followLifestyle"
	>
		<view class="btn-box">
			<text v-if="loading">加载中.......</text>
			<slot v-else></slot>
		</view>
	</button>
</template>

<script>
import utils from '../../utils/utils.js';
import useColor from '../../config/color.js';
let color = useColor();
/**
 * ste-button 按钮
 * @description 按钮组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-button
 * @property {Number} mode 尺寸 默认值 200
 * @value 100 小 {Number}
 * @value 200 中 {Number}
 * @value 300 大 {Number}
 * @value 400 超大 {Number}
 * @property {String} color 文本颜色 默认值 #ffffff
 * @property {String} background 背景 默认值 #0091ff
 * @property {String} borderColor 边框颜色
 * @property {Number|String} width 宽度 默认值 auto
 * @value auto 自适应宽度 {String}
 * @value 100% 填满 {String}
 * @value {{Number}}  自适应宽度，单位rpx {Number}
 * @property {Boolean} round 是否圆角按钮 默认 true
 * @property {Boolean} disabled 是否禁用状态 默认 false
 * @property {Boolean} loading 是否加载中状态 默认 false
 * @property {Boolean} stopPropagation 是否阻止冒泡行为 默认 false
 * @property {String} openType 微信开放能力和支付宝开放能力
 * @property {String} scope 支付宝开放能力，当 openType 为 getAuthorize 时有效
 * @property {Object} rootStyle 按钮样式属性
 * @event {Function} click 非禁止并且非加载中，才能点击
 * @event {Function} getuserinfo 微信小程序：用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 wx.getUserInfo。支付宝小程序：当 open-type 为 getAuthorize 且 scope 为 userInfo 时有效。当授权成功时触发。
 * @event {Function} contact 微信小程序：客服消息回调，open-type="contact"时有效。
 * @event {Function} getphonenumber 微信小程序：手机号快速验证回调，open-type=getPhoneNumber时有效。Tips：在触发 bindgetphonenumber 回调后应立即隐藏手机号按钮组件，或置为 disabled 状态，避免用户重复授权手机号产生额外费用。支付宝小程序：当 open-type 为 getAuthorize 且 scope 为 phoneNumber 时有效。当授权成功时触发。
 * @event {Function} getrealtimephonenumber 微信小程序：手机号实时验证回调，open-type=getRealtimePhoneNumber 时有效。Tips：在触发 bindgetrealtimephonenumber 回调后应立即隐藏手机号按钮组件，或置为 disabled 状态，避免用户重复授权手机号产生额外费用。
 * @event {Function} agreeprivacyauthorization 微信小程序：用户同意隐私协议事件回调，open-type=agreePrivacyAuthorization时有效 （Tips: 如果使用 onNeedPrivacyAuthorization 接口，需要在 bindagreeprivacyauthorization 触发后再调用 resolve({ event: "agree", buttonId })）
 * @event {Function} error 微信小程序：当使用开放能力时，发生错误的回调，open-type=launchApp时有效 支付宝小程序：当 open-type 为 getAuthorize 时有效。当授权失败时触发。event.detail = {type, errorMessage}，此时 type 的值为 getAuthorize。
 * @event {Function} launchapp 微信小程序：打开 APP 成功的回调，open-type=launchApp时有效
 * @event {Function} opensetting 微信小程序：在打开授权设置页后回调，open-type=openSetting时有效
 * @event {Function} chooseavatar 微信小程序：获取用户头像回调，open-type=chooseAvatar时有效。返回 e.detail.avatarUrl 为头像临时文件链接。
 * @event {Function} getAuthorize 支付宝小程序：当 open-type 为 getAuthorize 时有效。当授权成功时触发。
 * @event {Function} followLifestyle 支付宝小程序：当 open-type 为 lifestyle 时有效。当点击按钮时触发。event.detail = { followStatus }，folllowStatus 合法值有 1、2、3，其中 1 表示已关注。2 表示用户不允许关注。3 表示发生未知错误；。
 */
export default {
	group: '基础组件',
	title: 'Button 按钮',
	name: 'ste-button',
	props: {
		mode: {
			type: [Number, String, null],
			default: 200,
		},
		color: {
			type: [String, null],
			default: '#ffffff',
		},
		background: {
			type: [String, null],
			default: '',
		},
		borderColor: {
			type: [String, null],
			default: '',
		},
		width: {
			type: [String, Number, null],
			default: 'auto',
		},
		round: {
			type: [Boolean, null],
			default: true,
		},
		disabled: {
			type: [Boolean, null],
			default: false,
		},
		loading: {
			type: [Boolean, null],
			default: false,
		},
		openType: {
			type: [String, null],
			default: '',
		},
		scope: {
			type: [String, null],
			default: '',
		},
		rootStyle: {
			type: [Object, null],
			default: () => {},
		},
		stopPropagation: {
			type: [Boolean, null],
			default: true,
		},
	},
	data() {
		return {};
	},
	created() {},
	computed: {
		cmpBtnStyle() {
			let style = {};
			// 为解决支付宝动态类名时不兼容，尽量使用内联样式

			// 圆角 round
			if (this.round) {
				style.borderRadius = utils.formatPx(48);
			}

			// 宽度 width
			if (this.width == '100%' || this.width == 'auto') {
				style.width = this.width;
			} else {
				style.width = utils.formatPx(this.width);
			}

			// 边框色 borderColor
			if (this.borderColor) {
				style.border = `solid ${utils.formatPx(2)}`;
				style.borderColor = this.borderColor;
			}

			// 类型 mode
			switch (this.mode) {
				case 100:
					style.padding = `0 ${utils.formatPx(30)}`;
					style.height = utils.formatPx(48);
					style.fontSize = '24rpx';
					break;
				case 300:
					style.padding = `0 ${utils.formatPx(72)}`;
					style.height = utils.formatPx(80);
					style.fontSize = '32rpx';
					break;
				case 400:
					style.padding = `0 ${utils.formatPx(72)}`;
					style.height = utils.formatPx(96);
					style.fontSize = '36rpx';
					break;
				default:
					style.padding = `0 ${utils.formatPx(40)}`;
					style.height = utils.formatPx(68);
					style.fontSize = '28rpx';
					break;
			}

			// 背景色 & 字体色
			style = { ...style, ...utils.bg2style(this.background ? this.background : color.getColor().steThemeColor) };
			style.color = this.color;

			// 禁用 disabled | 加载 loading
			// #ifdef H5
			if (this.disabled || this.loading) {
				style.cursor = 'not-allowed';
			}
			// #endif
			if (this.disabled) {
				style.opacity = 0.5;
			}
			return utils.deepMerge(style, this.rootStyle);
		},
	},
	methods: {
		handleClick(e) {
			if (!this.disabled && !this.loading) {
				this.$emit('click');
			}
		},
		getuserinfo(e) {
			this.$emit('getuserinfo', e);
		},
		contact(e) {
			this.$emit('contact', e);
		},
		getphonenumber(e) {
			this.$emit('getphonenumber', e);
		},
		getrealtimephonenumber(e) {
			this.$emit('getrealtimephonenumber', e);
		},
		greeprivacyauthorization(e) {
			this.$emit('greeprivacyauthorization', e);
		},
		error(e) {
			this.$emit('error', e);
		},
		launchapp(e) {
			this.$emit('launchapp', e);
		},
		opensetting(e) {
			this.$emit('opensetting', e);
		},
		chooseavatar(e) {
			this.$emit('chooseavatar', e);
		},
		getAuthorize(e) {
			this.$emit('getAuthorize', e);
		},
		followLifestyle(e) {
			this.$emit('followLifestyle', e);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-button--root {
	position: relative;
	align-items: center;
	justify-content: center;
	display: inline-flex;
	flex-direction: row;
	box-sizing: border-box;
	flex-direction: row;
	background-size: cover;
	border-radius: 10rpx;

	.btn-box {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&:before {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		border: inherit;
		border-radius: inherit;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		opacity: 0;
		content: ' ';
		background-color: #000;
		border-color: #000;
	}

	&:after {
		border: none;
	}

	&-disabled {
		background: #666666;
		color: #ffffff;

		cursor: not-allowed;
	}

	&-loading {
		cursor: not-allowed;
	}

	&-active {
		&:before {
			opacity: 0.15;
		}
	}

	&-100 {
		padding: 0 30rpx;
		height: 48rpx;
		font-size: 24rpx;
	}

	&-200 {
		padding: 0 40rpx;
		height: 68rpx;
		font-size: 28rpx;
	}

	&-300 {
		padding: 0 72rpx;
		height: 80rpx;
		font-size: 32rpx;
	}

	&-400 {
		padding: 0 72rpx;
		height: 96rpx;
		font-size: 36rpx;
	}
}
</style>

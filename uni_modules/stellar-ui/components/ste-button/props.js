export default {
	props: {
		// 是否细边框
		hairline: {
			type: Boolean,
			default: true
		},
		// 按钮的预置样式，info，primary，error，warning，success
		type: {
			type: String,
			default: 'info'
		},
		// 按钮尺寸，large，normal，small，mini
		size: {
			type: String,
			default: 'normal'
		},
		// 按钮形状，circle（两边为半圆），square（带圆角）
		shape: {
			type: String,
			default: 'square'
		},
		// 按钮是否镂空
		plain: {
			type: Boolean,
			default: false
		},
		// 是否禁止状态
		disabled: {
			type: Boolean,
			default: false
		},
		// 按钮颜色，支持传入linear-gradient渐变色
		color: {
			type: String,
			default: ''
		}
	}
}
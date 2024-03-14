export default {
	props: {
		// 当前激活的选项（支持v-model双向绑定）（类型为number时绑定index，类型为string时绑定name）
		active: {
			type: [Number, String],
			default: () => null,
		},
		// 样式风格类型，可选值为 line  card
		type: {
			type: String,
			default: () => 'line',
		},
		// 是否显示图片
		showImage: {
			type: Boolean,
			default: () => false,
		},
		// 是否显示主标题
		showTitle: {
			type: Boolean,
			default: () => true,
		},
		// 是否显示副标题
		showSubtitle: {
			type: Boolean,
			default: () => false,
		},
		// 主题色（滑块颜色，边框颜色，选中的背景色，激活下拉列表中选项颜色）
		color: {
			type: String,
			default: () => '#0090FF',
		},
		// 背景
		background: {
			type: String,
			default: () => 'none',
		},
		// 动画时间，单位秒，设置为 0 可以禁用动画
		duration: {
			type: [String, Number],
			default: () => 0.3,
		},
		// 底部条宽度，默认单位rpx
		lineWidth: {
			type: [String, Number],
			default: () => 52,
		},
		// 底部条高度，默认单位rpx
		lineHeight: {
			type: [String, Number],
			default: () => 6,
		},
		// 是否显示标签栏外边框，仅在 type="line" 时有效
		border: {
			type: Boolean,
			default: () => false,
		},
		// 是否省略过长的标题文字
		ellipsis: {
			type: Boolean,
			default: () => false,
		},
		// tab内容的宽度
		tabWidth: {
			type: [String, Number],
			default: () => 'auto',
		},
		// tab等分数量，设置为 0 ，则不等分
		divideNum: {
			type: Number,
			default: () => 4,
		},
		// tab间距rpx
		tabSpace: {
			type: Number,
			default: () => 0,
		},
		// 是否使用粘性布局
		sticky: {
			type: Boolean,
			default: () => false,
		},
		// 是否开启手势左右滑动切换
		swipeable: {
			type: Boolean,
			default: () => false,
		},
		// 是否开启滚动导航
		scrollspy: {
			type: Boolean,
			default: () => false,
		},
		// 粘性布局下吸顶时与顶部的距离，单位rpx
		offsetTop: {
			type: [String, Number],
			default: () => 0,
		},
		// 选项字体颜色和下拉列表中选项颜色
		tabColor: {
			type: String,
			default: () => '#000000',
		},
		// 激活选项字体颜色
		activeTabColor: {
			type: String,
			default: () => '#000000',
		},
		// 是否显示分隔符
		showGapLine: {
			type: Boolean,
			default: () => false,
		},
		// 是否锁定tab(无法切换)
		lock: {
			type: Boolean,
			default: () => false,
		},
		// 是否禁用tab(所有功能失效)
		disabled: {
			type: Boolean,
			default: () => false,
		},
		// 是否有下拉选择按钮
		pullDown: {
			type: Boolean,
			default: () => false,
		},
		// 下拉占位符
		placeholder: {
			type: String,
			default: () => '选择类别',
		},
	},
}
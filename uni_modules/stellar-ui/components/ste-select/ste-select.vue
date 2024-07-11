<template>
	<view class="ste-select-root" :class="{ open: showOptions }" :style="[cmpRootStyle]">
		<view class="select-mask" @click="clickMask">
			<view class="select-content" :style="[contentStyle]" @click.stop="stop">
				<slot>
					<scroll-view scroll-x class="content-text" :class="{ multiple: cmpMultiple }">
						<block v-if="cmpFilterable">
							<block v-if="cmpMultiple">
								<block v-for="(v, i) in cmpViewValue">
									<view class="view-item" :key="v" v-if="v">
										{{ v }}
									</view>
								</block>
							</block>
							<input
								v-model="inputView"
								class="filterable-input"
								:class="{ content: cmpMultiple && cmpViewValue.length }"
								:placeholder="inputPlaceholder"
								@click="openOptions"
								@input="onUserFilterable"
								@focus="onFocus"
								@blur="onBlur"
							/>
						</block>
						<block v-else>
							<block v-if="confirmValue && confirmValue.length">
								<block v-if="cmpMultiple">
									<block v-for="(v, i) in cmpViewValue">
										<view class="view-item" :key="v" v-if="v">
											{{ v }}
										</view>
									</block>
								</block>
								<text v-else>{{ cmpViewValue }}</text>
							</block>
							<view class="placeholder-text" v-else>{{ placeholder }}</view>
						</block>
					</scroll-view>
				</slot>
				<view class="open-icon-event" @click="clickOpenIcon">
					<view class="open-icon">
						<ste-icon code="&#xe676;" size="20" display="block" />
					</view>
				</view>
			</view>

			<view class="options-content" :style="[optionsStyle]" @click.stop="stop">
				<view class="select-options">
					<block v-if="dataOptions.length > 1">
						<picker-view
							style="height: 600rpx"
							indicator-style="height: 43px"
							:value="cmpMultiseriateValue"
							@change="onMultiseriateChange"
						>
							<picker-view-column v-for="(col, index) in viewOptions" :key="index">
								<view class="time-item" v-for="(item, i) in col" :key="item">
									<text>
										{{ cmpShowDate ? item : item[labelKey] }}
									</text>
									<text v-if="cmpShowDate && dateUnit">{{ cmpDateUnits[index] }}</text>
								</view>
							</picker-view-column>
						</picker-view>
					</block>

					<block v-else>
						<scroll-view scroll-y class="options-col" v-for="(col, index) in viewOptions" :key="index">
							<view class="options-item" v-if="dataAllowCreate" @click="onSelect(index, dataAllowCreate, true)">
								{{ dataAllowCreate[labelKey] }}
							</view>
							<view
								class="options-item"
								v-for="(item, i) in col"
								:key="item[valueKey]"
								:class="{ active: active(index, item) }"
								@click="onSelect(index, item)"
							>
								{{ item[labelKey] }}
							</view>
							<block v-if="!dataAllowCreate && !col.length">
								<view class="options-empty">暂无数据</view>
							</block>
						</scroll-view>
					</block>
				</view>
				<view class="options-btns" v-if="dataOptions.length > 1">
					<view class="options-cancel" @click="clickCancel">取消</view>
					<view class="options-confirm" @click="clickConfirm">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils';
import { formatDate, getDateList, getFormatStr, getNowDate } from './defaultDate';
const isData = (d) => {
	return d || d === 0 || d === '';
};
/**
 * ste-select 下拉选
 * @description 下拉选组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-select
 * @property {String} value 绑定的值,支持v-model双向绑定
 * @property {Array} list 数据列表，支持一维数组，二维数组，树形结构
 * @property {String} mode 选择模式
 * @value default 默认
 * @value filterable 可搜索(仅单列模式下生效)
 * @value tree 当list为树形结构时生效
 * @value date 时间选择器模式：日期选择（该模式下list属性不生效）
 * @value time 时间选择器模式：时间选择（该模式下list属性不生效）
 * @value datetime 时间选择器模式：日期时间选择（该模式下list属性不生效）
 * @value month 时间选择器模式：年月选择器（该模式下list属性不生效）
 * @value minute 时间选择器模式：时分选择器（该模式下list属性不生效）
 * @property {String} minDate 最小日期（仅在时间选择器模式下生效）
 * @property {String} maxDate 最大日期（仅在时间选择器模式下生效）
 * @property {Boolean} dateUnit 是否显示中文单位（仅在时间选择器模式下生效）
 * @property {String|Number} width 宽度，默认100%
 * @property {String|Number} height 高度（不可使用相对值例如百分比等）单位RPX，默认64
 * @property {String} background 背景颜色，默认#fff
 * @property {Boolean} maskClose 点击遮罩层是否关闭，默认true
 * @property {String|Number} optionsWidth 选项框宽度，默认auto同width
 * @property {String} placeholder 占位符
 * @property {String} labelKey 数据列表中显示的键名，默认label
 * @property {String} valueKey 数据列表中存储的键名，默认value
 * @property {String} childrenKey 数据列表中子列表的键名，默认children（mode为tree时生效）
 * @property {Boolean} multiple 是否多选，默认false，一维数组时生效
 * @property {Boolean} allowCreate 是否允许创建，默认false
 * @property {String} borderColor 边框颜色，若不要边框可设置为透明色
 * @property {Number|String} borderRadius 圆角大小，单位RPX，默认8
 * @property {String} optionsPosition 选项框位置
 * @value auto 自动展示位置，默认
 * @value bottom 在下方展示，左右自适应
 * @value bottom-auto 在下方展示，左右自适应
 * @value top 在上方展示，左右自适应
 * @value top-auto 在上方展示，左右自适应
 * @value auto-start 上下自适应，左侧对其
 * @value auto-end 上下自适应，右侧对其
 * @value bottom-start 下方展示，左侧对其
 * @value top-start 上方展示，左侧对其
 * @value bottom-end 下方展示，右侧对其
 * @value top-end 上方展示，右侧对其
 * @event {Function} change 选中值变化时触发
 * @event {Function} cancel 取消选择时触发
 * @event {Function} confirm 确定选择时触发
 * @example <ste-select :list="list" v-model="value" @change="change" />
 */
export default {
	group: '表单组件',
	title: 'Select 下拉选',
	name: 'ste-select',
	props: {
		value: { type: [Array, String, Number], default: () => [] },
		list: { type: Array, default: () => [] },
		mode: { type: String, default: () => 'default' },
		minDate: { type: [Number, String, Date], default: () => null },
		maxDate: { type: [Number, String, Date], default: () => null },
		dateUnit: { type: Boolean, default: () => true },
		width: { type: [Number, String], default: () => '100%' },
		height: { type: [Number, String], default: () => 64 },
		background: { type: String, default: () => '#fff' },
		maskClose: { type: Boolean, default: () => true },
		optionsWidth: { type: [Number, String], default: () => 'auto' },
		placeholder: { type: String, default: () => '请选择' },
		labelKey: { type: String, default: () => 'label' },
		valueKey: { type: String, default: () => 'value' },
		childrenKey: { type: String, default: () => 'children' },
		multiple: { type: Boolean, default: () => false },
		allowCreate: { type: Boolean, default: () => false },
		borderColor: { type: String, default: () => '#ebebeb' },
		borderRadius: { type: [Number, String], default: () => 8 },
		optionsPosition: { type: String, default: () => 'auto' },
	},
	data() {
		return {
			inputView: '', // 输入框显示的内容
			userFilterable: '', // 用户输入的筛选内容（仅筛选模式下生效）
			inputPlaceholder: '',
			filterableTime: null, // 防抖定时器
			dataAllowCreate: null,
			selected: [], // 当前选中的值
			confirmValue: [], // 确定按钮的值，用于多选模式下保存选中的值，用于单选模式下保存选中的值（仅单列时生效）
			showOptions: false, // 是否显示下拉选项
			contentStyle: {},
			optionsStyle: {}, // 选项框样式，用于控制选项框的宽度和高度等属性
			dataOptions: [], // 数据列表，用于存储用户传入的列表数据（仅筛选模式下生效）
			viewOptions: [],
		};
	},
	computed: {
		cmpInputPlaceholder() {
			return this.confirmValue.length ? '' : this.placeholder;
		},
		// 是否是日期模式（包括日期、时间、日期时间、月份）
		cmpShowDate() {
			return ['date', 'datetime', 'time', 'month', 'minute'].includes(this.mode);
		},
		// 是否是筛选模式（包括筛选、筛选多列）
		cmpFilterable() {
			return this.mode === 'filterable' && this.dataOptions.length <= 1;
		},
		// 是否是多选模式（多列或者单列多选）
		cmpMultiple() {
			return !this.cmpShowDate && (this.dataOptions.length > 1 || this.multiple);
		},
		cmpAllowCreate() {
			return this.allowCreate && this.cmpFilterable;
		},
		cmpRootStyle() {
			return {
				'--ste-select-width': utils.formatPx(this.width),
				'--ste-select-height': utils.formatPx(this.height),
				'--ste-select-line-height': utils.formatPx(this.height, 'num') - 2 + 'px',
				'--ste-select-multiple-placeholder-height': utils.formatPx(this.height, 'num') - 6 + 'px',
				'--ste-select-multiple-line-height': utils.formatPx(this.height, 'num') - 8 + 'px',
				'--ste-select-background': this.background,
				'--ste-select-border': `1px solid ${this.borderColor}`,
				'--ste-select-border-radius': utils.formatPx(this.borderRadius),
			};
		},

		cmpDateUnits() {
			if (['date', 'datetime', 'month'].includes(this.mode)) {
				return ['年', '月', '日', '时', '分', '秒'];
			} else {
				return ['时', '分', '秒'];
			}
		},
		cmpMultiseriateValue() {
			if (this.cmpShowDate) {
				const value = getNowDate(this.selected, this.mode);
				return this.dataOptions.map((item, i) => (item.includes(value[i]) ? item.indexOf(value[i]) : 0));
			}
			const value = [...this.selected];
			return this.dataOptions.map((item, i) => {
				const index = item.findIndex((v) => v[this.valueKey] === value[i]);
				return index !== -1 ? index : 0;
			});
		},
		cmpViewValue() {
			if (this.cmpShowDate) {
				let values = this.confirmValue;
				if (values.length < this.dataOptions.length) values = this.initDate(values);
				const v = formatDate(values, this.mode);
				return v ? v.format(getFormatStr(this.mode)) : '';
			}

			let view = [];
			this.confirmValue.forEach((value, index) => {
				let item = null;
				if (this.mode === 'tree') {
					item = utils.findTreeNode(this.list, value, this.valueKey, this.childrenKey);
				} else if (this.multiple && this.dataOptions.length === 1) {
					item = this.dataOptions[0]?.find((item) => item[this.valueKey] === value);
				} else {
					item = this.dataOptions[index]?.find((item) => item[this.valueKey] === value);
				}
				view.push(item?.[this.labelKey] || '');
			});
			return !this.cmpMultiple && view[0] ? view[0] : view;
		},
	},
	watch: {
		list: {
			handler(v) {
				// 监听list变化，重新初始化数据。
				this.initOptions();
			},
			immediate: true,
		},
		value: {
			handler(v) {
				if (Array.isArray(v)) {
					this.confirmValue = v;
				} else if (this.cmpShowDate) {
					const str = ['date', 'datetime', 'month'].includes(this.mode) ? 'YYYY MM DD HH mm ss' : 'HH mm ss';
					const value = utils.dayjs(v).format('YYYY MM DD HH mm ss').split(' ');
					this.confirmValue = value.map((item) => Number(item));
				} else {
					if (this.dataOptions.length > 1 || this.multiple) {
						console.error('ste-select: value必须为数组（单列单选模式value可以为string或number类型）');
					}
					this.confirmValue = isData(v) ? [v] : [];
				}
				this.selected = [...this.confirmValue];
			},
			immediate: true,
		},
		userFilterable() {
			this.getViewOptions();
		},
		confirmValue: {
			handler(v) {
				this.onBlur();
			},
			immediate: true,
		},
	},
	created() {},
	methods: {
		stop: () => {},
		initOptions() {
			if (this.cmpShowDate) {
				this.dataOptions = getDateList(this.selected, this.mode, this.minDate, this.maxDate);
				this.viewOptions = this.dataOptions;
				return;
			}
			if (this.mode === 'tree') {
				this.initTreeOptions();
				return;
			}

			let list = this.list;
			if (!list || !list.length) list = [];
			if (list[0] && !Array.isArray(list[0])) {
				list = [list];
			}
			this.dataOptions = list;
			this.getViewOptions();
		},
		initTreeOptions() {
			const options = utils.treeToTable(this.list, this.selected, this.valueKey, this.childrenKey);
			this.dataOptions = options;
			this.getViewOptions();
		},
		getViewOptions() {
			this.$nextTick(() => {
				let list = this.dataOptions;
				if (this.cmpFilterable && this.userFilterable) {
					// 处理筛选数据
					list = list.map((item) => item.filter((value) => value[this.labelKey].includes(this.userFilterable)));
				}
				this.viewOptions = list;
			});
		},
		initDate(values) {
			const result = [];
			const now = getNowDate(null, this.mode).slice(0, this.dataOptions.length);
			this.dataOptions.forEach((item, i) => {
				const v = isData(values[i]) ? values[i] : now[i]; // 默认选中当前时间。
				result.push(v);
			});
			return result;
		},
		initSelected(values) {
			const result = [];
			this.dataOptions.forEach((item, i) => {
				const v = isData(values[i]) ? values[i] : item[0][this.valueKey];
				result.push(v);
			});
			return result;
		},

		clickOpenIcon() {
			if (this.showOptions) {
				this.onCancel();
			} else {
				this.openOptions();
			}
		},
		async openOptions() {
			if (this.selected.length < this.dataOptions.length) {
				let selected = [];
				if (this.cmpShowDate) {
					selected = this.initDate(this.selected);
				} else if (this.dataOptions.length > 1) {
					selected = this.initSelected(this.selected);
				}
				this.selected = selected;
			}
			const el = await utils.querySelector('.ste-select-root', this);
			const { width, height, top, left, bottom, right } = el;
			this.contentStyle = {
				position: 'absolute',
				left: `${left}px`,
				top: `${top}px`,
				width: `${width}px`,
				height: `${height}px`,
			};

			const boundary = utils.System.getElementBoundary(el);
			let [y = 'auto', x = 'auto'] = this.optionsPosition === 'auto' ? [] : this.optionsPosition.split('-');

			if (y === 'auto') {
				y = 'bottom';
				if (boundary.top - boundary.bottom > 0) {
					y = 'top';
				}
			}

			if (x === 'auto') {
				x = 'start';
				if (boundary.right - boundary.left < 0) {
					x = 'end';
				}
			}

			const style = {
				position: 'absolute',
				display: 'block',
				width: this.optionsWidth === 'auto' ? `${width}px` : utils.formatPx(this.optionsWidth),
			};
			switch (y) {
				case 'top':
					style.bottom = `${boundary.bottom + height + 8}px`;
					break;
				case 'bottom':
					style.top = `${bottom + 8}px`;
					break;
			}

			switch (x) {
				case 'start':
					style.left = `${left}px`;
					break;
				case 'end':
					style.right = `${boundary.right}px`;
					break;
			}
			this.optionsStyle = style;
			this.showOptions = true; // 打开选项列表
		},
		clickMask() {
			if (!this.maskClose) return;
			this.clickCancel(); // 关闭选项列表。
		},
		clickCancel() {
			this.onCancel();
			this.$emit('cancel'); // 触发cancel事件。
		},
		clickConfirm() {
			const value = this.onConfirm();
			this.$emit('confirm', value);
			this.$nextTick(() => this.onCancel());
		},
		onCancel() {
			this.showOptions = false; // 关闭选项列表
			this.contentStyle = {};
			this.optionsStyle = {};
		},
		onConfirm() {
			this.confirmValue = [...this.selected];
			let value = this.confirmValue;

			let objs = [];
			if (this.dataOptions.length === 1) {
				objs = this.dataOptions[0].filter((value) => this.confirmValue.includes(value[this.valueKey]));
			} else {
				objs = this.dataOptions.map((item, index) => {
					return item.find((value) => value[this.valueKey] === this.confirmValue[index]);
				});
			}

			if (this.cmpShowDate && !Array.isArray(this.value)) {
				value = formatDate(this.confirmValue, this.mode).format(getFormatStr(this.mode));
			} else if (!this.cmpMultiple && !Array.isArray(this.value)) {
				value = this.confirmValue[0];
				objs = objs[0];
			}

			this.$emit('input', value);
			this.$emit('change', value, objs);
			return value;
		},
		onSelect(col, item, isAllowCreate) {
			if (this.multiple && this.dataOptions.length === 1) {
				// 只有一列选项的时候，多选
				const index = this.selected.findIndex((value) => value === item[this.valueKey]);
				if (index > -1) this.selected.splice(index, 1);
				else this.selected.push(item[this.valueKey]);
			} else {
				const selected = [...this.selected];
				selected[col] = item[this.valueKey];
				this.selected = selected;
			}
			if (this.cmpAllowCreate && isAllowCreate) {
				this.dataOptions[0].unshift(this.dataAllowCreate);
				this.dataAllowCreate = null;
				this.getViewOptions();
			}
			this.onConfirm();
			if (!this.multiple) this.$nextTick(() => this.onCancel());
		},
		active(index, item) {
			if (this.dataOptions.length > 1) {
				return this.selected[index] === item[this.valueKey];
			} else {
				return this.selected.includes(item[this.valueKey]);
			}
		},
		onMultiseriateChange({ detail: { value } }) {
			const result = [];
			value.forEach((i, index) => {
				const value = this.dataOptions[index][i];
				result.push(this.cmpShowDate ? value : value[this.valueKey]);
			});
			this.selected = result;

			if (this.mode === 'tree') {
				this.initTreeOptions();
				this.$nextTick(() => {
					this.selected = this.cmpMultiseriateValue.map((i, index) => {
						const item = this.dataOptions[index][i];
						return item ? item[this.valueKey] : null;
					});
				});
			}
		},
		onUserFilterable() {
			const value = this.inputView;
			clearTimeout(this.filterableTime);
			this.filterableTime = setTimeout(() => {
				this.userFilterable = value;
				if (this.cmpAllowCreate && value) {
					this.dataAllowCreate = {
						[this.valueKey]: value,
						[this.labelKey]: value,
					};
				} else {
					this.dataAllowCreate = null;
				}
			}, 500);
		},
		onFocus() {
			if (!this.cmpFilterable) return;
			this.$nextTick(() => {
				this.inputView = '';
				const v = this.confirmValue;
				let value = this.dataOptions[0]?.find((item) => item[this.valueKey] === v[0]);
				this.inputPlaceholder = value && value[this.labelKey] ? value[this.labelKey] : this.cmpInputPlaceholder;
				this.onUserFilterable();
			});
		},
		onBlur() {
			this.inputPlaceholder = this.cmpInputPlaceholder;
			if (!this.cmpFilterable) return;
			this.$nextTick(() => {
				const v = this.confirmValue;
				// 单选时将confirmValue赋值给输入框。
				if (!this.cmpMultiple && isData(v[0])) {
					let value = this.dataOptions[0]?.find((item) => item[this.valueKey] === v[0]);
					this.inputView = value && value[this.labelKey] ? value[this.labelKey] : '';
					this.onUserFilterable();
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-select-root {
	width: var(--ste-select-width);
	height: var(--ste-select-height);
	position: relative;

	&.open {
		.select-mask {
			position: fixed;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 996;
			.select-content {
				.open-icon-event > .open-icon {
					transform: rotate(180deg);
				}
			}
		}
	}
	.select-mask {
		width: var(--ste-select-width);
		height: var(--ste-select-height);
	}
	.select-content {
		width: var(--ste-select-width);
		height: var(--ste-select-height);
		line-height: var(--ste-select-line-height);
		background-color: var(--ste-select-background);
		border: var(--ste-select-border);
		border-radius: var(--ste-select-border-radius);
		padding-right: var(--ste-select-multiple-line-height);
		position: relative;
		z-index: 1;
		padding-left: 20rpx; // 调整内边距，以适应不同的选项高度。
		overflow: hidden;
		.content-text {
			width: 100%;
			height: 100%;
			white-space: nowrap;
			font-size: 28rpx;
			&.multiple {
				padding: 2px 0;
				.view-item {
					max-width: 100%;
					line-height: var(--ste-select-multiple-line-height);
					display: inline-block;
					padding: 0 12rpx;
					border-radius: 6rpx;
					border: 1px solid #eee;
					margin-right: 8px;
					font-size: 24rpx; // 设置字体大小
					text-overflow: ellipsis;
					white-space: nowrap; // 文本不换行，防止文字溢出
					overflow: hidden; // 隐藏溢出内容，并显示省略号
				}
				.filterable-input {
					height: var(--ste-select-multiple-placeholder-height);
					display: inline-block;
					&.content {
						width: 50%;
					}
				}
				.placeholder-text {
					line-height: var(--ste-select-multiple-placeholder-height);
				}
			}
		}
		.filterable-input {
			width: 100%;
			height: 100%;
		}
		.placeholder-text {
			color: #999999;
		}
		.open-icon-event {
			width: var(--ste-select-multiple-line-height);
			height: var(--ste-select-multiple-line-height);
			position: absolute;
			display: flex;
			z-index: 100;
			align-items: center;
			justify-content: center;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			.open-icon {
				background-color: #ebebeb; // 设置一个背景颜色，以便在开发过程中能够看到这个元素。
				border-radius: 16rpx;
				width: 32rpx;
				height: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: 300ms;
			}
		}
	}
	.options-content {
		display: none;
		position: absolute;
		z-index: 2;
		border-radius: 8rpx;
		background-color: #fff;
		overflow: hidden;
		.select-options {
			width: 100%;
			max-height: 696rpx;
			.options-col {
				padding: 0 16rpx;
				height: 100%;
				max-height: 696rpx;
				.options-item {
					width: 100%;
					height: 82rpx;
					line-height: 82rpx;
					// 文本溢出省略号
					text-overflow: ellipsis;
					white-space: nowrap; // 文本不换行，防止文字溢出
					overflow: hidden; // 隐藏溢出内容，并显示省略号

					&.active {
						color: #3491fa;
					}

					& + .options-item {
						border-top: 1px solid #f5f5f5;
					}
				}
				.options-empty {
					width: 100%;
					height: 82rpx;
					line-height: 82rpx;
					text-align: center;
					color: #999999;
				}
			}
			.time-item {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.options-btns {
			width: 100%;
			height: 96rpx;
			line-height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			.options-cancel {
				color: #999999;
				padding: 0 40rpx;
			}
			.options-confirm {
				color: #0090ff;
				padding: 0 40rpx;
			}
		}
	}
}
</style>

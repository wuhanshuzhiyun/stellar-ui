<template>
	<view class="ste-dropdown-menu-item-root" :class="[cmpRootClass]" @click="handleClick">
		<text>{{ title }}</text>
		<view class="menu-item-icon">
			<ste-icon code="&#xe67a;" size="32"></ste-icon>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
/**
 * ste-dropdown-menu-item 下拉菜单项
 * @description 下拉菜单项
 * @tutorial https://stellar-ui.intecloud.com.cn//pc/index/index?name=ste-dropdown-menu
 * @property {String} value 选中项对应的值
 * @property {String} title 选中项对应的标题
 * @property {Boolean} disabled 是否禁用 默认 false
 * @property {Boolean} readonly 只读（不置灰） 默认 false
 * @event {Function} click 选中时触发(可拦截选中)
 **/
export default {
	group: '导航组件',
	title: 'DropdownMenuItem 下拉菜单项',
	name: 'ste-dropdown-menu-item',
	inject: ['_menuComponent'],
	props: {
		value: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		max: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			parent: {},
			status: false, // 是否选中状态 true: 选中，false: 未选中
			clickTask: null,
		};
	},
	created() {
		this.parent = this._menuComponent.getParent();
	},
	mounted() {
		this.parent.updateItems();
		this.loadStatus();
		this.parent.$on('item-choose', (value) => {
			this.loadStatus();
		});
	},
	computed: {
		cmpRootClass() {
			let classArr = [this.parent.direction];
			if (this.status) {
				classArr.push('active');
			}
			if (this.readonly) {
				classArr.push('readonly');
			}
			if (this.disabled) {
				classArr.push('disabled');
			}
			return classArr.join(' ');
		},
	},
	methods: {
		loadStatus() {
			this.status = !!this.parent.chooseItems.find((e) => e == this.value);
		},
		async handleClick() {
			if (!this.disabled && !this.readonly) {
				if (this.clickTask) {
					return;
				}
				let next = true;
				this.clickTask = new Promise((resolve, reject) => {
					this.$emit(
						'click',
						() => (next = false),
						() => resolve(),
						() => reject()
					);
				});
				if (!next) {
					await this.clickTask;
				}
				this.parent.choose({ title: this.title, value: this.value });
				setTimeout(() => {
					this.clickTask = null;
				}, this.parent.cmpDuration * 1000);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-dropdown-menu-item-root {
	&.down {
		border-top: solid 1rpx #e1e1ee;
	}
	&.up {
		border-bottom: solid 1rpx #e1e1ee;
	}
	background-color: #ffffff;
	padding: 20rpx;

	display: flex;
	align-items: center;
	justify-content: space-between;
	color: var(--inactive-color);
	.menu-item-icon {
		display: none;
	}

	&.disabled {
		color: #cccccc !important;
	}

	&.active {
		color: var(--active-color);
		.menu-item-icon {
			display: inline-flex;
			align-items: center;
		}
	}
}
</style>

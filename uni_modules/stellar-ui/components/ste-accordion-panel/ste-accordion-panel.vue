<template>
	<view class="ste-accordion-panel-root">
		<block v-for="(item, index) in dataOptions" :key="index">
			<view class="accordion-panel-item" :class="{ open: item.open }">
				<view class="accordion-panel-item-content" @click="onClick(item)">
					<slot :item="item" :index="index" :zIndex="zIndex">
						<view class="accordion-panel-item-head" :class="item.titleClass">
							<view class="accordion-panel-item-title">{{ item[titleKey] }}</view>
							<view
								class="accordion-panel-item-icon"
								style="width: 30rpx; height: 30rpx; line-height: 30rpx"
								v-if="item.hasChildren"
							>
								<ste-icon code="&#xe678;" size="30" />
							</view>
						</view>
					</slot>
				</view>
				<view class="accordion-panel-children" v-if="item.children">
					<ste-accordion-panel
						@click="onClick"
						@open="onOpen"
						@close="onClose"
						:options="item.children"
						:valueKey="valueKey"
						:titleKey="titleKey"
						:messageKey="messageKey"
						:openItems="openItems"
						:parentValue="item[valueKey]"
						:z-index="zIndex + 1"
					/>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';
export default {
	name: 'ste-accordion-panel',
	props: {
		options: {
			type: Array,
			default: () => [],
		},
		valueKey: {
			type: String,
			default: () => 'value',
		},
		titleKey: {
			type: String,
			default: () => 'title',
		},
		messageKey: {
			type: String,
			default: () => 'message',
		},
		childrenKey: {
			type: String,
			default: () => 'children',
		},
		lazy: {
			type: Boolean,
			default: () => true,
		},
		accordion: {
			type: Boolean,
			default: () => true,
		},
		openItems: {
			type: Array,
			default: () => [],
		},
		// 层级，用于设置z-index
		zIndex: {
			type: Number,
			default: () => 0,
		},
		parentValue: {
			type: [Number, String],
			default: () => '__root__',
		},
	},
	data() {
		return {
			dataOptions: [],
			optionsMap: {},
		};
	},
	computed: {},
	watch: {
		options: {
			handler() {
				this.init();
			},
			immediate: true,
			deep: true,
		},
	},
	mounted() {},
	methods: {
		init() {
			let options = this.options;
			if (this.parentValue === '__root__') {
				options = utils.formatTree(this.options, this.valueKey, this.childrenKey, (node) => {
					return { open: false, hasChildren: !!node[this.childrenKey]?.length };
				});
				this.optionsMap = utils.getTreeNodeMap(options, this.valueKey, this.childrenKey);
				this.openItems.forEach((v) => this.open(v));
			}
			this.dataOptions = options;
		},
		open(value) {
			const node = this.optionsMap[value];
			if (!node) return;
			node.open = true;
			const openParent = (node) => {
				if (node.parentValue === '__root__') return;
				const parent = this.optionsMap[node.parentValue];
				if (!parent) return;
				if (parent.open) return;
				parent.open = true;
				openParent(parent);
			};
			openParent(node);
		},

		onClick(item, zIndex = this.zIndex) {
			this.$emit('click', item, zIndex);
			if (item.hasChildren && zIndex === this.zIndex) {
				if (!item.open) this.onOpen(item, zIndex);
				else this.onClose(item, zIndex);
			}
		},

		onOpen(item, zIndex) {
			item.open = true;
			this.$emit('open', item, zIndex);
		},
		onClose(item, zIndex) {
			item.open = false;
			this.$emit('close', item, zIndex);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-accordion-panel-root {
	width: 100%;
	background-color: #fff;
	.accordion-panel-item {
		width: 100%;

		&.open {
			& > .accordion-panel-item-content {
				box-shadow: 0px 4rpx 10rpx 2rpx rgba(0, 0, 0, 0.04);
				.accordion-panel-item-head .accordion-panel-item-icon {
					transform: rotate(180deg);
				}
			}
			& > .accordion-panel-children {
				display: block;
				margin: 8rpx 0;
			}
		}

		.accordion-panel-item-content {
			width: 100%;
			padding: 0 20rpx;
			.accordion-panel-item-head {
				width: 100%;
				height: 80rpx;
				padding: 16rpx 0;
				line-height: 48rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.accordion-panel-item-icon {
					width: 30rpx;
					height: 30rpx;
					line-height: 30rpx;
					transition: 300ms;
				}
			}
		}
		.accordion-panel-children {
			display: none;
			width: 100%;
			padding-left: 40rpx;
		}
	}
}
</style>

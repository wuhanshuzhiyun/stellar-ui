<template>
	<view class="ste-accordion-panel-root">
		<block v-for="(item, index) in dataOptions" :key="index">
			<view class="accordion-panel-item" :class="{ open: item.open }">
				<view class="accordion-panel-item-content" @click="onClick(item)">
					<slot :item="item" :index="index" :depth="depth">
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
						ref="steAccordionPanel"
						@click="onClick"
						:options="item.children"
						:valueKey="valueKey"
						:titleKey="titleKey"
						:messageKey="messageKey"
						:openItems="openItems"
						:parentValue="item[valueKey]"
						:accordion="accordion"
						:depth="depth + 1"
					/>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';

const getParents = (node, nodeMap) => {
	const parents = [];
	if (node.parentValue === '__root__') return parents;
	const parent = nodeMap[node.parentValue];
	if (!parent) return parents;
	parents.push(parent);
	parents.push(...getParents(parent, nodeMap));
	return parents;
};

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
		depth: {
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
			const parents = getParents(node, this.optionsMap);
			parents.forEach((parent) => {
				parent.open = true;
				this.closeSibling(parent);
			});
		},
		onClick(node) {
			this.$emit('click', node);
			if (this.parentValue === node.parentValue) {
				if (node.open) this.closeNode(node);
				else this.openNode(node);
			}
		},
		openNode(node) {
			node.open = true;
			this.closeSibling(node);
			this.$emit('open', node);
		},
		closeNode(node) {
			node.open = false;
			this.$emit('close', node);
		},

		closeSibling(node) {
			if (!this.accordion) return;
			const sibling =
				this.parentValue === '__root__'
					? Object.keys(this.optionsMap)
							.map((k) => this.optionsMap[k])
							.filter((s) => s.parentValue === node.parentValue && s.open && s[this.valueKey] !== node[this.valueKey])
					: this.dataOptions.filter((s) => s.open && s[this.valueKey] !== node[this.valueKey]);
			sibling.forEach((s) => (s.open = false));
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

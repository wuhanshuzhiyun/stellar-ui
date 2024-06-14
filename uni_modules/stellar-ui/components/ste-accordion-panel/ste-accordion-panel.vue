<template>
	<view class="ste-accordion-panel-root">
		<block v-for="(item, index) in dataOptions" :key="index">
			<view class="accordion-panel-item" :class="{ open: item.open }">
				<view class="accordion-panel-item-content" @click="onClick(item)">
					<slot :item="item" :index="index" :depth="depth">
						<view class="accordion-panel-item-head" :class="headClass">
							<view class="accordion-panel-item-right">
								<view class="accordion-panel-item-image" v-if="item.image !== false && (cmpTitleImage || item.image)">
									<image :src="item.image ? item.image : cmpTitleImage" mode=""></image>
								</view>
								<view class="accordion-panel-item-title">
									{{ item[titleKey] }}
								</view>
							</view>
							<view
								class="accordion-panel-item-open"
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
						:openNodes="openNodes"
						:accordion="accordion"
						:depth="depth + 1"
						:parentValue="item[valueKey]"
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

const defaultImages = [
	'https://image.whzb.com/chain/StellarUI/component-icons/ste-accordion-panel.png',
	'https://image.whzb.com/chain/StellarUI/component-icons/ste-accordion-panel-children.png',
];

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
		headClass: {
			type: String,
			default: () => '',
		},
		openNodes: {
			type: Array,
			default: () => [],
		},
		titleImages: {
			type: Array,
			default: () => [],
		},
		// 以下是递归属性，请勿在业务中使用
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
	computed: {
		cmpTitleImage() {
			const userImage = this.titleImages[this.depth];
			if (userImage === false) return;
			const defaultImage = defaultImages[this.depth];
			return userImage ? userImage : defaultImage;
		},
	},
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
					return { open: false, loading: false, hasChildren: !!node[this.childrenKey]?.length };
				});
				this.optionsMap = utils.getTreeNodeMap(options, this.valueKey, this.childrenKey);
				this.openNodes.forEach((v) => this.open(v));
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
		async openNode(node) {
			let next = true;
			const stop = new Promise((resolve, reject) => {
				this.$emit(
					'beforeOpen',
					() => {
						node.loading = true;
						next = false;
					},
					(children = []) => resolve(children),
					() => reject()
				);
			});
			if (!next) {
				try {
					const children = await stop;
					this.$set(node, this.childrenKey, children);
				} catch (e) {
					//TODO handle the exception
					node.loading = false;
					return;
				}
			}
			node.loading = false;
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
			const sibling = this.dataOptions.filter((s) => s.open && s[this.valueKey] !== node[this.valueKey]);
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
				.accordion-panel-item-head .accordion-panel-item-open {
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
				display: flex;
				align-items: center;
				justify-content: space-between;
				.accordion-panel-item-right {
					width: calc(100% - 30rpx);
					height: 100%;
					display: flex;
					align-items: center;
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #000000;
					.accordion-panel-item-image {
						width: 48rpx;
						height: 48rpx;
						margin-right: 16rpx;
					}
				}
				.accordion-panel-item-open {
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

<template>
	<view class="ste-accordion-panel-root">
		<block v-for="(node, index) in dataOptions" :key="index">
			<view class="accordion-panel-item" :class="{ open: node.open }">
				<view class="accordion-panel-item-content" @click="onClick(node)">
					<slot :node="node" :index="index" :depth="depth">
						<view class="accordion-panel-item-head" :class="headClass">
							<view class="accordion-panel-item-right">
								<view class="accordion-panel-item-image" v-if="node.image !== false && (cmpTitleImage || node.image)">
									<image :src="node.image ? node.image : cmpTitleImage" mode=""></image>
								</view>
								<view class="accordion-panel-item-title">{{ node[titleKey] }}</view>
							</view>
							<view
								class="accordion-panel-item-open"
								style="width: 30rpx; height: 30rpx; line-height: 30rpx"
								v-if="node.hasChildren"
							>
								<ste-icon code="&#xe678;" size="30" />
							</view>
						</view>
					</slot>
				</view>

				<view class="accordion-panel-item-loading" v-if="node.loading">
					<ste-loading size="30" />
				</view>
				<view class="accordion-panel-children" v-if="node.children">
					<ste-accordion-panel
						@click="onClick"
						@beforeOpen="beforeOpen"
						:options="node.children"
						:valueKey="valueKey"
						:titleKey="titleKey"
						:messageKey="messageKey"
						:openNodes="openNodes"
						:accordion="accordion"
						:depth="depth + 1"
						:parentValue="node[valueKey]"
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

		async beforeOpen(node, suspend, next, stop) {
			let is_next = true;
			const beforeOpen = new Promise((resolve, reject) => {
				this.$emit(
					'beforeOpen',
					node,
					typeof suspend === 'function'
						? suspend
						: () => {
								is_next = false;
								this.$set(node, 'loading', true);
						  },
					(children = []) => {
						const _children = utils.formatTree(
							children,
							this.valueKey,
							this.childrenKey,
							(node) => {
								return { open: false, loading: false, hasChildren: !!node[this.childrenKey]?.length };
							},
							node[this.valueKey],
							node.depth + 1
						);
						if (this.parentValue === '__root__') {
							Object.assign(this.optionsMap, utils.getTreeNodeMap(_children));
						}
						typeof next === 'function' ? next(_children) : resolve(_children);
					},
					typeof stop === 'function' ? stop : () => reject()
				);
			});
			if (!is_next) {
				try {
					const children = await beforeOpen;
					this.$set(node, this.childrenKey, children);
					this.$set(node, 'loading', false);
				} catch (e) {
					// TODO handle the exception
					this.$set(node, 'loading', false);
					throw e;
				}
			}
		},

		async openNode(node) {
			try {
				await this.beforeOpen(node);
				node.open = true;
				this.closeSibling(node);
				this.$emit('open', node);
			} catch (e) {
				//TODO handle the exception
			}
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
		.accordion-panel-item-loading {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.accordion-panel-children {
			display: none;
			width: 100%;
			padding-left: 40rpx;
		}
	}
}
</style>

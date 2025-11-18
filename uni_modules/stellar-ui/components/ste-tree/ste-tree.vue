<template>
	<view class="ste-tree-root">
		<view
			v-for="(node, index) in viewList"
			:key="node[valueKey]"
			class="tree-item"
			data-test="tree-item"
			:class="{ open: node.open, children: node.hasChildren }"
		>
			<view class="tree-item-content" :style="{ paddingLeft: `${node.depth * cmpPaddingLeft}px` }">
				<view class="tree-item-head" @click="onClick(node)">
					<view class="tree-item-right">
						<slot :node="node" :depth="node.depth">
							<view class="tree-item-title">{{ node[titleKey] }}</view>
						</slot>
					</view>
					<view class="tree-item-open" v-if="node.hasChildren" @click="onOpen(node)">
						<slot name="open" :open="node.open">
							<view class="open-icon">
								<ste-icon code="&#xe678;" size="30" />
							</view>
						</slot>
					</view>
				</view>
			</view>

			<view class="tree-item-loading" v-if="node.loading">
				<slot name="loading">
					<ste-loading size="30" />
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils.js';

/**
 * ste-tree 树形控件
 * @description 树形控件组件
 * @tutorial https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui&menu=%E7%BB%84%E4%BB%B6&active=ste-tree
 * @property {Array} options 节点数组（支持树形结构）
 * @property {String} valueKey 节点的值字段名（默认：value）
 * @property {String} titleKey 节点的标题字段名（默认：title）
 * @property {String} childrenKey 节点的子节点字段名（默认：children）
 * @property {Boolean} accordion 是否手风琴模式（默认：true）
 * @property {Number | String} childrenPadding 子节点缩进，单位RPX（默认：40）
 * @property {Array} openNodes 默认展开的节点数组（数组内容为节点value值，请在组件加载前设置，加载后若要展开请调用open方法）
 * @event {Function} click 点击节点触发，参数为当前节点对象
 * @event {Function} open 打开节点时触发，参数为当前节点对象
 * @event {Function} close 关闭节点时触发，参数为当前节点对象
 * @event {Function} beforeOpen 打开节点前触发，第一个参数为当前节点对象（第二个参数为suspend函数，用于等待后续操作）（第三个参数为next函数，继续执行后续代码，可接收一个对象数组，该数组会替换当前节点的children）（第四个参数为stop，阻止后续代码执行）
 */

export default {
	group: '展示组件',
	title: 'Tree 树形控件',
	name: 'ste-tree',
	props: {
		options: { type: [Array, null], default: () => [] },
		valueKey: { type: [String, null], default: () => 'value' },
		titleKey: { type: [String, null], default: () => 'title' },
		childrenKey: { type: [String, null], default: () => 'children' },
		accordion: { type: [Boolean, null], default: () => true },
		childrenPadding: { type: [Number, String, null], default: () => 40 },
		openNodes: { type: [Array, null], default: () => [] },
		searchTitle: { type: [String, null], default: () => '' },
	},
	data() {
		return {
			dataOptions: [], // 全部数据
			viewOptions: [], // 渲染数据
			viewList: [], // 渲染列表
			dataSearchTitle: '',

			searchTime: null,
		};
	},
	computed: {
		cmpPaddingLeft() {
			return utils.formatPx(this.childrenPadding, 'num');
		},
	},
	watch: {
		options: {
			handler() {
				this.init();
			},
			immediate: true,
		},
		searchTitle: {
			handler(v) {
				this.dataSearchTitle = v;
			},
			immediate: true,
		},
		dataSearchTitle: {
			handler(v) {
				this.onSearch(v);
			},
			immediate: true,
		},
	},
	methods: {
		init() {
			this.dataOptions = this.formatTree(this.options);
			this.viewOptions = this.dataOptions;
			if (this.openNodes?.length) this.openNodes.forEach((v) => this.open(v));
			else this.rende();
		},
		async open(value) {
			const node = this.findNode(this.viewOptions, value);
			if (!node) return;
			if (!this.dataSearchTitle) {
				await this.beforeOpen(node);
			}
			this.setNodeOpen(node[this.valueKey], true);
			if (node.parentNode !== '__root__') {
				const getParents = (_node) => {
					const parents = [];
					const parent = this.findNode(this.viewOptions, _node.parentNode);
					if (parent) {
						parents.push(parent);
						if (parent.parentNode !== '__root__') {
							parents.push(...getParents(parent));
						}
					}
					return parents;
				};
				const parents = getParents(node);
				parents.forEach((parent) => {
					if (parent.open) return;
					this.setNodeOpen(parent[this.valueKey], true);
				});
			}

			this.rende();
		},
		close(value) {
			this.closeNode(value);
		},
		search(title) {
			this.dataSearchTitle = title;
		},

		formatTree(tree, parentNode, depth) {
			return utils.formatTree(
				tree,
				this.valueKey,
				this.childrenKey,
				(node) => {
					return { open: false, loading: false, hasChildren: !!node[this.childrenKey]?.length };
				},
				parentNode,
				depth
			);
		},
		rende() {
			this.$nextTick(() => {
				if (!this.viewOptions?.length) {
					this.viewList = [];
					return;
				}
				this.viewList = utils.flattenTree(this.viewOptions, this.childrenKey, (node) => node.open);
			});
		},

		onClick(node) {
			this.$emit('click', node);
		},
		onOpen(node) {
			if (node.open) this.closeNode(node[this.valueKey]);
			else this.openNode(node);
		},

		onSearch(title) {
			clearTimeout(this.searchTime);

			this.searchTime = setTimeout(() => {
				if (!title) {
					if (this.viewOptions !== this.dataOptions) {
						this.viewOptions = this.dataOptions;
					}
					this.rende();
					return;
				}
				this.viewOptions = utils.filterTree(
					this.dataOptions,
					(node) => node[this.titleKey]?.indexOf(title) !== -1,
					this.valueKey,
					this.childrenKey
				);
				this.rende();
			}, 500);
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
						const _children = this.formatTree(children, node[this.valueKey], node.depth + 1);

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
				await this.open(node[this.valueKey]);
				this.$emit('open', node);
				this.rende();
			} catch (e) {
				//TODO handle the exception
			}
		},
		closeNode(value) {
			const node = this.setNodeOpen(value, false);
			this.$emit('close', node);
			this.rende();
		},

		findNode(tree, value) {
			return utils.findTreeNode(tree, value, this.valueKey, this.childrenKey);
		},
		// 关闭打开的兄弟节点
		closeSibling(node) {
			const sibling = this.viewList.filter(
				(s) => s.open && s.parentNode === node.parentNode && s[this.valueKey] !== node[this.valueKey]
			);
			sibling.forEach((s) => this.setNodeOpen(s[this.valueKey], false));
		},
		setNodeOpen(nodeValue, open) {
			// 修改渲染状态
			const node = this.findNode(this.viewOptions, nodeValue);
			if (open && this.accordion) {
				this.closeSibling(node);
			}
			if (this.dataOptions !== this.viewOptions) {
				// 同步到数据中
				const _node = this.findNode(this.dataOptions, nodeValue);
				_node.open = open;
			}
			node.open = open;
			return node;
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-tree-root {
	width: 100%;
	background-color: #fff;
	.tree-item {
		width: 100%;

		&.open {
			& > .tree-item-content {
				.tree-item-head {
					box-shadow: 0px 4rpx 10rpx 2rpx rgba(0, 0, 0, 0.04);
					.tree-item-open .open-icon {
						transform: rotate(180deg);
					}
				}
			}
			& > .tree-children {
				display: block;
				margin: 8rpx 0;
			}
		}

		&.children {
			.tree-item-content {
				.tree-item-head {
					margin-bottom: 8rpx;
					.tree-item-right {
						width: calc(100% - 70rpx);
					}
					.tree-item-open {
						width: 70rpx;
						height: 60rpx;
						line-height: 30rpx;
						padding: 15rpx 20rpx;
						line-height: 30rpx;
					}
				}
			}
		}

		.tree-item-content {
			width: 100%;
			.tree-item-head {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 28rpx;
				color: #000000;

				.tree-item-right {
					width: 100%;

					.tree-item-title {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						padding-left: 20rpx;
					}
				}
			}
		}
		.tree-item-loading {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.tree-children {
			display: none;
			width: 100%;
			padding-left: 40rpx;
		}
	}
}
</style>

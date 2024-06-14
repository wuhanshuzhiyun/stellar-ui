<template>
	<view class="ste-accordion-panel-root">
		<block v-for="(node, index) in dataOptions" :key="index">
			<view class="accordion-panel-item" :class="{ open: node.open }">
				<view class="accordion-panel-item-content" @click="onClick(node)">
					<slot :node="node" :index="index" :depth="depth">
						<view class="accordion-panel-item-head" :style="[headStyle]">
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

/**
 * ste-accordion-panel 折叠面板
 * @description 折叠面板组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-accordion-panel
 * @property {Array} options 选项数组（支持树形结构）
 * @property {String} valueKey 选项的值字段名（默认：value）
 * @property {String} titleKey 选项的标题字段名（默认：title）
 * @property {String} childrenKey 选项的子选项字段名（默认：children）
 * @property {Boolean} accordion 是否手风琴模式（默认：true）
 * @property {Object} headStyle 自定义头部样式
 * @property {Array} openNodes 默认展开的节点数组（数组内容为节点value值，请在组件加载前设置，加载后若要展开请调用open方法）
 * @property {Array} titleImages 标题图片数组（图片在数组中的位置对应展示的层级，若某一层不展示图片则在对应位置填入false）
 * @event {Function} click 点击节点触发，参数为当前节点对象
 * @event {Function} open 打开节点时触发，参数为当前节点对象
 * @event {Function} close 关闭节点时触发，参数为当前节点对象
 * @event {Function} beforeOpen 打开节点前触发，第一个参数为当前节点对象（第二个参数为suspend函数，用于等待后续代码执行）（第三个参数为next函数，继续执行后续代码，可接收一个对象数值，该数组会替换当前节点的children）（第四个参数为stop，阻止后续代码执行）
 */

export default {
	group: '折叠面板',
	title: 'AccordionPanel 折叠面板',
	name: 'ste-accordion-panel',
	props: {
		options: { type: Array, default: () => [] },
		valueKey: { type: String, default: () => 'value' },
		titleKey: { type: String, default: () => 'title' },
		childrenKey: { type: String, default: () => 'children' },
		accordion: { type: Boolean, default: () => true },
		headStyle: { type: Object, default: () => ({}) },
		openNodes: { type: Array, default: () => [] },
		titleImages: { type: Array, default: () => [] },
		searchTitle: { type: String, default: () => '' },
		// 以下是递归属性，请勿在业务中使用
		depth: { type: Number, default: () => 0 },
		parentValue: { type: [Number, String], default: () => '__root__' },
	},
	data() {
		return {
			dataOptions: [],
			optionsMap: {},
			viewOptions: [],
			dataSearchTitle: '',
			searchTime: null,
		};
	},
	computed: {
		cmpTitleImage() {
			const userImage = this.titleImages[this.depth];
			if (userImage === false) return null;
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

		search(title) {
			this.dataSearchTitle = title;
		},
		onSearch(title) {
			clearTimeout(this.searchTime);
			if (this.parentValue !== '__root__' || !title) {
				this.viewOptions = this.dataOptions;
				return;
			}
			this.searchTime = setTimeout(() => {
				const nodeValues = utils.getParentNodes(
					this.dataOptions,
					(node) => node[this.titleKey]?.indexOf(title) !== -1,
					this.valueKey,
					this.childrenKey
				);
				// const newOptions = utils.formatTree(this.dataOptions, this.valueKey, this.childrenKey);
				// console.log(newOptions);
				// this.viewOptions = utils.filterTreeNode(
				// 	newOptions,
				// 	(node) => nodeValues.indexOf(node[this.valueKey]) !== -1,
				// 	this.childrenKey
				// );
				// console.log(this.viewOptions);
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
				if (!this.dataSearchTitle) {
					await this.beforeOpen(node);
				}
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
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 28rpx;
				color: #000000;

				.accordion-panel-item-right {
					width: calc(100% - 30rpx);
					height: 100%;
					display: flex;
					align-items: center;

					.accordion-panel-item-image {
						width: 48rpx;
						height: 48rpx;
						margin-right: 16rpx;

						image {
							width: 100%;
							height: 100%;
						}
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

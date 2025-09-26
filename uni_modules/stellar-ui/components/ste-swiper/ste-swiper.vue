<template>
	<!-- 轮播图根容器 -->
	<view class="ste-swiper-root" :style="[cmpRootStyle, { opacity: initializing ? 0 : 1 }]">
		<!-- 轮播内容区域，监听鼠标和触摸事件 -->
		<view
			class="swipe-content"
			@mousedown="onTouchstart"
			@mousemove="onTouchmove"
			@mouseup="onTouchend"
			@mouseleave="onTouchend"
			@touchstart="onTouchstart"
			@touchmove.stop="onTouchmove"
			@touchend="onTouchend"
			@touchcancel="onTouchend"
		>
			<!-- 轮播项容器，通过transform实现滑动效果 -->
			<view class="swipe-content-view" :style="[cmpBoxStyle, cmpBoxTransform]">
				<slot></slot>
			</view>
		</view>
		<!-- 轮播指示点容器 -->
		<view class="ste-swiper-dots" v-if="indicatorDots">
			<view
				class="swiper-dots-item"
				v-for="(m, index) in children"
				:key="index"
				:class="{
					active:
						dataIndex === index ||
						(index === 0 && dataIndex >= children.length) ||
						(index === children.length && dataIndex === -1),
				}"
			/>
		</view>
	</view>
</template>

<script>
import utils from '../../utils/utils';
import TouchEvent from '../ste-touch-swipe/TouchEvent.js';
import { parentMixin } from '../../utils/mixin.js';

/**
 * ste-swiper 轮播
 * @description 轮播组件
 * @tutorial https://stellar-ui.intecloud.com.cn/pc/index/index?name=ste-swiper
 * @property {Number} 						current  				当前显示所在滑块的 index
 * @property {String}							direction				滑动方向  "horizontal" | "vertical"
 * @value horizontal 水平（默认,必须固定宽度）
 * @value vertical 纵向(必须固定高度)
 * @property {Boolean} 						disabled 				是否禁用
 * @property {Number | String} 		width						宽度,默认值100%
 * @property {Number | String} 		height					高度,默认值100%
 * @property {Number} 						duration				切换动画时常
 * @property {Number}							swipeThreshold	滑动灵敏度（0-1之间的小数，数值越小越灵敏）
 * @property {Boolean}						indicatorDots		是否显示面板指示点
 * @property {String}							indicatorColor	指示点颜色，默认rgba(0,0,0,0.3)
 * @property {String}							indicatorActiveColor	当前选中的指示点颜色，默认#000000
 * @property {Boolean}						autoplay				是否自动切换
 * @property {Number}							interval				自动切换时间间隔，默认3000
 * @property {Boolean}						circular				是否采用衔接滑动，即播放到末尾后重新回到开头
 * @property {Number | String}		previousMargin	前边距，可用于露出前一项的一小部分
 * @property {Number | String}		nextMargin			后边距，可用于露出后一项的一小部分
 * @property {Boolean}						highlightActive	是否启用突出显示模式（当前项正常大小，非当前项缩小）
 * @event {(index:number)=>void} change 切换事件
 */
export default {
	group: '导航组件',
	title: 'Swiper 轮播组件',
	name: 'ste-swiper',
	mixins: [parentMixin('ste-swiper')],
	props: {
		// 当前所在滑块的 index
		current: {
			type: [Number, null],
			default: () => 0,
		},
		// 滑动方向  "horizontal" | "vertical"
		direction: {
			type: [String, null],
			default: () => 'horizontal',
		},
		// 是否禁用轮播
		disabled: {
			type: [Boolean, null],
			default: () => false,
		},
		// 轮播图宽度
		width: {
			type: [Number, String, null],
			default: () => null,
		},
		// 轮播图高度
		height: {
			type: [Number, String, null],
			default: () => null,
		},
		// 切换动画持续时间（毫秒）
		duration: {
			type: [Number, null],
			default: () => 300,
		},
		// 滑动阈值，控制滑动切换的灵敏度（0-1之间的小数）
		swipeThreshold: {
			type: [Number, null],
			default: () => 0.35,
		},
		// 是否显示面板指示点
		indicatorDots: {
			type: [Boolean, null],
			default: () => false,
		},
		// 指示点颜色
		indicatorColor: {
			type: [String, null],
			default: () => '#fff',
		},
		// 当前选中指示点颜色
		indicatorActiveColor: {
			type: [String, null],
			default: () => '#fff',
		},
		// 是否自动播放
		autoplay: {
			type: [Boolean, null],
			default: () => false,
		},
		// 自动切换时间间隔（毫秒）
		interval: {
			type: [Number, null],
			default: () => 3000,
		},
		// 是否采用衔接滑动（循环模式）
		circular: {
			type: [Boolean, null],
			default: () => false,
		},
		// 前边距，可用于露出前一项的一小部分
		previousMargin: {
			type: [Number, String, null],
			default: () => 0,
		},
		// 后边距，可用于露出后一项的一小部分
		nextMargin: {
			type: [Number, String, null],
			default: () => 0,
		},
		// 是否启用突出显示模式（当前项正常大小，非当前项缩小）
		highlightActive: {
			type: [Boolean, null],
			default: () => false,
		},
	},
	data() {
		return {
			initializing: true, // 组件初始化状态标识
			moveing: false, // 是否正在滑动中
			reseting: false, // 是否正在重置边界位置
			dataIndex: 0, // 当前显示项的索引
			touch: new TouchEvent(), // 触摸事件处理对象
			boxWidth: null, // 轮播容器宽度
			boxHeight: null, // 轮播容器高度
			translateX: 0, // X轴偏移量
			translateY: 0, // Y轴偏移量
			childrenTimeout: null, // 子元素更新定时器
			durationTimeout: null, // 滑动动画时长定时器
			autoplayTimeout: null, // 自动切换定时器
			boundaryTimeout: null, // 边界检测定时器
			source: 'autoplay', // 切换来源（autoplay:自动播放, touch:手动滑动）
		};
	},
	computed: {
		// 计算实际动画时长
		cmpDuration() {
			// 如果自动播放且duration大于等于interval，则使用interval作为动画时长
			return this.autoplay && this.duration >= this.interval ? this.interval : this.duration;
		},
		// 根节点样式计算
		cmpRootStyle() {
			// 根据方向设置默认宽高
			let width = this.direction === 'horizontal' ? '100%' : 'auto';
			let height = this.direction === 'vertical' ? '100%' : 'auto';

			// 如果设置了width/height属性，则使用设置的值
			if (this.width) width = utils.formatPx(this.width);
			if (this.height) height = utils.formatPx(this.height);

			return {
				'--swiper-width': width,
				'--swiper-height': height,
				'--swiper-indicator-color': this.indicatorColor,
				'--swiper-indicator-active-color': this.indicatorActiveColor,
				'--swiper-root-padding':
					this.direction === 'horizontal'
						? `0  ${utils.formatPx(this.nextMargin)} 0 ${utils.formatPx(this.previousMargin)}`
						: `${utils.formatPx(this.previousMargin)} 0 ${utils.formatPx(this.nextMargin)} 0`,
			};
		},
		// 轮播容器样式计算
		cmpBoxStyle() {
			let style = {};
			// 根据方向设置网格布局
			if (this.direction === 'horizontal') {
				// 水平方向：每项占100%宽度
				style.gridTemplateColumns = `repeat(${this.children.length || 'auto-fill'}, 100%)`;
			} else if (this.direction === 'vertical') {
				// 垂直方向：每项占100%高度
				style.gridTemplateRows = `repeat(${this.children.length || 'auto-fill'}, 100%)`;
			}
			return style;
		},
		// 轮播容器变换样式计算
		cmpBoxTransform() {
			let transform = '';
			// 根据方向设置变换方式
			if (this.direction === 'horizontal') {
				transform = `translateX(${this.translateX}px)`;
			} else if (this.direction === 'vertical') {
				transform = `translateY(${this.translateY}px)`;
			}

			// 设置过渡动画时长
			const duration = this.initializing || this.moveing || this.reseting ? 'inherit' : `${this.cmpDuration}ms`;
			return { transform, transitionDuration: duration };
		},
		// 第一个轮播项组件引用
		cmpStartComponent() {
			return this.children[0];
		},
		// 最后一个轮播项组件引用
		cmpEndComponent() {
			return this.children[this.children.length - 1];
		},
	},
	watch: {
		// 监听current属性变化
		current: {
			handler(v) {
				// 如果没有子元素，直接设置dataIndex
				if (!this.children.length) {
					this.dataIndex = v;
					return;
				}
				// 限制index范围在合法区间内
				this.dataIndex = v < 0 ? 0 : v >= this.children.length ? this.children.length - 1 : v;
			},
			immediate: true,
		},
		// 监听dataIndex变化
		dataIndex: {
			handler() {
				// 如果没有子元素则返回
				if (!this.children.length) return;
				this.$nextTick(async () => {
					// 获取容器尺寸并设置变换
					await this.getBoxSize();
					this.setTransform();
				});
			},
			immediate: true,
		},
		// 监听子元素变化
		children: {
			handler(v) {
				if (!v || !v.length) return;
				this.$nextTick(() => {
					this.init();
				});
			},
			immediate: true,
		},
	},
	mounted() {
		// 组件挂载后初始化
		this.init();
	},
	beforeDestroy() {
		// 组件销毁前清理所有定时器
		this.clearAllTimeouts();
	},
	methods: {
		// 初始化方法
		init() {
			// 清理所有定时器
			this.clearAllTimeouts();
			// 设置子元素更新定时器
			this.childrenTimeout = setTimeout(async () => {
				// 获取容器尺寸
				await this.getBoxSize();
				// 设置变换
				this.setTransform();
				// 重置边界
				this.resetBoundary();
				// 设置自动播放
				this.setAutoplay();
				// 清理子元素定时器
				clearTimeout(this.childrenTimeout);
				// 设置初始化完成定时器
				this.childrenTimeout = setTimeout(() => {
					this.initializing = false;
				}, this.cmpDuration);
			}, 25);
		},
		// 判断是否可以滑动
		isMover(moveX = 0, moveY = 0) {
			// 如果子元素少于2个则无法滑动
			if (this.children.length < 2) return;
			// 如果是循环模式可以直接滑动
			if (this.circular) return true;

			// 水平方向判断边界
			if (
				this.direction === 'horizontal' &&
				((this.dataIndex === 0 && moveX > 0) || (this.dataIndex === this.children.length - 1 && moveX < 0))
			) {
				return false;
			}

			// 垂直方向判断边界
			if (
				this.direction === 'vertical' &&
				((this.dataIndex === 0 && moveY > 0) || (this.dataIndex === this.children.length - 1 && moveY < 0))
			) {
				return false;
			}

			return true;
		},
		// 获取轮播容器尺寸
		async getBoxSize() {
			// 如果已经获取过尺寸则直接返回
			if (this.boxWidth > 0 && this.boxHeight > 0) return;
			// 查询轮播容器元素
			const boxEl = await utils.querySelector('.swipe-content-view', this);
			// 设置宽高
			this.boxWidth = boxEl.width;
			this.boxHeight = boxEl.height;
		},
		// 设置变换
		setTransform(moveX = 0, moveY = 0) {
			// 如果子元素少于2个则无需变换
			if (this.children?.length < 2) return;
			// 判断是否可以移动
			const bool = this.isMover(moveX, moveY);
			if (!bool) return;

			// 水平方向处理
			if (this.direction === 'horizontal') {
				// 如果垂直移动距离大于水平移动距离则返回
				if (Math.abs(moveX) < Math.abs(moveY)) return;
				// 计算X轴偏移量
				const translateX = -this.dataIndex * this.boxWidth + moveX;
				// 如果移动距离过小则返回
				if (moveX !== 0 && Math.abs(this.translateX - translateX) < 3) return;
				// 更新X轴偏移量
				this.translateX = translateX;
				// 设置边界
				this.setBoundary(moveX);

				// 滑动时实时更新缩放效果（只支持水平方向）
				if (this.highlightActive) {
					this.updateLinearScale(moveX);
				}
			}
			// 垂直方向处理
			else if (this.direction === 'vertical') {
				// 如果水平移动距离大于垂直移动距离则返回
				if (Math.abs(moveX) > Math.abs(moveY)) return;
				// 计算Y轴偏移量
				const translateY = -this.dataIndex * this.boxHeight + moveY;
				// 如果移动距离过小则返回
				if (moveY !== 0 && Math.abs(this.translateY - translateY) < 3) return;
				// 更新Y轴偏移量
				this.translateY = translateY;
				// 设置边界
				this.setBoundary(0, moveY);
				// 纵向滑动不支持突出显示模式
			}
		},
		// 触摸开始事件处理
		async onTouchstart(e) {
			// 如果禁用则返回
			if (this.disabled) return;
			// 如果子元素少于2个则返回
			if (this.children?.length < 2) return;
			// 设置滑动状态
			this.moveing = true;

			// 获取容器尺寸
			await this.getBoxSize();
			// 清理所有定时器
			this.clearAllTimeouts();
			// 重置边界
			this.resetBoundary();
			// 触摸开始处理
			this.touch.touchStart(e);
		},
		// 触摸移动事件处理
		onTouchmove(e) {
			// 如果禁用则返回
			if (this.disabled) return;
			// 如果子元素少于2个则返回
			if (this.children?.length < 2) return;
			// 触摸移动处理
			const res = this.touch.touchMove(e);
			if (!res) return;
			// 设置滑动状态
			this.moveing = true;
			// 获取移动距离
			let { moveX, moveY } = res;
			// 设置变换
			this.setTransform(moveX, moveY);
		},
		// 触摸结束事件处理
		onTouchend(e) {
			// 设置滑动状态为false
			this.moveing = false;
			// 设置动画时长定时器
			clearTimeout(this.durationTimeout);
			this.durationTimeout = setTimeout(() => {
				// 设置自动播放
				this.setAutoplay();
				// 重置边界
				this.resetBoundary();
			}, this.cmpDuration);

			// 如果禁用则返回
			if (this.disabled) return;
			// 获取移动距离
			const { moveX, moveY } = this.touch.touchEnd(e);
			// 水平方向无移动或垂直方向无移动则返回
			if (this.direction === 'horizontal' && !moveX) return;
			else if (this.direction === 'vertical' && !moveY) return;
			// 判断是否可以移动
			const bool = this.isMover(moveX, moveY);
			if (!bool) return;

			// 计算目标索引
			let index = this.dataIndex;
			// 水平方向根据移动距离和阈值判断是否切换
			if (this.direction === 'horizontal' && Math.abs(moveX) > this.boxWidth * this.swipeThreshold) {
				index = moveX > 0 ? index - 1 : index + 1;
			}
			// 垂直方向根据移动距离和阈值判断是否切换
			else if (this.direction === 'vertical' && Math.abs(moveY) > this.boxHeight * this.swipeThreshold) {
				index = moveY > 0 ? index - 1 : index + 1;
			}

			// 如果索引未变则重置变换
			if (this.dataIndex === index) {
				this.setTransform();
				return;
			}

			// 设置来源为触摸
			this.source = 'touch';
			// 更新索引
			this.dataIndex = index;
			// 触发change事件
			if (next >= 0 && next <= this.children.length - 1) {
				this.$emit('change', next, this.source);
			}
		},
		// 设置自动播放
		setAutoplay() {
			// 只有在启用自动播放且有多个子元素时才启动定时器
			if (!this.autoplay || this.children?.length < 2) {
				return;
			}
			// 清理自动播放定时器
			clearInterval(this.autoplayTimeout);
			// 设置自动播放定时器
			this.autoplayTimeout = setInterval(() => {
				// 再次检查条件，确保组件仍然需要自动播放
				if (!this.autoplay || this.children?.length < 2) {
					clearInterval(this.autoplayTimeout);
					return;
				}

				// 计算下一个索引
				let next = 0;
				if (this.circular) {
					// 循环模式下正确处理索引
					next = this.dataIndex + 1;
				} else if (this.dataIndex + 1 <= this.children.length - 1) {
					// 普通模式下到达末尾后停止
					next = this.dataIndex + 1;
				} else {
					// 回到开头
					next = 0;
				}

				// 设置边界
				this.setBoundary(-1, -1);
				// 设置来源为自动播放
				this.source = 'autoplay';
				// 更新索引
				this.dataIndex = next;
				// 触发change事件
				if (next >= 0 && next <= this.children.length - 1) {
					this.$emit('change', next, this.source);
				}

				// 设置动画时长定时器
				clearTimeout(this.durationTimeout);
				this.durationTimeout = setTimeout(() => {
					// 重置边界
					this.resetBoundary();
					// 如果启用了突出显示模式
					if (this.highlightActive) {
						clearTimeout(this.durationTimeout);
						this.durationTimeout = setTimeout(() => {
							// 更新线性缩放
							this.updateLinearScale();
						});
					}
				}, this.cmpDuration);
			}, this.interval);
		},
		// 设置边界位置
		setBoundary(moveX = 0, moveY = 0) {
			// 如果不是循环模式则返回
			if (!this.circular) return;
			// 如果子元素少于2个则返回
			if (this.children?.length < 2) return;

			// 获取首尾组件引用
			const startComponent = this.cmpStartComponent;
			const endComponent = this.cmpEndComponent;
			// 获取子元素数量、宽度和高度
			const length = this.children.length;
			const width = this.boxWidth;
			const height = this.boxHeight;

			// 如果索引小于等于0（第一个元素）
			if (this.dataIndex <= 0) {
				// 重置起始组件变换
				startComponent.setTransform({});
				// 如果是水平方向且向右滑动
				if (this.direction === 'horizontal' && moveX > 0) {
					// 设置末尾组件位置到最左侧
					endComponent.setTransform({ x: -length * width });
				}
				// 如果是垂直方向且向下滑动
				else if (this.direction === 'vertical' && moveY > 0) {
					// 设置末尾组件位置到最顶部
					endComponent.setTransform({ y: -length * height });
				}
			}
			// 如果索引大于等于长度减1（最后一个元素）
			else if (this.dataIndex >= length - 1) {
				// 重置末尾组件变换
				endComponent.setTransform({});
				// 如果是水平方向且向左滑动
				if (this.direction === 'horizontal' && moveX < 0) {
					// 设置起始组件位置到最右侧
					startComponent.setTransform({ x: length * width });
				}
				// 如果是垂直方向且向上滑动
				else if (this.direction === 'vertical' && moveY < 0) {
					// 设置起始组件位置到最底部
					startComponent.setTransform({ y: length * height });
				}
			}
		},
		// 重置边界
		resetBoundary() {
			// 清理边界定时器
			clearTimeout(this.boundaryTimeout);
			// 判断是否需要重置边界
			let change = false;
			// 如果索引为-1（从第一个滑到最后一个）
			if (this.dataIndex === -1) {
				this.dataIndex = this.children.length - 1;
				change = true;
			}
			// 如果索引超出范围（从最后一个滑到第一个）
			else if (this.dataIndex === this.children.length) {
				this.dataIndex = 0;
				change = true;
			}

			// 边界重置完成
			if (change) {
				// 触发change事件
				this.$emit('change', this.dataIndex, this.source);
				// 边界重置后，需要重新设置子元素位置
				this.reseting = true;
			}

			const length = this.children.length;
			// 遍历所有子元素设置变换
			this.children.forEach((component, index) => {
				let x = 0,
					y = 0;
				// 如果是循环模式
				if (this.circular) {
					// 处理最后一个元素且当前索引为0的情况
					if (index === length - 1 && this.dataIndex === 0 && length > 2) {
						x = this.direction === 'horizontal' ? -length * this.boxWidth : 0;
						y = this.direction === 'vertical' ? -length * this.boxHeight : 0;
					}
					// 处理第一个元素且当前索引为最后一个的情况
					else if (index === 0 && this.dataIndex === length - 1 && length > 2) {
						x = this.direction === 'horizontal' ? length * this.boxWidth : 0;
						y = this.direction === 'vertical' ? length * this.boxHeight : 0;
					}
				}
				// 设置组件变换
				component?.setTransform({ x, y });
			});
			// 设置重置完成定时器
			this.boundaryTimeout = setTimeout(() => {
				this.reseting = false;
			}, this.cmpDuration);
		},

		// 更新线性缩放（突出显示模式）
		updateLinearScale(moveX = 0) {
			// 如果没有子元素则返回
			if (!this.children.length) return;
			// 只有水平方向支持突出显示
			if (this.direction !== 'horizontal') return;

			// 处理边界情况下的索引
			let actualIndex = this.dataIndex;
			const length = this.children.length;

			// 处理循环边界情况
			if (this.circular) {
				if (actualIndex === -1) {
					actualIndex = length - 1; // 从第一个滑到最后一个
				} else if (actualIndex === length) {
					actualIndex = 0; // 从最后一个滑到第一个
				}
			}

			const itemSize = this.boxWidth;

			// 计算当前视口中心位置，需要考虑边界切换的实际视觉位置
			let currentPosition;
			if (this.circular) {
				if (this.dataIndex === -1) {
					// 从第一个滑到最后一个，视觉中心在左边
					currentPosition = -itemSize - moveX;
				} else if (this.dataIndex === length) {
					// 从最后一个滑到第一个，视觉中心在右边
					currentPosition = length * itemSize - moveX;
				} else {
					// 正常情况
					currentPosition = actualIndex * itemSize - moveX;
				}
			} else {
				currentPosition = actualIndex * itemSize - moveX;
			}

			// 判断是否有前后边距（可以看到相邻元素）
			const hasMargin = this.previousMargin > 0 || this.nextMargin > 0;

			// 确定需要处理的元素索引
			const visibleIndices = new Set();
			visibleIndices.add(actualIndex); // 当前元素

			if (hasMargin && length > 1) {
				// 前一个元素
				const prevIndex = (actualIndex - 1 + length) % length;
				visibleIndices.add(prevIndex);

				// 后一个元素
				const nextIndex = (actualIndex + 1) % length;
				visibleIndices.add(nextIndex);

				// 如果正在滑动，可能需要处理更多元素
				if (moveX !== 0) {
					// 滑动过程中可能会看到第4个元素
					if (moveX > itemSize / 2) {
						const prevPrevIndex = (actualIndex - 2 + length) % length;
						visibleIndices.add(prevPrevIndex);
					}
					if (moveX < -itemSize / 2) {
						const nextNextIndex = (actualIndex + 2) % length;
						visibleIndices.add(nextNextIndex);
					}
				}
			}

			// 只处理可见元素的缩放
			this.children.forEach((component, index) => {
				if (!visibleIndices.has(index)) {
					// 不可见元素直接设为最小缩放
					component?.setLinearScale(0.8);
					return;
				}

				let itemCenter = index * itemSize;

				// 在循环模式下，处理边界元素的特殊位置
				if (this.circular && length > 2) {
					// 当从第一个滑到最后一个时，最后一个元素在第一个元素左边
					if (this.dataIndex === -1 && index === length - 1) {
						itemCenter = -itemSize;
					}
					// 当从最后一个滑到第一个时，第一个元素在最后一个元素右边
					else if (this.dataIndex === length && index === 0) {
						itemCenter = length * itemSize;
					}
					// 处理正常循环中的边界情况
					else if (actualIndex === 0 && index === length - 1 && moveX > 0) {
						// 向右滑动查看最后一个元素
						itemCenter = -itemSize;
					} else if (actualIndex === length - 1 && index === 0 && moveX < 0) {
						// 向左滑动查看第一个元素
						itemCenter = length * itemSize;
					}
				}

				// 计算相对于当前视口中心的距离
				const distance = Math.abs(itemCenter - currentPosition);
				// 将距离转换为相对于一个项目宽度的比例
				const distanceRatio = distance / itemSize;

				// 计算缩放比例：距离中心越近越大，最大1.0，最小0.8
				let scale = Math.max(0.8, 1 - distanceRatio * 0.2);

				component?.setLinearScale(scale);
			});
		},
		// 清理所有定时器
		clearAllTimeouts() {
			clearTimeout(this.childrenTimeout);
			clearTimeout(this.durationTimeout);
			clearTimeout(this.boundaryTimeout);
			clearInterval(this.autoplayTimeout);
		},
	},
};
</script>

<style lang="scss" scoped>
.ste-swiper-root {
	width: var(--swiper-width);
	height: var(--swiper-height);
	overflow: hidden;
	padding: var(--swiper-root-padding);
	position: relative;

	.swipe-content {
		width: var(--swiper-width);
		height: var(--swiper-height);

		.swipe-content-view {
			width: var(--swiper-width);
			height: var(--swiper-height);
			display: grid;
		}
	}

	.ste-swiper-dots {
		position: absolute;
		bottom: 18rpx;
		z-index: 1;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;

		.swiper-dots-item {
			width: 8rpx;
			height: 8rpx;
			border-radius: 6rpx;
			background-color: var(--swiper-indicator-color);

			&.active {
				width: 24rpx;
				background-color: var(--swiper-indicator-active-color);
			}

			& + .swiper-dots-item {
				margin-left: 8rpx;
			}
		}
	}
}
</style>

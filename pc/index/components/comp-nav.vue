<template>
	<view class="comp-nav">
		<view class="nav-box" id="navBox">
			<view class="slider-bg" :style="sliderStyle"></view>
			<view
				class="nav-item"
				:class="item.key === active ? 'active' : ''"
				v-for="item in navData"
				:key="item.key"
				@click="clickNav(item)"
				:id="`navItem${item.key}`"
			>
				{{ item.title }}
			</view>
		</view>
		<view class="line" />
	</view>
</template>

<script>
import utils from '@/common/utils.js';
import config from '@/common/config.js';
export default {
	props: {
		mode: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			navData: config.NAV_COMP_DATA,
			active: '',
			sliderStyle: {
				transform: 'translateX(0)',
				width: '0px',
			},
		};
	},
	watch: {
		mode: {
			handler(val) {
				if (val) {
					this.active = val;
					this.$nextTick(() => {
						this.updateSliderPosition();
					});
				}
			},
			immediate: true,
		},
		active() {
			this.$nextTick(() => {
				this.updateSliderPosition();
			});
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.updateSliderPosition();
		});
	},
	methods: {
		clickNav(item) {
			this.active = item.key;
			this.$emit('update:mode', item.key);
			this.$emit('change', item);
		},
		async updateSliderPosition() {
			const navBox = await utils.querySelector('#navBox', this);
			const data = await utils.querySelector(`#navItem${this.active}`, this);
			if (data && navBox) {
				// 计算相对位置
				const relativeLeft = data.left - navBox.left - 4;
				this.sliderStyle = {
					transform: `translateX(${relativeLeft}px)`,
					width: `${data.width}px`,
				};
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.comp-nav {
	padding-left: var(--pc-padding);
	display: flex;
	align-items: center;
	width: 100%;
	.line {
		flex: 1;
		border-bottom: 1px solid #ddd;
	}
	.nav-box {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		background: rgb(244, 244, 245);
		height: 48px;
		cursor: pointer;
		border: 1px solid rgb(220, 223, 230);
		position: relative;

		.slider-bg {
			position: absolute;
			height: calc(100% - 8px);
			top: 4px;
			left: 4px;
			background-color: #fff;
			border-radius: 3px;
			transition: all cubic-bezier(0.38, 0, 0.24, 1) 0.24s;
			box-shadow: 0 2px 4px #00000026;
			z-index: 1;
		}

		.nav-item {
			margin: 4px;
			padding: 8px 24px;
			font-size: 16px;
			box-sizing: border-box;
			border-radius: 3px;
			position: relative;
			word-break: keep-all;
			white-space: nowrap;
			z-index: 2;

			&.active {
				color: #000;
			}
		}
	}
}
</style>

<template>
	<view class="version-switcher" @click.stop>
		<view class="version-selected" @tap="toggleDropdown">
			<text class="version-text">{{ currentVersion }}</text>
			<text class="arrow" :class="{ 'arrow-up': isOpen }"></text>
		</view>
		<view class="dropdown-menu" v-if="isOpen">
			<view
				v-for="version in versions"
				:key="version.value"
				class="dropdown-item"
				:class="{ active: currentVersion === version.label }"
				@click="switchVersion(version)"
			>
				<a :href="version.url" class="version-text">{{ version.label }}</a>
				<text v-if="currentVersion === version.label" class="check-icon">✓</text>
			</view>
		</view>
	</view>
</template>

<script>
import config from '@/common/config';
export default {
	name: 'VersionSwitcher',
	data() {
		return {
			isOpen: false,
			currentVersion: 'Vue 2.x',
			versions: [
				{
					label: 'Vue 2.x',
					value: 'v2',
					url: config.BASE_WEB_URL + '/pc/index/index',
				},
				{
					label: 'Vue 3.x',
					value: 'v3',
					url: config.BASE_WEB_URL + '/plus',
				},
			],
			hoverIndex: -1,
		};
	},

	mounted() {
		this.bindGlobalClick();
	},

	beforeDestroy() {
		this.unbindGlobalClick();
	},

	methods: {
		toggleDropdown() {
			this.isOpen = !this.isOpen;
		},

		hideDropdown() {
			this.isOpen = false;
		},

		switchVersion(version) {
			if (this.currentVersion === version.label) {
				this.hideDropdown();
				return;
			}
			// 跳转到对应版本的页面
			// uni.navigateTo({
			// 	url: version.url,
			// });
			this.currentVersion = version.label;
			this.hideDropdown();
		},

		checkClickOutside(e) {
			// 获取组件根元素
			const componentEl = e.target.closest('.version-switcher');
			// 如果点击的不是组件内部元素，则关闭下拉框
			if (!componentEl && this.isOpen) {
				this.hideDropdown();
			}
		},
		bindGlobalClick() {
			// #ifdef H5
			document.addEventListener('click', this.checkClickOutside);
			// #endif
		},

		unbindGlobalClick() {
			// #ifdef H5
			document.removeEventListener('click', this.checkClickOutside);
			// #endif
		},
	},
};
</script>

<style scoped>
.version-switcher {
	position: relative;
	display: inline-block;
	min-width: 120px;
	/* #ifdef H5 */
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	/* #endif */
}

.version-selected {
	padding: 8px 16px;
	background: #fff;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: all 0.3s ease;
	/* #ifdef H5 */
	cursor: pointer;
	&:hover {
		border-color: var(--pc-main-color);
		color: var(--pc-main-color);
	}
	/* #endif */
}

.version-text {
	font-size: 14px;
	color: #606266;
	text-decoration: none;
}

.arrow {
	display: inline-block;
	width: 0;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 6px solid #909399;
	transition: transform 0.3s;
	margin-left: 8px;
}

.arrow-up {
	transform: rotate(180deg);
}

.dropdown-menu {
	position: absolute;
	top: calc(100% + 4px);
	left: 0;
	right: 0;
	background: #fff;
	border: 1rpx solid #dcdfe6;
	border-radius: 4px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	z-index: 100;
	overflow: hidden;
	transition: all 0.3s ease;
	animation: slideDown 0.2s ease-out;
}

.dropdown-item {
	padding: 8px 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: all 0.2s ease;
	cursor: pointer;
	/* #ifdef H5 */
	&:hover {
		background-color: #f5f7fa;
		color: var(--pc-main-color);
	}
	/* #endif */
}

.active {
	color: var(--pc-main-color);
	background-color: #ecf5ff;
}

.check-icon {
	font-size: 12px;
	color: var(--pc-main-color);
}

@keyframes slideDown {
	from {
		opacity: 0;
		transform: translateY(-10rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 移动端点击反馈效果 */
.dropdown-item:active {
	background-color: #f5f7fa;
}

/* 禁用文本选择 */
.version-text,
.check-icon {
	/* #ifdef H5 */
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	/* #endif */
}
</style>

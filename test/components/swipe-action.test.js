import { expect, test, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import SwipeAction from '../../uni_modules/stellar-ui/components/ste-swipe-action/ste-swipe-action.vue';
import SwipeActionGroup from '../../uni_modules/stellar-ui/components/ste-swipe-action-group/ste-swipe-action-group.vue';
import { style2obj } from '../methods';

describe('Test SwipeActionGroup', async () => {
	test('SwipeAction', async () => {
		const wrapper = mount(SwipeAction, {
			template: `<ste-swipe-action>
				<view style="height: 90rpx;">内容区域</view>
				<template v-slot:right>
					<div data-test="right-btn" style="width:100px;height: 100%;">删除</div>
				</template>
			</ste-swipe-action>`
		})
		await nextTick();
		const el = wrapper.find('[data-test="swipe-action-view"]');
		expect(el.exists()).toBe(true);
	})

	const items = Array.from({ length: 10 }, (_, i) => ({
		components: { SwipeAction },
		template: `<SwipeAction>
			<div style="height: 90rpx;">单元格${i + 1}</div>
			<template v-slot:right>
				<div data-test="right-btn" style="width:100px;height: 100%;">侧边按钮</div>
			</template>
		</SwipeAction>`
	}));

	const wrapper = mount(SwipeActionGroup, {
		slots: {
			// 将子组件传递给默认插槽，并为子组件传参
			default: items
		},
		propsData: {
			mode: "right",
			autoClose: true,
			disabled: false,
			swipeThreshold: 0.35,
			duration: 300,
			leftIcon: false,
			rightIcon: false,
		},
	});

	test('SwipeActionGroup', async () => {
		const itemEls = wrapper.findAll('[data-test="swipe-action"]');
		expect(itemEls.length).toBe(10);
	});

	test('mode', async () => {
		expect(wrapper.props('mode')).toBe('right');
	})
	test('autoClose', async () => {
		expect(wrapper.props('autoClose')).toBe(true);
	})
	test('disabled', async () => {
		expect(wrapper.props('disabled')).toBe(false);
	})
	test('swipeThreshold', async () => {
		expect(wrapper.props('swipeThreshold')).toBe(0.35);
	})
	test('duration', async () => {
		expect(wrapper.props('duration')).toBe(300);
	})
	test('leftIcon', async () => {
		expect(wrapper.props('leftIcon')).toBe(false);
	})
	test('rightIcon', async () => {
		expect(wrapper.props('rightIcon')).toBe(false);
	})

});

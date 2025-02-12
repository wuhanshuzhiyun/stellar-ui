import { expect, test, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import SwipeAction from '../../uni_modules/stellar-ui/components/ste-swipe-action/ste-swipe-action.vue';
import SwipeActionGroup from '../../uni_modules/stellar-ui/components/ste-swipe-action-group/ste-swipe-action-group.vue';

describe('Test SwipeActionGroup', () => {
	test('default', () => {
		const wrapper = mount(SwipeActionGroup, {
			propsData: { mode: "left" },
			slots: {
				// 将子组件传递给默认插槽，并为子组件传参
				default: [SwipeAction]
			}
		});
		const contentEl = wrapper.findAll('[data-test="swipe-action"]');
		expect(contentEl.length).toBe(1);
	});

});

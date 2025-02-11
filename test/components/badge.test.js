import { expect, test, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steBadge from '../../uni_modules/stellar-ui/components/ste-badge/ste-badge.vue';

describe('Test Badge', () => {
	test('content & position & offset', () => {
		const wrapper = mount(steBadge, {
			propsData: {
				content: 80,
				position: 'topLeft',
				// offsetX: 5, // 设备信息API获取不到
				// offsetY: 5
			},
		});
		const contentEl = wrapper.get('.ste-badge-content-text');
		expect(contentEl.text()).toEqual('80');

		const contentBoxEl = wrapper.get('.ste-badge-content');
		expect(contentBoxEl.classes()).toContain('ste-badge-topLeft');
	});

	test('dot', () => {
		const wrapper = mount(steBadge, {
			propsData: {
				showDot: true,
			},
		});
		const dotEl = wrapper.get('.dot-box');
		expect(dotEl);
	});

	test('background', () => {
		const wrapper = mount(steBadge, {
			propsData: {
				background: 'rgb(25, 137, 250)',
				content: 1,
			},
		});
		const contentEl = wrapper.get('.ste-badge-content');
		expect(contentEl.element.style.backgroundColor).toBe('rgb(25, 137, 250)');
	});

	test('zero', () => {
		const wrapper = mount(steBadge, {
			propsData: {
				showZero: true,
				content: 0,
			},
		});
		const contentEl = wrapper.get('.ste-badge-content-text');
		expect(contentEl.text()).toBe('0');
	});

	test('max', () => {
		const max = 99;
		const wrapper = mount(steBadge, {
			propsData: {
				max,
				content: 100,
			},
		});
		const contentEl = wrapper.get('.ste-badge-content-text');
		expect(contentEl.text()).toBe(max + '+');
	});

	test('slot', () => {
		const wrapper = mount(steBadge, {
			slots: {
				content: 'slot',
			},
		});
		const contentEl = wrapper.get('.ste-badge-content');
		expect(contentEl.text()).toContain('slot');
	});
});

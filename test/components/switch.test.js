import { mount, shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steSwitch from '../../uni_modules/stellar-ui/components/ste-switch/ste-switch.vue';
import { expect } from 'vitest';

describe('Switch', () => {
	let size = 100;
	const wrapper = mount(steSwitch, {
		propsData: {
			size,
		},
	});
	const switchDom = wrapper.get('[data-test="switch"]');

	test('size', () => {
		let width = (size * 2 + 4) / 2 + 'px';
		let height = (size + 4) / 2 + 'px';
		expect(switchDom.element.style._values.width).toBe(width);
		expect(switchDom.element.style._values.height).toBe(height);
	});

	test('activeColor', () => {
		let activeColor = 'red';
		const wrapper = mount(steSwitch, {
			propsData: {
				value: true,
				activeColor,
			},
		});
		const switchDom = wrapper.get('[data-test="switch"]');
		expect(switchDom.element.style._values.background).toBe(activeColor);
	});

	test('inactiveColor', () => {
		let inactiveColor = 'black';
		const wrapper = mount(steSwitch, {
			propsData: {
				inactiveColor,
			},
		});
		const switchDom = wrapper.get('[data-test="switch"]');
		expect(switchDom.element.style._values.background).toBe(inactiveColor);
	});

	test('loading', () => {
		const wrapper = mount(steSwitch, {
			propsData: {
				loading: true,
			},
		});
		expect(wrapper.contains('[data-test="loading"]')).toBe(true);
	});
});

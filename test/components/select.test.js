import { expect, test, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Select from '../../uni_modules/stellar-ui/components/ste-select/ste-select.vue';
import { style2obj } from '../methods';

describe('Select Component', () => {
	test('Select size', async () => {
		const wrapper = mount(Select, {
			propsData: {
				width: 200,
			},
		});
		await nextTick();

		const nav = wrapper.find('.ste-select-root');
		const style = style2obj(nav)
		expect(style["--ste-select-width"]).toBe('100px');
		expect(style["--ste-select-height"]).toBe('32px');
		const input = wrapper.find('.filterable-input');
		expect(input.exists()).toBe(false);
	});

	test('Select placeholder-text', async () => {
		const wrapper = mount(Select, {
			propsData: {
				placeholder: '测试请选择',
			},
		})
		await nextTick();

		const placeholder = wrapper.find('.placeholder-text');
		expect(placeholder.text()).toBe('测试请选择');

	})

	test('Select mode', async () => {
		const wrapper = mount(Select, {
			propsData: {
				mode: 'filterable',
			},
		})
		await nextTick();

		const input = wrapper.find('.filterable-input');
		expect(input.exists()).toBe(true);
	})

	
});

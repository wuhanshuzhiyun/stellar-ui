import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import NumberKeyboard from '../../uni_modules/stellar-ui/components/ste-number-keyboard/ste-number-keyboard.vue';
import { style2obj } from '../methods';
import { expect } from 'vitest';

describe('NumberKeyboard Component', () => {
	test('NumberKeyboard page-key-number', async () => {
		const wrapper = mount(NumberKeyboard, {
			propsData: {
				mode: "page"
			},
		});
		await nextTick();

		const keyboards = wrapper.findAll('[data-test="number-keyboard-item"]');
		expect(keyboards.length).toBe(13);
	});
	test('NumberKeyboard popup-default', async () => {
		const wrapper = mount(NumberKeyboard, {
			propsData: {},
		})
		await nextTick();

		const keyboard = wrapper.findAll('[data-test="number-keyboard-item"]');
		expect(keyboard.length).toBe(13);
	})
});

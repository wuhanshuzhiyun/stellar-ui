import { expect, test, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import stePopup from '../../uni_modules/stellar-ui/components/ste-popup/ste-popup.vue';

describe('Test Popup', () => {
	test('popup', async () => {
		const wrapper = mount(stePopup, {
			propsData: {
				width: 300,
				height: 300,
			},
		});
		await wrapper.setProps({ show: true });
		await nextTick();

		const rootEl = wrapper.get('.ste-popup .content');
		expect(rootEl.element.style.width).toBe('150px');
		expect(rootEl.element.style.height).toBe('150px');
	});
});

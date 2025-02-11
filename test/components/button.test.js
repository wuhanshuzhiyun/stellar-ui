import { expect, test, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steButton from '../../uni_modules/stellar-ui/components/ste-button/ste-button.vue';

describe('Test Button', () => {
	test('mode', async () => {
		const wrapper = mount(steButton);
		let rootEl = wrapper.get('.ste-button--root');
		expect(rootEl.classes()).toContain('ste-button--mode-200');

		await wrapper.setProps({ mode: 100 });
		rootEl = wrapper.get('.ste-button--root');
		expect(rootEl.classes()).toContain('ste-button--mode-100');

		await wrapper.setProps({ mode: 300 });
		rootEl = wrapper.get('.ste-button--root');
		expect(rootEl.classes()).toContain('ste-button--mode-100');

		await wrapper.setProps({ mode: 400 });
		rootEl = wrapper.get('.ste-button--root');
		expect(rootEl.classes()).toContain('ste-button--mode-100');
	});

	test('round', () => {
		const wrapper = mount(steButton);
		let rootEl = wrapper.get('.ste-button--root');
		expect(rootEl.classes()).toContain('ste-button--round');
	});

	test('disabled', () => {
		const wrapper = mount(steButton, {
			propsData: {
				disabled: true,
			},
		});
		let rootEl = wrapper.get('.ste-button--root');
		expect(rootEl.classes()).toContain('ste-button--disabled');
	});

	test('color', () => {
		const wrapper = mount(steButton, {
			propsData: {
				color: '#000000',
				background: '#FF1E19',
				borderColor: '#FF1E19',
			},
		});
		let rootEl = wrapper.get('.ste-button--root');
		expect(rootEl.element.style.color).toBe('rgb(0, 0, 0)');
		expect(rootEl.element.style.backgroundColor).toBe('rgb(255, 30, 25)');
		expect(rootEl.element.style.borderColor).toBe('#ff1e19');
	});
});

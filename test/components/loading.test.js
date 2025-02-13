import { mount, shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steLoading from '../../uni_modules/stellar-ui/components/ste-loading/ste-loading.vue';

describe('Loading', async () => {
	const wrapper = mount(steLoading, {
		propsData: {
			color: 'red',
			textColor: 'blue',
			textSize: 30,
			type: 2,
			size: 100,
			vertical: true,
		},
		slots: {
			default: '加载中',
		},
	});
	const loading = wrapper.get('[data-test="loading"]');
	const type = loading.find('.loading');
	const text = wrapper.find('.text');
	console.log('type', type.element.style._values);
	console.log('text', text.element.style._values);
	test('color', () => {
		let color = 'red';
		expect(type.element.style._values.color).toBe(color);
	});

	test('type', () => {
		let typeValue = 'loading-type-' + '2';
		expect(type.classes(typeValue)).toBe(true);
	});

	test('size', () => {
		let size = 100 / 2 + 'px';
		expect(type.element.style._values.width).toBe(size);
		expect(type.element.style._values.height).toBe(size);
	});

	test('vertical', () => {
		let vertical = 'column';
		expect(loading.element.style._values['flex-direction']).toBe(vertical);
	});

	test('slots', () => {
		let textValue = '加载中';
		expect(text.text()).toBe(textValue);
	});

	test('textColor', () => {
		let textColor = 'blue';
		expect(text.element.style._values.color).toBe(textColor);
	});

	test('textSize', () => {
		let textSize = 30 / 2 + 'px';
		expect(text.element.style._values['font-size']).toBe(textSize);
	});
});

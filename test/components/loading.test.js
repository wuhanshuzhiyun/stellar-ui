import { mount, shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steLoading from '../../uni_modules/stellar-ui/components/ste-loading/ste-loading.vue';

describe('Loading', async () => {
	let color = 'red';
	let typeValue = 2;
	let size = 100;
	let vertical = true;
	let textValue = '加载中';
	let textColor = 'blue';
	let textSize = 30;
	const wrapper = mount(steLoading, {
		propsData: {
			color,
			textSize,
			type: typeValue,
			size,
			vertical,
			textColor,
		},
		slots: {
			default: textValue,
		},
	});
	const loading = wrapper.get('[data-test="loading"]');
	const type = loading.find('.loading');
	const text = wrapper.find('.text');
	await nextTick();

	test('color', () => {
		expect(type.element.style._values.color).toBe(color);
	});

	test('type', () => {
		let typeValue2 = 'loading-type-' + typeValue;
		expect(type.classes(typeValue2)).toBe(true);
	});

	test('size', () => {
		let size2 = size / 2 + 'px';
		expect(type.element.style._values.width).toBe(size2);
		expect(type.element.style._values.height).toBe(size2);
	});

	test('vertical', () => {
		let vertical2 = vertical ? 'column' : 'row';
		expect(loading.element.style._values['flex-direction']).toBe(vertical2);
	});

	test('slots', () => {
		expect(text.text()).toBe(textValue);
	});

	test('textColor', () => {
		expect(text.element.style._values.color).toBe(textColor);
	});

	test('textSize', () => {
		let textSize2 = textSize / 2 + 'px';
		expect(text.element.style._values['font-size']).toBe(textSize2);
	});
});

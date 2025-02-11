import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steIcon from '../uni_modules/stellar-ui/components/ste-icon/ste-icon.vue';

describe('Icon', async () => {
	const wrapper = mount(steIcon, {
		propsData: {
			code: '&#xe653;',
			size: 50,
			color: '#1989fa',
			bold: true,
			marginLeft: 10,
			marginRight: 10,
			marginTop: 10,
			marginBottom: 10,
			fontFamily: 'iconfont',
			inlineBlock: false,
		},
	});
	const icon = wrapper.get('[data-test="icon"]');
	await nextTick();

	test('code', () => {
		let code = String.fromCharCode('&#xe653;'.replace('&#', '0').replace(';', ''));
		expect(icon.text()).toBe(code);
	});

	test('size', () => {
		let size = 50 / 2 + 'px';
		expect(icon.element.style._values['--size']).toBe(size);
	});

	test('color', () => {
		let color = '#1989fa';
		expect(icon.element.style._values['--color']).toBe(color);
	});

	test('bold', () => {
		let weight = 'bold';
		expect(icon.element.style._values['--weight']).toBe(weight);
	});

	test('margin', () => {
		let margin = 10 / 2 + 'px';
		expect(icon.element.style._values['--margin-left']).toBe(margin);
		expect(icon.element.style._values['--margin-right']).toBe(margin);
		expect(icon.element.style._values['--margin-top']).toBe(margin);
		expect(icon.element.style._values['--margin-bottom']).toBe(margin);
	});

	test('fontFamily', () => {
		let fontFamily = 'iconfont';
		expect(icon.element.style._values['--font-family']).toBe(fontFamily);
	});

	test('inlineBlock', () => {
		let inlineBlock = 'inline-flex';
		expect(icon.element.style._values['--display']).toBe(inlineBlock);
	});
});

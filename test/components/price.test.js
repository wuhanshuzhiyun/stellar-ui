import { mount } from '@vue/test-utils';
import stePrice from '../../uni_modules/stellar-ui/components/ste-price/ste-price.vue';
import utils from '../../uni_modules/stellar-ui/utils/utils';

describe('Test Price', () => {
	let wrapper;
	const propsData = {
		value: 9527,
		unitSymbol: '¥',
		valueUnit: 'fen',
	};
	const createWrapper = () => mount(stePrice, { propsData });

	beforeEach(() => {
		wrapper = createWrapper();
	});

	afterEach(() => {
		wrapper.destroy();
	});

	test('value', () => {
		// ¥95 .27
		const realValue = utils.fenToYuan(propsData.value, 2, '', 0);
		const valueArr = realValue.split('.');
		expect(wrapper.text()).toBe(`${propsData.unitSymbol}${valueArr[0]} .${valueArr[1]}`);
	});

	test('unit', async () => {
		wrapper.setProps({ valueUnit: 'yuan' });
		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toBe(`${propsData.unitSymbol}${propsData.value}`);
	});

	test('digits', async () => {
		wrapper.setProps({ digits: 0 });
		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toBe(`${propsData.unitSymbol}${utils.fenToYuan(propsData.value, 2, '', 1)}`);
	});

	test('showUnit', async () => {
		wrapper.setProps({ showUnit: false });
		await wrapper.vm.$nextTick();
		const realValue = utils.fenToYuan(propsData.value, 2, '', 0);
		const valueArr = realValue.split('.');
		expect(wrapper.text()).toBe(`${valueArr[0]} .${valueArr[1]}`);
	});

	test('unitSymbol', () => {
		wrapper.setProps({ unitSymbol: '$' });
		const realValue = utils.fenToYuan(propsData.value, 2, '', 0);
		const valueArr = realValue.split('.');
		expect(wrapper.text()).toBe(`${propsData.unitSymbol}${valueArr[0]} .${valueArr[1]}`);
	});

	test('fontSize', () => {
		wrapper.setProps({ fontSize: 50 });
		const realValue = utils.fenToYuan(propsData.value, 2, '', 0);
		const valueArr = realValue.split('.');

		expect(wrapper.find('.yuan-price').element.style.fontSize).toBe('15px');
	});

	test('color', async () => {
		wrapper.setProps({ color: 'green' });
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.content').element.style.color).toBe('green');
	});

	test('lineprice', async () => {
		wrapper.setProps({ linePriceColor: '#666666', isSuggestPrice: true });
		await wrapper.vm.$nextTick();

		const unit = wrapper.find('.unit');
		const fen = wrapper.find('.yuan-price');
		const yuan = wrapper.find('.fen-price');
		expect(unit.element.style.textDecoration).toBe('line-through');
		expect(fen.element.style.textDecoration).toBe('line-through');
		expect(yuan.element.style.textDecoration).toBe('line-through');
	});

	test('lineHeight', async () => {
		wrapper.setProps({ lineHeight: 1 });
		await wrapper.vm.$nextTick();
		// console.log('********', wrapper.html());
		expect(wrapper.find('.content').element.style.lineHeight).toBe('0.5px');
	});

	test('margin', async () => {
		const margin = 4;
		wrapper.setProps({ marginTop: margin, marginRight: margin, marginBottom: margin, marginLeft: margin });
		await wrapper.vm.$nextTick();
		// console.log('********', wrapper.html());
		expect(wrapper.find('.content').element.style.margin).toBe(
			`${margin / 2}px ${margin / 2}px ${margin / 2}px ${margin / 2}px`
		);
	});

	test('styleType', async () => {
		wrapper.setProps({ styleType: 1 });
		await wrapper.vm.$nextTick();
		// console.log('********', wrapper.html());

		const fen = wrapper.find('.yuan-price');
		const yuan = wrapper.find('.fen-price');
		expect(fen.element.style.fontSize).toBe(yuan.element.style.fontSize);
	});

	test('bold', async () => {
		wrapper.setProps({ bold: true });
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.content').element.style.fontWeight).toBe('bold');
	});
});

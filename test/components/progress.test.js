import { mount } from '@vue/test-utils';
import steProgress from '../../uni_modules/stellar-ui/components/ste-progress/ste-progress.vue';

describe('Test Progress', () => {
	let wrapper;
	const propsData = {
		percentage: 40,
	};
	const createWrapper = () => mount(steProgress, { propsData });

	beforeEach(() => {
		wrapper = createWrapper();
	});

	afterEach(() => {
		wrapper.destroy();
	});

	test('percentage', async () => {
		await wrapper.vm.$nextTick();
		expect(wrapper.element.style.getPropertyValue('--active-width')).toBe(propsData.percentage + '%');
	});

	test('bg', async () => {
		wrapper.setProps({
			activeBg: 'https://image.whzb.com/chain/StellarUI/image/p-red.png',
			inactiveBg: '#CCCCCC',
		});
		await wrapper.vm.$nextTick();

		const inactive = wrapper.find('.inactive-box');
		const active = wrapper.find('.active-box');

		expect(inactive.element.style.backgroundColor).toBe('rgb(204, 204, 204)');
		expect(active.element.style.backgroundImage).toBe(
			`url(https://image.whzb.com/chain/StellarUI/image/p-red.png)`
		);
	});

	test('strokeWidth', async () => {
		wrapper.setProps({ strokeWidth: 10 });
		await wrapper.vm.$nextTick();
		expect(wrapper.element.style.getPropertyValue('--progress-height')).toBe('5px');
	});

	test('disabled', async () => {
		wrapper.setProps({ disabled: true });
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.active-box').element.style.backgroundColor).toBe('rgb(204, 204, 204)');
	});

	test('width', async () => {
		wrapper.setProps({ width: 300 });
		await wrapper.vm.$nextTick();
		// console.log('wrapper is ***', wrapper.html());
		expect(wrapper.element.style.getPropertyValue('--progress-width')).toBe('150px');
	});

	test('duration', async () => {
		wrapper.setProps({ duration: 0.5 });
		await wrapper.vm.$nextTick();
		// console.log('wrapper is ***', wrapper.html());
		expect(wrapper.element.style.getPropertyValue('--active-transition-duration')).toBe('0.5s');
	});

	test('text', async () => {
		const options = {
			pivotText: '正在热抢',
			textColor: '#FF1E19',
			textAlign: 'left',
			textSize: 20,
		};
		wrapper.setProps(options);
		await wrapper.vm.$nextTick();

		// console.log('wrapper is ***', wrapper.html());

		expect(wrapper.find('.text').text()).toBe(options.pivotText);
		expect(wrapper.element.style.getPropertyValue('--active-text-color')).toBe(options.textColor);
		expect(wrapper.element.style.getPropertyValue('--active-text-align')).toBe(options.textAlign);
		expect(wrapper.element.style.getPropertyValue('--active-text-font-size')).toBe(options.textSize / 2 + 'px');
	});

	test('displayTextThreshold', async () => {
		wrapper.setProps({ displayTextThreshold: 20 });
		await wrapper.vm.$nextTick();

		expect(wrapper.find('.text').text()).toBe(propsData.percentage + '%');

		wrapper.setProps({ displayTextThreshold: 50 });
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.text').text()).toBe('');
	});
});

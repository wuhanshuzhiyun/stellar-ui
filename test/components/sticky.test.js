import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Sticky from '../../uni_modules/stellar-ui/components/ste-sticky/ste-sticky.vue';
import { style2obj } from '../methods';
describe('Sticky Comp', () => {
	test('Sticky offsetTop', async () => {
		const wrapper = mount(Sticky, {
			propsData: {
				offsetTop: 120,
			},
		});
		await nextTick();

		const view = wrapper.find('.ste-sticky');
		const style = style2obj(view);
		expect(style.top).toBe('60px');
		expect(style.position).toBe('sticky');
		expect(wrapper.props().zIndex).toBe(98);
	});
	test('Sticky disabled', async () => {
		const wrapper = mount(Sticky, {
			propsData: {
				disabled: true,
				zIndex: 999,
			},
		});
		await nextTick();

		const view = wrapper.find('.ste-sticky');
		const style = style2obj(view);
		expect(style.position).toBeUndefined();
	});
});

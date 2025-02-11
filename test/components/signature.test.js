import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Signature from '../../uni_modules/stellar-ui/components/ste-signature/ste-signature.vue';
import { style2obj } from '../methods';

describe('Signature Component', () => {
	test('Signature size and class', async () => {
		const wrapper = mount(Signature, {
			propsData: {
				customClass: 'test-class',
				width: 100,
				height: 100,
			},
		});
		await nextTick();

		const nav = wrapper.find('.test-class');
		const style = style2obj(nav)
		expect(nav.exists()).toBe(true);
		expect(style.width).toBe('50px');
		expect(style.height).toBe('50px');
	});
});

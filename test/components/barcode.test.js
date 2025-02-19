import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steBarcode from '../../uni_modules/stellar-ui/components/ste-barcode/ste-barcode.vue';

describe('Test Barcode', () => {
	test('value', () => {
		const width = 310;
		const height = 110;
		const wrapper = mount(steBarcode, {
			propsData: {
				content: '123987456abc',
				width,
				height,
			},
		});

		const canvas = wrapper.find('canvas');
		expect(canvas.exists()).toBe(true);
		expect(canvas.element.style.width).toBe(width + 'px');
		expect(canvas.element.style.height).toBe(height + 'px');
	});
});

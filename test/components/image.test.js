import { expect, test, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Image from '../../uni_modules/stellar-ui/components/ste-image/ste-image.vue';
import { style2obj } from '../methods';
describe('Image Component', () => {
	test('Image width and src', async () => {
		const wrapper = mount(Image, {
			propsData: {
				width: 120,
				src: 'https://image.whzb.com/chain/StellarUI/%E6%94%AF%E4%BB%98%E5%AE%9D.png',
			},
		});
		await nextTick();

		const view = wrapper.find('.ste-image-root');

		const style = style2obj(view);
		expect(style['--image-root-width']).toEqual('60px');
		const img = wrapper.find('.content');
		const imgStyle = style2obj(img);
		expect(imgStyle['opacity']).toEqual('1');
		expect(img.attributes().src).toEqual('https://image.whzb.com/chain/StellarUI/%E6%94%AF%E4%BB%98%E5%AE%9D.png');
		expect(img.attributes().mode).toEqual('scaleToFill');
	});

	test('Image radius', async () => {
		const wrapper = mount(Image, {
			propsData: {
				width: 120,
				src: 'https://image.whzb.com/chain/StellarUI/%E6%94%AF%E4%BB%98%E5%AE%9D.png',
				radius: 10,
			},
		});
		await nextTick();
		const view = wrapper.find('.ste-image-root');
		const style = style2obj(view);
		expect(style['--image-root-radius']).toEqual('5px');
	});
});

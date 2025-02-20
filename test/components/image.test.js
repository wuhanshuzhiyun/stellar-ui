import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Image from '../../uni_modules/stellar-ui/components/ste-image/ste-image.vue';
import { style2obj } from '../methods';
describe('Image Component', async () => {
	const wrapper = mount(Image, {
		propsData: {
			src: 'https://image.whzb.com/chain/StellarUI/%E6%94%AF%E4%BB%98%E5%AE%9D.png',
			mode: "scaleToFill",
			width: 120,
			height: 120,
			radius: 60,
			hiddenLoading: true,
			hiddenError: true,
			showMenuByLongpress: true,
			lazyLoad: true,
			display: "inline-flex"
		},
	});
	await nextTick();


	test('mode', async () => {
		const img = wrapper.find('.content');
		expect(img.attributes().mode).toEqual('scaleToFill');
	})

	test('height', async () => {
		const img = wrapper.find('.content');
		const imgStyle = style2obj(img);
		expect(imgStyle['opacity']).toEqual('1');
		expect(img.attributes().src).toEqual('https://image.whzb.com/chain/StellarUI/%E6%94%AF%E4%BB%98%E5%AE%9D.png');
	})

	test('width', async () => {
		const view = wrapper.find('.ste-image-root');
		const style = style2obj(view);
		expect(style['--image-root-width']).toEqual('60px');
	});

	test('height', async () => {
		const view = wrapper.find('.ste-image-root');
		const style = style2obj(view);
		expect(style['--image-root-height']).toEqual('60px');
	})


	test('radius', async () => {
		const view = wrapper.find('.ste-image-root');
		const style = style2obj(view);
		expect(style['--image-root-radius']).toEqual('30px');
	});
	test('hiddenLoading', async () => {
		expect(wrapper.props().hiddenLoading).toBe(true);
	})

	test('hiddenError', async () => {
		expect(wrapper.props().hiddenError).toBe(true);
	})
	test('showMenuByLongpress', async () => {
		expect(wrapper.props().showMenuByLongpress).toBe(true);
	})
	test('lazyLoad', async () => {
		expect(wrapper.props().lazyLoad).toBe(true);
	})
	test('display', async () => {
		const view = wrapper.find('.ste-image-root');
		const style = style2obj(view);
		expect(style['--image-root-display']).toEqual('inline-flex');
	})

});

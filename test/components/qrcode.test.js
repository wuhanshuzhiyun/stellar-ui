import { mount } from '@vue/test-utils';
import steQrcode from '../../uni_modules/stellar-ui/components/ste-qrcode/ste-qrcode.vue';

describe('Test Qrcode', () => {
	test('content prop', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
			},
		});
		expect(wrapper.props().content).toBe('https://example.com');
	});

	test('size prop', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
				size: 200,
			},
		});
		expect(wrapper.props().size).toBe(200);
	});

	test('background prop', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
				background: '#f0f0f0',
			},
		});
		expect(wrapper.props().background).toBe('#f0f0f0');
	});

	test('foreground prop', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
				foreground: '#333333',
			},
		});
		expect(wrapper.props().foreground).toBe('#333333');
	});

	test('foregroundImageSrc prop', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
				foregroundImageSrc: 'https://example.com/logo.png',
			},
		});
		expect(wrapper.props().foregroundImageSrc).toBe('https://example.com/logo.png');
	});

	test('foregroundImageWidth prop', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
				foregroundImageWidth: 50,
			},
		});
		expect(wrapper.props().foregroundImageWidth).toBe(50);
	});

	test('foregroundImageHeight prop', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
				foregroundImageHeight: 50,
			},
		});
		expect(wrapper.props().foregroundImageHeight).toBe(50);
	});

	test('default size', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
			},
		});
		expect(wrapper.props().size).toBe(100);
	});

	test('default background', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
			},
		});
		expect(wrapper.props().background).toBe('#FFFFFF');
	});

	test('default foreground', () => {
		const wrapper = mount(steQrcode, {
			propsData: {
				content: 'https://example.com',
			},
		});
		expect(wrapper.props().foreground).toBe('#000000');
	});
});
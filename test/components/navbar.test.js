import { mount } from '@vue/test-utils';
import steNavbar from '../../uni_modules/stellar-ui/components/ste-navbar/ste-navbar.vue';

describe('Test Navbar', () => {
	test('autoBack prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				autoBack: false,
			},
		});
		expect(wrapper.props().autoBack).toBe(false);
	});

	test('backColor prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				backColor: '#FF1E19',
			},
		});
		expect(wrapper.props().backColor).toBe('#FF1E19');
	});

	test('backCode prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				backCode: '&#xe600;',
			},
		});
		expect(wrapper.props().backCode).toBe('&#xe600;');
	});

	test('backBackgroundColor prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				backBackgroundColor: '#f0f0f0',
			},
		});
		expect(wrapper.props().backBackgroundColor).toBe('#f0f0f0');
	});

	test('backBorderColor prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				backBorderColor: '#cccccc',
			},
		});
		expect(wrapper.props().backBorderColor).toBe('#cccccc');
	});

	test('backOpacity prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				backOpacity: 0.5,
			},
		});
		expect(wrapper.props().backOpacity).toBe(0.5);
	});

	test('title prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				title: '测试标题',
			},
		});
		expect(wrapper.props().title).toBe('测试标题');
	});

	test('titleColor prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				title: '测试标题',
				titleColor: '#FF1E19',
			},
		});
		expect(wrapper.props().titleColor).toBe('#FF1E19');
	});

	test('titleAlignment prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				title: '测试标题',
				titleAlignment: 2,
			},
		});
		expect(wrapper.props().titleAlignment).toBe(2);
	});

	test('fixed prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				fixed: true,
			},
		});
		expect(wrapper.props().fixed).toBe(true);
	});

	test('safeAreaInsetTop prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				safeAreaInsetTop: false,
			},
		});
		expect(wrapper.props().safeAreaInsetTop).toBe(false);
	});

	test('zIndex prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				zIndex: 100,
			},
		});
		expect(wrapper.props().zIndex).toBe(100);
	});

	test('backgroundColor prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				backgroundColor: '#ffffff',
			},
		});
		expect(wrapper.props().backgroundColor).toBe('#ffffff');
	});

	test('colorType prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				colorType: 2,
			},
		});
		expect(wrapper.props().colorType).toBe(2);
	});

	test('stopNavigateBack prop', () => {
		const wrapper = mount(steNavbar, {
			propsData: {
				stopNavigateBack: true,
			},
		});
		expect(wrapper.props().stopNavigateBack).toBe(true);
	});

	test('backClick event', async () => {
		const wrapper = mount(steNavbar);
		const backClickHot = wrapper.find('.back-click-hot');
		if (backClickHot.exists()) {
			await backClickHot.trigger('click');
			expect(wrapper.emitted('backClick')).toBeTruthy();
		}
	});
});
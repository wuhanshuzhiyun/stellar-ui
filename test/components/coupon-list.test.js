import { mount } from '@vue/test-utils';
import steCouponList from '../../uni_modules/stellar-ui/components/ste-coupon-list/ste-coupon-list.vue';

beforeAll(() => {
	if (typeof wx === 'undefined') {
		global.wx = {
			createOffscreenCanvas: vi.fn(() => ({
				getContext: vi.fn(() => ({
					clearRect: vi.fn(),
					setLineWidth: vi.fn(),
					setStrokeStyle: vi.fn(),
					setFillStyle: vi.fn(),
					beginPath: vi.fn(),
					arc: vi.fn(),
					stroke: vi.fn(),
					fill: vi.fn(),
					closePath: vi.fn(),
					lineCap: '',
					toDataURL: vi.fn(() => 'data:image/png;base64,test'),
				})),
				width: 96,
				height: 48,
				toDataURL: vi.fn(() => 'data:image/png;base64,test'),
			})),
		};
	}
});

describe('Test CouponList', () => {
	test('data prop', () => {
		const data = {
			image: 'https://example.com/image.png',
			title: '测试优惠券',
			desc: '满100减50',
			price: 50,
			constraint: '满100可用',
			footers: ['使用规则', '有效期至2024-12-31'],
		};
		const wrapper = mount(steCouponList, {
			propsData: {
				data,
			},
		});
		expect(wrapper.props().data).toEqual(data);
	});

	test('endTime prop', () => {
		const wrapper = mount(steCouponList, {
			propsData: {
				data: {},
				endTime: Date.now() + 3600000,
			},
		});
		expect(wrapper.props().endTime).toBeDefined();
	});

	test('residue prop', () => {
		const wrapper = mount(steCouponList, {
			propsData: {
				data: {},
				residue: 50,
			},
		});
		expect(wrapper.props().residue).toBe(50);
	});

	test('progress prop', () => {
		const wrapper = mount(steCouponList, {
			propsData: {
				data: {},
				progress: 75,
			},
		});
		expect(wrapper.props().progress).toBe(75);
	});

	test('progressText prop', () => {
		const wrapper = mount(steCouponList, {
			propsData: {
				data: {},
				progress: 75,
				progressText: '已抢75%',
			},
		});
		expect(wrapper.props().progressText).toBe('已抢75%');
	});

	test('buttonText prop', () => {
		const wrapper = mount(steCouponList, {
			propsData: {
				data: {},
				buttonText: '立即领取',
			},
		});
		expect(wrapper.props().buttonText).toBe('立即领取');
	});

	test('buttonDisabled prop', () => {
		const wrapper = mount(steCouponList, {
			propsData: {
				data: {},
				buttonDisabled: true,
			},
		});
		expect(wrapper.props().buttonDisabled).toBe(true);
	});

	test('backgroundColor prop', () => {
		const wrapper = mount(steCouponList, {
			propsData: {
				data: {},
				backgroundColor: '#f0f0f0',
			},
		});
		expect(wrapper.props().backgroundColor).toBe('#f0f0f0');
	});

	test('viewTime method', () => {
		const wrapper = mount(steCouponList, {
			propsData: {
				data: {},
			},
		});
		expect(wrapper.vm.viewTime(5)).toBe('05');
		expect(wrapper.vm.viewTime(10)).toBe(10);
		expect(wrapper.vm.viewTime(0)).toBe('00');
	});
});
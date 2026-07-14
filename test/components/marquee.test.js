import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steMarquee from '../../uni_modules/stellar-ui/components/ste-marquee/ste-marquee.vue';

describe('Test Marquee', () => {
	test('list prop', async () => {
		const list = [
			{ id: 1, text: '第一条消息' },
			{ id: 2, text: '第二条消息' },
			{ id: 3, text: '第三条消息' },
		];
		const wrapper = mount(steMarquee, {
			propsData: {
				list,
			},
		});
		await new Promise((resolve) => setTimeout(resolve, 150));

		expect(wrapper.vm.displayQueue.length).toBeGreaterThanOrEqual(list.length);
	});

	test('speed prop', () => {
		const wrapper = mount(steMarquee, {
			propsData: {
				list: [{ id: 1, text: '测试消息' }],
				speed: 100,
			},
		});
		expect(wrapper.props().speed).toBe(100);
	});

	test('pauseOnHover prop', () => {
		const wrapper = mount(steMarquee, {
			propsData: {
				list: [{ id: 1, text: '测试消息' }],
				pauseOnHover: false,
			},
		});
		expect(wrapper.props().pauseOnHover).toBe(false);
	});

	test('loop prop', () => {
		const wrapper = mount(steMarquee, {
			propsData: {
				list: [{ id: 1, text: '测试消息' }],
				loop: false,
			},
		});
		expect(wrapper.props().loop).toBe(false);
	});

	test('gap prop', () => {
		const wrapper = mount(steMarquee, {
			propsData: {
				list: [{ id: 1, text: '测试消息' }],
				gap: 40,
			},
		});
		expect(wrapper.props().gap).toBe(40);
	});

	test('clickable prop', () => {
		const wrapper = mount(steMarquee, {
			propsData: {
				list: [{ id: 1, text: '测试消息' }],
				clickable: false,
			},
		});
		expect(wrapper.props().clickable).toBe(false);
	});

	test('play and pause methods', () => {
		const wrapper = mount(steMarquee, {
			propsData: {
				list: [{ id: 1, text: '测试消息' }],
			},
		});

		wrapper.vm.pause();
		expect(wrapper.vm.isPaused).toBe(true);

		wrapper.vm.play();
		expect(wrapper.vm.isPaused).toBe(false);
	});

	test('resume method', () => {
		const wrapper = mount(steMarquee, {
			propsData: {
				list: [{ id: 1, text: '测试消息' }],
			},
		});

		wrapper.vm.pause();
		expect(wrapper.vm.isPaused).toBe(true);

		wrapper.vm.resume();
		expect(wrapper.vm.isPaused).toBe(false);
	});

	test('click event', async () => {
		const list = [{ id: 1, text: '可点击消息' }];
		const wrapper = mount(steMarquee, {
			propsData: {
				list,
			},
		});
		await nextTick();

		const items = wrapper.findAll('.ste-mq-item');
		if (items.length > 0) {
			await items.at(0).trigger('click');
			expect(wrapper.emitted('click')).toBeTruthy();
		}
	});

	test('containerBg prop', () => {
		const wrapper = mount(steMarquee, {
			propsData: {
				list: [{ id: 1, text: '测试消息' }],
				containerBg: '#f0f0f0',
			},
		});
		expect(wrapper.props().containerBg).toBe('#f0f0f0');
	});

	test('itemBg prop', () => {
		const wrapper = mount(steMarquee, {
			propsData: {
				list: [{ id: 1, text: '测试消息' }],
				itemBg: '#e0e0e0',
			},
		});
		expect(wrapper.props().itemBg).toBe('#e0e0e0');
	});
});
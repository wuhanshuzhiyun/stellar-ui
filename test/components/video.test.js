import { mount } from '@vue/test-utils';
import steVideo from '../../uni_modules/stellar-ui/components/ste-video/ste-video.vue';

describe('Test Video', () => {
	let wrapper;
	const propsData = {
		src: 'https://image.whzb.com/chain/StellarUI/video/demo1.mp4',
	};
	const createWrapper = () => mount(steVideo, { propsData });

	beforeEach(() => {
		wrapper = createWrapper();
	});

	afterEach(() => {
		wrapper.destroy();
	});

	test('title', async () => {
		wrapper.setProps({ title: '标题' });
		await wrapper.vm.$nextTick();

		expect(wrapper.find('.title').text()).toBe('标题');
	});

	test('autoHeight', async () => {
		wrapper.setProps({ autoHeight: true });
		await wrapper.vm.$nextTick();
		expect(wrapper.classes()).toContain('auto-height');
	});

	test('resolution', async () => {
		wrapper.setProps({
			resolution: [
				{ text: '流畅', url: 'https://image.whzb.com/chain/StellarUI/video/demo1.mp4' },
				{ text: '高清', url: 'https://image.whzb.com/chain/StellarUI/video/demo2.mp4' },
			],
		});
		await wrapper.vm.$nextTick();

		const items = wrapper.findAll('.choose-item');
		const hasHD = items.wrappers.some((item) => item.text().includes('高清'));
		const hasSD = items.wrappers.some((item) => item.text().includes('流畅'));

		expect(hasHD).toBe(true);
		expect(hasSD).toBe(true);
	});
});

import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MediaPreview from '../../uni_modules/stellar-ui/components/ste-media-preview/ste-media-preview.vue';
import { style2obj } from '../methods';
import { expect } from 'vitest';

describe('MediaPreview Component', () => {
	test('MediaPreview default', async () => {
		const wrapper = mount(MediaPreview, {
			propsData: {
			},
		});
		await nextTick();

		const upload = wrapper.find('[data-test="media-preview"]');
		expect(upload.exists()).toBe(false);
	});
	test('MediaPreview show', async () => {
		const wrapper = mount(MediaPreview, {
			propsData: {
				show: true,
			},
		});
		await nextTick();

		const upload = wrapper.find('[data-test="media-preview"]');
		expect(upload.exists()).toBe(true);
	});
	test('MediaPreview urls', async () => {
		const wrapper = mount(MediaPreview, {
			propsData: {
				show: true,
				urls: ["https://www.baidu.com/img/flexible/logo/pc/result.png", "https://www.baidu.com/img/flexible/logo/pc/result.png"],
			},
		});
		await nextTick();

		const upload = wrapper.findAll('[data-test="media-preview-item"]');
		expect(upload.length).toBe(2);
	});
});

import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Upload from '../../uni_modules/stellar-ui/components/ste-upload/ste-upload.vue';
import { style2obj } from '../methods';
import { expect } from 'vitest';

describe('Upload Component', () => {
	test('Upload size', async () => {
		const wrapper = mount(Upload, {
			propsData: {
				previewWidth: 300,
				previewHeight: 400,
			},
		});
		await nextTick();

		const upload = wrapper.find('[data-test="upload"]');
		const style = style2obj(upload);
		expect(style['--ste-upload-width']).toBe('150px');
		expect(style['--ste-upload-height']).toBe('200px');
	});

	test('Upload uploadText', async () => {
		const wrapper = mount(Upload, {
			propsData: {
				uploadText: '上传TEST',
			},
		})

		await nextTick();

		const upload = wrapper.find('[data-test="upload-text"]');
		expect(upload.text()).toBe('上传TEST');
	})
	test('Upload showUpload', async () => {
		const wrapper = mount(Upload, {
			propsData: {
				showUpload: false,
			},
		})

		await nextTick();

		const upload = wrapper.find('[data-test="upload-add-file"]');
		expect(upload.exists()).toBe(false);
	})
	test('Upload radius', async () => {
		const wrapper = mount(Upload, {
			propsData: {
				radius: 10,
			},
		})

		await nextTick();

		const upload = wrapper.find('[data-test="upload"]');
		const style = style2obj(upload);
		expect(style['--ste-upload-radius']).toBe('5px');
	})
});

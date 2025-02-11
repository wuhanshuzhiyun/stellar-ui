import { expect, test, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Calendar from '../../uni_modules/stellar-ui/components/ste-calendar/ste-calendar.vue';

describe('Calendar Component', () => {
	test('Calendar title', async () => {
		const wrapper = mount(Calendar, {
			propsData: {
				title: '选择日期',
			},
		});
		await nextTick();

		const title = wrapper.find('.calendar-title');
		expect(title.text()).toBe('选择日期');
	});

	test('Calendar showTitle', async () => {
		const wrapper = mount(Calendar, {
			propsData: {
				showTitle: false,
			},
		});
		await nextTick();

		const title = wrapper.find('.calendar-title');
		expect(title.exists()).toBe(false);
	});
});

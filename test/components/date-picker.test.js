import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steDatePicker from '../../uni_modules/stellar-ui/components/ste-date-picker/ste-date-picker.vue';
import stePicker from '../../uni_modules/stellar-ui/components/ste-picker/ste-picker.vue';

describe('Test DatePicker', () => {
	test('date', () => {
		const wrapper = mount(steDatePicker, {
			components: {
				'ste-picker': stePicker,
			},
			propsData: { value: '2015-05-20 xxx:00:01' },
		});

		const cloums = wrapper.findAll('.ste-picker-column');
		expect(cloums.length).toBe(6);
	});
});

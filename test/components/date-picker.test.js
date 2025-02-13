import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steDatePicker from '../../uni_modules/stellar-ui/components/ste-date-picker/ste-date-picker.vue';

describe('Test DatePicker', () => {
	test('date', () => {
		const wrapper = mount(steDatePicker, {
			propsData: { value: '2015-05-20 xxx:00:01' },
		});

		const cloums = wrapper.findAll('.ste-picker-column');
		// console.log('wrapper is ', cloums.at(0));
	});
});

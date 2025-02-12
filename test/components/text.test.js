import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steText from '../../uni_modules/stellar-ui/components/ste-text/ste-text.vue';

describe('Test Text', () => {
	test('text', async () => {
		const text = 'Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水';
		const wrapper = mount(steText, {
			slots: {
				default: text,
			},
		});

		const rootEl = wrapper.get('.ste-text-root');
		expect(rootEl.text()).toBe(text);
	});
});

import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Search from '../../uni_modules/stellar-ui/components/ste-search/ste-search.vue';

describe('Search Component', () => {
	test('Search title', async () => {
		const wrapper = mount(Search, {
			propsData: {
				type: 'nav',
			},
		});
		await nextTick();

		const nav = wrapper.find('.nav-box');
		expect(nav.exists()).toBe(true);

		const wrapper2 = mount(Search, {
			propsData: {
				type: 'default',
			},
		});
		await nextTick();

		const nav2 = wrapper2.find('.nav-box');
		expect(nav2.exists()).toBe(false);
	});

	test('Search value', async () => {
		const wrapper = mount(Search, {
			propsData: {
				value: 'RTX5060',
			},
		});
		await nextTick();

		expect(wrapper.props('value')).toBe('RTX5060');
	});

	test('Search placeholder', async () => {
		const wrapper = mount(Search, {
			propsData: {
				placeholder: '请输入搜索内容',
			},
		});
		await nextTick();

		expect(wrapper.props('placeholder')).toBe('请输入搜索内容');
	});
});

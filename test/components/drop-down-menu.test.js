import { mount } from '@vue/test-utils';
import steDropdownMenu from '../../uni_modules/stellar-ui/components/ste-dropdown-menu/ste-dropdown-menu.vue';
import steDropdownMenuItem from '../../uni_modules/stellar-ui/components/ste-dropdown-menu-item/ste-dropdown-menu-item.vue';

describe('Test dropdown menu', () => {
	let wrapper;

	const createWrapper = (props = {}) => {
		return mount(steDropdownMenu, {
			components: {
				'ste-dropdown-menu-item': steDropdownMenuItem,
			},
			propsData: {
				title: '标题',
				value: '2',
			},
			slots: {
				default: `
	          <ste-dropdown-menu-item value="1" title="全部商品" />
	          <ste-dropdown-menu-item value="2" title="新款商品" />
	          <ste-dropdown-menu-item value="3" title="活动商品" />
	        `,
			},
		});
	};

	beforeEach(async () => {
		wrapper = createWrapper();
		await wrapper.vm.$nextTick();
	});

	afterEach(() => {
		wrapper.destroy();
	});

	test('title', async () => {
		expect(wrapper.find('.title').text()).toBe('标题');
	});

	test('color', async () => {
		wrapper.setProps({ activeColor: '#e9e', inactiveColor: '#53e' });
		await wrapper.vm.$nextTick();
		// console.log('wrapper html is ', wrapper.html());
		expect(wrapper.element.style.getPropertyValue('--active-color')).toBe('#e9e');
		expect(wrapper.element.style.getPropertyValue('--inactive-color')).toBe('#53e');
	});
});

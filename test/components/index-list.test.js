import { mount } from '@vue/test-utils';
import IndexList from '../../uni_modules/stellar-ui/components/ste-index-list/ste-index-list.vue';
import IndexItem from '../../uni_modules/stellar-ui/components/ste-index-item/ste-index-item.vue';
import { createVue } from '../methods';

describe('IndexList Component', async () => {
	const vm = createVue({
		components: { "ste-index-list": IndexList, "ste-index-item": IndexItem, "scroll-view": "div" },
		template: `<ste-index-list height="100">
			<ste-index-item v-for="(item, index) in data" :key="index" :title="item.title" :list="item.list" />
		</ste-index-list>`,
		data() {
			return {
				data: [
					{
						title: 'A',
						list: ['列表A1', '列表A2', '列表A3', '列表A4', '列表A5', '列表A6', '列表A7', '列表A8'],
					},
					{
						title: 'B',
						list: ['列表B1', '列表B2', '列表B3', '列表B4', '列表B5', '列表B6', '列表B7', '列表B8'],
					},
					{
						title: 'C',
						list: ['列表C1', '列表C2', '列表C3', '列表C4', '列表C5', '列表C6', '列表C7', '列表C8'],
					},
					{
						title: 'D',
						list: ['列表D1', '列表D2', '列表D3', '列表D4', '列表D5', '列表D6', '列表D7', '列表D8'],
					},
					{
						title: 'E',
						list: ['列表E1', '列表E2', '列表E3', '列表E4', '列表E5', '列表E6', '列表E7', '列表E8'],
					},
					{
						title: 'F',
						list: ['列表F1', '列表F2', '列表F3', '列表F4', '列表F5', '列表F6', '列表F7', '列表F8'],
					},
					{
						title: 'G',
						list: ['列表G1', '列表G2', '列表G3', '列表G4', '列表G5', '列表G6', '列表G7', '列表G8'],
					},
				],
			}
		}
	}, true)

	const wrapper = mount(IndexList, {
		propsData: {
			sticky: true,
			inactiveColor: "#666666",
			activeColor: ""
		},
	})


	await new Promise(p => setTimeout(p, 500));
	test("list-item", async () => {
		const list = vm.$el.querySelectorAll('[data-test="index-item"]');
		expect(list.length).toBe(7)
	})

	test("item-item", async () => {
		const items = vm.$el.querySelectorAll('[data-test="index-item-text"]');
		expect(items.length).toBe(56)
	})

	test("sticky", () => {
		expect(wrapper.props("sticky")).toBe(true)
	})
	test("inactiveColor", () => {
		expect(wrapper.props("inactiveColor")).toBe("#666666")
	})
	test("activeColor", () => {
		expect(wrapper.props("activeColor")).toBe("")
	})
});

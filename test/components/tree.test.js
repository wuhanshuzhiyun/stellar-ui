import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tree from '../../uni_modules/stellar-ui/components/ste-tree/ste-tree.vue';
import { createVue } from '../methods';

describe('Tree Component', async () => {
	const vm = createVue({
		components: { "ste-tree": Tree },
		template: `<ste-tree ref="accordion" :options="options"></ste-tree>`,
		data() {
			return {
				options: [
					{
						title: '标题1',
						value: '1',
						children: [
							{
								title: '标题1-1',
								value: '1-1',
								children: [
									{ title: '标题-1-1', value: '1-1-1' },
									{ title: '标题1-1-2', value: '1-1-2' },
								],
							},
							{
								title: '标题1-2',
								value: '1-2',
								children: [
									{ title: '标题1-2-1', value: '1-2-1' },
									{
										title: '标题1-2-2',
										value: '1-2-2',
										children: [{ title: '标题1-2-2-1', value: '1-2-2-1' }],
									},
								],
							},
						],
					},
					{
						title: '标题2',
						value: '2',
						children: [{ title: '标题2-1', value: '2-1' }],
					},
				]
			}
		}
	}, true)
	const wrapper = mount(Tree, {
		propsData: {
			options: [],
			valueKey: "value",
			titleKey: "title",
			childrenKey: "children",
			accordion: true,
			childrenPadding: 40,
			openNodes: [],
			searchTitle: "",
		}
	})

	await new Promise(p => setTimeout(p, 500));
	test("Tree default", async () => {
		const rows = vm.$el.querySelectorAll('[data-test="tree-item"]');
		expect(rows.length).toBe(2);
	})

	test("Tree open node", async () => {
		vm.$refs.accordion.open('1')
		await new Promise(resolve => setTimeout(resolve, 500));
		const rows2 = vm.$el.querySelectorAll('[data-test="tree-item"]');
		expect(rows2.length).toBe(4);

		vm.$refs.accordion.open('2')
		await new Promise(resolve => setTimeout(resolve, 500));
		const rows = vm.$el.querySelectorAll('[data-test="tree-item"]');
		expect(rows.length).toBe(3);
	})

	test("options", () => {
		expect(wrapper.props("options")).toEqual([])
	})

	test("valueKey", () => {
		expect(wrapper.props("valueKey")).toBe("value")
	})

	test("titleKey", () => {
		expect(wrapper.props("titleKey")).toBe("title")
	})

	test("childrenKey", () => {
		expect(wrapper.props("childrenKey")).toBe("children")
	})

	test("accordion", () => {
		expect(wrapper.props("accordion")).toBe(true)
	})

	test("childrenPadding", () => {
		expect(wrapper.props("childrenPadding")).toBe(40)
	})

	test("openNodes", () => {
		expect(wrapper.props("openNodes")).toEqual([])
	})

	test("searchTitle", () => {
		expect(wrapper.props("searchTitle")).toBe("")
	})

});

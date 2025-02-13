import { nextTick } from 'vue';
import Tree from '../../uni_modules/stellar-ui/components/ste-tree/ste-tree.vue';
import { createVue, triggerClick } from '../methods';

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
	await nextTick();
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

});

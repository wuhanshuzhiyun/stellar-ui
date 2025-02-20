import CheckboxGroup from '../../uni_modules/stellar-ui/components/ste-checkbox-group/ste-checkbox-group.vue';
import Checkbox from '../../uni_modules/stellar-ui/components/ste-checkbox/ste-checkbox.vue';
import { createVue } from '../methods';

describe('Checkbox Component', async () => {
	const vm = createVue({
		components: { "ste-checkbox-group": CheckboxGroup, "ste-checkbox": Checkbox },
		template: `<ste-checkbox-group v-model="values">
			<ste-checkbox name="a">复选框a</ste-checkbox>
			<ste-checkbox name="b">复选框b</ste-checkbox>
			<ste-checkbox name="c">复选框c</ste-checkbox>
		</ste-checkbox-group>`,
		data() {
			return {
				values: []
			}
		}
	}, true)
	await new Promise(resolve => setTimeout(resolve, 1000));

	test("Checkbox values", async () => {
		const els = vm.$el.querySelectorAll('[data-test="checkbox"]');
		expect(els.length).toBe(3);
		vm.values = ['a', 'b']
		await new Promise(resolve => setTimeout(resolve, 1000));
		const els1 = vm.$el.querySelectorAll('[data-test="checkbox-icon"]');
		expect(els1.length).toBe(3);
		expect(els1[0].style._values["background"]).toBe('rgb(0, 144, 255)');
		expect(els1[1].style._values["background"]).toBe('rgb(0, 144, 255)');
		expect(els1[2].style._values["background"]).toBe('rgb(255, 255, 255)');
	})



});

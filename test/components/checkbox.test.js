import { mount } from '@vue/test-utils';
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

	const wrapper = mount(CheckboxGroup, {
		propsData: {
			value: [],
			direction: "column",
			disabled: false,
			readonly: false,
			shape: "square",
			iconSize: 36,
			checkedColor: "",
			textPosition: "right",
			textSize: 28,
			textInactiveColor: "#000000",
			textActiveColor: "#000000",
			textDisabled: false,
			max: 0,
			marginLeft: null,
			marginRight: null,
			columnGap: null,
		}
	})


	await new Promise(resolve => setTimeout(resolve, 1000));

	test("values", async () => {
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

	test("direction", async () => {
		expect(wrapper.props().direction).toBe("column");
	})

	test("disabled", async () => {
		expect(wrapper.props().disabled).toBe(false);
	})
	test("readonly", async () => {
		expect(wrapper.props().readonly).toBe(false);
	})
	test("shape", async () => {
		expect(wrapper.props().shape).toBe("square");
	})
	test("iconSize", async () => {
		expect(wrapper.props().iconSize).toBe(36);
	})
	test("checkedColor", async () => {
		expect(wrapper.props().checkedColor).toBe("");
	})
	test("textPosition", async () => {
		expect(wrapper.props().textPosition).toBe("right");
	})
	test("textSize", async () => {
		expect(wrapper.props().textSize).toBe(28);
	})
	test("textInactiveColor", async () => {
		expect(wrapper.props().textInactiveColor).toBe("#000000");
	})
	test("textActiveColor", async () => {
		expect(wrapper.props().textActiveColor).toBe("#000000");
	})
	test("textDisabled", async () => {
		expect(wrapper.props().textDisabled).toBe(false);
	})
	test("max", async () => {
		expect(wrapper.props().max).toBe(0);
	})
	test("margin-left", async () => {
		expect(wrapper.props().marginLeft).toBe(null);
	})
	test("margin-right", async () => {
		expect(wrapper.props().marginRight).toBe(null);
	})
	test("column-gap", async () => {
		expect(wrapper.props().columnGap).toBe(null);
	})
});

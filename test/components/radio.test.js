import { mount } from '@vue/test-utils';
import RadioGroup from '../../uni_modules/stellar-ui/components/ste-radio-group/ste-radio-group.vue';
import Radio from '../../uni_modules/stellar-ui/components/ste-radio/ste-radio.vue';
import { createVue } from '../methods';

describe('Radio Component', async () => {
	const vm = createVue({
		components: { "ste-radio-group": RadioGroup, "ste-radio": Radio },
		template: `<ste-radio-group v-model="value">
			<ste-radio name="a">复选框a</ste-radio>
			<ste-radio name="b">复选框b</ste-radio>
			<ste-radio name="c">复选框c</ste-radio>
		</ste-radio-group>`,
		data() {
			return {
				value: null
			}
		}
	}, true)

	const wrapper = mount(RadioGroup, {
		propsData: {
			value: [],
			direction: 'row',
			disabled: false,
			readonly: false,
			shape: "circle",
			iconSize: 36,
			checkedColor: "#0090ff",
			textPosition: "right",
			textSize: 28,
			textInactiveColor: "#000000",
			textActiveColor: "#000000",
			textDisabled: false,
			marginLeft: 0,
			marginRight: 0,
			columnGap: 16
		}
	})


	await new Promise(resolve => setTimeout(resolve, 1000));

	test("value", async () => {
		const els = vm.$el.querySelectorAll('[data-test="radio"]');
		expect(els.length).toBe(3);
		vm.value = 'a'
		await new Promise(resolve => setTimeout(resolve, 1000));
		const els1 = vm.$el.querySelectorAll('[data-test="radio-icon"]');
		expect(els1.length).toBe(3);
		expect(els1[0].style._values["background"]).toBe('rgb(0, 144, 255)');
		expect(els1[1].style._values["background"]).toBe('rgb(255, 255, 255)');
		expect(els1[2].style._values["background"]).toBe('rgb(255, 255, 255)');
	})

	test("direction", () => {
		expect(wrapper.props().direction).toBe('row')
	})
	test("disabled", () => {
		expect(wrapper.props().disabled).toBe(false)
	})
	test("readonly", () => {
		expect(wrapper.props().readonly).toBe(false)
	})
	test("shape", () => {
		expect(wrapper.props().shape).toBe('circle')
	})
	test("iconSize", () => {
		expect(wrapper.props().iconSize).toBe(36)
	})
	test("checkedColor", () => {
		expect(wrapper.props().checkedColor).toBe('#0090ff')
	})
	test("textPosition", () => {
		expect(wrapper.props().textPosition).toBe('right')
	})
	test("textSize", () => {
		expect(wrapper.props().textSize).toBe(28)
	})
	test("textInactiveColor", () => {
		expect(wrapper.props().textInactiveColor).toBe('#000000')
	})
	test("textActiveColor", () => {
		expect(wrapper.props().textActiveColor).toBe('#000000')
	})
	test("textDisabled", () => {
		expect(wrapper.props().textDisabled).toBe(false)
	})
	test("marginLeft", () => {
		expect(wrapper.props().marginLeft).toBe(0)
	})
	test("marginRight", () => {
		expect(wrapper.props().marginRight).toBe(0)
	})
	test("columnGap", () => {
		expect(wrapper.props().columnGap).toBe(16)
	})
});

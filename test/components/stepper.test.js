import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Stepper from '../../uni_modules/stellar-ui/components/ste-stepper/ste-stepper.vue';
import { createVue, triggerClick } from '../methods';
import { test } from 'vitest';

describe('Stepper Vue Component', async () => {
	const vm = createVue(
		{
			components: { 'ste-stepper': Stepper },
			template: `<ste-stepper v-model="value" :step="step" ref="stepper"></ste-stepper>`,
			data() {
				return { value: 1, step: 1 };
			},
		},
		true
	);
	const wrapper = mount(Stepper, {
		propsData: {
			min: 1,
			max: 100,
			precision: 0,
			inputWidth: 64,
			btnSize: 48,
			mainColor: '#0090ff',
			disabled: false,
			disablePlus: false,
			disableMinus: false,
			disablelnput: false,
			theme: 'card',
		},
	});

	await new Promise((p) => setTimeout(p, 500));

	test('value', async () => {
		// 默认隐藏
		const ipt = vm.$el.querySelector('[data-test="input-el"]');
		expect(ipt.value).toBe('1');
	});

	test('add', async () => {
		const el = vm.$refs.stepper;
		el.plus();
		await nextTick();
		// 默认隐藏
		const ipt = vm.$el.querySelector('[data-test="input-el"]');
		expect(ipt.value).toBe('2');
	});

	test('minus', async () => {
		const el = vm.$refs.stepper;
		el.minus();
		await nextTick();
		const ipt = vm.$el.querySelector('[data-test="input-el"]');
		expect(ipt.value).toBe('1');
	});

	test('step', async () => {
		vm.step = 2;
		await nextTick();
		const el = vm.$refs.stepper;
		el.plus();
		await nextTick();
		// 默认隐藏
		const ipt = vm.$el.querySelector('[data-test="input-el"]');
		expect(ipt.value).toBe('3');
	});

	test('min', () => {
		expect(wrapper.props('min')).toBe(1);
	});

	test('max', () => {
		expect(wrapper.props('max')).toBe(100);
	});

	test('precision', () => {
		expect(wrapper.props('precision')).toBe(0);
	});

	test('inputWidth', () => {
		expect(wrapper.props('inputWidth')).toBe(64);
	});

	test('btnSize', () => {
		expect(wrapper.props('btnSize')).toBe(48);
	});

	test('mainColor', () => {
		expect(wrapper.props('mainColor')).toBe('#0090ff');
	});

	test('disabled', () => {
		expect(wrapper.props('disabled')).toBe(false);
	});

	test('disablePlus', () => {
		expect(wrapper.props('disablePlus')).toBe(false);
	});

	test('disableMinus', () => {
		expect(wrapper.props('disableMinus')).toBe(false);
	});

	test('disableInput', () => {
		expect(wrapper.props('disableInput')).toBe(false);
	});

	test('theme', () => {
		expect(wrapper.props('theme')).toBe('card');
	});
});

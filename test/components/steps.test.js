import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Steps from '../../uni_modules/stellar-ui/components/ste-steps/ste-steps.vue';
import Step from '../../uni_modules/stellar-ui/components/ste-step/ste-step.vue';
import { createVue, triggerClick } from '../methods';

describe('Steps Vue Component', async () => {
	const vm = createVue(
		{
			components: { 'ste-steps': Steps, 'ste-step': Step },
			template: `<ste-steps :active="active">
				<ste-step></ste-step>
				<ste-step></ste-step>
				<ste-step></ste-step>
			</ste-steps>
			`,
			data() {
				return {
					active: 0,
				};
			},
		},
		true
	);
	const wrapper = mount(Steps, {
		propsData: {
			direction: 'row',
			dot: false,
		},
	});

	await new Promise((p) => setTimeout(p, 500));

	test('init', async () => {
		// 默认隐藏
		const els = vm.$el.querySelectorAll('[data-test="step"]');
		expect(els.length).toBe(3);
	});

	test('active', async () => {
		vm.active = 1;
		await nextTick();
		const els = vm.$el.querySelectorAll('[data-test="step"]');
		expect(els[1].style._values['---color']).toBe('#0090FF');
	});

	test('direction', () => {
		expect(wrapper.props('direction')).toBe('row');
	});

	test('dot', () => {
		expect(wrapper.props('dot')).toBe(false);
	});
});

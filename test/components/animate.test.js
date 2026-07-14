import { mount } from '@vue/test-utils';
import steAnimate from '../../uni_modules/stellar-ui/components/ste-animate/ste-animate.vue';

describe('Test Animate', () => {
	test('show prop', async () => {
		const wrapper = mount(steAnimate, {
			propsData: {
				show: false,
			},
		});
		expect(wrapper.classes()).not.toContain('ste-animate-shakeX');

		await wrapper.setProps({ show: true, type: 'shakeX', action: 'initial' });
		expect(wrapper.classes()).toContain('ste-animate-shakeX');
	});

	test('type prop', () => {
		const types = ['shakeX', 'shakeY', 'ripple', 'float', 'breath', 'slide-right', 'slide-left', 'slide-top', 'slide-bottom', 'jump', 'twinkle', 'flicker'];
		types.forEach((type) => {
			const wrapper = mount(steAnimate, {
				propsData: {
					type,
					action: 'initial',
				},
			});
			expect(wrapper.classes()).toContain(`ste-animate-${type}`);
		});
	});

	test('loop prop', () => {
		const wrapper = mount(steAnimate, {
			propsData: {
				type: 'shakeX',
				loop: true,
				action: 'initial',
			},
		});
		expect(wrapper.classes()).toContain('loop');
	});

	test('duration prop', () => {
		const wrapper = mount(steAnimate, {
			propsData: {
				type: 'shakeX',
				duration: 500,
				action: 'initial',
			},
		});
		expect(wrapper.element.style.animationDuration).toBe('500ms');
	});

	test('duration prop with string value', () => {
		const wrapper = mount(steAnimate, {
			propsData: {
				type: 'shakeX',
				duration: '2s',
				action: 'initial',
			},
		});
		expect(wrapper.element.style.animationDuration).toBe('2s');
	});

	test('click action', async () => {
		const wrapper = mount(steAnimate, {
			propsData: {
				type: 'shakeX',
				action: 'click',
			},
		});
		expect(wrapper.classes()).not.toContain('ste-animate-shakeX');

		wrapper.trigger('click');
		await new Promise((resolve) => setTimeout(resolve, 20));
		expect(wrapper.classes()).toContain('ste-animate-shakeX');
	});
});
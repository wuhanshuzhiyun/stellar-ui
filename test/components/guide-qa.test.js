import { mount } from '@vue/test-utils';
import steGuideQa from '../../uni_modules/stellar-ui/components/ste-guide-qa/ste-guide-qa.vue';

describe('Test GuideQa', () => {
	test('data prop', () => {
		const data = [
			{ question: '问题1', answer: '答案1' },
			{ question: '问题2', answer: '答案2' },
		];
		const wrapper = mount(steGuideQa, {
			propsData: {
				data,
			},
		});
		expect(wrapper.props().data).toEqual(data);
	});

	test('hideTitleIcon prop', () => {
		const wrapper = mount(steGuideQa, {
			propsData: {
				data: [{ question: '问题', answer: '答案' }],
				hideTitleIcon: true,
			},
		});
		expect(wrapper.props().hideTitleIcon).toBe(true);
	});

	test('mode prop', () => {
		const wrapper = mount(steGuideQa, {
			propsData: {
				data: [],
				mode: '2',
			},
		});
		expect(wrapper.props().mode).toBe('2');
	});

	test('title prop', () => {
		const wrapper = mount(steGuideQa, {
			propsData: {
				data: [{ question: '问题', answer: '答案' }],
				title: '帮助中心',
			},
		});
		expect(wrapper.props().title).toBe('帮助中心');
	});

	test('actionTitle prop', () => {
		const wrapper = mount(steGuideQa, {
			propsData: {
				data: [{ question: '问题', answer: '答案' }],
				actionTitle: '查看更多',
			},
		});
		expect(wrapper.props().actionTitle).toBe('查看更多');
	});

	test('showNum prop', () => {
		const wrapper = mount(steGuideQa, {
			propsData: {
				data: [{ question: '问题', answer: '答案' }],
				showNum: false,
			},
		});
		expect(wrapper.props().showNum).toBe(false);
	});

	test('compModeClass computed', () => {
		const wrapper = mount(steGuideQa, {
			propsData: {
				data: [{ question: '问题', answer: '答案' }],
				mode: '1',
			},
		});
		expect(wrapper.vm.compModeClass).toBe('mode-1');
	});

	test('compModeClass computed with mode 2', () => {
		const wrapper = mount(steGuideQa, {
			propsData: {
				data: [],
				mode: '2',
			},
		});
		expect(wrapper.vm.compModeClass).toBe('mode-2');
	});

	test('click-all event', async () => {
		const wrapper = mount(steGuideQa, {
			propsData: {
				data: [{ question: '问题', answer: '答案' }],
				mode: '1',
			},
		});
		const action = wrapper.find('.action');
		if (action.exists()) {
			await action.trigger('click');
			expect(wrapper.emitted('click-all')).toBeTruthy();
		}
	});

	test('click-item event', async () => {
		const data = [{ question: '问题', answer: '答案' }];
		const wrapper = mount(steGuideQa, {
			propsData: {
				data,
				mode: '2',
			},
		});
		const questionItem = wrapper.find('.item.question');
		if (questionItem.exists()) {
			await questionItem.trigger('click');
			expect(wrapper.emitted('click-item')).toBeTruthy();
		}
	});
});
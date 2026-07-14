import { mount } from '@vue/test-utils';
import steComment from '../../uni_modules/stellar-ui/components/ste-comment/ste-comment.vue';

describe('Test Comment', () => {
	test('tags prop', () => {
		const tags = ['好评', '质量好', '发货快'];
		const wrapper = mount(steComment, {
			propsData: {
				tags,
			},
		});
		expect(wrapper.props().tags).toEqual(tags);
	});

	test('total prop', () => {
		const wrapper = mount(steComment, {
			propsData: {
				total: 100,
			},
		});
		expect(wrapper.props().total).toBe(100);
	});

	test('comments prop', () => {
		const comments = [
			{
				userAvatar: 'https://example.com/avatar1.png',
				userName: '用户1',
				type: 1,
				date: '2024-01-01',
				evaluateText: '非常好的商品',
				imgList: [],
			},
		];
		const wrapper = mount(steComment, {
			propsData: {
				comments,
			},
		});
		expect(wrapper.props().comments).toEqual(comments);
	});

	test('totalData computed', () => {
		const wrapper = mount(steComment, {
			propsData: {
				total: 50,
				comments: Array(30).fill({}),
			},
		});
		expect(wrapper.vm.totalData).toBe(50);
	});

	test('totalData computed when total is less than comments length', () => {
		const wrapper = mount(steComment, {
			propsData: {
				total: 10,
				comments: Array(30).fill({}),
			},
		});
		expect(wrapper.vm.totalData).toBe(30);
	});

	test('headRight computed when no comments', () => {
		const wrapper = mount(steComment, {
			propsData: {
				total: 0,
				comments: [],
			},
		});
		expect(wrapper.vm.headRight).toBe('期待你的首评');
	});

	test('headRight computed when has comments', () => {
		const wrapper = mount(steComment, {
			propsData: {
				total: 10,
				comments: [],
			},
		});
		expect(wrapper.vm.headRight).toBe('全部评价');
	});

	test('empty comments state', () => {
		const wrapper = mount(steComment, {
			propsData: {
				total: 0,
				comments: [],
			},
		});
		expect(wrapper.classes()).toContain('not');
	});

	test('with comments state', () => {
		const wrapper = mount(steComment, {
			propsData: {
				total: 10,
				comments: [{
					userAvatar: 'https://example.com/avatar.png',
					userName: '用户',
					date: '2024-01-01',
					evaluateText: '测试评价',
					imgList: [],
				}],
			},
		});
		expect(wrapper.classes()).not.toContain('not');
	});
});
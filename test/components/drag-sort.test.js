import { mount } from '@vue/test-utils';
import steDragSort from '../../uni_modules/stellar-ui/components/ste-drag-sort/ste-drag-sort.vue';

describe('Test DragSort', () => {
	test('value prop', () => {
		const value = ['item1', 'item2', 'item3'];
		const wrapper = mount(steDragSort, {
			propsData: {
				value,
			},
		});
		expect(wrapper.props().value).toEqual(value);
	});

	test('disabled prop', () => {
		const wrapper = mount(steDragSort, {
			propsData: {
				value: ['item1'],
				disabled: true,
			},
		});
		expect(wrapper.props().disabled).toBe(true);
	});

	test('columns prop', () => {
		const wrapper = mount(steDragSort, {
			propsData: {
				value: ['item1', 'item2', 'item3', 'item4'],
				columns: 2,
			},
		});
		expect(wrapper.props().columns).toBe(2);
	});

	test('longPress prop', () => {
		const wrapper = mount(steDragSort, {
			propsData: {
				value: ['item1'],
				longPress: false,
			},
		});
		expect(wrapper.props().longPress).toBe(false);
	});

	test('cmpColumns computed', () => {
		const wrapper = mount(steDragSort, {
			propsData: {
				value: ['item1'],
				columns: 3,
			},
		});
		expect(wrapper.vm.cmpColumns).toBe(3);
	});

	test('cmpColumns computed with invalid value', () => {
		const wrapper = mount(steDragSort, {
			propsData: {
				value: ['item1'],
				columns: 0,
			},
		});
		expect(wrapper.vm.cmpColumns).toBe(1);
	});

	test('getItemDisabled method', () => {
		const wrapper = mount(steDragSort, {
			propsData: {
				value: [{ disabled: true }, { disabled: false }],
			},
		});
		expect(wrapper.vm.getItemDisabled(0)).toBe(true);
		expect(wrapper.vm.getItemDisabled(1)).toBe(false);
	});

	test('getEnabledIndices method', () => {
		const wrapper = mount(steDragSort, {
			propsData: {
				value: [{ disabled: true }, { disabled: false }, { disabled: false }, { disabled: true }],
			},
		});
		expect(wrapper.vm.getEnabledIndices()).toEqual([1, 2]);
	});

	test('resetDragState method', () => {
		const wrapper = mount(steDragSort, {
			propsData: {
				value: ['item1', 'item2'],
			},
		});
		wrapper.vm.dragging = true;
		wrapper.vm.dragIndex = 0;
		wrapper.vm.insertIndex = 1;

		wrapper.vm.resetDragState();

		expect(wrapper.vm.dragging).toBe(false);
		expect(wrapper.vm.dragIndex).toBe(-1);
		expect(wrapper.vm.insertIndex).toBe(-1);
	});

	test('syncList method', () => {
		const wrapper = mount(steDragSort, {
			propsData: {
				value: ['item1', 'item2'],
			},
		});
		expect(wrapper.vm.list.length).toBe(2);
		expect(wrapper.vm.list[0].raw).toBe('item1');
		expect(wrapper.vm.list[1].raw).toBe('item2');
	});
});
import { expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steBadge from '../uni_modules/stellar-ui/components/ste-badge/ste-badge.vue';

test('test Comp', async () => {
	const handleModify = vi.fn();

	// 使用 mount 创建一个包含被挂载和渲染的 Vue 组件的 Wrapper，
	// 该 Wrapper 对象包含了一个挂载的组件或 vnode，以及测试该组件或 vnode 的方法。
	const wrapper = mount(steBadge, {
		propsData: {
			content: 80,
		},
	});
	// getComponent: 返回第一个匹配的 Vue 组件的 Wrapper。
	// 如果未匹配到给定的选择器时会抛出错误。
	const inputWrapper = wrapper.getComponent('view');
	console.log('inputWrapper', inputWrapper.text());
	// 设置一个文本输入框的值并更新 v-model 绑定的数据。
	// 以下三种方式均可行：

	// 1: value & trigger
	// inputWrapper.element.value = '123'
	// trigger 会返回一个 Promise，当这个 Promise 被解决时，会确保组件已经被更新。
	// await inputWrapper.trigger('input')

	// 2: 使用原生的 dispatchEvent
	// inputWrapper.element.value = '123'
	// await inputWrapper.element.dispatchEvent(new Event('input'))

	// 3: 使用 setValue
	// setValue 用于设置一个文本控件或 select 元素的值并更新 v-model 绑定的数据。

	// 是接下来这段代码的别名
	// inputWrapper.element.value = '123'
	// await inputWrapper.trigger('input')

	// 任何导致操作 DOM 的改变都应该在断言之前 await nextTick 函数。
	// 在更新响应式 property 之后，我们可以直接 await 类似 trigger 或 trigger.vm.$nextTick 方法，等待 Vue 完成 DOM 更新。
	// 从 vue 引入 nextTick
	await nextTick();
	// 或者从 wrapper.vm 拿 $nextTick
	// await wrapper.vm.$nextTick()

	expect(inputWrapper.text()).toEqual('80');
});

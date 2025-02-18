import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steMessageBox from '../../uni_modules/stellar-ui/components/ste-message-box/ste-message-box.vue';
import useSteMsgBox from '../../uni_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
import { createVue } from '../methods';

describe('Test MessageBox', async () => {
	let wrapper;

	const createWrapper = ({ slotContent = '' } = {}) => {
		const options = {
			components: {
				'ste-message-box': steMessageBox,
			},
			template: `<div><ste-message-box selector="myMsgBox" ref="myMsgBox"><slot/></ste-message-box></div>`,
			methods: {
				showMessage(config = {}) {
					const msgBox = useSteMsgBox('myMsgBox');
					msgBox.showMsgBox({
						...config,
					});
				},
			},
		};

		const mountOptions = {};
		if (slotContent) {
			mountOptions.slots = {
				default: slotContent,
			};
		}

		return mount(options, mountOptions);
	};

	// 测试执行前钩子
	beforeEach(async () => {
		wrapper = createWrapper();
		await nextTick();
	});

	// 执行完毕钩子
	afterEach(() => {
		wrapper.destroy();
	});

	// 测试消息框显示
	test('triggered', async () => {
		const title = '评分';
		// 触发显示消息框
		await wrapper.vm.showMessage({ title });
		await wrapper.vm.$nextTick();

		// 验证消息框是否显示
		const messageBox = wrapper.find('.ste-message-box-root'); // 替换为实际的类名
		expect(messageBox.exists()).toBeTruthy();
		expect(messageBox.find('.ste-message-title').text()).toBe(title); // 替换为实际的标题类名
	});

	test('config', async () => {
		const config = {
			title: '提示',
			content: '确认删除订单吗？',
			cancelText: '算了',
			confirmText: '删吧',
			cancelColor: '#e1e',
			confirmColor: '#a8ae1e',
		};
		await wrapper.vm.showMessage(config);
		await wrapper.vm.$nextTick();

		const messageBox = wrapper.find('.ste-message-box-root');
		expect(messageBox.find('.ste-message-title').text()).toBe(config.title);
		expect(messageBox.find('.msg').text()).toBe(config.content);
		expect(messageBox.find('.cancel.text').text()).toBe(config.cancelText);
		expect(messageBox.find('.confirm.text').text()).toBe(config.confirmText);

		expect(messageBox.element.style.getPropertyValue('--cancel-color')).toBe(config.cancelColor);
		expect(messageBox.element.style.getPropertyValue('--confirm-color')).toBe(config.confirmColor);
	});

	test('input mode', async () => {
		await wrapper.vm.showMessage({
			title: '提示',
			content: '确认删除订单吗？',
			editable: true,
			placeholderText: '请输入',
		});
		await wrapper.vm.$nextTick();

		const inputEl = wrapper.find('.ste-message-box-input');
		expect(inputEl.exists()).toBeTruthy();
	});

	test('slot', async () => {
		const slotContent = 'Message box slot';
		wrapper = createWrapper({ slotContent });
		await wrapper.vm.showMessage({ title: '提示123' });
		await wrapper.vm.$nextTick();

		const slotEl = wrapper.find('.msg');
		expect(slotEl.text()).toBe(slotContent);
	});

	test('close', async () => {
		await wrapper.vm.showMessage({ title: 'title' });
		await wrapper.vm.$nextTick();

		// 调用组件方法执行关闭
		const msgBoxComponent = wrapper.vm.$refs.myMsgBox;
		msgBoxComponent.handleComplete();
		await wrapper.vm.$nextTick();
		await new Promise((resolve) => setTimeout(resolve, 1000)); // 等待动画执行完毕后关闭

		const messageBox = wrapper.find('.ste-message-box-root');
		expect(messageBox.exists()).toBe(false);
	});
});

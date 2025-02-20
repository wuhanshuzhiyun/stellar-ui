import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tour from '../../uni_modules/stellar-ui/components/ste-tour/ste-tour.vue';
import { createVue, triggerClick } from '../methods';

describe('Tour Vue Component', async () => {
	const vm = createVue({
		components: { "ste-tour": Tour },
		template: `<div>
			<div id="test-button1" class="button-box">
				<button>基础提示</button>
			</div>
			<div id="test-button2" class="button-box">
				<button>基础提示</button>
			</div>
			<ste-tour :show.sync="show" :steps="steps"></ste-tour>
		</div>`,
		data() {
			return {
				show: false,
				steps: [{ message: '点这里', target: 'test-button1' }],
			}
		}
	}, true)

	await new Promise(p => setTimeout(p, 500));

	test("init", async () => {
		// 默认隐藏
		const el = vm.$el.querySelector('[data-test="tour"]')
		expect(el.classList.toString().indexOf('show') === -1).toBe(true);
	})

	test('show', async () => {
		// 点击显示
		vm.show = true;
		await nextTick();
		const el = vm.$el.querySelector('[data-test="tour"]')
		expect(el.classList.toString().indexOf('show') !== -1).toBe(true);


	});

	test('hide', async () => {
		// 点击隐藏
		vm.show = false;
		await nextTick();
		const el = vm.$el.querySelector('[data-test="tour"]')
		expect(el.classList.toString().indexOf('show') === -1).toBe(true);
	})

	test("steps", async () => {
		const vm = createVue({
			components: { "ste-tour": Tour },
			template: `<div>
				<div id="test-button1" class="button-box">
					<button>基础提示</button>
				</div>
				<div id="test-button2" class="button-box">
					<button>基础提示</button>
				</div>
				<ste-tour :show.sync="show" :steps="steps" ref="tour"></ste-tour>
			</div>`,
			data() {
				return {
					show: true,
					steps: [{ message: '先点这里', target: 'test-button1' }, { message: '再点这里', target: 'test-button2' }],
				}
			}
		}, true)
		await nextTick();
		const el = vm.$el.querySelector('[data-test="tour"]')
		expect(el.classList.toString().indexOf('show') !== -1).toBe(true);
		const prev = vm.$el.querySelector('[data-test="tour-prev"]')
		expect(prev).toBe(null);
		const next = vm.$el.querySelector('[data-test="tour-next"]')
		expect(next.innerHTML.trim()).toBe("下一步")
		expect(vm.$refs.tour.dataCurrent).toBe(0);
		vm.$refs.tour.onNext() // 下一步事件
		await new Promise(resolve => setTimeout(resolve, 300));
		expect(vm.$refs.tour.dataCurrent).toBe(1);
		const prev1 = vm.$el.querySelector('[data-test="tour-prev"]')
		expect(prev1.innerHTML.trim()).toBe("上一步");
		const next1 = vm.$el.querySelector('[data-test="tour-next"]')
		expect(next1.innerHTML.trim()).toBe("完成")
	})

	const wrapper = mount(Tour, {
		propsData: {
			show: true,
			steps: [{ message: '点这里', target: 'test-button1' }],
			offset: [0, 0],
			showTitleBar: false,
			showFooter: true,
			mask: true,
			maskColse: true,
			showPrevStep: true,
			background: 'rgba(0,0,0,.5)',
			radius: 18,
			messageBg: "#ffffff",
			messageColor: "#000000",
			nextStepTxt: "下一步",
			prevStepTxt: "上一步",
			completeTxt: "完成",
		}
	})
	// await nextTick()
	// test("offset", () => {
	// 	expect(wrapper.props("offset")).toEqual([0, 0]);
	// })
	// test("showTitleBar", () => {
	// 	expect(wrapper.props("showTitleBar")).toBe(false);
	// })
	// test("showFooter", () => {
	// 	expect(wrapper.props("showFooter")).toBe(true);
	// })
	// test("mask", () => {
	// 	expect(wrapper.props("mask")).toBe(true);
	// })
	// test("maskColse", () => {
	// 	expect(wrapper.props("maskColse")).toBe(true);
	// })
	// test("showPrevStep", () => {
	// 	expect(wrapper.props("showPrevStep")).toBe(true);
	// })
	// test("background", () => {
	// 	expect(wrapper.props("background")).toBe("rgba(0,0,0,.5)");
	// })
	// test("radius", () => {
	// 	expect(wrapper.props("radius")).toBe(18);
	// })
	// test("messageBg", () => {
	// 	expect(wrapper.props("messageBg")).toBe("#ffffff");
	// })
	// test("messageColor", () => {
	// 	expect(wrapper.props("messageColor")).toBe("#000000");
	// })
	// test("nextStepTxt", () => {
	// 	expect(wrapper.props("nextStepTxt")).toBe("下一步");
	// })
	// test("prevStepTxt", () => {
	// 	expect(wrapper.props("prevStepTxt")).toBe("上一步");
	// })
	// test("completeTxt", () => {
	// 	expect(wrapper.props("completeTxt")).toBe("完成");
	// })
})
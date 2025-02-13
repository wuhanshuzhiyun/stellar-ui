import { nextTick } from 'vue';
import Tour from '../../uni_modules/stellar-ui/components/ste-tour/ste-tour.vue';
import { createVue, triggerClick } from '../methods';

describe('Tour Component', async () => {
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

	await nextTick();

	test("Tour init", async () => {
		// 默认隐藏
		const el = vm.$el.querySelector('[data-test="tour"]')
		expect(el.classList.toString().indexOf('show') === -1).toBe(true);
	})

	test('Tour show', async () => {
		// 点击显示
		vm.show = true;
		await nextTick();
		const el = vm.$el.querySelector('[data-test="tour"]')
		expect(el.classList.toString().indexOf('show') !== -1).toBe(true);


	});

	test('Tour hide', async () => {
		// 点击隐藏
		vm.show = false;
		await nextTick();
		const el = vm.$el.querySelector('[data-test="tour"]')
		expect(el.classList.toString().indexOf('show') === -1).toBe(true);
	})

	test("Tour steps", async () => {
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
		expect(vm.$refs.tour.dataCurrent).toBe(1);
		await new Promise(resolve => setTimeout(resolve, 300));
		const prev1 = vm.$el.querySelector('[data-test="tour-prev"]')
		expect(prev1.innerHTML.trim()).toBe("上一步");
	})

});

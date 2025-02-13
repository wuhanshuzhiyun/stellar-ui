import { nextTick } from 'vue';
import Tour from '../../uni_modules/stellar-ui/components/ste-tour/ste-tour.vue';
import { createVue } from '../methods';

describe('Tour Component', async () => {
	const vm = createVue({
		components: { "ste-tour": Tour },
		template: `<div>
			<div id="test-button" class="button-box">
				<button>基础提示</button>
			</div>
			<ste-tour :show.sync="show" :steps="steps"></ste-tour>
		</div>`,
		data() {
			return {
				show: false,
				steps: [{ message: '点这里', target: 'test-button' }],
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

});

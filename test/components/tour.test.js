import { nextTick } from 'vue';
import Tour from '../../uni_modules/stellar-ui/components/ste-tour/ste-tour.vue';
import { createVue } from '../methods';

describe('Tour Component', () => {
	it('Tour show', async () => {
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
		// 默认隐藏
		const el1 = vm.$el.querySelector('[data-test="tour"]')
		expect(el1.classList.toString().indexOf('show') === -1).toBe(true);
		// 点击显示
		vm.show = true;
		await nextTick();
		const el = vm.$el.querySelector('[data-test="tour"]')
		expect(el.classList.toString().indexOf('show') !== -1).toBe(true);
	});

});

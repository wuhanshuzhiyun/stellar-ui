import { nextTick } from 'vue';
import Tabs from '../../uni_modules/stellar-ui/components/ste-tabs/ste-tabs.vue';
import Tab from '../../uni_modules/stellar-ui/components/ste-tab/ste-tab.vue';
import { createVue } from '../methods';

describe('Tabs Component', async () => {
	const vm = createVue({
		components: { "ste-tabs": Tabs, "ste-tab": Tab },
		template: `<ste-tabs ref="tabs" :current.sync="current" width="750">
			<ste-tab v-for="(m, i) in imgs" :key="i">
				<view>内容{{ i + 1 }}</view>
				<image :src="m" mode="widthFix"></image>
			</ste-tab>
		</ste-tabs>`,
		data() {
			return {
				width: 750,
				current: 0,
				imgs: [
					'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
					'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
					'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
					'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
					'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
					'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
					'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
					'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
				],
			}
		}
	}, true)
	await nextTick();

	test("Tabs list-item", async () => {
		const list = vm.$el.querySelectorAll('[data-test="swiper-item"]');
		expect(list.length).toBe(8);
	})

	test("Tabs position", async () => {
		const translateX = vm.$refs.swiper.translateX
		expect(translateX).toBe(0)



	})

	test("Tabs current", async () => {
		vm.current = 1
		await new Promise(resolve => setTimeout(resolve, 500))
		expect(vm.$refs.swiper.translateX).toBe(-375)
	})

	test("Tabs vertical", async () => {
		const vm = createVue({
			components: { "ste-swiper": Tabs, "ste-swiper-item": Tab },
			template: `<ste-swiper ref="swiper" :current.sync="current" height="1334" direction="vertical">
				<ste-swiper-item v-for="(m, i) in imgs" :key="i">
					<view>内容{{ i + 1 }}</view>
					<image :src="m" mode="widthFix"></image>
			</ste-swiper-item>
		</ste-swiper>`,
			data() {
				return {
					current: 0,
					imgs: [
						'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
						'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
						'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
						'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
						'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
						'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
						'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
						'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
					],
				}
			}
		})
		await nextTick();
		const translateX = vm.$refs.swiper.translateY
		expect(translateX).toBe(0)
		vm.current = 1
		await new Promise(resolve => setTimeout(resolve, 500))
		expect(vm.$refs.swiper.translateY).toBe(-667)
	})
});

import { nextTick } from 'vue';
import Swiper from '../../uni_modules/stellar-ui/components/ste-swiper/ste-swiper.vue';
import SwiperItem from '../../uni_modules/stellar-ui/components/ste-swiper-item/ste-swiper-item.vue';
import { createVue } from '../methods';
import { mount } from '@vue/test-utils';

describe('Swiper Component', async () => {
	const vm = createVue({
		components: { "ste-swiper": Swiper, "ste-swiper-item": SwiperItem },
		template: `<ste-swiper ref="swiper" :current.sync="current" width="750">
			<ste-swiper-item v-for="(m, i) in imgs" :key="i">
				<view>内容{{ i + 1 }}</view>
				<image :src="m" mode="widthFix"></image>
			</ste-swiper-item>
		</ste-swiper>`,
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

	const wrapper = mount(Swiper, {
		propsData: {
			disabled: false,
			width: 750,
			height: 1334,
			duration: 300,
			swipeThreshold: 0.35,
			indicatorDots: false,
			indicatorColor: "#ffffff",
			indicatorActiveColor: "#ffffff",
			autoplay: false,
			interval: 3000,
			circular: false,
			previousMargin: 0,
			nextMargin: 0
		}
	})

	await new Promise(r => setTimeout(r, 500));

	test("list-item", async () => {
		const list = vm.$el.querySelectorAll('[data-test="swiper-item"]');
		expect(list.length).toBe(8);
	})

	test("position", async () => {
		const translateX = vm.$refs.swiper.translateX
		expect(translateX).toBe(0)
	})

	test("current", async () => {
		vm.current = 1
		await new Promise(resolve => setTimeout(resolve, 500))
		expect(vm.$refs.swiper.translateX).toBe(-375)
	})

	test("direction-vertical", async () => {
		const vm = createVue({
			components: { "ste-swiper": Swiper, "ste-swiper-item": SwiperItem },
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

	test("disabled", () => {
		expect(wrapper.props().disabled).toBe(false)
	})

	test("autoplay", () => {
		expect(wrapper.props().autoplay).toBe(false)
	})

	test("current", () => {
		expect(wrapper.props().current).toBe(0)
	})

	test("interval", () => {
		expect(wrapper.props().interval).toBe(3000)
	})

	test("circular", () => {
		expect(wrapper.props().circular).toBe(false)
	})

	test("previousMargin", () => {
		expect(wrapper.props().previousMargin).toBe(0)
	})

	test("nextMargin", () => {
		expect(wrapper.props().nextMargin).toBe(0)
	})
});

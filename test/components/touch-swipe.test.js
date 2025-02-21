import TouchSwipe from '../../uni_modules/stellar-ui/components/ste-touch-swipe/ste-touch-swipe.vue';
import TouchSwipeItem from '../../uni_modules/stellar-ui/components/ste-touch-swipe-item/ste-touch-swipe-item.vue';
import { createVue } from '../methods';
import { mount } from '@vue/test-utils';

describe('TouchSwipe Component', async () => {
	const vm = createVue({
		components: { "ste-touch-swipe": TouchSwipe, "ste-touch-swipe-item": TouchSwipeItem },
		template: `<ste-touch-swipe :index.sync="hIndex" ref="swiper">
			<ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
				<image :src="img" mode="widthFix" style="width: 100%" />
			</ste-touch-swipe-item>
		</ste-touch-swipe>
		`,
		data() {
			return {
				hIndex: 0,
				imgs: [
					'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
					'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
					'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
					'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
				]
			}
		}
	}, true)

	const wrapper = mount(TouchSwipe, {
		propsData: {
			index: 0,
			direction: "horizontal",
			width: "100%",
			height: "100%",
			duration: 0.3,
			swipeThreshold: 0.35,
			disabled: false,
			childrenLength: 0,
			disabledIndexs: []
		}
	})

	await new Promise(resolve => setTimeout(resolve, 500))

	test("TouchSwipe index", async () => {
		expect(vm.$refs.swiper.translateX + 0).toBe(0)
		vm.hIndex = 1
		await new Promise(resolve => setTimeout(resolve, 500))
		expect(vm.$refs.swiper.translateX).toBe(-375)
	})

	test("TouchSwipe children", async () => {
		expect(vm.$refs.swiper.children.length).toBe(4)
	})

	test("TouchSwipe vertical", async () => {
		const vm = createVue({
			components: { "ste-touch-swipe": TouchSwipe, "ste-touch-swipe-item": TouchSwipeItem },
			template: `<ste-touch-swipe :index.sync="hIndex" ref="swiper" direction="vertical">
				<ste-touch-swipe-item v-for="(img, index) in imgs" :key="index">
					<image :src="img" mode="widthFix" style="width: 100%" />
				</ste-touch-swipe-item>
			</ste-touch-swipe>
			`,
			data() {
				return {
					hIndex: 0,
					imgs: [
						'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
						'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
						'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
						'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
					]
				}
			}
		}, true)
		await new Promise(resolve => setTimeout(resolve, 500))
		expect(vm.$refs.swiper.translateY + 0).toBe(0)
		vm.hIndex = 1
		await new Promise(resolve => setTimeout(resolve, 500))
		expect(vm.$refs.swiper.translateY).toBe(-667)
	})

	test("TouchSwipe disabled", () => {
		expect(wrapper.props().disabled).toBe(false)
	})
	test("TouchSwipe direction", () => {
		expect(wrapper.props().direction).toBe("horizontal")
	})
	test("TouchSwipe width", () => {
		expect(wrapper.props().width).toBe("100%")
	})
	test("TouchSwipe height", () => {
		expect(wrapper.props().height).toBe("100%")
	})
	test("TouchSwipe duration", () => {
		expect(wrapper.props().duration).toBe(0.3)
	})
	test("TouchSwipe swipeThreshold", () => {
		expect(wrapper.props().swipeThreshold).toBe(0.35)
	})
	test("TouchSwipe disabledIndexs", () => {
		expect(wrapper.props().disabledIndexs).toEqual([])
	})
	test("TouchSwipe childrenLength", async () => {
	  expect(wrapper.props().childrenLength).toBe(4)
	})
});

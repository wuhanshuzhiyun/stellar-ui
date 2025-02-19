import { nextTick } from 'vue';
import TouchSwipe from '../../uni_modules/stellar-ui/components/ste-touch-swipe/ste-touch-swipe.vue';
import TouchSwipeItem from '../../uni_modules/stellar-ui/components/ste-touch-swipe-item/ste-touch-swipe-item.vue';
import { createVue } from '../methods';

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
	await new Promise(resolve => setTimeout(resolve, 500))

	test("TouchSwipe index", async () => {
		expect(vm.$refs.swiper.translateX + 0).toBe(0)
		vm.hIndex = 1
		await new Promise(resolve => setTimeout(resolve, 500))
		expect(vm.$refs.swiper.translateX).toBe(-375)
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

});

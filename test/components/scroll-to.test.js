import { nextTick } from 'vue';
import ScrollTo from '../../uni_modules/stellar-ui/components/ste-scroll-to/ste-scroll-to.vue';
import ScrollToItem from '../../uni_modules/stellar-ui/components/ste-scroll-to-item/ste-scroll-to-item.vue';
import { createVue } from '../methods';

describe('ScrollTo Component', async () => {
	const vm = createVue({
		components: { "ste-scroll-to": ScrollTo, "ste-scroll-to-item": ScrollToItem },
		template: `<ste-scroll-to ref="scrollTo" height="1200" :active.sync="active">
			<ste-scroll-to-item v-for="(m, i) in imgs" :key="i">
				<view>内容{{ i + 1 }}</view>
				<image :src="m" mode="widthFix"></image>
			</ste-scroll-to-item>
		</ste-scroll-to>`,
		data() {
			return {
				active: 0,
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
	test("ScrollTo list-item", async () => {
		const list = vm.$el.querySelectorAll('[data-test="scroll-to-item"]');
		expect(list.length).toBe(8);
	})

});

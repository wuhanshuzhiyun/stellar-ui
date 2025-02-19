import { nextTick } from 'vue';
import Tabs from '../../uni_modules/stellar-ui/components/ste-tabs/ste-tabs.vue';
import Tab from '../../uni_modules/stellar-ui/components/ste-tab/ste-tab.vue';
import { createVue, style2obj } from '../methods';
const list = [
	{
		title: '标签1',
		image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
		content: 'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
	},
	{
		title: '标签2',
		image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
		content: 'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
	},
	{
		title: '标签3标签3标签3标签3',
		image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
		content: 'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
	},
	{
		title: '标签4',
		image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
		content: 'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
	},
]

describe('Tabs Component', async () => {
	const vm = createVue({
		components: { "ste-tabs": Tabs, "ste-tab": Tab },
		template: `<ste-tabs ref="tabs" >
			<ste-tab v-for="(item, index) in list" :key="index" :title="item.title" :index="index">
				<view>{{ item.title }}内容</view>
				<image style="width: 100%; height: 300px" :src="item.content" />
			</ste-tab>
		</ste-tabs>`,
		data() {
			return { list }
		}
	}, true)
	await new Promise(resolve => setTimeout(resolve, 1000));

	test("Tabs tab-item", async () => {
		const tabs = vm.$el.querySelectorAll('[data-test="tab"]');
		expect(tabs.length).toBe(4);

		const titles = vm.$el.querySelectorAll('[data-test="tab-title"]');
		expect(titles.length).toBe(4);
	})




	test("Tabs showImage", async () => {
		const vm = createVue({
			components: { "ste-tabs": Tabs, "ste-tab": Tab },
			template: `<ste-tabs ref="tabs" :showImage="true">
				<ste-tab v-for="(item, index) in list" :key="index" :title="item.title" :index="index" >
					<view>{{ item.title }}内容</view>
					<image style="width: 100%; height: 300px" :src="item.content" />
				</ste-tab>
			</ste-tabs>`,
			data() {
				return { list }
			}
		}, true)
		await new Promise(resolve => setTimeout(resolve, 1000));
		const imgs = vm.$el.querySelectorAll('[date-test="tab-image"]');
		expect(imgs.length).toBe(4);
	})


	test("Tabs showSubtitle", async () => {
		const vm = createVue({
			components: { "ste-tabs": Tabs, "ste-tab": Tab },
			template: `<ste-tabs ref="tabs" :showSubtitle="true">
				<ste-tab v-for="(item, index) in list" :key="index" :title="item.title" :index="index" >
					<view>{{ item.title }}内容</view>
					<image style="width: 100%; height: 300px" :src="item.content" />
				</ste-tab>
			</ste-tabs>`,
			data() {
				return { list }
			}
		}, true)
		await new Promise(resolve => setTimeout(resolve, 1000));
		const subtitles = vm.$el.querySelectorAll('[data-test="tab-sub-title"]');
		expect(subtitles.length).toBe(4);
	})
	test("Tabs color", async () => {
		const vm = createVue({
			components: { "ste-tabs": Tabs, "ste-tab": Tab },
			template: `<ste-tabs ref="tabs" color="#f00">
				<ste-tab v-for="(item, index) in list" :key="index" :title="item.title" :index="index" >
					<view>{{ item.title }}内容</view>
					<image style="width: 100%; height: 300px" :src="item.content" />
				</ste-tab>
			</ste-tabs>`,
			data() {
				return { list }
			}
		}, true)
		await new Promise(resolve => setTimeout(resolve, 1000));
		const tabs = vm.$el;
		expect(tabs.style._values["--tabs-card-background-active"]).toBe('rgba(255,0,0,0.1)');
	})

	test("Tabs background", async () => {
		const vm = createVue({
			components: { "ste-tabs": Tabs, "ste-tab": Tab },
			template: `<ste-tabs ref="tabs" background="#f00">
				<ste-tab v-for="(item, index) in list" :key="index" :title="item.title" :index="index" >
					<view>{{ item.title }}内容</view>
					<image style="width: 100%; height: 300px" :src="item.content" />
					</ste-tab>
			</ste-tabs>`,
			data() {
				return { list }
			}
		})
		await new Promise(resolve => setTimeout(resolve, 1000));
		const bg = vm.$refs.tabs.cmpListBackground.backgroundColor;
		expect(bg).toBe('#f00');
	})

	test("Tabs titleColor and activeTitleColor", async () => {
		const vm = createVue({
			components: { "ste-tabs": Tabs, "ste-tab": Tab },
			template: `<ste-tabs ref="tabs" titleColor="#f00" activeTitleColor="#00f">
				<ste-tab v-for="(item, index) in list" :key="index" :title="item.title" :index="index" >
					<view>{{ item.title }}内容</view>
					<image style="width: 100%; height: 300px" :src="item.content" />
				</ste-tab>
			</ste-tabs>`,
			data() {
				return { list }
			}
		})
		await new Promise(resolve => setTimeout(resolve, 1000));
		const style = vm.$refs.tabs.cmpRootStyle;
		expect(style['--tabs-title-color']).toBe('#f00');
		expect(style['--tabs-active-title-color']).toBe('#00f');
	})

	test("Tabs titleHeight", async () => {
		const vm = createVue({
			components: { "ste-tabs": Tabs, "ste-tab": Tab },
			template: `<ste-tabs ref="tabs" titleHeight="90">
				<ste-tab v-for="(item, index) in list" :key="index" :title="item.title" :index="index" >
					<view>{{ item.title }}内容</view>
					<image style="width: 100%; height: 300px" :src="item.content" />
				</ste-tab>
			</ste-tabs>`,
			data() {
				return { list }
			}
		})
		await new Promise(resolve => setTimeout(resolve, 1000));
		const style = vm.$refs.tabs.cmpRootStyle;
		expect(style['--tabs-title-height']).toBe('45px');
	})

	

});

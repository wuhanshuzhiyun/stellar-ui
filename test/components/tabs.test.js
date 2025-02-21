import { nextTick } from 'vue';
import Tabs from '../../uni_modules/stellar-ui/components/ste-tabs/ste-tabs.vue';
import Tab from '../../uni_modules/stellar-ui/components/ste-tab/ste-tab.vue';
import { createVue, style2obj } from '../methods';
import { mount } from '@vue/test-utils';
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

	const wrapper = mount(Tabs, {
		propsData: {
			active: 0,
			type: "line",
			showImage: false,
			showTitle: true,
			showSubtitle: false,
			color: "#0090ff",
			background: "#000000",
			radius: 0,
			duration: 0.3,
			showLine: true,
			lineWidth: 52,
			lineHeight: 6,
			border: false,
			ellipsis: false,
			tabWidth: "auto",
			tabPadding: 24,
			tabSpace: 0,
			divideNum: 4,
			sticky: false,
			offsetTop: 0,
			swipeable: false,
			titleColor: "#000000",
			activeTitleColor: "#000000",
			titleHeight: 48,
			subColor: "#000000",
			activeSubColor: "#ffffff",
			subTitleHeight: 42,
			subTitleRadius: 21,
			imageWidth: 80,
			imageHeight: 80,
			imageRadius: "50%",
			imageBorderWidth: 4,
			showGapLine: false,
			lock: false,
			disabled: false,
			pullDown: false,
			placeholder: "请选择",
			maskTop: 0,
			maskRight: 0,
			maskBottom: 0,
			maskLeft: 0,
			maskZindex: 1001
		}
	})


	await new Promise(resolve => setTimeout(resolve, 1000));

	test("tab-item", async () => {
		const tabs = vm.$el.querySelectorAll('[data-test="tab"]');
		expect(tabs.length).toBe(4);
		const titles = vm.$el.querySelectorAll('[data-test="tab-title"]');
		expect(titles.length).toBe(4);
	})

	test("showImage", async () => {
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

	test("showSubtitle", async () => {
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

	test("color", async () => {
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

	test("background", async () => {
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

	test("titleColor and activeTitleColor", async () => {
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

	test("el-height", async () => {
		const vm = createVue({
			components: { "ste-tabs": Tabs, "ste-tab": Tab },
			template: `<ste-tabs ref="tabs" titleHeight="90" subTitleHeight="60" subTitleRadius="30" imageWidth="60" imageHeight="60" imageRadius="10">
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
		expect(style['--tabs-sub-title-height']).toBe('30px');
		expect(style['--tabs-sub-title-radius']).toBe('15px');
		expect(style['--tabs-image-width']).toBe('30px');
		expect(style['--tabs-image-height']).toBe('30px');
		expect(style['--tabs-image-radius']).toBe('5px');
	})

	test("active", async () => {
		expect(wrapper.props().active).toBe(0);
	})
	test("type", async () => {
		expect(wrapper.props().type).toBe('line');
	})
	test("radius", () => {
		expect(wrapper.props().radius).toBe(0);
	})
	test("titleColor", () => {
		expect(wrapper.props().titleColor).toBe('#000000');
	})
	test("activeTitleColor", () => {
		expect(wrapper.props().activeTitleColor).toBe('#000000');
	})
	test("titleHeight", () => {
		expect(wrapper.props().titleHeight).toBe(48);
	})
	test("subTitleHeight", () => {
		expect(wrapper.props().subTitleHeight).toBe(42);
	})
	test("imageBorderWidth", () => {
		expect(wrapper.props().imageBorderWidth).toBe(4);
	})
	test("showGapLine", () => {
		expect(wrapper.props().showGapLine).toBe(false);
	})
	test("lock", () => {
		expect(wrapper.props().lock).toBe(false);
	})

	test("disabled", () => {
		expect(wrapper.props().disabled).toBe(false);
	})

	test("pullDown", () => {
		expect(wrapper.props().pullDown).toBe(false);
	})

	test("placeholder", () => {
		expect(wrapper.props().placeholder).toBe("请选择");
	})

	test("maskTop", () => {
		expect(wrapper.props().maskTop).toBe(0);
	})

	test("maskBottom", () => {
		expect(wrapper.props().maskBottom).toBe(0)
	})
	test("maskRight", () => {
		expect(wrapper.props().maskRight).toBe(0)
	})
	test("maskLeft", () => {
		expect(wrapper.props().maskLeft).toBe(0)
	})
	test("maskZindex", () => {
		expect(wrapper.props().maskZindex).toBe(1001)
	})
});

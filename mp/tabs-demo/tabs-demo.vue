<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="标签页"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Tabs 标签页</view>
				<view class="cmp-desc">用于内容分类后的展示切换。</view>
			</view>
			<item-view title="基础用法" open>
				<view class="sub-item">
					<view class="sub-title">标签数量小于或等于均分数量时，标签宽度均分</view>
					<ste-tabs>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">标签数量大均分数量时，标签宽度自适应，超出可滑动</view>
					<ste-tabs>
						<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">统一标签宽度</view>
					<ste-tabs tabWidth="180">
						<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">超出显示省略号</view>
					<ste-tabs tabWidth="180" ellipsis>
						<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="吸顶">
				<view class="sub-item">
					<view class="sub-title">开启标签自动吸顶</view>
					<ste-tabs showSubtitle sticky>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="图片和子标题">
				<view class="sub-item">
					<view class="sub-title">当显示子标题时，下划线会自动隐藏</view>
					<ste-tabs showSubtitle>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">展示图片主标题和子标题</view>
					<ste-tabs showSubtitle showImage>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:image="item.image"
							:title="item.title"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">隐藏主标题，展示图片主标题和子标题，图片边框隐藏</view>
					<ste-tabs showSubtitle showImage :showTitle="false" imageBorderWidth="0">
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:image="item.image"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">图片大小和圆角</view>
					<ste-tabs
						showSubtitle
						showImage
						:showTitle="false"
						imageWidth="200"
						imageHeight="90"
						imageRadius="18"
					>
						<ste-tab
							v-for="(item, index) in list2"
							:key="index"
							:image="item.image"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="下拉选项">
				<view class="sub-item">
					<view class="sub-title">开启下拉选项，当标签数量小于均分数量时不生效</view>
					<ste-tabs pullDown :showTitle="false" showImage showSubtitle tabWidth="180" tabPadding="12">
						<ste-tab
							v-for="(item, index) in list2"
							:key="index"
							:image="item.image"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">下拉蒙层位置</view>
					<ste-tabs
						pullDown
						:showTitle="false"
						showImage
						showSubtitle
						tabWidth="180"
						tabPadding="12"
						maskLeft="30"
						maskRight="30"
						maskBottom="120"
						maskTop="180"
					>
						<ste-tab
							v-for="(item, index) in list2"
							:key="index"
							:image="item.image"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="颜色">
				<view class="sub-item">
					<view class="sub-title">主题和背景</view>
					<ste-tabs
						pullDown
						showImage
						showSubtitle
						tabWidth="180"
						tabPadding="12"
						color="#f00"
						background="#ffa"
					>
						<ste-tab
							v-for="(item, index) in list2"
							:key="index"
							:title="item.title"
							:image="item.image"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">主标题字体颜色</view>
					<ste-tabs pullDown titleColor="#f90" activeTitleColor="#09f">
						<ste-tab v-for="(item, index) in list2" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">子标题字体颜色</view>
					<ste-tabs
						pullDown
						showSubtitle
						subColor="#09f"
						activeSubColor="#f90"
						tabWidth="180"
						tabPadding="12"
					>
						<ste-tab
							v-for="(item, index) in list2"
							:key="index"
							:title="item.title"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>

			<item-view title="手势切换">
				<view class="sub-item">
					<view class="sub-title">开启手势切换</view>
					<ste-tabs showSubtitle swipeable>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="卡片模式">
				<view class="sub-item">
					<view class="sub-title">开启卡片模式</view>
					<ste-tabs swipeable type="card">
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">带边框</view>
					<ste-tabs swipeable type="card" border>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">修改主题色</view>
					<ste-tabs swipeable type="card" border color="#f00">
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="间距">
				<view class="sub-item">
					<view class="sub-title">设置间距间距</view>
					<ste-tabs swipeable type="card" tabSpace="12">
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">边框带间距</view>
					<ste-tabs swipeable type="card" border tabSpace="12">
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="分割线">
				<view class="sub-item">
					<view class="sub-title">线性模式下展示分割线</view>
					<ste-tabs swipeable showGapLine>
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">显示子标题样式</view>
					<ste-tabs swipeable showGapLine showSubtitle>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">卡片模式下展示分割线</view>
					<ste-tabs type="card" swipeable showGapLine tabSpace="14">
						<ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="锁定和禁用">
				<view class="sub-item">
					<view class="sub-title">锁定</view>
					<ste-tabs swipeable showGapLine showSubtitle lock>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">全局禁用</view>
					<ste-tabs swipeable showGapLine showSubtitle disabled>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
				<view class="sub-item">
					<view class="sub-title">单项禁用</view>
					<ste-tabs swipeable showGapLine showSubtitle>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							subTitle="子标题"
							:index="index"
							:disabled="index === 1"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="徽标">
				<view class="sub-item">
					<ste-tabs swipeable showGapLine showSubtitle>
						<ste-tab
							v-for="(item, index) in list1"
							:key="index"
							:title="item.title"
							:badge="item.badge"
							subTitle="子标题"
							:index="index"
						>
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
			<item-view title="异形">
				<view class="sub-item">
					<view class="sub-title">根据需求配置出所需效果</view>
					<ste-tabs
						showSubtitle
						:showTitle="false"
						background="#0090ff"
						subColor="#fff"
						activeSubColor="#0090ff"
						color="#fff"
						tabPadding="6"
						subTitleHeight="66"
						:showLine="false"
						radius="45"
						subTitleRadius="33"
					>
						<ste-tab v-for="(item, index) in list1" :key="index" :subTitle="item.title" :index="index">
							<view>{{ item.title }}内容</view>
							<image mode="widthFix" :src="item.content" />
						</ste-tab>
					</ste-tabs>
				</view>
			</item-view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			list1: [
				{
					title: '标签1',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/banner1.png',
					badge: 0,
				},
				{
					title: '标签2',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/banner2.png',
					badge: 1,
				},
				{
					title: '标签3标签3标签3标签3',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/banner1.png',
					badge: 2,
				},
				{
					title: '标签4',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/banner2.png',
					badge: 3,
				},
			],
		};
	},
	computed: {
		list2() {
			return [].concat(this.list1, [
				{
					title: '标签5',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/banner1.png',
				},
				{
					title: '标签6',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/banner2.png',
				},
				{
					title: '标签7',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/banner1.png',
				},
				{
					title: '标签8',
					image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
					content: 'https://image.whzb.com/chain/StellarUI/image/banner2.png',
				},
			]);
		},
	},
	mounted() {
		setTimeout(() => {
			const list = this.list1.map((item) => {
				item.badge += 10;
				return item;
			});
			this.list1 = list;
		}, 3000);
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		padding: 0;
		.description {
			padding: 0 40rpx;
		}
		.sub-item {
			padding-bottom: 18rpx;
			& + .sub-item {
				padding-top: 18rpx;
				border-top: 1px solid #ddd;
			}
			.sub-title {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
}
</style>

<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
		<view class="content">
			<view class="description">
				<view class="cmp-name">Search 搜索</view>
				<view class="cmp-desc">用于用户输入搜索信息，并进行页面内容搜索。</view>
			</view>
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-search @input="onInput" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search v-model="value" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search placeholder="搜索商品" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search disabled />
				</view>
			</view>

			<view class="demo-item">
				<view class="title">搜索建议</view>
				<view class="item-block">
					<ste-search
						:suggestion-list="suggestionList"
						@input="input1"
						@selectSuggestion="selectSuggestion"
					/>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">热词列表</view>
				<view class="item-block">
					<ste-search :hotWords="hotWords" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search :hotWords="hotWords" :interval="1000" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义按钮文字</view>
				<view class="item-block">
					<ste-search btnText="查询" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">隐藏分割线以及按钮</view>
				<view class="item-block">
					<ste-search hiddenLine @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search hiddenBtn @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">隐藏输入框以及按钮</view>
				<view class="item-block" style="width: 60rpx">
					<ste-search hiddenInput hiddenBtn @click="onClick" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">不显示清除图标</view>
				<view class="item-block">
					<ste-search :clearable="false" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">颜色和背景</view>
				<view class="item-block">
					<ste-search
						placeholder="全部颜色"
						hiddenLine
						borderColor="#F00"
						background="#000"
						prefixIconColor="#a55"
						placeholderColor="#a55"
						inputTextColor="#fff"
						clearIconColor="#a55"
						btnBackground="#fff"
						btnTextColor="#000"
						@search="onSearch"
					/>
				</view>
				<view class="item-block">
					<ste-search hiddenLine placeholder="边框颜色" borderColor="#F00" @search="onSearch" />
				</view>
				<view class="item-block">
					<ste-search
						placeholder="背景渐变和按钮背景渐变"
						hiddenLine
						borderColor="#F00"
						background="linear-gradient(to right, #aaaaaa, #aaa000)"
						prefixIconColor="#fff"
						placeholderColor="#fff"
						inputTextColor="#fff"
						clearIconColor="#a55"
						btnBackground="linear-gradient(to right, #0AAAAA, #000FFF)"
						btnTextColor="#fff"
						@search="onSearch"
					/>
				</view>
				<view class="item-block">
					<ste-search
						placeholder="背景图片和按钮背景图片"
						hiddenLine
						borderColor="#F00"
						background="https://image.whzb.com/chain/StellarUI/背景1.png"
						prefixIconColor="#fff"
						placeholderColor="#fff"
						inputTextColor="#fff"
						clearIconColor="#a55"
						btnBackground="https://image.whzb.com/chain/StellarUI/背景2.png"
						btnTextColor="#fff"
						@search="onSearch"
					/>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义高度以及圆角弧度</view>
				<view class="item-block">
					<ste-search :height="120" :radius="60" @search="onSearch" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">导航模式</view>
				<view class="item-block">
					<ste-search type="nav" @click="onClick" :hotWords="hotWords" />
				</view>
			</view>
			<view class="demo-item">
				<view class="title">聚焦</view>
				<view class="item-block">
					<ste-search @click="onClick" :focus.sync="focus" />
					<!--聚焦按钮-->
					<view style="margin: 10px auto 0 auto">
						<ste-button @click="focus = true" width="100%">聚焦</ste-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			value: 'RTX4060Ti',
			hotWords: ['RTX4060', 'RTX4070', 'RTX4080', '小米电视', '华为手机'],
			focus: false,
			suggestionList: [],
			data: [
				{ label: '三全鲜食（北新泾店）', value: '1全' },
				{ label: 'Hot honey 首尔炸鸡（仙霞路）', value: '2全' },
				{ label: '三贡茶', value: '3全' },
				{ label: '三浮生若茶（凌空soho店', value: '4全' },
				{ label: '三枪会山', value: '5全' },
				{ label: '三爱茜茜里(西郊百联)', value: '6全' },
				{ label: '三港式小铺', value: '7全' },
				{ label: '三蜀香源麻辣香锅', value: '8全' },
				{ label: '饭典*新简餐', value: '9全' },
				{ label: '浏阳蒸菜', value: '10全' },
			],
		};
	},
	watch: {
		text(v) {
			console.log('watch', v);
		},
	},
	created() {},
	methods: {
		onInput(v) {
			console.log('input', v);
		},
		onSearch(v) {
			console.log('search', v);
			this.$showToast({
				icon: 'none',
				title: `搜索：${v}`,
			});
		},
		onClick(v) {
			this.$showToast({
				icon: 'none',
				title: `点击触发：${v}`,
			});
		},
		input1(v) {
			if (v) {
				setTimeout(() => {
					this.suggestionList = this.data.filter((e) => e.label.indexOf(v) > -1);
				}, 450);
			} else {
				this.suggestionList = [];
			}
		},
		selectSuggestion(v) {
			this.$showToast({
				icon: 'none',
				title: `选了：${v.label}`,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				display: block;
				margin-bottom: 12rpx;
				& > .ste-search {
					margin: 0 16rpx 16rpx 0;
				}
			}
		}
	}
}
</style>

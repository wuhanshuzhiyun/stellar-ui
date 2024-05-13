<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="文本"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">可选</view>
				<view class="h1">H-1</view>
				<view class="h1">H-2</view>
				<view class="h1">H-3</view>
				<view class="h1">H-4</view>
				<view class="h1">H-5</view>
				<view class="h1">H-6</view>
				<view class="h1">H-7</view>
				<view class="h1">H-8</view>
				<ste-sticky @fixed="onFixed">
					<ste-button>粘性布局的按钮</ste-button>
				</ste-sticky>
				<view class="h1">H1</view>
				<view class="h1">H2</view>
				<view class="h1">H3</view>
				<view class="h1">H4</view>
				<view class="h1">H5</view>
				<view class="h1">H6</view>
				<view class="h1">H7</view>
				<view class="h1">H8</view>
				<view class="h1">H9</view>
				<view class="h1">H10</view>
				<view class="h1">H11</view>
				<view class="h1">H12</view>
				<view class="h1">H13</view>
				<view class="h1">H14</view>
				<view class="h1">H15</view>
				<view class="h1">H16</view>
				<view class="h1">H17</view>
				<view class="h1">H18</view>
				<view class="h1">H19</view>
				<view class="h1">H20</view>
				<view class="h1">H21</view>
				<view class="h1">H22</view>
				<view class="h1">H23</view>
				<view class="h1">H24</view>
				<view class="h1">H25</view>
				<view class="h1">H26</view>
				<view class="h1">H27</view>
				<view class="h1">H28</view>
				<view class="h1">H29</view>
				<view class="h1">H30</view>
				<view class="h1">H31</view>
				<view class="h1">H32</view>
				<view class="h1">H33</view>
				<view class="h1">H34</view>
				<view class="h1">H35</view>
				<view class="h1">H36</view>
				<view class="h1">H37</view>
				<view class="h1">H38</view>
				<view class="h1">H39</view>
				<view class="h1">H40</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	created() {},
	methods: {
		onFixed(v) {
			console.log('粘性布局：', v);
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
			}
			.h1 {
				font-size: 42rpx;
				line-height: 90rpx;
			}
		}
	}
}
</style>

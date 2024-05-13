<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="文本"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="message">滚动页面,即可看到下方的按钮会吸顶。</view>
				<ste-sticky @fixed="onFixed" @unfixed="onUnfixed">
					<ste-button :round="false">粘性布局的按钮</ste-button>
				</ste-sticky>
				<view class="content-view">
					<view>其他内容</view>
					<view>1</view>
					<view>2</view>
					<view>3</view>
					<view>4</view>
					<view>5</view>
					<view>6</view>
					<view>7</view>
					<view>8</view>
					<view>9</view>
					<view>10</view>
					<view>11</view>
					<view>12</view>
					<view>13</view>
					<view>14</view>
					<view>15</view>
					<view>16</view>
					<view>17</view>
					<view>18</view>
					<view>19</view>
					<view>20</view>
					<view>21</view>
					<view>22</view>
					<view>23</view>
					<view>24</view>
					<view>25</view>
					<view>26</view>
					<view>27</view>
					<view>28</view>
					<view>29</view>
				</view>
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
		onFixed() {
			console.log('吸顶状态时触发');
		},
		onUnfixed() {
			console.log('非吸顶状态时触发');
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
			.message {
				margin-bottom: 12rpx;
			}
			.content-view {
				margin-top: 12rpx;
				height: 100vh;
			}
		}
	}
}
</style>

<template>
	<view class="page">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="公告栏"></page-nav>
		<view class="content">
			<view class="demo-item">
				<view class="title">基础用法</view>
				<view class="item-block">
					<ste-notice-bar
						:list="textData"
						:delay="1"
						background="#e1e1e1"
						speed="50"
						closeMode
						@click="click"
						@close="close"
					>
						<ste-icon code="&#xe672;" size="28" slot="leftIcon"></ste-icon>
					</ste-notice-bar>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">纵向</view>
				<view class="item-block">
					<ste-notice-bar
						direction="direction"
						:list="textData"
						:standTime="1500"
						background="#e1e1e1"
						speed="80"
					>
						<ste-icon code="&#xe671;" size="28" slot="leftIcon"></ste-icon>
						<ste-icon code="&#xe674;" size="28" slot="rightIcon"></ste-icon>
					</ste-notice-bar>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			textData: [
				'第一条: 11111111111111',
				'第二条:22222222222',
				'第三条:333333333333',
				'第四条:44444444444',
				'第五条:55555555555',
				'第六条:66666666666',
				'第七条:77777777777',
				'第八条:88888888888',
			],
			// textData: ['123132132131'],
		};
	},
	methods: {
		click() {
			console.log('被点击');
		},
		close() {
			console.log('被关闭');
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
}
</style>

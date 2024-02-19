<template>
	<view class="pc-page-body">
		<view class="pc-nav">
			<view class="group" v-for="group in datas" :key="group.key">
				<view class="name">
					{{ group.name }}
				</view>
				<view class="nav-children" v-if="group.children">
					<view
						class="nav-item"
						v-for="nav in group.children"
						:key="nav.key"
						:class="activeName === nav.key ? 'active' : ''"
						@click="toView(nav.key)"
					>
						<view class="name">
							{{ nav.name }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pc-content markdown-view" v-html="content"></view>
		<view class="pc-view">
			<iframe class="view-iframe" src="/mp/index/index" frameborder="0" />
		</view>
	</view>
</template>

<script>
import { mdMap, datas } from './mdFiles.js';
import md2html from './md2html.js';

export default {
	data() {
		return {
			content: '',
			activeName: './1-介绍.md',
			datas,
		};
	},
	watch: {
		activeName: {
			handler(v) {
				if (v && mdMap[v]) {
					this.viewContent(mdMap[v]);
				}
			},
			immediate: true,
		},
	},
	onLoad({ name }) {
		if (name) {
			this.activeName = name;
		}
	},
	methods: {
		viewContent(url) {
			uni.request({ url }).then((res) => {
				this.content = md2html(res.data);
			});
		},
		toView(key) {
			console.log(key);
			this.activeName = key;
			// 修改URL地址参数，不改变当前页面
			uni.navigateTo({ url: `/pc/index/index?name=${key}` });
		},
	},
};
</script>

<style lang="scss">
@import url(./mdStyle.scss);
.pc-page-body {
	width: 100vw;
	height: 100vh;
	padding-right: 20px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	background-color: #eff2f5;
	&,
	view {
		box-sizing: border-box;
	}
	.pc-nav {
		width: 300px;
		height: 100%;
		background-color: #ffffff;
		padding: 8px 0;
		overflow-y: auto;
		.group {
			.name {
				font-weight: bold;
				font-size: 16px;
				padding: 24px 0 0 24px;
				line-height: 28px;
			}
		}
		.nav-item {
			cursor: pointer;
			.name {
				font-weight: 400;
				padding: 6px 0 6px 24px;
				margin: 4px 0;
				font-size: 14px;
				line-height: 20px;
			}
			&:hover,
			&.active {
				color: #1989fa;
			}
			&.active {
				.name {
					font-weight: bold;
				}
			}
		}
	}
	.pc-content {
		width: calc(100% - 660px);
		height: 100%;
		padding: 40px 20px 10px 20px;
		overflow-y: auto;
	}
	.pc-view {
		width: 360px;
		padding-top: 40px;
		.view-iframe {
			width: 360px;
			height: 640px;
			box-shadow: 0 2px 10px 0 #ddd;
			border-radius: 16px;
			background-color: #fff;
		}
	}
}
</style>

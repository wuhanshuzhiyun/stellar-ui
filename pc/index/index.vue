<template>
	<view class="pc-page-body">
		<view class="pc-nav">
			<view
				class="nav-item"
				:class="activeName === nav.key ? 'active' : ''"
				v-for="nav in components"
				:key="nav.key"
				@click="toView(nav.key)"
			>
				{{ nav.name }}
			</view>
		</view>
		<view class="pc-content" v-html="content"></view>
		<view class="pc-view"></view>
	</view>
</template>

<script>
import datas from './mdFiles.js';
import md from './README.md';
import md2html from '@/utils/md2html.js';

export default {
	data() {
		return {
			content: '',
			activeName: '',
			components: [{ name: '介绍', key: '' }, ...datas.components],
		};
	},
	watch: {
		activeName: {
			handler(v) {
				console.log(datas);
				if (v && datas.mds[v]) {
					this.viewContent(datas.mds[v]);
				} else {
					this.viewContent(md);
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
			this.activeName = key;
			this.$router.push({ path: '/pc/index/index', params: { name: key } });
		},
	},
};
</script>

<style lang="scss">
.pc-page-body {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	*,
	view {
		box-sizing: border-box;
	}
	.pc-nav {
		width: 300px;
		border-right: 1px solid #ddd;
		.nav-item {
			height: 40px;
			padding: 0 10px;
			line-height: 40px;
			cursor: pointer;
			&:hover {
				background-color: #f5f5f5;
			}
			&.active {
				background-color: #f5f5f5;
				color: #3478f6;
			}
		}
	}
	.pc-content {
		width: calc(100% - 660px);
	}
	.pc-view {
		width: 360px;
	}
}
</style>

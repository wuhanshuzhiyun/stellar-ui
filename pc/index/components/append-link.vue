<template>
	<div class="append-link">
		<a
			class="link-item"
			:style="itemStyle(item)"
			target="_blank"
			:href="item.url"
			:title="item.title"
			v-for="(item, k) in linkData"
			:key="k"
		></a>
	</div>
</template>

<script>
export default {
	data() {
		return {
			linkData: [
				{
					title: 'github',
					src: 'https://image.whzb.com/chain/StellarUI/image/github.png',
					url: 'https://github.com/wuhanshuzhiyun/stellar-ui',
				},
				{
					title: 'gitee',
					src: 'https://image.whzb.com/chain/StellarUI/image/gitee.png',
					url: 'https://gitee.com/wuhanshuzhiyun/stellar-ui',
				},
			],
		};
	},
	methods: {
		itemStyle(item) {
			return {
				backgroundImage: `url(${item.src})`,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.append-link {
	.link-item {
		width: 26px;
		height: 26px;
		vertical-align: middle;
		background-repeat: no-repeat;
		background-size: 26px;
		display: inline-block;
		line-height: 64px;
		background-position: 0 -51px;
		color: #ccc;
	}

	.link-item:not(:first-child) {
		margin-left: 16px;
	}
}
</style>

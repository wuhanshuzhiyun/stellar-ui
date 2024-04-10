<template>
	<view class="test-demo">
		<page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="上传"></page-nav>
		<ste-upload :value="list" multiple @read="read" max-count="9" multiple accept="media"></ste-upload>
		<ste-upload multiple accept="all" @read="read">
			<template v-slot:preview-cover="{ item }">
				<view>{{ item.size }}</view>
			</template>
		</ste-upload>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ url: 'https://image.whzb.com/chain/StellarUI/bg1.jpg', size: 1234 },
				{ url: 'https://image.whzb.com/chain/StellarUI/bg2.jpg', size: 5527 },
			],
		};
	},
	mounted() {},
	methods: {
		beforeRead(fileList, next) {
			console.log('beforeRead');
			next(false);
		},
		read(fileList) {
			console.log('afterRead', fileList);
			this.list.push(
				...fileList.map((m) => {
					// m.status = Math.random() > 0.5 ? 'loading' : 'error';
					return m;
				})
			);
		},
	},
};
</script>

<style scoped>
.test-demo {

}
</style>

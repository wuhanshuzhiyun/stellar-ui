<script>
export default {
	onLaunch: function () {},
	onShow: function () {
		// #ifdef H5
		window.onmessage = ({ data }) => {
			console.log(window.location.pathname, data);
			if (typeof data === 'string' && data.indexOf('mp') !== -1) {
				// 处理从外部window发送过来的消息
				uni.reLaunch({ url: data });
			}
		};
		// #endif
	},
	onHide: function () {},
};
</script>

<style>
/*每个页面公共css */
</style>

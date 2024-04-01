<script>
import config from '@/common/config.js';
export default {
	onLaunch: function () {
		// #ifdef MP-WEIXIN
		wx.login().then((res) => {
			uni.request({
				url: `${config.BASE_URL}/api/openid?code=${res.code}`,
				success: (res) => {
					console.log(res);
				},
			});
		});
		// #endif
	},
	onShow: function () {},
	onHide: function () {},
};
</script>

<style>
/*每个页面公共css */
</style>

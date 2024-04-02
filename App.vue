<script>
import request from '@/common/request.js';
export default {
	onLaunch: async function () {
		// #ifdef MP-WEIXIN
		const token = uni.getStorageSync('token');
		if (token) {
			const islogin = await request(`/api/islogin?token=${token}`);
			if (islogin) return;
		}
		wx.login().then(async (res) => {
			const token = await request(`/api/login?code=${res.code}`);
			uni.setStorageSync('token', token);
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

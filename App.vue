<script>
import request from '@/common/request.js';
export default {
	onLaunch: async function () {
		// #ifdef MP-WEIXIN
		const { code } = await wx.login();
		const token = await request(`/api/login?code=${code}`);
		uni.setStorageSync('token', token);
		// #endif
	},
	onShow: function () {},
	onHide: function () {},
};
</script>

<style>
/*每个页面公共css */
</style>

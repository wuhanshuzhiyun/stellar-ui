<script>
import request from '@/common/request.js';
export default {
	onLaunch: async function () {
		// #ifdef MP-WEIXIN
		const { code } = await wx.login();
		let token = uni.getStorageSync('token');
		token = await request(`/api/login?code=${code}&token=${token}`);
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

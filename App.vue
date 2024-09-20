<script>
import request from '@/common/request.js';
import { getToken, setToken } from './common/token';
import { getInfo, login } from '@/common/account.js';
export default {
	onLaunch: async function () {
		// #ifdef MP-WEIXIN
		const { code } = await wx.login();
		const openid = await request('/account/openid', { code });
		console.log('open-id:', openid);
		// #endif
	},
	onShow: function () {},
	onHide: function () {},
	methods: {},
};
</script>

<style>
/*每个页面公共css */
</style>

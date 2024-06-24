<template>
	<div class="gitlab" @click="goToBaidu">
		<ste-button @click="goToBaidu">跳转工商银行</ste-button>
	</div>
</template>

<script>
export default {
	methods: {
		goToBaidu() {
			window.location.href =
				'https://mywap2.icbc.com.cn/ICBCWAPBank/servlet/WAPBAppInject?injectMenuId=taskCenter&injectParams=b3RoZXJjb250ZW50X2FjdGl2aXR5SWQ9NTM1NzQmb3RoZXJjb250ZW50X2F3YXJkVHlwZT0xMi02';
		},
	},
};
</script>

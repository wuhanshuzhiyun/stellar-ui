import useSteToast from '../../uni_modules/stellar-ui/components/ste-toast/ste-toast.js';

describe('Test Toast', () => {
	test('showToast with default params', async () => {
		const { showToast, $state } = useSteToast();

		showToast({ title: '测试提示' });
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect($state.openBegin).toBe(true);
		expect($state.title).toBe('测试提示');
		expect($state.icon).toBe('success');
		expect($state.duration).toBe(1500);
		expect($state.mask).toBe(false);
	});

	test('showToast with custom params', async () => {
		const { showToast, $state } = useSteToast();

		showToast({
			title: '自定义提示',
			icon: 'error',
			duration: 3000,
			mask: true,
		});
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect($state.title).toBe('自定义提示');
		expect($state.icon).toBe('error');
		expect($state.duration).toBe(3000);
		expect($state.mask).toBe(true);
	});

	test('hideToast', async () => {
		const { showToast, hideToast, $state } = useSteToast();

		showToast({ title: '测试提示' });
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect($state.openBegin).toBe(true);

		hideToast();
		expect($state.openBegin).toBe(false);
	});

	test('showToast with loading icon', async () => {
		const { showToast, $state } = useSteToast();

		showToast({
			title: '加载中',
			icon: 'loading',
		});
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect($state.icon).toBe('loading');
		expect($state.duration).toBe(0);
	});

	test('showToast with image', async () => {
		const { showToast, $state } = useSteToast();

		showToast({
			title: '自定义图片',
			image: 'https://example.com/icon.png',
		});
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect($state.image).toBe('https://example.com/icon.png');
	});
});
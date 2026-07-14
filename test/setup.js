// test/setup.js
import { vi } from 'vitest';

// 创建动画对象的模拟实现
const createAnimationMock = () => {
	const animationObject = {
		opacity: vi.fn().mockReturnThis(),
		scale: vi.fn().mockReturnThis(),
		step: vi.fn().mockReturnThis(),
		export: vi.fn().mockReturnValue({
			actions: [],
		}),
	};
	return animationObject;
};

const createUniMock = () => ({
	showToast: vi.fn(),
	hideToast: vi.fn(),
	showLoading: vi.fn(() => Promise.resolve()),
	hideLoading: vi.fn(() => Promise.resolve()),
	request: vi.fn(() => Promise.resolve({ data: {} })),
	uploadFile: vi.fn(() => Promise.resolve({ data: {} })),
	setStorage: vi.fn(() => Promise.resolve()),
	getStorage: vi.fn(() => Promise.resolve({ data: {} })),
	setStorageSync: vi.fn(),
	getStorageSync: vi.fn(() => null),
	removeStorageSync: vi.fn(),
	getMenuButtonBoundingClientRect: vi.fn(() => ({
		top: 44,
		left: 20,
		height: 32,
		width: 80,
	})),
	upx2px: vi.fn((val) => val / 2),
	createAnimation: vi.fn().mockImplementation(() => createAnimationMock()),
	createCanvasContext: vi.fn(() => {
		const context = {
			clearRect: vi.fn(),
			setLineWidth: vi.fn(),
			setStrokeStyle: vi.fn(),
			setFillStyle: vi.fn(),
			beginPath: vi.fn(),
			arc: vi.fn(),
			stroke: vi.fn(),
			fill: vi.fn(),
			closePath: vi.fn(),
			setFont: vi.fn(),
			fillText: vi.fn(),
			scale: vi.fn(),
			drawImage: vi.fn(),
			fillRect: vi.fn(),
			setLineCap: vi.fn(),
			draw: vi.fn(),
			save: vi.fn(),
			restore: vi.fn(),
			translate: vi.fn(),
			rotate: vi.fn(),
		};
		return {
			...context,
			getContext: vi.fn(() => context),
			width: 100,
			height: 100,
			toDataURL: vi.fn(() => 'data:image/png;base64,test'),
			createImage: vi.fn(() => ({
				src: '',
				onload: vi.fn(),
				onerror: vi.fn(),
			})),
		};
	}),
	createIntersectionObserver: vi.fn(() => ({
		relativeToViewport: vi.fn().mockReturnThis(),
		relativeTo: vi.fn().mockReturnThis(),
		observe: vi.fn(),
		disconnect: vi.fn(),
	})),
	createVideoContext: vi.fn(),
	createSelectorQuery: vi.fn(() => ({
		in: vi.fn().mockReturnThis(),
		select: vi.fn().mockReturnThis(),
		boundingClientRect: vi.fn().mockReturnThis(),
		fields: vi.fn().mockReturnThis(),
		exec: vi.fn(() => Promise.resolve([{
			node: {
				getContext: vi.fn(() => ({
					clearRect: vi.fn(),
					setLineWidth: vi.fn(),
					setStrokeStyle: vi.fn(),
					setFillStyle: vi.fn(),
					beginPath: vi.fn(),
					arc: vi.fn(),
					stroke: vi.fn(),
					fill: vi.fn(),
					closePath: vi.fn(),
					setFont: vi.fn(),
					fillText: vi.fn(),
					scale: vi.fn(),
					drawImage: vi.fn(),
					fillRect: vi.fn(),
					createImage: vi.fn(() => ({
						src: '',
						onload: vi.fn(),
						onerror: vi.fn(),
					})),
				})),
				width: 100,
				height: 100,
				toDataURL: vi.fn(() => 'data:image/png;base64,test'),
			},
			size: { width: 100, height: 100 },
		}])),
	})),
	getImageInfo: vi.fn(() => Promise.resolve({ path: '' })),
	canvasToTempFilePath: vi.fn((options) => {
		if (options.complete) {
			options.complete({ tempFilePath: '' });
		}
	}),
});

global.uni = createUniMock();
global.wx = {
	createOffscreenCanvas: vi.fn(() => ({
		getContext: vi.fn(() => ({
			clearRect: vi.fn(),
			setLineWidth: vi.fn(),
			setStrokeStyle: vi.fn(),
			setFillStyle: vi.fn(),
			beginPath: vi.fn(),
			arc: vi.fn(),
			stroke: vi.fn(),
			fill: vi.fn(),
			closePath: vi.fn(),
			lineCap: '',
			toDataURL: vi.fn(() => 'data:image/png;base64,test'),
		})),
		width: 96,
		height: 48,
		toDataURL: vi.fn(() => 'data:image/png;base64,test'),
	})),
};
if (typeof window !== 'undefined') {
	window.wx = global.wx;
}
globalThis.wx = global.wx;

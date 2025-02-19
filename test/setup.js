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
	createAnimation: vi.fn().mockImplementation(() => createAnimationMock()),
	createCanvasContext: vi.fn(),
	createIntersectionObserver: vi.fn(),
	createVideoContext: vi.fn(),
});

global.uni = createUniMock();

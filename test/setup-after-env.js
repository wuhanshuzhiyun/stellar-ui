import { vi } from 'vitest';

beforeAll(() => {
	if (typeof wx === 'undefined') {
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
	}
});

afterEach(() => {
	if (typeof wx === 'undefined') {
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
	}
});
import vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [vue()],
	test: {
		environment: 'jsdom', // 默认值: 'node'
		globals: true,
		dir: 'test',
		reporter: 'html',
		setupFiles: ['./test/setup.js'],
		cache: false,
	},
});

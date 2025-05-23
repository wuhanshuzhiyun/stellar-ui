import { RouterMount, createRouter } from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [
		...ROUTES,
		{
			path: '*',
			redirect: (to) => {
				return { name: '404' };
			},
		},
	],
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {});

export { router, RouterMount };

import App from './App';
import Vue from 'vue';
import './uni.promisify.adaptor';
import { router, RouterMount } from './router.js';
import mixin from './common/app-mixin.js';
Vue.use(router);
Vue.mixin(mixin);
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue({
	...App,
});

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

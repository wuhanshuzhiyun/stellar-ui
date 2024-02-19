import App from "./App";

import Vue from "vue";
import "./uni.promisify.adaptor";
// #ifdef H5
import { router, RouterMount } from "./router/index.js";
Vue.use(router);
// #endif
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
    ...App,
});
app.$mount();

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const DEFAULT_KEY = '$steMsgBoxKey';
const DEFAULT_CONFIG = {
	title: '',
	content: '',
	showCancel: true,
	icon: '',
	cancelText: '取消',
	cancelColor: '#333333',
	confirmText: '确认',
	confirmColor: '#0090FF',
	editable: false,
	placeholderText: '',
	success: null,
	fail: null,
	complete: null,
};

const store = new Vuex.Store({
	state: {},
	mutations: {
		initializeState(state, key) {
			if (!state[key]) {
				Vue.set(state, key, {
					selector: key,
					openBegin: false,
					...DEFAULT_CONFIG,
				});
			}
		},
		setState(state, { key, params }) {
			Object.assign(state[key], params);
		},
		resetState(state, key) {
			Object.assign(state[key], {
				openBegin: false,
			});
		},
	},
});

function useSteMsgBox(key) {
	key = key ?? DEFAULT_KEY;
	store.commit('initializeState', key);

	return {
		showMsgBox(params) {
			store.commit('setState', {
				key,
				params: {
					...DEFAULT_CONFIG,
					...params,
					confirm: params.confirm ?? function () {},
					cancel: params.cancel ?? function () {},
					complete: params.complete ?? function () {},
					openBegin: true,
				},
			});
		},
		hideMsgBox() {
			store.commit('resetState', key);
		},
		$state: store.state[key],
		$store: store,
	};
}

export default useSteMsgBox;
export { DEFAULT_KEY };

import SteButton from './components/ste-button/ste-button.vue';
import SteSearch from './components/ste-search/ste-search.vue';

const components = { SteButton, SteSearch };

function install(Vue, opts = {}) {
	Object.keys(components).forEach((name) => {
		const component = components[name];
		Vue.component(name, component);
	});
}

export default { install, ...components };

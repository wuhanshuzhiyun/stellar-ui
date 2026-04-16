import Vue from 'vue';

let $state = Vue.observable({
	steThemeColor: '#0090FF',
	defaultColor: '#0090FF',
});

function useColor() {
	return {
		setColor(params) {
			$state.steThemeColor = params.steThemeColor ?? $state.steThemeColor;
		},
		getColor() {
			return $state;
		},
		/**响应式数据*/
		$state,
	};
}
export default useColor;

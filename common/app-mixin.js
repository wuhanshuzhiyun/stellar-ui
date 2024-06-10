import useSteToast from '@/uni_modules/stellar-ui/components/ste-toast/ste-toast.js';
let steToast = useSteToast();
export default {
	methods: {
		showToast: steToast.showToast,
		hideToast: steToast.hideToast,
	},
};

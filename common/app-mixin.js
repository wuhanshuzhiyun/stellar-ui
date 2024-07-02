import useSteToast from '@/uni_modules/stellar-ui/components/ste-toast/ste-toast.js';
import useSteMsgBox from '@/uni_modules/stellar-ui/components/ste-message-box/ste-message-box.js';
let steToast = useSteToast();
let steMsgBox = useSteMsgBox();
export default {
	methods: {
		showToast: steToast.showToast,
		hideToast: steToast.hideToast,
		showMsgBox: steMsgBox.showMsgBox,
		hideMsgBox: steMsgBox.hideMsgBox
	},
};
from utils import Log

from minium import WXMinium, Page

from script.Test import Test

log = Log(f"{__name__.split(".")[-1]}.txt")

PATH_NAME = "/mp/badge-demo/badge-demo"

STYLES = [
	{"width": "14px", "height": "14px", "background-color": "rgb(238, 10, 36)", "text": "1"},
	{"height": "14px", "background-color": "rgb(238, 10, 36)", "text": "99+"},
	{"height": "14px", "background-color": "rgb(238, 10, 36)", "text": "HOT"},
	{"width": "6px", "height": "6px", "background-color": "rgb(238, 10, 36)"},
	{"width": "6px", "height": "6px", "background-color": "rgb(19, 183, 22)"},
	{"width": "14px", "height": "14px", "background-color": "rgb(19, 183, 22)", "text": "1"},
	{"height": "14px", "background-image": "linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))",
	 "text": "99+"},
	{"height": "14px", "background-image": 'url("https://image.whzb.com/chain/StellarUI/image/fire.png")',
	 "text": "true"},
]


class BadgeTest(Test):

	def _test_path(self):
		title = self._page.get_element("view.title-center")
		self.assertEqual(title.text, "徽标", "页面标题不正确")
		components = self._page.get_elements("view.ste-badge-root .ste-badge-content")
		self.assertEqual(len(components), 21, "组件数量不正确")
		log_str = self._test_components(STYLES, components)
		log.push_log(f"test-components-styles:\n{log_str}")


	def run_test(self, mini: WXMinium):
		try:
			log.push_log("test start")
			log.push_log(f"to path: {PATH_NAME}")
			self._to_page(mini, PATH_NAME)
			log.push_log(f"to path: success")
			self._test_path()
			log.push_log("test success")
			self._page.wait_for(1)
			self._page.app.navigate_back()
		except Exception as e:
			# 记录错误到outputs
			log.push_log(str(e))
		self._page.wait_for(1)

from utils import Log

from minium import WXMinium, Page

from script.Test import Test

log = Log(f"{__name__.split(".")[-1]}.txt")

PATH_NAME = "/mp/button-demo/button-demo"
STYLES = [
	{"width": "144px", "height": "48px", "background-color": "rgb(0, 144, 255)", "text": "超大按钮"},
	{"width": "120px", "height": "40px", "background-color": "rgb(0, 144, 255)", "text": "大按钮"},
	{"width": "82px", "height": "34px", "background-color": "rgb(0, 144, 255)", "text": "中按钮"},
	{"width": "66px", "height": "24px", "background-color": "rgb(0, 144, 255)", "text": "小按钮"},

	{"width": "327px", "height": "34px", "background-color": "rgb(0, 144, 255)", "text": "宽度填满"},
	{"width": "250px", "height": "34px", "background-color": "rgb(0, 144, 255)", "text": "自定义宽度-500rpx"},
	{"width": "110px", "height": "34px", "background-color": "rgb(0, 144, 255)", "text": "自适应宽度"},

	{"width": "96px", "height": "34px", "background-color": "rgb(0, 144, 255)", "text": "圆角按钮",
	 "border-radius": "24px"},
	{"width": "110px", "height": "34px", "background-color": "rgb(0, 144, 255)", "text": "非圆角按钮",
	 "border-radius": "5px"},
]


class ButtonTest(Test):

	def _test_path(self):
		title = self._page.get_element("view.title-center")
		self.assertEqual(title.text, "按钮", "页面标题不正确")
		components = self._page.get_elements("button.ste-button--root")
		self.assertEqual(len(components), 19, "组件数量不正确")
		log_str = self._test_components_style(STYLES, components)
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

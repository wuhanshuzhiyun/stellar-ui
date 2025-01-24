from utils import push_log

from minium import WXMinium, Page, MiniTest

PATH_NAME = "/mp/button-demo/button-demo"
LOG_FILE = f"{__name__.split(".")[-1]}.txt"
STYLES = [
	{"width": 144, "height": 48, "background-color": "rgb(0, 144, 255)", "text": "超大按钮"},
	{"width": 120, "height": 40, "background-color": "rgb(0, 144, 255)", "text": "大按钮"},
	{"width": 82, "height": 34, "background-color": "rgb(0, 144, 255)", "text": "中按钮"},
	{"width": 66, "height": 24, "background-color": "rgb(0, 144, 255)", "text": "小按钮"},

	{"width": 327, "height": 34, "background-color": "rgb(0, 144, 255)", "text": "宽度填满"},
	{"width": 250, "height": 34, "background-color": "rgb(0, 144, 255)", "text": "自定义宽度-500rpx"},
	{"width": 110, "height": 34, "background-color": "rgb(0, 144, 255)", "text": "自适应宽度"},

	{"width": 96, "height": 34, "background-color": "rgb(0, 144, 255)", "text": "圆角按钮", "border-radius": 24},
	{"width": 110, "height": 34, "background-color": "rgb(0, 144, 255)", "text": "非圆角按钮", "border-radius": 5},
]


class ButtonTest(MiniTest):
	mini: WXMinium
	_page: Page


	def _to_page(self):
		self._page = self.mini.app.navigate_to(PATH_NAME)
		self._page.wait_for(1)

	def _test_path(self):
		title = self._page.get_element("view.title-center")
		self.assertEqual(title.text, "按钮", "页面标题不正确")
		components = self._page.get_elements("button.ste-button--root")
		self.assertEqual(len(components), 19, "组件数量不正确")
		for i in range(len(STYLES)):
			push_log(f"component-{i + 1}:start", LOG_FILE)
			style = STYLES[i]
			component = components[i]
			if style.get("width"):
				self.assertEqual(component.styles("width")[0], str(style.get("width")) + "px", "组件样式width不正确")
			if style.get("height"):
				self.assertEqual(component.styles("height")[0], str(style.get("height")) + "px", "组件样式height不正确")
			if style.get("text"):
				self.assertEqual(component.text, style.get("text"), "组件内容不正确")
			if style.get("background-color"):
				self.assertEqual(component.styles("background-color")[
					0], style.get("background-color"), "组件样式background-color不正确")
			if style.get("border-radius"):
				self.assertEqual(component.styles("border-radius")[
					0], str(style.get("border-radius")) + "px", "组件样式border-radius不正确")
			push_log(f"component-{i + 1}:success", LOG_FILE)


	def run_test(self, mini: WXMinium):
		self.mini = mini
		try:
			push_log("test start", LOG_FILE)
			push_log(f"to path: {PATH_NAME}", LOG_FILE)
			self._to_page()
			self._test_path()
			push_log("test success", LOG_FILE)
		except Exception as e:
			# 记录错误到outputs
			push_log(str(e), LOG_FILE)
		self._page.wait_for(1)
		self._page.app.navigate_back()
		self._page.wait_for(1)

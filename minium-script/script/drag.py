from utils import Log

from minium import WXMinium, Page, BaseElement

from script.Test import Test

log = Log(f"{__name__.split(".")[-1]}.txt")

PATH_NAME = "/mp/drag-demo/drag-demo"
STYLES = [
	{"width": "96px", "height": "34px", "text": "拖拽按钮"},
	{"width": "96px", "height": "34px", "text": "横向固定"},
	{"width": "96px", "height": "34px", "text": "竖向固定"},
	{"width": "68px", "height": "34px", "text": "贴边"},
	{"width": "68px", "height": "34px", "text": "边界"},
]


class DragTest(Test):

	def _test_path(self):
		title = self._page.get_element("view.title-center")
		self.assertEqual(title.text, "拖拽", "页面标题不正确")
		components = self._page.get_elements("view.ste-drag-root")
		self.assertEqual(len(components), 5, "组件数量不正确")
		log_str = self._test_components(STYLES, components)
		log.push_log(f"test-components-styles:\n{log_str}")

		log_str = "test-components-event:\ncomponent-1:start\n"

		# 拖拽第一个组件，向右下角拖拽100px
		rect0 = components[0].rect
		components[0].move(100, 100)
		rect1 = components[0].rect
		self.assertGreater(rect1.x, rect0.x, "拖拽按钮 组件移动x坐标异常")
		self.assertGreater(rect1.y, rect0.y, "拖拽按钮 组件移动y坐标异常")
		log_str += "component-1:success\n"
		# 拖拽第二个组件
		log_str += "component-2:start\n"
		rect2 = components[1].rect
		components[1].move(100, 100)
		rect3 = components[1].rect
		self.assertGreater(rect3.x, rect2.x, "横向固定 组件移动x坐标异常")
		self.assertEqual(rect3.y, rect2.y, "横向固定 组件y坐标发生了变化")
		log_str += "component-2:success\n"
		# 拖拽第三个组件
		log_str += "component-3:start\n"
		rect4 = components[2].rect
		components[2].move(100, 100)
		rect5 = components[2].rect
		self.assertEqual(rect5.x, rect4.x, "竖向固定 组件x坐标发生了变化")
		self.assertGreater(rect5.y, rect4.y, "竖向固定 组件移动y坐标异常")
		log_str += "component-3:success\n"
		log.push_log(log_str)


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

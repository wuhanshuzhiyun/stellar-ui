from minium import MiniTest, BaseElement, WXMinium, Page


class Test(MiniTest):
	_mini: WXMinium
	_page: Page

	def _to_page(self, mini: WXMinium, page_name: str):
		self._mini = mini
		self._page = self._mini.app.navigate_to(page_name)
		self._page.wait_for(1)

	def _test_components_style(self, styles: list[dict], components: list[BaseElement]):
		log_strs = ""
		for i in range(len(styles)):
			try:
				log_strs += f"component-{i + 1}: start\n"
				style = styles[i]
				component = components[i]
				# 获取style所有的key
				for key in style.keys():
					if key=="text":
						self.assertEqual(component.text, style.get(key), "组件内容不正确")
					else:
						self.assertEqual(component.styles(key)[0], style.get(key), f"样式属性{key}不正确")
				log_strs += f"component-{i + 1}: success\n"
			except Exception as e:
				log_strs += f"component-{i + 1}:>>>===\n{str(e)}\n>>>===\n"
		return log_strs

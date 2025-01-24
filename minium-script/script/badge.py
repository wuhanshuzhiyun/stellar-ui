from minium import WXMinium, Page, MiniTest


class BadgeTest(MiniTest):
	mini: WXMinium
	_page: Page


	def to_page(self):
		self._page = self.mini.app.navigate_to("/mp/badge-demo/badge-demo")

	def test_badge(self):
		title = self._page.get_element("view.title-center")
		self.assertEqual(title.text, "徽标")
		badges = self._page.get_elements("view.ste-badge-root .ste-badge-content")
		for badge in badges:
			self.assertEqual(badge.styles("display")[0], "block")
			self.assertEqual(badge.styles("position")[0], "absolute")


	def run_test(self, mini: WXMinium):
		self.mini = mini
		self.to_page()
		self.test_badge()

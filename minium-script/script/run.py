from minium import WXMinium
from script.badge import BadgeTest
from script.button import ButtonTest
from script.drag import DragTest

badge = BadgeTest()
button = ButtonTest()
drag = DragTest()

def run(mini: WXMinium):
	# badge.run_test(mini) # 测试badge组件
	# button.run_test(mini) # 测试button组件
	drag.run_test(mini) # 测试drag组件

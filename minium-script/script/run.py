from minium import WXMinium
from script.badge import BadgeTest
from script.button import ButtonTest

badge = BadgeTest()
button = ButtonTest()


def run(mini: WXMinium):
	badge.run_test(mini) # 测试badge组件
	button.run_test(mini) # 测试button组件

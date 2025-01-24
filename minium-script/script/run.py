from minium import WXMinium
from script.badge import BadgeTest
from script.button import ButtonTest
from utils import clear_logs

badge = BadgeTest()
button = ButtonTest()


def run(mini: WXMinium):
	clear_logs() # 清除历史日志
	badge.run_test(mini) # 测试badge组件
	button.run_test(mini) # 测试button组件

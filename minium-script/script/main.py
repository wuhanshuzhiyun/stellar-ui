from minium import WXMinium
from script.badge import BadgeTest

badge = BadgeTest()


def main(mini: WXMinium):
	badge.run_test(mini)

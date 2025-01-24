import minium
from utils import get_config
from script import run


config = get_config()

mini = minium.Minium({
	"project_path": config.get("项目路径"),
	"dev_tool_path": config.get("微信开发者工具路径"),
	"test_port": config.get("端口号")
})

if __name__=='__main__':
	# 获取设备信息
	info = mini.get_system_info()
	if info.windowWidth==375:
		run(mini)
		mini.close_project()
	else:
		print("请将模拟器分辨率宽度设置为375(推荐使用iPhone 12/13 mini)")

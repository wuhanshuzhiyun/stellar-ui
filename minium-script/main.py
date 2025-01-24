import minium
from utils import get_config
from script import main


config = get_config()

mini = minium.Minium({
	"project_path": config.get("项目路径"),
	"dev_tool_path": config.get("微信开发者工具路径"),
	"test_port": config.get("端口号")
})
print(mini.get_system_info())

if __name__=='__main__':
	main(mini)
	mini.close_project()

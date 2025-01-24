from utils.index import replace_string


def get_config():
	# 读取配置项文件
	with open("config", "r", encoding="utf-8") as f:
		s = f.read()
		arr = s.split('\n')
		# 删除每一行的前后空格
		arr = [i.strip() for i in arr]
		# 将多个连续的空格转换为一个空格，用正则替换
		arr = [replace_string(i, r'\s+', ' ') for i in arr]
		# 删除空行
		arr = [i for i in arr if i!='']
		# 将每一行以第一个空格分开
		arr = [i.split(' ', 1) for i in arr]
		# 将每一行的第一个元素作为键，第二个元素作为值，存入字典
		return {i[0]: i[1] for i in arr}

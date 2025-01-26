import re
import time
import os


def replace_string(string, reg, new_str):
	'''
	替换字符串
	:param string: 待替换字符串
	:param reg: 正则表达式
	:param new_str: 替换为字符
	:return: 替换后的字符串
	'''
	return re.sub(reg, new_str, string)


class Log:
	'''
	日志类
	'''
	_file_name: str

	def __init__(self, file_name="test.txt"):
		self._file_name = file_name

	def push_log(self, log: str):
		'''
		记录日志
		:param log: 日志内容
		:param file_name: 记录文件名
		:return:
		'''
		# 获取当前时间yyyy-mm-dd hh:mm:ss
		now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
		# 记录日志到outputs
		with open(f"outputs/{self._file_name}", "a", encoding="utf-8") as f:
			f.write(f"{now} {log}\n")


def clear_logs():
	'''
	清空日志
	:return:
	'''
	# 找到outputs下的所有文件
	for file in os.listdir("outputs"):
		# 删除文件
		os.remove(f"outputs/{file}")

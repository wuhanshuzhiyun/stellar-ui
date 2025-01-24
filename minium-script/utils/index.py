import re


def replace_string(string, reg, new_str):
	'''
	替换字符串
	:param string: 待替换字符串
	:param reg: 正则表达式
	:param new_str: 替换为字符
	:return: 替换后的字符串
	'''
	return re.sub(reg, new_str, string)
